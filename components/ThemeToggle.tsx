"use client"

import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
import { useTheme } from "./ThemeProvider"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        onClick={toggleTheme}
        variant="ghost"
        size="icon"
        className="glass-hover w-10 h-10 rounded-full"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "light" ? (
              <FontAwesomeIcon icon={faMoon} className="text-lg" />
            ) : (
              <FontAwesomeIcon icon={faSun} className="text-lg text-yellow-400" />
            )}
          </motion.div>
        </AnimatePresence>
      </Button>
    </motion.div>
  )
}

