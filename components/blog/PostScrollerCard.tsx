import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/content"
import { getCategoryMeta } from "@/lib/category-meta"
import { readingMinutes } from "@/lib/reading-time"
import { cn } from "@/lib/utils"

export default async function PostScrollerCard({ post }: { post: Post }) {
  const meta = await getCategoryMeta(post.category)
  const minutes = readingMinutes(post.content)
  const dateStr = post.frontmatter.date
    ? new Date(post.frontmatter.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null

  return (
    <Link
      href={`/writing/${post.category}/${post.slug}`}
      className={cn(
        "group block snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[340px]",
        "rounded-2xl glass glass-hover overflow-hidden border border-white/15 dark:border-white/10",
        "transition-transform duration-300 hover:-translate-y-1"
      )}
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted/40">
        {post.frontmatter.cover ? (
          <Image
            src={post.frontmatter.cover}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="340px"
          />
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", meta.gradient)} aria-hidden />
        )}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-background/70 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-foreground/85 border border-white/20">
            {meta.title}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-1.5">
        <h3 className="text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.frontmatter.title}
        </h3>
        {post.frontmatter.excerpt ? (
          <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed">{post.frontmatter.excerpt}</p>
        ) : null}
        <div className="pt-1 flex items-center gap-2 text-[11px] text-foreground/55">
          {dateStr ? <time dateTime={post.frontmatter.date}>{dateStr}</time> : null}
          <span>·</span>
          <span>{minutes} min</span>
        </div>
      </div>
    </Link>
  )
}
