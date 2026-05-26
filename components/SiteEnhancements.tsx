"use client"

import { useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

const CONFETTI_COLORS = ["#e879f9", "#a78bfa", "#38bdf8", "#fbbf24", "#34d399", "#fb7185", "#f472b6", "#818cf8"]

function fireConfettiBurst() {
  if (typeof window === "undefined") return
  const N = 52
  const root = document.createElement("div")
  root.setAttribute("aria-hidden", "true")
  root.style.cssText = "pointer-events:none;position:fixed;inset:0;z-index:10000;overflow:hidden"
  const h = window.innerHeight
  for (let i = 0; i < N; i++) {
    const p = document.createElement("div")
    const x = Math.random() * 100
    const delay = Math.random() * 320
    const dur = 1400 + Math.random() * 900
    const w = 5 + Math.random() * 10
    const l = 8 + Math.random() * 14
    const rot = Math.random() * 360
    const drift = (Math.random() - 0.5) * 180
    p.style.cssText = `position:absolute;left:${x}vw;top:-16px;width:${w}px;height:${l}px;background:${CONFETTI_COLORS[i % CONFETTI_COLORS.length]};border-radius:2px;opacity:0.95;transform:rotate(${rot}deg)`
    p.animate(
      [
        { transform: `translate(0,0) rotate(${rot}deg)` },
        { transform: `translate(${drift}px, ${h + 40}px) rotate(${rot + 720}deg)` },
      ],
      { duration: dur, delay, easing: "cubic-bezier(0.2, 0.85, 0.2, 0.95)", fill: "forwards" }
    )
    root.appendChild(p)
  }
  document.body.appendChild(root)
  window.setTimeout(() => root.remove(), 2800)
}

export default function SiteEnhancements() {
  const router = useRouter()
  const pathname = usePathname()
  const gRef = useRef(false)
  const konamiIdx = useRef(0)

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key

      if ((e.key === "g" || e.key === "G") && !gRef.current) {
        gRef.current = true
        window.setTimeout(() => {
          gRef.current = false
        }, 900)
        return
      }

      if (gRef.current) {
        if (e.key === "w" || e.key === "W") {
          router.push("/writing")
          gRef.current = false
          e.preventDefault()
          return
        }
        if (e.key === "n" || e.key === "N") {
          router.push("/now")
          gRef.current = false
          e.preventDefault()
          return
        }
        if (e.key === "p" || e.key === "P") {
          router.push("/playlist")
          gRef.current = false
          e.preventDefault()
          return
        }
      }

      const expected = KONAMI[konamiIdx.current]
      const match =
        expected === key ||
        (expected === "b" && (e.key === "b" || e.key === "B")) ||
        (expected === "a" && (e.key === "a" || e.key === "A"))

      if (match) {
        konamiIdx.current += 1
        if (konamiIdx.current >= KONAMI.length) {
          konamiIdx.current = 0
          if (!sessionStorage.getItem("konami_once")) {
            sessionStorage.setItem("konami_once", "1")
            document.body.classList.add("konami-party")
            fireConfettiBurst()
            window.setTimeout(() => document.body.classList.remove("konami-party"), 2200)
          }
        }
      } else {
        konamiIdx.current = e.key === "ArrowUp" && KONAMI[0] === "ArrowUp" ? 1 : 0
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [router, pathname])

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return
    if (typeof BroadcastChannel === "undefined") return
    const ch = new BroadcastChannel("cms-refresh")
    ch.onmessage = (ev: MessageEvent) => {
      if (ev.data?.type === "revalidate") router.refresh()
    }
    return () => ch.close()
  }, [router, pathname])

  return null
}
