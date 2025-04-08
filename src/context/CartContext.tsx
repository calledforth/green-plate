"use client"
import { createContext, useContext, useState, ReactNode } from "react"

export type Meal = {
  name: string
  price: number
  isVegan: boolean
}

type CartItem = Meal & { quantity: number }

type CartContextType = {
  cart: CartItem[]
  addToCart: (meal: Meal) => void
  increment: (name: string) => void
  decrement: (name: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (meal: Meal) => {
    setCart(prev => {
      const exists = prev.find(item => item.name === meal.name)
      if (exists) return prev
      return [...prev, { ...meal, quantity: 1 }]
    })
  }

  const increment = (name: string) => {
    setCart(prev =>
      prev.map(item =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decrement = (name: string) => {
    setCart(prev =>
      prev
        .map(item =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, increment, decrement }}>
      {children}
    </CartContext.Provider>
  )
}
