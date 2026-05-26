"use server"

import { z } from "zod"
import { usesPage } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/require-admin"
import { revalidatePath, revalidateTag } from "next/cache"

const schema = z.object({
  bodyMd: z.string(),
})

export async function saveUsesPage(input: unknown) {
  await requireAdmin()
  const d = schema.parse(input)
  await db
    .insert(usesPage)
    .values({
      id: "uses",
      bodyMd: d.bodyMd,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: usesPage.id,
      set: { bodyMd: d.bodyMd, updatedAt: new Date() },
    })
  revalidateTag("uses")
  revalidatePath("/uses")
  revalidatePath("/admin/uses")
  return { ok: true as const }
}
