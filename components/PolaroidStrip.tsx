"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const poly = [
  {
    src: "/Kartavya.jpg",
    alt: "Out and about",
    caption: "Sunday brunch",
    rotateClass: "md:rotate-[-6deg] rotate-[-3deg]",
    href: "/now",
  },
  {
    src: "/images/lifetimes.png",
    alt: "Quiet reads",
    caption: "Before standup",
    rotateClass: "md:rotate-[3deg] rotate-[2deg]",
    href: "/writing/habits/two-minute-rule",
  },
  {
    src: "/images/apple.png",
    alt: "Desk vibes",
    caption: "Shipping day",
    rotateClass: "md:rotate-[-2deg] rotate-[-1deg]",
    href: "/writing/learning/tla-plus-click",
  },
] as const

export default function PolaroidStrip() {
  return (
    <div className="mt-14 md:mt-16 flex flex-row gap-6 md:gap-8 justify-start lg:justify-center overflow-x-auto scrollbar-hide pb-6 px-1 snap-x snap-mandatory">
      {poly.map((p, i) => (
        <motion.div
          key={p.src}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.45 }}
          whileHover={{ rotate: 0, scale: 1.04, y: -8 }}
          className={`snap-center shrink-0 ${p.rotateClass} transition-transform duration-300 origin-center`}
        >
          <Link
            href={p.href}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm"
            aria-label={`${p.caption} — open related writing`}
          >
            <div className="relative bg-white dark:bg-zinc-900 p-3 pb-12 shadow-glass-hover border border-black/10 dark:border-white/10 rounded-sm w-[200px] sm:w-[220px] md:w-[240px] cursor-pointer">
              <div
                className="absolute -top-2 left-1/2 w-14 h-5 -translate-x-1/2 bg-amber-200/90 dark:bg-amber-900/50 rotate-[-2deg] shadow-sm"
                aria-hidden
              />
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Image src={p.src} alt={p.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="240px" />
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/55 via-black/10 to-transparent flex items-end justify-center pb-2">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white drop-shadow">
                    read →
                  </span>
                </div>
              </div>
              <p className="font-signature text-lg md:text-xl text-foreground/80 text-center mt-3 absolute bottom-3 left-3 right-3">
                {p.caption}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="snap-center shrink-0 self-center hidden sm:flex items-center justify-center"
      >
        <div className="font-signature text-2xl md:text-3xl text-primary rotate-[4deg] px-4 py-3 rounded-2xl border-2 border-dashed border-primary/35 bg-primary/5 dark:bg-primary/10 max-w-[140px] text-center leading-snug">
          hi, I&apos;m K
        </div>
      </motion.div>
    </div>
  )
}
