import Link from "next/link"
import type { Metadata } from "next"
import PostScrollerCard from "@/components/blog/PostScrollerCard"
import CaseStudyScrollerCard, {
  type CaseStudyItem,
} from "@/components/blog/CaseStudyScrollerCard"
import { getAllCategories, getAllPosts } from "@/lib/content"
import { getCategoryMeta } from "@/lib/category-meta"

export const metadata: Metadata = {
  title: "Writing | Kartavaya Sharma",
  description: "Case studies, system design notes, learning, books, habits, travel.",
}

const CASE_STUDIES: CaseStudyItem[] = [
  {
    slug: "marketing-ai",
    title: "NextViralAI: building an AI marketing pipeline that sounds like the brand",
    excerpt:
      "Streaming content generation with multi-stage prompts, brand-voice retention, and the React Query data layer that ties it together.",
    cover: "/MAI-project/homepage.png",
    domain: "AI Marketing",
    stack: "React · Node · OpenAI",
    gradient: "from-violet-200/70 via-purple-100/50 to-fuchsia-200/55 dark:from-violet-900/40 dark:via-purple-950/30 dark:to-fuchsia-900/35",
  },
  {
    slug: "freighkit-ai",
    title: "Freighkit AI: a chatbot dispatchers actually want to use",
    excerpt:
      "A streaming, tool-calling AI assistant for freight operators that handles messy real-world prompts without breaking the dispatch workflow.",
    cover: "/freighkit.ai-project/conversation.png",
    domain: "AI Chatbot",
    stack: "React · TS · LLM",
    gradient: "from-sky-200/70 via-blue-100/50 to-indigo-200/55 dark:from-sky-900/40 dark:via-blue-950/30 dark:to-indigo-900/35",
  },
  {
    slug: "authnull",
    title: "Authnull: enterprise passwordless admin that doesn't feel enterprise",
    excerpt:
      "OAuth 2.0, role-based access control, session management, audit logs. Plumbing for enterprise auth, wrapped in a UI admins actually use.",
    cover: "/Authnull-project/authnull.png",
    domain: "Enterprise Auth",
    stack: "React · Redux · Ant Design",
    gradient: "from-emerald-200/70 via-teal-100/50 to-cyan-200/55 dark:from-emerald-900/40 dark:via-teal-950/30 dark:to-cyan-900/35",
  },
]

export default async function WritingIndexPage() {
  const posts = await getAllPosts()
  const cats = await getAllCategories()

  // Group posts by category, preserving DB order
  const postsByCategory = new Map<string, typeof posts>()
  for (const post of posts) {
    const list = postsByCategory.get(post.category) ?? []
    list.push(post)
    postsByCategory.set(post.category, list)
  }

  // Build the list of categories that actually have posts, in the order from cats[]
  const categorySections = await Promise.all(
    cats
      .filter((cat) => (postsByCategory.get(cat)?.length ?? 0) > 0)
      .map(async (cat) => ({
        slug: cat,
        meta: await getCategoryMeta(cat),
        posts: postsByCategory.get(cat) ?? [],
      }))
  )

  return (
    <main className="min-h-screen pt-24 pb-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Notebook</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Writing</h1>
        <p className="text-lg text-foreground/80 max-w-2xl leading-relaxed">
          Case studies up top. Notes underneath. Some of it is technical, some of it is books and travel
          and habits. If something resonates, I would love to hear from you.
        </p>
      </div>

      {/* Case studies row */}
      <Row
        title="Case studies"
        subtitle="Long-form breakdowns of real client projects."
      >
        {CASE_STUDIES.map((cs) => (
          <CaseStudyScrollerCard key={cs.slug} item={cs} />
        ))}
      </Row>

      {/* Category rows */}
      {categorySections.map((section) => (
        <Row
          key={section.slug}
          title={section.meta.title}
          subtitle={section.meta.tagline ?? undefined}
          viewAllHref={`/writing/${section.slug}`}
        >
          {section.posts.map((post) => (
            <PostScrollerCard key={`${post.category}-${post.slug}`} post={post} />
          ))}
        </Row>
      ))}

      {posts.length === 0 ? (
        <p className="container mx-auto max-w-7xl px-4 text-foreground/70 text-center py-16">
          No posts yet. Add one from /admin.
        </p>
      ) : null}
    </main>
  )
}

function Row({
  title,
  subtitle,
  viewAllHref,
  children,
}: {
  title: string
  subtitle?: string
  viewAllHref?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-12 md:mb-14">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4 md:mb-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
            {subtitle ? <p className="text-sm text-foreground/65 mt-1">{subtitle}</p> : null}
          </div>
          {viewAllHref ? (
            <Link
              href={viewAllHref}
              className="text-sm text-primary hover:underline shrink-0 font-medium"
            >
              View all →
            </Link>
          ) : null}
        </div>
      </div>

      <div
        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
        style={{ scrollPaddingLeft: "1.5rem" }}
      >
        <div className="flex gap-4 md:gap-5 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          {children}
        </div>
      </div>
    </section>
  )
}
