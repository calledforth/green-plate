// components/MenuSection.tsx
"use client"
import { useEffect, useState } from "react"
import MealCard from "./MealCard"

type Meal = {
  name: string
  price: number
  isVegan: boolean
}

const MenuSection = ({ onOrderCountChange }: { onOrderCountChange: (count: number) => void }) => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [filter, setFilter] = useState<"all" | "veg" | "nonveg">("all")

  // Hardcoded fallback meals
  const fallbackMeals: Meal[] = [
    { name: "Vegan Bowl", price: 10, isVegan: true },
    { name: "Chicken Wrap", price: 12, isVegan: false },
    { name: "Tofu Delight", price: 9, isVegan: true },
    { name: "Paneer Tikka", price: 11, isVegan: true },
    { name: "Fish Curry", price: 13, isVegan: false },
    { name: "Lentil Salad", price: 8, isVegan: true },
  ]

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("/api/meals")
        const data = await res.json()
        setMeals(data)
        onOrderCountChange(data.length)
      } catch (err) {
        console.error("Failed to fetch meals:", err)
        setMeals(fallbackMeals)
      }
    }
    fetchMeals()
  }, [])

  
  const filteredMeals = meals.filter(meal => {
    if (filter === "veg") return meal.isVegan
    if (filter === "nonveg") return !meal.isVegan
    return true
  })

  return (
    <section className="py-12 px-6 animate-fadeIn">
      <h2 className="text-3xl font-heading text-center mb-6 text-greenplate-dark">Our Menu</h2>

      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-full font-medium ${
            filter === "all" ? "bg-greenplate-dark text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium ${
            filter === "veg" ? "bg-greenplate-dark text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("veg")}
        >
          Veg Only
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium ${
            filter === "nonveg" ? "bg-greenplate-dark text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("nonveg")}
        >
          Non-Veg
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMeals.map((meal, idx) => (
          <MealCard key={idx} meal={meal} />
        ))}
      </div>
    </section>
  )
}

export default MenuSection
