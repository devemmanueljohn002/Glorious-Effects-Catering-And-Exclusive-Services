import { Router } from "express"
import { OrderStatus, ProductCategory, ProductStatus, Role, WithdrawalStatus } from "@prisma/client"
import { z } from "zod"
import { prisma } from "../lib/prisma.js"
import { authenticate, authorize } from "../middleware/auth.js"
import { asyncHandler } from "../middleware/async-handler.js"
import { AppError } from "../middleware/errors.js"

export const vendorRouter = Router()
vendorRouter.use(authenticate, authorize(Role.VENDOR))
async function vendorFor(userId: string) { const vendor = await prisma.vendorProfile.findUnique({ where: { userId } }); if (!vendor) throw new AppError(404, "VENDOR_PROFILE_NOT_FOUND", "Vendor profile not found."); return vendor }

vendorRouter.get("/profile", asyncHandler(async (req, res) => { const vendor = await prisma.vendorProfile.findUnique({ where: { userId: req.auth!.sub }, include: { wallet: true, user: { select: { name: true, email: true } } } }); res.json({ success: true, data: vendor }) }))
vendorRouter.patch("/profile", asyncHandler(async (req, res) => {
  const data = z.object({ businessName: z.string().min(2).optional(), description: z.string().max(2000).optional(), phone: z.string().optional(), address: z.string().optional(), logoUrl: z.string().url().optional() }).parse(req.body)
  const vendor = await vendorFor(req.auth!.sub)
  const profile = await prisma.vendorProfile.update({ where: { id: vendor.id }, data })
  res.json({ success: true, data: profile })
}))
vendorRouter.get("/dashboard", asyncHandler(async (req, res) => { const vendor = await vendorFor(req.auth!.sub); const [totalOrders, pendingOrders, completedOrders, totals, wallet] = await Promise.all([prisma.order.count({ where: { vendorId: vendor.id } }), prisma.order.count({ where: { vendorId: vendor.id, orderStatus: { in: [OrderStatus.PENDING, OrderStatus.ACCEPTED, OrderStatus.PREPARING] } } }), prisma.order.count({ where: { vendorId: vendor.id, orderStatus: OrderStatus.COMPLETED } }), prisma.order.aggregate({ where: { vendorId: vendor.id, orderStatus: OrderStatus.COMPLETED }, _sum: { total: true } }), prisma.vendorWallet.findUnique({ where: { vendorId: vendor.id } })]); res.json({ success: true, data: { totalOrders, pendingOrders, completedOrders, completedOrderValue: totals._sum.total ?? 0, wallet } }) }))
vendorRouter.get("/products", asyncHandler(async (req, res) => { const vendor = await vendorFor(req.auth!.sub); res.json({ success: true, data: await prisma.product.findMany({ where: { vendorId: vendor.id }, orderBy: { createdAt: "desc" } }) }) }))
vendorRouter.post("/products", asyncHandler(async (req, res) => { const vendor = await vendorFor(req.auth!.sub); const data = z.object({ name: z.string().min(2), description: z.string().optional(), price: z.number().positive(), category: z.nativeEnum(ProductCategory), imageUrl: z.string().url().optional(), status: z.nativeEnum(ProductStatus).default(ProductStatus.ACTIVE) }).parse(req.body); res.status(201).json({ success: true, data: await prisma.product.create({ data: { ...data, vendorId: vendor.id } }) }) }))
vendorRouter.patch("/products/:id", asyncHandler(async (req, res) => {
  const vendor = await vendorFor(req.auth!.sub)
  const exists = await prisma.product.findFirst({ where: { id: req.params.id, vendorId: vendor.id } })
  if (!exists) throw new AppError(404, "PRODUCT_NOT_FOUND", "Product not found.")
  const data = z.object({ name: z.string().min(2).optional(), description: z.string().optional(), price: z.number().positive().optional(), category: z.nativeEnum(ProductCategory).optional(), imageUrl: z.string().url().optional(), status: z.nativeEnum(ProductStatus).optional() }).parse(req.body)
  const product = await prisma.product.update({ where: { id: exists.id }, data })
  res.json({ success: true, data: product })
}))
vendorRouter.delete("/products/:id", asyncHandler(async (req, res) => { const vendor = await vendorFor(req.auth!.sub); const result = await prisma.product.deleteMany({ where: { id: req.params.id, vendorId: vendor.id } }); if (!result.count) throw new AppError(404, "PRODUCT_NOT_FOUND", "Product not found."); res.status(204).send() }))
vendorRouter.get("/orders", asyncHandler(async (req, res) => { const vendor = await vendorFor(req.auth!.sub); res.json({ success: true, data: await prisma.order.findMany({ where: { vendorId: vendor.id }, orderBy: { createdAt: "desc" }, include: { items: true, customer: { select: { name: true, email: true, phone: true } } } }) }) }))
vendorRouter.patch("/orders/:id/status", asyncHandler(async (req, res) => { const vendor = await vendorFor(req.auth!.sub); const { status } = z.object({ status: z.nativeEnum(OrderStatus) }).parse(req.body); const order = await prisma.order.findFirst({ where: { id: req.params.id, vendorId: vendor.id } }); if (!order) throw new AppError(404, "ORDER_NOT_FOUND", "Order not found."); const updated = await prisma.order.update({ where: { id: order.id }, data: { orderStatus: status } }); res.json({ success: true, data: updated }) }))
vendorRouter.get("/earnings", asyncHandler(async (req, res) => { const vendor = await vendorFor(req.auth!.sub); const [wallet, transactions, withdrawn] = await Promise.all([prisma.vendorWallet.findUnique({ where: { vendorId: vendor.id } }), prisma.transaction.findMany({ where: { vendorId: vendor.id }, orderBy: { createdAt: "desc" }, take: 100 }), prisma.withdrawal.aggregate({ where: { vendorId: vendor.id, status: WithdrawalStatus.PAID }, _sum: { amount: true } })]); res.json({ success: true, data: { wallet, withdrawn: withdrawn._sum.amount ?? 0, transactions } }) }))
vendorRouter.post("/withdrawals", asyncHandler(async (req, res) => { const vendor = await vendorFor(req.auth!.sub); const data = z.object({ amount: z.number().positive(), bankName: z.string().min(2), accountNumber: z.string().min(8), accountName: z.string().min(2) }).parse(req.body); const wallet = await prisma.vendorWallet.findUniqueOrThrow({ where: { vendorId: vendor.id } }); if (Number(wallet.availableBalance) < data.amount) throw new AppError(409, "INSUFFICIENT_BALANCE", "Available balance is insufficient."); const withdrawal = await prisma.$transaction(async tx => { await tx.vendorWallet.update({ where: { vendorId: vendor.id }, data: { availableBalance: { decrement: data.amount } } }); return tx.withdrawal.create({ data: { ...data, vendorId: vendor.id } }) }); res.status(201).json({ success: true, data: withdrawal }) }))
vendorRouter.get("/withdrawals", asyncHandler(async (req, res) => { const vendor = await vendorFor(req.auth!.sub); res.json({ success: true, data: await prisma.withdrawal.findMany({ where: { vendorId: vendor.id }, orderBy: { requestedAt: "desc" } }) }) }))
