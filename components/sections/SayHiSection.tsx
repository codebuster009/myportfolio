"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import MagneticButton from "@/components/MagneticButton"
import SayHiDialog from "@/components/SayHiDialog"

export default function SayHiSection() {
  const [open, setOpen] = useState(false)

  return (
    <section id="say-hi" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Contact</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Got something to build, or just want to chat?</h2>
          <p className="text-foreground/75 mb-8 leading-relaxed">
            One button, one form. No walls of copy.
          </p>
          <MagneticButton strength={0.35}>
            <Button
              type="button"
              size="lg"
              className="rounded-[2rem] px-10 glass-hover bg-gradient-to-r from-primary/85 via-primary/75 to-indigo-500/85 text-primary-foreground shadow-lg shadow-primary/20"
              onClick={() => setOpen(true)}
            >
              Say hi
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
      <SayHiDialog open={open} onOpenChange={setOpen} />
    </section>
  )
}
