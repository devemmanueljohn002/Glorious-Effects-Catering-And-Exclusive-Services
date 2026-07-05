import crypto from "node:crypto"
import jwt, { type SignOptions } from "jsonwebtoken"
import type { Role } from "@prisma/client"
import { env } from "../config/env.js"

export type AccessClaims = { sub: string; email: string; role: Role }
export const hashToken = (token: string) => crypto.createHash("sha256").update(token).digest("hex")

export function signAccessToken(claims: AccessClaims) {
  return jwt.sign(claims, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL as SignOptions["expiresIn"] })
}
export function signRefreshToken(claims: AccessClaims) {
  return jwt.sign(claims, env.JWT_REFRESH_SECRET, { expiresIn: `${env.REFRESH_TOKEN_TTL_DAYS}d` as SignOptions["expiresIn"] })
}
export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessClaims
}
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as AccessClaims
}
