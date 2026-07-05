import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChefHat, Sparkles, GraduationCap, Star } from "lucide-react"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter, WhatsAppFloat } from "@/components/site/site-footer"

export const metadata: Metadata = {
  title: "About — GECES",
  description: "The story, mission and values behind Glorious Effects Catering And Exclusive Services.",
}

const VALUES = [
  { icon: ChefHat,       title: "Practical-first",       desc: "Every lesson is hands-on. You leave class having actually made the dish, not just watched it." },
  { icon: GraduationCap, title: "Business-ready",        desc: "We teach the craft and the commerce — pricing, packaging and client conversations included." },
  { icon: Sparkles,      title: "World-class standards", desc: "From plating to presentation, our finish is built to rival any premium kitchen." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteNav />

      {/* HERO — buffet image background, dark scrim, text overlay */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div aria-hidden className="absolute inset-0 z-0">
          <Image src="/hero-buffet.jpg" alt="" fill priority sizes="100vw"
            className="object-cover object-center" />
          <div className="absolute inset-0 bg-linear-to-r from-brown/92 via-brown/75 to-brown/30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-40 pb-16 w-full">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">About GECES</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground text-balance max-w-2xl">
            A modern academy.<br />
            A <em className="not-italic text-gold">delicious</em> brand.
          </h1>
          <p className="mt-5 text-primary-foreground/75 text-lg max-w-xl leading-relaxed">
            Glorious Effects Catering And Exclusive Services — empowering students with practical
            culinary skills while delivering premium food experiences across Lagos.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Images */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-luxe">
              <Image src="/p-events.jpg" alt="GECES brand showcase" fill sizes="(max-width:1024px)100vw,40vw"
                className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-40 rounded-2xl overflow-hidden shadow-glass">
                <Image src="/p-cake.jpg" alt="Celebration cakes" fill sizes="20vw" className="object-cover" />
              </div>
              <div className="relative h-40 rounded-2xl overflow-hidden shadow-glass">
                <Image src="/p-smallchops.jpg" alt="Small chops" fill sizes="20vw" className="object-cover" />
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-gold/90 text-ink text-xs font-bold px-2 py-1 rounded-full">
                  <Star className="h-3 w-3 fill-current" /> 4.9
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Our story</span>
            <div className="w-12 h-1 gradient-gold rounded-full" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              What started as a small kitchen in Olodi-Apapa, Lagos has grown into a full academy and
              catering brand serving weddings, corporate events, birthdays and home celebrations across
              the city.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We deliver premium snacks, pastries, cakes and full event catering — built on the same
              standards we teach. Every class, every order, every event is touched by hand.
            </p>

            <div className="flex items-center gap-8 pt-4 border-t border-border">
              {[["500+","Students trained"],["200+","Events catered"],["4.9★","Avg. rating"]].map(([v,l]) => (
                <div key={l}>
                  <strong className="font-display text-3xl text-brown block">{v}</strong>
                  <span className="text-xs text-muted-foreground mt-1 block">{l}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/courses"
                className="inline-flex items-center gap-2 gradient-gold text-ink font-medium rounded-full px-6 py-3.5 text-sm shadow-glass hover:shadow-luxe transition">
                Explore courses
              </Link>
              <Link href="/booking"
                className="inline-flex items-center gap-2 glass text-brown rounded-full px-6 py-3.5 text-sm hover:bg-white transition border border-border">
                Book catering
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="py-10 bg-beige/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["/hero-buffet.jpg","/p-events.jpg","/p-pastries.jpg","/p-drinks.jpg"].map((src,i) => (
              <div key={i} className="relative aspect-4/3 rounded-2xl overflow-hidden group">
                <Image src={src} alt="" fill sizes="25vw" className="object-cover group-hover:scale-105 transition duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">What we stand for</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-brown text-balance">Our values</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="group glass rounded-2xl p-7 hover:shadow-luxe transition-all hover:-translate-y-1 relative overflow-hidden">
                <div aria-hidden className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gold/20 blur-3xl group-hover:bg-gold/40 transition" />
                <div className="h-12 w-12 rounded-xl gradient-gold flex items-center justify-center shadow-glass mb-5">
                  <v.icon className="h-6 w-6 text-ink" />
                </div>
                <h3 className="font-display text-xl text-brown">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-4xl bg-brown text-primary-foreground p-10 sm:p-14 shadow-luxe">
            <div aria-hidden className="absolute inset-0 opacity-20">
              <Image src="/hero-buffet.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-r from-brown to-brown/60" />
            </div>
            <div className="relative max-w-xl">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Ready to start?</span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl text-balance">Join the GECES family today</h2>
              <p className="mt-3 text-primary-foreground/75">Register for a class or book your next event with us.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/courses" className="inline-flex items-center gap-2 gradient-gold text-ink font-medium rounded-full px-6 py-3 text-sm">
                  View courses
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 glass-dark text-primary-foreground rounded-full px-6 py-3 text-sm">
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
