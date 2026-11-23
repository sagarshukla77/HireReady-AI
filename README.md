# HireReady AI

HireReady AI is a full-stack interview practice app. Candidates can upload and review a resume, configure a mock interview, answer by voice or text, and review answer feedback and interview reports.

## What works today

- Account registration and sign-in with JWT authentication
- PDF resume upload, text extraction, and AI-assisted profile review
- Interview setup by company, role, type, difficulty, and duration
- AI-generated interview questions, follow-ups, answer evaluation, and reports
- Voice input through browser speech recognition where supported; text answers remain available
- Profile, interview history, and performance summaries

AI and email features need the related API credentials. The project does not currently provide video recording, code execution, or automatic live difficulty adjustment.

## Run locally

Requirements: Node.js 20 or later and PostgreSQL.

1. Install frontend dependencies from the project root: `npm ci`
2. Install backend dependencies: `cd backend && npm ci`
3. Create a PostgreSQL database and copy `backend/.env.example` to `backend/.env`.
4. Set the database credentials and a long random `JWT_SECRET`. Add a Gemini API key to use AI features. SMTP settings are optional unless you use email features.
5. Run migrations from `backend`: `npm run migrate`. The migration runner tracks completed files and runs each once.
6. Start the API in one terminal from `backend`: `npm run dev`.
7. Start the frontend in another terminal from the project root: `npm run dev`.

The Vite development server forwards `/api` calls to `http://localhost:5000`. The frontend normally runs at `http://localhost:5173`; the API health endpoint is `http://localhost:5000/api/health`.

## Configuration

For local development, the backend accepts `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`. In production, set `DATABASE_URL` to a PostgreSQL connection string; the backend enables TLS when `NODE_ENV=production`.

Frontend builds can use `VITE_API_URL` (for example, `https://your-api.example.com/api`). Do not put secrets in `VITE_` variables because frontend values are public.

## Deploy on Render

The included `render.yaml` describes a Vite static site, Express API, and PostgreSQL database. In Render, create a new Blueprint from the GitHub repository and provide the requested `GEMINI_API_KEY` in the dashboard. The blueprint uses free plans for a preview.

Render's free web services can spin down while idle, and free PostgreSQL databases expire after 30 days. Free services also do not retain local file uploads. For ongoing use, select a paid database and persistent file storage, and configure those services before inviting users. Resume files contain personal data and should remain private.

Email delivery is optional and remains disabled until valid SMTP credentials are added to the API service. Add the final frontend URL to `CLIENT_URL` and the final API URL to `VITE_API_URL` if you change the names in `render.yaml`.

## Project structure

- `src/` — React and Vite application
- `backend/src/` — Express API, auth, services, and database models
- `backend/migrations/` — PostgreSQL schema migrations
- `render.yaml` — Render Blueprint for preview deployment

## License

No license has been selected yet. Add one before accepting contributions or redistributing the project.
