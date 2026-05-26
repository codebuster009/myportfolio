"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { projects } from "@/lib/data"
import ProjectGalleryModal from "@/components/ProjectGalleryModal"
import HandDrawnUnderline from "@/components/HandDrawnUnderline"
import HeroProjectTile from "@/components/projects/HeroProjectTile"
import ProjectTile from "@/components/projects/ProjectTile"
import { cn } from "@/lib/utils"

function polaroidTiltForGridIndex(index: number): number {
  const order = [1, 2, 4, 5, 6, 7]
  const pos = order.indexOf(index)
  if (pos === -1) return 0
  return pos % 2 === 0 ? 1 : -1
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewProject = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <>
      <section id="projects" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="mb-12 md:mb-14 text-center md:text-left"
          >
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Selected work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Things I&apos;ve{" "}
              <span className="relative inline-block text-gradient">
                shipped
                <HandDrawnUnderline />
              </span>{" "}
              <span className="text-foreground/90">(and not deleted)</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed mx-auto md:mx-0">
              {projects.length} projects. Some elegant. Some sleep deprivation in HEX. Click any tile for the full gallery.
            </p>
          </motion.div>

          <div
            className={cn(
              "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 lg:grid-flow-dense",
              "auto-rows-auto"
            )}
          >
            {projects.map((project, index) => {
              const common = {
                project,
                catalogIndex: index,
                onOpen: handleViewProject,
                priority: index < 3,
              } as const

              if (index === 0) {
                return <HeroProjectTile key={project.id} {...common} />
              }

              if (index === 3) {
                return <ProjectTile key={project.id} variant="wide" polaroidTilt={0} {...common} />
              }

              return (
                <ProjectTile
                  key={project.id}
                  variant="normal"
                  polaroidTilt={polaroidTiltForGridIndex(index)}
                  {...common}
                />
              )
            })}
          </div>
        </div>
      </section>

      {selectedProject ? (
        <ProjectGalleryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={{
            title: selectedProject.title,
            tech: selectedProject.tech,
            folderName: selectedProject.folderName,
            live: selectedProject.live,
          }}
        />
      ) : null}
    </>
  )
}
