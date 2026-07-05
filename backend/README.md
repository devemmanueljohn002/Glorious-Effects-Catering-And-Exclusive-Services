# GECES Marketplace API

Express + TypeScript + Prisma backend for the Glorious Events multi-vendor marketplace. Supabase provides PostgreSQL; Prisma owns the application schema and migrations.

## Setup

1. In Supabase: **Project Settings → Database → Connection string**.
2. Copy `.env.example` to `.env`.
3. Put the transaction-pooler URL (`port 6543`, `pgbouncer=true`) in `DATABASE_URL` for API traffic.
4. Put the session/direct URL (`port 5432`) in `DIRECT_URL` for migrations and seeds.
5. Set two independent random JWT secrets (minimum 32 characters).
6. Set the initial Super Admin email and password.
7. Run:

```bash
npm install
npm run prisma:generate
npm run db:migrate -- --name init_marketplace
npm run db:seed
npm run dev
```

Swagger UI is at `http://localhost:4000/api-docs` and the OpenAPI document is at `/api-docs.json`.

## Frontend variables

Add this to the root frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

## Seeded owner

`npm run db:seed` upserts the environment-specified account as `SUPER_ADMIN` and creates the default 15% commission record. Never commit the real password.

## Security notes

- Access tokens are short lived; refresh tokens are hashed, stored, rotated and revocable.
- Public registration cannot request `SUPER_ADMIN`.
- RBAC and ownership are enforced on the API, not trusted from the frontend.
- Payment-gateway integration is intentionally excluded from this phase.
