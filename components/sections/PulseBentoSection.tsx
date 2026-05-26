import { getAllCategories, getAllPosts, getBookshelf, getNowPage } from "@/lib/content"
import { getCategoryMeta } from "@/lib/category-meta"
import { getPlaylist } from "@/lib/playlist"
import NowTile from "@/components/bento/NowTile"
import LatestPostTile from "@/components/bento/LatestPostTile"
import CurrentBookTile from "@/components/bento/CurrentBookTile"
import VibeTile from "@/components/bento/VibeTile"
import SocialTile from "@/components/bento/SocialTile"
import WritingTile from "@/components/bento/WritingTile"
import MarqueeTile from "@/components/bento/MarqueeTile"

export default async function PulseBentoSection() {
  const now = await getNowPage()
  const allPosts = await getAllPosts()
  const latest = allPosts[0] ?? null
  const { books } = await getBookshelf()
  const currentBook = books.find((b) => b.current) ?? books[0] ?? null
  const playlist = await getPlaylist()
  const categories = await getAllCategories()
  const writingNav = await Promise.all(
    categories.map(async (slug) => ({
      slug,
      title: (await getCategoryMeta(slug)).title,
    }))
  )
  let latestPresentation = null as { title: string; gradient: string; letter: string } | null
  if (latest) {
    const m = await getCategoryMeta(latest.category)
    latestPresentation = { title: m.title, gradient: m.gradient, letter: m.letter }
  }

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="pulse-heading">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <p
            id="pulse-heading"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-2"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" aria-hidden />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
            </span>
            Pulse · live-ish
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-gradient">What I&apos;m up to</h2>
          <p className="text-foreground/75 mt-2 max-w-2xl">
            Now, latest note, shelf, and links out. Honest, mildly chaotic, updated when I remember.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 md:auto-rows-[minmax(150px,auto)]">
          <div className="md:col-span-7 md:row-span-2 min-h-[220px]">
            <NowTile teaser={now?.frontmatter.teaser} />
          </div>
          <div className="md:col-span-5 md:row-span-2 min-h-[280px]">
            <LatestPostTile post={latest} categoryPresentation={latestPresentation} />
          </div>
          <div className="md:col-span-4 min-h-[140px]">
            <CurrentBookTile book={currentBook} />
          </div>
          <div className="md:col-span-4 min-h-[140px]">
            <VibeTile now={playlist.now} />
          </div>
          <div className="md:col-span-4 min-h-[140px]">
            <SocialTile />
          </div>
          <div className="md:col-span-6 min-h-[120px]">
            <WritingTile items={writingNav} />
          </div>
          <div className="md:col-span-6 min-h-[120px]">
            <MarqueeTile />
          </div>
        </div>
      </div>
    </section>
  )
}
