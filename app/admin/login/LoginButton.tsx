"use client"

import { signIn } from "next-auth/react"

export default function LoginButton({ callbackUrl }: { callbackUrl?: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        signIn("github", {
          callbackUrl: callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/admin",
        })
      }
      className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:opacity-95 transition-opacity border border-border"
    >
      Continue with GitHub
    </button>
  )
}
