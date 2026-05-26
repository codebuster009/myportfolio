"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faSearch, 
  faDraftingCompass, 
  faCode, 
  faBug, 
  faRocket,
  faTools
} from "@fortawesome/free-solid-svg-icons"

export default function WorkflowSection() {
  const phases = [
    {
      icon: faSearch,
      title: "Discovery",
      duration: "1 Week",
      description: "Understand goals, define scope, gather requirements",
      color: "from-primary to-primary/60"
    },
    {
      icon: faDraftingCompass,
      title: "Design & Planning",
      duration: "1–2 Weeks",
      description: "Wireframing, UI/UX design, system architecture",
      color: "from-secondary to-secondary/60"
    },
    {
      icon: faCode,
      title: "Development",
      duration: "4–8 Weeks",
      description: "Iterative build process with weekly demos",
      color: "from-accent to-accent/60"
    },
    {
      icon: faBug,
      title: "Testing",
      duration: "1–2 Weeks",
      description: "Functionality, performance, SEO, and security checks",
      color: "from-primary to-secondary"
    },
    {
      icon: faRocket,
      title: "Deployment",
      duration: "1 Week",
      description: "Final launch, documentation, training (if needed)",
      color: "from-secondary to-accent"
    },
    {
      icon: faTools,
      title: "Ongoing Support",
      duration: "Optional",
      description: "Maintenance packages for updates and new features",
      color: "from-accent to-primary"
    }
  ]

  return (
    <section
      id="how-i-work"
      className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
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
            How I work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-foreground/80 text-base sm:text-lg max-w-2xl mx-auto px-4"
          >
            A structured approach to delivering your project on time and within scope
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-indigo-600 -translate-x-1/2" />

          {/* Phases */}
          <div className="space-y-6 md:space-y-8 lg:space-y-12">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`relative flex flex-col lg:flex-row items-center gap-4 md:gap-6 lg:gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-indigo-600 border-4 border-background shadow-glass-hover z-10" />

                {/* Content Card */}
                <div className={`flex-1 w-full ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"}`}>
                  <Card className="glass-hover">
                    <CardContent className="p-4 sm:p-5 md:p-6">
                      <div className="flex items-start gap-3 md:gap-4">
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          className="flex-shrink-0"
                        >
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-glass-hover`}>
                            <FontAwesomeIcon
                              icon={phase.icon}
                              className="text-white text-lg sm:text-xl"
                            />
                          </div>
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground/90">
                              {phase.title}
                            </h3>
                            <Badge variant="secondary" className="w-fit sm:ml-2">
                              {phase.duration}
                            </Badge>
                          </div>
                          <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                            {phase.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Flexible Approach Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card className="glass border-2 border-secondary/20">
            <CardContent className="p-6 md:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gradient">
                Flexible Development Approach
              </h3>
              <p className="text-foreground/80 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto px-4">
                Each project is customized based on your requirements, whether you need a basic static site or a full-stack platform with complex features. If you already have assets (like UI designs or backend APIs), I adapt the process accordingly.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

