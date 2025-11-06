"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faChevronLeft, faChevronRight, faVideo, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

interface ProjectGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    tech: string[]
    folderName: string
  }
}

export default function ProjectGalleryModal({ isOpen, onClose, project }: ProjectGalleryModalProps) {
  const [media, setMedia] = useState<{ type: 'video' | 'image'; src: string; alt?: string; poster?: string }[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const x = useMotionValue(0)
  const spring = useSpring(x, { stiffness: 300, damping: 30 })
  const opacity = useTransform(spring, [-100, 0, 100], [0.5, 1, 0.5])

  // Preload media when modal opens
  useEffect(() => {
    if (!isOpen || !project.folderName) return

    const preloadMedia = (src: string, type: 'video' | 'image') => {
      if (type === 'video') {
        // Only preload metadata for videos (not the entire video)
        // This reduces initial load time
        const video = document.createElement('video')
        video.preload = 'metadata' // Changed from 'auto' to 'metadata' for faster initial load
        video.src = src
        video.load()
      } else {
        // Use window.Image to access native Image constructor, not Next.js Image component
        const img = new window.Image()
        img.src = src
      }
    }

    const loadMedia = async () => {
      const mediaFiles: { type: 'video' | 'image'; src: string; alt?: string }[] = []
      
      // Define media files based on folder name
      // Using optimized .mp4 files (compressed videos)
      const mediaMap: Record<string, { type: 'video' | 'image'; src: string; alt?: string; poster?: string }[]> = {
        'p2u-project-assets': [
          { type: 'video', src: '/p2u-project-assets/p2u-video.mp4', alt: 'P2U Video', poster: '/p2u-project-assets/login.png' },
          { type: 'image', src: '/p2u-project-assets/login.png', alt: 'P2U Login' },
          { type: 'image', src: '/p2u-project-assets/register.png', alt: 'P2U Register' },
        ],
        'MAI-project': [
          { type: 'video', src: '/MAI-project/mai-video.mp4', alt: 'MAI Video', poster: '/MAI-project/homepage.png' },
          { type: 'image', src: '/MAI-project/homepage.png', alt: 'MAI Homepage' },
          { type: 'image', src: '/MAI-project/login.png', alt: 'MAI Login' },
          { type: 'image', src: '/MAI-project/management-dashboard.png', alt: 'MAI Dashboard' },
          { type: 'image', src: '/MAI-project/pricing-page.png', alt: 'MAI Pricing' },
        ],
        'vantage-cargo-project': [
          { type: 'video', src: '/vantage-cargo-project/vantage-cargo.mp4', alt: 'Vantage Cargo Video', poster: '/vantage-cargo-project/home.png' },
          { type: 'image', src: '/vantage-cargo-project/home.png', alt: 'Vantage Home' },
          { type: 'image', src: '/vantage-cargo-project/package.png', alt: 'Vantage Package' },
          { type: 'image', src: '/vantage-cargo-project/portfolio.png', alt: 'Vantage Portfolio' },
          { type: 'image', src: '/vantage-cargo-project/contact-us.png', alt: 'Vantage Contact' },
        ],
        'Authnull-project': [
          { type: 'video', src: '/Authnull-project/authnull.mp4', alt: 'Authnull Video', poster: '/Authnull-project/authnull.png' },
          { type: 'image', src: '/Authnull-project/authnull.png', alt: 'Authnull Main' },
          { type: 'image', src: '/Authnull-project/blog-page.png', alt: 'Authnull Blog' },
        ],
        'Inlyne-project': [
          { type: 'video', src: '/Inlyne-project/Inlyne.mp4', alt: 'Inlyne Video', poster: '/Inlyne-project/home.png' },
          { type: 'image', src: '/Inlyne-project/home.png', alt: 'Inlyne Home' },
        ],
        'freighkit.ai-project': [
          { type: 'video', src: '/freighkit.ai-project/freighkit-ai.mp4', alt: 'Freighkit AI Video', poster: '/freighkit.ai-project/dashboard.png' },
          { type: 'image', src: '/freighkit.ai-project/dashboard.png', alt: 'Freighkit Dashboard' },
          { type: 'image', src: '/freighkit.ai-project/chatbot-integration.png', alt: 'Freighkit Chatbot' },
          { type: 'image', src: '/freighkit.ai-project/conversation.png', alt: 'Freighkit Conversation' },
        ],
        'custom-ai-service-project': [
          { type: 'video', src: '/custom-ai-service-project/custom-ai-service.mp4', alt: 'Custom AI Service Video', poster: '/custom-ai-service-project/services.png' },
          { type: 'image', src: '/custom-ai-service-project/services.png', alt: 'Custom AI Services' },
          { type: 'image', src: '/custom-ai-service-project/demo-integration.png', alt: 'Custom AI Demo' },
        ],
        'JAAFAR-car-project': [
          { type: 'video', src: '/JAAFAR-car-project/jaafar.mp4', alt: 'JAAFAR Car Video', poster: '/JAAFAR-car-project/jaafar-home.png' },
          { type: 'image', src: '/JAAFAR-car-project/jaafar-home.png', alt: 'JAAFAR Home' },
          { type: 'image', src: '/JAAFAR-car-project/blog-page.png', alt: 'JAAFAR Blog' },
          { type: 'image', src: '/JAAFAR-car-project/sidebar.png', alt: 'JAAFAR Sidebar' },
        ],
      }

      const projectMedia = mediaMap[project.folderName] || []
      setMedia(projectMedia)
      setCurrentIndex(0)
      setVideoLoading(true)
      
      // Preload images immediately, but only metadata for videos
      // This ensures images load fast while videos load progressively
      projectMedia.forEach((item) => {
        if (item.type === 'image') {
          preloadMedia(item.src, item.type)
        } else {
          // For videos, only preload metadata (duration, dimensions) not the full video
          preloadMedia(item.src, item.type)
        }
      })
    }

    loadMedia()
  }, [isOpen, project.folderName])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev < media.length - 1) {
        setVideoLoading(true) // Reset loading state when changing media
        return prev + 1
      }
      return prev
    })
  }, [media.length])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev > 0) {
        setVideoLoading(true) // Reset loading state when changing media
        return prev - 1
      }
      return prev
    })
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleNext, handlePrevious, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 2
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 2
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  if (!media.length) return null

  const currentMedia = media[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent 
            className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 gap-0 bg-transparent border-0 overflow-hidden rounded-none [&>button]:hidden"
            onInteractOutside={(e) => {
              e.preventDefault()
              onClose()
            }}
            onEscapeKeyDown={onClose}
          >
            {/* Frosted glass background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 backdrop-blur-md bg-background/60 dark:bg-background/80 z-40"
            />

            {/* Main modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-50 w-full h-full flex flex-col glass max-h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with title and tech tags */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="glass border-b border-white/20 p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient mb-2 break-words">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tech.slice(0, 5).map((tech, index) => (
                      <Badge
                        key={index}
                        className="text-[10px] sm:text-xs bg-accent/40 text-foreground/70 border-accent/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 5 && (
                      <Badge className="text-[10px] sm:text-xs bg-muted/50 text-foreground/60 border-muted/30">
                        +{project.tech.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 sm:ml-4 glass-hover w-8 h-8 sm:w-10 sm:h-10"
                  aria-label="Close modal"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-base sm:text-lg md:text-xl" />
                </Button>
              </motion.div>

              {/* Main media area */}
              <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-background/50 to-background/30 dark:from-background/30 dark:to-background/20 min-h-0">
                {/* Video/Image display area */}
                <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.95, x: currentIndex > 0 ? 50 : -50 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: currentIndex > 0 ? -50 : 50 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full flex items-center justify-center max-w-7xl mx-auto"
                    >
                      {currentMedia.type === 'video' ? (
                        <div className="relative w-full h-full">
                          <motion.video
                            src={currentMedia.src}
                            poster={currentMedia.poster}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            onLoadedData={() => setVideoLoading(false)}
                            onError={(e) => {
                              // Video failed to load
                              console.error('Video failed to load:', e.currentTarget.src)
                              setVideoLoading(false)
                            }}
                            className="w-full h-full object-contain rounded-lg"
                            style={{ 
                              filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))',
                              boxShadow: '0 0 40px rgba(126, 116, 241, 0.15)',
                              opacity: videoLoading ? 0.5 : 1,
                              transition: 'opacity 0.3s ease'
                            }}
                          />
                          {/* Loading Message Overlay */}
                          <AnimatePresence>
                            {videoLoading && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 dark:bg-background/90 backdrop-blur-sm rounded-lg"
                              >
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="mb-4"
                                >
                                  <FontAwesomeIcon 
                                    icon={faSpinner} 
                                    className="text-4xl sm:text-5xl md:text-6xl text-primary" 
                                  />
                                </motion.div>
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="text-center px-4"
                                >
                                  <div className="flex items-center justify-center gap-2 mb-2">
                                    <FontAwesomeIcon icon={faVideo} className="text-lg sm:text-xl text-primary" />
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                                      Loading Video
                                    </h3>
                                  </div>
                                  <p className="text-sm sm:text-base text-foreground/70 max-w-md">
                                    This video may take a moment to load. Please wait...
                                  </p>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <motion.div
                          className="relative w-full h-full rounded-lg overflow-hidden"
                          style={{ 
                            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))',
                            boxShadow: '0 0 40px rgba(126, 116, 241, 0.15)'
                          }}
                        >
                          <Image
                            src={currentMedia.src}
                            alt={currentMedia.alt || project.title}
                            fill
                            className="object-contain"
                            priority
                            sizes="100vw"
                          />
                        </motion.div>
                      )}
                      
                      {/* Frosted overlay reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 dark:to-background/40 pointer-events-none rounded-lg" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation arrows */}
                {media.length > 1 && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      className={cn(
                        "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50",
                        "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full glass",
                        "flex items-center justify-center",
                        "hover:scale-110 active:scale-95 transition-transform",
                        "disabled:opacity-30 disabled:cursor-not-allowed",
                        "focus:outline-none focus:ring-2 focus:ring-primary",
                        "touch-manipulation"
                      )}
                      aria-label="Previous media"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="text-lg sm:text-xl md:text-2xl" />
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={handleNext}
                      disabled={currentIndex === media.length - 1}
                      className={cn(
                        "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50",
                        "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full glass",
                        "flex items-center justify-center",
                        "hover:scale-110 active:scale-95 transition-transform",
                        "disabled:opacity-30 disabled:cursor-not-allowed",
                        "focus:outline-none focus:ring-2 focus:ring-primary",
                        "touch-manipulation"
                      )}
                      aria-label="Next media"
                    >
                      <FontAwesomeIcon icon={faChevronRight} className="text-lg sm:text-xl md:text-2xl" />
                    </motion.button>
                  </>
                )}
              </div>

              {/* Horizontal scrolling carousel */}
              {media.length > 1 && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="glass border-t border-white/20 p-3 sm:p-4 md:p-6"
                >
                  <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className={cn(
                      "flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto overflow-y-hidden",
                      "scrollbar-hide",
                      "cursor-grab active:cursor-grabbing",
                      "scroll-smooth",
                      "pb-1"
                    )}
                    style={{
                      scrollBehavior: 'smooth',
                      WebkitOverflowScrolling: 'touch',
                    }}
                  >
                    {media.map((item, index) => (
                      <motion.div
                        key={index}
                        onClick={() => {
                          setCurrentIndex(index)
                          setVideoLoading(true) // Reset loading when clicking thumbnail
                        }}
                        className={cn(
                          "flex-shrink-0 relative",
                          "w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 lg:w-48 lg:h-32",
                          "rounded-lg overflow-hidden cursor-pointer",
                          "border-2 transition-all",
                          currentIndex === index
                            ? "border-primary shadow-glass-hover scale-105"
                            : "border-transparent hover:border-primary/50 hover:scale-[1.02]"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                                {item.type === 'video' ? (
                                  <video
                                    src={item.src}
                                    poster={item.poster}
                                    className="w-full h-full object-cover"
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    onError={(e) => {
                                      // Video thumbnail failed to load
                                      console.error('Video thumbnail failed to load:', e.currentTarget.src)
                                    }}
                                  />
                                ) : (
                          <Image
                            src={item.src}
                            alt={item.alt || `${project.title} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                          />
                        )}
                        {currentIndex === index && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-primary/20 border-2 border-primary rounded-lg"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

