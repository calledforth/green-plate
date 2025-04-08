"use client"

import { useState } from "react"
import FoodCard, { type DietaryType } from "@/components/food-card"
import { Button } from "@/components/ui/button"
import { Salad, Beef } from "lucide-react"

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
    image: undefined,
    dietaryType: "vegan",
    co2Saved: "1.0kg CO₂ saved",
  },
  {
    id: 2,
    title: "Mediterranean Quinoa",
    price: "$10.99",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TZllvqY07GquacITPrIZMxF664SrUq.png",
    dietaryType: "vegetarian",
    co2Saved: "1.0kg CO₂ saved",
  },
  {
    id: 3,
    title: "Asian Stir-Fry",
    price: "$11.99",
    image: undefined,
    dietaryType: "vegan",
    co2Saved: "2.1kg CO₂ saved",
  },
  {
    id: 4,
    title: "Grilled Chicken Plate",
    price: "$14.99",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5E0O9wpdiVYrIF82VjBVzevPhISxLh.png",
    dietaryType: "non-veg",
    co2Saved: "1.2kg CO₂ saved",
  },
  {
    id: 5,
    title: "Salmon Poke Bowl",
    price: "$15.99",
    image: undefined,
    dietaryType: "non-veg",
    co2Saved: "1.3kg CO₂ saved",
  },
  {
    id: 6,
    title: "Mexican Bowl",
    price: "$13.99",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TZllvqY07GquacITPrIZMxF664SrUq.png",
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
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto py-10 px-6">
        <div className="flex justify-center mb-10 gap-4">
          <Button
            variant={filter === null ? "default" : "outline"}
            onClick={() => setFilter(null)}
            className="flex items-center gap-2 rounded-full text-sm px-5"
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filter === "vegetarian" ? "default" : "outline"}
            onClick={() => setFilter("vegetarian")}
            className="flex items-center gap-2 rounded-full text-sm px-5"
            size="sm"
          >
            <Salad className="h-4 w-4" />
            Vegetarian
          </Button>
          <Button
            variant={filter === "non-vegetarian" ? "default" : "outline"}
            onClick={() => setFilter("non-vegetarian")}
            className="flex items-center gap-2 rounded-full text-sm px-5"
            size="sm"
          >
            <Beef className="h-4 w-4" />
            Non-Vegetarian
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
      </div>
    </div>
  )
}