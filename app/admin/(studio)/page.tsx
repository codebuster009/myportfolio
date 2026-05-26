import Link from "next/link"
import { FileEdit, Sparkles } from "lucide-react"
import { db } from "@/lib/db"
import { posts } from "@/drizzle/schema"
import { desc } from "drizzle-orm"
import PageHeader from "@/components/admin/PageHeader"

export default async function AdminDashboardPage() {
  const recent = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      categorySlug: posts.categorySlug,
      status: posts.status,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .orderBy(desc(posts.updatedAt))
    .limit(8)

  return (
    <div className="space-y-10">
      <PageHeader
        title="Overview"
        description="Draft, publish, and the site picks it up after revalidation — no git gymnastics."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/admin/posts/new"
          className="group rounded-2xl border border-border bg-card/60 p-6 shadow-sm hover:border-primary/40 hover:bg-primary/5 transition-all"
        >
          <FileEdit className="h-8 w-8 text-primary mb-3" />
          <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">New post</h2>
          <p className="text-xs text-muted-foreground mt-1">Editor with live MDX preview</p>
        </Link>
        <Link
          href="/admin/posts"
          className="group rounded-2xl border border-border bg-card/60 p-6 shadow-sm hover:border-primary/40 hover:bg-primary/5 transition-all"
        >
          <Sparkles className="h-8 w-8 text-primary mb-3" />
          <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">All posts</h2>
          <p className="text-xs text-muted-foreground mt-1">Jump to any draft or published piece</p>
        </Link>
      </div>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Recent activity</h2>
        <div className="rounded-2xl border border-border bg-card/40 overflow-hidden shadow-sm">
          {recent.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No posts yet. Create one or run the content migration.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recent.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between gap-4 p-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/admin/posts/${r.id}`}
                      className="font-medium text-foreground hover:text-primary truncate block"
                    >
                      {r.title}
                    </Link>
                    <p className="text-[11px] font-mono text-muted-foreground truncate">
                      /writing/{r.categorySlug}/{r.slug} · {r.status}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0 tabular-nums">
                    {r.updatedAt.toISOString().slice(0, 16).replace("T", " ")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
