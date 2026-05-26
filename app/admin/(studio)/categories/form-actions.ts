"use server"

import { upsertCategory } from "@/app/admin/_actions/categories"

export async function addCategoryFormAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim()
  const title = String(formData.get("title") ?? "").trim()
  if (!slug || !title) throw new Error("Slug and title are required")
  await upsertCategory({
    slug,
    title,
    tagline: String(formData.get("tagline") ?? "").trim() || null,
    accentHex: String(formData.get("accentHex") ?? "").trim() || "#6b7280",
    gradient: String(formData.get("gradient") ?? "").trim() || null,
    letter: String(formData.get("letter") ?? "").trim() || null,
    cardAspect: formData.get("cardAspect") === "portrait" ? "portrait" : "landscape",
  })
}
