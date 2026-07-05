// components/site/mini-cart.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Plus, Minus, Trash2, Store, Trash } from "lucide-react"
import { useCart } from "@/components/site/cart-context"
import { formatNaira } from "@/lib/site-content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type DrawerStep = "cart" | "details" | "confirmed"

export function MiniCart() {
  const { cartItems, total, itemCount, vendorSummary, add, sub, remove, clear } = useCart()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<DrawerStep>("cart")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [orderRef, setOrderRef] = useState("")

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  function closeDrawer() {
    setOpen(false)
    setTimeout(() => setStep("cart"), 300)
  }

  function handlePay(e: React.FormEvent) {
    e.preventDefault()
    // TODO: call Korapay checkout API
    const ref = `GECES-${Date.now().toString().slice(-8)}`
    setOrderRef(ref)
    setStep("confirmed")
  }

  function startNewOrder() {
    clear(); setName(""); setEmail(""); closeDrawer()
  }

  // Handle clear cart with confirmation
  function handleClearCart() {
    if (cartItems.length > 0 && confirm("Are you sure you want to clear your cart?")) {
      clear()
    }
  }

  return (
    <>
      {/* Cart button in nav */}
      <button onClick={() => setOpen(true)} aria-label="Open cart"
        className="relative inline-flex items-center gap-2 bg-brown text-primary-foreground rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-ink transition">
        <ShoppingBag className="h-4 w-4" />
        <span className="hidden sm:inline">Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full gradient-gold text-ink text-[10px] font-bold flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Mobile floating bar */}
      {itemCount > 0 && (
        <button onClick={() => setOpen(true)}
          className="lg:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center justify-between bg-brown text-primary-foreground rounded-full px-5 py-3.5 shadow-luxe">
          <span className="flex items-center gap-2 text-sm font-medium">
            <ShoppingBag className="h-4 w-4" /> {itemCount} item{itemCount > 1 ? "s" : ""}
          </span>
          <span className="font-display text-base text-gold">{formatNaira(total)}</span>
          <span className="text-xs text-primary-foreground/70">View cart →</span>
        </button>
      )}

      {/* Overlay + Drawer */}
      {open && (
        <div className="fixed inset-0 z-250 flex justify-end" onClick={closeDrawer}>
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
          <aside
            className="relative w-full max-w-md h-full bg-background flex flex-col shadow-luxe animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {step === "cart" && (
              <>
                <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                  <h3 className="font-display text-xl text-brown">Your Order</h3>
                  <button onClick={closeDrawer} className="p-1 rounded-full hover:bg-muted transition text-muted-foreground text-2xl leading-none">×</button>
                </div>

                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground p-10 text-center">
                    <ShoppingBag className="h-10 w-10" />
                    <p className="text-sm">Your cart is empty. Add something delicious 🍰</p>
                    <Button asChild variant="outline" className="rounded-full border-gold text-brown hover:bg-gold/10">
                      <Link href="/shop" onClick={closeDrawer}>Browse the shop</Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between px-6 py-2 border-b border-border/40">
                      <span className="text-xs text-muted-foreground">{itemCount} items</span>
                      <button 
                        onClick={handleClearCart}
                        className="inline-flex items-center gap-1.5 text-xs text-destructive hover:text-destructive/80 transition"
                      >
                        <Trash className="h-3.5 w-3.5" />
                        Clear all
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                      {vendorSummary.map((vendor) => (
                        <div key={vendor.vendorId} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Store className="h-3.5 w-3.5 text-gold" />
                              <p className="text-xs font-semibold text-gold uppercase tracking-wider">
                                {vendor.vendorName}
                              </p>
                            </div>
                            <span className="text-xs font-medium text-brown">{formatNaira(vendor.total)}</span>
                          </div>
                          {vendor.items.map((i) => (
                            <div key={i.id} className="flex items-start gap-3 bg-beige/50 rounded-2xl p-3">
                              <Image src={i.img} alt="" width={56} height={56} className="h-14 w-14 rounded-xl object-cover shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-brown font-medium leading-tight">{i.name}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{formatNaira(i.price)}</p>
                                <div className="flex items-center gap-2 mt-2 bg-background rounded-full px-2 py-1 w-fit">
                                  <button onClick={() => sub(i.id)} className="h-5 w-5 rounded-full bg-muted flex items-center justify-center hover:bg-border transition">
                                    <Minus className="h-3 w-3 text-brown" />
                                  </button>
                                  <span className="text-xs font-semibold text-brown min-w-4 text-center">{i.qty}</span>
                                  <button onClick={() => add(i.id)} className="h-5 w-5 rounded-full gradient-gold flex items-center justify-center">
                                    <Plus className="h-3 w-3 text-ink" />
                                  </button>
                                </div>
                              </div>
                              <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive transition p-1">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="px-6 py-5 border-t border-border bg-card space-y-3">
                      <div className="space-y-1.5">
                        {vendorSummary.map((vendor) => (
                          <div key={vendor.vendorId} className="flex justify-between text-sm">
                            <span className="text-muted-foreground text-xs">{vendor.vendorName}</span>
                            <span className="text-brown font-medium text-sm">{formatNaira(vendor.total)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-end justify-between pt-2 border-t border-border">
                        <span className="text-sm text-muted-foreground">Total</span>
                        <span className="font-display text-2xl text-brown">{formatNaira(total)}</span>
                      </div>
                      <Button onClick={() => setStep("details")} className="w-full gradient-gold text-ink rounded-full h-12 hover:opacity-90 border-0 font-semibold">
                        Go to checkout
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}

            {step === "details" && (
              <>
                <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
                  <button onClick={() => setStep("cart")} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-brown hover:bg-border transition text-sm">←</button>
                  <h3 className="font-display text-xl text-brown flex-1">Delivery details</h3>
                  <button onClick={closeDrawer} className="text-2xl leading-none text-muted-foreground hover:text-foreground transition">×</button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                  <div className="bg-beige/40 rounded-2xl p-4 space-y-3">
                    <p className="text-[10px] uppercase tracking-widest text-gold font-semibold">Order summary</p>
                    
                    {vendorSummary.map((vendor) => (
                      <div key={vendor.vendorId} className="space-y-1">
                        <p className="text-xs font-medium text-gold">{vendor.vendorName}</p>
                        {vendor.items.map((i) => (
                          <div key={i.id} className="flex justify-between text-sm text-brown pl-2">
                            <span>{i.qty}× {i.name}</span>
                            <span>{formatNaira(i.price * i.qty)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between text-sm font-medium text-brown pl-2 border-t border-border/50 pt-1">
                          <span>Subtotal</span>
                          <span>{formatNaira(vendor.total)}</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between pt-3 border-t border-border font-display text-lg text-brown">
                      <span>Total</span>
                      <span>{formatNaira(total)}</span>
                    </div>
                  </div>
                  <form onSubmit={handlePay} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="drawerName" className="text-xs uppercase tracking-widest text-muted-foreground">Full name</Label>
                      <Input id="drawerName" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="drawerEmail" className="text-xs uppercase tracking-widest text-muted-foreground">Email</Label>
                      <Input id="drawerEmail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ada@example.com" className="rounded-xl h-11" />
                    </div>
                    <Button type="submit" className="w-full gradient-gold text-ink rounded-full h-12 hover:opacity-90 border-0 font-semibold">
                      Pay {formatNaira(total)} with Korapay
                    </Button>
                    <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                      Secure payments by Korapay. Cards, bank transfer & USSD supported.
                    </p>
                  </form>
                </div>
              </>
            )}

            {step === "confirmed" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-10 gap-4">
                <div className="h-16 w-16 rounded-full gradient-gold text-ink flex items-center justify-center text-3xl font-bold">✓</div>
                <h3 className="font-display text-2xl text-brown">Order received!</h3>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                  Thank you, {name.split(" ")[0] || "friend"} — your order <strong>{orderRef}</strong> for {formatNaira(total)} has been placed.
                  A confirmation will be sent to {email}.
                </p>
                <div className="text-xs text-muted-foreground text-left w-full max-w-xs bg-beige/30 rounded-xl p-3 space-y-1">
                  <p className="font-medium text-brown">Order breakdown:</p>
                  {vendorSummary.map((vendor) => (
                    <div key={vendor.vendorId} className="flex justify-between">
                      <span>{vendor.vendorName}</span>
                      <span>{formatNaira(vendor.total)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-1 border-t border-border font-medium text-brown">
                    <span>Total</span>
                    <span>{formatNaira(total)}</span>
                  </div>
                </div>
                <Button onClick={startNewOrder} className="mt-2 gradient-gold text-ink rounded-full px-8 h-11 hover:opacity-90 border-0">
                  Done
                </Button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  )
}