# YouTube Game Platform (MVP)

Stage 1 delivers a runnable monorepo foundation for a gamified YouTube/Twitch growth SaaS.

## Tech stack

- Frontend: React + Vite + TypeScript + TailwindCSS + Zustand + React Router
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL + Prisma ORM

## Project structure

```text
.
├── apps
│   ├── backend
│   │   ├── prisma
│   │   │   └── schema.prisma
│   │   ├── src
│   │   │   ├── config
│   │   │   │   └── env.ts
│   │   │   ├── routes
│   │   │   │   └── health.routes.ts
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend
│       ├── src
│       │   ├── pages
│       │   │   └── HomePage.tsx
│       │   ├── store
│       │   │   └── appStore.ts
│       │   ├── styles
│       │   │   └── globals.css
│       │   ├── main.tsx
│       │   └── router.tsx
│       ├── .env.example
│       ├── package.json
│       ├── tailwind.config.ts
│       └── vite.config.ts
├── package.json
└── README.md
```

## Stage 1 setup (step-by-step)

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment files

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

Update `apps/backend/.env` with your local PostgreSQL credentials.

### 3) Create database and run Prisma migration

Make sure PostgreSQL is running and a database named `youtube_game` exists (or update `DATABASE_URL`).

```bash
npm run prisma:migrate
npm run prisma:generate
```

### 4) Run frontend + backend in development

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- Health check: `http://localhost:4000/api/health`

## What to test manually in Stage 1

1. Open `http://localhost:5173` and confirm Russian UI renders correctly.
2. Open `http://localhost:4000/api/health` and verify JSON response.
3. Confirm Prisma migration created tables in PostgreSQL.

## Sample test data for Stage 1

You can seed quick test rows directly in SQL:

```sql
INSERT INTO "User" (id, email, username, "passwordHash", "createdAt", "updatedAt")
VALUES ('usr_stage1_demo', 'demo@example.com', 'demo_creator', 'hashed-password', NOW(), NOW());
```

This allows checking that DB connectivity and schema are valid before Stage 2 auth logic.
