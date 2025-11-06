"use client"

import { useEffect } from "react"
import { projects } from "@/lib/data"

// All media files from all projects
const allMediaFiles: string[] = [
  // P2U Project
  '/p2u-project-assets/p2u-video.mov',
  '/p2u-project-assets/login.png',
  '/p2u-project-assets/register.png',
  // MAI Project
  '/MAI-project/mai-video.mov',
  '/MAI-project/homepage.png',
  '/MAI-project/login.png',
  '/MAI-project/management-dashboard.png',
  '/MAI-project/pricing-page.png',
  // Vantage Cargo
  '/vantage-cargo-project/vantage-cargo.mov',
  '/vantage-cargo-project/home.png',
  '/vantage-cargo-project/package.png',
  '/vantage-cargo-project/portfolio.png',
  '/vantage-cargo-project/contact-us.png',
  // Authnull
  '/Authnull-project/authnull.mov',
  '/Authnull-project/authnull.png',
  '/Authnull-project/blog-page.png',
  // Inlyne
  '/Inlyne-project/Inlyne.mov',
  '/Inlyne-project/home.png',
  // Freighkit AI
  '/freighkit.ai-project/freighkit-ai.mov',
  '/freighkit.ai-project/dashboard.png',
  '/freighkit.ai-project/chatbot-integration.png',
  '/freighkit.ai-project/conversation.png',
  // Custom AI Service
  '/custom-ai-service-project/custom-ai-service.mov',
  '/custom-ai-service-project/services.png',
  '/custom-ai-service-project/demo-integration.png',
  // JAAFAR Car
  '/JAAFAR-car-project/jaafar.mov',
  '/JAAFAR-car-project/jaafar-home.png',
  '/JAAFAR-car-project/blog-page.png',
  '/JAAFAR-car-project/sidebar.png',
]

export default function MediaPreloader() {
  useEffect(() => {
    // Preload all images and videos in the background
    const preloadMedia = () => {
      allMediaFiles.forEach((src) => {
        if (src.endsWith('.mov') || src.endsWith('.webm') || src.endsWith('.mp4')) {
          // Preload videos
          const video = document.createElement('video')
          video.preload = 'auto'
          video.src = src
          video.load()
        } else {
          // Preload images
          const link = document.createElement('link')
          link.rel = 'preload'
          link.as = 'image'
          link.href = src
          document.head.appendChild(link)
          
          // Also create an image to force browser to cache it
          const img = new window.Image()
          img.src = src
        }
      })
    }

    // Start preloading after a short delay to not block initial page load
    const timer = setTimeout(preloadMedia, 1000)

    return () => clearTimeout(timer)
  }, [])

  return null
}

