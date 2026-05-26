import Link from "next/link"
import { desc } from "drizzle-orm"
import { posts as postsTable } from "@/drizzle/schema"
import { db } from "@/lib/db"
import PageHeader from "@/components/admin/PageHeader"

export default async function AdminPostsPage() {
  const rows = await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      slug: postsTable.slug,
      categorySlug: postsTable.categorySlug,
      status: postsTable.status,
      updatedAt: postsTable.updatedAt,
    })
    .from(postsTable)
    .orderBy(desc(postsTable.updatedAt))

  return (
    <div className="space-y-8">
      <PageHeader
        title="Posts"
        description="All drafts and published writing."
        actions={
          <Link
            href="/admin/posts/new"
            className="inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 transition-opacity"
          >
            New post
          </Link>
        }
      />

      <ul className="rounded-2xl border border-border bg-card/40 divide-y divide-border overflow-hidden shadow-sm">
        {rows.length === 0 ? (
          <li className="p-6 text-sm text-muted-foreground">No posts yet.</li>
        ) : (
          rows.map((r) => (
            <li
              key={r.id}
              className="p-4 flex flex-wrap items-center justify-between gap-3 hover:bg-muted/40 transition-colors"
            >
              <div className="min-w-0">
                <Link href={`/admin/posts/${r.id}`} className="font-medium text-foreground hover:text-primary">
                  {r.title}
                </Link>
                <p className="text-[11px] font-mono text-muted-foreground">
                  /writing/{r.categorySlug}/{r.slug} · {r.status}
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground tabular-nums">
                {r.updatedAt.toISOString().slice(0, 16)}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
