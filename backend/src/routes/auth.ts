import { Router } from "express"
import { BusinessType, Role } from "@prisma/client"
import { z } from "zod"
import { prisma } from "../lib/prisma.js"
import { hashPassword, verifyPassword } from "../lib/password.js"
import { hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from "../lib/tokens.js"
import { authenticate } from "../middleware/auth.js"
import { asyncHandler } from "../middleware/async-handler.js"
import { AppError } from "../middleware/errors.js"
import { validate } from "../middleware/validate.js"
import { env } from "../config/env.js"

export const authRouter = Router()
const registerSchema = z.object({ body: z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8), role: z.enum(["CUSTOMER", "VENDOR"]).default("CUSTOMER"), businessName: z.string().min(2).optional(), businessType: z.nativeEnum(BusinessType).optional() }).superRefine((data, ctx) => { if (data.role === "VENDOR" && (!data.businessName || !data.businessType)) ctx.addIssue({ code: "custom", message: "Vendors require businessName and businessType." }) }) })
const loginSchema = z.object({ body: z.object({ email: z.string().email(), password: z.string().min(1) }) })
const tokenSchema = z.object({ body: z.object({ refreshToken: z.string().min(20) }) })

async function issueTokens(user: { id: string; email: string; role: Role }) {
  const claims = { sub: user.id, email: user.email, role: user.role }
  const accessToken = signAccessToken(claims)
  const refreshToken = signRefreshToken(claims)
  await prisma.refreshToken.create({ data: { userId: user.id, tokenHash: hashToken(refreshToken), expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_TTL_DAYS * 86400000) } })
  return { accessToken, refreshToken }
}

authRouter.post("/register", validate(registerSchema), asyncHandler(async (req, res) => {
  const { name, email: rawEmail, password, role, businessName, businessType } = req.body as z.infer<typeof registerSchema>["body"]
  const email = rawEmail.toLowerCase()
  if (await prisma.user.findUnique({ where: { email } })) throw new AppError(409, "EMAIL_EXISTS", "An account with this email already exists.")
  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({ data: { name, email, passwordHash: await hashPassword(password), role: role as Role } })
    if (role === "VENDOR") { const vendor = await tx.vendorProfile.create({ data: { userId: created.id, businessName: businessName!, businessType: businessType! } }); await tx.vendorWallet.create({ data: { vendorId: vendor.id } }) }
    return created
  })
  res.status(201).json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, ...(await issueTokens(user)) } })
}))

authRouter.post("/login", validate(loginSchema), asyncHandler(async (req, res) => {
  const { email, password } = req.body as z.infer<typeof loginSchema>["body"]
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  if (!user || !user.isActive || !(await verifyPassword(password, user.passwordHash))) throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password.")
  res.json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, ...(await issueTokens(user)) } })
}))

authRouter.post("/refresh", validate(tokenSchema), asyncHandler(async (req, res) => {
  const { refreshToken } = req.body as z.infer<typeof tokenSchema>["body"]
  let claims; try { claims = verifyRefreshToken(refreshToken) } catch { throw new AppError(401, "INVALID_REFRESH_TOKEN", "The refresh token is invalid or expired.") }
  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash: hashToken(refreshToken) } })
  if (!stored || stored.revokedAt || stored.expiresAt <= new Date()) throw new AppError(401, "INVALID_REFRESH_TOKEN", "The refresh token is invalid or revoked.")
  const user = await prisma.user.findUniqueOrThrow({ where: { id: claims.sub } })
  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } })
  res.json({ success: true, data: await issueTokens(user) })
}))

authRouter.post("/logout", validate(tokenSchema), asyncHandler(async (req, res) => { await prisma.refreshToken.updateMany({ where: { tokenHash: hashToken((req.body as { refreshToken: string }).refreshToken), revokedAt: null }, data: { revokedAt: new Date() } }); res.status(204).send() }))
authRouter.get("/me", authenticate, asyncHandler(async (req, res) => { const user = await prisma.user.findUnique({ where: { id: req.auth!.sub }, select: { id: true, name: true, email: true, phone: true, role: true, isActive: true, vendorProfile: true } }); if (!user) throw new AppError(404, "USER_NOT_FOUND", "User not found."); res.json({ success: true, data: user }) }))
