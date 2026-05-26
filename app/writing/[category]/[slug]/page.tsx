import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import MdxBody from "@/components/blog/MdxBody"
import ReadingPostProgress from "@/components/blog/ReadingPostProgress"
import { getCategoryMeta } from "@/lib/category-meta"
import { getPost, parseCategory } from "@/lib/content"

type Props = { params: { category: string; slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await parseCategory(params.category)
  if (!category) return { title: "Not found" }
  const post = await getPost(category, params.slug)
  if (!post) return { title: "Not found" }
  const meta = await getCategoryMeta(category)
  const desc = post.frontmatter.excerpt ?? `${post.frontmatter.title} · Kartavaya Sharma`
  return {
    title: `${post.frontmatter.title} | ${meta.title}`,
    description: desc,
    openGraph: {
      title: post.frontmatter.title,
      description: desc,
      type: "article",
      images: post.frontmatter.cover ? [{ url: post.frontmatter.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: desc,
      images: post.frontmatter.cover ? [post.frontmatter.cover] : undefined,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const category = await parseCategory(params.category)
  if (!category) notFound()
  const post = await getPost(category, params.slug)
  if (!post) notFound()

  const catMeta = await getCategoryMeta(category)

  const dateStr = post.frontmatter.date
    ? new Date(post.frontmatter.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <ReadingPostProgress />
      <article className="container mx-auto max-w-3xl print-article">
        <nav className="text-sm text-foreground/65 mb-8">
          <Link href="/writing" className="hover:text-primary transition-colors">
            Writing
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/writing/${category}`} className="hover:text-primary transition-colors">
            {catMeta.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground line-clamp-1">{post.frontmatter.title}</span>
        </nav>

        <header className="mb-10">
          <p className="text-sm font-semibold text-primary mb-2">{catMeta.title}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            {post.frontmatter.title}
          </h1>
          {dateStr ? (
            <p className="text-foreground/65 text-sm">
              <time dateTime={post.frontmatter.date}>{dateStr}</time>
            </p>
          ) : null}
        </header>

        {post.frontmatter.cover ? (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-glass border border-white/15 dark:border-white/10">
            <Image
              src={post.frontmatter.cover}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        ) : null}

        <MdxBody source={post.content} />
      </article>
    </main>
  )
}
