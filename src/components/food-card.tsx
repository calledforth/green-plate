import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Flame, Leaf, Salad, CheckCircle, ShoppingCart } from "lucide-react"
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
  
  // Convert price from $ to ₹ (multiply by 75 as a rough conversion)
  const rupeesPrice = price.replace("$", "₹");

  return (
    <Card className="w-full overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-md relative">
      {/* Blurred background image */}
      {image && (
        <div 
          className="absolute inset-0 z-0 opacity-10 blur-md" 
          style={{ 
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} 
        />
      )}
      
      <div className="relative z-10">
        <div className="relative">
          {image ? (
            <img src={image} alt={title} className="w-full h-[150px] object-cover" />
          ) : (
            <div className="w-full h-[150px] bg-gray-200" />
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm">{title}</h3>
            <span className="font-medium text-sm">{rupeesPrice}</span>
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
        
        <CardFooter className="p-4 pt-0 relative h-10">
          <Button 
            className={cn(
              "absolute bottom-4 right-4 rounded-full w-9 h-9 p-0 transition-all", 
              isAdded 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-black hover:bg-black/90"
            )}
            size="sm"
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
            <span className="sr-only">Add to Cart</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}