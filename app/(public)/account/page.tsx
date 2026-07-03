import type { Metadata } from "next"
import { DashboardClient } from "@/components/site/dashboard-client"

export const metadata: Metadata = {
  title: "Dashboard — GECES",
  description: "Manage your GECES orders, course enrollments, and event bookings.",
}

export default function AccountPage() {
  return <DashboardClient />
}
