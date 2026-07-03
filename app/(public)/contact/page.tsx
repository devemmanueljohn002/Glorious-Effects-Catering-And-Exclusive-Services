import type { Metadata } from "next"
import Image from "next/image"
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter, WhatsAppFloat } from "@/components/site/site-footer"
import { ContactForm } from "@/components/site/contact-form"
import { CONTACT } from "@/lib/site-content"

export const metadata: Metadata = {
  title: "Contact — GECES",
  description: "Reach Glorious Effects Catering And Exclusive Services by WhatsApp, email, phone or our contact form.",
}

const CHANNELS = [
  { icon: MessageCircle, label: "WhatsApp",         value: "Chat with us instantly",  href: CONTACT.whatsapp,   external: true  },
  { icon: Mail,          label: "Email",             value: CONTACT.email,             href: `mailto:${CONTACT.email}`, external: false },
  { icon: Phone,         label: "Phone / WhatsApp",  value: CONTACT.phone,             href: CONTACT.phoneHref,  external: false },
  { icon: MapPin,        label: "Location",          value: CONTACT.address,           href: undefined,          external: false },
]

export default function ContactPage() {
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
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Contact</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground text-balance max-w-2xl">
            Let&apos;s create something delicious
          </h1>
          <p className="mt-4 text-primary-foreground/75 text-lg max-w-md leading-relaxed">
            Reach us directly — we love hearing from new clients and aspiring students.
          </p>
        </div>
      </section>

      {/* CHANNELS + FORM */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-12 gap-10">
          {/* Info column */}
          <div className="lg:col-span-5 space-y-7">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Ways to reach us</p>
            <div className="flex flex-col gap-4"> {/* Added this div with space-y-4 */}
              {CHANNELS.map((c) => {
                const inner = (
                  <div className="flex items-center gap-4 glass rounded-2xl p-5 shadow-glass hover:shadow-luxe transition-all group">
                    <div className="h-12 w-12 rounded-xl gradient-gold flex items-center justify-center shadow-glass shrink-0">
                      <c.icon className="h-5 w-5 text-ink" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</p>
                      <p className="text-sm text-brown font-medium mt-0.5 group-hover:text-gold transition">{c.value}</p>
                    </div>
                  </div>
                )
                return c.href ? (
                  <a key={c.label} href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noreferrer" : undefined}>
                    {inner}
                  </a>
                ) : (
                  <div key={c.label}>{inner}</div>
                )
              })}
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  )
}