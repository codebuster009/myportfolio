"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { socialLinks } from "@/lib/data"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SayHiDialog({ open, onOpenChange }: Props) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleMailto = () => {
    const subject = encodeURIComponent(`Contact from ${formData.name || "Portfolio"}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:${socialLinks.email}?subject=${subject}&body=${body}`
    onOpenChange(false)
  }

  const filled = Boolean(formData.name && formData.email && formData.message)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-primary/20 sm:max-w-md rounded-[1.5rem]">
        <DialogHeader>
          <DialogTitle className="text-gradient text-xl">Say hi</DialogTitle>
          <DialogDescription>Drop a note. Opens your mail app when you send.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="glass border-white/25 bg-background/60"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="glass border-white/25 bg-background/60"
          />
          <Textarea
            name="message"
            placeholder="What&apos;s on your mind?"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="glass border-white/25 bg-background/60 resize-none"
          />
          <Button
            type="button"
            disabled={!filled}
            onClick={handleMailto}
            className="w-full rounded-[2rem] bg-gradient-to-r from-primary/90 to-indigo-500/90 text-primary-foreground glass-hover"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Send via email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
