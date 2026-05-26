import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import MdxBody from "@/components/blog/MdxBody"
import { getNowPage } from "@/lib/content"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Now | Kartavaya Sharma",
  description: "What I'm focused on lately.",
}

export default async function NowPage() {
  const now = await getNowPage()
  if (!now) notFound()

  const updatedLine = now.frontmatter.updated
    ? new Date(now.frontmatter.updated).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Now</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">What I&apos;m up to</h1>
          {updatedLine ? (
            <p className="text-foreground/60 text-sm mb-12">Last updated {updatedLine}</p>
          ) : null}
          <MdxBody source={now.content} />
        </div>
      </main>
      <Footer />
    </>
  )
}
