"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter, WhatsAppFloat } from "@/components/site/site-footer"
import { GALLERY_IMAGES, type GalleryImage } from "@/lib/site-content"
import { cn } from "@/lib/utils"

const CATS: Array<GalleryImage["cat"] | "All"> = ["All","Cakes","Snacks","Events","Drinks","Training"]

export default function GalleryPage() {
  const [active, setActive] = useState<GalleryImage["cat"] | "All">("All")
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  const visible = active === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((g) => g.cat === active)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteNav />

      {/* HERO — buffet image */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <Image src="/hero-buffet.jpg" alt="" fill priority sizes="100vw"
            className="object-cover object-center" />
          <div className="absolute inset-0 bg-linear-to-r from-brown/93 via-brown/70 to-brown/20" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-40 pb-14 w-full">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Gallery</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground text-balance max-w-xl">
            Our work, up close
          </h1>
          <p className="mt-4 text-primary-foreground/75 text-lg max-w-md leading-relaxed">
            Cakes, catering setups, snacks, drinks and the moments that make every event unforgettable.
          </p>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Category tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {CATS.map((c) => (
              <button key={c} onClick={() => setActive(c)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs uppercase tracking-widest border transition",
                  active === c
                    ? "gradient-gold text-ink border-transparent shadow-glass"
                    : "bg-card text-brown border-border hover:border-gold"
                )}>
                {c}
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {visible.map((item, i) => (
              <button key={i} onClick={() => setLightbox(item)}
                className="w-full break-inside-avoid block rounded-2xl overflow-hidden group relative shadow-glass hover:shadow-luxe transition-all"
                aria-label={`View ${item.label}`}>
                <Image src={item.src} alt={item.label} width={600} height={600}
                  className="w-full h-auto object-cover group-hover:scale-105 transition duration-700 block" />
                <div className="absolute inset-0 bg-linear-to-t from-brown/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <p className="font-display text-sm text-primary-foreground leading-tight">{item.label}</p>
                    <p className="text-[10px] text-gold uppercase tracking-widest mt-0.5">{item.cat}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No photos in this category yet — check back soon.</p>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-400 flex items-center justify-center p-4 sm:p-8"
          role="dialog" aria-modal aria-label={lightbox.label}>
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={() => setLightbox(null)} />
          <div className="relative z-10 w-full max-w-4xl">
            <button onClick={() => setLightbox(null)} aria-label="Close"
              className="absolute -top-12 right-0 h-9 w-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-primary-foreground transition">
              <X className="h-5 w-5" />
            </button>
            <Image src={lightbox.src} alt={lightbox.label} width={1200} height={800}
              className="w-full h-auto max-h-[78vh] object-contain rounded-2xl shadow-luxe" />
            <div className="mt-4 flex items-center justify-between">
              <p className="font-display text-lg text-primary-foreground">{lightbox.label}</p>
              <span className="gradient-gold text-ink text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                {lightbox.cat}
              </span>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
