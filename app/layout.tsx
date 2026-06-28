import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GECES Admin Dashboard',
  description: 'Operations dashboard for Glorious Effects Catering and Exclusive Services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
