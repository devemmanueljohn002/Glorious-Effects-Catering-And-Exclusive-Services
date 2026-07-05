import type { ErrorRequestHandler, RequestHandler } from "express"
import { ZodError } from "zod"

export class AppError extends Error {
  constructor(public status: number, public code: string, message: string, public details?: unknown) { super(message) }
}
export const notFound: RequestHandler = (req, _res, next) => next(new AppError(404, "NOT_FOUND", `Route ${req.method} ${req.originalUrl} was not found.`))
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) return res.status(422).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Request validation failed.", details: error.flatten() } })
  if (error instanceof AppError) return res.status(error.status).json({ success: false, error: { code: error.code, message: error.message, details: error.details } })
  console.error(error)
  return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "An unexpected server error occurred." } })
}
