import Link from "next/link"
import { getAllPosts } from "@/lib/content"
import PostCard from "@/components/blog/PostCard"

export default async function WritingPreviewSection() {
  const all = await getAllPosts()
  const posts = all.slice(0, 3)
  if (posts.length === 0) return null

  const [first, second, third] = posts

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-2 tracking-tight">From the notebook</h2>
            <p className="text-foreground/80 max-w-xl leading-relaxed">
              Travel, books, habits, learning notes: the messy middle, not the polished pitch deck.
            </p>
          </div>
          <Link
            href="/writing"
            className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary hover:underline underline-offset-4 whitespace-nowrap"
          >
            All writing →
          </Link>
        </div>

        {first && second ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-10 md:mb-12">
            <div className="md:col-span-7">
              <PostCard post={first} />
            </div>
            <div className="md:col-span-5">
              <PostCard post={second} />
            </div>
          </div>
        ) : first ? (
          <div className="max-w-xl mb-10">
            <PostCard post={first} />
          </div>
        ) : null}

        {third ? (
          <div className="max-w-5xl mx-auto md:mx-0">
            <PostCard post={third} layout="horizontal" />
          </div>
        ) : null}
      </div>
    </section>
  )
}
