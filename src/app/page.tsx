"use client"
import Header from "@/components/Header"
import MenuSection from "@/components/MenuSection"
import Dashboard from "@/components/Dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-greenplate-light to-white text-gray-900 font-body">
      <Header />
      <MenuSection />
      <Dashboard />
      <footer className="text-center text-sm text-gray-500 py-6">
        © 2025 GreenPlate. All rights reserved.
      </footer>
    </main>
  )
}
