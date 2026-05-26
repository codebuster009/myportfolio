"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { socialLinks } from "@/lib/data"

const FOOTER_FORTUNES = [
  "Thanks for stopping by.",
  "May your deploys be green and your bugs shallow.",
  "Go drink water. Seriously.",
  "If you read this far, you owe yourself a walk.",
  "Tabs or spaces? Yes.",
  "Ship small, sleep okay.",
  "Your curiosity is showing, looks good on you.",
  "The footer said hi. The footer is shy.",
  "One more page refresh for good luck?",
]

export default function FooterClient({ currentReadingTitle }: { currentReadingTitle?: string | null }) {
  const [fortune, setFortune] = useState(FOOTER_FORTUNES[0])

  useEffect(() => {
    setFortune(FOOTER_FORTUNES[Math.floor(Math.random() * FOOTER_FORTUNES.length)] ?? FOOTER_FORTUNES[0])
  }, [])

  return (
    <footer className="relative py-16 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background/50 dark:to-background/70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-[1.75rem] p-8 md:p-12 text-center"
        >
          {currentReadingTitle ? (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground/75 text-base mb-6 font-medium"
            >
              Currently reading: <span className="text-foreground italic">&ldquo;{currentReadingTitle}&rdquo;</span>
            </motion.p>
          ) : null}

          <motion.p
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-signature text-4xl md:text-5xl text-foreground mb-3 leading-tight"
          >
            {fortune}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-signature text-3xl md:text-4xl text-primary mb-8"
          >
            K.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-foreground/75 mb-6 text-base sm:text-lg max-w-xl mx-auto"
          >
            Say hi if something here clicked. I&apos;m always happy to trade notes.
          </motion.p>

          <motion.a
            href={`mailto:${socialLinks.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 text-base sm:text-lg text-foreground/80 hover:text-primary transition-colors mb-6 md:mb-8 break-all sm:break-normal"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>{socialLinks.email}</span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex justify-center items-center gap-4 md:gap-6"
          >
            <motion.a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="text-xl sm:text-2xl" />
            </motion.a>
            <motion.a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-xl sm:text-2xl" />
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="text-foreground/55 mt-8 text-xs"
          >
            © {new Date().getFullYear()} Kartavaya Sharma
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
