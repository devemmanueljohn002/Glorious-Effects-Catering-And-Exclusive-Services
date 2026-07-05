# GECES API endpoint map

Base URL: `/api/v1`. Swagger UI: `/api-docs`. OpenAPI JSON: `/api-docs.json`.

| Area | Method and path | Role | Purpose |
|---|---|---|---|
| Auth | `POST /auth/register` | Public | Register Customer or Vendor; vendor business details required |
| Auth | `POST /auth/login` | Public | Return user, role, access token, refresh token |
| Auth | `POST /auth/refresh` | Public | Rotate refresh token |
| Auth | `POST /auth/logout` | Public | Revoke refresh token |
| Auth | `GET /auth/me` | Any authenticated | Current profile |
| Marketplace | `GET /marketplace/vendors` | Public | Approved vendor directory |
| Marketplace | `GET /marketplace/vendors/:id` | Public | Vendor shop, products, gallery |
| Marketplace | `GET /marketplace/products` | Public | Product search/filter |
| Marketplace | `POST /marketplace/quotes` | Public | Quote request |
| Customer | `/customer/profile`, `/cart`, `/checkout`, `/orders`, `/bookings` | CUSTOMER | Profile, cart, ordering and event booking APIs |
| Vendor | `/vendor/profile`, `/products`, `/orders`, `/earnings`, `/withdrawals` | VENDOR | Store, product, fulfillment, wallet and payout APIs |
| Admin | `/admin/dashboard`, `/users`, `/vendors`, `/orders` | SUPER_ADMIN | Platform control and vendor approval |
| Admin finance | `/admin/withdrawals`, `/commission`, `/transactions` | SUPER_ADMIN | Commission, ledger and withdrawal operations |
| Admin service | `/admin/bookings`, `/admin/quotes` | SUPER_ADMIN | Booking and quote operations |

## Role guarantees

- Public registration accepts only `CUSTOMER` and `VENDOR`.
- `SUPER_ADMIN` is created using `npm run db:seed`; it cannot be self-assigned.
- Vendor product, order, wallet, and withdrawal queries are scoped to the authenticated vendor profile.
- Customer carts, orders, and bookings are scoped to the authenticated customer.
- Every `/admin/*` route requires `SUPER_ADMIN`.

## Order flow

1. Checkout snapshots product names and prices and calculates the configured commission.
2. Vendors manage the operational order status from pending through completion.
3. Payment-gateway collection and automated wallet settlement are deferred to a later phase.
