import { eq } from "drizzle-orm"
import { playlistSingleton } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { savePlaylistFormAction } from "./form-actions"
import PageHeader from "@/components/admin/PageHeader"
import { AdminForm } from "@/components/admin/AdminForm"
import SubmitButton from "@/components/admin/SubmitButton"

const defaultDoc = `{
  "now": {
    "kind": "album",
    "title": "Example",
    "by": "Artist"
  },
  "albums": [],
  "films": [],
  "games": []
}`

export default async function AdminPlaylistPage() {
  const [row] = await db
    .select()
    .from(playlistSingleton)
    .where(eq(playlistSingleton.id, "playlist"))
    .limit(1)
  const json = row?.data ? JSON.stringify(row.data, null, 2) : defaultDoc

  return (
    <div className="space-y-8">
      <PageHeader
        title="Playlist"
        description="Edit JSON: now (album | film | game), plus albums, films, games arrays."
      />

      <AdminForm action={savePlaylistFormAction} successMessage="Playlist saved">
        <div className="space-y-4">
          <textarea
            name="json"
            rows={28}
            defaultValue={json}
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm font-mono leading-relaxed min-h-[320px]"
          />
          <SubmitButton className="w-fit">Save playlist</SubmitButton>
        </div>
      </AdminForm>
    </div>
  )
}
