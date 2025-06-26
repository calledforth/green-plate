"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { XCircle, Trash2, Plus, Minus, ShoppingCart, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, getTotalItems, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Group cart items by restaurant
  const groupedCart = cart.reduce((groups, item) => {
    const restaurantName = item.restaurantName || 'Other Items'
    if (!groups[restaurantName]) {
      groups[restaurantName] = []
    }
    groups[restaurantName].push(item)
    return groups
  }, {} as Record<string, typeof cart>)

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
      : item.price
    return sum + (price * item.quantity)
  }, 0)

  // Format price to 2 decimal places
  const formattedTotal = `$${totalPrice.toFixed(2)}`

  // Handle clear cart with confirmation
  const handleClearCart = () => {
    clearCart()
    toast.success("Cart cleared", {
      description: "All items have been removed from your cart."
    })
  }

  // Navigate to dashboard
  const goToDashboard = () => {
    onClose()
    router.push('/dashboard')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-zinc-900 shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h2 className="text-lg font-medium dark:text-white">Your Cart</h2>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded-full px-2 py-0.5">
                  {getTotalItems()} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Your cart is empty</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Add some items to get started!</p>
                  <Button 
                    onClick={onClose}
                    variant="outline" 
                    className="border-green-200 text-green-600 hover:bg-green-50 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-900/20"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedCart).map(([restaurantName, items]) => (
                    <div key={restaurantName} className="space-y-3">
                      {/* Restaurant Header */}
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-zinc-800">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm">{restaurantName}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({items.length} item{items.length !== 1 ? 's' : ''})
                        </span>
                      </div>
                      
                      {/* Restaurant Items */}
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div 
                            key={`cart-item-${item.id}`}
                            className="flex gap-3 p-3 border border-gray-100 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-800"
                          >
                            {item.image && (
                              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-gray-900 dark:text-white truncate text-sm">{item.name}</h4>
                                <span className="text-gray-900 dark:text-white font-medium text-sm">
                                  ${typeof item.price === 'string' 
                                    ? parseFloat(item.price.replace(/[^0-9.]/g, '')).toFixed(2) 
                                    : item.price.toFixed(2)}
                                </span>
                              </div>
                              
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                {item.dietaryType === 'vegan' ? '🌱 Vegan' : 
                                  item.dietaryType === 'vegetarian' ? '🥬 Vegetarian' : '🍗 Non-Vegetarian'}
                              </p>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      if (item.quantity > 1) {
                                        updateQuantity(item.id, item.quantity - 1)
                                      } else {
                                        removeFromCart(item.id)
                                      }
                                    }}
                                    className="w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-medium text-sm dark:text-white min-w-[1.5rem] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-right pt-2 border-t border-gray-100 dark:border-zinc-800">
                    <button
                      onClick={handleClearCart}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 underline transition-colors"
                    >
                      Clear entire cart
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer - Total & Checkout */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 dark:border-zinc-800">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Total</span>
                  <span className="font-medium dark:text-white">{formattedTotal}</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={goToDashboard}
                    className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 dark:bg-green-700 dark:hover:bg-green-600"
                  >
                    <BarChart className="w-4 h-4" />
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
