# YouTube Game Platform (MVP)

Stage 2 delivers a runnable monorepo with JWT authentication, protected frontend routes, and a PostgreSQL data model prepared for upcoming YouTube analytics and gamification stages.

## Tech stack

- Frontend: React + Vite + TypeScript + TailwindCSS + Zustand + React Router
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL + Prisma ORM
- Auth: JWT

## Project structure

```text
.
├── apps
│   ├── backend
│   │   ├── prisma
│   │   │   └── schema.prisma
│   │   ├── src
│   │   │   ├── config
│   │   │   │   ├── env.ts
│   │   │   │   └── prisma.ts
│   │   │   ├── middleware
│   │   │   │   ├── auth.middleware.ts
│   │   │   │   └── error.middleware.ts
│   │   │   ├── modules
│   │   │   │   └── auth
│   │   │   │       ├── auth.controller.ts
│   │   │   │       ├── auth.routes.ts
│   │   │   │       ├── auth.schema.ts
│   │   │   │       └── auth.service.ts
│   │   │   ├── routes
│   │   │   │   └── health.routes.ts
│   │   │   ├── types
│   │   │   │   └── express.d.ts
│   │   │   ├── utils
│   │   │   │   ├── jwt.ts
│   │   │   │   └── password.ts
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend
│       ├── src
│       │   ├── api
│       │   │   └── http.ts
│       │   ├── components
│       │   │   └── ProtectedRoute.tsx
│       │   ├── features
│       │   │   └── auth
│       │   │       ├── auth.api.ts
│       │   │       ├── auth.types.ts
│       │   │       └── authStore.ts
│       │   ├── layouts
│       │   │   └── AuthLayout.tsx
│       │   ├── pages
│       │   │   ├── DashboardPage.tsx
│       │   │   ├── HomePage.tsx
│       │   │   ├── LoginPage.tsx
│       │   │   └── RegisterPage.tsx
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

---

## Stage 1 + Stage 2 setup (step-by-step)

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
You can also change `FRONTEND_URL` if frontend runs on another host/port.

### 3) Create database and run Prisma migration

Ensure PostgreSQL is running and a database exists for `DATABASE_URL`.

```bash
npm run prisma:migrate
npm run prisma:generate
```

### 4) Start frontend + backend

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- Health check: `http://localhost:4000/api/health`

---

## Stage 2 implemented authentication

### Backend API endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected, requires `Authorization: Bearer <token>`)

### Example request payloads

#### Register

```json
{
  "email": "creator@example.com",
  "username": "creator_rpg",
  "password": "strongpassword123"
}
```

#### Login

```json
{
  "email": "creator@example.com",
  "password": "strongpassword123"
}
```

### Example successful response

```json
{
  "user": {
    "id": "clx...",
    "email": "creator@example.com",
    "username": "creator_rpg",
    "createdAt": "2026-02-17T21:30:00.000Z"
  },
  "token": "<jwt-token>"
}
```

### Error handling examples

- `400` validation errors (email format, short password, etc.)
- `401` invalid credentials / invalid token
- `409` duplicate email or username

---

## Manual test checklist

### Stage 1 checks

1. Open `http://localhost:5173` and verify the landing page appears.
2. Open `http://localhost:4000/api/health` and verify JSON response.
3. Confirm Prisma migration creates all tables.

### Stage 2 checks

1. Open `http://localhost:5173/register` and create a new account (UI in Russian).
2. Confirm redirect to `/dashboard` after successful registration.
3. Logout and login on `http://localhost:5173/login`.
4. Confirm `/dashboard` is blocked when logged out and redirects to `/login`.
5. Use browser devtools/network to verify JWT is sent to `GET /api/auth/me`.

---

## Sample test data

You can insert a sample user manually if needed:

```sql
INSERT INTO "User" (id, email, username, "passwordHash", "createdAt", "updatedAt")
VALUES ('usr_stage2_demo', 'demo2@example.com', 'demo_creator_2', '$2a$10$B2hYx3hM7Q2e4nYI4AnjSusrQ6qR47rQ5CyVQGfUk5a.wy96nW7O2', NOW(), NOW());
```

The hash above corresponds to a bcrypt example password and can be used to verify login flow quickly.
