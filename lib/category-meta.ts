import fs from "fs"
import path from "path"
import { unstable_cache } from "next/cache"
import { asc } from "drizzle-orm"
import { categories as categoriesTable } from "@/drizzle/schema"
import { db } from "@/lib/db"

export type CardAspect = "portrait" | "landscape"

export type CategoryMeta = {
  slug: string
  title: string
  tagline: string
  accentHex: string
  letter: string
  cardAspect: CardAspect
  /** Tailwind gradient classes for placeholders + covers (no `bg-gradient-to-br` prefix). */
  gradient: string
}

const DEFAULT_GRADIENT =
  "from-slate-200/70 via-zinc-100/50 to-neutral-200/55 dark:from-slate-800/50 dark:via-zinc-900/40 dark:to-neutral-900/45"

function titleCaseSlug(slug: string): string {
  return slug
    .split(/[-_/]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
}

function fallbackMeta(slug: string): CategoryMeta {
  const title = titleCaseSlug(slug) || slug
  return {
    slug,
    title,
    tagline: "",
    accentHex: "#6b7280",
    letter: slug.charAt(0).toUpperCase() || "?",
    cardAspect: "landscape",
    gradient: DEFAULT_GRADIENT,
  }
}

const loadAllCategories = unstable_cache(
  async () => {
    return db.select().from(categoriesTable).orderBy(asc(categoriesTable.sortIndex), asc(categoriesTable.slug))
  },
  ["cms-categories-all"],
  { tags: ["categories"] }
)

export async function getCategoryMeta(slug: string): Promise<CategoryMeta> {
  const rows = await loadAllCategories()
  const row = rows.find((r) => r.slug === slug)
  if (!row) return fallbackMeta(slug)
  return {
    slug: row.slug,
    title: row.title,
    tagline: row.tagline ?? "",
    accentHex: row.accentHex?.trim() ? row.accentHex.trim() : "#6b7280",
    letter:
      row.letter?.trim() ? row.letter.trim().charAt(0).toUpperCase() : slug.charAt(0).toUpperCase() || "?",
    cardAspect: row.cardAspect === "portrait" ? "portrait" : "landscape",
    gradient: row.gradient?.trim() ? row.gradient.trim() : DEFAULT_GRADIENT,
  }
}

/** @deprecated Use getCategoryMeta (async). Sync helper for scripts / migration only. */
export function getCategoryMetaFromFile(slug: string): CategoryMeta {
  const filePath = path.join(process.cwd(), "content", "categories.json")
  if (!fs.existsSync(filePath)) return fallbackMeta(slug)
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
      categories?: Array<Partial<CategoryMeta> & { slug?: string; title?: string }>
    }
    const row = data.categories?.find((c) => c.slug === slug)
    if (row && typeof row.title === "string" && row.title.trim()) {
      return {
        slug,
        title: row.title.trim(),
        tagline: typeof row.tagline === "string" ? row.tagline : "",
        accentHex: typeof row.accentHex === "string" && row.accentHex.trim() ? row.accentHex.trim() : "#6b7280",
        letter:
          typeof row.letter === "string" && row.letter.trim()
            ? row.letter.trim().charAt(0).toUpperCase()
            : slug.charAt(0).toUpperCase() || "?",
        cardAspect: row.cardAspect === "portrait" || row.cardAspect === "landscape" ? row.cardAspect : "landscape",
        gradient: typeof row.gradient === "string" && row.gradient.trim() ? row.gradient.trim() : DEFAULT_GRADIENT,
      }
    }
  } catch {
    /* ignore */
  }
  return fallbackMeta(slug)
}
