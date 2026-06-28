'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BarChart3, Bell, CalendarDays, ChevronDown, FileText, ImageIcon, LayoutDashboard, LogOut, Menu, Package, Settings, ShoppingBag, UserCog, Users, WalletCards, Webhook, X } from 'lucide-react'
import { Toaster, toast } from 'sonner'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/menu', label: 'Menu', icon: Package },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/payments', label: 'Payment events', icon: WalletCards },
  { href: '/admin/webhook', label: 'Webhook tester', icon: Webhook },
  { href: '/admin/quotes', label: 'Quotes', icon: FileText },
  { href: '/admin/users', label: 'Users & roles', icon: UserCog },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [userEmail, setUserEmail] = useState('Administrator')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = localStorage.getItem('geces_admin_session')
      if (!stored) { router.replace('/admin/login'); return }
      try {
        const session = JSON.parse(stored) as { email?: string; role?: string }
        if (!['admin', 'super-admin'].includes(session.role ?? '')) { localStorage.removeItem('geces_admin_session'); router.replace('/admin/login'); return }
        if (session.email) setUserEmail(session.email)
      } catch { localStorage.removeItem('geces_admin_session'); router.replace('/admin/login'); return }
      setReady(true)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [router])

  function signOut() {
    localStorage.removeItem('geces_admin_session')
    toast.success('Signed out successfully')
    router.replace('/admin/login')
  }

  if (!ready) return <div className="auth-loading"><div className="loader"/><p>Securing your workspace…</p></div>

  return <div className="dashboard-shell">
    <Toaster position="top-right" richColors />
    <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark">G</div><div className="brand-copy"><strong>GECES</strong><span>Admin suite</span></div><button className="icon-button close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={20}/></button></div>
      <nav aria-label="Admin navigation"><p className="nav-label">Management</p>{links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`nav-item ${pathname === href ? 'active' : ''}`} onClick={() => setMenuOpen(false)}><Icon size={19}/><span>{label}</span></Link>)}</nav>
      <div className="support-card"><span>QUICK SUPPORT</span><strong>Need a hand?</strong><p>Our operations support team is available.</p><button onClick={() => toast.info('Support request opened')}>Contact support</button></div>
      <button className="sidebar-profile" onClick={signOut}><div className="avatar">AD</div><div><strong>{userEmail}</strong><span>Administrator</span></div><LogOut size={17}/></button>
    </aside>
    {menuOpen && <button className="page-overlay" onClick={() => setMenuOpen(false)} aria-label="Close navigation"/>}
    <main className="dashboard-main"><header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22}/></button><div className="mobile-brand">GECES</div><div className="topbar-context"><span>Operations workspace</span></div><div className="top-actions"><button className="icon-button notification" onClick={() => toast.info('No new notifications')} aria-label="Notifications"><Bell size={20}/></button><span className="top-divider"/><div className="top-profile"><div className="avatar avatar-small">AD</div><div><strong>{userEmail}</strong><span>Administrator</span></div><ChevronDown size={15}/></div></div></header>{children}</main>
  </div>
}
