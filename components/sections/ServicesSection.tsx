"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faLaptopCode, 
  faMobileAlt, 
  faShoppingCart, 
  faChartLine,
  faUsers,
  faLock,
  faBolt,
  faGlobe
} from "@fortawesome/free-solid-svg-icons"

export default function ServicesSection() {
  const services = [
    {
      icon: faLaptopCode,
      title: "Custom Website Development",
      description: "Scalable, modern websites tailored to your business goals",
      features: [
        "Frontend: ReactJS, TypeScript, Redux, TailwindCSS, Bootstrap, Framer Motion",
        "Backend: Node.js, Express, REST APIs",
        "Real-time updates via WebSockets & Server-Sent Events",
        "Full-Stack Integration"
      ]
    },
    {
      icon: faBolt,
      title: "Real-Time Interactions",
      description: "Live features that keep users engaged",
      features: [
        "Live chat systems",
        "Real-time notifications",
        "Instant updates",
        "WebSockets, SSE, and Redis caching"
      ]
    },
    {
      icon: faShoppingCart,
      title: "E-Commerce Ready",
      description: "Complete online store solutions",
      features: [
        "Product listings & management",
        "Dynamic shopping carts",
        "Secure payment integrations",
        "Conversion-optimized user flows"
      ]
    },
    {
      icon: faChartLine,
      title: "Admin & User Dashboards",
      description: "Powerful data management interfaces",
      features: [
        "User-friendly dashboards",
        "Data management tools",
        "Analytics & reporting",
        "Role-based access"
      ]
    },
    {
      icon: faGlobe,
      title: "Performance Optimization",
      description: "Fast, accessible, and SEO-friendly",
      features: [
        "SEO best practices",
        "Accessibility compliance",
        "Lazy loading & code splitting",
        "Performance monitoring"
      ]
    },
    {
      icon: faLock,
      title: "Security & Authentication",
      description: "Enterprise-grade security",
      features: [
        "OAuth 2.0 integration",
        "Secure API endpoints",
        "Role-based access control",
        "Data encryption"
      ]
    }
  ]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
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
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
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
            Custom Website Development Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-foreground/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4"
          >
            Scalable, Modern & Results-Driven. Whether it's a simple static site or a full-scale custom web application, I create seamless, user-friendly digital experiences designed to drive engagement, performance, and long-term growth.
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
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-glass-hover">
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
                Need Just a Static Website?
              </h3>
              <p className="text-foreground/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                If you're looking for a simple, content-driven website (e.g., landing pages, portfolios, marketing pages), I offer lighter packages at lower rates — no backend or dynamic functionality required.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

