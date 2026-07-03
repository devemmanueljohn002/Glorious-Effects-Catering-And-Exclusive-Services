import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GECES – Glorious Effects Catering & Exclusive Services',
  description: 'Premium catering, baking academy, snacks and event services in Lagos. Train with the best, eat the best.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
