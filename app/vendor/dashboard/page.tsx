"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { CircleDollarSign, Clock3, LogOut, Package, ShoppingBag, Store } from "lucide-react"
import { RoleGuard } from "@/components/auth/role-guard"
import { clearAuthSession } from "@/lib/auth-session"

export default function VendorDashboardPage() {
  const router = useRouter()
  return <RoleGuard allow="VENDOR">{(session) => <main className="min-h-dvh bg-gradient-to-br from-background via-background to-beige/30">
    <header className="border-b border-border/60 bg-background/85 backdrop-blur sticky top-0 z-20"><div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between"><div className="flex items-center gap-3"><Image src="/geces-logo.jpg" alt="GECES" width={38} height={38} className="rounded-full"/><div><p className="font-display text-lg text-brown leading-tight">GECES Vendor</p><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Marketplace partner</p></div></div><button className="inline-flex items-center gap-2 text-sm text-brown" onClick={()=>{clearAuthSession();router.replace('/sign-in')}}><LogOut size={16}/>Sign out</button></div></header>
    <div className="mx-auto max-w-6xl px-5 py-10"><p className="text-xs tracking-widest text-gold uppercase">Vendor workspace</p><h1 className="font-display text-4xl text-brown mt-2">Welcome, {session.fullName}</h1><p className="text-muted-foreground mt-2">Your store, products, orders, earnings, and withdrawals will be managed here.</p>
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-9">{[
        {label:'Products',value:'0',icon:Package},{label:'Pending orders',value:'0',icon:Clock3},{label:'Completed orders',value:'0',icon:ShoppingBag},{label:'Available balance',value:'₦0',icon:CircleDollarSign},
      ].map(({label,value,icon:Icon})=><article key={label} className="glass rounded-2xl p-5 shadow-glass"><div className="flex justify-between"><span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span><Icon className="h-5 w-5 text-gold"/></div><strong className="block font-display text-3xl text-brown mt-3">{value}</strong></article>)}</section>
      <section className="glass rounded-3xl p-8 mt-6 text-center shadow-glass"><Store className="h-9 w-9 text-gold mx-auto"/><h2 className="font-display text-2xl text-brown mt-3">Create your vendor store</h2><p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">Store onboarding will connect to the vendor profile API during backend integration.</p><button className="mt-5 rounded-full bg-brown text-primary-foreground px-6 py-2.5 text-sm">Start store setup</button></section>
    </div>
  </main>}</RoleGuard>
}
