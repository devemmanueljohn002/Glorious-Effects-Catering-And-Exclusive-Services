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

export async function signInWithPassword(_email: string, _password: string): Promise<{ error: string | null }> {
  // TODO: supabase.auth.signInWithPassword({ email, password })
  return { error: null }
}

export async function signUpWithPassword(
  _email: string,
  _password: string,
  _fullName: string,
): Promise<{ error: string | null }> {
  // TODO: supabase.auth.signUp({ email, password, options: { data: { full_name } } })
  return { error: null }
}

export async function signInWithGoogle(): Promise<{ error: string | null; redirected: boolean }> {
  // TODO: lovable.auth.signInWithOAuth("google", { redirect_uri })
  return { error: null, redirected: false }
}

export async function signOut(): Promise<void> {
  // TODO: supabase.auth.signOut()
}

export async function getCurrentProfile(): Promise<CustomerProfile | null> {
  // TODO: read supabase.auth.getUser() + profiles table
  return null
}

export async function updateProfile(
  _patch: Partial<Pick<CustomerProfile, "fullName" | "phone">>,
): Promise<{ error: string | null }> {
  // TODO: supabase.from("profiles").update(patch).eq("id", userId)
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
