"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Leaf } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // In a real app, you would validate credentials here
    // For now, just simulate a login
    setTimeout(() => {
      setIsLoading(false)
      router.push('/menu') // Redirect to menu page after login
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f2eb] to-[#FFF5ED] dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="grid gap-12 w-full max-w-5xl lg:grid-cols-2">
        {/* Left side: Login Form */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="h-6 w-6 text-green-600 dark:text-green-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Green Plate</h1>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Welcome back</h2>
            <p className="text-gray-600 dark:text-gray-400">Sign in to continue with your eco-conscious food journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                <a href="#" className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className={cn(
                  "w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors",
                  "dark:bg-green-700 dark:hover:bg-green-600"
                )}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a href="#" className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">
                Sign up
              </a>
            </p>
          </div>
        </div>
        
        {/* Right side: Image and info */}
        <div className="hidden lg:flex flex-col justify-center relative">
          <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-6">
            <Image 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop" 
              alt="Eco-friendly food"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-bold mb-1">Eco-Conscious Dining</h3>
              <p className="text-sm opacity-90">Reduce your carbon footprint with every delicious meal</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <Leaf className="h-5 w-5 text-green-600 dark:text-green-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">Plant-based Options</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Explore our delicious vegan meals</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <svg className="h-5 w-5 text-green-600 dark:text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">Track Your Impact</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">See your environmental footprint in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}