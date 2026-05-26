"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import MarkdownProse from "@/components/blog/MarkdownProse"
import { publishPost, savePostDraft } from "@/app/admin/_actions/posts"
import { uploadMediaFormData } from "@/app/admin/_actions/media"
import type { posts } from "@/drizzle/schema"
import { toast } from "sonner"
import { broadcastCmsRefresh } from "@/components/admin/RevalidateBroadcaster"

type CategoryOption = { slug: string; title: string }

type Props = {
  initial: typeof posts.$inferSelect | null
  categories: CategoryOption[]
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export default function PostEditor({ initial, categories }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [id, setId] = useState<string | undefined>(initial?.id)
  const [title, setTitle] = useState(initial?.title ?? "")
  const [slug, setSlug] = useState(initial?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(!!initial)
  const [categorySlug, setCategorySlug] = useState(initial?.categorySlug ?? categories[0]?.slug ?? "")
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "")
  const [coverUrl, setCoverUrl] = useState(initial?.coverUrl ?? "")
  const [bodyMd, setBodyMd] = useState(initial?.bodyMd ?? "")
  const [tagsStr, setTagsStr] = useState((initial?.tags ?? []).join(", "))
  const [updatedAt, setUpdatedAt] = useState(initial?.updatedAt?.toISOString() ?? "")
  const [preview, setPreview] = useState<MDXRemoteSerializeResult | null>(null)
  const [previewTab, setPreviewTab] = useState<"edit" | "split" | "preview">("split")
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const bodyRef = useRef<HTMLTextAreaElement | null>(null)

  const insertIntoBody = useCallback((snippet: string) => {
    const el = bodyRef.current
    setBodyMd((prev) => {
      if (!el) return `${prev}${snippet}`
      const start = el.selectionStart
      const end = el.selectionEnd
      const before = prev.slice(0, start)
      const after = prev.slice(end)
      const next = before + snippet + after
      requestAnimationFrame(() => {
        try {
          const pos = start + snippet.length
          el.focus()
          el.setSelectionRange(pos, pos)
        } catch {
          /* ignore */
        }
      })
      return next
    })
  }, [])

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith("image/"))
      for (const file of list) {
        const fd = new FormData()
        fd.append("file", file)
        try {
          const { url } = await uploadMediaFormData(fd)
          insertIntoBody(`\n![${file.name.replace(/[[\]]/g, "")}](${url})\n`)
          toast.success("Image inserted")
          broadcastCmsRefresh()
        } catch (e) {
          toast.error(e instanceof Error ? e.message : "Upload failed")
        }
      }
    },
    [insertIntoBody]
  )

  useEffect(() => {
    const t = setTimeout(() => {
      void fetch("/api/admin/mdx-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: bodyMd }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => setPreview(j))
        .catch(() => setPreview(null))
    }, 450)
    return () => clearTimeout(t)
  }, [bodyMd])

  useEffect(() => {
    if (slugTouched) return
    const s = slugify(title)
    if (s) setSlug(s)
  }, [title, slugTouched])

  const tags = useMemo(
    () =>
      tagsStr
        .split(/[,]+/)
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsStr]
  )

  const doSave = useCallback(
    async (silent: boolean) => {
      const payload = {
        id,
        title,
        slug,
        categorySlug,
        excerpt: excerpt || null,
        coverUrl: coverUrl || null,
        bodyMd,
        tags,
        clientUpdatedAt: updatedAt || undefined,
      }
      try {
        const res = await savePostDraft(payload)
        if (!res?.ok) {
          if (res?.error === "conflict") toast.error("Someone saved a newer version. Reload the page.")
          else if (!silent) toast.error("Save failed — try again")
          return
        }
        if (res.updatedAt) setUpdatedAt(res.updatedAt)
        if (res.id !== id) {
          setId(res.id)
          if (!initial?.id) router.replace(`/admin/posts/${res.id}`)
        }
        if (!silent) {
          toast.success("Saved")
          broadcastCmsRefresh()
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Save failed")
      }
    },
    [id, title, slug, categorySlug, excerpt, coverUrl, bodyMd, tags, updatedAt, router, initial?.id]
  )

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      if (!title.trim() || !slug.trim()) return
      void doSave(true)
    }, 1600)
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [title, slug, categorySlug, excerpt, coverUrl, bodyMd, tagsStr, doSave])

  async function onPublish() {
    startTransition(() => {
      void (async () => {
        try {
          const hadNoPostId = !id
          let postId = id
          let lastUpdated = updatedAt
          if (!postId) {
            const saved = await savePostDraft({
              title,
              slug,
              categorySlug,
              excerpt: excerpt || null,
              coverUrl: coverUrl || null,
              bodyMd,
              tags,
              clientUpdatedAt: lastUpdated || undefined,
            })
            if (!saved?.ok) {
              if (saved?.error === "conflict") toast.error("Conflict — reload")
              else toast.error("Could not save draft before publishing")
              return
            }
            postId = saved.id
            lastUpdated = saved.updatedAt
            setId(saved.id)
            setUpdatedAt(saved.updatedAt)
            // Defer router.replace until after publish — navigating now can abort the publish RPC and yield `undefined`.
          }
          const res = await publishPost({
            id: postId!,
            title,
            slug,
            categorySlug,
            excerpt: excerpt || null,
            coverUrl: coverUrl || null,
            bodyMd,
            tags,
            clientUpdatedAt: lastUpdated || undefined,
          })
          if (!res?.ok) {
            if (res?.error === "conflict") toast.error("Conflict — reload and try again")
            else toast.error("Publish failed — try again")
            return
          }
          toast.success("Published")
          broadcastCmsRefresh()
          router.refresh()
          if (hadNoPostId && postId) {
            router.replace(`/admin/posts/${postId}`)
          }
        } catch (e) {
          toast.error(e instanceof Error ? e.message : "Publish failed")
        }
      })()
    })
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <Link href="/admin/posts" className="text-xs font-mono text-muted-foreground hover:text-primary">
            ← Posts
          </Link>
          <h2 className="text-lg font-bold text-foreground mt-1 line-clamp-2">
            {initial?.title?.trim()
              ? initial.title
              : initial
                ? "Edit post"
                : "New post"}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              startTransition(() => {
                void doSave(false)
              })
            }
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
          >
            {pending ? (
              <span className="inline-block h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : null}
            Save now
          </button>
          <button
            type="button"
            onClick={() => void onPublish()}
            disabled={pending || !title.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-50"
          >
            {pending ? (
              <span className="inline-block h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : null}
            Publish
          </button>
          <a
            href={`/writing/${categorySlug}/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-primary/40 px-4 py-2 text-sm text-primary hover:bg-primary/10 inline-flex items-center"
          >
            View live
          </a>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-xs font-mono uppercase text-muted-foreground">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-mono uppercase text-muted-foreground">Slug</span>
          <input
            value={slug}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(e.target.value)
            }}
            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-mono uppercase text-muted-foreground">Category</span>
          <select
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-mono uppercase text-muted-foreground">Cover URL</span>
          <input
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="md:col-span-2 block space-y-1">
          <span className="text-xs font-mono uppercase text-muted-foreground">Excerpt</span>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm resize-none"
          />
        </label>
        <label className="md:col-span-2 block space-y-1">
          <span className="text-xs font-mono uppercase text-muted-foreground">Tags (comma-separated)</span>
          <input
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border pb-2 items-center justify-between">
        <div className="flex gap-2">
          {(["edit", "split", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setPreviewTab(t)}
              className={`text-xs font-mono uppercase px-3 py-1 rounded-lg ${
                previewTab === t ? "bg-primary/20 text-primary" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <label className="text-xs font-mono text-primary cursor-pointer hover:underline">
          + Image file
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files
              if (f?.length) void uploadFiles(f)
              e.target.value = ""
            }}
          />
        </label>
      </div>

      <div
        className={`grid gap-4 min-h-[420px] ${previewTab === "split" ? "lg:grid-cols-2" : ""} ${
          previewTab === "preview" ? "lg:grid-cols-1" : ""
        }`}
      >
        {(previewTab === "edit" || previewTab === "split") && (
          <textarea
            ref={bodyRef}
            value={bodyMd}
            onChange={(e) => setBodyMd(e.target.value)}
            onPaste={(e) => {
              const files = e.clipboardData?.files
              if (files && files.length > 0 && Array.from(files).some((f) => f.type.startsWith("image/"))) {
                e.preventDefault()
                void uploadFiles(files)
              }
            }}
            onDragOver={(e) => {
              if ([...e.dataTransfer.types].includes("Files")) e.preventDefault()
            }}
            onDrop={(e) => {
              if (e.dataTransfer.files?.length) {
                e.preventDefault()
                void uploadFiles(e.dataTransfer.files)
              }
            }}
            className="w-full min-h-[420px] rounded-2xl border border-border bg-background/80 p-4 font-mono text-sm leading-relaxed resize-y"
            spellCheck={false}
          />
        )}
        {(previewTab === "preview" || previewTab === "split") && (
          <div className="rounded-2xl border border-white/15 bg-background/30 p-4 overflow-auto max-h-[70vh]">
            {preview ? (
              <MarkdownProse>
                <MDXRemote {...preview} />
              </MarkdownProse>
            ) : (
              <p className="text-sm text-muted-foreground">Preview updates as you type…</p>
            )}
          </div>
        )}
      </div>

      <p className="text-[10px] font-mono text-foreground/40">
        Autosave ~1.6s after edits · Paste or drop images into the editor (Supabase required) · Status:{" "}
        {initial?.status ?? "new"}
      </p>
    </div>
  )
}
