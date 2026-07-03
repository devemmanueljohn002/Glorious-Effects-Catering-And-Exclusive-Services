"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChefHat, LogOut, ShoppingBag, GraduationCap, CalendarHeart, Sparkles, User as UserIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { getCurrentProfile, updateProfile, signOut, getDashboardStats, type CustomerProfile, type DashboardStats } from "@/lib/customer-data"

export function DashboardClient() {
  const router = useRouter()
  const [profile, setProfile] = useState<CustomerProfile | null>(null)
  const [stats, setStats] = useState<DashboardStats>({ orders: 0, courses: 0, bookings: 0 })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    ;(async () => {
      const [p, s] = await Promise.all([getCurrentProfile(), getDashboardStats()])
      if (p) { setProfile(p); setFullName(p.fullName ?? ""); setPhone(p.phone ?? "") }
      setStats(s); setLoading(false)
    })()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { error } = await updateProfile({ fullName, phone })
    setSaving(false)
    if (error) { toast.error(error); return }
    toast.success("Profile updated")
    setProfile((p) => p ? { ...p, fullName, phone } : p)
  }

  async function handleSignOut() {
    await signOut(); router.push("/")
  }

  const displayName = profile?.fullName?.trim() || profile?.email?.split("@")[0] || "there"

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-beige/30">
      <Toaster position="top-center" richColors />

      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/geces-logo.jpg" alt="GECES" width={36} height={36} className="h-9 w-9 rounded-full ring-1 ring-gold object-cover" />
            <div className="leading-tight">
              <p className="font-display text-lg text-brown">GECES</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Dashboard</p>
            </div>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-brown hover:text-brown hover:bg-muted">
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading…
          </div>
        ) : (
          <>
            <section className="mb-10">
              <p className="text-xs text-gold uppercase tracking-widest">Welcome back</p>
              <h1 className="font-display text-3xl sm:text-5xl text-brown mt-1">
                Hello, {displayName} <Sparkles className="inline h-7 w-7 text-gold" />
              </h1>
              <p className="text-muted-foreground mt-2 max-w-xl">Manage your orders, course enrollments, and event bookings — all in one place.</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-gold/15 text-brown border border-gold/30">
                  {profile?.role ?? "customer"}
                </span>
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <StatCard icon={ShoppingBag} label="Orders" value={String(stats.orders)} hint={stats.orders === 0 ? "No orders yet" : "Total orders placed"} />
              <StatCard icon={GraduationCap} label="Courses" value={String(stats.courses)} hint={stats.courses === 0 ? "Coming soon" : "Enrolled courses"} />
              <StatCard icon={CalendarHeart} label="Bookings" value={String(stats.bookings)} hint={stats.bookings === 0 ? "No bookings yet" : "Active bookings"} />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <form onSubmit={handleSave} className="lg:col-span-2 glass rounded-3xl p-6 sm:p-8 shadow-glass">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-gold/15 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-brown">Your profile</h2>
                    <p className="text-xs text-muted-foreground">Keep this current — we use it for orders & event quotes.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="full_name">Full name</Label>
                    <Input id="full_name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" className="rounded-xl h-11" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone (WhatsApp)</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 ..." className="rounded-xl h-11" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label>Email</Label>
                    <Input value={profile?.email ?? ""} disabled className="rounded-xl h-11 bg-muted/40" />
                  </div>
                </div>
                <Button type="submit" disabled={saving} className="mt-6 rounded-full bg-brown hover:bg-ink text-primary-foreground h-10 px-6">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save changes
                </Button>
              </form>

              <aside className="glass rounded-3xl p-6 sm:p-8 shadow-glass">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-gold/15 flex items-center justify-center">
                    <ChefHat className="h-5 w-5 text-gold" />
                  </div>
                  <h2 className="font-display text-xl text-brown">Quick actions</h2>
                </div>
                <ul className="space-y-2 text-sm">
                  {[
                    { href: "/shop", label: "🍰 Browse the shop" },
                    { href: "/booking", label: "🎉 Request catering quote" },
                    { href: "/courses", label: "🎓 Explore courses" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block rounded-xl px-4 py-3 bg-white/60 hover:bg-white border border-brown/10 text-brown transition">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

function StatCard({ icon: Icon, label, value, hint }: {
  icon: React.ComponentType<{ className?: string }>; label: string; value: string; hint: string
}) {
  return (
    <div className="glass rounded-2xl p-5 shadow-glass">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <Icon className="h-5 w-5 text-gold" />
      </div>
      <p className="font-display text-3xl text-brown mt-2">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{hint}</p>
    </div>
  )
}
