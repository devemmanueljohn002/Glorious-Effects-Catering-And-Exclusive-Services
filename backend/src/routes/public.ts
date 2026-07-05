import { Router } from "express"
import { BusinessType, ProductCategory, ProductStatus, VendorStatus } from "@prisma/client"
import { z } from "zod"
import { prisma } from "../lib/prisma.js"
import { asyncHandler } from "../middleware/async-handler.js"
import { AppError } from "../middleware/errors.js"

export const publicRouter = Router()
publicRouter.get("/vendors", asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1), limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 50)
  const search = String(req.query.search ?? ""), type = req.query.businessType as BusinessType | undefined
  const where = { status: VendorStatus.APPROVED, ...(type && { businessType: type }), ...(search && { businessName: { contains: search, mode: "insensitive" as const } }) }
  const [items, total] = await prisma.$transaction([prisma.vendorProfile.findMany({ where, skip: (page - 1) * limit, take: limit, include: { products: { where: { status: ProductStatus.ACTIVE }, take: 4 } } }), prisma.vendorProfile.count({ where })])
  res.json({ success: true, data: items, meta: { page, limit, total, pages: Math.ceil(total / limit) } })
}))
publicRouter.get("/vendors/:id", asyncHandler(async (req, res) => { const vendor = await prisma.vendorProfile.findFirst({ where: { id: req.params.id, status: VendorStatus.APPROVED }, include: { products: { where: { status: ProductStatus.ACTIVE } }, gallery: { where: { isPublic: true } } } }); if (!vendor) throw new AppError(404, "VENDOR_NOT_FOUND", "Vendor not found."); res.json({ success: true, data: vendor }) }))
publicRouter.get("/products", asyncHandler(async (req, res) => { const search = String(req.query.search ?? ""), category = req.query.category as ProductCategory | undefined; const items = await prisma.product.findMany({ where: { status: ProductStatus.ACTIVE, vendor: { status: VendorStatus.APPROVED }, ...(category && { category }), ...(search && { name: { contains: search, mode: "insensitive" } }) }, include: { vendor: { select: { id: true, businessName: true, logoUrl: true } } }, take: 100 }); res.json({ success: true, data: items }) }))
publicRouter.get("/products/:id", asyncHandler(async (req, res) => { const item = await prisma.product.findFirst({ where: { id: req.params.id, status: ProductStatus.ACTIVE, vendor: { status: VendorStatus.APPROVED } }, include: { vendor: true } }); if (!item) throw new AppError(404, "PRODUCT_NOT_FOUND", "Product not found."); res.json({ success: true, data: item }) }))
publicRouter.post("/quotes", asyncHandler(async (req, res) => { const data = z.object({ customerName: z.string().min(2), email: z.string().email(), phone: z.string().optional(), eventType: z.string().min(2), eventDate: z.coerce.date().optional(), guestCount: z.number().int().positive().optional(), location: z.string().optional(), budget: z.number().positive().optional(), details: z.string().optional() }).parse(req.body); const quote = await prisma.quoteRequest.create({ data }); res.status(201).json({ success: true, data: quote }) }))
