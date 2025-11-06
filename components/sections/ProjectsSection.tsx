"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/data"
import ProjectGalleryModal from "@/components/ProjectGalleryModal"

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewProject = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <>
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
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              A curated collection of my best work, showcasing innovative solutions and creative excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {projects.map((project, index) => {
              const isFirstCard = index === 0
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={isFirstCard ? "relative overflow-visible" : ""}
                >
                  <Card className="glass-hover h-full flex flex-col overflow-hidden border-white/30 shadow-glass">
                    {/* Project Media */}
                    <div className="relative aspect-video overflow-hidden">
                      <motion.div
                        animate={{
                          scale: hoveredProject === project.id ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={`/${project.src}`}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={index < 3}
                          loading={index < 3 ? "eager" : "lazy"}
                        />
                      </motion.div>
                      {/* Softer overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 dark:from-background/80 via-transparent to-transparent" />
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-bold text-foreground/90">{project.title}</CardTitle>
                      {project.description && (
                        <p className="text-sm text-foreground/60 mt-2 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className="flex-1 pb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            className="text-xs bg-accent/40 text-foreground/70 border-accent/30 hover:bg-accent/50 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 4 && (
                          <Badge className="text-xs bg-muted/50 text-foreground/60 border-muted/30">
                            +{project.tech.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-0">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        animate={{
                          scale: [1, 1.03, 1],
                          boxShadow: [
                            "0 4px 20px rgba(126, 116, 241, 0.2)",
                            "0 6px 25px rgba(126, 116, 241, 0.35)",
                            "0 4px 20px rgba(126, 116, 241, 0.2)"
                          ]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-full"
                      >
                        <Button
                          onClick={() => handleViewProject(project)}
                          className={`
                            w-full glass-hover relative
                            bg-gradient-to-r from-primary/80 via-primary/70 to-secondary/80
                            hover:from-primary hover:via-primary/90 hover:to-secondary
                            text-white border-0
                            shadow-lg shadow-primary/20
                            hover:shadow-xl hover:shadow-primary/30
                            transition-all duration-300
                          `}
                        >
                          View Project
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Project Gallery Modal */}
      {selectedProject && (
        <ProjectGalleryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={{
            title: selectedProject.title,
            tech: selectedProject.tech,
            folderName: selectedProject.folderName,
          }}
        />
      )}
    </>
  )
}
