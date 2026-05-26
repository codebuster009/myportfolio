"use client"

import type { ReactNode } from "react"
import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const spring = { damping: 18, stiffness: 260 }

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({ children, className = "", strength = 0.35 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div ref={ref} className={`inline-flex ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ x: sx, y: sy }} className="inline-flex w-full">
        {children}
      </motion.div>
    </div>
  )
}
