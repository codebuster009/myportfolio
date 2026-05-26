import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

export const postStatusEnum = pgEnum("post_status", ["draft", "published", "scheduled"])
export const mediaKindEnum = pgEnum("media_kind", ["image", "video", "audio"])
export const cardAspectEnum = pgEnum("card_aspect", ["portrait", "landscape"])

export const categories = pgTable("categories", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  tagline: text("tagline"),
  accentHex: text("accent_hex").notNull().default("#6b7280"),
  gradient: text("gradient"),
  letter: text("letter"),
  cardAspect: cardAspectEnum("card_aspect").notNull().default("landscape"),
  sortIndex: integer("sort_index").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categorySlug: text("category_slug")
      .notNull()
      .references(() => categories.slug, { onDelete: "restrict", onUpdate: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    coverUrl: text("cover_url"),
    bodyMd: text("body_md").notNull().default(""),
    status: postStatusEnum("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
    tags: text("tags").array(),
    readingMinutes: integer("reading_minutes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    uniqCategorySlug: uniqueIndex("posts_category_slug_unique").on(t.categorySlug, t.slug),
  })
)

export const books = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  coverUrl: text("cover_url"),
  rating: integer("rating"),
  take: text("take"),
  current: boolean("current").notNull().default(false),
  sortIndex: integer("sort_index").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const nowPage = pgTable("now_page", {
  id: text("id").primaryKey(),
  teaser: text("teaser"),
  bodyMd: text("body_md").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const usesPage = pgTable("uses_page", {
  id: text("id").primaryKey(),
  bodyMd: text("body_md").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const playlistSingleton = pgTable("playlist_singleton", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<Record<string, unknown>>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const media = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull(),
  alt: text("alt"),
  kind: mediaKindEnum("kind").notNull().default("image"),
  bytes: integer("bytes"),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const auditLog = pgTable("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorLogin: text("actor_login").notNull(),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id"),
  diff: jsonb("diff"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").$type<Record<string, unknown>>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})
