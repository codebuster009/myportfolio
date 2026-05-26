import { notFound } from "next/navigation"
import { asc, eq } from "drizzle-orm"
import { categories, posts } from "@/drizzle/schema"
import { db } from "@/lib/db"
import PostEditor from "@/components/admin/posts/PostEditor"

type Props = { params: { id: string } }

export default async function EditPostPage({ params }: Props) {
  const [row] = await db.select().from(posts).where(eq(posts.id, params.id)).limit(1)
  if (!row) notFound()
  const cats = await db.select().from(categories).orderBy(asc(categories.sortIndex), asc(categories.slug))
  return <PostEditor initial={row} categories={cats.map((c) => ({ slug: c.slug, title: c.title }))} />
}
