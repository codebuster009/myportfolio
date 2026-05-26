import { getAllPosts } from "@/lib/content"

export const dynamic = "force-dynamic"

function escapeXml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const posts = await getAllPosts()
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "")

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Kartavaya Sharma | Writing</title>
<link>${siteUrl}</link>
<atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
<description>Travel, learning, books, habits, and system design notes.</description>
`

  for (const p of posts.slice(0, 80)) {
    const url = `${siteUrl}/writing/${p.category}/${p.slug}`
    const pub = p.frontmatter.date ? new Date(p.frontmatter.date).toUTCString() : new Date().toUTCString()
    const desc = escapeXml(p.frontmatter.excerpt || p.frontmatter.title || "")
    xml += `<item>
<title>${escapeXml(p.frontmatter.title || "Post")}</title>
<link>${url}</link>
<guid isPermaLink="true">${url}</guid>
<pubDate>${pub}</pubDate>
<description>${desc}</description>
</item>
`
  }

  xml += `</channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  })
}
