"use client"

import { useEffect } from "react"

export default function PreloadLinks() {
  useEffect(() => {
    // Critical project thumbnails to preload
    const criticalImages = [
      '/p2u-project-assets/login.png',
      '/MAI-project/homepage.png',
      '/vantage-cargo-project/home.png',
      '/Authnull-project/authnull.png',
      '/Inlyne-project/home.png',
      '/freighkit.ai-project/dashboard.png',
      '/custom-ai-service-project/services.png',
      '/JAAFAR-car-project/jaafar-home.png',
    ]

    criticalImages.forEach((src) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  return null
}

