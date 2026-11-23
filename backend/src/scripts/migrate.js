const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
require("dotenv").config();

const client = new Client(process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === 'production' ? { ssl: { rejectUnauthorized: false } } : {}),
} : {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function migrate() {
  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL");
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const migrationFolder = path.join(__dirname, "../../migrations");

    // Run migrations in dependency order
    const files = [
      "2024_08_04_users.sql",
      "2024_08_04_profile_management.sql",
      "2024_08_04_resume_management.sql",
      "2024_08_04_interviews.sql",
      "2024_08_04_candidate_interview.sql",
      "2024_08_04_dashboard_tables.sql",
      "20260804_reports_notifications.sql",
      "20260804_ai_interview_messages.sql",
      "20260805_ai_evaluation_tables.sql",
      "20260805_analytics_dashboard.sql",
      "20260805_sync_interviews.sql",
      "20260805_career_analysis.sql",
      "20260805_process14_profile_tables.sql",
      "20260805_report_pdf_email.sql",
      "20260808_candidate_profile_user_unique.sql",
      "20260908_auth_columns.sql",
    ];

    for (const file of files) {
      const filePath = path.join(migrationFolder, file);

      if (!fs.existsSync(filePath)) {
        throw new Error(`Migration file not found: ${file}`);
      }

      const alreadyApplied = await client.query(
        "SELECT 1 FROM schema_migrations WHERE name = $1",
        [file],
      );
      if (alreadyApplied.rowCount) {
        console.log(`↪️ Skipping ${file} (already applied)`);
        continue;
      }

      console.log(`🚀 Running ${file}`);

      const sql = fs.readFileSync(filePath, "utf8");

      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query(
          "INSERT INTO schema_migrations (name) VALUES ($1)",
          [file],
        );
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }

      console.log(`✅ ${file} completed`);
    }

    console.log("\n🎉 All migrations completed successfully.");
  } catch (err) {
    console.error("\n❌ Migration Failed");
    console.error(err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

migrate();
