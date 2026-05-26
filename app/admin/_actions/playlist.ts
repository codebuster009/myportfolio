"use server"

import { z } from "zod"
import { playlistSingleton } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { requireAdmin } from "@/lib/require-admin"
import { revalidatePath, revalidateTag } from "next/cache"

const playlistItemSchema = z.object({
  title: z.string(),
  by: z.string().optional(),
  year: z.number().optional(),
  cover: z.string().optional(),
  link: z.string().optional(),
})

const playlistNowSchema = z.object({
  kind: z.enum(["album", "film", "game"]),
  title: z.string(),
  by: z.string().optional(),
  cover: z.string().optional(),
  link: z.string().optional(),
})

const playlistDataSchema = z.object({
  now: playlistNowSchema.optional(),
  albums: z.array(playlistItemSchema).default([]),
  films: z.array(playlistItemSchema).default([]),
  games: z.array(playlistItemSchema).default([]),
})

export async function savePlaylist(input: unknown) {
  await requireAdmin()
  const data = playlistDataSchema.parse(input)
  await db
    .insert(playlistSingleton)
    .values({
      id: "playlist",
      data,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: playlistSingleton.id,
      set: { data, updatedAt: new Date() },
    })
  revalidateTag("playlist")
  revalidatePath("/playlist")
  revalidatePath("/")
  revalidatePath("/admin/playlist")
  return { ok: true as const }
}
