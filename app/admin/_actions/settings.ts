"use server"

import { eq } from "drizzle-orm"
import { z } from "zod"
import { settings as settingsTable } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/require-admin"
import { revalidatePath } from "next/cache"

const schema = z.object({
  key: z.string().min(1),
  value: z.record(z.string(), z.any()),
})

export async function saveSetting(input: unknown) {
  await requireAdmin()
  const { key, value } = schema.parse(input)
  await db
    .insert(settingsTable)
    .values({ key, value, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: settingsTable.key,
      set: { value, updatedAt: new Date() },
    })
  revalidatePath("/")
  revalidatePath("/admin/settings")
  return { ok: true as const }
}

export async function getSetting(key: string) {
  await requireAdmin()
  const [row] = await db.select().from(settingsTable).where(eq(settingsTable.key, key)).limit(1)
  return row?.value ?? null
}
