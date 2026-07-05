import type { RequestHandler } from "express"
import type { ZodType } from "zod"
export const validate = (schema: ZodType): RequestHandler => (req, _res, next) => {
  const parsed = schema.parse({ body: req.body, params: req.params, query: req.query }) as { body?: unknown; params?: unknown; query?: unknown }
  if (parsed.body) req.body = parsed.body
  if (parsed.params) Object.assign(req.params, parsed.params)
  if (parsed.query) Object.assign(req.query, parsed.query)
  next()
}
