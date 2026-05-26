import { unstable_cache } from "next/cache"
import { and, asc, desc, eq } from "drizzle-orm"
import {
  books as booksTable,
  categories as categoriesTable,
  nowPage,
  playlistSingleton,
  posts,
  usesPage,
} from "@/drizzle/schema"
import { db } from "@/lib/db"
import type { PlaylistData } from "@/lib/playlist-types"

/** Blog category slug, e.g. `travel`. */
export type BlogCategory = string

export interface PostFrontmatter {
  title: string
  date?: string
  excerpt?: string
  cover?: string
  tags?: string[]
  slug?: string
  teaser?: string
  category?: string
}

export interface Post {
  category: BlogCategory
  slug: string
  frontmatter: PostFrontmatter
  content: string
}

export interface BookEntry {
  title: string
  author: string
  cover?: string
  rating?: number
  take?: string
  current?: boolean
}

export interface NowPageData {
  frontmatter: { updated?: string; teaser?: string }
  content: string
}

function rowToPost(row: typeof posts.$inferSelect): Post {
  return {
    category: row.categorySlug,
    slug: row.slug,
    frontmatter: {
      title: row.title,
      date: row.publishedAt ? row.publishedAt.toISOString() : undefined,
      excerpt: row.excerpt ?? undefined,
      cover: row.coverUrl ?? undefined,
      tags: row.tags ?? undefined,
      category: row.categorySlug,
      slug: row.slug,
    },
    content: row.bodyMd,
  }
}

const loadPublishedPosts = unstable_cache(
  async () => {
    const rows = await db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt))
    return rows.map(rowToPost)
  },
  ["cms-posts-published"],
  { tags: ["posts"] }
)

export async function getAllPosts(): Promise<Post[]> {
  return loadPublishedPosts()
}

export async function getPostsByCategory(category: BlogCategory): Promise<Post[]> {
  const loader = unstable_cache(
    async () => {
      const rows = await db
        .select()
        .from(posts)
        .where(and(eq(posts.status, "published"), eq(posts.categorySlug, category)))
        .orderBy(desc(posts.publishedAt))
      return rows.map(rowToPost)
    },
    ["cms-posts-by-category", category],
    { tags: ["posts", `posts:${category}`] }
  )
  return loader()
}

export async function getPost(category: BlogCategory, slug: string): Promise<Post | null> {
  const loader = unstable_cache(
    async () => {
      const [row] = await db
        .select()
        .from(posts)
        .where(
          and(eq(posts.categorySlug, category), eq(posts.slug, slug), eq(posts.status, "published"))
        )
        .limit(1)
      return row ? rowToPost(row) : null
    },
    ["cms-post-one", category, slug],
    { tags: ["posts", `posts:${category}`, `post:${category}:${slug}`] }
  )
  return loader()
}

const loadCategorySlugs = unstable_cache(
  async () => {
    const rows = await db
      .select({ slug: categoriesTable.slug })
      .from(categoriesTable)
      .orderBy(asc(categoriesTable.sortIndex), asc(categoriesTable.slug))
    return rows.map((r) => r.slug)
  },
  ["cms-category-slugs"],
  { tags: ["categories"] }
)

export async function getAllCategories(): Promise<BlogCategory[]> {
  return loadCategorySlugs()
}

export async function parseCategory(param: string): Promise<BlogCategory | null> {
  const normalized = param.toLowerCase()
  const cats = await getAllCategories()
  return cats.includes(normalized) ? normalized : null
}

const loadNow = unstable_cache(
  async () => {
    const [row] = await db.select().from(nowPage).where(eq(nowPage.id, "now")).limit(1)
    if (!row) return null
    return {
      frontmatter: {
        updated: row.updatedAt.toISOString(),
        teaser: row.teaser ?? undefined,
      },
      content: row.bodyMd,
    } satisfies NowPageData
  },
  ["cms-now"],
  { tags: ["now"] }
)

export async function getNowPage(): Promise<NowPageData | null> {
  return loadNow()
}

const loadUses = unstable_cache(
  async () => {
    const [row] = await db.select().from(usesPage).where(eq(usesPage.id, "uses")).limit(1)
    if (!row) return null
    return {
      frontmatter: {
        updated: row.updatedAt.toISOString(),
      },
      content: row.bodyMd,
    } satisfies NowPageData
  },
  ["cms-uses"],
  { tags: ["uses"] }
)

export async function getUsesPage(): Promise<NowPageData | null> {
  return loadUses()
}

const loadBookshelf = unstable_cache(
  async () => {
    const rows = await db.select().from(booksTable).orderBy(asc(booksTable.sortIndex), asc(booksTable.title))
    const mapped: BookEntry[] = rows.map((r) => ({
      title: r.title,
      author: r.author,
      cover: r.coverUrl ?? undefined,
      rating: r.rating ?? undefined,
      take: r.take ?? undefined,
      current: r.current,
    }))
    return { books: mapped }
  },
  ["cms-bookshelf"],
  { tags: ["books"] }
)

export async function getBookshelf(): Promise<{ books: BookEntry[] }> {
  return loadBookshelf()
}

export async function getCurrentReading(): Promise<BookEntry | null> {
  const { books } = await getBookshelf()
  return books.find((b) => b.current) ?? null
}

const loadPlaylist = unstable_cache(
  async (): Promise<PlaylistData> => {
    const [row] = await db.select().from(playlistSingleton).where(eq(playlistSingleton.id, "playlist")).limit(1)
    if (!row) return { albums: [], films: [], games: [] }
    const raw = (row?.data ?? {}) as Partial<PlaylistData>
    return {
      now: raw.now,
      albums: raw.albums ?? [],
      films: raw.films ?? [],
      games: raw.games ?? [],
    }
  },
  ["cms-playlist"],
  { tags: ["playlist"] }
)

export async function getPlaylist(): Promise<PlaylistData> {
  return loadPlaylist()
}
