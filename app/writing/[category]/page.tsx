import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PostCard from "@/components/blog/PostCard"
import CategoryCover from "@/components/blog/CategoryCover"
import { getCategoryMeta } from "@/lib/category-meta"
import { getPostsByCategory, parseCategory } from "@/lib/content"

type Props = { params: { category: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await parseCategory(params.category)
  if (!category) return { title: "Not found", description: "Invalid category" }
  const meta = await getCategoryMeta(category)
  return {
    title: `${meta.title} | Writing`,
    description: meta.tagline,
  }
}

export default async function CategoryPage({ params }: Props) {
  const category = await parseCategory(params.category)
  if (!category) notFound()

  const posts = await getPostsByCategory(category)
  const metaTitle = (await getCategoryMeta(category)).title

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl space-y-12">
        <nav className="text-sm text-foreground/65">
          <Link href="/writing" className="hover:text-primary transition-colors">
            Writing
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{metaTitle}</span>
        </nav>

        <CategoryCover category={category} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="text-foreground/70 text-center py-8">Nothing here yet. Publish from /admin.</p>
        ) : null}
      </div>
    </main>
  )
}
