"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/data"

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Professional Work + Personal
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            A collection of projects showcasing my skills and experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className="glass-hover h-full flex flex-col overflow-hidden">
                {/* Project Media */}
                <div className="relative aspect-video overflow-hidden">
                  {project.video ? (
                    <motion.video
                      src={project.video}
                      poster={`/images/${project.src}`}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredProject === project.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    <motion.div
                      animate={{
                        scale: hoveredProject === project.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={`/images/${project.src}`}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                  {project.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {project.description}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech.length - 4} more
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="gap-2 flex-col sm:flex-row">
                  <Button
                    asChild
                    variant="default"
                    className="flex-1 glass-hover w-full sm:w-auto"
                  >
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </Button>
                  {project.github && (
                    <Button
                      asChild
                      variant="outline"
                      className="glass-hover w-full sm:w-auto"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        Code
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


