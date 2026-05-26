"use server"

import { saveNowPage } from "@/app/admin/_actions/now"

export async function saveNowFormAction(formData: FormData) {
  await saveNowPage({
    teaser: String(formData.get("teaser") ?? "") || null,
    bodyMd: String(formData.get("bodyMd") ?? ""),
  })
}
