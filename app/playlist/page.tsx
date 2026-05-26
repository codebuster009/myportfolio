import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { getPlaylist } from "@/lib/playlist"
import PlaylistMediaCard from "@/components/playlist/PlaylistMediaCard"
import NowPlayingPulse from "@/components/playlist/NowPlayingPulse"

export const metadata: Metadata = {
  title: "Playlist | Kartavaya Sharma",
  description: "Albums, films, and games in rotation.",
}

export default async function PlaylistPage() {
  const { now, albums, films, games } = await getPlaylist()

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <header className="mb-12 md:mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Playlist</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">What I&apos;m into right now</h1>
            <p className="text-lg text-foreground/80 max-w-2xl leading-relaxed">
              Albums, films, games. No desk setup humblebrag, just the stuff that&apos;s sticking.
            </p>
          </header>

          {now?.title ? (
            <section className="mb-16 md:mb-20">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Now</p>
              <div className="glass glass-hover rounded-[1.75rem] p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center tile-grain border border-white/15 dark:border-white/10">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-glass">
                  {now.cover ? (
                    <Image src={now.cover} alt="" fill className="object-cover" sizes="192px" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/30 to-indigo-500/20 text-4xl font-bold text-primary/40">
                      {now.title.charAt(0)}
                    </div>
                  )}
                  <NowPlayingPulse />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <p className="text-xs font-mono uppercase tracking-wider text-primary/90 mb-2">{now.kind}</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{now.title}</h2>
                  {now.by ? <p className="text-foreground/70">{now.by}</p> : null}
                  {now.link ? (
                    <Link href={now.link} className="inline-block mt-4 text-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                      Open link →
                    </Link>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}

          <section className="mb-14">
            <h2 className="text-xl font-bold text-foreground mb-6">Albums</h2>
            {albums.length === 0 ? (
              <p className="text-foreground/60 text-sm">Nothing listed yet. Add rows from /admin → Playlist.</p>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {albums.map((item, i) => (
                  <li key={`${item.title}-${i}`} className="h-full">
                    <PlaylistMediaCard {...item} delay={i * 0.05} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mb-14">
            <h2 className="text-xl font-bold text-foreground mb-6">Films</h2>
            {films.length === 0 ? (
              <p className="text-foreground/60 text-sm">Empty for now. Perfect excuse to rewatch something good.</p>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {films.map((item, i) => (
                  <li key={`${item.title}-${i}`} className="h-full">
                    <PlaylistMediaCard {...item} delay={i * 0.05} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-6">Games</h2>
            {games.length === 0 ? (
              <p className="text-foreground/60 text-sm">Add a few from the CMS when you&apos;re ready.</p>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {games.map((item, i) => (
                  <li key={`${item.title}-${i}`} className="h-full">
                    <PlaylistMediaCard {...item} delay={i * 0.05} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
