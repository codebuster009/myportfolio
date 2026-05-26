/**
 * Delete posts in DB that no longer have a corresponding file in /content/blog.
 * Run: npm run --silent migrate:content && node --env-file=.env.local ./node_modules/tsx/dist/cli.mjs scripts/cleanup-stale-posts.ts
 */
import fs from "fs"
import path from "path"
import { and, eq } from "drizzle-orm"
import { posts } from "../drizzle/schema"
import { db, pool } from "../lib/db"

const root = path.join(__dirname, "..")
const blogRoot = path.join(root, "content", "blog")

async function main() {
  console.log("[cleanup] scanning for stale posts...")

  const fileSet = new Set<string>()
  for (const dirName of fs.readdirSync(blogRoot)) {
    const dir = path.join(blogRoot, dirName)
    if (!fs.statSync(dir).isDirectory()) continue
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue
      const slug = file.replace(/\.mdx?$/, "")
      fileSet.add(`${dirName}/${slug}`)
    }
  }

  const allPosts = await db.select({ category: posts.categorySlug, slug: posts.slug }).from(posts)
  let deleted = 0
  for (const p of allPosts) {
    const key = `${p.category}/${p.slug}`
    if (!fileSet.has(key)) {
      console.log(`[cleanup] deleting stale: ${key}`)
      await db.delete(posts).where(and(eq(posts.categorySlug, p.category), eq(posts.slug, p.slug)))
      deleted++
    }
  }
  console.log(`[cleanup] done. removed ${deleted} stale posts.`)
  await pool.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
