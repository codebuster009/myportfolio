"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { socialLinks } from "@/lib/data"

export default function SocialTile() {
  const items = [
    { href: socialLinks.github, icon: faGithub, label: "GitHub", wiggle: [0, -7, 6, -5, 4, 0] },
    { href: socialLinks.linkedin, icon: faLinkedin, label: "LinkedIn", wiggle: [0, 8, -6, 4, -3, 0] },
    { href: `mailto:${socialLinks.email}`, icon: faEnvelope, label: "Email", wiggle: [0, -5, 5, -4, 0] },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.16 }}
      whileHover={{ y: -4 }}
      className="glass glass-hover rounded-[1.75rem] p-5 h-full border border-white/15 dark:border-white/10 tile-grain relative overflow-hidden"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Elsewhere</p>
      <p className="text-[11px] text-foreground/55 mb-3 leading-snug">
        Low-key networking: I respond to email, ignore spam, and pretend DMs aren&apos;t a trap.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <motion.div
            key={item.label}
            whileHover={{
              scale: 1.06,
              rotate: item.label === "LinkedIn" ? -5 : item.label === "GitHub" ? 4 : 0,
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href={item.href}
              target={item.label === "Email" ? undefined : "_blank"}
              rel={item.label === "Email" ? undefined : "noopener noreferrer"}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/15 bg-background/40 py-4 text-foreground/75 hover:text-primary transition-colors"
              aria-label={item.label}
            >
              <motion.span whileHover={{ rotate: item.wiggle }} transition={{ duration: 0.45 }}>
                <FontAwesomeIcon icon={item.icon} className="text-2xl" />
              </motion.span>
              <span className="text-[10px] font-mono uppercase tracking-wider">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
