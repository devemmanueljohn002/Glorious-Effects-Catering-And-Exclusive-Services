import swaggerJsdoc, { type Options } from "swagger-jsdoc"
import { env } from "../config/env.js"

const ok = { description: "Successful response" }
const secured = (tag: string, summary: string, description: string) => ({ tags: [tag], summary, description, security: [{ bearerAuth: [] }], responses: { 200: ok, 401: { description: "Missing, invalid, or expired access token" }, 403: { description: "Role is not permitted" } } })
const publicOp = (tag: string, summary: string, description: string) => ({ tags: [tag], summary, description, responses: { 200: ok } })

const options: Options = { definition: {
  openapi: "3.0.3",
  info: { title: "GECES Marketplace API", version: "1.0.0", description: "REST API for customers, vendors, and Super Admin operations. Payment-gateway integration is intentionally deferred. Money values use NGN major units in the API and Decimal columns in PostgreSQL." },
  servers: [{ url: env.API_BASE_URL, description: env.NODE_ENV }],
  tags: ["Auth", "Marketplace", "Customer", "Vendor", "Super Admin"].map(name => ({ name })),
  components: {
    securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT", description: "Short-lived access token returned by /auth/login or /auth/refresh." } },
    schemas: {
      Error: { type: "object", properties: { success: { type: "boolean", example: false }, error: { type: "object", properties: { code: { type: "string" }, message: { type: "string" }, details: {} } } } },
      User: { type: "object", properties: { id: { type: "string" }, name: { type: "string" }, email: { type: "string", format: "email" }, role: { type: "string", enum: ["CUSTOMER", "VENDOR", "SUPER_ADMIN"] }, isActive: { type: "boolean" } } },
      Tokens: { type: "object", properties: { accessToken: { type: "string" }, refreshToken: { type: "string" } } },
      Product: { type: "object", properties: { id: { type: "string" }, vendorId: { type: "string" }, name: { type: "string" }, price: { type: "number" }, category: { type: "string", enum: ["FOOD", "CAKE", "DECORATION", "MC", "PHOTOGRAPHY", "DRINKS", "SMALL_CHOPS"] }, status: { type: "string", enum: ["ACTIVE", "INACTIVE", "OUT_OF_STOCK"] } } },
      Order: { type: "object", properties: { id: { type: "string" }, orderNumber: { type: "string" }, subtotal: { type: "number" }, platformFee: { type: "number" }, total: { type: "number" }, orderStatus: { type: "string", enum: ["PENDING", "ACCEPTED", "PREPARING", "COMPLETED", "CANCELLED"] } } },
      Withdrawal: { type: "object", properties: { id: { type: "string" }, amount: { type: "number" }, bankName: { type: "string" }, accountNumber: { type: "string" }, accountName: { type: "string" }, status: { type: "string", enum: ["PENDING", "APPROVED", "REJECTED", "PAID"] } } },
    },
  },
  paths: {
    "/health": { get: publicOp("Marketplace", "Health check", "Confirms API and database connectivity.") },
    "/auth/register": { post: publicOp("Auth", "Register customer or vendor", "Creates CUSTOMER or VENDOR accounts. SUPER_ADMIN cannot be self-assigned and is created only by the seed command.") },
    "/auth/login": { post: publicOp("Auth", "Login", "Returns the user role plus JWT access and refresh tokens.") },
    "/auth/refresh": { post: publicOp("Auth", "Rotate refresh token", "Revokes the submitted refresh token and returns a new token pair.") },
    "/auth/logout": { post: publicOp("Auth", "Logout", "Revokes a refresh token.") },
    "/auth/me": { get: secured("Auth", "Current account", "Returns the authenticated profile and vendor profile when applicable.") },
    "/marketplace/vendors": { get: publicOp("Marketplace", "List approved vendors", "Supports page, limit, search, and businessType query parameters.") },
    "/marketplace/vendors/{id}": { get: publicOp("Marketplace", "Vendor storefront", "Returns an approved vendor with active products and public gallery.") },
    "/marketplace/products": { get: publicOp("Marketplace", "Search products", "Supports search and category filters and excludes unapproved vendors.") },
    "/marketplace/products/{id}": { get: publicOp("Marketplace", "Product details", "Returns one active marketplace product.") },
    "/marketplace/quotes": { post: publicOp("Marketplace", "Request a quote", "Creates a public catering or event quote request.") },
    "/customer/profile": { patch: secured("Customer", "Update profile", "CUSTOMER only. Updates name or phone.") },
    "/customer/cart": { get: secured("Customer", "Get carts", "Returns carts grouped by vendor to enforce single-vendor checkout.") },
    "/customer/cart/items": { post: secured("Customer", "Add cart item", "Creates or replaces quantity for a product in its vendor cart.") },
    "/customer/cart/items/{id}": { delete: secured("Customer", "Remove cart item", "Removes a cart item owned by the customer.") },
    "/customer/checkout": { post: secured("Customer", "Create order", "Converts one vendor cart into an order using the current commission percentage.") },
    "/customer/orders": { get: secured("Customer", "List orders", "Returns only the authenticated customer's orders.") },
    "/customer/orders/{id}": { get: secured("Customer", "Order details", "Returns one owned order with its items and vendor.") },
    "/customer/bookings": { get: secured("Customer", "List bookings", "Returns the customer's event bookings."), post: secured("Customer", "Create booking", "Creates an event booking request.") },
    "/vendor/profile": { get: secured("Vendor", "Vendor profile", "VENDOR only."), patch: secured("Vendor", "Update vendor profile", "Updates store information; approval status remains controlled by Super Admin.") },
    "/vendor/dashboard": { get: secured("Vendor", "Vendor metrics", "Orders, revenue, and wallet balances.") },
    "/vendor/products": { get: secured("Vendor", "List owned products", "Returns products for the authenticated vendor."), post: secured("Vendor", "Create product", "Creates a product belonging to the authenticated vendor.") },
    "/vendor/products/{id}": { patch: secured("Vendor", "Update owned product", "Ownership is enforced."), delete: secured("Vendor", "Delete owned product", "Ownership is enforced.") },
    "/vendor/orders": { get: secured("Vendor", "Vendor orders", "Returns orders received by the vendor.") },
    "/vendor/orders/{id}/status": { patch: secured("Vendor", "Update order status", "Updates an owned order's operational status.") },
    "/vendor/earnings": { get: secured("Vendor", "Earnings and transactions", "Returns wallet balances, paid withdrawals, and transaction history.") },
    "/vendor/withdrawals": { get: secured("Vendor", "Withdrawal history", "Returns requests for the vendor."), post: secured("Vendor", "Request withdrawal", "Reserves funds from available balance.") },
    "/admin/dashboard": { get: secured("Super Admin", "Platform metrics", "SUPER_ADMIN only. Revenue, commission, users, vendors, orders, and pending withdrawals.") },
    "/admin/users": { get: secured("Super Admin", "Manage users", "Lists users with optional role filter.") },
    "/admin/users/{id}": { patch: secured("Super Admin", "Update user access", "Changes role or activation state; self-lockout is blocked.") },
    "/admin/vendors": { get: secured("Super Admin", "Manage vendors", "Lists vendors with optional approval-status filter.") },
    "/admin/vendors/{id}/status": { patch: secured("Super Admin", "Approve or suspend vendor", "Sets PENDING, APPROVED, SUSPENDED, or REJECTED and writes an audit log.") },
    "/admin/orders": { get: secured("Super Admin", "All orders", "Returns up to 500 platform orders.") },
    "/admin/withdrawals": { get: secured("Super Admin", "All withdrawals", "Supports status filtering.") },
    "/admin/withdrawals/{id}/status": { patch: secured("Super Admin", "Process withdrawal", "Approves, rejects, or marks paid; rejected funds return to the vendor wallet.") },
    "/admin/commission": { get: secured("Super Admin", "Get commission", "Returns platform percentage."), patch: secured("Super Admin", "Set commission", "Sets a percentage between 0 and 100.") },
    "/admin/transactions": { get: secured("Super Admin", "Financial ledger", "Returns commission and payout records.") },
    "/admin/quotes": { get: secured("Super Admin", "Quote requests", "Lists quote requests.") },
    "/admin/quotes/{id}": { patch: secured("Super Admin", "Update quote", "Updates quote status and admin notes.") },
    "/admin/bookings": { get: secured("Super Admin", "All bookings", "Lists customer event bookings.") },
    "/admin/bookings/{id}": { patch: secured("Super Admin", "Update booking", "Updates booking status.") },
  },
}, apis: [] }

export const openapi = swaggerJsdoc(options)
