import type { ReactNode } from "react"

export default function MarkdownProse({ children }: { children: ReactNode }) {
  return (
    <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-glass">
      {children}
    </div>
  )
}
