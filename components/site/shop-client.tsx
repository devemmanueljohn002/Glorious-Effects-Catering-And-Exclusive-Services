"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Plus, Minus } from "lucide-react"
import { PRODUCTS, PRODUCT_CATEGORIES, formatNaira, type ProductCategory } from "@/lib/site-content"
import { useCart } from "@/components/site/cart-context"

export function ShopClient() {
  const { cart, add, sub } = useCart()
  const [activeCat, setActiveCat] = useState<(typeof PRODUCT_CATEGORIES)[number]>("All")

  const visible = useMemo(
    () => (activeCat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.tag === activeCat)),
    [activeCat],
  )

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {PRODUCT_CATEGORIES.map((c) => (
          <button key={c} onClick={() => setActiveCat(c as ProductCategory | "All")}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition ${
              activeCat === c
                ? "gradient-gold text-ink border-transparent shadow-glass"
                : "bg-card text-brown border-border hover:border-gold"
            }`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {visible.map((p) => {
          const qty = cart[p.id] ?? 0
          return (
            <div key={p.id} className="bg-card rounded-2xl overflow-hidden border border-border shadow-glass group flex flex-col">
              <div className="aspect-square overflow-hidden bg-muted">
                <Image src={p.img} alt={p.name} width={600} height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-4 space-y-3 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-gold">{p.tag}{p.note ? ` · ${p.note}` : ""}</p>
                    <h3 className="font-display text-lg text-brown leading-tight">{p.name}</h3>
                  </div>
                  <p className="font-display text-base text-brown whitespace-nowrap">{formatNaira(p.price)}</p>
                </div>
                {p.desc && <p className="text-xs text-muted-foreground line-clamp-2">{p.desc}</p>}
                <div className="mt-auto pt-1">
                  {qty === 0 ? (
                    <button onClick={() => add(p.id)}
                      className="w-full bg-brown text-primary-foreground rounded-full py-2.5 text-sm hover:bg-ink transition">
                      Add to cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-beige rounded-full p-1">
                      <button onClick={() => sub(p.id)} className="h-8 w-8 rounded-full bg-card flex items-center justify-center hover:bg-white transition">
                        <Minus className="h-4 w-4 text-brown" />
                      </button>
                      <span className="text-sm text-brown font-medium">{qty} in cart</span>
                      <button onClick={() => add(p.id)} className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center">
                        <Plus className="h-4 w-4 text-ink" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
