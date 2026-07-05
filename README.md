# Glorious Effects Catering and Exclusive Services

Multi-vendor catering and events marketplace for customers, vendors, and platform administrators.

## Repository structure

```text
Glorious-Effects-Catering-And-Exclusive-Services/
├── frontend/                  # Next.js customer, vendor and admin interfaces
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── package.json
├── backend/                   # Express REST API
│   ├── prisma/                # Supabase PostgreSQL schema and migrations
│   ├── src/
│   ├── docs/
│   └── package.json
├── BACKEND_DEVELOPER_GUIDE.md
└── README.md
```

The two applications are independent deployment units. Each directory has its own dependencies, environment variables, build command, and start command.

## Local development

Backend terminal:

```powershell
cd backend
npm install
npm run prisma:generate
npm run db:deploy
npm run dev
```

Frontend terminal:

```powershell
cd frontend
npm install
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000/api/v1`
- Swagger: `http://localhost:4000/api-docs`
- Database health: `http://localhost:4000/api/v1/health`

See [BACKEND_DEVELOPER_GUIDE.md](BACKEND_DEVELOPER_GUIDE.md) for environment setup, Supabase migrations, database inspection, Swagger authorization, and complete role flows.

## Deployment

### Frontend service

Configure the hosting service's root directory as:

```text
frontend
```

Build and start commands:

```text
npm install
npm run build
npm start
```

Required public variable:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.example.com/api/v1
```

### Backend service

Configure the backend hosting service's root directory as:

```text
backend
```

Build command:

```text
npm install && npm run prisma:generate && npm run build
```

Start command:

```text
npm start
```

Before or during a backend release, apply committed migrations once:

```text
npm run db:deploy
```

Configure the private Supabase, JWT, Super Admin, frontend-origin, and API URL variables from `backend/.env.example` in the backend hosting dashboard. Never expose backend secrets through `NEXT_PUBLIC_*` variables.

## Collaboration boundaries

- Customer-side developers work in `frontend/app` and the related customer components.
- Vendor and Super Admin developers work in the corresponding frontend routes and backend role modules.
- Backend schema changes must include the Prisma schema and generated migration.
- Payment-provider integration is deferred and is not part of the current backend.
