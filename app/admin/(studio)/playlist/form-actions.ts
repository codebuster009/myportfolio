"use server"

import { savePlaylist } from "@/app/admin/_actions/playlist"

export async function savePlaylistFormAction(formData: FormData) {
  const raw = String(formData.get("json") ?? "")
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error("Invalid JSON — check commas and quotes")
  }
  await savePlaylist(parsed)
}
