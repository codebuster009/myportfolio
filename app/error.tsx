"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-semibold text-primary mb-2">Something went wrong</p>
      <h1 className="text-2xl font-bold text-foreground mb-4">Couldn&apos;t load this page</h1>
      <p className="text-foreground/75 max-w-md mb-8 text-sm">
        Try again. If it keeps happening, stop <code className="rounded bg-muted px-1">next dev</code>, run{" "}
        <code className="rounded bg-muted px-1">rm -rf .next</code>, then start dev once.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  )
}
