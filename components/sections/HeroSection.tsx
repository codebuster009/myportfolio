"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/lib/data"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 md:space-y-6 text-center md:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-gradient">Hello, I'm Kartavaya Sharma,</span>
              <br />
              <span className="text-foreground">Frontend Fullstack Developer.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-foreground/85 leading-relaxed max-w-2xl mx-auto md:mx-0"
            >
              I'm a Frontend Developer with hands-on experience delivering fullstack solutions across diverse client projects. I bring strong development skills, a collaborative mindset, and a passion for building efficient, user-friendly applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex gap-3 md:gap-4 flex-wrap justify-center md:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="glass-hover w-full sm:w-auto"
              >
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                  My GitHub
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="glass-hover w-full sm:w-auto"
              >
                <a href="#projects">View Projects</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center items-center mt-8 md:mt-0"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px]">
              {/* Outer gradient circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1 blur-sm w-full h-full"
              />
              
              {/* Middle circle */}
              <div className="absolute inset-[10px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20" />

              {/* Profile image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-full overflow-hidden w-[calc(100%-70px)] h-[calc(100%-70px)] m-[35px]"
              >
                <Image
                  src="/Kartavya.jpg"
                  alt="Kartavaya Sharma"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 350px"
                />
              </motion.div>

              {/* Floating accent circle */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glass-hover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

