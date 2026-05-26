import { asc } from "drizzle-orm"
import { categories } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { addCategoryFormAction } from "./form-actions"
import PageHeader from "@/components/admin/PageHeader"
import { AdminForm } from "@/components/admin/AdminForm"
import SubmitButton from "@/components/admin/SubmitButton"

export default async function AdminCategoriesPage() {
  const rows = await db.select().from(categories).orderBy(asc(categories.sortIndex), asc(categories.slug))

  return (
    <div className="space-y-10">
      <PageHeader
        title="Categories"
        description="Create or update writing categories. Slug must be lowercase letters, numbers, and hyphens."
      />

      <ul className="space-y-3">
        {rows.map((r) => (
          <li
            key={r.slug}
            className="rounded-2xl border border-border bg-card/50 px-4 py-3 shadow-sm"
          >
            <p className="font-medium text-foreground">
              {r.title}{" "}
              <span className="text-muted-foreground font-mono text-xs">({r.slug})</span>
            </p>
          </li>
        ))}
      </ul>

      <section className="rounded-2xl border border-border bg-card/60 p-5 md:p-8 shadow-sm space-y-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">Add or update</h2>
        <AdminForm action={addCategoryFormAction} successMessage="Category saved">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              name="slug"
              placeholder="slug"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
              required
            />
            <input
              name="title"
              placeholder="title"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
              required
            />
            <input
              name="tagline"
              placeholder="tagline"
              className="md:col-span-2 rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
            <input
              name="accentHex"
              placeholder="#hex"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
            <input
              name="letter"
              placeholder="letter"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
            <input
              name="gradient"
              placeholder="Tailwind gradient classes"
              className="md:col-span-2 rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
            <select
              name="cardAspect"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            >
              <option value="landscape">landscape</option>
              <option value="portrait">portrait</option>
            </select>
            <SubmitButton className="w-full md:w-auto">Save category</SubmitButton>
          </div>
        </AdminForm>
      </section>
    </div>
  )
}
