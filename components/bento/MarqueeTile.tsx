"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Marquee from "@/components/Marquee"

export default function MarqueeTile() {
  const [slow, setSlow] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.18 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setSlow(true)}
      onMouseLeave={() => setSlow(false)}
      className="glass glass-hover rounded-[1.75rem] overflow-hidden border border-white/15 dark:border-white/10 h-full flex flex-col min-h-[120px] tile-grain relative"
    >
      <div className="px-5 pt-4 pb-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Stack tape</p>
        <p className="text-[11px] text-foreground/50 mt-1 leading-snug">
          Hover to pretend you&apos;re inspecting a patent diagram. (It&apos;s just tech keywords.)
        </p>
      </div>
      <div className="flex-1 flex items-center">
        <Marquee className="border-0 bg-transparent py-2" slow={slow} />
      </div>
    </motion.div>
  )
}
