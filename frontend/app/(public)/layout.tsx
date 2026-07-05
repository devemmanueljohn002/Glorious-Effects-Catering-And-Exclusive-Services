import { SiteProviders } from "@/components/site/site-providers"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <SiteProviders>{children}</SiteProviders>
}
