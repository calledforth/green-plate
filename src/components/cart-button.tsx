"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CartButtonProps {
  onClick: () => void
}

export function CartButton({ onClick }: CartButtonProps) {
  const { getTotalItems } = useCart()
  const [itemCount, setItemCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Set mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update item count and trigger animation when it changes
  useEffect(() => {
    if (mounted) {
      const count = getTotalItems()
      if (count !== itemCount) {
        setIsAnimating(true)
        setItemCount(count)
        
        // Reset animation state after animation completes
        const timer = setTimeout(() => {
          setIsAnimating(false)
        }, 300)
        
        return () => clearTimeout(timer)
      }
    }
  }, [getTotalItems, itemCount, mounted])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full shadow-lg p-3 flex items-center justify-center z-30"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={itemCount}
              initial={isAnimating ? { y: -10, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {itemCount}
            </motion.span>
          </AnimatePresence>
        </div>
      )}
    </motion.button>
  )
}
