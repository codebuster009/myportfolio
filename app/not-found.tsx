import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const fragments = ["shimokitazawa", "idempotency", "two-minute", "fiction", "click"]

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-24 max-w-2xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50 mb-6">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-snug">
          This page wandered off, like a good evening walk with no map.
        </h1>
        <p className="text-foreground/70 mb-8 leading-relaxed">
          A found poem of things that do exist:{" "}
          <span className="italic text-foreground/90 font-medium">{fragments.join(" · ")}</span>
          …but not this URL.
        </p>
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.2em] text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
        >
          Home →
        </Link>
      </div>
      <Footer />
    </main>
  )
}
