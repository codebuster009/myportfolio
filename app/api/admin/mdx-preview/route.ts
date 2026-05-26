import { NextResponse } from "next/server"
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { auth } from "@/auth"
import { isAllowlistedGitHubLogin } from "@/lib/auth-helpers"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.login || !isAllowlistedGitHubLogin(session.user.login)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  let body: { source?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
  const source = typeof body.source === "string" ? body.source : ""
  try {
    const serialized = await serialize(source, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeRaw],
      },
    })
    return NextResponse.json(serialized)
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Serialize failed" },
      { status: 422 }
    )
  }
}
