import { eq } from "drizzle-orm"
import { settings as settingsTable } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { saveSiteSettingsAction } from "./form-actions"
import PageHeader from "@/components/admin/PageHeader"
import { AdminForm } from "@/components/admin/AdminForm"
import SubmitButton from "@/components/admin/SubmitButton"

type SiteShape = {
  title?: string
  defaultOgImage?: string | null
  contactEmail?: string | null
  footerCopy?: string | null
}

export default async function AdminSettingsPage() {
  const [row] = await db.select().from(settingsTable).where(eq(settingsTable.key, "site")).limit(1)
  const site = (row?.value ?? {}) as SiteShape

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Site metadata stored as a single “site” settings row." />

      <AdminForm action={saveSiteSettingsAction} successMessage="Settings saved">
        <div className="space-y-4 max-w-xl">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Site title</span>
            <input
              name="title"
              defaultValue={site.title ?? ""}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Default OG image URL</span>
            <input
              name="defaultOgImage"
              defaultValue={site.defaultOgImage ?? ""}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Contact email</span>
            <input
              name="contactEmail"
              type="email"
              defaultValue={site.contactEmail ?? ""}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Footer copy</span>
            <textarea
              name="footerCopy"
              rows={4}
              defaultValue={site.footerCopy ?? ""}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
          </label>
          <SubmitButton className="w-fit">Save settings</SubmitButton>
        </div>
      </AdminForm>
    </div>
  )
}
