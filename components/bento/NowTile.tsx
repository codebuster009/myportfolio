"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import MagneticButton from "@/components/MagneticButton"

const PREFIXES = [
  "Current mood:",
  "Leak from the drafts folder:",
  "Things I would tell you at coffee:",
  "Honest snapshot:",
  "No roadmap, just vibes:",
]

export default function NowTile({ teaser }: { teaser?: string | null }) {
  const text = teaser?.trim() || "Add a teaser from Pages → Now in the CMS. (Or don’t. Live dangerously.)"
  const [prefix, setPrefix] = useState(PREFIXES[0])
  useEffect(() => {
    setPrefix(PREFIXES[Math.floor(Math.random() * PREFIXES.length)] ?? PREFIXES[0])
  }, [])

  const wrapRef = useRef<HTMLDivElement>(null)
  const gx = useMotionValue(0)
  const gy = useMotionValue(0)
  const sx = useSpring(gx, { stiffness: 120, damping: 24 })
  const sy = useSpring(gy, { stiffness: 120, damping: 24 })

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    gx.set(((e.clientX - r.left) / r.width - 0.5) * 28)
    gy.set(((e.clientY - r.top) / r.height - 0.5) * 28)
  }
  const onLeave = () => {
    gx.set(0)
    gy.set(0)
  }

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="glass glass-hover rounded-[1.75rem] p-6 md:p-8 h-full flex flex-col relative overflow-hidden tile-grain border border-white/15 dark:border-white/10"
    >
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-primary/35 to-indigo-500/25 blur-2xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -left-8 bottom-8 h-24 w-24 rounded-full bg-violet-400/20 blur-2xl pointer-events-none motion-safe:animate-pulse motion-reduce:animate-none"
      />

      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 relative z-10">Now</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70 mb-3 relative z-10">{prefix}</p>
      <p className="text-lg md:text-xl text-foreground/90 italic leading-relaxed flex-1 relative z-10 font-serif">
        &ldquo;{text}&rdquo;
      </p>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 relative z-10">
        <MagneticButton strength={0.35}>
          <Button asChild variant="outline" size="sm" className="rounded-full border-primary/35 glass-hover">
            <Link href="/now">Open /now</Link>
          </Button>
        </MagneticButton>
        <p
          className="font-signature text-lg text-foreground/45 select-none rotate-[-2deg]"
          title="Small print that is not legally binding"
        >
          honest answers only ~
        </p>
      </div>
    </motion.div>
  )
}
