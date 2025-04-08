"use client"

// components/Header.tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, User, BarChart2, Leaf, Sun, Moon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "@/context/ThemeContext"

export default function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  
  // Hide header on login page
  if (pathname === "/login") {
    return null
  }
  
  return (
    <header className="bg-transparent backdrop-blur-sm sticky top-0 z-10 dark:bg-black/80 dark:border-b dark:border-zinc-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600 dark:text-green-500" />
          <span className="text-xl font-semibold text-gray-800 dark:text-white font-sans">
            Green Plate
          </span>
        </Link>
        
        <nav className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-5">
            <Link 
              href="/menu" 
              className="text-xs font-medium text-gray-600 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 flex items-center gap-1"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Menu</span>
            </Link>
            <Link 
              href="/dashboard" 
              className="text-xs font-medium text-gray-600 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 flex items-center gap-1"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full mr-2 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Link href="/login">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs px-3 flex items-center gap-1.5 border-gray-200 text-gray-700 hover:text-green-600 hover:border-green-200 bg-white/70 dark:bg-black/70 dark:border-zinc-800 dark:text-white dark:hover:text-green-400 dark:hover:border-green-900"
            >
              <User className="h-3.5 w-3.5" />
              Sign In
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
