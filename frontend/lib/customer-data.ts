import { clearAuthSession, getAuthSession, registerLocalUser, signInLocalUser, updateLocalSession, type UserRole } from "@/lib/auth-session"

// ============================================================================
// Customer-facing data layer.
//
// Every export below is intentionally a thin, typed, async stub.
// Swap the body of each function for a real fetch()/Supabase call later —
// the calling components never need to change since they only depend on
// these shapes and signatures.
// ============================================================================

export type CustomerProfile = {
  id: string
  fullName: string
  email: string
  phone: string
  avatarUrl: string | null
  role: "customer" | "instructor" | "admin"
}

export type OrderStatus = "processing" | "paid" | "ready" | "delivered" | "cancelled"
export type CustomerOrder = {
  id: string
  items: string
  total: number
  status: OrderStatus
  date: string
}

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled"
export type CustomerBooking = {
  id: string
  eventType: string
  date: string
  guests: number
  status: BookingStatus
}

export type DashboardStats = {
  orders: number
  courses: number
  bookings: number
}

// ----------------------------------------------------------------------------
// Auth — replace bodies with real Supabase / API calls.
// ----------------------------------------------------------------------------

export async function signInWithPassword(email: string, password: string): Promise<{ error: string | null; role: UserRole | null }> {
  const result = signInLocalUser(email, password)
  return { error: result.error, role: result.session?.role ?? null }
}

export async function signUpWithPassword(
  email: string,
  password: string,
  fullName: string,
  role: "CUSTOMER" | "VENDOR" = "CUSTOMER",
): Promise<{ error: string | null; role: UserRole | null }> {
  const result = registerLocalUser({ email, password, fullName, role })
  return { error: result.error, role: result.session?.role ?? null }
}

export async function signInWithGoogle(): Promise<{ error: string | null; redirected: boolean }> {
  return { error: "Google sign-in will be enabled when the authentication API is connected.", redirected: false }
}

export async function signOut(): Promise<void> {
  clearAuthSession()
}

export async function getCurrentProfile(): Promise<CustomerProfile | null> {
  const session = getAuthSession()
  if (!session) return null
  return { id: session.id, fullName: session.fullName, email: session.email, phone: "", avatarUrl: null, role: session.role === "SUPER_ADMIN" ? "admin" : session.role === "VENDOR" ? "instructor" : "customer" }
}

export async function updateProfile(patch: Partial<Pick<CustomerProfile, "fullName" | "phone">>): Promise<{ error: string | null }> {
  if (patch.fullName) updateLocalSession({ fullName: patch.fullName })
  return { error: null }
}

// ----------------------------------------------------------------------------
// Dashboard data — empty by default; populated once the API is connected.
// ----------------------------------------------------------------------------

export async function getDashboardStats(): Promise<DashboardStats> {
  return { orders: 0, courses: 0, bookings: 0 }
}

export async function getCustomerOrders(): Promise<CustomerOrder[]> {
  return []
}

export async function getCustomerBookings(): Promise<CustomerBooking[]> {
  return []
}
