"use client"

import "./globals.css"

import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

/** Replaces the root layout when active — must import global CSS or the shell is unstyled HTML. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans min-h-screen flex flex-col items-center justify-center p-8 bg-zinc-950 text-zinc-100`}
      >
        <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
        <p className="text-zinc-400 text-sm mb-6 max-w-md text-center">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-500"
        >
          Try again
        </button>
      </body>
    </html>
  )
}
