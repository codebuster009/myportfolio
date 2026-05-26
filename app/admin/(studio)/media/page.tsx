import { desc } from "drizzle-orm"
import { media as mediaTable } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { deleteMediaAction, uploadMediaAction } from "./form-actions"
import PageHeader from "@/components/admin/PageHeader"
import { AdminForm } from "@/components/admin/AdminForm"
import SubmitButton from "@/components/admin/SubmitButton"

export default async function AdminMediaPage() {
  const rows = await db.select().from(mediaTable).orderBy(desc(mediaTable.createdAt)).limit(200)

  return (
    <div className="space-y-10">
      <PageHeader
        title="Media"
        description="Upload images to Supabase Storage. Delete only works when no post references the URL."
      />

      <section className="rounded-2xl border border-border bg-card/60 p-5 md:p-8 shadow-sm space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">Upload</h2>
        <p className="text-xs text-muted-foreground">
          Requires <code className="text-foreground">SUPABASE_URL</code> and{" "}
          <code className="text-foreground">SUPABASE_SERVICE_ROLE_KEY</code>, plus a public{" "}
          <code className="text-foreground">media</code> bucket.
        </p>
        <AdminForm action={uploadMediaAction} successMessage="Upload complete">
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
            <input
              name="file"
              type="file"
              className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground"
              required
            />
            <SubmitButton className="w-full sm:w-auto">Upload</SubmitButton>
          </div>
        </AdminForm>
      </section>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((m) => (
          <li
            key={m.id}
            className="rounded-2xl border border-border bg-card/50 overflow-hidden shadow-sm flex flex-col"
          >
            <div className="aspect-video bg-muted/50 flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.alt ?? ""} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-3 text-xs space-y-2 flex-1 flex flex-col">
              <p className="font-mono text-[10px] text-muted-foreground break-all">{m.url}</p>
              <div className="flex gap-2 mt-auto flex-wrap">
                <a
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary text-xs font-medium hover:underline"
                >
                  Open
                </a>
                <AdminForm action={deleteMediaAction} successMessage="Deleted">
                  <input type="hidden" name="id" value={m.id} />
                  <SubmitButton variant="destructive" className="!py-1.5 !px-3 text-xs">
                    Delete if unused
                  </SubmitButton>
                </AdminForm>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
