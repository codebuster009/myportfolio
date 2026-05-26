"use server"

import { saveSetting } from "@/app/admin/_actions/settings"

export async function saveSiteSettingsAction(formData: FormData) {
  await saveSetting({
    key: "site",
    value: {
      title: String(formData.get("title") ?? "").trim() || "Portfolio",
      defaultOgImage: String(formData.get("defaultOgImage") ?? "").trim() || null,
      contactEmail: String(formData.get("contactEmail") ?? "").trim() || null,
      footerCopy: String(formData.get("footerCopy") ?? "").trim() || null,
    },
  })
}
