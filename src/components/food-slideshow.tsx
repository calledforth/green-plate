"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const images = [
  {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    alt: "Buddha bowl"
  },
  {
    src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop",
    alt: "Mediterranean quinoa"
  },
  {
    src: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?q=80&w=2072&auto=format&fit=crop",
    alt: "Asian stir-fry"
  },
  {
    src: "https://images.unsplash.com/photo-1577424983047-0d25a5733d11?q=80&w=1974&auto=format&fit=crop",
    alt: "Mexican bowl"
  }
]

export default function FoodSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden rounded-xl">
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      ))}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
