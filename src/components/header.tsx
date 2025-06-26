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
  
  // Hide header on login page and landing page
  if (pathname === "/login" || pathname === "/") {
    return null
  }
  
  return (
    <header className="bg-white/80 dark:bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200/50 dark:border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-green-600 p-1.5 rounded-lg group-hover:bg-green-700 transition-colors">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-foreground font-sans">
            Green Plate
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/menu" 
              className="text-sm font-medium text-gray-600 hover:text-green-600 dark:text-muted-foreground dark:hover:text-green-400 flex items-center gap-2 transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </Link>
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-gray-600 hover:text-green-600 dark:text-muted-foreground dark:hover:text-green-400 flex items-center gap-2 transition-colors"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-muted transition-colors"
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
              className="text-sm px-4 py-2 flex items-center gap-2 border-gray-200 text-gray-700 hover:text-green-600 hover:border-green-200 hover:bg-green-50 bg-white dark:bg-card dark:border-border dark:text-foreground dark:hover:text-green-400 dark:hover:border-green-600 dark:hover:bg-green-950/20 transition-colors"
            >
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
