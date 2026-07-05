import type { RequestHandler } from "express"
import type { Role } from "@prisma/client"
import { verifyAccessToken, type AccessClaims } from "../lib/tokens.js"
import { AppError } from "./errors.js"

declare global { namespace Express { interface Request { auth?: AccessClaims } } }

export const authenticate: RequestHandler = (req, _res, next) => {
  const [scheme, token] = req.headers.authorization?.split(" ") ?? []
  if (scheme !== "Bearer" || !token) return next(new AppError(401, "AUTH_REQUIRED", "A valid Bearer access token is required."))
  try { req.auth = verifyAccessToken(token); next() }
  catch { next(new AppError(401, "INVALID_TOKEN", "The access token is invalid or expired.")) }
}

export const authorize = (...roles: Role[]): RequestHandler => (req, _res, next) => {
  if (!req.auth) return next(new AppError(401, "AUTH_REQUIRED", "Authentication is required."))
  if (!roles.includes(req.auth.role)) return next(new AppError(403, "FORBIDDEN", "Your role cannot access this resource."))
  next()
}
