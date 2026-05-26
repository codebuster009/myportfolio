"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import type { Post } from "@/lib/content"
import { readingMinutes } from "@/lib/reading-time"

export type LatestCategoryPresentation = { title: string; gradient: string; letter: string }

function CoverFallback({
  meta,
  minutes,
  glyph,
}: {
  meta: LatestCategoryPresentation
  minutes: number
  glyph: string
}) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient}`}>
      <span
        className="absolute inset-0 opacity-50 mix-blend-soft-light dark:mix-blend-normal dark:opacity-35"
        style={{
          backgroundImage: `radial-gradient(rgba(99,102,241,0.12) 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
        }}
        aria-hidden
      />
      <span className="absolute top-3 right-3 rounded-full bg-background/80 dark:bg-background/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground/85 border border-primary/20 shadow-sm">
        {minutes} min read
      </span>
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-7xl md:text-8xl font-bold text-white/30 dark:text-white/15 select-none pointer-events-none"
        aria-hidden
      >
        {glyph}
      </span>
    </div>
  )
}

export default function LatestPostTile({
  post,
  categoryPresentation,
}: {
  post: Post | null
  categoryPresentation: LatestCategoryPresentation | null
}) {
  const [coverBroken, setCoverBroken] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 280, damping: 28 })
  const sy = useSpring(my, { stiffness: 280, damping: 28 })
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7])

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onCardLeave = () => {
    mx.set(0)
    my.set(0)
  }

  if (!post) {
    return (
      <div className="glass rounded-[1.75rem] p-6 flex items-center justify-center text-foreground/60 text-sm tile-grain border border-white/15 dark:border-white/10">
        No posts yet. Publish from /admin.
      </div>
    )
  }

  const meta =
    categoryPresentation ?? {
      title: post.category,
      letter: post.category.charAt(0).toUpperCase() || "?",
      gradient:
        "from-slate-200/70 via-zinc-100/50 to-neutral-200/55 dark:from-slate-800/50 dark:via-zinc-900/40 dark:to-neutral-900/45",
    }

  const minutes = readingMinutes(post.content)
  const glyph = (meta.letter || post.category.charAt(0)).toUpperCase()
  const coverSrc = post.frontmatter.cover
  const showCover = Boolean(coverSrc) && !coverBroken

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link
        href={`/writing/${post.category}/${post.slug}`}
        className="group block h-full [perspective:1200px]"
      >
        <motion.div
          className="glass glass-hover rounded-[1.75rem] overflow-hidden h-full border border-white/15 dark:border-white/10 flex flex-col relative tile-grain"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
        >
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" aria-hidden />
          <div className="relative aspect-[16/10] overflow-hidden" style={{ transform: "translateZ(20px)" }}>
            <motion.span
              className="absolute top-3 left-3 z-20 inline-flex items-center rounded-full bg-background/85 dark:bg-background/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary border border-primary/25 shadow-sm pointer-events-none"
              animate={{ rotate: [0, -5, 4, -3, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, repeatDelay: 4.2, ease: "easeInOut" }}
            >
              Fresh ink
            </motion.span>
            <motion.div className="relative w-full h-full" whileHover={{ scale: 1.04 }} transition={{ duration: 0.35 }}>
              {showCover ? (
                <>
                  <Image
                    src={coverSrc!}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 480px"
                    onError={() => setCoverBroken(true)}
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-background/80 dark:bg-background/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground/85 border border-primary/20 shadow-sm">
                    {minutes} min read
                  </span>
                </>
              ) : (
                <CoverFallback meta={meta} minutes={minutes} glyph={glyph} />
              )}
            </motion.div>
          </div>
          <div className="p-5 md:p-6 flex-1 flex flex-col relative z-10" style={{ transform: "translateZ(30px)" }}>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{meta.title}</span>
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {post.frontmatter.title}
            </h3>
            {post.frontmatter.excerpt ? (
              <p className="text-sm text-foreground/70 mt-2 line-clamp-2">{post.frontmatter.excerpt}</p>
            ) : null}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
