"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/** Scroll-linked gradient bar for long posts (hidden when printing). */
export default function ReadingPostProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 35, mass: 0.15 })

  return (
    <motion.div
      className="no-print pointer-events-none fixed top-0 left-0 right-0 z-[55] h-[3px] origin-left bg-gradient-to-r from-primary via-indigo-500 to-fuchsia-500 shadow-[0_1px_12px_rgba(139,92,246,0.45)]"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
