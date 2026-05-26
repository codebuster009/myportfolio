"use server"

import { saveUsesPage } from "@/app/admin/_actions/uses"

export async function saveUsesFormAction(formData: FormData) {
  await saveUsesPage({
    bodyMd: String(formData.get("bodyMd") ?? ""),
  })
}
