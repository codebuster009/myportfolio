"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { socialLinks } from "@/lib/data"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleMailtoClick = () => {
    const subject = encodeURIComponent(`Contact from ${formData.name || 'Portfolio Visitor'}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:${socialLinks.email}?subject=${subject}&body=${body}`
  }

  const isFormFilled = formData.name && formData.email && formData.message

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Card className="glass-hover">
            <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center text-gradient"
              >
                Let&apos;s Work Together
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-foreground/80 mb-4 sm:mb-6 md:mb-8 text-center text-sm sm:text-base md:text-lg leading-relaxed px-2"
              >
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </motion.p>

              <div className="mb-4 sm:mb-6">
                <Alert className="glass border-primary/30 bg-primary/5 p-3 sm:p-4">
                  <FontAwesomeIcon icon={faInfoCircle} className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 mt-0.5" />
                  <AlertDescription className="text-foreground/80 text-xs sm:text-sm leading-relaxed">
                    <span className="font-medium text-foreground/90 block mb-1">Email service coming soon!</span>
                    <span className="block">
                      For now, please directly reach out to{" "}
                      <a
                        href={`mailto:${socialLinks.email}`}
                        className="text-primary hover:text-primary/80 underline font-medium transition-colors break-all sm:break-normal"
                      >
                        {socialLinks.email}
                      </a>
                    </span>
                  </AlertDescription>
                </Alert>
              </div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                onSubmit={(e) => e.preventDefault()}
                className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 md:mb-8"
              >
                <div className="space-y-1.5 sm:space-y-2">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="glass border-white/20 bg-background/50 text-foreground placeholder:text-foreground/50 text-sm sm:text-base h-10 sm:h-11 px-3 sm:px-4"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="glass border-white/20 bg-background/50 text-foreground placeholder:text-foreground/50 text-sm sm:text-base h-10 sm:h-11 px-3 sm:px-4"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="glass border-white/20 bg-background/50 text-foreground placeholder:text-foreground/50 resize-none text-sm sm:text-base min-h-[100px] sm:min-h-[120px] p-3 sm:p-4"
                  />
                </div>

                <Button
                  type="button"
                  size="lg"
                  disabled={true}
                  className="w-full glass-hover bg-gradient-to-r from-primary/50 via-primary/40 to-indigo-500/50 hover:from-primary/50 hover:via-primary/40 hover:to-indigo-500/50 text-white cursor-not-allowed opacity-60 text-sm sm:text-base h-10 sm:h-11 md:h-12 px-4 sm:px-6"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-sm sm:text-base" />
                  <span className="whitespace-nowrap">Send Message (Coming Soon)</span>
                </Button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-3 sm:mt-4"
                >
                  <Button
                    type="button"
                    size="lg"
                    onClick={handleMailtoClick}
                    disabled={!isFormFilled}
                    className="w-full glass-hover bg-gradient-to-r from-primary/80 via-primary/70 to-indigo-500/80 hover:from-primary hover:via-primary/90 hover:to-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base h-10 sm:h-11 md:h-12 px-4 sm:px-6"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-sm sm:text-base" />
                    <span className="text-center">
                      {isFormFilled ? "Send Email Instead" : "Fill the form above to send email"}
                    </span>
                  </Button>
                </motion.div>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex justify-center items-center gap-4 sm:gap-5 md:gap-6 pt-3 sm:pt-4 border-t border-white/20"
              >
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  <FontAwesomeIcon icon={faGithub} className="text-lg sm:text-xl md:text-2xl" />
                </motion.a>
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="text-lg sm:text-xl md:text-2xl" />
                </motion.a>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
