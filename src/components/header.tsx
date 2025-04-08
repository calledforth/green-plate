"use client"

// components/Header.tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Menu, User, ShoppingCart, Leaf } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  
  // Hide header on login page
  if (pathname === "/login") {
    return null
  }
  
  return (
    <header className="bg-transparent backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          <span className="text-xl font-semibold text-gray-800 font-sans">
            Green Plate
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-5">
          <Link 
            href="/" 
            className="text-xs font-medium text-gray-600 hover:text-green-600 flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <Link 
            href="/menu" 
            className="text-xs font-medium text-gray-600 hover:text-green-600 flex items-center gap-1"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>Menu</span>
          </Link>
          <Link 
            href="/cart" 
            className="text-xs font-medium text-gray-600 hover:text-green-600 flex items-center gap-1"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Cart</span>
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
  )
}
