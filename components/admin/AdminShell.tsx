"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ThemeToggle"
import {
  BookOpen,
  FileEdit,
  FolderTree,
  ImageIcon,
  LayoutDashboard,
  ListMusic,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  Wrench,
  X,
} from "lucide-react"

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileEdit },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/books", label: "Bookshelf", icon: BookOpen },
  { href: "/admin/now", label: "Now", icon: Sparkles },
  { href: "/admin/uses", label: "Uses", icon: Wrench },
  { href: "/admin/playlist", label: "Playlist", icon: ListMusic },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

function Brand({ className }: { className?: string }) {
  return (
    <div className={cn("p-4 md:p-5 border-b border-border", className)}>
      <Link href="/admin" className="text-sm font-semibold uppercase tracking-widest text-primary">
        Studio
      </Link>
      <p className="text-[10px] font-mono text-muted-foreground mt-1">personal notebook</p>
    </div>
  )
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
      {nav.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/admin" && pathname.startsWith(href + "/"))
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary/15 text-primary border border-primary/25 shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
            )}
          >
            <Icon className="h-4 w-4 shrink-0 opacity-90" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

export default function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode
  user: { name?: string | null; email?: string | null; image?: string | null; login: string }
}) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const current = nav.find(
    ({ href }) => pathname === href || (href !== "/admin" && pathname.startsWith(href + "/"))
  )

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-card/90 backdrop-blur-xl">
        <Brand />
        <SidebarNav />
        <div className="p-2 border-t border-border mt-auto">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden cursor-default border-0 p-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className="fixed left-0 top-0 bottom-0 z-50 w-[min(20rem,90vw)] flex flex-col border-r border-border bg-card shadow-2xl lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-border pl-3 pr-2 py-2">
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold uppercase tracking-widest text-primary truncate"
                >
                  Studio
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
              <div className="p-2 border-t border-border mt-auto">
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/90 backdrop-blur-xl px-3 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-muted shrink-0"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Studio</p>
            <p className="text-sm font-semibold text-foreground truncate">{current?.label ?? "Admin"}</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <ThemeToggle />
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-primary hover:underline hidden sm:inline px-2"
            >
              View site
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card pl-1 pr-2 sm:pr-3 py-1">
              {user.image ? (
                <Image src={user.image} alt="" width={28} height={28} className="rounded-full" />
              ) : (
                <div className="h-7 w-7 rounded-full bg-primary/20 text-[10px] flex items-center justify-center font-bold text-primary">
                  {user.login.slice(0, 2).toUpperCase()}
                </div>
              )}
              <span className="text-xs font-mono text-muted-foreground truncate max-w-[4.5rem] sm:max-w-[8rem] hidden sm:inline">
                {user.login}
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto w-full px-4 py-6 md:px-8 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  )
}
