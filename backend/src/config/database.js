// Database configuration
const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL) : null;
const useDatabaseUrl = Boolean(databaseUrl);
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
  useDatabaseUrl
    ? decodeURIComponent(databaseUrl.pathname.replace(/^\//, ''))
    : process.env.DB_NAME || 'hireready',
  useDatabaseUrl
    ? decodeURIComponent(databaseUrl.username)
    : process.env.DB_USER || 'postgres',
  useDatabaseUrl
    ? decodeURIComponent(databaseUrl.password)
    : process.env.DB_PASSWORD || 'postgres',
  {
    ...(useDatabaseUrl ? {} : {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
    }),
    ...(useDatabaseUrl ? {
      host: databaseUrl.hostname,
      port: databaseUrl.port ? Number(databaseUrl.port) : 5432,
    } : {}),
    dialect: 'postgres',
    ...(isProduction ? { dialectOptions: { ssl: { rejectUnauthorized: false } } } : {}),
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = { sequelize };
