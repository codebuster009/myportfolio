"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { PlaylistItem } from "@/lib/playlist"

type Props = PlaylistItem & { delay: number }

export default function PlaylistMediaCard({ title, by, cover, year, link, delay }: Props) {
  const href = link
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      whileHover={{ y: -6, rotate: -0.5 }}
      className="glass glass-hover rounded-[1.25rem] overflow-hidden border border-white/15 dark:border-white/10 tile-grain group h-full"
    >
      <div className="relative aspect-[3/4] bg-muted/50">
        {cover ? (
          <Image src={cover} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="200px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary/25 bg-gradient-to-br from-primary/10 to-indigo-500/10">
            {title.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="font-bold text-foreground leading-snug line-clamp-2">{title}</p>
        <p className="text-xs text-foreground/65 mt-1">{[by, year].filter(Boolean).join(" · ")}</p>
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </Link>
    )
  }
  return inner
}
