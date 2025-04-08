// components/MealCard.tsx
type Meal = {
    name: string
    price: number
    isVegan: boolean
  }
  
  const MealCard = ({ meal }: { meal: Meal }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-5 transition-transform hover:scale-105 hover:shadow-lg animate-fadeIn">
        <h3 className="text-xl font-heading mb-2">{meal.name}</h3>
        <p className="text-sm text-gray-600">Price: ₹{meal.price}</p>
        <p className={`mt-1 text-sm font-semibold ${meal.isVegan ? "text-greenplate-dark" : "text-red-500"}`}>
          {meal.isVegan ? "Vegan 🌱" : "Non-Veg 🍗"}
        </p>
      </div>
    )
  }
  
  export default MealCard
  