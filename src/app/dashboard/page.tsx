"use client"

import { useCart } from "@/context/CartContext"
import { useMemo, useState } from "react"
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const Dashboard = () => {
  const { cart } = useCart()
  const [timeFilter, setTimeFilter] = useState("month") // month, year, custom

  // Calculate metrics from cart data
  const totalMeals = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalCO2 = cart.reduce((acc, item) => acc + item.quantity * 2, 0)
  const veganMeals = cart.filter((item) => item.isVegan).reduce((acc, item) => acc + item.quantity, 0)
  const veganPercent = totalMeals ? Math.round((veganMeals / totalMeals) * 100) : 0

  // Create data for the area chart - dynamically from cart items
  const areaChartData = useMemo(() => {
    // Sort by CO2 impact (highest first) to create the stacked area effect
    return [...cart]
      .sort((a, b) => b.quantity * 2 - a.quantity * 2)
      .map((item, index) => ({
        name: item.name,
        value: item.quantity * 2, // CO2 impact
        color: getColorForIndex(index),
      }))
  }, [cart])

  // Create data for the monthly line chart
  const monthlyData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
    // Generate some random but consistent data for the line chart
    return months.map((month) => ({
      month,
      co2: Math.floor(Math.random() * 200) + 100,
    }))
  }, [])

  // Create recommendations based on cart data
  const recommendations = useMemo(() => {
    const baseRecommendations = [
      {
        number: "01",
        title: "Choose plant-based",
        description: "meals more often to reduce your carbon footprint",
      },
      {
        number: "02",
        title: "Reduce food waste",
        description: "by planning meals and storing food properly",
      },
      {
        number: "03",
        title: "Buy local and seasonal",
        description: "to minimize transportation emissions",
      },
    ]

    // If user has few vegan meals, suggest more
    if (veganPercent < 30) {
      baseRecommendations[0] = {
        number: "01",
        title: "Increase plant-based",
        description: `meals from ${veganPercent}% to at least 30% of your diet`,
      }
    }

    return baseRecommendations
  }, [cart, veganPercent])

  // Function to get gradient colors for different food items
  function getColorForIndex(index: number) {
    const colors = [
      { main: "#5D4B73", id: "colorFood1" }, // Purple
      { main: "#D48A9D", id: "colorFood2" }, // Pink
      { main: "#E6B89C", id: "colorFood3" }, // Orange
      { main: "#9DCDC0", id: "colorFood4" }, // Teal
      { main: "#77ACA2", id: "colorFood5" }, // Darker teal
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="min-h-screen bg-[#f5f2eb]">
      <main className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-serif font-medium text-[#333]">Your footprint</h1>

          <div className="flex gap-2">
            <button
              className={cn(
                "px-4 py-2 text-sm border border-[#e5e1d8] rounded",
                timeFilter === "year" ? "bg-[#e9e5dc]" : "bg-white",
              )}
              onClick={() => setTimeFilter("year")}
            >
              Last Year
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm border border-[#e5e1d8] rounded",
                timeFilter === "custom" ? "bg-[#e9e5dc]" : "bg-white",
              )}
              onClick={() => setTimeFilter("custom")}
            >
              Custom range data
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm border border-[#e5e1d8] rounded",
                timeFilter === "month" ? "bg-[#e9e5dc]" : "bg-white",
              )}
              onClick={() => setTimeFilter("month")}
            >
              Last month
            </button>
          </div>
        </div>

        {/* Area Chart */}
        <div className="mb-12 relative">
          <div className="absolute top-0 left-0 z-10">
            <div className="mb-1">Summary</div>
            <div className="text-6xl font-serif font-medium">{totalCO2}</div>
            <div className="text-sm text-[#777]">kg CO₂ eq</div>
            <div className="text-sm text-[#777]">Total amount of emissions</div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }} stackOffset="expand">
                <defs>
                  {areaChartData.map((item, index) => {
                    const color = getColorForIndex(index)
                    return (
                      <linearGradient key={color.id} id={color.id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color.main} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={color.main} stopOpacity={0.2} />
                      </linearGradient>
                    )
                  })}
                </defs>
                {areaChartData.map((entry, index) => {
                  const color = getColorForIndex(index)
                  return (
                    <Area
                      key={`area-${index}`}
                      type="monotone"
                      dataKey="value"
                      name={entry.name}
                      stackId="1"
                      stroke={color.main}
                      fill={`url(#${color.id})`}
                      fillOpacity={1}
                    />
                  )
                })}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-end gap-8 text-sm">
            {areaChartData.map((item, index) => (
              <div key={`legend-${index}`} className="flex flex-col items-center">
                <div>{item.name}</div>
                <div className="font-medium">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded border border-[#e5e1d8]">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <div>
                <h3 className="text-xl font-serif">How much of carbon footprint</h3>
                <p className="text-sm text-[#777]">you are producing in last month</p>
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    domain={[0, 500]}
                    ticks={[0, 150, 300, 500]}
                  />
                  <Line
                    type="monotone"
                    dataKey="co2"
                    stroke="#D48A9D"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#D48A9D" }}
                    activeDot={{ r: 6, fill: "#D48A9D" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center mt-2">
              <div className="text-sm font-medium">Your {totalCO2} kg CO²</div>
              <div className="text-xs text-[#777]">Avg. {Math.round(totalCO2 * 1.2)} kg CO²</div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded border border-[#e5e1d8]">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <div>
                <h3 className="text-xl font-serif">Lower your emissions by {Math.round(totalCO2 * 0.2)} kg</h3>
                <p className="text-sm text-[#777]">to respect the Paris agreement. This is how:</p>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              {recommendations.map((rec) => (
                <div key={rec.number} className="flex items-center border border-[#e5e1d8] rounded p-4">
                  <div className="text-5xl font-serif text-[#e5e1d8] mr-4">{rec.number}</div>
                  <div className="flex-1">
                    <span className="font-medium">{rec.title}</span> {rec.description}
                  </div>
                  <ChevronRight className="text-[#777]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Food Items Detail */}
        <div className="mt-12 bg-white p-6 rounded border border-[#e5e1d8]">
          <h3 className="text-xl font-serif mb-6">Your Food Items</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart.map((item, index) => {
              const color = getColorForIndex(index)
              return (
                <div
                  key={`item-${index}`}
                  className="p-4 rounded border border-[#e5e1d8] flex items-center"
                  style={{ borderLeftColor: color.main, borderLeftWidth: "4px" }}
                >
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-[#777]">
                      {item.quantity} {item.quantity > 1 ? "items" : "item"} • {item.isVegan ? "Vegan" : "Non-vegan"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.quantity * 2} kg</div>
                    <div className="text-xs text-[#777]">CO₂ eq</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
