"use client"

import { useCart } from "@/context/CartContext"
import { useMemo } from "react"
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChevronRight, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Dashboard = () => {
  const { cart } = useCart()

  // Calculate metrics from cart data using the simplified logic: number of items * 2
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
        value: item.quantity * 2, // CO2 impact = quantity * 2
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

  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce((acc, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price;
    return acc + (price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-[#f5f2eb] dark:bg-background">
      <div className="w-full h-screen flex flex-col md:flex-row">
        {/* Left Column - Food Items List with Checkout Button */}
        <div className="w-full md:w-1/4 xl:w-1/5 bg-white dark:bg-card border-r border-[#e5e1d8] dark:border-border flex flex-col h-screen">
          <div className="p-6 border-b border-[#e5e1d8] dark:border-gray-800">
            <h3 className="text-xl font-serif mb-1 dark:text-white">Your Cart</h3>
            <p className="text-sm text-[#777] dark:text-gray-400">{totalMeals} items · {totalCO2} kg CO₂</p>
          </div>
          
          <div className="flex-grow overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#f8f6f2] dark:bg-gray-800 flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8 text-[#aaa] dark:text-gray-500" />
                </div>
                <p className="text-[#777] dark:text-gray-400 mb-2">Your cart is empty</p>
                <a 
                  href="/menu" 
                  className="text-green-600 dark:text-green-500 text-sm font-medium hover:underline"
                >
                  Browse menu to add items
                </a>
              </div>
            ) : (
              <div className="divide-y divide-[#f5f2eb] dark:divide-gray-800">
                {cart.map((item, index) => {
                  const itemCO2 = item.quantity * 2; // Calculate CO2 for each item
                  const color = getColorForIndex(index)
                  return (
                    <div
                      key={`item-${index}`}
                      className="p-4 flex items-center hover:bg-[#f8f6f2] dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div 
                        className="w-2 h-12 rounded-full mr-3" 
                        style={{ backgroundColor: color.main }}
                      ></div>
                      <div className="flex-1">
                        <div className="font-medium dark:text-white">{item.name}</div>
                        <div className="text-sm text-[#777] dark:text-gray-400 flex justify-between">
                          <span>{item.quantity} × {item.price}</span>
                          <span className="font-medium">${(((typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price) || 0) * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="font-medium dark:text-white">{itemCO2} kg</div>
                        <div className="text-xs text-[#777] dark:text-gray-400">CO₂</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          
          {/* Checkout Section */}
          <div className="p-4 border-t border-[#e5e1d8] dark:border-gray-800 bg-[#f8f6f2] dark:bg-gray-800/30">
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#777] dark:text-gray-400">Subtotal:</span>
                <span className="font-medium dark:text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#777] dark:text-gray-400">Total CO₂:</span>
                <span className="font-medium dark:text-white">{totalCO2} kg</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium py-5 rounded-lg shadow-sm"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </Button>
            
            <div className="text-center mt-2">
              <a 
                href="/menu" 
                className="text-sm text-green-600 dark:text-green-500 hover:underline"
              >
                Add more items
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Dashboard Content */}
        <div className="w-full md:w-3/4 xl:w-4/5 overflow-y-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-medium text-[#333] dark:text-white">Your Footprint</h1>
            </div>

            {/* Area Chart */}
            <div className="mb-8 relative bg-white dark:bg-gray-900 p-6 rounded-xl border border-[#e5e1d8] dark:border-gray-800 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-serif dark:text-white">CO₂ Emissions Overview</h3>
                <p className="text-sm text-[#777] dark:text-gray-400">Breakdown of your carbon footprint by food item</p>
              </div>
              
              <div className="absolute top-6 right-6 z-10 text-right">
                <div className="text-4xl font-serif font-medium dark:text-white">{totalCO2}</div>
                <div className="text-sm text-[#777] dark:text-gray-400">kg CO₂ eq</div>
                <div className="text-sm text-[#777] dark:text-gray-400">Total emissions</div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={areaChartData} 
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
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
                    <XAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12 }} 
                      className="dark:text-gray-400" 
                      height={0}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12 }} 
                      className="dark:text-gray-400" 
                      width={30}
                    />
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

              <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm dark:text-gray-300">
                {areaChartData.map((item, index) => {
                  const color = getColorForIndex(index)
                  return (
                    <div key={`legend-${index}`} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color.main }}></div>
                      <div>{item.name}</div>
                      <div className="font-medium">{item.value} kg</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Two Column Layout for Line Chart and Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Line Chart */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-[#e5e1d8] dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" className="dark:text-gray-400">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-serif dark:text-white">Monthly Emissions</h3>
                    <p className="text-sm text-[#777] dark:text-gray-400">Your carbon footprint over time</p>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} className="dark:text-gray-400" />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        domain={[0, 500]}
                        ticks={[0, 150, 300, 500]}
                        className="dark:text-gray-400"
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
                  <div className="text-sm font-medium dark:text-white">Your {totalCO2} kg CO₂</div>
                  <div className="text-xs text-[#777] dark:text-gray-400">Avg. {Math.round(totalCO2 * 1.2)} kg CO₂</div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-[#e5e1d8] dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" className="dark:text-gray-400">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-serif dark:text-white">Lower your emissions by {Math.round(totalCO2 * 0.2)} kg</h3>
                    <p className="text-sm text-[#777] dark:text-gray-400">to respect the Paris agreement. This is how:</p>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  {recommendations.map((rec) => (
                    <div key={rec.number} className="flex items-center border border-[#e5e1d8] dark:border-gray-800 rounded-lg p-4 dark:bg-gray-800 hover:bg-[#f8f6f2] dark:hover:bg-gray-800/70 transition-colors cursor-pointer">
                      <div className="text-5xl font-serif text-[#e5e1d8] dark:text-gray-700 mr-4">{rec.number}</div>
                      <div className="flex-1 dark:text-gray-300">
                        <span className="font-medium dark:text-white">{rec.title}</span> {rec.description}
                      </div>
                      <ChevronRight className="text-[#777] dark:text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
