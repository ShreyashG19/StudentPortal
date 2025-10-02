## StudentPortal

A simple Student Portal application with a Node.js/Express backend and a React + Vite frontend. It provides authentication for students and teachers, student profiles, and attendance marking/fetching APIs.

## Prerequisites

-   Node.js (v16+ recommended) and npm
-   PostgreSQL for the backend database

## Environment variables

Backend (create a `.env` file inside `backend/`):

-   `POSTGRES_URL` — Postgres connection string (required)
-   `JWT_SECRET` — Secret used to sign JWT cookies (required)
-   `PORT` — Optional. Port the backend server listens on (defaults to 3000 if not set)

Frontend (create a `.env` or `.env.local` file inside `frontend/`):

-   `VITE_API_URL` — Base URL of the backend API (e.g. `http://localhost:3000`) (required)

Notes:

-   The backend code also lists `port` default as 5000 in `src/config/config.js`, but the server entrypoint will use `PORT` environment variable or default to `3000`. Set `PORT` explicitly to avoid ambiguity.

## Quick start — Local development

1. Backend

```bash
cd backend
npm install
# create a .env file with POSTGRES_URL and JWT_SECRET
# run database SQL if needed (see Database section)
npm run dev    # start with nodemon
```

The backend exposes the API under `/api` (health: `/api/health`). See `backend/docs/swagger.yaml` for the full OpenAPI spec.

2. Frontend

```bash
cd frontend
npm install
# create .env file with VITE_API_URL (e.g. VITE_API_URL=http://localhost:3000)
npm run dev
```

Open http://localhost:5173 (Vite default) in your browser to view the frontend.

## Database

-   A SQL file is included at `backend/src/config/db.sql` (or `backend/src/config/db.sql`) — run it to create the required schema and seed data if provided.

Adjust the database name and `POSTGRES_URL` accordingly.

## API documentation

The backend OpenAPI specification is available at `backend/docs/swagger.yaml`. The spec documents endpoints such as:

-   `POST /api/auth/signup` — create a new user (student or teacher)
-   `POST /api/auth/login` — login and set JWT cookie
-   `POST /api/auth/logout` — logout (clear cookie)
-   `GET /api/students` — list students (teacher only)
-   `GET /api/students/{id}` — get student by id (self or teacher)
-   `GET /api/attendance/{student_id}` — get attendance for a student
-   `POST /api/attendance/mark` — mark attendance for multiple students (teacher only)

You can view the YAML in a Swagger UI instance (e.g. using the online editor or by adding a Swagger UI route to the server).

## Scripts

-   Backend (`backend/package.json`):

    -   `npm run dev` — development (nodemon)
    -   `npm start` — production start (node index.js)

-   Frontend (`frontend/package.json`):
    -   `npm run dev` — start Vite dev server
    -   `npm run build` — build production bundle
    -   `npm run preview` — preview production build
    -   `npm run lint` — run ESLint
