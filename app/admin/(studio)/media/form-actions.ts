"use server"

import { deleteMedia, uploadMediaFormData } from "@/app/admin/_actions/media"

export async function uploadMediaAction(formData: FormData) {
  await uploadMediaFormData(formData)
}

export async function deleteMediaAction(formData: FormData) {
  const id = String(formData.get("id") ?? "")
  if (!id) throw new Error("Missing media id")
  await deleteMedia(id)
}
