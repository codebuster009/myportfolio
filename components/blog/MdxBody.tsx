import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import MarkdownProse from "@/components/blog/MarkdownProse"

export default async function MdxBody({ source }: { source: string }) {
  try {
    const { content } = await compileMDX({
      source,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeRaw],
        },
      },
    })

    return <MarkdownProse>{content}</MarkdownProse>
  } catch (e) {
    console.error("[MdxBody] compileMDX failed:", e)
    return (
      <MarkdownProse>
        <p className="text-foreground/90">
          This content could not be rendered. Check the file for invalid MDX or HTML. If you just edited it in the CMS,
          try simpler markdown first (headings, paragraphs, images).
        </p>
        {process.env.NODE_ENV === "development" ? (
          <pre className="mt-4 rounded-xl bg-muted/50 p-4 text-xs overflow-auto text-foreground/80">
            {e instanceof Error ? e.message : String(e)}
          </pre>
        ) : null}
      </MarkdownProse>
    )
  }
}
