import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Music2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const WHATSAPP  = "https://wa.link/ajjaml"
const FACEBOOK  = "https://m.facebook.com/story.php?story_fbid=pfbid02zijKXwXEnnTweKRBjQXoF3qD3zoZzQZQuWjwSu3RWnN39riBqxBTp9bpdjxUzVV5l&id=100011073814591&mibextid=Nif5oz"
const TIKTOK    = "https://www.tiktok.com/@gloriouseffects?_r=1&_t=ZS-96RemNelRZ3"
const INSTAGRAM = "https://www.instagram.com/geces_official?igsh=MWt0dm12c2xpZDh6eg=="

const SOCIALS = [
  { Icon: WhatsAppIcon, href: WHATSAPP,  label: "WhatsApp"  },
  { Icon: IGIcon,       href: INSTAGRAM, label: "Instagram" },
  { Icon: FBIcon,       href: FACEBOOK,  label: "Facebook"  },
  { Icon: TikTokIcon,   href: TIKTOK,    label: "TikTok"    },
]

const NAV = [
  { href: "/about",   label: "About"    },
  { href: "/courses", label: "Courses"  },
  { href: "/shop",    label: "Shop"     },
  { href: "/booking", label: "Bookings" },
  { href: "/gallery", label: "Gallery"  },
  { href: "/contact", label: "Contact"  },
]

export function SiteFooter() {
  return (
    <footer className="bg-ink text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Image src="/geces-logo.jpg" alt="GECES logo" width={52} height={52}
              className="h-12 w-12 rounded-full object-cover ring-1 ring-gold" />
            <div>
              <p className="font-display text-2xl">GECES</p>
              <p className="text-[10px] uppercase tracking-widest text-primary-foreground/60">Glorious Effects Catering</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
            Creating delicious experiences and empowering future caterers — one plate, one student, one event at a time.
          </p>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-ink transition text-primary-foreground/80">
                <s.Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-widest text-gold mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold transition">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-widest text-gold mb-4">Newsletter</p>
          <form className="flex gap-2">
            <Input type="email" required placeholder="your@email.com"
              className="rounded-full h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-gold" />
            <Button type="submit" className="gradient-gold text-ink rounded-full h-11 px-5 hover:opacity-90 border-0">
              Join
            </Button>
          </form>
          <div className="mt-4 text-sm text-primary-foreground/60 space-y-1">
            <p>22/24 Idowu Street, Olodi-Apapa, Lagos</p>
            <a href="tel:+2349033200204" className="block hover:text-gold transition">+234 903 320 0204</a>
            <a href="mailto:myglorioueffects911@gmail.com" className="block hover:text-gold transition text-xs">
              myglorioueffects911@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Glorious Effects Catering And Exclusive Services</p>
          <p>Secure payments by Korapay</p>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppFloat() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full gradient-gold text-ink flex items-center justify-center shadow-luxe hover:scale-110 transition">
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}

/* Inline SVGs for icons not in lucide v1.21 */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.44.79 3.06 1.2 4.7 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.92 6.45 17.5 2 12.04 2zm5.8 14.13c-.24.68-1.4 1.31-1.93 1.39-.5.08-1.13.11-1.82-.12-.42-.13-.96-.32-1.65-.62-2.91-1.26-4.8-4.18-4.95-4.38-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1.01-2.41.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.12.32.02.52-.1.2-.15.33-.3.5-.15.18-.31.4-.45.54-.15.15-.3.31-.13.61.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.29.14.49.21.56.33.07.13.07.74-.17 1.43z"/>
    </svg>
  )
}
function IGIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}
function FBIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.21 22 17.08 22 12.06z"/>
    </svg>
  )
}
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82c-.7-.73-1.16-1.7-1.16-2.82h-3.1v13.46a3.07 3.07 0 1 1-2.2-2.95v-3.16a6.15 6.15 0 1 0 5.3 6.1V9.4a8.36 8.36 0 0 0 4.7 1.43V7.74c-1.1 0-2.5-.5-3.54-1.92z"/>
    </svg>
  )
}
