export type UserRole = "CUSTOMER" | "VENDOR" | "SUPER_ADMIN"
export type AuthSession = { id: string; fullName: string; email: string; role: UserRole }
type LocalUser = AuthSession & { password: string }

const SESSION_KEY = "geces_auth_session"
const USERS_KEY = "geces_local_users"

export const dashboardForRole: Record<UserRole, string> = {
  CUSTOMER: "/account",
  VENDOR: "/vendor/dashboard",
  SUPER_ADMIN: "/admin/dashboard",
}

const storage = () => typeof window === "undefined" ? null : window.localStorage
const readUsers = (): LocalUser[] => {
  try { return JSON.parse(storage()?.getItem(USERS_KEY) ?? "[]") as LocalUser[] }
  catch { return [] }
}
const saveSession = (session: AuthSession) => storage()?.setItem(SESSION_KEY, JSON.stringify(session))

export function getAuthSession(): AuthSession | null {
  try { return JSON.parse(storage()?.getItem(SESSION_KEY) ?? "null") as AuthSession | null }
  catch { return null }
}

export function registerLocalUser(input: { email: string; password: string; fullName: string; role: "CUSTOMER" | "VENDOR" }) {
  const target = storage()
  if (!target) return { session: null, error: "Registration is only available in the browser." }
  const email = input.email.trim().toLowerCase()
  const users = readUsers()
  if (users.some((user) => user.email === email)) return { session: null, error: "An account with this email already exists." }
  const user: LocalUser = { id: crypto.randomUUID(), email, password: input.password, fullName: input.fullName.trim(), role: input.role }
  target.setItem(USERS_KEY, JSON.stringify([...users, user]))
  const session: AuthSession = { id: user.id, email: user.email, fullName: user.fullName, role: user.role }
  saveSession(session)
  return { session, error: null }
}

export function signInLocalUser(emailInput: string, password: string) {
  const email = emailInput.trim().toLowerCase()
  if (email === "admin@geces.com" && password === "admin123") {
    const session: AuthSession = { id: "local-super-admin", email, fullName: "GECES Administrator", role: "SUPER_ADMIN" }
    saveSession(session)
    return { session, error: null }
  }
  const user = readUsers().find((entry) => entry.email === email && entry.password === password)
  if (!user) return { session: null, error: "Invalid email or password." }
  const session: AuthSession = { id: user.id, email: user.email, fullName: user.fullName, role: user.role }
  saveSession(session)
  return { session, error: null }
}

export function clearAuthSession() {
  storage()?.removeItem(SESSION_KEY)
  storage()?.removeItem("geces_admin_session")
}

export function updateLocalSession(patch: Partial<Pick<AuthSession, "fullName">>) {
  const session = getAuthSession()
  if (!session) return null
  const next = { ...session, ...patch }
  saveSession(next)
  storage()?.setItem(USERS_KEY, JSON.stringify(readUsers().map((user) => user.id === next.id ? { ...user, ...patch } : user)))
  return next
}
