"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faServer, faDatabase, faPalette, faRocket, faShieldAlt } from "@fortawesome/free-solid-svg-icons"
import PolaroidStrip from "@/components/PolaroidStrip"

export default function AboutSection() {
  const highlights = [
    {
      icon: faCode,
      title: "Frontend Expertise",
      description: "ReactJS, TypeScript, Redux, TailwindCSS, Bootstrap, Framer Motion",
    },
    {
      icon: faServer,
      title: "Backend Solutions",
      description: "Node.js, Express, REST APIs, WebSockets & Server-Sent Events",
    },
    {
      icon: faDatabase,
      title: "Data Management",
      description: "MongoDB, secure data handling, real-time updates",
    },
    {
      icon: faPalette,
      title: "UI/UX Design",
      description: "Intuitive, responsive interfaces designed for engagement",
    },
    {
      icon: faRocket,
      title: "Performance",
      description: "SEO optimization, lazy loading, code splitting",
    },
    {
      icon: faShieldAlt,
      title: "Security",
      description: "OAuth 2.0, secure APIs, role-based access control",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-64 h-64 bg-primary/25 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card className="glass-hover">
            <CardContent className="p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-8 md:mb-10"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gradient">About Me</h2>
                <p className="text-foreground/90 text-base sm:text-lg md:text-xl leading-relaxed mb-4 md:mb-6">
                  Whether it&apos;s crafting responsive UIs, working with backend APIs, or deploying scalable systems, I enjoy
                  working across the stack to bring ideas to life.
                </p>
                <p className="text-foreground/90 text-base sm:text-lg md:text-xl leading-relaxed">
                  I&apos;m always up for interesting work. If that sounds like you, say hi on{" "}
                  <a href="/services#say-hi" className="text-primary font-semibold underline-offset-4 hover:underline">
                    /services
                  </a>
                  . For a formal CV, here&apos;s my{" "}
                  <a
                    href="https://drive.google.com/file/d/1QsUpeGSkTSaXT_YDjI5mIL2oWKkqP17r/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold underline-offset-4 hover:underline"
                  >
                    resume
                  </a>
                  .
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="glass-hover h-full group">
                <CardContent className="p-6">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="mb-4 inline-block">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center shadow-glass-hover">
                      <FontAwesomeIcon icon={item.icon} className="text-white text-lg sm:text-xl" />
                    </div>
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground/90 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <PolaroidStrip />
      </div>
    </section>
  )
}
