import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/content"
import { getCategoryMeta } from "@/lib/category-meta"
import { readingMinutes } from "@/lib/reading-time"
import { cn } from "@/lib/utils"

export type PostCardLayout = "stacked" | "horizontal"

export default async function PostCard({
  post,
  layout = "stacked",
}: {
  post: Post
  layout?: PostCardLayout
}) {
  const meta = await getCategoryMeta(post.category)
  const minutes = readingMinutes(post.content)
  const dateStr = post.frontmatter.date
    ? new Date(post.frontmatter.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null

  const imageBlock = (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-muted/50",
        layout === "horizontal"
          ? "aspect-[16/10] md:aspect-[16/10] md:w-[min(100%,380px)] md:flex-shrink-0"
          : "aspect-[16/10]"
      )}
    >
      {post.frontmatter.cover ? (
        <Image
          src={post.frontmatter.cover}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes={layout === "horizontal" ? "(max-width: 768px) 100vw, 380px" : "(max-width: 768px) 100vw, 400px"}
        />
      ) : (
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", meta.gradient)} aria-hidden />
      )}
    </div>
  )

  const textBlock = (
    <div className="space-y-2 p-5 md:p-6 md:flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-foreground/60">
        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-primary">{meta.title}</span>
        {dateStr ? <time dateTime={post.frontmatter.date}>{dateStr}</time> : null}
        <span className="text-foreground/45">{minutes} min read</span>
      </div>
      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
        {post.frontmatter.title}
      </h2>
      {post.frontmatter.excerpt ? (
        <p className="text-sm text-foreground/75 line-clamp-2 leading-relaxed">{post.frontmatter.excerpt}</p>
      ) : null}
    </div>
  )

  return (
    <Link
      href={`/writing/${post.category}/${post.slug}`}
      className={cn(
        "group block rounded-[1.75rem] glass glass-hover overflow-hidden border border-white/20 dark:border-white/10",
        layout === "horizontal" && "md:flex md:flex-row md:items-stretch"
      )}
    >
      {imageBlock}
      {textBlock}
    </Link>
  )
}
