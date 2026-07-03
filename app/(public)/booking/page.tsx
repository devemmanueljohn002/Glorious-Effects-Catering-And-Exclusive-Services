import type { Metadata } from "next"
import Image from "next/image"
import { CalendarDays, Users, Clock, CheckCircle } from "lucide-react"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter, WhatsAppFloat } from "@/components/site/site-footer"
import { BookingForm } from "@/components/site/booking-form"

export const metadata: Metadata = {
  title: "Booking — GECES",
  description: "Book your event catering or enroll in a course with Glorious Effects Catering And Exclusive Services.",
}

const PERKS = [
  { icon: CalendarDays, text: "Response within 24 hours" },
  { icon: Users,        text: "Handles groups of any size" },
  { icon: Clock,        text: "Available 7 days a week" },
  { icon: CheckCircle,  text: "30% deposit to confirm" },
]

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteNav />

      {/* HERO — buffet image */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <Image src="/hero-buffet.jpg" alt="" fill priority sizes="100vw"
            className="object-cover object-center" />
          <div className="absolute inset-0 bg-linear-to-r from-brown/93 via-brown/70 to-brown/20" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-40 pb-14 w-full">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Bookings</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground text-balance max-w-2xl">
            Book your event or class
          </h1>
          <p className="mt-4 text-primary-foreground/75 text-lg max-w-xl leading-relaxed">
            Tell us about your event or course interest. We&apos;ll respond within 24 hours with a tailored quote.
          </p>
          {/* Perks row */}
          <div className="mt-8 flex flex-wrap gap-3">
            {PERKS.map((p) => (
              <span key={p.text} className="inline-flex items-center gap-1.5 glass-dark rounded-full px-4 py-2 text-xs text-primary-foreground/90">
                <p.icon className="h-3.5 w-3.5 text-gold" /> {p.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <BookingForm />
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
