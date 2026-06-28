'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChefHat, Loader2, ShieldCheck, Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Toaster, toast } from 'sonner'
import styles from './login.module.css'

const schema = z.object({ email: z.string().email('Enter a valid email address'), password: z.string().min(6, 'Password must contain at least 6 characters') })
type LoginInput = z.infer<typeof schema>

export default function AdminLogin() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ resolver: zodResolver(schema) })

  async function login(values: LoginInput) {
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 450))
    localStorage.setItem('geces_admin_session', JSON.stringify({ email: values.email, role: 'admin' }))
    toast.success('Welcome, admin')
    router.replace('/admin/dashboard')
  }

  return <><Toaster position="top-center" richColors /><main className={styles.page}>
    <section className={styles.story}>
      <div className={styles.storyGlow}/><div className={styles.storyRing}/>
      <div className={styles.brand}><Image src="/geces-logo.jpg" alt="GECES" width={54} height={54}/><div><strong>GECES</strong><span>Catering &amp; Exclusive Services</span></div></div>
      <div className={styles.storyCopy}><span><Sparkles size={14}/>EXCELLENCE BEHIND EVERY EVENT</span><h1>Where remarkable experiences begin.</h1><p>Manage every booking, payment, menu, customer, and celebration detail from one thoughtful workspace.</p><div className={styles.assurance}><ShieldCheck/><div><strong>Secure administration</strong><span>Restricted access for authorized GECES staff</span></div></div></div>
      <p className={styles.copyright}>Glorious Effects Catering And Exclusive Services</p>
    </section>

    <section className={styles.formSide}>
      <div className={styles.mobileBrand}><Image src="/geces-logo.jpg" alt="GECES" width={46} height={46}/><strong>GECES</strong></div>
      <div className={styles.card}>
        <div className={styles.heading}><div><ChefHat/></div><span>ADMIN PORTAL</span><h2>Welcome back</h2><p>Sign in to manage orders, bookings, and operations</p></div>
        <button type="button" className={styles.google} onClick={() => toast.info('Google sign-in will activate when the authentication provider is connected')}><svg viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>Continue with Google</button>
        <div className={styles.divider}><i/><span>OR</span><i/></div>
        <form className={styles.form} onSubmit={handleSubmit(login)}>
          <label><span>Email</span><input type="email" autoComplete="email" placeholder="admin@example.com" {...register('email')}/>{errors.email&&<em>{errors.email.message}</em>}</label>
          <label><span>Password</span><input type="password" autoComplete="current-password" placeholder="••••••••" {...register('password')}/>{errors.password&&<em>{errors.password.message}</em>}</label>
          <button className={styles.submit} disabled={submitting}>{submitting&&<Loader2 size={16}/>}Sign in</button>
        </form>
        <p className={styles.restricted}>Restricted to authorized GECES administrators.</p>
      </div>
      <button className={styles.back} onClick={()=>router.push('/')}><ArrowLeft size={14}/> Back to home</button>
    </section>
  </main></>
}
