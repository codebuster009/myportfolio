"use server"

import { eq } from "drizzle-orm"
import { z } from "zod"
import { books as booksTable } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/require-admin"
import { revalidatePath, revalidateTag } from "next/cache"

const bookSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1),
  author: z.string().min(1),
  coverUrl: z.string().optional().nullable(),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  take: z.string().optional().nullable(),
  current: z.boolean().optional(),
  sortIndex: z.number().int().optional(),
})

export async function upsertBook(input: unknown) {
  await requireAdmin()
  const b = bookSchema.parse(input)

  await db.transaction(async (tx) => {
    if (b.current) {
      await tx.update(booksTable).set({ current: false })
    }

    if (b.id) {
      await tx
        .update(booksTable)
        .set({
          title: b.title,
          author: b.author,
          coverUrl: b.coverUrl ?? null,
          rating: b.rating ?? null,
          take: b.take ?? null,
          current: !!b.current,
          sortIndex: b.sortIndex ?? 0,
          updatedAt: new Date(),
        })
        .where(eq(booksTable.id, b.id))
    } else {
      await tx.insert(booksTable).values({
        title: b.title,
        author: b.author,
        coverUrl: b.coverUrl ?? null,
        rating: b.rating ?? null,
        take: b.take ?? null,
        current: !!b.current,
        sortIndex: b.sortIndex ?? 0,
        updatedAt: new Date(),
      })
    }
  })

  revalidateTag("books")
  revalidatePath("/")
  revalidatePath("/writing/books")
  revalidatePath("/admin/books")
  return { ok: true as const }
}

export async function deleteBook(id: string) {
  await requireAdmin()
  await db.delete(booksTable).where(eq(booksTable.id, id))
  revalidateTag("books")
  revalidatePath("/")
  revalidatePath("/admin/books")
  return { ok: true as const }
}
