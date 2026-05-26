"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import type { BookEntry } from "@/lib/content"

export default function CurrentBookTile({ book }: { book: BookEntry | null }) {
  const wrapRef = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 220, damping: 22 })
  const sy = useSpring(my, { stiffness: 220, damping: 22 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10])

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  if (!book) {
    return (
      <div className="glass rounded-[1.75rem] p-5 flex items-center justify-center text-foreground/60 text-sm text-center tile-grain border border-white/15 dark:border-white/10">
        No books in shelf. Edit Bookshelf in /admin.
      </div>
    )
  }

  const progressPct =
    book.rating != null && book.rating >= 1 && book.rating <= 5
      ? Math.min(98, Math.round((book.rating / 5) * 100))
      : Math.min(92, 28 + (book.title.length % 7) * 9 + (book.author.length % 5) * 2)

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -4 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="glass glass-hover rounded-[1.75rem] p-5 flex gap-4 items-center h-full border border-white/15 dark:border-white/10 relative overflow-hidden tile-grain"
    >
      <div className="relative [perspective:800px]" style={{ transformStyle: "preserve-3d" }}>
        <motion.div
          className="relative w-[72px] h-[108px] flex-shrink-0 overflow-hidden rounded-lg bg-muted shadow-md ring-1 ring-white/10"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {book.cover ? (
            <Image src={book.cover} alt="" fill className="object-cover" sizes="72px" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/25 to-indigo-500/20 text-2xl font-bold text-primary/50">
              {book.title.charAt(0)}
            </div>
          )}
          {book.current ? (
            <span
              className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background"
              title="Currently reading"
            />
          ) : null}
        </motion.div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Reading</p>
        <p className="font-bold text-foreground leading-snug line-clamp-2">{book.title}</p>
        <p className="text-xs text-foreground/60 mt-1">{book.author}</p>

        <div className="mt-3 space-y-1">
          <div className="h-1 w-full overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-400"
              initial={{ width: 0 }}
              whileInView={{ width: `${progressPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-[10px] text-foreground/50 leading-snug italic">
            Ballpark progress. I dog-ear pages like it&apos;s a competitive sport.
          </p>
        </div>

        <Link href="/writing/books" className="text-xs text-primary font-medium mt-2 inline-block hover:underline">
          Shelf →
        </Link>
      </div>
    </motion.div>
  )
}
