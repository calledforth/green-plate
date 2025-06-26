"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { XCircle, Trash2, Plus, Minus, ShoppingCart, BarChart, ArrowLeft, CreditCard, Smartphone, Wallet, Check, Loader2, MapPin, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

// Checkout flow steps
type CheckoutStep = 'cart' | 'payment' | 'processing' | 'confirmation'

interface PaymentMethod {
  id: string
  name: string
  icon: any
  description: string
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, getTotalItems, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart')
  const [selectedPayment, setSelectedPayment] = useState<string>('credit-card')
  const [orderNumber, setOrderNumber] = useState<string>('')
  const router = useRouter()

  // Payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'digital-wallet',
      name: 'Digital Wallet',
      icon: Smartphone,
      description: 'Apple Pay, Google Pay'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet,
      description: 'Pay with your PayPal account'
    }
  ]

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset to cart step when drawer opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentStep('cart')
    }
  }, [isOpen])

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

  // Calculate pricing
  const subtotal = cart.reduce((sum, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
      : item.price
    return sum + (price * item.quantity)
  }, 0)

  const deliveryFee = subtotal > 25 ? 0 : 3.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + deliveryFee + tax

  // Handle clear cart with confirmation
  const handleClearCart = () => {
    clearCart()
    toast.success("Cart cleared", {
      description: "All items have been removed from your cart."
    })
  }

  // Generate order number
  const generateOrderNumber = () => {
    return `GP${Date.now().toString().slice(-6)}`
  }

  // Handle payment processing
  const handlePayment = async () => {
    setCurrentStep('processing')
    const orderNum = generateOrderNumber()
    setOrderNumber(orderNum)
    
    // Simulate payment processing
    setTimeout(() => {
      setCurrentStep('confirmation')
      toast.success("Payment successful!", {
        description: `Order ${orderNum} has been placed successfully.`
      })
    }, 3000)
  }

  // Handle order completion
  const handleOrderComplete = () => {
    clearCart()
    setCurrentStep('cart')
    onClose()
    router.push('/menu')
    toast.success("Thank you for your order!", {
      description: "Redirecting you back to the menu."
    })
  }

  // Close handler that resets state
  const handleClose = () => {
    setCurrentStep('cart')
    onClose()
  }

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'cart':
        return (
          <>
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
                    onClick={handleClose}
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
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                    <span className="dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Delivery</span>
                    <span className="dark:text-white">
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Tax</span>
                    <span className="dark:text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium pt-2 border-t">
                    <span className="dark:text-white">Total</span>
                    <span className="dark:text-white">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => setCurrentStep('payment')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Proceed to Payment
                </Button>
              </div>
            )}
          </>
        )

      case 'payment':
        return (
          <>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 min-h-0">
              {/* Left Column - Comprehensive Order Details */}
              <div className="lg:col-span-2 p-4 border-r border-gray-100 dark:border-zinc-800 overflow-y-auto">
                <div className="space-y-4">
                  {Object.entries(groupedCart).map(([restaurantName, items]) => (
                    <div key={restaurantName} className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-100 dark:border-zinc-800 overflow-hidden">
                      {/* Restaurant Header */}
                      <div className="bg-gray-50 dark:bg-zinc-800/50 px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{restaurantName}</h4>
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded-full px-2.5 py-1">
                            {items.length} item{items.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      
                      {/* Restaurant Items */}
                      <div className="p-4">
                        <div className="grid gap-4">
                          {items.map((item, index) => {
                            const itemPrice = typeof item.price === 'string' 
                              ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
                              : item.price
                            const itemTotal = itemPrice * item.quantity
                            const co2Impact = item.quantity * 2
                            
                            return (
                              <div key={`payment-item-${item.id}`} className="flex gap-4 p-3 bg-gray-50 dark:bg-zinc-800 rounded-md">
                                {/* Food Image */}
                                {item.image && (
                                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 shadow-sm">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                    <div className="absolute top-1.5 left-1.5 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                                      {item.quantity}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Food Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-semibold text-gray-900 dark:text-white truncate pr-2">
                                      {item.name}
                                    </h5>
                                    <div className="text-right flex-shrink-0">
                                      <div className="font-bold text-gray-900 dark:text-white">
                                        ${itemTotal.toFixed(2)}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-zinc-400">
                                        ${itemPrice.toFixed(2)} each
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Dietary Info */}
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                      item.dietaryType === 'vegan' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                        : item.dietaryType === 'vegetarian'
                                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                    }`}>
                                      {item.dietaryType === 'vegan' ? '🌱' : 
                                        item.dietaryType === 'vegetarian' ? '🥬' : '🍗'} {item.dietaryType.charAt(0).toUpperCase() + item.dietaryType.slice(1)}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                      🌍 {co2Impact} kg CO₂
                                    </span>
                                  </div>
                                  
                                  {/* Nutritional Info */}
                                  <div className="grid grid-cols-2 gap-x-4 text-xs">
                                    <div className="space-y-0.5">
                                      <div className="text-gray-500 dark:text-zinc-400">Nutrition (est.)</div>
                                      <div className="flex justify-between">
                                        <span className="dark:text-zinc-300">Calories:</span>
                                        <span className="font-medium dark:text-white">{Math.floor(itemPrice * 15 + 150)}kcal</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="dark:text-zinc-300">Protein:</span>
                                        <span className="font-medium dark:text-white">{Math.floor(itemPrice * 0.8 + 5)}g</span>
                                      </div>
                                    </div>
                                    <div className="space-y-0.5">
                                      <div className="text-gray-500 dark:text-zinc-400">Impact (est.)</div>
                                      <div className="flex justify-between">
                                        <span className="dark:text-zinc-300">Water:</span>
                                        <span className="font-medium dark:text-white">{Math.floor(co2Impact * 25)}L</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="dark:text-zinc-300">Land:</span>
                                        <span className="font-medium dark:text-white">{(co2Impact * 0.1).toFixed(1)}m²</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Environmental Summary */}
                  <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-4 rounded-lg border border-green-800/50">
                    <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                      🌱 Your Environmental Impact
                    </h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-green-300">
                          {cart.reduce((acc, item) => acc + item.quantity * 2, 0)} kg
                        </div>
                        <div className="text-xs text-green-400/80">CO₂ Emissions</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-300">
                          {cart.reduce((acc, item) => acc + item.quantity * 50, 0)} L
                        </div>
                        <div className="text-xs text-green-400/80">Water Usage</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-300">
                          {cart.filter(item => item.isVegan).reduce((acc, item) => acc + item.quantity, 0)}/{getTotalItems()}
                        </div>
                        <div className="text-xs text-green-400/80">Plant-based Items</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Payment Options */}
              <div className="p-4 bg-gray-50 dark:bg-zinc-950">
                <div className="sticky top-4">
                  <h4 className="text-lg font-semibold dark:text-white mb-4">Payment Details</h4>
                  
                  {/* Payment Methods */}
                  <div className="space-y-2 mb-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`p-3 border rounded-md cursor-pointer transition-all ${
                          selectedPayment === method.id
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <method.icon className="w-5 h-5 text-gray-600 dark:text-zinc-300" />
                          <div className="flex-1">
                            <div className="font-medium text-sm dark:text-white">{method.name}</div>
                            <div className="text-xs text-gray-500 dark:text-zinc-400">{method.description}</div>
                          </div>
                          {selectedPayment === method.id && (
                            <Check className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Summary */}
                  <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-3">
                    <h5 className="font-semibold dark:text-white border-b border-gray-200 dark:border-zinc-800 pb-2 mb-2">Order Summary</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="dark:text-zinc-400">Items ({getTotalItems()})</span>
                        <span className="dark:text-white">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="dark:text-zinc-400">Delivery</span>
                        <span className="dark:text-white">
                          {deliveryFee === 0 ? (
                            <span className="text-green-600 dark:text-green-400 font-medium">FREE</span>
                          ) : (
                            `$${deliveryFee.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="dark:text-zinc-400">Tax (8%)</span>
                        <span className="dark:text-white">${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-zinc-800 pt-3 mt-3">
                        <div className="flex justify-between text-base font-bold">
                          <span className="dark:text-white">Total</span>
                          <span className="text-green-600 dark:text-green-400">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Delivery Info */}
                  <div className="mt-4 p-3 bg-blue-500/10 rounded-md">
                    <div className="text-sm text-blue-200">
                      <div className="font-medium mb-1 flex items-center gap-2">🚚 Estimated Delivery: <span className="font-bold">30-45 minutes</span></div>
                      <div className="text-xs opacity-75">You'll receive SMS updates about your order</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fixed Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
              <div className="grid grid-cols-3 items-center">
                 <div className="col-span-2">
                    <Button
                      onClick={() => setCurrentStep('cart')}
                      variant="outline"
                      className="w-full max-w-xs"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Cart
                    </Button>
                </div>
                <div className="col-span-1">
                    <Button
                      onClick={handlePayment}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
                    >
                      Pay ${total.toFixed(2)}
                    </Button>
                </div>
              </div>
            </div>
          </>
        )

      case 'processing':
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-8 h-8 text-green-600 dark:text-green-400 animate-spin" />
            </div>
            <h3 className="text-xl font-medium dark:text-white mb-2">Processing Payment</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Please wait while we process your payment...</p>
            <div className="text-sm text-gray-400 dark:text-gray-500">
              This usually takes a few seconds
            </div>
          </div>
        )

      case 'confirmation':
        return (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                
                <div>
                  <h3 className="text-xl font-medium dark:text-white mb-2">Payment Successful!</h3>
                  <p className="text-gray-500 dark:text-gray-400">Your order has been placed successfully</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg text-left">
                  <h4 className="font-medium dark:text-white mb-3">Order Confirmation</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Order Number</span>
                      <span className="font-mono dark:text-white">{orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Total Paid</span>
                      <span className="dark:text-white">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Items Ordered</span>
                      <span className="dark:text-white">{getTotalItems()} items</span>
                    </div>
                      <div className="flex justify-between">
                      <span className="dark:text-gray-300">Estimated Delivery</span>
                      <span className="dark:text-white">30-45 minutes</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    📧 A confirmation email has been sent to your registered email address with order details and tracking information.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 dark:border-zinc-800">
              <Button
                onClick={handleOrderComplete}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )

      default:
        return null
    }
  }

  // Get step title
  const getStepTitle = () => {
    switch (currentStep) {
      case 'cart':
        return 'Your Cart'
      case 'payment':
        return 'Payment & Review'
      case 'processing':
        return 'Processing'
      case 'confirmation':
        return 'Order Confirmed'
      default:
        return 'Your Cart'
    }
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
            onClick={currentStep === 'processing' ? undefined : handleClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed right-0 top-0 h-full w-full ${
              currentStep === 'payment' || currentStep === 'confirmation' ? 'max-w-4xl' : 'max-w-md'
            } bg-white dark:bg-zinc-950 shadow-xl z-50 flex flex-col max-h-screen`}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {currentStep === 'cart' ? (
                  <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                )}
                <h2 className="text-lg font-medium dark:text-white">{getStepTitle()}</h2>
                {currentStep === 'cart' && (
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded-full px-2 py-0.5">
                    {getTotalItems()} items
                  </span>
                )}
              </div>
              {currentStep !== 'processing' && (
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col min-h-0"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
