// app/(public)/shop/[slug]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getVendorBySlug, getProductsByVendor, VENDORS } from "@/lib/site-content"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter, WhatsAppFloat } from "@/components/site/site-footer"
import { VendorShopClient } from "./vendor-shop-client"
import { ArrowLeft, Star, MapPin, ShoppingBag, Store } from "lucide-react"

interface VendorShopPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all vendors
export function generateStaticParams() {
  return VENDORS.map((vendor) => ({
    slug: vendor.slug,
  }))
}

export default async function VendorShopPage({ params }: VendorShopPageProps) {
  // Await the params Promise to access its properties
  const { slug } = await params
  const vendor = getVendorBySlug(slug)
  
  if (!vendor) {
    notFound()
  }

  const vendorProducts = getProductsByVendor(vendor.id)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteNav />

      {/* Vendor Hero - Increased height */}
      <section className="relative h-[50vh] min-h-100 flex items-end overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <Image 
            src="/hero-buffet.jpg" 
            alt={vendor.name} 
            fill 
            priority 
            sizes="100vw"
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-linear-to-r from-brown/93 via-brown/70 to-brown/20" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pb-12 w-full">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold transition mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to all vendors
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-muted shrink-0 relative border-2 border-gold/30 shadow-lg flex items-center justify-center">
              {vendor.image ? (
                <Image 
                  src={vendor.image} 
                  alt={vendor.name} 
                  fill 
                  className="object-cover" 
                  unoptimized
                />
              ) : (
                <Store className="h-12 w-12 text-gold" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-foreground">{vendor.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-gold">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm text-primary-foreground font-medium">{vendor.rating}</span>
                </div>
                <span className="text-primary-foreground/50">•</span>
                <div className="flex items-center gap-1 text-primary-foreground/70 text-sm">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{vendor.location}</span>
                </div>
                <span className="text-primary-foreground/50">•</span>
                <span className="text-sm text-primary-foreground/70">{vendorProducts.length} products</span>
              </div>
              <p className="text-primary-foreground/80 mt-2 max-w-2xl">{vendor.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {vendor.specialties.map((s) => (
                  <span key={s} className="text-[10px] uppercase tracking-widest bg-gold/20 text-gold rounded-full px-3 py-1 border border-gold/30">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <ShoppingBag className="h-4 w-4 text-gold" />
              <span className="text-sm text-primary-foreground font-medium">Browse products</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products - Client Component for interactivity */}
      <VendorShopClient 
        vendor={vendor} 
        vendorProducts={vendorProducts}
        categories={["All", ...new Set(vendorProducts.map(p => p.tag))]}
      />

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  )
}