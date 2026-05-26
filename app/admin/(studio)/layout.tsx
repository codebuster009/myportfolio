import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminShell from "@/components/admin/AdminShell"
import type { ReactNode } from "react"

export default async function StudioLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user?.login) redirect("/admin/login")
  return <AdminShell user={session.user}>{children}</AdminShell>
}
