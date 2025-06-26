"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Leaf, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

// Import local assets
import bgImage from "@/app/assets/chad-montano-eeqbbemH9-c-unsplash.jpg"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="min-h-screen w-full flex overflow-hidden">
      {/* Left Sidebar - Login Form */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-2/5 xl:w-1/3 bg-background dark:bg-card flex flex-col justify-center p-8 lg:p-12 relative z-10 lg:rounded-r-3xl"
      >
        <div className="max-w-md mx-auto w-full">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="bg-gradient-to-br from-slate-600 to-slate-800 p-2 rounded-md">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-medium text-foreground">Green Plate</h1>
          </motion.div>
          
          {/* Welcome Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-normal mb-3 text-foreground leading-tight">
              Sign <span className="italic font-light">In</span>
            </h2>
            <p className="text-muted-foreground text-sm font-normal leading-relaxed">
              A new way to experience and source your favorite organic meals
            </p>
          </motion.div>
          
          {/* Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            <div className="space-y-1">
              <Label htmlFor="email" className="text-foreground text-sm font-medium">
                Email Address
              </Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 px-3 bg-transparent border-2 border-white/30 rounded-md 
                  focus:border-green-500 focus:outline-none transition-all duration-300
                  hover:border-white/50 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:border-green-500"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="password" className="text-foreground text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-11 px-3 pr-10 bg-transparent border-2 border-white/30 rounded-md 
                    focus:border-green-500 focus:outline-none transition-all duration-300
                    hover:border-white/50 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:border-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border w-3 h-3" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium transition-colors">
                Forgot Password?
              </a>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 bg-transparent border-2 border-green-500/50 text-green-600 font-medium rounded-md 
                transition-all duration-300 hover:bg-green-500 hover:text-white hover:border-green-500
                dark:text-green-400 dark:border-green-400/50 dark:hover:bg-green-600 dark:hover:text-white
                mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </motion.form>
          
          {/* Sign Up Link */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <a href="#" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium transition-colors">
                Sign up
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Right Side - Single Background Image with Grain Blur Effect */}
      <div className="hidden lg:flex w-3/5 xl:w-2/3 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src={bgImage}
            alt="Delicious organic food"
            fill
            className="object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Grain Blur Effect Overlay */}
        <div className="absolute inset-0">
          {/* Base grain texture */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Subtle blur overlay */}
          <div 
            className="absolute inset-0 backdrop-blur-[0.5px] opacity-60"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)'
            }}
          />
          
          {/* Film grain effect */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' seed='1'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.4'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay'
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center text-white p-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center max-w-lg"
          >
            <h3 className="text-4xl md:text-5xl font-normal mb-6 leading-tight">
              Sustainable <span className="italic font-light">dining</span>
              <br />
              <span className="italic font-light text-3xl md:text-4xl">for a better tomorrow</span>
            </h3>
            <p className="text-lg opacity-90 leading-relaxed mb-8 font-normal">
              Join our community of eco-conscious food lovers and make a positive impact on the planet with every meal.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-light text-green-400 mb-2">12k+</div>
                <div className="text-sm opacity-80">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-light text-green-400 mb-2">50k+</div>
                <div className="text-sm opacity-80">Meals Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-light text-green-400 mb-2">15t</div>
                <div className="text-sm opacity-80">CO₂ Saved</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}