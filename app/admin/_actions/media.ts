"use server"

import { createClient } from "@supabase/supabase-js"
import { eq, or, sql } from "drizzle-orm"
import { requireAdmin } from "@/lib/require-admin"
import { db } from "@/lib/db"
import { media as mediaTable, posts } from "@/drizzle/schema"
import { revalidatePath, revalidateTag } from "next/cache"

export async function uploadMediaFormData(formData: FormData) {
  await requireAdmin()
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing")
  }
  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file")
  }
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`
  const buf = Buffer.from(await file.arrayBuffer())
  const supabase = createClient(url, key)
  const bucket = process.env.SUPABASE_MEDIA_BUCKET ?? "media"
  const { data, error } = await supabase.storage.from(bucket).upload(safeName, buf, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  })
  if (error) throw error
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path)

  await db.insert(mediaTable).values({
    url: publicUrl,
    alt: file.name,
    kind: "image",
    bytes: file.size,
  })
  revalidateTag("media")
  revalidatePath("/admin/media")
  return { url: publicUrl, path: data.path }
}

export async function deleteMedia(id: string) {
  await requireAdmin()
  const [m] = await db.select().from(mediaTable).where(eq(mediaTable.id, id)).limit(1)
  if (!m) throw new Error("Media not found")

  const url = m.url
  const [hit] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(
      or(
        sql`position(${url} in ${posts.bodyMd}::text) > 0`,
        eq(posts.coverUrl, url)
      )
    )
    .limit(1)

  if (hit) {
    throw new Error("Media is still referenced by a post; remove links first")
  }

  await db.delete(mediaTable).where(eq(mediaTable.id, id))
  revalidateTag("media")
  revalidatePath("/admin/media")
  return { ok: true as const }
}
