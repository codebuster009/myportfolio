import { auth } from "@/auth"
import { isAllowlistedGitHubLogin } from "@/lib/auth-helpers"
import { redirect } from "next/navigation"

/** Use in Server Actions and Route Handlers. */
export async function requireAdmin(): Promise<{ login: string; name?: string | null; email?: string | null }> {
  const s = await auth()
  if (!s?.user?.login || !isAllowlistedGitHubLogin(s.user.login)) {
    redirect("/admin/login")
  }
  return { login: s.user.login, name: s.user.name, email: s.user.email }
}
