"use client"

import { useState } from "react"
import { Leaf, Drumstick, Wheat, PlusCircle, XCircle } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/context/CartContext"
import { toast } from "sonner"
import { StaticImageData } from "next/image"

export type DietaryType = "vegan" | "vegetarian" | "non-veg"

interface FoodCardProps {
  id: string | number
  title: string
  price: string
  image?: StaticImageData
  dietaryType: DietaryType
  co2Saved: string
}

// Sample ingredients data for the popup
const ingredientsMap: Record<string, string[]> = {
  "Buddha Bowl": ["Quinoa", "Avocado", "Sweet potato", "Chickpeas", "Kale", "Tahini dressing"],
  "Mediterranean Quinoa": ["Quinoa", "Cucumber", "Cherry tomatoes", "Red onion", "Feta", "Olives", "Lemon dressing"],
  "Asian Stir-Fry": ["Rice noodles", "Tofu", "Broccoli", "Carrots", "Bell peppers", "Soy sauce", "Ginger"],
  "Grilled Chicken Plate": ["Chicken breast", "Brown rice", "Broccoli", "Bell peppers", "Olive oil", "Herbs"],
  "Salmon Poke Bowl": ["Salmon", "Rice", "Avocado", "Cucumber", "Edamame", "Seaweed", "Soy sauce"],
  "Mexican Bowl": ["Black beans", "Corn", "Rice", "Avocado", "Tomato salsa", "Lime", "Cilantro"],
  "Avocado Toast Bowl": ["Sourdough", "Avocado", "Cherry tomatoes", "Microgreens", "Hemp seeds", "Lemon"],
  "Spinach Mushroom Risotto": ["Arborio rice", "Mushrooms", "Spinach", "Onion", "Vegetable broth", "White wine"],
  "Tofu Curry Bowl": ["Tofu", "Coconut milk", "Curry paste", "Bell peppers", "Broccoli", "Brown rice"],
  "Grilled Steak Plate": ["Grass-fed beef", "Sweet potato", "Asparagus", "Chimichurri sauce"],
  "Shrimp Taco Bowl": ["Shrimp", "Corn tortillas", "Cabbage slaw", "Avocado", "Lime crema"],
  "Mediterranean Fish": ["White fish", "Tomatoes", "Olives", "Capers", "Lemon", "Herbs", "Olive oil"],
  // Add fallbacks for MongoDB data items
  "Green Smoothie": ["Spinach", "Banana", "Avocado", "Almond milk", "Chia seeds", "Protein powder"],
  "Grilled Paneer": ["Paneer cheese", "Bell peppers", "Onions", "Tomatoes", "Indian spices", "Cilantro"],
  "Fish Taco": ["White fish", "Corn tortillas", "Cabbage slaw", "Avocado", "Lime", "Cilantro"],
  "Tofu Stir Fry": ["Tofu", "Broccoli", "Carrots", "Snow peas", "Soy sauce", "Ginger", "Garlic"]
}

// Nutrition info for the popup
const nutritionInfo: Record<string, { calories: string, protein: string, carbs: string, fat: string }> = {
  "Buddha Bowl": { calories: "450", protein: "15g", carbs: "65g", fat: "18g" },
  "Mediterranean Quinoa": { calories: "380", protein: "12g", carbs: "48g", fat: "16g" },
  "Asian Stir-Fry": { calories: "320", protein: "14g", carbs: "52g", fat: "8g" },
  "Grilled Chicken Plate": { calories: "420", protein: "38g", carbs: "30g", fat: "14g" },
  "Salmon Poke Bowl": { calories: "520", protein: "32g", carbs: "42g", fat: "24g" },
  "Mexican Bowl": { calories: "470", protein: "14g", carbs: "68g", fat: "16g" },
  "Avocado Toast Bowl": { calories: "380", protein: "12g", carbs: "42g", fat: "20g" },
  "Spinach Mushroom Risotto": { calories: "420", protein: "10g", carbs: "68g", fat: "12g" },
  "Tofu Curry Bowl": { calories: "380", protein: "18g", carbs: "46g", fat: "14g" },
  "Grilled Steak Plate": { calories: "520", protein: "42g", carbs: "32g", fat: "22g" },
  "Shrimp Taco Bowl": { calories: "450", protein: "28g", carbs: "48g", fat: "16g" },
  "Mediterranean Fish": { calories: "380", protein: "32g", carbs: "22g", fat: "18g" },
  // Add fallbacks for MongoDB data items
  "Green Smoothie": { calories: "280", protein: "12g", carbs: "38g", fat: "14g" },
  "Grilled Paneer": { calories: "420", protein: "22g", carbs: "30g", fat: "25g" },
  "Fish Taco": { calories: "380", protein: "24g", carbs: "42g", fat: "16g" },
  "Tofu Stir Fry": { calories: "320", protein: "18g", carbs: "36g", fat: "12g" }
}

// Default ingredients and nutrition for unknown items
const defaultIngredients = ["Mixed vegetables", "Grains", "Protein", "Sauce"]
const defaultNutrition = { calories: "400", protein: "15g", carbs: "50g", fat: "15g" }

const getDietaryIcon = (type: DietaryType) => {
  switch (type) {
    case "vegan":
      return { icon: Leaf, color: "text-green-600 dark:text-green-400", label: "Vegan" }
    case "vegetarian":
      return { icon: Wheat, color: "text-green-600 dark:text-green-400", label: "Vegetarian" }
    case "non-veg":
      return { icon: Drumstick, color: "text-red-500", label: "Non-Vegetarian" }
  }
}

export default function FoodCard({
  id,
  title,
  price,
  image,
  dietaryType,
  co2Saved,
}: FoodCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useCart()
  
  // Get dietary icon
  const { icon: Icon, color, label } = getDietaryIcon(dietaryType)
  
  // Get ingredients and nutrition info
  const ingredients = ingredientsMap[title] || defaultIngredients
  const nutrition = nutritionInfo[title] || defaultNutrition

  // Fallback image if the provided one doesn't load or is missing
  const fallbackImages = [
    "/food-1.jpg",
    "/food-2.jpg",
    "/food-3.jpg",
    "/food-4.jpg",
    "/food-5.jpg",
    "/food-6.jpg",
  ]

  // Use a hash of the title to consistently select the same fallback image for the same dish
  const getHashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  const fallbackImageIndex = getHashCode(title) % fallbackImages.length;
  const fallbackImage = fallbackImages[fallbackImageIndex];

  function openModal() {
    setIsModalOpen(true)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    setIsModalOpen(false)
    // Restore body scrolling
    document.body.style.overflow = 'auto'
  }

  function handleAddToCart() {
    // Extract numeric price value
    const numericPrice = parseFloat(String(price).replace(/[^0-9.]/g, ''))
    
    // Extract numeric CO2 saved value
    const co2Match = co2Saved.match(/(\d+\.?\d*)/)
    const co2Impact = co2Match ? parseFloat(co2Match[1]) : 2 // Default to 2 if not found
    
    // Determine if vegan based on dietary type
    const isVegan = dietaryType === 'vegan'
    
    // Create cart item
    const cartItem = {
      id,
      name: title,
      price: numericPrice,
      quantity: 1,
      isVegan,
      dietaryType,
      co2Impact,
      image: image?.src || undefined
    }
    
    // Add to cart
    addToCart(cartItem)
    
    // Show toast notification with Sonner
    toast.success(`Added to cart`, {
      description: `${title} has been added to your cart.`,
      duration: 3000,
    })
    
    // Close modal
    closeModal()
  }

  return (
    <>
      {/* Food Card */}
      <div onClick={openModal} className="cursor-pointer">
        <motion.div 
          className="rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 h-full flex flex-col min-h-[320px]"
          whileHover={{ 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            y: -5
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  // If image fails to load, replace with fallback
                  const target = e.target as HTMLImageElement;
                  target.src = fallbackImage;
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-zinc-800">
                <Image
                  src={fallbackImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Price tag */}
            <div className="absolute top-3 right-3 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white font-medium px-2.5 py-1 rounded-full text-sm shadow-sm">
              {price}
            </div>
          </div>
          
          {/* Content Container - New Design with Full-Width Blur */}
          <div className="relative flex-grow">
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-t-xl border-t border-white/20"></div>
            
            <div className="relative p-4 flex flex-col h-full z-10">
              <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-2 leading-tight">{title}</h3>
              <div className="flex items-center gap-2 mt-auto">
                <Badge variant="outline" className="bg-gray-50/80 dark:bg-zinc-800/80 border-gray-100 dark:border-zinc-700 px-2 py-0.5 text-xs font-normal flex items-center gap-1.5">
                  <Icon className={`${color} w-3 h-3`} />
                  <span className="text-gray-600 dark:text-gray-300">{label}</span>
                </Badge>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">{co2Saved}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal (separate from the card) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white dark:bg-zinc-900 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl dark:border dark:border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="h-56 relative">
              <Image
                src={image || fallbackImage}
                alt={title}
                fill
                className="object-cover"
                onError={(e) => {
                  // If image fails to load, replace with fallback
                  const target = e.target as HTMLImageElement;
                  target.src = fallbackImage;
                }}
              />
              
              {/* Close button */}
              <button 
                onClick={closeModal}
                className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full p-1.5 shadow-md"
              >
                <XCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              {/* Dietary badge */}
              <Badge 
                className={cn(
                  "absolute top-3 left-3 text-xs py-0.5 px-2 rounded-full backdrop-blur-sm", 
                  dietaryType === "vegan" 
                    ? "bg-green-100/90 text-green-800 dark:bg-green-900/60 dark:text-green-300"
                    : dietaryType === "vegetarian"
                      ? "bg-green-50/90 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      : "bg-red-50/90 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                )}
              >
                {dietaryType === "vegan" && (
                  <><Leaf className="w-3 h-3 mr-1" /> Vegan</>
                )}
                {dietaryType === "vegetarian" && (
                  <><Wheat className="w-3 h-3 mr-1" /> Vegetarian</>
                )}
                {dietaryType === "non-veg" && (
                  <><Drumstick className="w-3 h-3 mr-1" /> Non-Veg</>
                )}
              </Badge>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-bold text-gray-800 dark:text-white text-xl">{title}</h2>
                <p className="font-medium text-gray-900 dark:text-gray-200">{price}</p>
              </div>
              
              <div className="mb-5">
                <p className="text-green-600 dark:text-green-400 text-sm flex items-center mb-2">
                  <Leaf className="w-4 h-4 mr-1" />
                  {co2Saved}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Choose this dish to reduce your carbon footprint and make a positive environmental impact.</p>
              </div>
              
              <div className="mb-5">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">Ingredients</h3>
                <div className="flex flex-wrap gap-1.5">
                  {ingredients.map((ingredient, index) => (
                    <span key={index} className="text-xs bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">Nutrition Info</h3>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-gray-50 dark:bg-zinc-800 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
                    <p className="font-medium text-gray-800 dark:text-white">{nutrition.calories}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-zinc-800 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Protein</p>
                    <p className="font-medium text-gray-800 dark:text-white">{nutrition.protein}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-zinc-800 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Carbs</p>
                    <p className="font-medium text-gray-800 dark:text-white">{nutrition.carbs}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-zinc-800 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fat</p>
                    <p className="font-medium text-gray-800 dark:text-white">{nutrition.fat}</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="w-full gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              >
                <PlusCircle className="w-4 h-4" />
                Add to Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}