import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import swaggerUi from "swagger-ui-express"
import { env } from "./config/env.js"
import { prisma } from "./lib/prisma.js"
import { authRouter } from "./routes/auth.js"
import { publicRouter } from "./routes/public.js"
import { customerRouter } from "./routes/customer.js"
import { vendorRouter } from "./routes/vendor.js"
import { adminRouter } from "./routes/admin.js"
import { errorHandler, notFound } from "./middleware/errors.js"
import { asyncHandler } from "./middleware/async-handler.js"
import { openapi } from "./docs/openapi.js"

export const app = express()
app.set("trust proxy", 1)
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }))
app.use(compression())
app.use(express.json({ limit: "2mb" }))
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"))
app.use("/api/v1/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true, legacyHeaders: false }), authRouter)
app.use("/api/v1/marketplace", publicRouter)
app.use("/api/v1/customer", customerRouter)
app.use("/api/v1/vendor", vendorRouter)
app.use("/api/v1/admin", adminRouter)
app.get("/api/v1/health", asyncHandler(async (_req, res) => { await prisma.$queryRaw`SELECT 1`; res.json({ success: true, data: { status: "ok", database: "connected", timestamp: new Date().toISOString() } }) }))
app.get("/api-docs.json", (_req, res) => res.json(openapi))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi, { customSiteTitle: "GECES API Documentation" }))
app.use(notFound)
app.use(errorHandler)
