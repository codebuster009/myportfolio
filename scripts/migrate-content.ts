/**
 * One-time (or idempotent) migration from /content files into Postgres.
 * Run: DATABASE_URL=... npx tsx scripts/migrate-content.ts
 */
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { and, eq, sql } from "drizzle-orm"
import {
  books as booksTable,
  categories as categoriesTable,
  nowPage,
  playlistSingleton,
  posts,
  usesPage,
} from "../drizzle/schema"
import { db, pool } from "../lib/db"
import { readingMinutes } from "../lib/reading-time"
import type { PlaylistData } from "../lib/playlist-types"

const root = path.join(__dirname, "..")

/** Narrow no-break space (U+202F) breaks URLs in browsers; normalize to hyphen for filenames. */
function normalizeUploadPath(url: string): string {
  return url.replace(/\u202f/g, "-")
}

/** Copy Decap-era assets from content/blog/<cat>/public/uploads → public/uploads */
function mirrorBlogPublicUploads() {
  const blogRoot = path.join(root, "content", "blog")
  const destRoot = path.join(root, "public", "uploads")
  if (!fs.existsSync(blogRoot)) return
  if (!fs.existsSync(destRoot)) fs.mkdirSync(destRoot, { recursive: true })

  for (const dirName of fs.readdirSync(blogRoot)) {
    const dir = path.join(blogRoot, dirName)
    if (!fs.statSync(dir).isDirectory()) continue
    const srcUploads = path.join(dir, "public", "uploads")
    if (!fs.existsSync(srcUploads)) continue
    for (const file of fs.readdirSync(srcUploads)) {
      const from = path.join(srcUploads, file)
      if (!fs.statSync(from).isFile()) continue
      const cleanName = normalizeUploadPath(file)
      const to = path.join(destRoot, cleanName)
      fs.copyFileSync(from, to)
    }
  }
}

async function main() {
  console.log("[migrate] starting...")
  mirrorBlogPublicUploads()

  // --- categories.json ---
  const catPath = path.join(root, "content", "categories.json")
  if (fs.existsSync(catPath)) {
    const raw = JSON.parse(fs.readFileSync(catPath, "utf8")) as {
      categories?: Array<{
        slug?: string
        title?: string
        tagline?: string
        accentHex?: string
        gradient?: string
        letter?: string
        cardAspect?: string
      }>
    }
    let sort = 0
    for (const c of raw.categories ?? []) {
      if (!c.slug || !c.title) continue
      await db
        .insert(categoriesTable)
        .values({
          slug: c.slug,
          title: c.title,
          tagline: c.tagline ?? null,
          accentHex: c.accentHex ?? "#6b7280",
          gradient: c.gradient ?? null,
          letter: c.letter ?? null,
          cardAspect: c.cardAspect === "portrait" ? "portrait" : "landscape",
          sortIndex: sort++,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: categoriesTable.slug,
          set: {
            title: c.title,
            tagline: c.tagline ?? null,
            accentHex: c.accentHex ?? "#6b7280",
            gradient: c.gradient ?? null,
            letter: c.letter ?? null,
            cardAspect: c.cardAspect === "portrait" ? "portrait" : "landscape",
            sortIndex: sort - 1,
            updatedAt: new Date(),
          },
        })
    }
    console.log("[migrate] categories upserted")
  }

  // --- blog mdx ---
  const blogRoot = path.join(root, "content", "blog")
  if (fs.existsSync(blogRoot)) {
    for (const dirName of fs.readdirSync(blogRoot)) {
      const dir = path.join(blogRoot, dirName)
      if (!fs.statSync(dir).isDirectory()) continue
      const categorySlug = dirName
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue
        const slug = file.replace(/\.mdx?$/, "")
        const body = fs.readFileSync(path.join(dir, file), "utf8")
        const { data, content } = matter(body)
        const title = typeof data.title === "string" ? data.title : slug
        const excerpt = typeof data.excerpt === "string" ? data.excerpt : null
        let coverUrl =
          typeof data.cover === "string" && data.cover.trim()
            ? normalizeUploadPath(
                data.cover.trim().startsWith("/") ? data.cover.trim() : data.cover.trim()
              )
            : null
        const tags = Array.isArray(data.tags)
          ? data.tags.filter((t): t is string => typeof t === "string")
          : null
        let publishedAt = new Date()
        if (data.date instanceof Date) publishedAt = data.date
        else if (typeof data.date === "string") publishedAt = new Date(data.date)

        const minutes = readingMinutes(content)
        const bodyMd = normalizeUploadPath(content)

        await db
          .insert(posts)
          .values({
            categorySlug,
            slug,
            title,
            excerpt,
            coverUrl,
            bodyMd,
            status: "published",
            publishedAt,
            scheduledAt: null,
            tags: tags ?? null,
            readingMinutes: minutes,
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: [posts.categorySlug, posts.slug],
            set: {
              title,
              excerpt,
              coverUrl,
              bodyMd,
              status: "published",
              publishedAt,
              scheduledAt: null,
              tags: tags ?? null,
              readingMinutes: minutes,
              updatedAt: new Date(),
            },
          })
      }
    }
    console.log("[migrate] posts upserted")
  }

  // Fix URLs that still contain U+202F (e.g. copied from macOS filenames)
  await db.execute(sql`
    UPDATE posts
    SET
      body_md = REPLACE(body_md, CHR(8239), '-'),
      cover_url = REPLACE(cover_url, CHR(8239), '-')
    WHERE body_md LIKE '%' || CHR(8239) || '%'
       OR cover_url LIKE '%' || CHR(8239) || '%'
  `)
  console.log("[migrate] posts asset paths normalized (U+202F)")

  // --- now.md ---
  const nowPath = path.join(root, "content", "now.md")
  if (fs.existsSync(nowPath)) {
    const raw = fs.readFileSync(nowPath, "utf8")
    const { data, content } = matter(raw)
    const teaser = typeof data.teaser === "string" ? data.teaser : null
    await db
      .insert(nowPage)
      .values({
        id: "now",
        teaser,
        bodyMd: content,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: nowPage.id,
        set: { teaser, bodyMd: content, updatedAt: new Date() },
      })
    console.log("[migrate] now_page upserted")
  }

  // --- uses.md ---
  const usesPath = path.join(root, "content", "uses.md")
  if (fs.existsSync(usesPath)) {
    const raw = fs.readFileSync(usesPath, "utf8")
    const { content } = matter(raw)
    await db
      .insert(usesPage)
      .values({
        id: "uses",
        bodyMd: content,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: usesPage.id,
        set: { bodyMd: content, updatedAt: new Date() },
      })
    console.log("[migrate] uses_page upserted")
  }

  // --- bookshelf.json ---
  const shelfPath = path.join(root, "content", "bookshelf.json")
  if (fs.existsSync(shelfPath)) {
    const j = JSON.parse(fs.readFileSync(shelfPath, "utf8")) as {
      books?: Array<{
        title: string
        author: string
        cover?: string
        rating?: number
        take?: string
        current?: boolean
      }>
    }
    let idx = 0
    for (const b of j.books ?? []) {
      const [existing] = await db
        .select({ id: booksTable.id })
        .from(booksTable)
        .where(and(eq(booksTable.title, b.title), eq(booksTable.author, b.author)))
        .limit(1)

      if (existing) {
        await db
          .update(booksTable)
          .set({
            coverUrl: b.cover ?? null,
            rating: b.rating ?? null,
            take: b.take ?? null,
            current: !!b.current,
            sortIndex: idx++,
            updatedAt: new Date(),
          })
          .where(eq(booksTable.id, existing.id))
      } else {
        await db.insert(booksTable).values({
          title: b.title,
          author: b.author,
          coverUrl: b.cover ?? null,
          rating: b.rating ?? null,
          take: b.take ?? null,
          current: !!b.current,
          sortIndex: idx++,
          updatedAt: new Date(),
        })
      }
    }
    console.log("[migrate] books upserted")
  }

  // --- playlist.json ---
  const plPath = path.join(root, "content", "playlist.json")
  if (fs.existsSync(plPath)) {
    const data = JSON.parse(fs.readFileSync(plPath, "utf8")) as PlaylistData
    await db
      .insert(playlistSingleton)
      .values({
        id: "playlist",
        data: data as unknown as Record<string, unknown>,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: playlistSingleton.id,
        set: { data: data as unknown as Record<string, unknown>, updatedAt: new Date() },
      })
    console.log("[migrate] playlist_singleton upserted")
  }

  console.log("[migrate] done.")
  await pool.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
