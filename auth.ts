import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { getAdminAllowlist } from "@/lib/auth-helpers"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 14 },
  trustHost: true,
  callbacks: {
    async signIn({ profile }) {
      const login = profile && "login" in profile ? String((profile as { login?: string }).login) : ""
      if (!login) return false
      const allow = getAdminAllowlist()
      if (allow.length === 0 && process.env.NODE_ENV === "development") {
        console.warn("[auth] ADMIN_GITHUB_LOGINS is empty — no one can sign in.")
      }
      return allow.includes(login.toLowerCase())
    },
    async jwt({ token, profile }) {
      if (profile && "login" in profile) {
        token.login = (profile as { login: string }).login
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.login = (token.login as string) ?? ""
      }
      return session
    },
  },
})
