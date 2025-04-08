import { Meal, useCart } from "@/context/CartContext"

const MealCard = ({ meal }: { meal: Meal }) => {
  const { cart, addToCart, increment, decrement } = useCart()
  const cartItem = cart.find(item => item.name === meal.name)

  return (
    <div className="bg-white rounded-xl shadow-md p-5 transition-transform hover:scale-105 hover:shadow-lg animate-fadeIn">
      <h3 className="text-xl font-heading mb-2">{meal.name}</h3>
      <p className="text-sm text-gray-600">Price: ₹{meal.price}</p>
      <p className={`mt-1 text-sm font-semibold ${meal.isVegan ? "text-greenplate-dark" : "text-red-500"}`}>
        {meal.isVegan ? "Vegan 🌱" : "Non-Veg 🍗"}
      </p>

      {cartItem ? (
        <div className="flex items-center gap-2 mt-4">
          <button onClick={() => decrement(meal.name)} className="px-3 py-1 rounded-full bg-red-100 hover:bg-red-200">−</button>
          <span>{cartItem.quantity}</span>
          <button onClick={() => increment(meal.name)} className="px-3 py-1 rounded-full bg-greenplate-light hover:bg-greenplate-dark hover:text-white">+</button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(meal)}
          className="mt-4 px-4 py-2 bg-greenplate-dark text-white rounded-full hover:bg-green-800"
        >
          Add to Cart
        </button>
      )}
    </div>
  )
}

export default MealCard
