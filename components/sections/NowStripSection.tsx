import Link from "next/link"
import { getNowPage } from "@/lib/content"

export default async function NowStripSection() {
  const now = await getNowPage()
  const teaser = now?.frontmatter.teaser?.trim()
  if (!teaser) return null

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/now"
          className="block rounded-2xl border border-primary/25 bg-primary/5 dark:bg-primary/10 px-5 py-4 transition-colors hover:border-primary/40 hover:bg-primary/10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Currently</p>
          <p className="text-foreground/90 text-base md:text-lg leading-relaxed">{teaser}</p>
          <p className="text-sm text-primary mt-2 font-medium">Read /now →</p>
        </Link>
      </div>
    </section>
  )
}
