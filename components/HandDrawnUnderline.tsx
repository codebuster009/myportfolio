"use client"

import { motion } from "framer-motion"

type Props = { className?: string }

export default function HandDrawnUnderline({ className = "" }: Props) {
  return (
    <motion.svg
      className={`absolute -bottom-1 left-0 w-full h-3 pointer-events-none overflow-visible ${className}`}
      viewBox="0 0 120 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      aria-hidden
    >
      <motion.path
        d="M2 7 C 28 2, 48 12, 62 6 S 95 2, 118 7"
        stroke="url(#squiggleGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="squiggleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="rgb(129 140 248)" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
