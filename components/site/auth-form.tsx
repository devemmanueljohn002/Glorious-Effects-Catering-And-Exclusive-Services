"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChefHat, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithPassword, signUpWithPassword, signInWithGoogle } from "@/lib/customer-data"
import { dashboardForRole, getAuthSession } from "@/lib/auth-session"

export function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [accountType, setAccountType] = useState<"CUSTOMER" | "VENDOR">("CUSTOMER")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isSignup = mode === "signup"

  useEffect(() => {
    const session = getAuthSession()
    if (session) router.replace(dashboardForRole[session.role])
  }, [router])

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setError(null)
    const res = isSignup
      ? await signUpWithPassword(email, password, name, accountType)
      : await signInWithPassword(email, password)
    setBusy(false)
    if (res.error) { setError(res.error); return }
    if (res.role) router.replace(dashboardForRole[res.role])
  }

  async function handleGoogle() {
    setBusy(true); setError(null)
    const res = await signInWithGoogle()
    if (res.error) { setError(res.error); setBusy(false); return }
    if (res.redirected) return
    setBusy(false); router.push("/account")
  }

  return (
    <main className="min-h-dvh grid lg:grid-cols-2 overflow-hidden bg-background">

      <div className="hidden lg:block relative">
        <Image src="/hero-buffet.jpg" alt="" fill sizes="50vw" className="object-cover object-right" priority />
        <div className="absolute inset-0 bg-linear-to-t from-brown/75 via-brown/15 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="font-display text-2xl text-primary-foreground italic">&quot;Every meal tells a story.&quot;</p>
          <p className="text-sm text-primary-foreground/60 mt-2 tracking-widest uppercase">— GECES Culinary Academy</p>
        </div>
      </div>
      {/* LEFT — form */}
      <div className="flex items-center justify-center px-6 py-10 lg:py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center justify-center gap-3 mb-8">
            <Image src="/geces-logo.jpg" alt="GECES" width={48} height={48} className="h-12 w-12 rounded-full ring-1 ring-gold object-cover" />
            <div>
              <p className="font-display text-2xl text-brown leading-none">GECES</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Catering & Academy</p>
            </div>
          </Link>

          <div className="glass rounded-3xl p-8 shadow-glass">
            <div className="text-center mb-6">
              <ChefHat className="h-8 w-8 text-gold mx-auto" />
              <h1 className="font-display text-2xl text-brown mt-2">
                {isSignup ? "Create your account" : "Welcome back"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {isSignup ? "Join our culinary community" : "Sign in to manage your orders and bookings"}
              </p>
            </div>

            <Button type="button" variant="outline" onClick={handleGoogle} disabled={busy}
              className="w-full rounded-full mb-4 border-brown/20 h-11">
              <GoogleIcon /> Continue with Google
            </Button>

            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleEmail} className="space-y-4">
              {isSignup && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="auth-name">Full name</Label>
                    <Input id="auth-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="rounded-xl h-11" autoComplete="name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Account type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["CUSTOMER", "VENDOR"] as const).map((role) => (
                        <button key={role} type="button" onClick={() => setAccountType(role)} className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${accountType === role ? "border-gold bg-gold/10 text-brown" : "border-border bg-background text-muted-foreground hover:border-gold/50"}`}>
                          {role === "CUSTOMER" ? "Customer" : "Vendor"}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground">Administrator accounts use the separate admin portal.</p>
                  </div>
                </>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="auth-email">Email</Label>
                <Input id="auth-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="rounded-xl h-11" autoComplete="email" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auth-password">Password</Label>
                  {!isSignup && <button type="button" className="text-xs text-gold hover:underline">Forgot password?</button>}
                </div>
                <Input id="auth-password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="rounded-xl h-11"
                  autoComplete={isSignup ? "new-password" : "current-password"} />
              </div>
              {error && <p className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>}
              <Button type="submit" disabled={busy} className="w-full rounded-full bg-brown hover:bg-ink text-primary-foreground h-11">
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSignup ? "Create account" : "Sign in"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {isSignup ? "Already have an account?" : "New to GECES?"}{" "}
              <button type="button" onClick={() => { setMode(isSignup ? "signin" : "signup"); setError(null) }}
                className="text-gold font-medium hover:underline">
                {isSignup ? "Sign in" : "Create account"}
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            <Link href="/" className="hover:text-brown transition">← Back to home</Link>
            <span className="mx-2">·</span>
            <Link href="/admin/login" className="hover:text-brown transition">Admin portal</Link>
          </p>
        </div>
      </div>

      {/* RIGHT — image */}
      
    </main>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="mr-1">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  )
}
