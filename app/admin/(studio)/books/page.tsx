import { asc } from "drizzle-orm"
import { books as booksTable } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { addBookFormAction } from "./form-actions"
import PageHeader from "@/components/admin/PageHeader"
import { AdminForm } from "@/components/admin/AdminForm"
import SubmitButton from "@/components/admin/SubmitButton"

export default async function AdminBooksPage() {
  const rows = await db.select().from(booksTable).orderBy(asc(booksTable.sortIndex), asc(booksTable.title))

  return (
    <div className="space-y-10">
      <PageHeader
        title="Bookshelf"
        description="Track reads and the one “currently reading” flag (only one can be current at a time)."
      />

      <ul className="space-y-2 text-sm">
        {rows.map((r) => (
          <li
            key={r.id}
            className="rounded-xl border border-border bg-card/50 px-4 py-3 flex justify-between gap-2 shadow-sm"
          >
            <span className="text-foreground">
              {r.title} <span className="text-muted-foreground">— {r.author}</span>
              {r.current ? <span className="text-primary ml-2 font-medium">· current</span> : null}
            </span>
          </li>
        ))}
      </ul>

      <section className="rounded-2xl border border-border bg-card/60 p-5 md:p-8 shadow-sm space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">Add book</h2>
        <AdminForm action={addBookFormAction} successMessage="Book saved">
          <div className="grid gap-3 max-w-xl">
            <input
              name="title"
              placeholder="Title"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
              required
            />
            <input
              name="author"
              placeholder="Author"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
              required
            />
            <input
              name="coverUrl"
              placeholder="Cover URL"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
            <input
              name="take"
              placeholder="One-line take"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
            <input
              name="rating"
              type="number"
              min={1}
              max={5}
              placeholder="Rating 1–5"
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm w-full max-w-xs"
            />
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input name="current" type="checkbox" className="rounded border-input" />
              Currently reading
            </label>
            <SubmitButton className="w-fit">Add book</SubmitButton>
          </div>
        </AdminForm>
      </section>
    </div>
  )
}
