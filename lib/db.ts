import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres"
import pg from "pg"
import * as schema from "@/drizzle/schema"

type Db = NodePgDatabase<typeof schema>

const globalForDb = globalThis as unknown as {
  __portfolioPool?: pg.Pool
  __portfolioDb?: Db
}

function getPool(): pg.Pool {
  if (!globalForDb.__portfolioPool) {
    const url = process.env.DATABASE_URL
    if (!url) {
      throw new Error("DATABASE_URL is not set")
    }
    globalForDb.__portfolioPool = new pg.Pool({ connectionString: url, max: 10 })
  }
  return globalForDb.__portfolioPool
}

function getDrizzle(): Db {
  if (!globalForDb.__portfolioDb) {
    globalForDb.__portfolioDb = drizzle(getPool(), { schema })
  }
  return globalForDb.__portfolioDb
}

/** Lazy Drizzle client — avoids requiring DATABASE_URL at module load (e.g. Next build metadata). */
export const db = new Proxy({} as Db, {
  get(_, prop) {
    const d = getDrizzle()
    const v = (d as unknown as Record<string, unknown>)[prop as string]
    return typeof v === "function" ? (v as (...a: unknown[]) => unknown).bind(d) : v
  },
})

export const pool = new Proxy({} as pg.Pool, {
  get(_, prop) {
    const p = getPool()
    const v = (p as unknown as Record<string, unknown>)[prop as string]
    return typeof v === "function" ? (v as (...a: unknown[]) => unknown).bind(p) : v
  },
})
