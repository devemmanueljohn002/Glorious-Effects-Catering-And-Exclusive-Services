import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter, WhatsAppFloat } from "@/components/site/site-footer"
import { COURSES, formatNaira } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Courses — GECES Academy",
  description: "Hands-on catering, baking and cake decoration courses for every level.",
}

const LEVEL_COLOR: Record<string, string> = {
  Beginner:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-amber-50   text-amber-700   border-amber-200",
  Advanced:     "bg-rose-50    text-rose-700    border-rose-200",
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteNav />

      {/* HERO — buffet photo full-bleed, dark left scrim */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <Image src="/hero-buffet.jpg" alt="" fill priority sizes="100vw"
            className="object-cover object-center" />
          <div className="absolute inset-0 bg-linear-to-r from-brown/93 via-brown/70 to-brown/20" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-40 pb-16 w-full">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Academy</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground text-balance max-w-2xl">
            Courses for every level
          </h1>
          <p className="mt-5 text-primary-foreground/75 text-lg max-w-xl leading-relaxed">
            Short, intensive, hands-on. Each course ends with a graded practical and a business
            toolkit — so you walk out ready to earn from what you&apos;ve learned.
          </p>
        </div>
      </section>

  
      {/* COURSES GRID */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">What we offer</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-brown text-balance">Choose your course</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((c, i) => (
              <article key={c.name}
                className="relative bg-card rounded-3xl p-7 border border-border shadow-glass hover:shadow-luxe transition-all hover:-translate-y-1 overflow-hidden flex flex-col">
                {/* Decorative blob */}
                <div aria-hidden className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold/15 blur-3xl pointer-events-none" />

                <p className="text-[10px] uppercase tracking-widest text-gold">Course 0{i + 1}</p>
                <h3 className="font-display text-2xl text-brown mt-2 mb-4">{c.name}</h3>

                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full border ${LEVEL_COLOR[c.level] ?? "bg-muted text-muted-foreground border-border"}`}>
                    {c.level}
                  </span>
                  <span className="text-xs text-muted-foreground">{c.weeks}</span>
                </div>

                <div className="mt-auto pt-5 border-t border-border flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Tuition</p>
                    <p className="font-display text-2xl text-brown mt-0.5">{formatNaira(c.price)}</p>
                  </div>
                  <Link href="/booking"
                    className="text-sm text-brown border-b-2 border-gold pb-0.5 hover:text-gold transition">
                    Enroll →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-4xl sm:rounded-[3rem] bg-brown text-primary-foreground p-10 sm:p-16 shadow-luxe">
            <div aria-hidden className="absolute inset-0 opacity-20">
              <Image src="/hero-buffet.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-r from-brown via-brown/80 to-brown/40" />
            </div>
            <div className="relative max-w-xl">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Not sure which course?</span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl text-balance">
                Talk to our <em className="not-italic text-gold">academy team</em>
              </h2>
              <p className="mt-3 text-primary-foreground/75 leading-relaxed">
                Tell us your goals and experience — we&apos;ll recommend the right starting point and tuition plan.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/booking"
                  className="inline-flex items-center gap-2 gradient-gold text-ink font-medium rounded-full px-6 py-3.5 text-sm shadow-glass">
                  Book a course
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 glass-dark text-primary-foreground rounded-full px-6 py-3.5 text-sm">
                  Ask a question
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
