import { eq } from "drizzle-orm"
import { nowPage } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { saveNowFormAction } from "./form-actions"
import PageHeader from "@/components/admin/PageHeader"
import { AdminForm } from "@/components/admin/AdminForm"
import SubmitButton from "@/components/admin/SubmitButton"

export default async function AdminNowPage() {
  const [row] = await db.select().from(nowPage).where(eq(nowPage.id, "now")).limit(1)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Now page"
        description="Teaser for the home strip and full markdown / MDX body for the /now page."
      />

      <AdminForm action={saveNowFormAction} successMessage="Now page saved">
        <div className="space-y-4 max-w-3xl">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Teaser (home strip)</span>
            <input
              name="teaser"
              defaultValue={row?.teaser ?? ""}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Body (markdown / MDX)</span>
            <textarea
              name="bodyMd"
              rows={18}
              defaultValue={row?.bodyMd ?? ""}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm font-mono leading-relaxed min-h-[280px]"
            />
          </label>
          <SubmitButton className="w-fit">Save</SubmitButton>
        </div>
      </AdminForm>
    </div>
  )
}
