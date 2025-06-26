"use client"
import { useEffect, useState } from "react"
import MealCard from "./MealCard"

interface Meal {
  id: string | number
  name: string
  price: string | number
  isVegan: boolean
  dietaryType: string
}

const MenuSection = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [filter, setFilter] = useState<"all" | "veg" | "nonveg">("all")

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("/api/meals")
        const data = await res.json()
        setMeals(data)
      } catch (err) {
        console.error("Failed to fetch meals:", err)
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
    <section className="py-12 px-6 animate-fadeIn bg-background">
      <h2 className="text-3xl font-heading text-center mb-6 text-foreground">Our Menu</h2>

      <div className="flex justify-center gap-4 mb-8">
        {["all", "veg", "nonveg"].map(f => (
          <button
            key={f}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              filter === f 
                ? "bg-green-600 text-white" 
                : "bg-muted text-muted-foreground hover:bg-green-100 dark:hover:bg-green-900/30"
            }`}
            onClick={() => setFilter(f as any)}
          >
            {f === "all" ? "All" : f === "veg" ? "Veg Only" : "Non-Veg"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.map((meal, idx) => (
          <MealCard key={idx} meal={meal} />
        ))}
      </div>
    </section>
  )
}

export default MenuSection
