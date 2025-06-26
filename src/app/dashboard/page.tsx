"use client"

import { useMemo } from "react"
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Bar, BarChart, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, Leaf, Flame, MapPin, Star, Calendar, Award, Users, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

const Dashboard = () => {
  // Mock data for order history and analytics
  const orderHistory = useMemo(() => [
    { month: "Jan", orders: 12, co2Saved: 24, calories: 18500, spending: 340 },
    { month: "Feb", orders: 18, co2Saved: 36, calories: 21800, spending: 425 },
    { month: "Mar", orders: 15, co2Saved: 30, calories: 19200, spending: 380 },
    { month: "Apr", orders: 22, co2Saved: 44, calories: 26400, spending: 520 },
    { month: "May", orders: 28, co2Saved: 56, calories: 31200, spending: 650 },
    { month: "Jun", orders: 25, co2Saved: 50, calories: 29000, spending: 590 },
    { month: "Jul", orders: 32, co2Saved: 64, calories: 35600, spending: 745 },
    { month: "Aug", orders: 29, co2Saved: 58, calories: 33400, spending: 680 },
    { month: "Sep", orders: 26, co2Saved: 52, calories: 30800, spending: 620 },
    { month: "Oct", orders: 31, co2Saved: 62, calories: 34200, spending: 720 },
    { month: "Nov", orders: 35, co2Saved: 70, calories: 38500, spending: 810 },
    { month: "Dec", orders: 42, co2Saved: 84, calories: 42000, spending: 920 }
  ], [])

  const topRestaurants = [
    { name: "Green Garden Bistro", orders: 45, percentage: 28, color: "#10B981" },
    { name: "Fresh & Local", orders: 38, percentage: 24, color: "#F59E0B" },
    { name: "Eco Eats", orders: 32, percentage: 20, color: "#EF4444" },
    { name: "Plant Paradise", orders: 28, percentage: 18, color: "#8B5CF6" },
    { name: "Others", orders: 16, percentage: 10, color: "#6B7280" }
  ]

  const topFoods = [
    { name: "Quinoa Buddha Bowl", orders: 28, calories: 450, co2: 1.2 },
    { name: "Avocado Toast", orders: 24, calories: 320, co2: 0.8 },
    { name: "Green Smoothie", orders: 22, calories: 180, co2: 0.5 },
    { name: "Chickpea Curry", orders: 19, calories: 380, co2: 1.0 },
    { name: "Veggie Burger", orders: 17, calories: 420, co2: 1.5 }
  ]

  const dietaryData = [
    { name: "Vegan", value: 65, color: "#10B981" },
    { name: "Vegetarian", value: 25, color: "#F59E0B" },
    { name: "Non-Vegetarian", value: 10, color: "#EF4444" }
  ]

  // Calculate totals
  const totalOrders = orderHistory.reduce((sum, month) => sum + month.orders, 0)
  const totalCO2Saved = orderHistory.reduce((sum, month) => sum + month.co2Saved, 0)
  const totalCalories = orderHistory.reduce((sum, month) => sum + month.calories, 0)
  const totalSpent = orderHistory.reduce((sum, month) => sum + month.spending, 0)
  const avgOrderValue = totalSpent / totalOrders

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-zinc-950 dark:to-zinc-900">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Food Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your sustainable eating journey and environmental impact</p>
          </div>
          
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white dark:bg-zinc-900 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalOrders}</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-zinc-900 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">CO₂ Saved</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalCO2Saved}<span className="text-lg"> kg</span></p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Great progress!
                </p>
                      </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
          </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-zinc-900 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Calories Consumed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{(totalCalories / 1000).toFixed(0)}<span className="text-lg">k</span></p>
                <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center mt-1">
                  <Target className="w-3 h-3 mr-1" />
                  Within healthy range
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-zinc-900 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Order Value</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${avgOrderValue.toFixed(0)}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5% vs last month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order History Chart */}
          <Card className="p-6 bg-white dark:bg-zinc-900 border-0 shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Order History</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Monthly ordering patterns over the year</p>
            </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={orderHistory}>
                    <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                          </linearGradient>
                    </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} className="dark:text-gray-400" />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} className="dark:text-gray-400" />
                        <Area
                          type="monotone"
                    dataKey="orders" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                          fillOpacity={1}
                    fill="url(#colorOrders)" 
                        />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
          </Card>

          {/* Environmental Impact */}
          <Card className="p-6 bg-white dark:bg-zinc-900 border-0 shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Environmental Impact</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">CO₂ emissions saved through sustainable choices</p>
            </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderHistory}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} className="dark:text-gray-400" />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} className="dark:text-gray-400" />
                      <Line
                        type="monotone"
                    dataKey="co2Saved" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#10B981" }}
                    activeDot={{ r: 6, fill: "#10B981" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
            </div>
          </Card>
                </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Restaurants */}
          <Card className="p-6 bg-white dark:bg-zinc-900 border-0 shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Favorite Restaurants</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Most ordered from this year</p>
            </div>
            <div className="space-y-4">
              {topRestaurants.map((restaurant, index) => (
                <div key={restaurant.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{restaurant.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{restaurant.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{restaurant.percentage}%</p>
                    <div className="w-16 h-2 bg-gray-200 dark:bg-zinc-700 rounded-full mt-1">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${restaurant.percentage}%`, 
                          backgroundColor: restaurant.color 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              </div>
          </Card>

          {/* Top Foods */}
          <Card className="p-6 bg-white dark:bg-zinc-900 border-0 shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Most Ordered Foods</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your go-to sustainable meals</p>
            </div>
            <div className="space-y-4">
              {topFoods.map((food, index) => (
                <div key={food.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{food.name}</p>
                    <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400 mt-1">
                      <span>{food.orders} orders</span>
                      <span>{food.calories} cal</span>
                      <span>{food.co2} kg CO₂</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-sm font-bold text-green-600 dark:text-green-400">
                    {index + 1}
                  </div>
                </div>
              ))}
                      </div>
          </Card>

          {/* Dietary Breakdown */}
          <Card className="p-6 bg-white dark:bg-zinc-900 border-0 shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Dietary Choices</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your food preference breakdown</p>
                    </div>
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dietaryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dietaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {dietaryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
