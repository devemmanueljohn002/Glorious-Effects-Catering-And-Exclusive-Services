"use client"

import Image from "next/image"
import Link from "next/link"
import { ChefHat, Cake, Cookie, GlassWater, GraduationCap, Sparkles, Utensils, PartyPopper, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter, WhatsAppFloat } from "@/components/site/site-footer"
import { GALLERY_IMAGES, GALLERY_PREVIEW_COUNT } from "@/lib/site-content"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const SERVICES = [
  { icon: ChefHat, title: "Catering Training", text: "End-to-end professional catering curriculum." },
  { icon: Cake, title: "Baking Classes", text: "From soft bread to layered celebration cakes." },
  { icon: Sparkles, title: "Cake Decoration", text: "Buttercream, fondant, gold leaf — the works." },
  { icon: Utensils, title: "Food Crafts", text: "Plating, styling and creative food design." },
  { icon: Cookie, title: "Snacks Production", text: "Chin chin, meat pie, puff puff — at scale." },
  { icon: GlassWater, title: "Drinks Preparation", text: "Mocktails, smoothies and signature blends." },
  { icon: PartyPopper, title: "Event Catering", text: "Full-service catering for any occasion." },
  { icon: GraduationCap, title: "Small Chops Production", text: "Party platters with that golden finish." },
]

const TESTIMONIALS = [
  { name: "Adaeze O.", role: "Student, Class of 2024", quote: "GECES turned my hobby into a real business. I now run a snack brand in Lagos." },
  { name: "Mr. & Mrs. Bello", role: "Wedding clients", quote: "The small chops and cake were the talk of our wedding. Truly exceptional." },
  { name: "Chiamaka E.", role: "Cake Decoration grad", quote: "The decoration masterclass is world-class. The trainers genuinely care." },
  { name: "Tunde A.", role: "Catering Student", quote: "The hands-on training at GECES gave me the confidence to start my own catering business." },
  { name: "Funmi K.", role: "Event Planner", quote: "I've worked with many caterers, but GECES stands out for their creativity and professionalism." },
  { name: "David O.", role: "Baking Enthusiast", quote: "From a complete beginner to baking wedding cakes - GECES made it possible!" },
]

// Custom Arrow Components with proper types
interface ArrowProps {
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

const CustomPrevArrow = ({ onClick, className, style }: ArrowProps) => {
  return (
    <button
      className={`${className} absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10`}
      style={{
        ...style,
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '50%',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        width: '44px',
        height: '44px',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.25)'
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <ChevronLeft className="h-5 w-5 text-white" />
    </button>
  )
}

const CustomNextArrow = ({ onClick, className, style }: ArrowProps) => {
  return (
    <button
      className={`${className} absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10`}
      style={{
        ...style,
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '50%',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        width: '44px',
        height: '44px',
        
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.25)'
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <ChevronRight className="h-5 w-5 text-white" />
    </button>
  )
}

export default function HomePage() {
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  arrows: true,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ],
  customPaging: () => (
    <button 
      className="w-2 h-2 rounded-full transition-all duration-300 hover:scale-125"
      style={{ 
        background: '#E49E0A',
        opacity: 0.5,
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        margin: '0 6px',
      }}
    />
  ),
  appendDots: (dots: React.ReactNode) => (
    <div className="flex justify-center" style={{ marginTop: '40px' }}>
      {dots}
    </div>
  ),
}

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteNav />

      {/* HERO */}
      <section id="top" className="relative flex items-center min-h-screen">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/hero-buffet.jpg"
            alt="GECES catering buffet with wedding cake and chefs"
            fill priority sizes="100vw"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/5" />
        </div>

        <div className="relative z-10 w-full mx-auto max-w-7xl px-6 sm:px-10 py-20">
          <div className="max-w-2xl space-y-3 mx-auto sm:mx-0 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-widest text-brown font-medium mt-8 mx-auto sm:mx-0">
              <Sparkles className="h-3 w-3 text-gold" /> Premium Culinary Academy
            </span>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.12] text-brown mt-2">
              Learn Catering,<br />
              Baking & Food<br />
              Creativity{" "}
              <em className="not-italic text-gold">Like a Pro</em>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto sm:mx-0 mt-4">
              Master baking, decoration, snacks & catering at <strong className="text-brown">GECES</strong> — and build a profitable food business from day one.
            </p>

            {/* Buttons - Fixed sizing */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 mt-4 mb-4 items-center">
              <div className="flex gap-3">
                <Link href="/courses"
                  className="inline-flex items-center justify-center gap-2 gradient-gold text-ink font-semibold rounded-full px-5 py-2.5 text-sm shadow-glass hover:shadow-luxe hover:opacity-90 transition">
                  Enroll Now <Sparkles className="h-4 w-4" />
                </Link>
                <Link href="/#services"
                  className="inline-flex items-center justify-center gap-2 bg-brown text-primary-foreground rounded-full px-5 py-2.5 text-sm hover:bg-ink transition">
                  Our Services
                </Link>
              </div>
              <Link href="/shop"
                className="inline-flex items-center justify-center gap-2 glass border border-brown/20 text-brown rounded-full px-5 py-2.5 text-sm hover:bg-white/80 transition">
                Order Snacks
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-border/40 mt-6 justify-center sm:justify-start">
              <div>
                <p className="font-display text-3xl text-brown leading-none">500+</p>
                <p className="text-xs text-muted-foreground mt-1.5 text-center sm:text-left">Students trained</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="font-display text-3xl text-brown leading-none">200+</p>
                <p className="text-xs text-muted-foreground mt-1.5 text-center sm:text-left">Events catered</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="font-display text-3xl text-brown leading-none">4.9★</p>
                <p className="text-xs text-muted-foreground mt-1.5 text-center sm:text-left">Avg. rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 sm:py-28 bg-beige/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Our Services</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-brown text-balance">
              Everything food. Done <em className="not-italic text-gold">beautifully</em>.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="group relative glass rounded-2xl p-6 hover:shadow-luxe transition-all hover:-translate-y-1">
                <div className="absolute inset-x-0 -top-px h-px gradient-gold opacity-0 group-hover:opacity-100 transition" />
                <div className="h-12 w-12 rounded-xl gradient-gold flex items-center justify-center shadow-glass mb-4">
                  <s.icon className="h-6 w-6 text-ink" />
                </div>
                <h3 className="font-display text-xl text-brown">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - CAROUSEL */}
      <section className="py-20 sm:py-28 bg-brown text-primary-foreground relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Testimonials</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance">Loved by students & clients</h2>
          </div>

          <div className="px-2">
            <Slider {...settings}>
              {TESTIMONIALS.map((t, index) => (
                <div key={index} className="px-2">
                  <div className="glass-dark rounded-2xl p-5 h-65 flex flex-col">
                    <div className="flex-1 flex flex-col">
                      <div className="flex gap-0.5 text-gold mb-2">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                      </div>
                      <p className="text-xl leading-relaxed flex-1 line-clamp-5">{t.quote}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-3 pt-3 border-t border-white/10 shrink-0">
                      <div className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center text-ink font-semibold shrink-0 text-xs">
                        {t.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-xl truncate">{t.name}</p>
                        <p className="text-[13px] text-primary-foreground/60 truncate">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end  justify-between mb-10">
            <div className="text-center w-full">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Gallery</span>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-brown">From our kitchen</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {GALLERY_IMAGES.slice(0, GALLERY_PREVIEW_COUNT).map((item, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl group ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
                <Image src={item.src} alt={item.label} fill sizes={i === 0 ? "50vw" : "25vw"}
                  className="object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-brown/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/gallery"
              className="inline-flex items-center gap-2 glass text-brown rounded-full px-8 py-3.5 text-sm hover:bg-white transition border border-border">
              View more photos →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-4xl sm:rounded-[3rem] bg-brown text-primary-foreground p-10 sm:p-16 lg:p-20 shadow-luxe">
            <div aria-hidden className="absolute inset-0 opacity-25">
              <Image src="/hero-buffet.jpg" alt="" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-linear-to-r from-brown via-brown/80 to-brown/40" />
            </div>
            <div className="relative max-w-2xl">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Start today</span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-balance">
                Start Your <em className="not-italic text-gold">Culinary Journey</em> Today
              </h2>
              <p className="mt-5 text-primary-foreground/80 text-lg">
                Register for a course, book a catering service or order delicious snacks — all in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/courses" className="inline-flex items-center gap-2 gradient-gold text-ink font-medium rounded-full px-6 py-3.5 text-sm">
                  Register for Training
                </Link>
                <Link href="/booking" className="inline-flex items-center gap-2 glass-dark text-primary-foreground rounded-full px-6 py-3.5 text-sm">
                  Book Catering
                </Link>
                <Link href="/shop" className="inline-flex items-center gap-2 bg-card text-brown rounded-full px-6 py-3.5 text-sm">
                  Order Snacks
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