"use client"
import { useCart } from "@/context/CartContext"

const Dashboard = () => {
  const { cart } = useCart()
  const co2Saved = cart.reduce((acc, item) => acc + item.quantity * 2, 0)

  return (
    <section className="py-12 px-6 bg-gradient-to-br from-greenplate-light via-white to-greenplate/10 rounded-t-3xl mt-16 shadow-inner">
      <h2 className="text-3xl font-heading text-center mb-6 text-greenplate-dark">Your Dashboard</h2>
      <p className="text-center text-xl mb-10 font-medium text-gray-700">
        CO₂ Saved: <span className="text-greenplate-dark font-bold">{co2Saved} kg</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cart.map((item, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-4">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-sm">CO₂ Saved: {item.quantity * 2} kg</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Dashboard
