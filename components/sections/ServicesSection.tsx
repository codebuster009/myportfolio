"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faRobot,
  faMagnifyingGlass,
  faBolt,
  faChartLine,
  faLock,
  faLaptopCode,
  faChartSimple,
  faStethoscope,
  faRepeat,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons"

export default function ServicesSection() {
  const services = [
    {
      icon: faRobot,
      title: "AI Chatbot & Assistant Integration",
      description: "Streaming, tool-using AI assistants bolted onto your existing app.",
      features: [
        "Conversational UX with streaming responses",
        "Function-calling for real actions (not just chat)",
        "Memory and context handling across sessions",
        "OpenAI, Anthropic, or open-source models",
      ],
    },
    {
      icon: faMagnifyingGlass,
      title: "RAG Pipelines",
      description: "Search over your docs, contracts, support tickets, anything.",
      features: [
        "Hybrid retrieval (vector + keyword + rerank)",
        "Semantic chunking that respects your data structure",
        "Citation UI so users can verify answers",
        "Evals built in from day one",
      ],
    },
    {
      icon: faBolt,
      title: "AI Feature Retrofits",
      description: "Adding AI to an existing React or Node app without breaking what works.",
      features: [
        "Smart autocomplete and inline suggestions",
        "Document Q&A modules",
        "AI-powered onboarding flows",
        "Pay-per-use cost gating for paid tiers",
      ],
    },
    {
      icon: faChartLine,
      title: "AI Dashboards & Analytics",
      description: "Internal tools where LLMs do the boring summarization for your team.",
      features: [
        "Natural-language data queries",
        "Auto-generated weekly summaries",
        "Anomaly detection with plain-English explanations",
        "Role-based access for sensitive data",
      ],
    },
    {
      icon: faLock,
      title: "Auth, Permissions & Secure APIs",
      description: "When you need real enterprise plumbing under the AI features.",
      features: [
        "OAuth 2.0 and SSO integration",
        "Role-based access control",
        "Audit logging for AI actions",
        "API key management and rate limiting",
      ],
    },
    {
      icon: faLaptopCode,
      title: "Full-Stack React + Node Work",
      description: "Not every project needs AI. I still build regular SaaS too.",
      features: [
        "Next.js / React / TypeScript frontends",
        "Node.js, Express, REST and GraphQL APIs",
        "Real-time features via WebSockets and SSE",
        "Postgres, MongoDB, Redis as the data layer",
      ],
    },
    {
      icon: faStethoscope,
      title: "Website Audits",
      description: "A 1-week deep-dive that tells you what's actually slowing you down.",
      features: [
        "Performance audit (Lighthouse, real-user metrics)",
        "SEO audit with prioritized fix list",
        "Security and accessibility review",
        "Codebase health check, one written report",
      ],
    },
    {
      icon: faChartSimple,
      title: "SEO Audit + Technical SEO",
      description: "I look at your site, find what's tanking it, and either fix it or hand you a prioritized list.",
      features: [
        "Full audit: Core Web Vitals, indexing, schema, content gaps",
        "Written report with fixes ranked by impact and effort",
        "Implementation if you want me to ship the fixes too",
        "Monthly retainer option for ongoing SEO + content work",
      ],
    },
    {
      icon: faFileLines,
      title: "Portfolio + Resume Builds",
      description: "For job-seekers, freshers, and career-switchers who want something that doesn't look like a template.",
      features: [
        "Custom-coded portfolio site (not Wix, not a template)",
        "ATS-friendly resume rewrite with AI-assisted tuning",
        "LinkedIn headline and About rewrite",
        "Combo packages at student-friendly rates",
      ],
    },
    {
      icon: faRepeat,
      title: "Monthly Retainers",
      description: "Ongoing engineering and AI work, predictable cost, no scope ping-pong.",
      features: [
        "Set monthly hours, rolling 30-day commit",
        "Async-first via Slack and Linear",
        "Weekly Friday demo of what shipped",
        "Pause or cancel any month, no penalty",
      ],
    },
  ]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gradient"
          >
            What I help SaaS teams ship
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-foreground/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4"
          >
            I add AI features to React and Node apps that already work. Chatbots, RAG, smart search, intelligent dashboards. The kind of thing on your roadmap labelled &quot;Q3 AI exploration&quot; that nobody on the team has actually shipped before.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="glass-hover h-full group">
                <CardHeader>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="mb-4 inline-block"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-indigo-600 flex items-center justify-center shadow-glass-hover">
                      <FontAwesomeIcon
                        icon={service.icon}
                        className="text-white text-lg sm:text-xl md:text-2xl"
                      />
                    </div>
                  </motion.div>
                  <CardTitle className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                        className="flex items-start gap-2 text-xs sm:text-sm text-foreground/80"
                      >
                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                        <span className="break-words">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Static Website Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Card className="glass border-2 border-primary/20">
            <CardContent className="p-6 md:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient">
                How I usually work
              </h3>
              <p className="text-foreground/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Free 30-minute discovery call. Scoped proposal after, with a fixed price or hourly cap. No hidden time, no scope ping-pong.
                You see a working demo every Friday. Slack and Loom by default, calls only when they earn their keep.
                If you want a full breakdown of a recent project, read the <a href="/case-studies/marketing-ai" className="text-primary underline hover:no-underline">Marketing AI case study</a>.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

