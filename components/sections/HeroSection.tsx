"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MagneticButton from "@/components/MagneticButton"
import HandDrawnUnderline from "@/components/HandDrawnUnderline"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute top-20 right-10 w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-24 left-6 w-64 h-64 md:w-80 md:h-80 rounded-full bg-indigo-400/25 dark:bg-indigo-500/20 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 mb-5 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for AI integration work
              <span aria-hidden>→</span>
            </Link>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-5 leading-[1.08] tracking-tight">
              I ship{" "}
              <span className="relative inline-block">
                <span className="text-gradient">AI features</span>
                <HandDrawnUnderline />
              </span>{" "}
              for SaaS teams.
            </h1>

            <p className="text-base sm:text-lg text-foreground/85 leading-relaxed mb-3 max-w-xl mx-auto lg:mx-0">
              <span className="font-semibold text-foreground">3 years</span> building React + Node products. The last year was mostly{" "}
              <span className="text-foreground/95">chatbots, RAG, smart search, AI agents</span>. The kind of thing you
              bolt onto a real B2B app and pray will work in production. Past work in logistics, marketing, freight, enterprise auth.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
              Also on the side:{" "}
              <Link href="/services" className="text-foreground/90 underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                SEO audits & technical SEO
              </Link>{" "}
              for early-stage SaaS, and{" "}
              <Link href="/services" className="text-foreground/90 underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                portfolio + resume builds
              </Link>{" "}
              for job-seekers and freshers.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              This site also doubles as a diary. Books, travel scraps, half-baked essays. Scroll if you&apos;re curious.
              Hire if you&apos;ve got a roadmap that needs an extra pair of hands.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3">
              <MagneticButton strength={0.4}>
                <Button asChild size="lg" className="rounded-[2rem] px-8 shadow-lg shadow-primary/25">
                  <Link href="/services#say-hi">Hire me →</Link>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <Button asChild variant="outline" size="lg" className="rounded-[2rem] px-8 border-primary/30 glass-hover">
                  <Link href="#projects">See the work</Link>
                </Button>
              </MagneticButton>
              <Link
                href="/writing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline px-2"
              >
                or read the writing
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
              <motion.div
                className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-br from-primary via-purple-500 to-indigo-600 opacity-90"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute z-20 -top-4 -right-2 md:-top-6 md:-right-1 w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-indigo-500 shadow-[0_8px_30px_rgba(99,102,241,0.45)]"
                animate={{
                  x: [0, 18, -8, 22, 0],
                  y: [0, -22, 8, -14, 0],
                  scale: [1, 1.08, 0.96, 1.05, 1],
                }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-[6px] rounded-full overflow-hidden border-4 border-background shadow-2xl z-10">
                <Image src="/Kartavya.jpg" alt="Kartavaya Sharma" fill className="object-cover" priority sizes="320px" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
