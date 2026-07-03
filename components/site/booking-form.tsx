"use client"

import { useState } from "react"
import { Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    // TODO: POST to booking API
    await new Promise((r) => setTimeout(r, 800))
    setBusy(false)
    setSubmitted(true)
    e.currentTarget.reset()
  }

  if (submitted) {
    return (
      <div className="glass rounded-3xl p-10 text-center space-y-4 shadow-glass">
        <CheckCircle className="h-14 w-14 text-gold mx-auto" />
        <h3 className="font-display text-2xl text-brown">Request received!</h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
          We&apos;ll be in touch within 24 hours with a tailored quote for your event or course.
        </p>
        <Button onClick={() => setSubmitted(false)} className="rounded-full bg-brown hover:bg-ink text-primary-foreground mt-2">
          Submit another request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-7 sm:p-10 shadow-glass space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="bk-name">Full name</Label>
          <Input id="bk-name" required placeholder="Your name" className="rounded-xl h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bk-phone">Phone (WhatsApp)</Label>
          <Input id="bk-phone" required placeholder="+234…" className="rounded-xl h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bk-email">Email</Label>
          <Input id="bk-email" required type="email" placeholder="you@example.com" className="rounded-xl h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bk-type">Event type / Course</Label>
          <Input id="bk-type" required placeholder="Wedding, Birthday, Baking Class…" className="rounded-xl h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bk-date">Preferred date</Label>
          <Input id="bk-date" required type="date" className="rounded-xl h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bk-guests">Guests / Group size</Label>
          <Input id="bk-guests" required type="number" min={1} placeholder="50" className="rounded-xl h-11" />
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="bk-details">Additional details</Label>
          <Textarea id="bk-details" required placeholder="Tell us about your event or what you'd like to learn…" className="rounded-xl min-h-[110px] resize-none" />
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
        <p className="text-xs text-muted-foreground">A 30% deposit may be required to confirm event bookings.</p>
        <Button type="submit" disabled={busy} className="rounded-full gradient-gold text-ink border-0 px-8 h-11 font-semibold hover:opacity-90">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Send Request
        </Button>
      </div>
    </form>
  )
}
