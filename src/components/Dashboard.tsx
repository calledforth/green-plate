// components/Dashboard.tsx
"use client"
import { useState } from "react"

const Dashboard = ({ orderCount }: { orderCount: number }) => {
  const [subscribed, setSubscribed] = useState(false)
  const co2Saved = orderCount * 2 // 2kg per meal

  return (
    <section className="py-12 px-6 bg-gradient-to-br from-greenplate-light via-white to-greenplate/10 rounded-t-3xl mt-16 shadow-inner">
      <h2 className="text-3xl font-heading text-center mb-4 text-greenplate-dark">Your Dashboard</h2>
      <p className="text-center text-xl mb-6 font-medium text-gray-700">
        CO₂ Saved: <span className="text-greenplate-dark font-bold">{co2Saved} kg</span>
      </p>
      <div className="flex justify-center">
        <button
          onClick={() => setSubscribed(!subscribed)}
          className={`px-6 py-2 rounded-full text-white font-semibold transition-all ${
            subscribed ? "bg-greenplate-dark/60" : "bg-greenplate-dark"
          }`}
        >
          {subscribed ? "Subscribed ✅" : "Subscribe 🌿"}
        </button>
      </div>
    </section>
  )
}

export default Dashboard
