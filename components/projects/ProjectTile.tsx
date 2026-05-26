"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import type { Project } from "@/lib/data"
import { cn } from "@/lib/utils"
import { formatCatalogIndex, getFieldNote, isProjectLive, stickerFromTech } from "./project-tile-shared"

export type ProjectTileVariant = "normal" | "wide" | "tall"

type Props = {
  project: Project
  catalogIndex: number
  variant: ProjectTileVariant
  /** -1 or 1 for alternating idle rotation (normal only) */
  polaroidTilt?: number
  onOpen: (p: Project) => void
  priority?: boolean
}

export default function ProjectTile({
  project,
  catalogIndex,
  variant,
  polaroidTilt = 0,
  onOpen,
  priority,
}: Props) {
  const reduceMotion = useReducedMotion()
  const live = isProjectLive(project.live)
  const fieldNote = getFieldNote(project)
  const maxChips = variant === "wide" ? 3 : 4
  const chips = project.tech.slice(0, maxChips)
  const extra = project.tech.length > maxChips ? project.tech.length - maxChips : 0

  const gridClass =
    variant === "wide"
      ? "col-span-full sm:col-span-2 lg:col-span-2"
      : variant === "tall"
        ? "col-span-1 row-span-2"
        : "col-span-1"

  const polaroidDeg = reduceMotion || polaroidTilt === 0 ? 0 : polaroidTilt * 1.25

  const liveBadge = live ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
      <span className="relative flex h-2 w-2" title="Live in the wild">
        {!reduceMotion ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        ) : null}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Live
    </span>
  ) : null

  const chipRow = (
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
  )

  const openHint = (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-widest text-primary",
        "opacity-0 transition-opacity duration-300",
        "group-hover:opacity-100 group-focus-visible:opacity-100",
        variant === "wide" ? "pt-1 text-left sm:text-right" : "pt-1 text-right"
      )}
    >
      Open gallery →
    </p>
  )

  if (variant === "wide") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5 }}
        className={cn(gridClass, "h-full")}
      >
        <button
          type="button"
          onClick={() => onOpen(project)}
          className={cn(
            "group relative flex h-full min-h-[17rem] w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/15 dark:border-white/10 sm:min-h-[15rem] sm:flex-row",
            "glass glass-hover tile-grain text-left aspect-auto",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          <div className="relative h-48 w-full flex-shrink-0 sm:h-auto sm:min-h-full sm:w-1/2">
            <Image
              src={`/${project.src}`}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority={priority}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent sm:bg-gradient-to-r" />
          </div>
          <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center gap-3 p-5 sm:py-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                {formatCatalogIndex(catalogIndex)}
              </span>
              {liveBadge}
            </div>
            <span className="hidden font-mono text-[9px] uppercase tracking-wider text-foreground/50 sm:block">
              {stickerFromTech(project.tech)}
            </span>
            <h3 className="text-lg font-bold leading-snug text-foreground md:text-xl">{project.title}</h3>
            {chipRow}
            <p className="text-xs italic leading-relaxed text-foreground/65 sm:text-sm">{fieldNote}</p>
            {openHint}
          </div>
        </button>
      </motion.div>
    )
  }

  /* normal + tall: image card with bottom slab */
  const isTall = variant === "tall"
  const polaroidWrapClass =
    !reduceMotion && polaroidDeg !== 0
      ? "transition-transform duration-300 ease-out will-change-transform hover:rotate-0"
      : ""

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
      className={cn(gridClass, "h-full")}
    >
      <div
        className={cn("h-full", polaroidWrapClass)}
        style={reduceMotion || polaroidDeg === 0 ? undefined : { transform: `rotate(${polaroidDeg}deg)` }}
      >
        <button
          type="button"
          onClick={() => onOpen(project)}
          className={cn(
            "group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/15 dark:border-white/10",
            "glass glass-hover tile-grain text-left",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isTall ? "min-h-[28rem] sm:min-h-[32rem]" : "min-h-0"
          )}
        >
          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            transition={{ duration: 0.35 }}
            className={cn(
              "relative w-full flex-shrink-0 overflow-hidden",
              isTall ? "min-h-[14rem] flex-[1.1]" : "aspect-[4/3]"
            )}
          >
            <Image
              src={`/${project.src}`}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
              priority={priority}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-background/65 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/55 backdrop-blur-sm">
                {formatCatalogIndex(catalogIndex)}
              </span>
              {liveBadge}
            </div>
          </motion.div>
          <div className={cn("relative z-10 flex flex-col gap-2 p-4", isTall ? "flex-1 justify-end pb-5" : "")}>
            <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/50">{stickerFromTech(project.tech)}</span>
            <h3 className="text-base font-bold leading-snug text-foreground md:text-lg">{project.title}</h3>
            {chipRow}
            <p className="text-[11px] italic leading-relaxed text-foreground/65 sm:text-xs">{fieldNote}</p>
            {openHint}
          </div>
        </button>
      </div>
    </motion.div>
  )
}
