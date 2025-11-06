"use client"

import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faReact,
  faJs,
  faHtml5,
  faCss3Alt,
  faNodeJs,
  faGitAlt,
  faDocker,
  faAws,
} from "@fortawesome/free-brands-svg-icons"
import { faServer, faDatabase, faMemory } from "@fortawesome/free-solid-svg-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"

const technologies = [
  { name: "React", icon: faReact, color: "text-blue-400" },
  { name: "JavaScript", icon: faJs, color: "text-yellow-400" },
  { name: "HTML5", icon: faHtml5, color: "text-orange-400" },
  { name: "CSS3", icon: faCss3Alt, color: "text-blue-500" },
  { name: "Node.js", icon: faNodeJs, color: "text-green-500" },
  { name: "Tailwind CSS", icon: faCss3Alt, color: "text-cyan-400" },
  { name: "Express", icon: faServer, color: "text-gray-400" },
  { name: "Git", icon: faGitAlt, color: "text-orange-500" },
  { name: "PostgreSQL", icon: faDatabase, color: "text-blue-600" },
  { name: "MongoDB", icon: faDatabase, color: "text-green-600" },
  { name: "Docker", icon: faDocker, color: "text-blue-500" },
  { name: "Redis", icon: faMemory, color: "text-red-500" },
  { name: "AWS", icon: faAws, color: "text-orange-500" },
]

export default function TechnologiesSection() {
  return (
    <section id="technologies" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Technologies
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Tools and technologies I work with
          </p>
        </motion.div>

        <TooltipProvider>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-full overflow-hidden">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className="w-full max-w-full"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -10, 10, -10, 0],
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="w-full h-full"
                    >
                      <Card className="glass-hover p-2 sm:p-3 md:p-4 lg:p-6 flex items-center justify-center cursor-pointer aspect-square w-full h-full max-w-full overflow-hidden">
                        <FontAwesomeIcon
                          icon={tech.icon}
                          className={`${tech.color} text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}
                        />
                      </Card>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tech.name}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  )
}


