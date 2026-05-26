import { and, eq, isNotNull, lte } from "drizzle-orm"
import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { posts } from "@/drizzle/schema"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

function revalidatePostSurface(categorySlug: string, slug: string) {
  revalidateTag("posts")
  revalidateTag(`posts:${categorySlug}`)
  revalidateTag(`post:${categorySlug}:${slug}`)
  revalidatePath(`/writing/${categorySlug}/${slug}`)
  revalidatePath(`/writing/${categorySlug}`)
  revalidatePath("/writing")
  revalidatePath("/")
}

/**
 * Hourly cron (see vercel.json). Secured with CRON_SECRET when set.
 */
export async function GET(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: false, reason: "database_not_configured" }, { status: 503 })
  }

  const secret = process.env.CRON_SECRET
  const auth = request.headers.get("authorization")
  const isProd = process.env.NODE_ENV === "production"

  if (isProd) {
    if (!secret) {
      return NextResponse.json({ error: "CRON_SECRET must be set in production" }, { status: 500 })
    }
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  } else if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()
  const due = await db
    .select()
    .from(posts)
    .where(
      and(eq(posts.status, "scheduled"), isNotNull(posts.scheduledAt), lte(posts.scheduledAt, now))
    )

  let count = 0
  for (const row of due) {
    await db
      .update(posts)
      .set({
        status: "published",
        publishedAt: row.publishedAt ?? now,
        scheduledAt: null,
        updatedAt: now,
      })
      .where(eq(posts.id, row.id))
    revalidatePostSurface(row.categorySlug, row.slug)
    count++
  }

  if (count > 0) {
    revalidateTag("categories")
  }

  return NextResponse.json({ ok: true, published: count })
}
