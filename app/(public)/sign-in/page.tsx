import type { Metadata } from "next"
import { AuthPage } from "@/components/site/auth-form"

export const metadata: Metadata = {
  title: "Sign in · GECES",
  description: "Sign in or create your GECES account to order, enroll in courses, and manage bookings.",
}

export default function SignInPage() { return <AuthPage /> }
