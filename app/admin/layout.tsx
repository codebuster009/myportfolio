import { AdminProviders } from "@/components/admin/AdminProviders"
import { Toaster } from "sonner"
import type { ReactNode } from "react"

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProviders>
      <div className="min-h-screen bg-background antialiased text-foreground">{children}</div>
      <Toaster richColors position="top-center" closeButton />
    </AdminProviders>
  )
}
