'use client'

import { useMemo, useState } from 'react'
import { Download, Eye, RefreshCw, Search, WalletCards, X } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/dashboard/page-header'

type PaymentEvent={id:string;createdAt:string;eventType:string;status:string;reference:string;orderId:string;amount:string;payload:unknown}

export default function PaymentsPage(){
  const [events]=useState<PaymentEvent[]>([])
  const [search,setSearch]=useState('')
  const [status,setStatus]=useState('all')
  const [viewing,setViewing]=useState<PaymentEvent|null>(null)
  const filtered=useMemo(()=>events.filter(event=>(status==='all'||event.status===status)&&Object.values(event).join(' ').toLowerCase().includes(search.toLowerCase())),[events,search,status])
  return <div className="dashboard-content"><PageHeader eyebrow="PAYMENT OPERATIONS" title="Payment events" description="Monitor gateway callbacks, payment status, refunds, and order reconciliation." action={<><button className="outline-button" onClick={()=>toast.info('Payment events refreshed')}><RefreshCw size={15}/>Refresh</button><button className="primary-button" onClick={()=>toast.info('There are no payment events to export')}><Download size={15}/>Export CSV</button></>}/><section className="stats-grid"><PaymentStat label="Successful payments" value="0"/><PaymentStat label="Pending payments" value="0"/><PaymentStat label="Failed payments" value="0"/><PaymentStat label="Refunded" value="0"/></section><section className="panel management-panel"><div className="manager-toolbar payments-toolbar"><label className="manager-search"><Search size={17}/><input value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search reference, order, event…"/></label><select value={status} onChange={event=>setStatus(event.target.value)}><option value="all">All statuses</option><option value="paid">Paid</option><option value="pending">Pending</option><option value="failed">Failed</option><option value="refunded">Refunded</option></select></div><div className="table-wrap"><table><thead><tr><th>When</th><th>Event</th><th>Status</th><th>Reference</th><th>Order</th><th>Amount</th><th>View</th></tr></thead><tbody>{filtered.map(event=><tr key={event.id}><td>{event.createdAt}</td><td><strong>{event.eventType}</strong></td><td><span className={`status ${event.status}`}>{event.status}</span></td><td>{event.reference}</td><td>{event.orderId}</td><td>{event.amount}</td><td><button className="icon-button" onClick={()=>setViewing(event)}><Eye size={16}/></button></td></tr>)}</tbody></table>{filtered.length===0&&<div className="empty-table-state"><WalletCards/><strong>No payment events yet</strong><span>Gateway callbacks will appear here after customers make payments.</span></div>}</div></section>{viewing&&<div className="modal-backdrop"><div className="modal"><div className="modal-header"><div><span>PAYMENT EVENT</span><h2>{viewing.eventType}</h2></div><button className="icon-button" onClick={()=>setViewing(null)}><X/></button></div><pre className="payload-preview">{JSON.stringify(viewing.payload,null,2)}</pre></div></div>}</div>
}
function PaymentStat({label,value}:{label:string;value:string}){return <article className="stat-card"><div className="stat-icon gold"><WalletCards/></div><div className="stat-copy"><span>{label}</span><strong>{value}</strong><p><b>—</b>No events</p></div></article>}
