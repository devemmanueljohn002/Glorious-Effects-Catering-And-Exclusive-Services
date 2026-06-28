'use client'

import { useMemo, useState } from 'react'
import {
  Bell, CalendarDays, ChevronDown, ChevronRight, CircleDollarSign,
  Download, LayoutDashboard, Menu, MoreHorizontal, Package, Search,
  Settings, ShoppingBag, Star, TrendingDown, TrendingUp, Users, X,
} from 'lucide-react'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Orders', icon: ShoppingBag, badge: '12' },
  { label: 'Products', icon: Package },
  { label: 'Customers', icon: Users },
  { label: 'Bookings', icon: CalendarDays, badge: '4' },
]

const orders = [
  { id: '#GE-1048', customer: 'Amara Okafor', initials: 'AO', item: 'Celebration cake', date: '28 Jun, 10:42', total: '₦68,500', status: 'Processing', color: 'coral' },
  { id: '#GE-1047', customer: 'Tobi Adeyemi', initials: 'TA', item: 'Small chops platter', date: '28 Jun, 09:18', total: '₦42,000', status: 'Paid', color: 'green' },
  { id: '#GE-1046', customer: 'Nkechi Eze', initials: 'NE', item: 'Dessert package', date: '27 Jun, 16:05', total: '₦115,000', status: 'Ready', color: 'blue' },
  { id: '#GE-1045', customer: 'Damilola James', initials: 'DJ', item: 'Catering deposit', date: '27 Jun, 12:31', total: '₦250,000', status: 'Paid', color: 'gold' },
  { id: '#GE-1044', customer: 'Zainab Musa', initials: 'ZM', item: 'Pastry box × 4', date: '26 Jun, 14:22', total: '₦32,000', status: 'Delivered', color: 'purple' },
]

const products = [
  { name: 'Celebration Cakes', sold: 84, amount: '₦1.28m', share: 86 },
  { name: 'Small Chops', sold: 67, amount: '₦842k', share: 70 },
  { name: 'Pastry Boxes', sold: 52, amount: '₦616k', share: 55 },
]

export default function Dashboard() {
  const [active, setActive] = useState('Overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [period, setPeriod] = useState('30 days')
  const filteredOrders = useMemo(
    () => orders.filter((order) => `${order.customer} ${order.id} ${order.item}`.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  return (
    <div className="dashboard-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">G</div>
          <div className="brand-copy"><strong>GECES</strong><span>Admin suite</span></div>
          <button className="icon-button close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>

        <nav aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          {navigation.map(({ label, icon: Icon, badge }) => (
            <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => { setActive(label); setMenuOpen(false) }}>
              <Icon size={19} strokeWidth={1.8} /><span>{label}</span>{badge && <em>{badge}</em>}
            </button>
          ))}
          <p className="nav-label nav-label-spaced">Manage</p>
          <button className="nav-item"><Star size={19} strokeWidth={1.8} /><span>Reviews</span></button>
          <button className="nav-item"><Settings size={19} strokeWidth={1.8} /><span>Settings</span></button>
        </nav>

        <div className="support-card">
          <span>GECES SUPPORT</span><strong>Need a hand?</strong>
          <p>Our support team is here to help.</p>
          <button>Contact support <ChevronRight size={15} /></button>
        </div>
        <div className="sidebar-profile">
          <div className="avatar">DA</div><div><strong>David Admin</strong><span>Super admin</span></div><MoreHorizontal size={19} />
        </div>
      </aside>
      {menuOpen && <button className="page-overlay" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}

      <main className="dashboard-main">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
          <div className="mobile-brand">GECES</div>
          <label className="top-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search orders, customers..." /><kbd>⌘ K</kbd></label>
          <div className="top-actions">
            <button className="icon-button notification" aria-label="Notifications"><Bell size={20} /><i /></button>
            <span className="top-divider" />
            <div className="top-profile"><div className="avatar avatar-small">DA</div><div><strong>David Admin</strong><span>Administrator</span></div><ChevronDown size={15} /></div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="page-heading">
            <div><p>CONTROL CENTER</p><h1>{active}</h1><span>Here&apos;s what&apos;s happening with GECES today.</span></div>
            <div className="heading-actions"><button className="outline-button"><Download size={17} /> Export report</button><button className="primary-button"><b>+</b> New order</button></div>
          </section>

          <section className="stats-grid">
            <Stat title="Total revenue" value="₦4,286,500" delta="12.5%" note="vs last month" icon={<CircleDollarSign />} tone="gold" />
            <Stat title="Total orders" value="248" delta="8.2%" note="vs last month" icon={<ShoppingBag />} tone="brown" />
            <Stat title="Customers" value="1,429" delta="5.7%" note="vs last month" icon={<Users />} tone="rose" />
            <Stat title="Pending orders" value="18" delta="2.4%" note="vs last month" icon={<Package />} tone="cream" down />
          </section>

          <section className="analytics-grid">
            <article className="panel revenue-panel">
              <div className="panel-heading"><div><h2>Revenue overview</h2><p>Your revenue performance over time</p></div><select value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Revenue period"><option>7 days</option><option>30 days</option><option>90 days</option></select></div>
              <div className="chart-summary"><strong>₦2,186,500</strong><span><TrendingUp size={14} />14.6%</span><em>this period</em></div>
              <div className="chart">
                <div className="y-labels"><span>₦350k</span><span>₦250k</span><span>₦150k</span><span>₦50k</span></div>
                <svg viewBox="0 0 700 230" role="img" aria-label="Revenue increased from 112 thousand to 326 thousand naira">
                  <defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b88427" stopOpacity=".28"/><stop offset="1" stopColor="#b88427" stopOpacity="0"/></linearGradient></defs>
                  <g className="grid-lines"><line x1="0" y1="30" x2="700" y2="30"/><line x1="0" y1="85" x2="700" y2="85"/><line x1="0" y1="140" x2="700" y2="140"/><line x1="0" y1="195" x2="700" y2="195"/></g>
                  <path className="chart-area" d="M0 168 C40 166,55 130,100 132 S155 157,200 145 S260 71,300 82 S350 122,400 109 S455 44,500 58 S555 89,600 70 S650 29,700 21 L700 220 L0 220 Z"/>
                  <path className="chart-line" d="M0 168 C40 166,55 130,100 132 S155 157,200 145 S260 71,300 82 S350 122,400 109 S455 44,500 58 S555 89,600 70 S650 29,700 21"/>
                  <circle cx="700" cy="21" r="5"/>
                </svg>
                <div className="x-labels"><span>Jun 1</span><span>Jun 7</span><span>Jun 13</span><span>Jun 19</span><span>Jun 25</span><span>Jun 28</span></div>
              </div>
            </article>

            <article className="panel products-panel">
              <div className="panel-heading"><div><h2>Top products</h2><p>Best sellers this month</p></div><button className="text-button">View all</button></div>
              <div className="product-list">
                {products.map((product, index) => <div className="product-row" key={product.name}><div className="rank">0{index + 1}</div><div className="product-info"><div><div><strong>{product.name}</strong><span>{product.sold} sold</span></div><b>{product.amount}</b></div><div className="progress"><i style={{ width: `${product.share}%` }} /></div></div></div>)}
              </div>
              <div className="goal"><div><span>Monthly sales goal</span><strong>₦4.28m <em>/ ₦5m</em></strong></div><div className="progress"><i style={{ width: '86%' }} /></div><p>You&apos;re 86% there — keep it going!</p></div>
            </article>
          </section>

          <section className="panel orders-panel">
            <div className="panel-heading orders-heading"><div><h2>Recent orders</h2><p>Latest activity from your customers</p></div><label className="table-search"><Search size={16}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Filter orders" /></label><button className="text-button">View all orders <ChevronRight size={15}/></button></div>
            <div className="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Date</th><th>Total</th><th>Status</th><th aria-label="Actions" /></tr></thead><tbody>{filteredOrders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong></td><td><div className="customer"><span className={`customer-avatar ${order.color}`}>{order.initials}</span><strong>{order.customer}</strong></div></td><td>{order.item}</td><td>{order.date}</td><td><strong>{order.total}</strong></td><td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td><td><button className="icon-button" aria-label={`Open ${order.id}`}><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table>{filteredOrders.length === 0 && <div className="empty-state">No orders match “{search}”.</div>}</div>
          </section>
        </div>
      </main>
    </div>
  )
}

function Stat({ title, value, delta, note, icon, tone, down = false }: { title: string; value: string; delta: string; note: string; icon: React.ReactNode; tone: string; down?: boolean }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div className="stat-copy"><span>{title}</span><strong>{value}</strong><p className={down ? 'down' : ''}>{down ? <TrendingDown size={14}/> : <TrendingUp size={14}/>}<b>{delta}</b> {note}</p></div><MoreHorizontal size={18} className="stat-more" /></article>
}
