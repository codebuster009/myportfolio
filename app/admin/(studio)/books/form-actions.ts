"use server"

import { upsertBook } from "@/app/admin/_actions/books"

export async function addBookFormAction(formData: FormData) {
  const ratingRaw = formData.get("rating")
  const ratingNum =
    ratingRaw != null && String(ratingRaw).trim() !== "" ? Number(ratingRaw) : null
  const rating =
    ratingNum != null && !Number.isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5
      ? ratingNum
      : null

  await upsertBook({
    title: String(formData.get("title") ?? ""),
    author: String(formData.get("author") ?? ""),
    coverUrl: String(formData.get("coverUrl") ?? "") || null,
    take: String(formData.get("take") ?? "") || null,
    rating,
    current: formData.get("current") === "on",
  })
}
