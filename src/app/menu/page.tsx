"use client"

import { useState, useEffect } from "react"
import FoodCard, { type DietaryType } from "@/components/food-card"
import { Button } from "@/components/ui/button"
import { Salad, Beef, AlignJustify, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import FoodSlideshow from "@/components/food-slideshow"
import { motion } from "framer-motion"

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
  // New vegetarian options
  {
    id: 7,
    title: "Avocado Toast Bowl",
    price: "$9.99",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=1972&auto=format&fit=crop",
    dietaryType: "vegetarian",
    co2Saved: "1.5kg CO₂ saved",
  },
  {
    id: 8,
    title: "Spinach Mushroom Risotto",
    price: "$13.99",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop",
    dietaryType: "vegetarian",
    co2Saved: "1.8kg CO₂ saved",
  },
  {
    id: 9,
    title: "Tofu Curry Bowl",
    price: "$12.50",
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=2070&auto=format&fit=crop",
    dietaryType: "vegan",
    co2Saved: "2.4kg CO₂ saved",
  },
  // New non-vegetarian options
  {
    id: 10,
    title: "Grilled Steak Plate",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=2070&auto=format&fit=crop",
    dietaryType: "non-veg",
    co2Saved: "0.8kg CO₂ saved",
  },
  {
    id: 11,
    title: "Shrimp Taco Bowl",
    price: "$16.50",
    image: "https://images.unsplash.com/photo-1553535994-1b71a4b89b88?q=80&w=1972&auto=format&fit=crop",
    dietaryType: "non-veg",
    co2Saved: "1.1kg CO₂ saved",
  },
  {
    id: 12,
    title: "Mediterranean Fish",
    price: "$17.99",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
    dietaryType: "non-veg",
    co2Saved: "1.0kg CO₂ saved",
  }
]

export default function MenuPage() {
  const [filter, setFilter] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  const filteredItems = menuItems.filter(item => {
    // Apply dietary filter
    return filter === null || 
      (filter === "vegetarian" && (item.dietaryType === "vegetarian" || item.dietaryType === "vegan")) ||
      (filter === "non-vegetarian" && item.dietaryType === "non-veg")
  })

  return (
    <div className="min-h-screen dark:bg-black">
      {/* Container for the rounded hero section */}
      <div className="container mx-auto px-6 pt-8 pb-4">
        {/* Hero Section with Background Image */}
        <div className="relative rounded-3xl overflow-hidden my-6 h-[450px]">
          {/* Food Slideshow as Background */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full">
              <FoodSlideshow />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
          </div>

          <div className="relative z-1 py-12 px-6 md:px-10 h-full flex items-center justify-center">
            <div className="text-center max-w-2xl">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium mb-4">
                <Leaf className="h-3.5 w-3.5 text-white" />
                <span>Eco-Conscious Dining</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Our Menu
              </h1>
              <p className="text-white text-lg max-w-md mx-auto mb-6">
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
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="bg-[#FFF5ED] dark:bg-black py-6 border-b border-[#FFE8D4] dark:border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-4">
            <div className="flex justify-center gap-3">
              <Button
                variant={filter === null ? "default" : "outline"}
                onClick={() => setFilter(null)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full text-xs px-4 py-1 font-medium",
                  filter === null 
                    ? "bg-gray-100 text-gray-800 dark:bg-zinc-900 dark:text-white" 
                    : "text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-zinc-900"
                )}
                size="sm"
              >
                <AlignJustify className={cn(
                  "h-3.5 w-3.5",
                  filter === null ? "text-gray-700 dark:text-white" : "text-gray-500 dark:text-gray-300"
                )} />
                All
              </Button>
              <Button
                variant={filter === "vegetarian" ? "default" : "outline"}
                onClick={() => setFilter("vegetarian")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full text-xs px-4 py-1 font-medium",
                  filter === "vegetarian" 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100" 
                    : "text-gray-500 hover:text-green-700 border-green-50 bg-transparent hover:bg-green-50 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-green-900/20"
                )}
                size="sm"
              >
                <Salad className={cn(
                  "h-3.5 w-3.5",
                  filter === "vegetarian" ? "text-green-700 dark:text-green-300" : "text-green-500 dark:text-green-500"
                )} />
                Vegetarian
              </Button>
              <Button
                variant={filter === "non-vegetarian" ? "default" : "outline"}
                onClick={() => setFilter("non-vegetarian")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full text-xs px-4 py-1 font-medium",
                  filter === "non-vegetarian" 
                    ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100" 
                    : "text-gray-500 hover:text-red-700 border-red-50 bg-transparent hover:bg-red-50 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-red-900/20"
                )}
                size="sm"
              >
                <Beef className={cn(
                  "h-3.5 w-3.5", 
                  filter === "non-vegetarian" ? "text-red-700 dark:text-red-300" : "text-red-500 dark:text-red-500"
                )} />
                Non-Vegetarian
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid with Smooth Loading Effect */}
      <div className="max-w-5xl mx-auto px-6 py-12 bg-[#FFF5ED] dark:bg-black">
        {filteredItems.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No meals found matching your criteria.</p>
            <Button 
              onClick={() => {setFilter(null)}} 
              variant="link" 
              className="text-green-600 mt-2 dark:text-green-400"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: isLoading ? 0 : Math.min(index * 0.1, 0.8),
                  ease: "easeOut"
                }}
              >
                <FoodCard
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  dietaryType={item.dietaryType}
                  co2Saved={item.co2Saved}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Environmental Impact Section */}
        <motion.div 
          className="mt-16 mb-8 bg-green-50 dark:bg-zinc-900 rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-3 text-center dark:text-white">Your Environmental Impact</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-xl mx-auto">
            By choosing plant-based options, you've helped save these resources:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 text-center">8.4kg</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center">CO₂ emissions saved</div>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 text-center">324L</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center">Water preserved</div>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 text-center">6.2m²</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center">Land conserved</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
