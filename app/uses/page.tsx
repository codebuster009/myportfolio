import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import MdxBody from "@/components/blog/MdxBody"
import { getUsesPage } from "@/lib/content"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Uses | Kartavaya Sharma",
  description: "Tools, gear, and setup.",
}

export default async function UsesPage() {
  const uses = await getUsesPage()
  if (!uses) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Uses</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-10">What I use</h1>
          <MdxBody source={uses.content} />
        </div>
      </main>
      <Footer />
    </>
  )
}
