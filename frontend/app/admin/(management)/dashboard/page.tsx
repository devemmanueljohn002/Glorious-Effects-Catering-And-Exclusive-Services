import { CalendarDays, CircleDollarSign, Package, ShoppingBag, TrendingUp, Users } from 'lucide-react'
import PageHeader from '@/components/dashboard/page-header'

export default function DashboardPage() {
  return <div className="dashboard-content">
    <PageHeader eyebrow="CONTROL CENTER" title="Dashboard overview" description="Live business activity will appear here as customers place orders and request bookings." action={<button className="outline-button">Export report</button>}/>
    <section className="stats-grid"><Stat title="Total revenue" value="₦0" icon={<CircleDollarSign/>}/><Stat title="Total bookings" value="0" icon={<CalendarDays/>}/><Stat title="Customers" value="0" icon={<Users/>}/><Stat title="Pending orders" value="0" icon={<Package/>}/></section>
    <section className="analytics-grid"><article className="panel revenue-panel"><div className="panel-heading"><div><h2>Order overview</h2><p>Completed order values will be shown here</p></div><select aria-label="Order period"><option>30 days</option><option>90 days</option></select></div><div className="zero-chart"><TrendingUp/><strong>No completed orders yet</strong><span>Completed orders will populate this chart.</span></div></article><article className="panel products-panel"><div className="panel-heading"><div><h2>Operations pulse</h2><p>Live business summary</p></div></div><div className="pulse-list"><div><span className="pulse-icon gold"><ShoppingBag/></span><div><strong>0 new orders</strong><span>No customer orders yet</span></div></div><div><span className="pulse-icon green"><CalendarDays/></span><div><strong>0 upcoming events</strong><span>No confirmed bookings yet</span></div></div><div><span className="pulse-icon rose"><Users/></span><div><strong>0 registered customers</strong><span>User profiles will appear after signup</span></div></div></div></article></section>
    <section className="panel orders-panel"><div className="panel-heading orders-heading"><div><h2>Recent orders</h2><p>Latest customer activity</p></div></div><div className="empty-table-state"><ShoppingBag/><strong>No orders yet</strong><span>Orders will appear here when customers complete checkout.</span></div></section>
  </div>
}

function Stat({title,value,icon}:{title:string;value:string;icon:React.ReactNode}){return <article className="stat-card"><div className="stat-icon gold">{icon}</div><div className="stat-copy"><span>{title}</span><strong>{value}</strong><p><b>—</b> No data available</p></div></article>}
