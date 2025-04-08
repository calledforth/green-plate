"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt with:", email)
    // In a real app, you would authenticate here
    router.push("/menu")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative py-12 px-4 sm:px-6 lg:px-8" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=2071&auto=format&fit=crop')" }}>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <div className="text-center">
            <div className="mx-auto h-48 w-full relative mb-6 rounded-t-lg overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop" 
                alt="Fresh food" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Green Plate</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Sign in to access sustainable, delicious meals that are good for you and the planet.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 rounded border-gray-300"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
            >
              Sign in
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}