# GECES Backend Developer Guide

This guide explains how every collaborator should run the backend, connect it to the shared Supabase PostgreSQL database, inspect tables, use Swagger, and understand the API flow.

## 1. Requirements

Install the following before starting:

- Node.js 20 or newer
- npm
- Git
- Access to the GECES Supabase project

The backend is located in the `backend` directory and runs separately from the Next.js frontend.

## 2. Get the latest project

From PowerShell:

```powershell
git pull origin main
cd backend
npm install
```

Do not run `npm audit fix --force`. A forced update can introduce incompatible major versions. Run `npm audit` first and discuss dependency upgrades with the team.

## 3. Create the private environment file

Create `backend/.env` from `backend/.env.example`:

```powershell
Copy-Item .env.example .env
```

Ask the project owner for the actual Supabase connection strings and JWT secrets. Do not send them in Git, screenshots, chat messages, or Swagger examples.

Required variables:

```env
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000
API_BASE_URL=http://localhost:4000/api/v1

DATABASE_URL=SUPABASE_TRANSACTION_POOLER_URL
DIRECT_URL=SUPABASE_DIRECT_OR_SESSION_URL

JWT_ACCESS_SECRET=AT_LEAST_32_RANDOM_CHARACTERS
JWT_REFRESH_SECRET=A_DIFFERENT_32_CHARACTER_SECRET
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL_DAYS=30

SUPER_ADMIN_NAME=Platform Owner
SUPER_ADMIN_EMAIL=admin@geces.com
SUPER_ADMIN_PASSWORD=A_STRONG_PRIVATE_PASSWORD
```

- `DATABASE_URL` is used by the running API.
- `DIRECT_URL` is used by Prisma migrations.
- Every collaborator who connects to the same Supabase project must use the same database URLs.
- `.env` is ignored by Git and must remain private.

## 4. Prepare Prisma in the correct order

Run these commands inside `backend`:

```powershell
npm run prisma:generate
npx prisma validate
npm run db:deploy
npm run db:seed
```

What each command does:

1. `prisma:generate` generates the typed Prisma database client.
2. `prisma validate` checks the schema and environment configuration.
3. `db:deploy` applies migrations already committed by the team to Supabase.
4. `db:seed` safely creates or updates the initial Super Admin and default commission setting.

Use `db:deploy` when pulling existing team migrations. Do not create another initial migration.

When intentionally changing the schema during development, only the developer responsible for that schema change should run:

```powershell
npm run db:migrate -- --name short_description_of_change
```

Commit both `prisma/schema.prisma` and the generated `prisma/migrations/.../migration.sql` directory.

## 5. Start the backend

In the backend terminal:

```powershell
cd path\to\Glorious-Effects-Catering-And-Exclusive-Services\backend
npm run dev
```

The API runs at:

```text
http://localhost:4000/api/v1
```

Confirm the server and database are connected:

```text
http://localhost:4000/api/v1/health
```

Expected result:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "database": "connected"
  }
}
```

## 6. Start the frontend

Open a second terminal:

```powershell
cd path\to\Glorious-Effects-Catering-And-Exclusive-Services
npm install
npm run dev
```

The frontend runs at `http://localhost:3000` and the backend remains on port `4000`.

The frontend environment should contain:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

## 7. View the database tables

### Option A: Prisma Studio

From the `backend` directory:

```powershell
npm run db:studio
```

Open the URL printed in the terminal, normally `http://localhost:5555`. Prisma Studio displays the Supabase tables and records using the Prisma models.

### Option B: Supabase Dashboard

1. Open the shared Supabase project.
2. Select **Table Editor**.
3. Select the `public` schema.
4. The migrated tables should be visible there.

Important tables include:

- `User` and `RefreshToken`
- `VendorProfile`, `Product`, and `GalleryItem`
- `Cart` and `CartItem`
- `Order` and `OrderItem`
- `Booking` and `QuoteRequest`
- `VendorWallet`, `Withdrawal`, and `Transaction`
- `CommissionSetting` and `AuditLog`

Payment-provider tables and endpoints are intentionally excluded in this phase.

## 8. View and test Swagger endpoints

Start the backend, then open:

- Swagger UI: `http://localhost:4000/api-docs`
- OpenAPI JSON: `http://localhost:4000/api-docs.json`

For protected routes:

1. Open `POST /auth/login`.
2. Select **Try it out**.
3. Enter a valid email and password.
4. Copy `data.tokens.accessToken` from the response.
5. Select **Authorize** at the top of Swagger.
6. Paste the access token. Swagger adds the `Bearer` prefix automatically.
7. Test only endpoints allowed for that account's role.

An HTTP `401` means the token is missing, invalid, or expired. An HTTP `403` means the user is authenticated but does not have the required role.

## 9. Authentication and role flow

### Registration

`POST /auth/register` accepts only:

- `CUSTOMER`
- `VENDOR`

Users cannot register themselves as `SUPER_ADMIN`. The Super Admin is created with `npm run db:seed`.

### Login

`POST /auth/login` returns:

- the user profile and role
- a short-lived access token
- a refresh token

The frontend redirects by role:

- `CUSTOMER` → `/account`
- `VENDOR` → `/vendor/dashboard`
- `SUPER_ADMIN` → `/admin/dashboard`

### Token refresh and logout

- `POST /auth/refresh` rotates the refresh token and returns a new token pair.
- `POST /auth/logout` revokes the submitted refresh token.
- `GET /auth/me` returns the authenticated account.

## 10. Complete marketplace flow

### Customer flow

1. Register or log in as `CUSTOMER`.
2. Browse approved vendors and active products through `/marketplace` endpoints.
3. Add products to a cart. Each cart belongs to one vendor.
4. Checkout converts the cart into an order.
5. View owned orders and bookings.

Customer backend endpoints are ready, but the other frontend developer owns customer-side integration.

### Vendor flow

1. Register with role `VENDOR` and provide the business details.
2. A `VendorProfile` and `VendorWallet` are created automatically.
3. The vendor initially has `PENDING` status.
4. The Super Admin changes the vendor to `APPROVED`.
5. The vendor can manage its profile and products.
6. The vendor can see only its own orders and update their operational status.
7. Vendor queries are scoped using the authenticated vendor account; a vendor cannot modify another vendor's records.

### Super Admin flow

1. Run the seed command to create the Super Admin.
2. Log in using the credentials stored in `backend/.env`.
3. View users, vendors, orders, bookings, quotes, withdrawals, commission settings, and audit information.
4. Approve, reject, suspend, or reactivate vendors.
5. Manage user roles and activation state. The API blocks accidental removal of the currently logged-in Super Admin's own access.

## 11. Current order and financial scope

Checkout currently creates an order and records the configured platform commission amount. Vendors manage operational order statuses.

Payment-gateway collection, payment verification, webhook processing, refunds, and automatic wallet settlement are deferred. Do not add provider-specific frontend integration until the team selects and approves a payment provider.

## 12. Verification before pushing code

Run from `backend`:

```powershell
npm run prisma:generate
npx prisma validate
npm run lint
npm run build
```

Run from the project root:

```powershell
npm run build
git status
```

Both builds must finish successfully before opening a pull request.

## 13. Common errors

### Backend environment validation failed

The `.env` file is missing or a required value is invalid. JWT secrets must contain at least 32 characters.

### Prisma cannot reach Supabase

Check `DATABASE_URL`, `DIRECT_URL`, internet access, the database password, and whether the correct Supabase pooler/direct host is being used.

### Port 4000 is already in use

Stop the previous backend process or change `PORT` in `backend/.env` and update `API_BASE_URL` accordingly.

### Swagger returns 401

Log in again, copy the newest access token, and authorize Swagger again.

### Swagger returns 403

Use an account with the correct role for that endpoint.

### Prisma models changed after pulling

Run:

```powershell
npm install
npm run prisma:generate
npm run db:deploy
```

Never edit records in the production Supabase database without team approval.
