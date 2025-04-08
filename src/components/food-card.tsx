"use client"

import { useState } from "react"
import { Leaf, Drumstick, Wheat, PlusCircle, XCircle, Info } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export type DietaryType = "vegan" | "vegetarian" | "non-veg"

interface FoodCardProps {
  title: string
  price: string
  image?: string
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
  "Mediterranean Fish": ["White fish", "Tomatoes", "Olives", "Capers", "Lemon", "Herbs", "Olive oil"]
}

// Nutrition info for the popup (simplified example)
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
  "Mediterranean Fish": { calories: "380", protein: "32g", carbs: "22g", fat: "18g" }
}

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
  title,
  price,
  image,
  dietaryType,
  co2Saved,
}: FoodCardProps) {
  const [showPopup, setShowPopup] = useState(false)
  
  const handleOpenPopup = () => setShowPopup(true)
  const handleClosePopup = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPopup(false)
  }

  const ingredients = ingredientsMap[title] || []
  const nutrition = nutritionInfo[title] || { calories: "400", protein: "15g", carbs: "50g", fat: "15g" }

  const { icon: Icon, color, label } = getDietaryIcon(dietaryType)

  return (
    <Link href="/item/placeholder">
      <motion.div 
        className="group rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-zinc-800 h-full flex flex-col"
        onClick={handleOpenPopup}
        whileHover={{ 
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          y: -5
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-800"></div>
          )}
          
          {/* Gradient overlay - more visible now */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-[2px] opacity-60 group-hover:opacity-75 transition-opacity duration-300"></div>
          
          {/* Price tag */}
          <div className="absolute top-3 right-3 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white font-medium px-2.5 py-1 rounded-full text-sm shadow-sm">
            {price}
          </div>
          
          {/* CO2 Saved - moved to the image area for better visibility */}
          <div className="absolute bottom-3 left-3 bg-green-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <span>{co2Saved}</span>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1.5">{title}</h3>
            <div className="flex items-center gap-1.5">
              <Badge variant="outline" className="bg-gray-50 dark:bg-zinc-800 border-gray-100 dark:border-zinc-700 px-2 py-0.5 text-xs font-normal flex items-center gap-1">
                <Icon className={`${color} w-3 h-3`} />
                <span className="text-gray-500 dark:text-gray-300">{label}</span>
              </Badge>
            </div>
          </div>
        </div>

        {/* Popup with additional details */}
        <AnimatePresence>
          {showPopup && (
            <motion.div 
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePopup}
            >
              <motion.div 
                className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg" 
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="h-56 relative">
                  {image && (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <button 
                    onClick={handleClosePopup}
                    className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md"
                  >
                    <XCircle className="w-5 h-5 text-gray-600" />
                  </button>
                  <Badge 
                    className={cn(
                      "absolute top-3 left-3 text-xs py-0.5 px-2 rounded-full", 
                      dietaryType === "vegan" 
                        ? "bg-green-100 text-green-800"
                        : dietaryType === "vegetarian"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
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
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="font-bold text-gray-800 text-xl">{title}</h2>
                    <p className="font-medium text-gray-900">{price}</p>
                  </div>
                  
                  <div className="mb-5">
                    <p className="text-green-600 text-sm flex items-center mb-2">
                      <Leaf className="w-4 h-4 mr-1" />
                      {co2Saved}
                    </p>
                    <p className="text-sm text-gray-600">Choose this dish to reduce your carbon footprint and make a positive environmental impact.</p>
                  </div>
                  
                  <div className="mb-5">
                    <h3 className="font-medium text-gray-800 mb-2">Ingredients</h3>
                    <div className="flex flex-wrap gap-1">
                      {ingredients.map((ingredient, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-2">Nutrition Info</h3>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-xs text-gray-500">Calories</p>
                        <p className="font-medium text-gray-800">{nutrition.calories}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-xs text-gray-500">Protein</p>
                        <p className="font-medium text-gray-800">{nutrition.protein}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-xs text-gray-500">Carbs</p>
                        <p className="font-medium text-gray-800">{nutrition.carbs}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-xs text-gray-500">Fat</p>
                        <p className="font-medium text-gray-800">{nutrition.fat}</p>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button className="w-full gap-2">
                      <PlusCircle className="w-4 h-4" />
                      Add to Order
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  )
}