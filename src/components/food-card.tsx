import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Flame, Leaf, Salad, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type DietaryType = "vegan" | "vegetarian" | "non-veg"

interface FoodCardProps {
  image?: string
  title: string
  price: string
  dietaryType: DietaryType
  co2Saved: string
}

export default function FoodCard({ image, title, price, dietaryType, co2Saved }: FoodCardProps) {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 1500)
  }

  return (
    <Card className="w-full overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-md">
      <div className="relative">
        {image ? (
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-[150px] object-cover" />
        ) : (
          <div className="w-full h-[150px] bg-gray-200" />
        )}
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm">{title}</h3>
          <span className="font-medium text-sm">{price}</span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div
            className={`flex items-center gap-1 text-xs ${
              dietaryType === "non-veg"
                ? "text-orange-500"
                : dietaryType === "vegetarian"
                  ? "text-green-600"
                  : "text-green-500"
            }`}
          >
            {dietaryType === "non-veg" ? (
              <Flame className="h-3 w-3" />
            ) : dietaryType === "vegetarian" ? (
              <Salad className="h-3 w-3" />
            ) : (
              <Salad className="h-3 w-3" />
            )}
            <span>{dietaryType === "non-veg" ? "Non-Veg" : dietaryType === "vegetarian" ? "Vegetarian" : "Vegan"}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-blue-500">
            <Leaf className="h-3 w-3" />
            <span>{co2Saved}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button 
          className={cn(
            "w-full rounded-b-xl h-9 text-xs transition-all", 
            isAdded 
              ? "bg-green-600 hover:bg-green-700" 
              : "bg-black hover:bg-black/90"
          )}
          onClick={handleAddToCart}
        >
          {isAdded ? (
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Added to Cart
            </span>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}