"use server"

import { eq, count } from "drizzle-orm"
import { z } from "zod"
import { categories as categoriesTable, posts } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/require-admin"
import { revalidatePath, revalidateTag } from "next/cache"

const categorySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  tagline: z.string().optional().nullable(),
  accentHex: z.string().optional().nullable(),
  gradient: z.string().optional().nullable(),
  letter: z.string().optional().nullable(),
  cardAspect: z.enum(["portrait", "landscape"]).optional(),
})

export async function upsertCategory(input: unknown) {
  await requireAdmin()
  const c = categorySchema.parse(input)
  await db
    .insert(categoriesTable)
    .values({
      slug: c.slug,
      title: c.title,
      tagline: c.tagline ?? null,
      accentHex: c.accentHex ?? "#6b7280",
      gradient: c.gradient ?? null,
      letter: c.letter ?? null,
      cardAspect: c.cardAspect ?? "landscape",
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: categoriesTable.slug,
      set: {
        title: c.title,
        tagline: c.tagline ?? null,
        accentHex: c.accentHex ?? "#6b7280",
        gradient: c.gradient ?? null,
        letter: c.letter ?? null,
        cardAspect: c.cardAspect ?? "landscape",
        updatedAt: new Date(),
      },
    })
  revalidateTag("categories")
  revalidatePath("/writing")
  revalidatePath("/")
  revalidatePath("/admin/categories")
  return { ok: true as const }
}

export async function deleteCategory(slug: string) {
  await requireAdmin()
  const [row] = await db.select({ c: count() }).from(posts).where(eq(posts.categorySlug, slug))
  const postCount = Number(row?.c ?? 0)
  if (postCount > 0) throw new Error("Category has posts; move or delete them first")
  await db.delete(categoriesTable).where(eq(categoriesTable.slug, slug))
  revalidateTag("categories")
  revalidatePath("/writing")
  revalidatePath("/admin/categories")
  return { ok: true as const }
}

export async function reorderCategories(orderedSlugs: string[]) {
  await requireAdmin()
  let i = 0
  for (const slug of orderedSlugs) {
    await db
      .update(categoriesTable)
      .set({ sortIndex: i++, updatedAt: new Date() })
      .where(eq(categoriesTable.slug, slug))
  }
  revalidateTag("categories")
  return { ok: true as const }
}
