"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  ASSISTANT_PROMPTS,
  AUTO_OPEN_DELAY_MS,
  INTRO_MESSAGE,
  SESSION_ASSISTANT_AUTO,
  type AssistantPrompt,
} from "@/lib/assistant-script"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Bubble = { role: "user" | "assistant"; text: string; prompt?: AssistantPrompt }

export default function AssistantPopover() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [thread, setThread] = useState<Bubble[]>([])
  const listRef = useRef<HTMLDivElement>(null)
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isAdmin = pathname?.startsWith("/admin")

  useEffect(() => {
    if (typeof window === "undefined" || isAdmin) return
    try {
      if (sessionStorage.getItem(SESSION_ASSISTANT_AUTO)) return
    } catch {
      return
    }
    autoTimer.current = setTimeout(() => {
      setOpen(true)
      setThread([{ role: "assistant", text: INTRO_MESSAGE }])
      try {
        sessionStorage.setItem(SESSION_ASSISTANT_AUTO, "1")
      } catch {
        /* private mode / cookies disabled - ignore */
      }
    }, AUTO_OPEN_DELAY_MS)
    return () => {
      if (autoTimer.current) clearTimeout(autoTimer.current)
    }
  }, [isAdmin])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [thread, open])

  const pushPrompt = (p: AssistantPrompt) => {
    setThread((prev) => [
      ...prev,
      { role: "user", text: p.chip },
      { role: "assistant", text: p.reply.text, prompt: p },
    ])
  }

  const toggleOpen = () => {
    setOpen((o) => {
      const next = !o
      if (next && thread.length === 0) {
        setThread([{ role: "assistant", text: INTRO_MESSAGE }])
      }
      return next
    })
  }

  if (isAdmin) return null

  return (
    <>
      <motion.button
        type="button"
        onClick={toggleOpen}
        className={cn(
          "no-print fixed bottom-5 right-5 z-[60] h-12 w-12 rounded-full",
          "bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground shadow-lg shadow-primary/35",
          "border border-white/25 flex items-center justify-center text-lg font-bold",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
        aria-label={open ? "Close help" : "Open help"}
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -4, 0],
              }
        }
        transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        K
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="no-print fixed bottom-[4.5rem] right-5 z-[60] w-[min(100vw-2rem,340px)] max-h-[min(70vh,460px)] flex flex-col glass rounded-[1.75rem] border border-primary/20 shadow-glass-hover tile-grain overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-white/15 dark:border-white/10 flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/80 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                K
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">K&apos;s bot, scripted but honest</p>
                <p className="text-[10px] text-foreground/55 font-mono uppercase tracking-wider">No LLM. Just shortcuts.</p>
              </div>
              <button
                type="button"
                className="ml-auto text-xs text-foreground/55 hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px]">
              {thread.map((b, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    b.role === "user"
                      ? "ml-6 bg-primary/15 text-foreground border border-primary/20"
                      : "mr-4 bg-background/60 dark:bg-background/40 border border-white/15 text-foreground/90"
                  )}
                >
                  {b.text}
                  {b.role === "assistant" && b.prompt?.reply.cta ? (
                    <Link
                      href={b.prompt.reply.cta.href}
                      className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      {b.prompt.reply.cta.label} →
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="border-t border-white/15 dark:border-white/10 px-3 py-2 flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto">
              {ASSISTANT_PROMPTS.map((p) => (
                <Button
                  key={p.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full h-7 text-[10px] px-2 border-primary/25 glass-hover"
                  onClick={() => pushPrompt(p)}
                >
                  {p.chip}
                </Button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
