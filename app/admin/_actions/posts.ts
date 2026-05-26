"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { posts, auditLog } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/require-admin"
import { readingMinutes } from "@/lib/reading-time"

function revalidatePostSurface(categorySlug: string, slug: string) {
  revalidateTag("posts")
  revalidateTag(`posts:${categorySlug}`)
  revalidateTag(`post:${categorySlug}:${slug}`)
  revalidatePath(`/writing/${categorySlug}/${slug}`)
  revalidatePath(`/writing/${categorySlug}`)
  revalidatePath("/writing")
  revalidatePath("/")
}

async function logAudit(
  login: string,
  action: string,
  entity: string,
  entityId: string | undefined,
  diff: Record<string, unknown> | null
) {
  try {
    await db.insert(auditLog).values({
      actorLogin: login,
      action,
      entity,
      entityId: entityId ?? null,
      diff: diff ?? null,
    })
  } catch {
    /* optional table */
  }
}

const draftSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  categorySlug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().optional().nullable(),
  coverUrl: z.string().optional().nullable(),
  bodyMd: z.string(),
  tags: z.array(z.string()).optional(),
  clientUpdatedAt: z.string().optional(),
})

export async function savePostDraft(input: unknown) {
  const user = await requireAdmin()
  const data = draftSchema.parse(input)
  const minutes = readingMinutes(data.bodyMd)

  if (data.id) {
    const [row] = await db.select().from(posts).where(eq(posts.id, data.id)).limit(1)
    if (!row) throw new Error("Post not found")
    if (data.clientUpdatedAt) {
      const clientTs = new Date(data.clientUpdatedAt).getTime()
      if (clientTs < row.updatedAt.getTime()) {
        return { ok: false as const, error: "conflict" as const }
      }
    }
    await db
      .update(posts)
      .set({
        title: data.title,
        slug: data.slug,
        categorySlug: data.categorySlug,
        excerpt: data.excerpt ?? null,
        coverUrl: data.coverUrl ?? null,
        bodyMd: data.bodyMd,
        tags: data.tags ?? null,
        readingMinutes: minutes,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, data.id))

    await logAudit(user.login, "post.save_draft", "post", data.id, { slug: data.slug })
    if (row.status === "published") {
      revalidatePostSurface(data.categorySlug, data.slug)
    }
    const [after] = await db.select({ updatedAt: posts.updatedAt }).from(posts).where(eq(posts.id, data.id)).limit(1)
    return { ok: true as const, id: data.id, updatedAt: after?.updatedAt.toISOString() ?? new Date().toISOString() }
  }

  const [inserted] = await db
    .insert(posts)
    .values({
      title: data.title,
      slug: data.slug,
      categorySlug: data.categorySlug,
      excerpt: data.excerpt ?? null,
      coverUrl: data.coverUrl ?? null,
      bodyMd: data.bodyMd,
      tags: data.tags ?? null,
      readingMinutes: minutes,
      status: "draft",
      publishedAt: null,
      scheduledAt: null,
      updatedAt: new Date(),
    })
    .returning({ id: posts.id, updatedAt: posts.updatedAt })

  await logAudit(user.login, "post.create_draft", "post", inserted.id, { slug: data.slug })
  return {
    ok: true as const,
    id: inserted.id,
    updatedAt: inserted.updatedAt.toISOString(),
  }
}

const publishSchema = draftSchema.extend({
  id: z.string().uuid(),
})

export async function publishPost(input: unknown) {
  const user = await requireAdmin()
  const data = publishSchema.parse(input)
  const minutes = readingMinutes(data.bodyMd)

  const [row] = await db.select().from(posts).where(eq(posts.id, data.id)).limit(1)
  if (!row) throw new Error("Post not found")
  if (data.clientUpdatedAt) {
    const clientTs = new Date(data.clientUpdatedAt).getTime()
    if (clientTs < row.updatedAt.getTime()) {
      return { ok: false as const, error: "conflict" as const }
    }
  }

  const now = new Date()
  await db
    .update(posts)
    .set({
      title: data.title,
      slug: data.slug,
      categorySlug: data.categorySlug,
      excerpt: data.excerpt ?? null,
      coverUrl: data.coverUrl ?? null,
      bodyMd: data.bodyMd,
      tags: data.tags ?? null,
      readingMinutes: minutes,
      status: "published",
      publishedAt: row.publishedAt ?? now,
      scheduledAt: null,
      updatedAt: now,
    })
    .where(eq(posts.id, data.id))

  await logAudit(user.login, "post.publish", "post", data.id, { slug: data.slug })
  revalidatePostSurface(data.categorySlug, data.slug)
  revalidateTag("categories")
  return { ok: true as const, id: data.id }
}

export async function unpublishPost(id: string) {
  const user = await requireAdmin()
  const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  if (!row) throw new Error("Not found")
  await db
    .update(posts)
    .set({ status: "draft", updatedAt: new Date() })
    .where(eq(posts.id, id))
  await logAudit(user.login, "post.unpublish", "post", id, null)
  revalidatePostSurface(row.categorySlug, row.slug)
  return { ok: true as const }
}

export async function schedulePost(input: unknown) {
  const user = await requireAdmin()
  const scheduleSchema = publishSchema.extend({
    scheduledAt: z.string().datetime(),
  })
  const data = scheduleSchema.parse(input)
  const minutes = readingMinutes(data.bodyMd)
  const when = new Date(data.scheduledAt)

  const [row] = await db.select().from(posts).where(eq(posts.id, data.id)).limit(1)
  if (!row) throw new Error("Post not found")

  await db
    .update(posts)
    .set({
      title: data.title,
      slug: data.slug,
      categorySlug: data.categorySlug,
      excerpt: data.excerpt ?? null,
      coverUrl: data.coverUrl ?? null,
      bodyMd: data.bodyMd,
      tags: data.tags ?? null,
      readingMinutes: minutes,
      status: "scheduled",
      scheduledAt: when,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, data.id))

  await logAudit(user.login, "post.schedule", "post", data.id, { at: data.scheduledAt })
  return { ok: true as const }
}

export async function deletePost(id: string) {
  const user = await requireAdmin()
  const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  if (!row) throw new Error("Not found")
  await db.delete(posts).where(eq(posts.id, id))
  await logAudit(user.login, "post.delete", "post", id, { slug: row.slug })
  revalidatePostSurface(row.categorySlug, row.slug)
  return { ok: true as const }
}
