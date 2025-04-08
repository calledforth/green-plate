// components/Header.tsx
import React from "react"

const Header = () => {
  return (
    <header className="w-full bg-greenplate-light/60 backdrop-blur-md shadow-sm py-4 px-8 flex items-center justify-between">
      <div className="text-2xl font-heading text-greenplate-dark tracking-tight">🌿 GreenPlate</div>
      <nav className="space-x-6 text-lg font-medium">
        <button className="hover:text-greenplate-dark transition-colors">Menu</button>
        <button className="hover:text-greenplate-dark transition-colors">Dashboard</button>
      </nav>
    </header>
  )
}

export default Header
