"use client"

import { useState } from "react"
import FoodCard, { type DietaryType } from "@/components/food-card"
import { Button } from "@/components/ui/button"
import { Salad, Beef, AlignJustify, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import FoodSlideshow from "@/components/food-slideshow"

interface MenuItem {
  id: number
  title: string
  price: string
  image?: string
  dietaryType: DietaryType
  co2Saved: string
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Buddha Bowl",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    dietaryType: "vegan",
    co2Saved: "1.0kg CO₂ saved",
  },
  {
    id: 2,
    title: "Mediterranean Quinoa",
    price: "$10.99",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop",
    dietaryType: "vegetarian",
    co2Saved: "1.0kg CO₂ saved",
  },
  {
    id: 3,
    title: "Asian Stir-Fry",
    price: "$11.99",
    image: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?q=80&w=2072&auto=format&fit=crop",
    dietaryType: "vegan",
    co2Saved: "2.1kg CO₂ saved",
  },
  {
    id: 4,
    title: "Grilled Chicken Plate",
    price: "$14.99",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=2035&auto=format&fit=crop",
    dietaryType: "non-veg",
    co2Saved: "1.2kg CO₂ saved",
  },
  {
    id: 5,
    title: "Salmon Poke Bowl",
    price: "$15.99",
    image: "https://images.unsplash.com/photo-1563822249366-3e5d6b8b0a8b?q=80&w=1974&auto=format&fit=crop",
    dietaryType: "non-veg",
    co2Saved: "1.3kg CO₂ saved",
  },
  {
    id: 6,
    title: "Mexican Bowl",
    price: "$13.99",
    image: "https://images.unsplash.com/photo-1577424983047-0d25a5733d11?q=80&w=1974&auto=format&fit=crop",
    dietaryType: "vegan",
    co2Saved: "3.3kg CO₂ saved",
  },
]

export default function MenuPage() {
  const [filter, setFilter] = useState<string | null>(null)

  const filteredItems = filter
    ? menuItems.filter((item) => {
        if (filter === "vegetarian") {
          return item.dietaryType === "vegetarian" || item.dietaryType === "vegan"
        }
        if (filter === "non-vegetarian") {
          return item.dietaryType === "non-veg"
        }
        return true
      })
    : menuItems

  return (
    <div className="min-h-screen">
      {/* Container for the rounded hero section */}
      <div className="container mx-auto px-6 pt-8 pb-4">
        {/* Hero Section with Background Image */}
        <div className="relative rounded-3xl overflow-hidden my-6">
          {/* Background Image with Blur */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=2232&auto=format&fit=crop" 
              alt="Food background" 
              fill 
              className="object-cover"
              style={{ filter: 'blur(8px) brightness(0.9)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 to-green-50/90"></div>
          </div>

          <div className="relative z-1 py-12 px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium mb-4">
                  <Leaf className="h-3.5 w-3.5" />
                  <span>Eco-Conscious Dining</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                  Our Menu
                </h1>
                <p className="text-green-50 text-lg max-w-md mx-auto md:mx-0 mb-6">
                  Discover our selection of eco-conscious meals that help reduce your carbon footprint while delighting your taste buds.
                </p>
                <Link 
                  href="/about"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Learn about our CO₂ calculations
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
              <div className="hidden md:block">
                <FoodSlideshow />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="bg-[#FFF5ED] py-6">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-3">
            <Button
              variant={filter === null ? "default" : "outline"}
              onClick={() => setFilter(null)}
              className={cn(
                "flex items-center gap-1.5 rounded-full text-xs px-4 py-1 font-medium",
                filter === null ? "bg-green-50 text-gray-800" : "text-gray-700 bg-transparent"
              )}
              size="sm"
            >
              <AlignJustify className={cn(
                "h-3.5 w-3.5",
                filter === null ? "text-gray-700" : "text-gray-500"
              )} />
              All
            </Button>
            <Button
              variant={filter === "vegetarian" ? "default" : "outline"}
              onClick={() => setFilter("vegetarian")}
              className={cn(
                "flex items-center gap-1.5 rounded-full text-xs px-4 py-1 font-medium",
                filter === "vegetarian" 
                  ? "bg-green-100 text-green-800" 
                  : "text-gray-700 border-green-100 bg-transparent"
              )}
              size="sm"
            >
              <Salad className={cn(
                "h-3.5 w-3.5",
                filter === "vegetarian" ? "text-green-700" : "text-green-500"
              )} />
              Vegetarian
            </Button>
            <Button
              variant={filter === "non-vegetarian" ? "default" : "outline"}
              onClick={() => setFilter("non-vegetarian")}
              className={cn(
                "flex items-center gap-1.5 rounded-full text-xs px-4 py-1 font-medium",
                filter === "non-vegetarian" 
                  ? "bg-orange-100 text-orange-800" 
                  : "text-gray-700 border-orange-100 bg-transparent"
              )}
              size="sm"
            >
              <Beef className={cn(
                "h-3.5 w-3.5", 
                filter === "non-vegetarian" ? "text-orange-700" : "text-orange-500"
              )} />
              Non-Vegetarian
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <FoodCard
              key={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              dietaryType={item.dietaryType}
              co2Saved={item.co2Saved}
            />
          ))}
        </div>

        {/* Environmental Impact Section */}
        <div className="mt-16 mb-8 bg-green-50 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-3 text-center">Your Environmental Impact</h2>
          <p className="text-gray-600 mb-6 text-center max-w-xl mx-auto">
            By choosing plant-based options, you've helped save these resources:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600 text-center">8.4kg</div>
              <div className="text-sm text-gray-500 text-center">CO₂ emissions saved</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600 text-center">324L</div>
              <div className="text-sm text-gray-500 text-center">Water preserved</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600 text-center">6.2m²</div>
              <div className="text-sm text-gray-500 text-center">Land conserved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}