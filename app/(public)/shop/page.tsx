// app/shop/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter, WhatsAppFloat } from "@/components/site/site-footer"
import { VENDORS } from "@/lib/site-content"
import { Star, MapPin, Store } from "lucide-react"

export const metadata: Metadata = {
  title: "Shop — GECES",
  description: "Shop from trusted caterers and event planners at GECES.",
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteNav />

      {/* HERO - with background image */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <Image 
            src="/p-events.jpg" 
            alt="GECES marketplace" 
            fill 
            priority 
            sizes="100vw"
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-linear-to-r from-brown/93 via-brown/70 to-brown/20" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-40 pb-14 w-full">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Vendor Marketplace</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground text-balance max-w-2xl">
            Shop from our <em className="not-italic text-gold">Trusted Vendors</em>
          </h1>
          <p className="mt-4 text-primary-foreground/75 text-lg max-w-md leading-relaxed">
            Choose from our curated list of professional caterers and event planners. 
            Order snacks, meals, cakes, and more — delivered across Lagos.
          </p>
        </div>
      </section>

      {/* VENDOR LISTINGS */}
      <section className="py-16 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Our Vendors</span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-brown">
                Choose your <em className="not-italic text-gold">Caterer</em>
              </h2>
            </div>
            <span className="text-sm text-muted-foreground">{VENDORS.length} vendors available</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VENDORS.map((vendor) => (
              <Link 
                key={vendor.id} 
                href={`/shop/${vendor.slug}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-glass hover:shadow-luxe transition-all hover:-translate-y-1"
              >
                <div className="aspect-4/3 overflow-hidden bg-muted relative flex items-center justify-center">
                  {vendor.image ? (
                    <Image 
                      src={vendor.image} 
                      alt={vendor.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <Store className="h-16 w-16 text-muted-foreground" />
                  )}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                    <span className="text-xs text-white font-medium">{vendor.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-brown group-hover:text-gold transition">{vendor.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{vendor.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{vendor.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {vendor.specialties.map((s) => (
                      <span key={s} className="text-[10px] uppercase tracking-widest bg-beige/40 text-brown rounded-full px-3 py-1">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{vendor.products.length} products</span>
                    <span className="text-sm text-gold font-medium group-hover:translate-x-1 transition flex items-center gap-1">
                      View Shop → 
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  )
}