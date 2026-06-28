'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({ email: z.string().email('Enter a valid email address'), password: z.string().min(6, 'Password must contain at least 6 characters'), remember: z.boolean().optional() })
type LoginInput = z.infer<typeof schema>

export default function AdminLogin() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ resolver: zodResolver(schema), defaultValues: { email: 'admin@geces.com', password: 'admin123', remember: true } })

  async function login(values: LoginInput) {
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 650))
    localStorage.setItem('geces_admin_session', JSON.stringify({ email: values.email, role: 'super-admin' }))
    router.replace('/admin/dashboard')
  }

  return <main className="login-page"><section className="login-story"><div className="login-brand"><div className="brand-mark">G</div><div><strong>GECES</strong><span>Glorious Effects</span></div></div><div className="story-content"><span>EXCEPTIONAL EVENTS, BEAUTIFULLY MANAGED</span><h1>Every remarkable experience starts behind the scenes.</h1><p>Manage bookings, menus, customers, orders, and every detail that makes a GECES event unforgettable.</p><div className="story-proof"><ShieldCheck size={20}/><div><strong>Secure administration</strong><span>Protected operations workspace</span></div></div></div><p className="login-credit">Glorious Effects Catering &amp; Exclusive Services</p></section><section className="login-form-side"><form className="login-card" onSubmit={handleSubmit(login)}><div className="login-icon"><LockKeyhole size={22}/></div><span>ADMIN PORTAL</span><h2>Welcome back</h2><p>Enter your details to access the management suite.</p><label><b>Email address</b><div className="input-with-icon"><Mail size={17}/><input type="email" {...register('email')} placeholder="admin@geces.com"/></div>{errors.email && <em>{errors.email.message}</em>}</label><label><b>Password</b><div className="input-with-icon"><LockKeyhole size={17}/><input type={showPassword ? 'text' : 'password'} {...register('password')} placeholder="Your password"/><button type="button" onClick={() => setShowPassword((current) => !current)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>{errors.password && <em>{errors.password.message}</em>}</label><div className="login-options"><label><input type="checkbox" {...register('remember')}/> Remember me</label><button type="button">Forgot password?</button></div><button className="login-submit" disabled={submitting}>{submitting ? <><i className="loader-small"/> Signing in…</> : 'Sign in to dashboard'}</button><small>Demo credentials are pre-filled for frontend review.</small></form></section></main>
}
