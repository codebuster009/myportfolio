"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faBars, faTimes, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { socialLinks } from "@/lib/data"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ThemeToggle"

type NavItem = { name: string; href: string; external?: boolean }

const navLinks: NavItem[] = [
  { name: "Writing", href: "/writing" },
  { name: "Now", href: "/now" },
  { name: "Playlist", href: "/playlist" },
  { name: "Building", href: "/#projects" },
  { name: "How I work", href: "/#how-i-work" },
  { name: "Say hi", href: "/services#say-hi" },
]

const pillLinkClass =
  "relative z-[1] inline-flex items-center justify-center rounded-full px-3 py-1.5 xl:px-3.5 xl:py-1.5 font-mono text-[10px] xl:text-[11px] uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const mobileRowClass =
  "flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-foreground/85 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function isActive(pathname: string, href: string): boolean {
  if (href === "/services#say-hi") return pathname === "/services"
  if (href.startsWith("/#")) return false
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function MenuDivider() {
  return <div role="separator" className="my-2 h-px w-full bg-border" aria-hidden />
}

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const allDesktopLinks: { name: string; href: string; external?: boolean }[] = [
    { name: "Home", href: "/" },
    ...navLinks,
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "glass border-b border-white/20 py-3 shadow-glass dark:border-white/10" : "bg-transparent py-4"
      )}
    >
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-[52px] items-center justify-between">
          {/* Logo — stays above pill hit layer */}
          <div className="relative z-20 shrink-0">
            <motion.div whileHover={{ scale: 1.02 }} className="text-2xl font-bold">
              <Link href="/" className="text-gradient outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md">
                Kartavaya.
              </Link>
            </motion.div>
          </div>

          {/* Centered glass pill (lg+ only); horizontally centered on full nav width */}
          <nav
            aria-label="Primary"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
          >
            <div
              className={cn(
                "pointer-events-auto flex items-center gap-0.5 rounded-full border border-primary/15 px-1.5 py-1 shadow-glass",
                "glass"
              )}
            >
              {allDesktopLinks.map((link) => {
                if (link.external) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={pillLinkClass}
                    >
                      {link.name}
                    </a>
                  )
                }
                const active = link.href === "/" ? pathname === "/" : isActive(pathname, link.href)
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={pillLinkClass}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 z-0 rounded-full border border-primary/25 bg-primary/15"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        aria-hidden
                      />
                    ) : null}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Right: below lg = theme + hamburger; lg+ = theme + social */}
          <div className="relative z-20 flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <div className="hidden items-center gap-2 lg:flex">
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 8 }}
                className="rounded-md p-1 text-foreground/55 transition-colors hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="text-lg" />
              </motion.a>
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: -8 }}
                className="rounded-md p-1 text-foreground/55 transition-colors hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
              </motion.a>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className="rounded-md p-2 text-foreground/80 -mr-2 outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-primary-nav"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-lg" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              id="mobile-primary-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 overflow-hidden rounded-[1.25rem] border border-border/80 glass-mobile lg:hidden"
            >
              <div className="flex flex-col p-3">
                {/* Home */}
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    mobileRowClass,
                    pathname === "/" && "border border-primary/25 bg-primary/15 text-foreground"
                  )}
                >
                  <span>Home</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs text-foreground/45" aria-hidden />
                </Link>

                <MenuDivider />

                {/* Writing */}
                <Link
                  href="/writing"
                  aria-current={pathname === "/writing" || pathname.startsWith("/writing/") ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    mobileRowClass,
                    (pathname === "/writing" || pathname.startsWith("/writing/")) &&
                      "border border-primary/25 bg-primary/15 text-foreground"
                  )}
                >
                  <span>Writing</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs text-foreground/45" aria-hidden />
                </Link>
                <Link
                  href="/now"
                  aria-current={pathname === "/now" ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(mobileRowClass, pathname === "/now" && "border border-primary/25 bg-primary/15 text-foreground")}
                >
                  <span>Now</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs text-foreground/45" aria-hidden />
                </Link>
                <Link
                  href="/playlist"
                  aria-current={pathname === "/playlist" ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    mobileRowClass,
                    pathname === "/playlist" && "border border-primary/25 bg-primary/15 text-foreground"
                  )}
                >
                  <span>Playlist</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs text-foreground/45" aria-hidden />
                </Link>

                <MenuDivider />

                <Link
                  href="/#projects"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileRowClass}
                >
                  <span>Building</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs text-foreground/45" aria-hidden />
                </Link>
                <Link
                  href="/#how-i-work"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileRowClass}
                >
                  <span>How I work</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs text-foreground/45" aria-hidden />
                </Link>

                <MenuDivider />

                <Link
                  href="/services#say-hi"
                  aria-current={pathname === "/services" ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    mobileRowClass,
                    pathname === "/services" && "border border-primary/25 bg-primary/15 text-foreground"
                  )}
                >
                  <span>Say hi</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-xs text-foreground/45" aria-hidden />
                </Link>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                  <ThemeToggle />
                  <div className="flex items-center gap-4">
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/60 outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1"
                      aria-label="GitHub"
                    >
                      <FontAwesomeIcon icon={faGithub} className="text-lg" />
                    </a>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/60 outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1"
                      aria-label="LinkedIn"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
