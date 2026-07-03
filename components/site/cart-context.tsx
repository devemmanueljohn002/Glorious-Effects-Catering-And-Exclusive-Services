// components/site/cart-context.tsx
"use client"

import { createContext, useContext, useMemo, useState } from "react"
import { toast } from "sonner"
import { PRODUCTS, getVendorByProductId,type Product } from "@/lib/site-content"

type CartItem = Product & { qty: number; vendorId: string; vendorName: string }
type CartContextValue = {
  cart: Record<string, number>
  cartItems: CartItem[]
  total: number
  itemCount: number
  vendorSummary: { vendorId: string; vendorName: string; total: number; items: CartItem[] }[]
  add: (id: string, quantity?: number) => void  // Allow optional quantity parameter
  sub: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({})

  const cartItems = useMemo(() => {
    return PRODUCTS.filter((p) => cart[p.id]).map((p) => {
      const vendor = getVendorByProductId(p.id)
      return {
        ...p,
        qty: cart[p.id],
        vendorId: vendor?.id || "unknown",
        vendorName: vendor?.name || "Unknown Vendor"
      }
    })
  }, [cart])

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const itemCount = cartItems.reduce((s, i) => s + i.qty, 0)

  // Group items by vendor
  const vendorSummary = useMemo(() => {
    const vendorMap = new Map<string, { vendorName: string; items: CartItem[]; total: number }>()
    
    cartItems.forEach(item => {
      const existing = vendorMap.get(item.vendorId)
      if (existing) {
        existing.items.push(item)
        existing.total += item.price * item.qty
      } else {
        vendorMap.set(item.vendorId, {
          vendorName: item.vendorName,
          items: [item],
          total: item.price * item.qty
        })
      }
    })
    
    return Array.from(vendorMap.entries()).map(([vendorId, data]) => ({
      vendorId,
      vendorName: data.vendorName,
      total: data.total,
      items: data.items
    }))
  }, [cartItems])

  // Updated add function to support quantity
  const add = (id: string, quantity: number = 1) => {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + quantity }))
    const product = PRODUCTS.find((p) => p.id === id)
    if (product) {
      const qtyText = quantity > 1 ? `${quantity} × ` : ''
      toast.success(`Added ${qtyText}${product.name} to cart`)
    }
  }

  const sub = (id: string) =>
    setCart((c) => {
      const next = { ...c }
      const q = (next[id] ?? 0) - 1
      if (q <= 0) delete next[id]
      else next[id] = q
      return next
    })

  const remove = (id: string) =>
    setCart((c) => { const n = { ...c }; delete n[id]; return n })

  const clear = () => setCart({})

  return (
    <CartContext.Provider value={{ cart, cartItems, total, itemCount, vendorSummary, add, sub, remove, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}