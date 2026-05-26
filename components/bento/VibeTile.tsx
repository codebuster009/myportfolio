"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { PlaylistNow } from "@/lib/playlist"

const BASE_HEIGHTS = [32, 48, 40, 56, 36, 52, 38, 44]

export default function VibeTile({ now }: { now?: PlaylistNow | null }) {
  const [nx, setNx] = useState(0.5)
  const [boost, setBoost] = useState(1)

  const kindLabel = now?.kind ? now.kind : "playlist"

  const pump = () => {
    setBoost(1.38)
    window.setTimeout(() => setBoost(1), 420)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.12 }}
      whileHover={{ y: -4 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setNx((e.clientX - r.left) / r.width)
      }}
      onMouseLeave={() => setNx(0.5)}
      onClick={pump}
      role="presentation"
      className="glass glass-hover rounded-[1.75rem] p-6 h-full flex flex-col border border-white/15 dark:border-white/10 relative overflow-hidden tile-grain cursor-pointer select-none"
      title="Click for a tiny bass drop"
    >
      <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none" aria-hidden />
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 relative z-10">Vibe</p>
      <p className="text-[11px] text-foreground/55 mb-3 relative z-10 leading-snug">
        Not a real EQ, just vibes that lean when you lean. Your speakers deserve better lawyers.
      </p>
      <div className="flex gap-3 mb-3 flex-1 min-h-0 relative z-10 pointer-events-none">
        {now?.cover ? (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/20 shadow-sm">
            <Image src={now.cover} alt="" fill className="object-cover" sizes="64px" />
          </div>
        ) : null}
        <div className="min-w-0 flex-1 pointer-events-auto">
          <p className="text-[10px] font-mono uppercase tracking-wider text-primary/80 mb-1">{kindLabel}</p>
          {now?.title ? (
            <>
              <p className="font-bold text-foreground leading-snug line-clamp-2">{now.title}</p>
              {now.by ? <p className="text-xs text-foreground/65 mt-0.5 line-clamp-1">{now.by}</p> : null}
              <Link
                href="/playlist"
                className="text-xs text-primary font-medium mt-2 inline-block hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Full playlist →
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Spin up /playlist from the CMS (Vibe pulls &ldquo;now playing&rdquo; from there).
              </p>
              <Link
                href="/playlist"
                className="text-xs text-primary font-medium mt-2 inline-block hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Open playlist →
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex items-end justify-center gap-1.5 h-14 relative z-10 pointer-events-none" aria-hidden>
        {BASE_HEIGHTS.map((h, i) => {
          const sway = 0.72 + 0.56 * Math.abs(Math.sin(nx * Math.PI + i * 0.55))
          const height = Math.round(h * boost * sway)
          return (
            <motion.div
              key={i}
              className="w-1.5 rounded-full bg-gradient-to-t from-primary to-indigo-400 origin-bottom"
              style={{ height }}
              animate={{ scaleY: [0.88, 1.12, 0.88] }}
              transition={{
                duration: 1.15 + i * 0.06,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.08,
              }}
            />
          )
        })}
      </div>
    </motion.div>
  )
}
