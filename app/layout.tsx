import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@fontsource/caveat/400.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import AssistantPopover from "@/components/assistant/AssistantPopover"
import SiteEnhancements from "@/components/SiteEnhancements"
import { ThemeProvider } from "@/components/ThemeProvider"

config.autoAddCss = false

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kartavaya Sharma | builder, reader, writer",
  description:
    "Personal site: projects, writing on travel, books, habits, learning, and systems, plus the occasional honest note.",
  keywords: ["portfolio", "developer", "writing", "react", "next.js", "kartavaya sharma"],
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SiteEnhancements />
          <AssistantPopover />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
