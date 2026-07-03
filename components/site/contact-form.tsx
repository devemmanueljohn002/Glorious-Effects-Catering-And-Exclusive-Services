"use client"

import { useState } from "react"
import { Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    // TODO: POST to contact API
    await new Promise((r) => setTimeout(r, 800))
    setBusy(false)
    setSubmitted(true)
    e.currentTarget.reset()
  }

  if (submitted) {
    return (
      <div className="glass rounded-3xl p-10 text-center space-y-4 shadow-glass h-full flex flex-col items-center justify-center">
        <CheckCircle className="h-12 w-12 text-gold mx-auto" />
        <h3 className="font-display text-2xl text-brown">Message sent!</h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
          Thank you for reaching out — we&apos;ll get back to you shortly.
        </p>
        <Button onClick={() => setSubmitted(false)} className="rounded-full bg-brown hover:bg-ink text-primary-foreground mt-2">
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-7 sm:p-10 shadow-glass space-y-5 h-full">
      <h3 className="font-display text-2xl text-brown">Send a message</h3>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="ct-name">Name</Label>
          <Input id="ct-name" required placeholder="Jane Doe" className="rounded-xl h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ct-email">Email</Label>
          <Input id="ct-email" required type="email" placeholder="jane@example.com" className="rounded-xl h-11" />
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="ct-subject">Subject</Label>
          <Input id="ct-subject" required placeholder="How can we help?" className="rounded-xl h-11" />
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="ct-message">Message</Label>
          <Textarea id="ct-message" required placeholder="Tell us more…" className="rounded-xl min-h-[130px] resize-none" />
        </div>
      </div>
      <Button type="submit" disabled={busy} className="w-full rounded-full gradient-gold text-ink border-0 h-11 font-semibold hover:opacity-90">
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
        Send Message
      </Button>
    </form>
  )
}
