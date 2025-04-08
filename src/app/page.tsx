"use client"

import Image from "next/image"
import Link from "next/link"
import { Leaf, ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 relative">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Sustainable food for a healthier planet.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 mb-8">Eco-conscious meals to reduce your carbon footprint</p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Explore Menu
          </Link>
        </div>

        {/* Floating food illustrations */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <div className="relative w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop"
              alt="Vegetarian bowl"
              width={400}
              height={400}
              className="absolute right-20 top-20 rounded-2xl shadow-lg"
            />
            <div className="absolute left-20 top-10 bg-white dark:bg-zinc-900 p-2 rounded-full shadow-md">
              <Leaf className="w-8 h-8 text-green-500" />
            </div>
            <div className="absolute right-10 top-10 bg-white dark:bg-zinc-900 p-2 rounded-full shadow-md">
              <span className="text-green-600 dark:text-green-400 font-semibold text-sm">-2.4kg CO₂</span>
            </div>
            <div className="absolute right-40 bottom-20 bg-white dark:bg-zinc-900 p-2 rounded-full shadow-md">
              <span className="text-green-600 dark:text-green-400 font-semibold text-sm">+Protein</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-6 col-span-1 md:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 mb-2">Our Menu</h3>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Sustainable Choices</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Each meal shows its environmental impact</p>
            </div>
            <Link href="/menu" className="inline-flex items-center text-green-600 dark:text-green-400 font-medium">
              See Full Menu <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {menuHighlights.map((item, index) => (
            <div key={index} className="bg-gray-50 dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm">
              <div className="h-40 relative">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">{item.co2}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Options */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 dark:text-white">Why Choose Green Plate?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

// Use our actual menu items
const menuHighlights = [
  {
    title: "Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    co2: "1.0kg CO₂ saved",
  },
  {
    title: "Mediterranean Quinoa",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop",
    co2: "1.0kg CO₂ saved",
  },
  {
    title: "Asian Stir-Fry",
    image: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?q=80&w=2072&auto=format&fit=crop",
    co2: "2.1kg CO₂ saved",
  },
  {
    title: "Mexican Bowl",
    image: "https://images.unsplash.com/photo-1577424983047-0d25a5733d11?q=80&w=1974&auto=format&fit=crop",
    co2: "3.3kg CO₂ saved",
  }
]

import { Leaf as LeafIcon, Globe, Heart, Clock } from "lucide-react"

const benefits = [
  {
    title: "Eco-Friendly",
    description: "Lower carbon footprint",
    icon: Globe
  },
  {
    title: "Plant-Forward",
    description: "Delicious vegetarian options",
    icon: LeafIcon
  },
  {
    title: "Health-Conscious",
    description: "Nutritionally balanced meals",
    icon: Heart
  },
  {
    title: "Quick Service",
    description: "Ready in minutes",
    icon: Clock
  },
]
