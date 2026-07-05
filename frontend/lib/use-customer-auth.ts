"use client"

import { useEffect, useState } from "react"
import { getCurrentProfile, type CustomerProfile } from "@/lib/customer-data"

export function useCustomerAuth() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getCurrentProfile().then((p) => {
      if (!active) return
      setProfile(p)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  return { profile, loading }
}
