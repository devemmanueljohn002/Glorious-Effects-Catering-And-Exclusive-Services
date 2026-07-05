import "dotenv/config"
import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()
async function main() {
  const email = process.env.SUPER_ADMIN_EMAIL?.toLowerCase()
  const password = process.env.SUPER_ADMIN_PASSWORD
  const name = process.env.SUPER_ADMIN_NAME ?? "Platform Owner"
  if (!email || !password || password.length < 8) throw new Error("Set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD (minimum 8 characters) before seeding.")
  const passwordHash = await bcrypt.hash(password, 12)
  const admin = await prisma.user.upsert({ where: { email }, update: { name, passwordHash, role: Role.SUPER_ADMIN, isActive: true }, create: { name, email, passwordHash, role: Role.SUPER_ADMIN } })
  await prisma.commissionSetting.upsert({ where: { id: "default" }, update: {}, create: { id: "default", rate: 15 } })
  console.log(`Seeded SUPER_ADMIN ${admin.email} and the 15% commission setting.`)
}
main().catch((error) => { console.error(error); process.exit(1) }).finally(async () => prisma.$disconnect())
