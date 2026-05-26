"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const LABELS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Docker",
  "Decap CMS",
  "MDX",
  "REST APIs",
  "WebSockets",
  "GraphQL",
]

type MarqueeProps = {
  className?: string
  /** When true, crawl speed drops to a near-freeze for "lean in and read" */
  slow?: boolean
}

export default function Marquee({ className, slow = false }: MarqueeProps) {
  const doubled = [...LABELS, ...LABELS]
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-white/15 dark:border-white/10 py-4 bg-background/30",
        className
      )}
    >
      <motion.div
        className="flex gap-12 md:gap-16 w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: slow ? 220 : 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="text-sm font-mono uppercase tracking-[0.22em] text-foreground/50 whitespace-nowrap"
          >
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
