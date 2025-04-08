"use client"
import Header from "@/components/Header"
import MenuSection from "@/components/MenuSection"
import Dashboard from "@/components/Dashboard"
import { useState } from "react"

export default function Home() {
  const [orderCount, setOrderCount] = useState(0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-greenplate-light to-white text-gray-900 font-body">
      <Header />
      <MenuSection onOrderCountChange={setOrderCount} />
      <Dashboard orderCount={orderCount} />
      <footer className="text-center text-sm text-gray-500 py-6">© 2025 GreenPlate. All rights reserved.</footer>
    </main>
  )
}
