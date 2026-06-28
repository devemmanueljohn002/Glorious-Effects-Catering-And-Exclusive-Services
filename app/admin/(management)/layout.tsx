import AdminShell from '@/components/dashboard/admin-shell'

export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
