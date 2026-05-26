"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export type WritingNavItem = { slug: string; title: string }

export default function WritingTile({ items }: { items: WritingNavItem[] }) {
  const router = useRouter()

  const surprise = () => {
    if (items.length === 0) return
    const i = Math.floor(Math.random() * items.length)
    router.push(`/writing/${items[i]?.slug ?? items[0]!.slug}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.14 }}
      whileHover={{ y: -4 }}
      className="glass glass-hover rounded-[1.75rem] p-6 h-full border border-white/15 dark:border-white/10 flex flex-col justify-center tile-grain relative overflow-hidden"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Explore</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <motion.div key={item.slug} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={`/writing/${item.slug}`}
              className="inline-block rounded-full px-3 py-1.5 text-xs font-medium border border-primary/25 bg-primary/5 text-foreground/90 hover:border-primary/50 hover:bg-primary/12 transition-colors shadow-sm"
            >
              {item.title}
            </Link>
          </motion.div>
        ))}
        {items.length > 1 ? (
          <motion.button
            type="button"
            onClick={surprise}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full px-3 py-1.5 text-xs font-semibold border border-dashed border-primary/40 bg-background/50 text-primary hover:border-primary/60 hover:bg-primary/8 transition-colors"
          >
            Surprise me
          </motion.button>
        ) : null}
      </div>
    </motion.div>
  )
}
