"use client"

import Header from "@/components/header"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Leaf, Menu, BarChart2, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  // Sample data - in a real app, this would come from your database
  const environmentalData = [
    { name: 'Jan', co2Saved: 34, waterSaved: 1200, landSaved: 21 },
    { name: 'Feb', co2Saved: 42, waterSaved: 1800, landSaved: 28 },
    { name: 'Mar', co2Saved: 45, waterSaved: 2000, landSaved: 32 },
    { name: 'Apr', co2Saved: 53, waterSaved: 2400, landSaved: 39 },
    { name: 'May', co2Saved: 49, waterSaved: 2100, landSaved: 35 },
    { name: 'Jun', co2Saved: 60, waterSaved: 2700, landSaved: 45 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Duplicate Header in White */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/menu" className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span className="text-xl font-semibold text-gray-800 font-sans">
              Green Plate
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-5">
            <Link 
              href="/menu" 
              className="text-xs font-medium text-gray-600 hover:text-green-600 flex items-center gap-1"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Menu</span>
            </Link>
            <Link 
              href="/dashboard" 
              className="text-xs font-medium text-green-600 flex items-center gap-1"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          </nav>

          <Link href="/login">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs px-3 flex items-center gap-1.5 border-gray-200 text-gray-700 hover:text-green-600 hover:border-green-200 bg-white/70"
            >
              <User className="h-3.5 w-3.5" />
              Sign In
            </Button>
          </Link>
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Environmental Impact Dashboard</h1>
        
        {/* Impact Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-500 mb-2">CO₂ Emissions Saved</h3>
            <p className="text-4xl font-bold text-green-600">283kg</p>
            <p className="text-sm text-gray-500 mt-2">Equivalent to planting 14 trees</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-500 mb-2">Water Preserved</h3>
            <p className="text-4xl font-bold text-green-600">12,200L</p>
            <p className="text-sm text-gray-500 mt-2">Equal to 203 showers</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-500 mb-2">Land Conserved</h3>
            <p className="text-4xl font-bold text-green-600">200m²</p>
            <p className="text-sm text-gray-500 mt-2">Size of a tennis court</p>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-6">Your Environmental Impact Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={environmentalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="co2Saved" name="CO₂ Saved (kg)" fill="#059669" />
                <Bar dataKey="waterSaved" name="Water Saved (L)" fill="#0ea5e9" />
                <Bar dataKey="landSaved" name="Land Saved (m²)" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Dietary Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Your Dietary Choices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-green-50">
              <div className="text-3xl font-bold text-green-600 mb-2">68%</div>
              <div className="text-sm text-gray-600">Plant-Based Meals</div>
            </div>
            <div className="p-4 rounded-lg bg-amber-50">
              <div className="text-3xl font-bold text-amber-600 mb-2">22%</div>
              <div className="text-sm text-gray-600">Vegetarian Meals</div>
            </div>
            <div className="p-4 rounded-lg bg-orange-50">
              <div className="text-3xl font-bold text-orange-600 mb-2">10%</div>
              <div className="text-sm text-gray-600">Non-Vegetarian Meals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
