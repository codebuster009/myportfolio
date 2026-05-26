import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Case Study: NextViralAI | Kartavaya Sharma",
  description:
    "How I built an AI marketing pipeline with streaming generation, multi-stage prompts, and brand-voice retention.",
}

export default function MarketingAICaseStudy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="container mx-auto max-w-3xl">
          <Link
            href="/services"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← back to services
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Case Study
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            NextViralAI: building an AI marketing pipeline that sounds like the brand
          </h1>
          <p className="text-lg text-foreground/80 mb-10">
            A streaming content-generation flow with multi-stage prompts, brand-voice retention,
            and the React Query data layer that ties it together.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 not-prose text-sm">
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Stack</p>
              <p className="font-medium">React, Node, OpenAI</p>
            </div>
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Role</p>
              <p className="font-medium">Frontend + AI lead</p>
            </div>
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Duration</p>
              <p className="font-medium">4 months</p>
            </div>
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Live at</p>
              <a
                href="https://www.nextviralai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                nextviralai.com
              </a>
            </div>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-li:leading-relaxed">
            <h2>The problem</h2>
            <p>
              Marketing teams at small and mid-size brands spend hours every week drafting ad copy,
              social posts, and content briefs. They know what works. They know the brand voice.
              The bottleneck is the writing itself. Existing AI tools either generated generic
              text, required complex prompt engineering, or never closed the feedback loop on what
              actually performed.
            </p>
            <p>
              NextViralAI&apos;s bet was simple: build a marketing AI that feels like a smart
              junior marketer who already knows the brand. Not a chatbot.
            </p>

            <h2>What I built</h2>

            <h3>1. The content-generation flow</h3>
            <p>
              The core UX: marketers fill in a short brief (audience, goal, brand voice). The
              system generates several variations of the requested content type. They can refine,
              regenerate slices, or approve.
            </p>
            <p>Three decisions that shaped the experience:</p>
            <ul>
              <li>
                <strong>Streaming output.</strong> Text appears word by word as the model
                generates it. Perceived wait time dropped by roughly 60% versus the original
                polling implementation.
              </li>
              <li>
                <strong>Inline regeneration.</strong> Marketers can highlight any phrase and ask
                for &quot;punchier&quot; or &quot;less buzzwordy&quot; without regenerating the
                whole piece.
              </li>
              <li>
                <strong>Side-by-side variation view.</strong> Three or four variations are
                rendered next to each other so the strongest version is immediately visible.
              </li>
            </ul>

            <h3>2. The prompt pipeline</h3>
            <p>
              The hard part was making the output sound like the brand, not like an LLM. The
              approach:
            </p>
            <ol>
              <li>
                <strong>Brand voice extraction.</strong> When a brand onboards, the system
                ingests top-performing existing content and extracts a voice profile (tone,
                vocabulary patterns, structure preferences) via an LLM call.
              </li>
              <li>
                <strong>Multi-stage prompting.</strong> Content generation is split into three
                LLM calls (brief, outline, final) with different system prompts. Cheaper than a
                single mega-prompt, easier to debug when output drifts.
              </li>
              <li>
                <strong>Guardrails.</strong> Banned-word lists, length checks, and a final
                brand-voice scoring call that flags low-confidence output for human review.
              </li>
            </ol>

            <h3>3. The dashboard</h3>
            <p>
              Performance metrics for every generated piece. React Query for data fetching with
              optimistic updates, Tailwind for layout, custom charts for the engagement metrics
              that close the feedback loop back into prompt tuning.
            </p>

            <h2>Three technical decisions worth flagging</h2>

            <h3>React Query, not Redux</h3>
            <p>
              The data flow was 80% server state (generated content, brand profiles, analytics)
              and 20% UI state. Redux would have been overkill. React Query handled caching,
              refetching, and optimistic updates without a separate state library. Reduced our
              state management code by roughly 40% versus the original Redux POC.
            </p>

            <h3>SSE streaming, not polling</h3>
            <p>
              The early prototype polled every two seconds for completed generations. UX felt
              sluggish. Switching to server-sent events meant the first token reached the user
              in about 1.5 seconds instead of eight. The architecture is straightforward but the
              UX win is enormous.
            </p>

            <h3>Three-stage prompts beat the single mega-prompt</h3>
            <p>
              The mega-prompt approach was producing 60 to 70% acceptable output. Splitting into
              three stages (brief, outline, final) pushed acceptance to around 85% with the same
              model. Per-generation cost went up by roughly 30%, but regeneration rate dropped
              enough that we netted out cheaper.
            </p>

            <h2>What I would do differently</h2>
            <ol>
              <li>
                <strong>Build evals from day one.</strong> I assembled a hand-graded eval set six
                weeks in, after we started catching weird regressions. Should have started with
                it. Would have saved a month.
              </li>
              <li>
                <strong>Cache aggressively.</strong> Brand voice profiles change slowly. A
                24-hour Redis cache would have cut LLM costs by around 15%.
              </li>
              <li>
                <strong>Get streaming right earlier.</strong> Two weeks lost to the polling
                architecture. The streaming pattern is well known now; should have started there.
              </li>
            </ol>

            <h2>Skills demonstrated</h2>
            <ul>
              <li>
                <strong>AI / LLM integration:</strong> OpenAI APIs, streaming, multi-stage
                prompting, evaluation pipelines
              </li>
              <li>
                <strong>React architecture:</strong> React Query, composition patterns, optimistic
                UX
              </li>
              <li>
                <strong>Backend orchestration:</strong> Node.js, SSE streaming, prompt pipeline
                design
              </li>
              <li>
                <strong>AI UX:</strong> streaming responses, inline regeneration, variation
                comparison
              </li>
            </ul>

            <h2>Want to build something similar?</h2>
            <p>
              If you have a SaaS product and want to add AI content generation, intelligent
              assistants, or AI-driven dashboards, this is the exact kind of work I do.{" "}
              <Link href="/services#say-hi" className="text-primary underline hover:no-underline">
                Send a message
              </Link>{" "}
              or email{" "}
              <a
                href="mailto:kartavyasharmajs@gmail.com"
                className="text-primary underline hover:no-underline"
              >
                kartavyasharmajs@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground">
              ← back to services
            </Link>
            <Link
              href="/services#say-hi"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Hire me →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
