import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Case Study: Freighkit AI | Kartavaya Sharma",
  description:
    "Building an AI assistant for freight operators: streaming chat, tool-calling, multi-intent handling, and a UX that respects dispatchers' time.",
}

export default function FreighkitAICaseStudy() {
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
            Freighkit AI: a chatbot dispatchers actually want to use
          </h1>
          <p className="text-lg text-foreground/80 mb-10">
            How I shipped a streaming, tool-calling AI assistant for freight operators that handles
            messy real-world prompts and does not break the dispatch workflow.
          </p>

          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-foreground/10 mb-12">
            <Image
              src="/freighkit.ai-project/chatbot-integration.png"
              alt="Freighkit AI chatbot interface"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 not-prose text-sm">
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Stack</p>
              <p className="font-medium">React, TypeScript, LLM</p>
            </div>
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Role</p>
              <p className="font-medium">Frontend + AI engineer</p>
            </div>
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Duration</p>
              <p className="font-medium">3 months</p>
            </div>
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Domain</p>
              <p className="font-medium">Freight logistics</p>
            </div>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-li:leading-relaxed">
            <h2>The problem</h2>
            <p>
              Freight dispatchers spend most of their day clicking through six different tools to
              answer questions like &quot;is load 4421 still on schedule&quot;, &quot;what is the
              best rate to Hyderabad next Tuesday&quot;, and &quot;does this driver have hours
              available.&quot; Each of these answers exists in the system somewhere. Getting to it
              takes three to five clicks.
            </p>
            <p>
              The brief was simple. Build an AI assistant that lets dispatchers ask these questions
              in natural language. Get the answers back in seconds. Reduce the click count to
              roughly zero.
            </p>
            <p>The execution was less simple.</p>

            <h2>Why this is harder than it sounds</h2>
            <p>
              A normal chatbot project is: user types a question, model answers, done. Freight
              dispatchers don&apos;t type normal questions. They type things like:
            </p>
            <p>
              <em>
                &quot;find me a load near Mumbai for tomorrow, also what is my balance, oh and is
                Ali free Thursday&quot;
              </em>
            </p>
            <p>
              That is three different intents in one message. Each one queries a different
              backend. Each one has its own permission scope. And the user expects all three
              answered in one response, in the right order, without the assistant losing the
              thread on follow-ups.
            </p>
            <p>
              The interesting work was making the assistant handle that gracefully.
            </p>

            <h2>What I built</h2>

            <h3>1. Multi-intent classification, then tool calling</h3>
            <p>
              Every incoming message goes through a quick classifier that splits it into one or
              more intents. The classifier itself is a small LLM call with a strict JSON output
              schema. Each intent becomes a separate tool call to the relevant backend endpoint.
              Results come back in parallel. The final answer is composed from the tool outputs,
              not generated from scratch.
            </p>
            <p>
              This means the assistant can:
            </p>
            <ul>
              <li>Answer all three sub-questions in one response</li>
              <li>Not hallucinate (every fact comes from a tool, not the model&apos;s memory)</li>
              <li>Show its work via citation links back to the source record</li>
            </ul>

            <h3>2. Streaming UX with tool-call previews</h3>
            <p>
              The chat UI uses Server-Sent Events to stream three things in order: the
              classification (so the user sees what the assistant understood), the tool calls (so
              they see what data is being fetched), and the final natural-language answer.
            </p>
            <p>
              Showing the intermediate steps was the single biggest trust-building decision. When
              dispatchers can see &quot;searching loads near Mumbai for May 13&quot;, they
              implicitly trust the answer that follows. When the answer just appears, they
              second-guess it.
            </p>

            <h3>3. Conversation memory with a hard reset on context drift</h3>
            <p>
              Earlier prototypes maintained full conversation history forever. After 20 turns the
              context window was full of stale data and the model started referencing loads from
              an hour ago that were no longer relevant.
            </p>
            <p>
              The fix was a rolling window plus a soft &quot;forget&quot; signal. The assistant
              keeps the last six turns verbatim and a short LLM-generated summary of anything
              older. When the user starts a new topic (detected by the intent classifier), the
              summary is cleared. This kept responses focused without losing genuine continuity.
            </p>

            <h2>Three technical decisions worth flagging</h2>

            <h3>Classifier first, generation second</h3>
            <p>
              The classifier-then-tool-call architecture is the single most important pattern in
              this kind of system. It&apos;s cheaper (small LLM for routing, big LLM only when
              needed), more deterministic (you can unit-test classifiers in a way you cannot
              unit-test free generation), and easier to debug.
            </p>

            <h3>Strict JSON schemas for every model output</h3>
            <p>
              Every LLM call in the pipeline returns structured JSON, not free text. Function
              calling on OpenAI, tool use on Anthropic, schema-constrained decoding on
              open-source models. Free text is for the final user-facing response only. Inside
              the pipeline, every model output is a typed object you can parse and validate.
            </p>
            <p>
              This sounds boring. It&apos;s the reason the system actually works in production.
            </p>

            <h3>Optimistic UI for low-latency feel</h3>
            <p>
              The classifier returns in 200-400ms. Tool calls take 500ms-2s depending on the
              backend. We render the &quot;searching for...&quot; UI as soon as the classifier
              returns, before any tool call completes. Perceived latency for the user is roughly
              the classifier time, not the total pipeline time.
            </p>

            <h2>What I would do differently</h2>
            <ol>
              <li>
                <strong>Build the eval set on day one, with real dispatcher messages.</strong>{" "}
                We started with synthetic prompts and only switched to real data after week four.
                The real data had patterns the synthetic data missed entirely.
              </li>
              <li>
                <strong>Set up cost monitoring from the first deploy.</strong> The multi-intent
                pipeline does 2-4 LLM calls per user message. Costs scale fast. A simple per-user
                daily cap saved us several times.
              </li>
              <li>
                <strong>Add explicit &quot;I don&apos;t know&quot; paths earlier.</strong> The
                hardest UX decision was teaching the model to refuse rather than guess. Took us
                three iterations to get the threshold right.
              </li>
            </ol>

            <h2>Skills demonstrated</h2>
            <ul>
              <li>
                <strong>Multi-intent classification</strong> with small/large LLM routing
              </li>
              <li>
                <strong>Tool calling</strong> with strict JSON schemas
              </li>
              <li>
                <strong>Streaming chat UX</strong> with intermediate-step previews
              </li>
              <li>
                <strong>Conversation memory</strong> with rolling windows and summary collapsing
              </li>
              <li>
                <strong>React + TypeScript + shadcn/ui</strong> for the frontend
              </li>
              <li>
                <strong>Cost optimization</strong> for LLM-heavy pipelines
              </li>
            </ul>

            <h2>Want something similar for your product?</h2>
            <p>
              If you have a SaaS where users could be answering their own questions through chat
              instead of clicking through six tools, this is the exact pattern I ship.{" "}
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
