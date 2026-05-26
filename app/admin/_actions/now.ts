"use server"

import { eq } from "drizzle-orm"
import { z } from "zod"
import { nowPage } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/require-admin"
import { revalidatePath, revalidateTag } from "next/cache"

const schema = z.object({
  teaser: z.string().optional().nullable(),
  bodyMd: z.string(),
})

export async function saveNowPage(input: unknown) {
  await requireAdmin()
  const d = schema.parse(input)
  await db
    .insert(nowPage)
    .values({
      id: "now",
      teaser: d.teaser ?? null,
      bodyMd: d.bodyMd,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: nowPage.id,
      set: { teaser: d.teaser ?? null, bodyMd: d.bodyMd, updatedAt: new Date() },
    })
  revalidateTag("now")
  revalidatePath("/now")
  revalidatePath("/")
  revalidatePath("/admin/now")
  return { ok: true as const }
}
