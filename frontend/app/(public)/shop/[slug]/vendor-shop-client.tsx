// app/(public)/shop/[slug]/vendor-shop-client.tsx
"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Plus, Minus, ShoppingBag, AlertCircle } from "lucide-react"
import { formatNaira, type Vendor, type Product } from "@/lib/site-content"
import { useCart } from "@/components/site/cart-context"

interface VendorShopClientProps {
  vendor: Vendor
  vendorProducts: Product[]
  categories: string[]
}

// Helper function to extract min order from note
function getMinOrder(note?: string): number | null {
  if (!note) return null
  const match = note.match(/Min order:\s*(\d+)/i)
  return match ? parseInt(match[1]) : null
}

export function VendorShopClient({ vendorProducts, categories }: VendorShopClientProps) {
  const { cart, add, sub, remove } = useCart()
  const [activeCat, setActiveCat] = useState<string>("All")

  const visible = useMemo(() => {
    if (activeCat === "All") {
      return vendorProducts
    }
    return vendorProducts.filter((p) => p.tag === activeCat)
  }, [activeCat, vendorProducts])

  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((a, b) => a + b, 0)
  }, [cart])

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Cart count */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-3 bg-brown/10 px-4 py-2 rounded-full border border-border">
            <ShoppingBag className="h-4 w-4 text-brown" />
            <span className="text-sm text-brown font-medium">{totalItems} items in cart</span>
          </div>
        </div>

        {/* Category filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button 
                key={c} 
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition ${
                  activeCat === c
                    ? "gradient-gold text-ink border-transparent shadow-glass"
                    : "bg-card text-brown border-border hover:border-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {visible.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products available in this category</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {visible.map((p) => {
              const qty = cart[p.id] ?? 0
              const minOrder = getMinOrder(p.note)
              const totalPrice = p.price * qty

              return (
                <div key={p.id} className="bg-card rounded-2xl overflow-hidden border border-border shadow-glass group flex flex-col">
                  {/* Image */}
                  <div className="aspect-4/3 overflow-hidden bg-muted relative">
                    <Image 
                      src={p.img} 
                      alt={p.name} 
                      width={600} 
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    {minOrder && (
                      <span className="absolute bottom-3 left-3 bg-gold/90 font-bold text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                        <AlertCircle className="h-3 w-3" />
                        Min order: {minOrder}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4 space-y-2 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-gold">{p.tag}</p>
                        <h3 className="font-display text-base text-brown leading-tight">{p.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-base text-brown whitespace-nowrap">{formatNaira(p.price)}</p>
                        {minOrder && (
                          <p className="text-[9px] text-muted-foreground">per unit</p>
                        )}
                      </div>
                    </div>
                    
                    {p.desc && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {p.desc}
                      </p>
                    )}
                    
                    <div className="mt-auto pt-1">
                      {qty === 0 ? (
                        <button 
                          onClick={() => {
                            const addQty = minOrder || 1
                            add(p.id, addQty) // Now this works with 2 arguments
                          }}
                          className="w-full bg-brown text-primary-foreground rounded-full py-2 text-sm hover:bg-ink transition"
                        >
                          {minOrder ? `Add ${minOrder} (Min)` : "Add to cart"}
                        </button>
                      ) : (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between bg-beige rounded-full p-1">
                            <button 
                              onClick={() => {
                                if (minOrder && qty <= minOrder) {
                                  remove(p.id)
                                } else {
                                  sub(p.id)
                                }
                              }} 
                              className="h-7 w-7 rounded-full bg-card flex items-center justify-center hover:bg-white transition"
                            >
                              <Minus className="h-3.5 w-3.5 text-brown" />
                            </button>
                            <span className="text-sm text-brown font-medium">{qty} in cart</span>
                            <button 
                              onClick={() => add(p.id, 1)} 
                              className="h-7 w-7 rounded-full gradient-gold flex items-center justify-center"
                            >
                              <Plus className="h-3.5 w-3.5 text-ink" />
                            </button>
                          </div>
                          {minOrder && (
                            <div className="flex justify-between text-[10px] text-muted-foreground px-2">
                              <span>Min: {minOrder}</span>
                              <span>Total: {formatNaira(totalPrice)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}