import type { ReactNode } from "react"

export default function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8 md:mb-10">
      <div className="min-w-0 space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div> : null}
    </div>
  )
}
