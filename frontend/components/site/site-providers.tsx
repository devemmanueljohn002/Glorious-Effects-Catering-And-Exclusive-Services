"use client"

import { CartProvider } from "@/components/site/cart-context"
import { Toaster } from "@/components/ui/sonner"

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster position="top-center" richColors />
    </CartProvider>
  )
}
