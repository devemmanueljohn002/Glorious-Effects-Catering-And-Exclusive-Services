"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { dashboardForRole, getAuthSession, type AuthSession, type UserRole } from "@/lib/auth-session"

export function RoleGuard({ allow, children }: { allow: UserRole; children: (session: AuthSession) => React.ReactNode }) {
  const router = useRouter()
  const [session, setSession] = useState<AuthSession | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const current = getAuthSession()
      if (!current) { router.replace("/sign-in"); return }
      if (current.role !== allow) { router.replace(dashboardForRole[current.role]); return }
      setSession(current)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [allow, router])

  if (!session) return <div className="min-h-dvh grid place-items-center text-sm text-muted-foreground">Checking access…</div>
  return children(session)
}
