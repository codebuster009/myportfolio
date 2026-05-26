import { auth } from "@/auth"
import { redirect } from "next/navigation"
import LoginButton from "./LoginButton"

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string }
}) {
  const session = await auth()
  if (session?.user?.login) {
    redirect(
      searchParams.callbackUrl && searchParams.callbackUrl.startsWith("/")
        ? searchParams.callbackUrl
        : "/admin"
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-8 shadow-lg tile-grain">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Studio</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Sign in</h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          GitHub only. Your login must be on the allowlist — this is a personal studio, not a signup wall.
        </p>
        {searchParams.error === "AccessDenied" ? (
          <p className="text-sm text-amber-800 dark:text-amber-200 mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2">
            Access denied. That GitHub account is not allowed.
          </p>
        ) : null}
        <LoginButton callbackUrl={searchParams.callbackUrl} />
        <p className="mt-8 text-[11px] text-muted-foreground font-mono leading-relaxed">
          Owner: set <code className="text-primary">ADMIN_GITHUB_LOGINS</code> and GitHub OAuth env vars.
        </p>
      </div>
    </div>
  )
}
