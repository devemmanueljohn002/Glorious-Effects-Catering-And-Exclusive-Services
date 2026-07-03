// components/site/site-nav.tsx
"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { MiniCart } from "@/components/site/mini-cart"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/courses", label: "Courses" },
  { href: "/shop", label: "Shop" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  // Define functions first before they're used in effects
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  const openMenu = useCallback(() => {
    setMenuOpen(true)
  }, [])

  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }, [menuOpen, closeMenu, openMenu])

  const isActive = useCallback((href: string) => {
    if (href === "/" || href.includes("#")) return pathname === "/"
    return pathname.startsWith(href)
  }, [pathname])

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      closeMenu()
    }
  }, [pathname, closeMenu])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  return (
    <>
      <header className={cn("fixed top-0 inset-x-0 z-50 transition-all duration-300", scrolled ? "py-2" : "py-3 sm:py-4")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={cn("glass rounded-full px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between", scrolled ? "shadow-glass" : "")}>
            <Link href="/" className="flex items-center gap-2 sm:gap-3" onClick={closeMenu}>
              <Image src="/geces-logo.jpg" alt="GECES" width={40} height={40} className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover ring-1 ring-gold" />
              <div className="leading-tight">
                <p className="font-display text-base sm:text-lg text-brown">GECES</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:block">Catering & Academy</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-7 text-sm">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href}
                  className={cn("transition-colors hover:text-gold", isActive(l.href) ? "text-gold font-medium" : "text-brown/80")}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/sign-in"
                className="hidden sm:inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white/70 hover:bg-white border border-brown/10 text-brown transition">
                Sign in
              </Link>
              <MiniCart />
              <button onClick={toggleMenu} aria-label="Open menu"
                className="lg:hidden p-2 rounded-full hover:bg-white/60 transition text-brown">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-199 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
      />

      {/* Mobile menu - Slide from right */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-100 z-200 bg-background shadow-2xl transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Image src="/geces-logo.jpg" alt="GECES" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-1 ring-gold" />
            <p className="font-display text-xl text-brown">GECES</p>
          </Link>
          <button 
            onClick={closeMenu} 
            className="p-2 rounded-full hover:bg-muted transition"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-brown" />
          </button>
        </div>
        
        {/* Scrollable navigation */}
        <div className="flex-1 overflow-y-auto px-6 py-4 h-[calc(100%-80px)]">
          <nav className="flex flex-col">
            {[...NAV_LINKS, { href: "/sign-in", label: "Sign in" }].map((l) => (
              <Link 
                key={l.href} 
                href={l.href} 
                onClick={closeMenu}
                className={cn(
                  "font-display text-xl sm:text-2xl py-4 border-b border-border transition-colors hover:text-gold hover:pl-2",
                  isActive(l.href) ? "text-gold" : "text-brown"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}