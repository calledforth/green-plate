"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

// Define the cart item type
type CartItem = {
  id: string | number
  name: string
  quantity: number
  isVegan: boolean
  price?: number
}

type CartContextType = {
  cart: CartItem[]
  setCart: (cart: CartItem[]) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string | number) => void
  updateQuantity: (id: string | number, quantity: number) => void
}

const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([
    // Sample data for testing
    { id: 1, name: "Vegan Burger", quantity: 2, isVegan: true },
    { id: 2, name: "Chicken Salad", quantity: 1, isVegan: false },
    { id: 3, name: "Tofu Stir Fry", quantity: 3, isVegan: true },
    { id: 4, name: "Beef Tacos", quantity: 2, isVegan: false },
    { id: 5, name: "Vegetable Curry", quantity: 1, isVegan: true },
  ])

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem,
        ),
      )
    } else {
      setCart([...cart, item])
    }
  }

  const removeFromCart = (id: string | number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
