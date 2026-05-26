import { asc } from "drizzle-orm"
import { categories } from "@/drizzle/schema"
import { db } from "@/lib/db"
import PostEditor from "@/components/admin/posts/PostEditor"

export default async function NewPostPage() {
  const cats = await db.select().from(categories).orderBy(asc(categories.sortIndex), asc(categories.slug))
  if (cats.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-sm text-foreground">
        <p className="font-medium text-amber-900 dark:text-amber-100 mb-2">No categories yet</p>
        <p className="text-muted-foreground">
          Run <code className="text-primary">npm run db:push</code> then{" "}
          <code className="text-primary">npm run migrate:content</code>, or add a category under{" "}
          <a href="/admin/categories" className="text-primary underline">
            Categories
          </a>
          .
        </p>
      </div>
    )
  }
  return <PostEditor initial={null} categories={cats.map((c) => ({ slug: c.slug, title: c.title }))} />
}
