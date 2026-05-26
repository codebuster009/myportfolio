import { cn } from "@/lib/utils"

export function AdminPageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse space-y-6", className)} aria-hidden>
      <div className="space-y-2">
        <div className="h-8 w-48 rounded-lg bg-muted" />
        <div className="h-4 w-full max-w-md rounded bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-32 rounded-2xl bg-muted" />
        <div className="h-32 rounded-2xl bg-muted" />
      </div>
      <div className="h-64 rounded-2xl bg-muted" />
    </div>
  )
}
