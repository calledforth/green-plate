"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Import local assets
import img1 from "@/app/assets/alex-munsell-auIbTAcSH6E-unsplash.jpg"
import img2 from "@/app/assets/brooke-lark-R18ecx07b3c-unsplash.jpg"
import img3 from "@/app/assets/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg"
import img4 from "@/app/assets/eaters-collective-ddZYOtZUnBk-unsplash.jpg"

const slideshowImages = [
  img1,
  img2,
  img3,
  img4
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
          key={index}
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
