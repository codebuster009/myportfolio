"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { socialLinks } from "@/lib/data"

export default function Footer() {
  return (
    <footer id="contact" className="relative py-16 overflow-hidden">
      {/* Wave Background */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background/50 dark:to-background/70" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-[1.75rem] p-8 md:p-12 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gradient"
          >
            Feel Free to Contact Me
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-foreground/80 mb-6 md:mb-8 text-base sm:text-lg"
          >
            Let&apos;s connect and build something amazing together!
          </motion.p>

          <motion.a
            href={`mailto:${socialLinks.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
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
            transition={{ delay: 0.5 }}
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
              whileHover={{ scale: 1.2, rotate: 5 }}
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
            transition={{ delay: 0.6 }}
            className="text-foreground/60 mt-8 text-sm"
          >
            © {new Date().getFullYear()} Kartavaya Sharma. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}


