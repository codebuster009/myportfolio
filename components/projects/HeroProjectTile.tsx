"use client"

import Image from "next/image"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"
import type { Project } from "@/lib/data"
import HandDrawnUnderline from "@/components/HandDrawnUnderline"
import { cn } from "@/lib/utils"
import { formatCatalogIndex, getFieldNote, isProjectLive, stickerFromTech } from "./project-tile-shared"

type Props = {
  project: Project
  catalogIndex: number
  onOpen: (p: Project) => void
  priority?: boolean
}

export default function HeroProjectTile({ project, catalogIndex, onOpen, priority }: Props) {
  const reduceMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 280, damping: 28 })
  const sy = useSpring(my, { stiffness: 280, damping: 28 })
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7])

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const live = isProjectLive(project.live)
  const fieldNote = getFieldNote(project)
  const chips = project.tech.slice(0, 4)
  const extra = project.tech.length > 4 ? project.tech.length - 4 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55 }}
      className="col-span-full row-span-2 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2 h-full min-h-[22rem] sm:min-h-[26rem]"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(
          "group relative h-full w-full min-h-[inherit] overflow-hidden rounded-[1.75rem] border border-white/15 dark:border-white/10",
          "glass glass-hover tile-grain text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <div className="absolute inset-0 [perspective:1200px]">
          <motion.div
            className="relative h-full min-h-[22rem] w-full sm:min-h-[26rem]"
            style={
              reduceMotion
                ? undefined
                : {
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }
            }
          >
            <motion.div
              className="relative h-full w-full"
              whileHover={reduceMotion ? undefined : { scale: 1.04 }}
              transition={{ duration: 0.35 }}
            >
              <Image
                src={`/${project.src}`}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 66vw"
                priority={priority}
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent" />
          </motion.div>
        </div>

        <div className="pointer-events-none relative z-10 flex h-full min-h-[inherit] flex-col">
          <div className="flex items-start justify-between gap-3 p-4 md:p-5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                {formatCatalogIndex(catalogIndex)}
              </span>
              {live ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2" title="Live in the wild">
                    {!reduceMotion ? (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    ) : null}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              ) : null}
            </div>
            <span
              className="max-w-[12rem] -rotate-2 rounded-md border border-primary/25 bg-background/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-foreground/70 shadow-sm backdrop-blur-sm md:max-w-[14rem]"
              title="Stack snapshot"
            >
              {stickerFromTech(project.tech)}
            </span>
          </div>

          <div className="mt-auto space-y-3 p-5 md:p-6">
            <div className="relative inline-block max-w-full">
              <h3 className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl">{project.title}</h3>
              <HandDrawnUnderline />
            </div>

            <div className="flex flex-wrap gap-2">
              {chips.map((tech, i) => (
                <span
                  key={tech + i}
                  style={{ "--i": i } as React.CSSProperties}
                  className={cn(
                    "rounded-full border border-white/20 bg-background/50 px-2.5 py-0.5 text-[10px] font-medium text-foreground/80 backdrop-blur-sm",
                    "transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transform-none",
                    "[transition-delay:calc(var(--i)*40ms)]"
                  )}
                >
                  {tech}
                </span>
              ))}
              {extra > 0 ? (
                <span className="rounded-full border border-white/15 bg-muted/40 px-2.5 py-0.5 text-[10px] text-foreground/60">
                  +{extra} more
                </span>
              ) : null}
            </div>

            <p className="text-sm italic leading-relaxed text-foreground/65">{fieldNote}</p>

            <p
              className={cn(
                "text-right text-xs font-semibold uppercase tracking-widest text-primary",
                "opacity-0 transition-opacity duration-300",
                "group-hover:opacity-100 group-focus-visible:opacity-100"
              )}
            >
              Open gallery →
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  )
}
