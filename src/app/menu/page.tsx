"use client"

import { useState, useEffect } from "react"
import FoodCard, { type DietaryType } from "@/components/food-card"
import { Button } from "@/components/ui/button"
import { Salad, Beef, AlignJustify, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import FoodSlideshow from "@/components/food-slideshow"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { CartButton } from "@/components/cart-button"
import { CartDrawer } from "@/components/cart-drawer"
import foodimage from "@/app/assets/alex-munsell-Yr4n8O_3UPc-unsplash.jpg"
import { StaticImageData } from "next/image"

interface MenuItem {
  id: number | string
  title: string
  price: string
  image?: StaticImageData
  dietaryType: DietaryType
  co2Saved: string
  isVegan?: boolean
}

// Sample images to use with our API data
const foodImages = [
  foodimage,
  foodimage,
  foodimage,
  foodimage,
  foodimage,
  foodimage,
  foodimage,
  foodimage,
]

export default function MenuPage() {
  const [filter, setFilter] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/meals')
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Add random images and process MongoDB data format
        const formattedData = data.map((item: any, index: number) => {
          // If the API hasn't transformed the data, do it here
          const dietaryType = item.dietaryType || determineDietaryType(item)
          const title = item.title || item.name || "Unnamed Dish"
          const price = item.price.startsWith ? item.price : `$${item.price}`
          
          return {
            id: item.id || item._id || index,
            title,
            price,
            image: foodImages[index % foodImages.length], // Cycle through our images
            dietaryType,
            co2Saved: item.co2Saved || `${(Math.random() * 2 + 0.5).toFixed(1)}kg CO₂ saved`,
            isVegan: item.isVegan
          }
        })
        
        setMenuItems(formattedData)
        setIsLoading(false)
      } catch (err) {
        console.error("Failed to fetch menu items:", err)
        setError("Failed to load menu items. Using fallback data.")
        
        // Use fallback data similar to what we had before
        setMenuItems([
          {
            id: 1,
            title: "Buddha Bowl",
            price: "$12.99",
            image: foodImages[0],
            dietaryType: "vegan",
            co2Saved: "1.0kg CO₂ saved",
          },
          {
            id: 2,
            title: "Mediterranean Quinoa",
            price: "$10.99",
            image: foodImages[1],
            dietaryType: "vegetarian",
            co2Saved: "1.0kg CO₂ saved",
          },
          {
            id: 3,
            title: "Asian Stir-Fry",
            price: "$11.99",
            image: foodImages[2],
            dietaryType: "vegan",
            co2Saved: "2.1kg CO₂ saved",
          },
          // Use a few more items from our fallback data
          {
            id: 4,
            title: "Grilled Chicken Plate",
            price: "$14.99",
            image: foodImages[3],
            dietaryType: "non-veg",
            co2Saved: "1.2kg CO₂ saved",
          },
          {
            id: 5,
            title: "Salmon Poke Bowl",
            price: "$15.99",
            image: foodImages[4],
            dietaryType: "non-veg",
            co2Saved: "1.3kg CO₂ saved",
          },
          {
            id: 6,
            title: "Mexican Bowl",
            price: "$13.99",
            image: foodImages[5],
            dietaryType: "vegan",
            co2Saved: "3.3kg CO₂ saved",
          }
        ])
        setIsLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  // Helper function to determine dietary type based on MongoDB data
  function determineDietaryType(item: any): DietaryType {
    if (item.isVegan === true) {
      return "vegan"
    } else if (item.isVegetarian === true) {
      return "vegetarian"
    } else {
      return "non-veg"
    }
  }

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
        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 py-2 px-4 rounded-md mb-6 dark:bg-amber-900/20 dark:border-amber-800/30 dark:text-amber-300">
            {error}
          </div>
        )}
        
        {isLoading ? (
          // Loading Skeleton UI
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 h-full flex flex-col">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: Math.min(index * 0.1, 0.8),
                  ease: "easeOut"
                }}
              >
                <FoodCard
                  id={item.id}
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

      {/* Cart Button and Drawer */}
      <CartButton onClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
