"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export type DietaryType = "vegan" | "vegetarian" | "non-veg"

interface FoodCardProps {
  title: string
  price: string
  image?: string
  dietaryType: DietaryType
  co2Saved: string
}

// Sample data for expanded details
const foodDetails: Record<string, string[]> = {
  "Buddha Bowl": ["Quinoa", "Avocado", "Chickpeas", "Kale", "Tahini dressing"],
  "Mediterranean Quinoa": ["Quinoa", "Cucumber", "Cherry tomatoes", "Feta", "Olives"],
  "Asian Stir-Fry": ["Tofu", "Broccoli", "Bell peppers", "Sesame", "Soy sauce"],
  "Grilled Chicken Plate": ["Free-range chicken", "Brown rice", "Roasted vegetables", "Herb sauce"],
  "Salmon Poke Bowl": ["Wild-caught salmon", "Sushi rice", "Seaweed", "Avocado", "Soy glaze"],
  "Mexican Bowl": ["Black beans", "Corn", "Guacamole", "Pico de gallo", "Lime rice"],
  // Default for any missing items
  "default": ["Seasonal vegetables", "Plant-based protein", "Whole grains", "House dressing"]
}

export default function FoodCard({
  title,
  price,
  image,
  dietaryType,
  co2Saved,
}: FoodCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const getBorderColor = () => {
    switch (dietaryType) {
      case "vegan":
      case "vegetarian":
        return "from-green-200/40 to-emerald-300/40"
      case "non-veg":
        return "from-orange-200/40 to-red-300/40"
      default:
        return "from-gray-200 to-gray-300"
    }
  }

  const getLabelColor = () => {
    switch (dietaryType) {
      case "vegan":
      case "vegetarian":
        return "bg-green-100 text-green-800"
      case "non-veg":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const ingredients = foodDetails[title] || foodDetails.default

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden bg-white relative transition-all duration-300",
        "hover:shadow-md",
        `bg-gradient-to-r p-[1px]`,
        getBorderColor()
      )}
      onClick={() => setExpanded(!expanded)}
      style={{ 
        boxShadow: `0 0 20px rgba(${dietaryType === "non-veg" ? "251, 146, 60" : "16, 185, 129"}, 0.1)` 
      }}
    >
      <div className="bg-white rounded-[calc(0.75rem-1px)] h-full">
        <div className="relative">
          {image && !imageError ? (
            <Image
              src={image}
              alt={title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 bg-gray-50 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div className={cn(
            "absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full",
            getLabelColor()
          )}>
            {dietaryType === "vegan" ? "Vegan" : 
             dietaryType === "vegetarian" ? "Vegetarian" : "Non-Vegetarian"}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg mb-1">{title}</h3>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold">{price}</span>
            <span className="text-sm text-green-600 font-medium">{co2Saved}</span>
          </div>
          
          <div 
            className={cn(
              "overflow-hidden transition-all duration-300",
              expanded ? "max-h-48 opacity-100 mt-3" : "max-h-0 opacity-0"
            )}
          >
            <div className="pt-3 border-t">
              <p className="text-sm font-medium text-gray-700 mb-2">Ingredients:</p>
              <ul className="text-sm text-gray-600">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}