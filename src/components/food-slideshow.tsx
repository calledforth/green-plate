"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const slideshowImages = [
  "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3"
]

export default function FoodSlideshow({ interval = 5000 }: { interval?: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [previousImageIndex, setPreviousImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setPreviousImageIndex(currentImageIndex)
      setIsTransitioning(true)
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length)
      
      // Reset the transition flag after animation completes
      const transitionTimer = setTimeout(() => {
        setIsTransitioning(false)
      }, 1000)
      
      return () => clearTimeout(transitionTimer)
    }, interval)
    
    return () => clearInterval(timer)
  }, [currentImageIndex, interval])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slideshowImages.map((src, index) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            index === currentImageIndex 
              ? "opacity-100 z-10" 
              : index === previousImageIndex && isTransitioning
                ? "opacity-0 z-0"
                : "opacity-0 z-0"
          )}
        >
          <Image
            src={src}
            alt={`Food slideshow image ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover w-full h-full" 
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  )
}
