import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const path = req.nextUrl.pathname
  if (path === "/admin/login" || path.startsWith("/admin/login/")) {
    return NextResponse.next()
  }
  if (path === "/admin/forbidden" || path.startsWith("/admin/forbidden/")) {
    return NextResponse.next()
  }
  if (path.startsWith("/api/admin") && !req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (path.startsWith("/admin") && !req.auth) {
    const u = new URL("/admin/login", req.url)
    u.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(u)
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
