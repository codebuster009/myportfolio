"use client"

import { motion } from "framer-motion"

export default function NowPlayingPulse() {
  return (
    <motion.span
      className="absolute bottom-3 right-3 h-3 w-3 rounded-full bg-primary"
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      aria-hidden
    />
  )
}
