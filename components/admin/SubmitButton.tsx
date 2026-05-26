"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAdminFormPending } from "./AdminForm"

export default function SubmitButton({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline"
}) {
  const pending = useAdminFormPending()
  const variantClass =
    variant === "destructive"
      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      : variant === "outline"
        ? "border border-border bg-background text-foreground hover:bg-muted shadow-none"
        : "bg-primary text-primary-foreground shadow-sm"
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity disabled:pointer-events-none disabled:opacity-60",
        variantClass,
        className
      )}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden /> : null}
      {children}
    </button>
  )
}
