import { useCart, CartItem } from "@/context/CartContext"

interface Meal {
  id: string | number
  name: string
  price: string | number
  isVegan: boolean
  dietaryType: string
}

const MealCard = ({ meal }: { meal: Meal }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart()
  const cartItem = cart.find(item => item.id === meal.id)

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: meal.id,
      name: meal.name,
      price: meal.price,
      quantity: 1,
      isVegan: meal.isVegan,
      dietaryType: meal.dietaryType,
    }
    addToCart(cartItem)
  }

  const handleIncrement = () => {
    if (cartItem) {
      updateQuantity(meal.id, cartItem.quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (cartItem) {
      if (cartItem.quantity === 1) {
        removeFromCart(meal.id)
      } else {
        updateQuantity(meal.id, cartItem.quantity - 1)
      }
    }
  }

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-md p-4 transition-transform hover:scale-105 hover:shadow-lg animate-fadeIn border dark:border-border min-h-[200px] flex flex-col">
      <div className="flex-grow">
        <h3 className="text-lg font-heading mb-2 text-foreground leading-tight">{meal.name}</h3>
        <p className="text-xs text-muted-foreground mb-1">Price: {typeof meal.price === 'string' ? meal.price : `$${meal.price}`}</p>
        <div className="flex items-center mb-2">
          <p className={`text-xs font-semibold flex items-center gap-1 ${meal.isVegan ? "text-green-600" : "text-red-500"}`}>
            <span>{meal.isVegan ? "🌱" : "🍗"}</span>
            <span>{meal.isVegan ? "Vegan" : "Non-Veg"}</span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        {cartItem ? (
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={handleDecrement} 
              className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 dark:text-white flex items-center justify-center font-semibold transition-colors"
            >
              −
            </button>
            <span className="text-foreground font-medium text-base min-w-[1.5rem] text-center">{cartItem.quantity}</span>
            <button 
              onClick={handleIncrement} 
              className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/50 dark:text-white flex items-center justify-center font-semibold transition-colors"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium text-sm"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

export default MealCard
