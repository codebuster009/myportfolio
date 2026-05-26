import type { BlogCategory } from "@/lib/content"
import { getCategoryMeta } from "@/lib/category-meta"

export default async function CategoryCover({ category }: { category: BlogCategory }) {
  const meta = await getCategoryMeta(category)
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/20 dark:border-white/10 bg-gradient-to-br px-6 py-14 md:px-12 md:py-16 ${meta.gradient}`}
    >
      <div className="relative z-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-foreground/60 mb-2">Writing</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{meta.title}</h1>
        <p className="text-lg text-foreground/80 leading-relaxed">{meta.tagline}</p>
      </div>
    </div>
  )
}
