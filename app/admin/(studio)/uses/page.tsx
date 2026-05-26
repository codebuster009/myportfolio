import { eq } from "drizzle-orm"
import { usesPage } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { saveUsesFormAction } from "./form-actions"
import PageHeader from "@/components/admin/PageHeader"
import { AdminForm } from "@/components/admin/AdminForm"
import SubmitButton from "@/components/admin/SubmitButton"

export default async function AdminUsesPage() {
  const [row] = await db.select().from(usesPage).where(eq(usesPage.id, "uses")).limit(1)

  return (
    <div className="space-y-8">
      <PageHeader title="Uses page" description="Gear and tools — markdown / MDX for /uses." />

      <AdminForm action={saveUsesFormAction} successMessage="Uses page saved">
        <div className="space-y-4 max-w-3xl">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Body</span>
            <textarea
              name="bodyMd"
              rows={20}
              defaultValue={row?.bodyMd ?? ""}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm font-mono leading-relaxed min-h-[300px]"
            />
          </label>
          <SubmitButton className="w-fit">Save</SubmitButton>
        </div>
      </AdminForm>
    </div>
  )
}
