"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import FoodCard, { type DietaryType } from "@/components/food-card"
import { Button } from "@/components/ui/button"
import { 
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Salad, Beef, AlignJustify, Leaf, Star, Clock, MapPin, X, Share, ShoppingCart, Heart, Search, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import FoodSlideshow from "@/components/food-slideshow"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { CartButton } from "@/components/cart-button"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/context/CartContext"
import { toast } from "sonner"
// Food images for menu items
import foodImage1 from "@/app/assets/alex-munsell-Yr4n8O_3UPc-unsplash.jpg"
import foodImage2 from "@/app/assets/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg"
import foodImage3 from "@/app/assets/eaters-collective-ddZYOtZUnBk-unsplash.jpg"
import foodImage4 from "@/app/assets/chad-montano-MqT0asuoIcU-unsplash.jpg"
import foodImage5 from "@/app/assets/eaters-collective-12eHC6FxPyg-unsplash.jpg"
import foodImage6 from "@/app/assets/taylor-kiser-6RJct18G_3I-unsplash.jpg"
import foodImage7 from "@/app/assets/lily-banse--YHSwy6uqvk-unsplash.jpg"
import foodImage8 from "@/app/assets/victoria-shes-UC0HZdUitWY-unsplash.jpg"
import foodImage9 from "@/app/assets/odiseo-castrejon-1SPu0KT-Ejg-unsplash.jpg"
import foodImage10 from "@/app/assets/brooke-lark-R18ecx07b3c-unsplash.jpg"
import foodImage11 from "@/app/assets/anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg"
import foodImage12 from "@/app/assets/chad-montano-eeqbbemH9-c-unsplash.jpg"
import foodImage13 from "@/app/assets/anh-nguyen-kcA-c3f_3FE-unsplash.jpg"
import foodImage14 from "@/app/assets/alex-munsell-auIbTAcSH6E-unsplash.jpg"
import foodImage15 from "@/app/assets/joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg"

// Restaurant images
import restaurantImage1 from "@/app/assets/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg"
import restaurantImage2 from "@/app/assets/eaters-collective-ddZYOtZUnBk-unsplash.jpg"
import restaurantImage3 from "@/app/assets/chad-montano-MqT0asuoIcU-unsplash.jpg"
import restaurantImage4 from "@/app/assets/eaters-collective-12eHC6FxPyg-unsplash.jpg"
import restaurantImage5 from "@/app/assets/taylor-kiser-6RJct18G_3I-unsplash.jpg"
import restaurantImage6 from "@/app/assets/lily-banse--YHSwy6uqvk-unsplash.jpg"
import restaurantImage7 from "@/app/assets/victoria-shes-UC0HZdUitWY-unsplash.jpg"
import restaurantImage8 from "@/app/assets/odiseo-castrejon-1SPu0KT-Ejg-unsplash.jpg"
import restaurantImage9 from "@/app/assets/brooke-lark-R18ecx07b3c-unsplash.jpg"
import restaurantImage10 from "@/app/assets/anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg"
import restaurantImage11 from "@/app/assets/chad-montano-eeqbbemH9-c-unsplash.jpg"
import restaurantImage12 from "@/app/assets/anh-nguyen-kcA-c3f_3FE-unsplash.jpg"
import restaurantImage13 from "@/app/assets/alex-munsell-auIbTAcSH6E-unsplash.jpg"
import { StaticImageData } from "next/image"
import Image from "next/image"

interface MenuItem {
  id: number | string
  title: string
  price: string
  image?: StaticImageData
  dietaryType: DietaryType
  co2Saved: string
  isVegan?: boolean
  description?: string
  ingredients?: string[]
  calories?: number
  prepTime?: string
  difficulty?: string
}

interface Restaurant {
  id: number
  name: string
  image: StaticImageData
  rating: number
  deliveryTime: string
  category: string
  description: string
  menuItems: MenuItem[]
  cuisine: string
  specialties: string[]
}

interface RecentOrder {
  id: number
  restaurantName: string
  itemName: string
  image: StaticImageData
  price: string
  orderDate: string
}

// Sample images to use with our API data
const foodImages = [
  foodImage1,
  foodImage2,
  foodImage3,
  foodImage4,
  foodImage5,
  foodImage6,
  foodImage7,
  foodImage8,
  foodImage9,
  foodImage10,
  foodImage11,
  foodImage12,
  foodImage13,
  foodImage14,
  foodImage15,
]

// Restaurant-specific menu items
const restaurantMenuItems: { [key: number]: MenuItem[] } = {
  1: [ // Green Garden Bistro - Mediterranean
    { id: "gb1", title: "Mediterranean Bowl", price: "$14.99", dietaryType: "vegetarian", co2Saved: "2.1kg CO₂ saved", description: "Fresh vegetables, quinoa, olives, and feta cheese", ingredients: ["Quinoa", "Cherry tomatoes", "Olives", "Feta cheese", "Cucumber"], calories: 420, prepTime: "15min", difficulty: "Easy" },
    { id: "gb2", title: "Hummus Platter", price: "$11.99", dietaryType: "vegan", co2Saved: "1.8kg CO₂ saved", description: "Creamy hummus with fresh vegetables and pita bread", ingredients: ["Chickpeas", "Tahini", "Olive oil", "Pita bread", "Bell peppers"], calories: 350, prepTime: "12min", difficulty: "Easy" },
    { id: "gb3", title: "Grilled Halloumi Salad", price: "$13.99", dietaryType: "vegetarian", co2Saved: "1.9kg CO₂ saved", description: "Grilled halloumi cheese with mixed greens and herbs", ingredients: ["Halloumi", "Mixed greens", "Cherry tomatoes", "Herbs", "Lemon vinaigrette"], calories: 380, prepTime: "18min", difficulty: "Medium" },
    { id: "gb4", title: "Greek Wrap", price: "$12.99", dietaryType: "vegetarian", co2Saved: "2.0kg CO₂ saved", description: "Traditional Greek wrap with fresh vegetables", ingredients: ["Pita bread", "Tzatziki", "Cucumber", "Tomatoes", "Red onion"], calories: 340, prepTime: "10min", difficulty: "Easy" },
    { id: "gb5", title: "Spanakopita", price: "$15.99", dietaryType: "vegetarian", co2Saved: "1.7kg CO₂ saved", description: "Flaky phyllo pastry with spinach and feta", ingredients: ["Phyllo pastry", "Spinach", "Feta cheese", "Dill", "Olive oil"], calories: 450, prepTime: "25min", difficulty: "Hard" },
    { id: "gb6", title: "Stuffed Peppers", price: "$16.99", dietaryType: "vegan", co2Saved: "2.3kg CO₂ saved", description: "Bell peppers stuffed with quinoa and vegetables", ingredients: ["Bell peppers", "Quinoa", "Tomatoes", "Onions", "Herbs"], calories: 390, prepTime: "30min", difficulty: "Medium" },
  ],
  2: [ // Eco Eats Kitchen - Modern Asian
    { id: "ee1", title: "Buddha Bowl", price: "$12.99", dietaryType: "vegan", co2Saved: "2.3kg CO₂ saved", description: "Colorful array of vegetables, tofu, and brown rice", ingredients: ["Brown rice", "Tofu", "Edamame", "Carrots", "Purple cabbage"], calories: 450, prepTime: "20min", difficulty: "Medium" },
    { id: "ee2", title: "Miso Ramen", price: "$15.99", dietaryType: "vegetarian", co2Saved: "1.7kg CO₂ saved", description: "Rich miso broth with noodles and vegetables", ingredients: ["Ramen noodles", "Miso paste", "Corn", "Scallions", "Mushrooms"], calories: 520, prepTime: "25min", difficulty: "Hard" },
    { id: "ee3", title: "Asian Lettuce Wraps", price: "$11.99", dietaryType: "vegan", co2Saved: "2.0kg CO₂ saved", description: "Fresh lettuce cups filled with seasoned vegetables", ingredients: ["Lettuce", "Water chestnuts", "Mushrooms", "Ginger", "Soy sauce"], calories: 280, prepTime: "15min", difficulty: "Easy" },
    { id: "ee4", title: "Pad Thai", price: "$13.99", dietaryType: "vegan", co2Saved: "1.9kg CO₂ saved", description: "Traditional Thai noodles with tofu and vegetables", ingredients: ["Rice noodles", "Tofu", "Bean sprouts", "Lime", "Tamarind sauce"], calories: 480, prepTime: "18min", difficulty: "Medium" },
    { id: "ee5", title: "Korean Bibimbap", price: "$14.99", dietaryType: "vegetarian", co2Saved: "2.1kg CO₂ saved", description: "Mixed rice bowl with vegetables and kimchi", ingredients: ["Rice", "Vegetables", "Kimchi", "Sesame oil", "Egg"], calories: 420, prepTime: "22min", difficulty: "Medium" },
    { id: "ee6", title: "Teriyaki Tofu", price: "$12.99", dietaryType: "vegan", co2Saved: "2.2kg CO₂ saved", description: "Grilled tofu with teriyaki sauce and steamed vegetables", ingredients: ["Tofu", "Broccoli", "Carrots", "Teriyaki sauce", "Sesame seeds"], calories: 360, prepTime: "16min", difficulty: "Easy" },
    { id: "ee7", title: "Sushi Bowl", price: "$16.99", dietaryType: "vegetarian", co2Saved: "1.8kg CO₂ saved", description: "Deconstructed sushi with fresh vegetables", ingredients: ["Sushi rice", "Avocado", "Cucumber", "Carrot", "Nori"], calories: 380, prepTime: "15min", difficulty: "Easy" },
  ],
  3: [ // Sustainable Spoon - Global Fusion
    { id: "ss1", title: "Global Fusion Bowl", price: "$16.99", dietaryType: "vegetarian", co2Saved: "2.5kg CO₂ saved", description: "International flavors in one sustainable bowl", ingredients: ["Quinoa", "Roasted vegetables", "Tahini", "Pickled cabbage", "Herbs"], calories: 480, prepTime: "22min", difficulty: "Medium" },
    { id: "ss2", title: "Zero Waste Stir-fry", price: "$13.99", dietaryType: "vegan", co2Saved: "2.8kg CO₂ saved", description: "Vegetable stir-fry using food scraps creatively", ingredients: ["Broccoli stems", "Carrot tops", "Bell peppers", "Ginger", "Soy sauce"], calories: 360, prepTime: "18min", difficulty: "Medium" },
    { id: "ss3", title: "Seasonal Special", price: "$14.99", dietaryType: "vegetarian", co2Saved: "2.2kg CO₂ saved", description: "Chef's choice using today's fresh seasonal ingredients", ingredients: ["Seasonal vegetables", "Local grains", "Herbs", "Cheese", "Olive oil"], calories: 410, prepTime: "20min", difficulty: "Medium" },
    { id: "ss4", title: "Plant Protein Power", price: "$15.99", dietaryType: "vegan", co2Saved: "2.7kg CO₂ saved", description: "High-protein bowl with legumes and seeds", ingredients: ["Lentils", "Chickpeas", "Hemp seeds", "Spinach", "Tahini"], calories: 520, prepTime: "25min", difficulty: "Medium" },
    { id: "ss5", title: "Upcycled Soup", price: "$10.99", dietaryType: "vegan", co2Saved: "3.1kg CO₂ saved", description: "Soup made from perfectly good vegetable scraps", ingredients: ["Vegetable scraps", "Herbs", "Spices", "Coconut milk", "Bread"], calories: 280, prepTime: "30min", difficulty: "Easy" },
    { id: "ss6", title: "Rescue Grain Salad", price: "$12.99", dietaryType: "vegan", co2Saved: "2.4kg CO₂ saved", description: "Salad featuring grains saved from waste", ingredients: ["Mixed grains", "Vegetables", "Herbs", "Lemon dressing", "Nuts"], calories: 380, prepTime: "15min", difficulty: "Easy" },
  ],
  4: [ // Harvest Table - American Farm
    { id: "ht1", title: "Farm Fresh Salad", price: "$12.99", dietaryType: "vegetarian", co2Saved: "1.9kg CO₂ saved", description: "Locally sourced greens with seasonal vegetables", ingredients: ["Mixed greens", "Heirloom tomatoes", "Corn", "Goat cheese", "Balsamic"], calories: 320, prepTime: "12min", difficulty: "Easy" },
    { id: "ht2", title: "Artisan Bread Bowl", price: "$15.99", dietaryType: "vegetarian", co2Saved: "2.1kg CO₂ saved", description: "House-made bread bowl with seasonal soup", ingredients: ["Artisan bread", "Butternut squash", "Cream", "Herbs", "Pumpkin seeds"], calories: 460, prepTime: "25min", difficulty: "Hard" },
    { id: "ht3", title: "Harvest Grain Bowl", price: "$13.99", dietaryType: "vegan", co2Saved: "2.4kg CO₂ saved", description: "Ancient grains with roasted seasonal vegetables", ingredients: ["Farro", "Roasted beets", "Sweet potato", "Pecans", "Maple vinaigrette"], calories: 420, prepTime: "20min", difficulty: "Medium" },
    { id: "ht4", title: "Farm Veggie Wrap", price: "$11.99", dietaryType: "vegan", co2Saved: "2.0kg CO₂ saved", description: "Fresh wrap with locally grown vegetables", ingredients: ["Tortilla", "Local greens", "Tomatoes", "Carrots", "Hummus"], calories: 340, prepTime: "8min", difficulty: "Easy" },
    { id: "ht5", title: "Roasted Root Bowl", price: "$14.99", dietaryType: "vegan", co2Saved: "2.3kg CO₂ saved", description: "Hearty bowl with roasted root vegetables", ingredients: ["Sweet potato", "Carrots", "Beets", "Quinoa", "Herbs"], calories: 450, prepTime: "35min", difficulty: "Medium" },
    { id: "ht6", title: "Local Cheese Board", price: "$18.99", dietaryType: "vegetarian", co2Saved: "1.6kg CO₂ saved", description: "Selection of local artisan cheeses", ingredients: ["Local cheeses", "Crackers", "Fruit", "Nuts", "Honey"], calories: 520, prepTime: "5min", difficulty: "Easy" },
  ],
  5: [ // Plant Power Co. - Modern Vegan
    { id: "pp1", title: "Power Protein Bowl", price: "$14.99", dietaryType: "vegan", co2Saved: "3.1kg CO₂ saved", description: "High-protein plant-based bowl for active lifestyles", ingredients: ["Quinoa", "Black beans", "Hemp seeds", "Spinach", "Avocado"], calories: 550, prepTime: "18min", difficulty: "Easy" },
    { id: "pp2", title: "Energy Smoothie Bowl", price: "$11.99", dietaryType: "vegan", co2Saved: "1.6kg CO₂ saved", description: "Nutrient-packed smoothie bowl with superfoods", ingredients: ["Acai", "Banana", "Chia seeds", "Granola", "Berries"], calories: 380, prepTime: "10min", difficulty: "Easy" },
    { id: "pp3", title: "Raw Energy Bites", price: "$8.99", dietaryType: "vegan", co2Saved: "1.2kg CO₂ saved", description: "Raw dessert bites packed with natural energy", ingredients: ["Dates", "Almonds", "Cacao", "Coconut", "Vanilla"], calories: 220, prepTime: "8min", difficulty: "Easy" },
    { id: "pp4", title: "Green Goddess Salad", price: "$13.99", dietaryType: "vegan", co2Saved: "2.5kg CO₂ saved", description: "Nutrient-dense green salad with plant protein", ingredients: ["Kale", "Spinach", "Edamame", "Pumpkin seeds", "Green dressing"], calories: 420, prepTime: "12min", difficulty: "Easy" },
    { id: "pp5", title: "Muscle Builder Wrap", price: "$15.99", dietaryType: "vegan", co2Saved: "2.8kg CO₂ saved", description: "High-protein wrap for fitness enthusiasts", ingredients: ["Protein wrap", "Tempeh", "Spinach", "Hummus", "Sprouts"], calories: 490, prepTime: "15min", difficulty: "Easy" },
    { id: "pp6", title: "Recovery Smoothie", price: "$9.99", dietaryType: "vegan", co2Saved: "1.4kg CO₂ saved", description: "Post-workout smoothie with plant protein", ingredients: ["Protein powder", "Banana", "Almond milk", "Berries", "Spinach"], calories: 320, prepTime: "5min", difficulty: "Easy" },
    { id: "pp7", title: "Superfood Stack", price: "$16.99", dietaryType: "vegan", co2Saved: "2.9kg CO₂ saved", description: "Tower of superfoods for ultimate nutrition", ingredients: ["Chia pudding", "Granola", "Berries", "Coconut", "Nuts"], calories: 460, prepTime: "20min", difficulty: "Medium" },
  ],
  6: [ // Earth & Sky Cafe - International
    { id: "es1", title: "Artisan Soup", price: "$10.99", dietaryType: "vegetarian", co2Saved: "1.8kg CO₂ saved", description: "House-made soup with artisanal bread", ingredients: ["Tomatoes", "Basil", "Cream", "Artisan bread", "Parmesan"], calories: 340, prepTime: "15min", difficulty: "Easy" },
    { id: "es2", title: "International Grain Bowl", price: "$15.99", dietaryType: "vegan", co2Saved: "2.6kg CO₂ saved", description: "Grains and vegetables from around the world", ingredients: ["Wild rice", "Lentils", "Roasted vegetables", "Tahini", "Herbs"], calories: 470, prepTime: "22min", difficulty: "Medium" },
    { id: "es3", title: "Herbal Tea Bowl", price: "$13.99", dietaryType: "vegetarian", co2Saved: "2.0kg CO₂ saved", description: "Light meal paired with healing herbal tea", ingredients: ["Steamed vegetables", "Brown rice", "Miso", "Seaweed", "Herbal tea"], calories: 310, prepTime: "16min", difficulty: "Easy" },
    { id: "es4", title: "World Spice Curry", price: "$14.99", dietaryType: "vegan", co2Saved: "2.4kg CO₂ saved", description: "Aromatic curry with international spices", ingredients: ["Coconut milk", "Vegetables", "Spices", "Rice", "Herbs"], calories: 420, prepTime: "25min", difficulty: "Medium" },
    { id: "es5", title: "Global Tapas Plate", price: "$17.99", dietaryType: "vegetarian", co2Saved: "1.9kg CO₂ saved", description: "Small plates from around the world", ingredients: ["Various items", "Olives", "Cheese", "Bread", "Vegetables"], calories: 480, prepTime: "20min", difficulty: "Medium" },
  ],
  7: [ // Pure Leaf Eatery - Clean Eating
    { id: "pl1", title: "Superfood Salad", price: "$16.99", dietaryType: "vegan", co2Saved: "2.7kg CO₂ saved", description: "Nutrient-dense salad with superfoods", ingredients: ["Kale", "Quinoa", "Goji berries", "Chia seeds", "Avocado"], calories: 420, prepTime: "12min", difficulty: "Easy" },
    { id: "pl2", title: "Detox Green Juice", price: "$8.99", dietaryType: "vegan", co2Saved: "1.1kg CO₂ saved", description: "Fresh pressed green juice blend", ingredients: ["Kale", "Cucumber", "Celery", "Lemon", "Ginger"], calories: 120, prepTime: "5min", difficulty: "Easy" },
    { id: "pl3", title: "Acai Power Bowl", price: "$14.99", dietaryType: "vegan", co2Saved: "2.2kg CO₂ saved", description: "Antioxidant-rich acai bowl with toppings", ingredients: ["Acai", "Blueberries", "Granola", "Coconut", "Almonds"], calories: 380, prepTime: "10min", difficulty: "Easy" },
    { id: "pl4", title: "Clean Protein Bowl", price: "$15.99", dietaryType: "vegan", co2Saved: "2.5kg CO₂ saved", description: "Clean eating bowl with plant protein", ingredients: ["Lentils", "Sweet potato", "Kale", "Seeds", "Tahini"], calories: 460, prepTime: "18min", difficulty: "Easy" },
    { id: "pl5", title: "Immunity Shot", price: "$6.99", dietaryType: "vegan", co2Saved: "0.8kg CO₂ saved", description: "Concentrated immunity boosting shot", ingredients: ["Ginger", "Turmeric", "Lemon", "Cayenne", "Honey alternative"], calories: 45, prepTime: "3min", difficulty: "Easy" },
    { id: "pl6", title: "Rainbow Veggie Bowl", price: "$13.99", dietaryType: "vegan", co2Saved: "2.3kg CO₂ saved", description: "Colorful bowl with rainbow vegetables", ingredients: ["Rainbow vegetables", "Quinoa", "Seeds", "Herbs", "Dressing"], calories: 380, prepTime: "15min", difficulty: "Easy" },
  ],
  8: [ // Mindful Kitchen - Wellness
    { id: "mk1", title: "Balanced Bowl", price: "$15.99", dietaryType: "vegetarian", co2Saved: "2.3kg CO₂ saved", description: "Perfectly balanced meal for mindful eating", ingredients: ["Brown rice", "Steamed vegetables", "Tofu", "Miso dressing", "Sesame seeds"], calories: 440, prepTime: "20min", difficulty: "Medium" },
    { id: "mk2", title: "Healing Broth", price: "$9.99", dietaryType: "vegan", co2Saved: "1.5kg CO₂ saved", description: "Nourishing broth with healing properties", ingredients: ["Vegetable broth", "Ginger", "Turmeric", "Mushrooms", "Herbs"], calories: 180, prepTime: "30min", difficulty: "Easy" },
    { id: "mk3", title: "Mindful Dessert", price: "$7.99", dietaryType: "vegan", co2Saved: "1.0kg CO₂ saved", description: "Guilt-free dessert made with natural sweeteners", ingredients: ["Coconut cream", "Dates", "Cacao", "Nuts", "Vanilla"], calories: 250, prepTime: "12min", difficulty: "Easy" },
  ],
  9: [ // Bella Vista Italian
    { id: "bv1", title: "Margherita Pizza", price: "$18.99", dietaryType: "vegetarian", co2Saved: "2.1kg CO₂ saved", description: "Classic wood-fired pizza with fresh mozzarella", ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Basil", "Olive oil"], calories: 580, prepTime: "20min", difficulty: "Hard" },
    { id: "bv2", title: "Pasta Primavera", price: "$16.99", dietaryType: "vegetarian", co2Saved: "1.9kg CO₂ saved", description: "Fresh pasta with seasonal vegetables", ingredients: ["Fresh pasta", "Zucchini", "Bell peppers", "Cherry tomatoes", "Parmesan"], calories: 520, prepTime: "18min", difficulty: "Medium" },
    { id: "bv3", title: "Tiramisu", price: "$8.99", dietaryType: "vegetarian", co2Saved: "0.8kg CO₂ saved", description: "Classic Italian dessert with coffee", ingredients: ["Mascarpone", "Coffee", "Ladyfingers", "Cocoa", "Eggs"], calories: 320, prepTime: "30min", difficulty: "Hard" },
  ],
  10: [ // Spice Route Indian
    { id: "sr1", title: "Vegetable Curry", price: "$14.99", dietaryType: "vegan", co2Saved: "2.5kg CO₂ saved", description: "Rich and aromatic vegetable curry", ingredients: ["Mixed vegetables", "Coconut milk", "Curry spices", "Basmati rice", "Cilantro"], calories: 480, prepTime: "25min", difficulty: "Medium" },
    { id: "sr2", title: "Tandoori Vegetables", price: "$13.99", dietaryType: "vegan", co2Saved: "2.2kg CO₂ saved", description: "Grilled vegetables with tandoori spices", ingredients: ["Bell peppers", "Onions", "Cauliflower", "Tandoori spices", "Yogurt marinade"], calories: 320, prepTime: "30min", difficulty: "Hard" },
    { id: "sr3", title: "Dal Makhani", price: "$12.99", dietaryType: "vegetarian", co2Saved: "2.8kg CO₂ saved", description: "Creamy black lentils in rich tomato sauce", ingredients: ["Black lentils", "Tomatoes", "Cream", "Spices", "Naan bread"], calories: 420, prepTime: "35min", difficulty: "Hard" },
  ],
  11: [ // Tokyo Street Food
    { id: "ts1", title: "Vegetable Ramen", price: "$15.99", dietaryType: "vegetarian", co2Saved: "2.0kg CO₂ saved", description: "Rich tonkotsu-style broth with vegetables", ingredients: ["Ramen noodles", "Vegetable broth", "Corn", "Mushrooms", "Green onions"], calories: 520, prepTime: "25min", difficulty: "Hard" },
    { id: "ts2", title: "Vegetable Sushi Roll", price: "$12.99", dietaryType: "vegetarian", co2Saved: "1.6kg CO₂ saved", description: "Fresh vegetable sushi with avocado", ingredients: ["Sushi rice", "Nori", "Avocado", "Cucumber", "Carrot"], calories: 380, prepTime: "20min", difficulty: "Hard" },
    { id: "ts3", title: "Miso Soup", price: "$6.99", dietaryType: "vegan", co2Saved: "1.2kg CO₂ saved", description: "Traditional miso soup with tofu", ingredients: ["Miso paste", "Tofu", "Seaweed", "Green onions", "Dashi"], calories: 150, prepTime: "10min", difficulty: "Easy" },
  ],
  12: [ // Azteca Mexican Grill
    { id: "ag1", title: "Veggie Tacos", price: "$11.99", dietaryType: "vegan", co2Saved: "2.3kg CO₂ saved", description: "Soft tacos filled with seasoned vegetables", ingredients: ["Corn tortillas", "Black beans", "Bell peppers", "Onions", "Cilantro"], calories: 420, prepTime: "15min", difficulty: "Easy" },
    { id: "ag2", title: "Quinoa Burrito", price: "$13.99", dietaryType: "vegetarian", co2Saved: "2.6kg CO₂ saved", description: "Protein-packed burrito with quinoa and cheese", ingredients: ["Flour tortilla", "Quinoa", "Black beans", "Cheese", "Salsa"], calories: 580, prepTime: "18min", difficulty: "Medium" },
    { id: "ag3", title: "Fresh Guacamole", price: "$8.99", dietaryType: "vegan", co2Saved: "1.4kg CO₂ saved", description: "House-made guacamole with tortilla chips", ingredients: ["Avocados", "Lime", "Cilantro", "Onions", "Tortilla chips"], calories: 280, prepTime: "8min", difficulty: "Easy" },
  ],
  13: [ // Ocean's Harvest
    { id: "oh1", title: "Grilled Salmon", price: "$22.99", dietaryType: "non-veg", co2Saved: "1.8kg CO₂ saved", description: "Sustainably caught salmon with herbs", ingredients: ["Wild salmon", "Lemon", "Herbs", "Olive oil", "Quinoa"], calories: 480, prepTime: "20min", difficulty: "Medium" },
    { id: "oh2", title: "Seafood Bowl", price: "$19.99", dietaryType: "non-veg", co2Saved: "2.1kg CO₂ saved", description: "Mixed seafood with vegetables and rice", ingredients: ["Shrimp", "Scallops", "Rice", "Vegetables", "Garlic"], calories: 520, prepTime: "25min", difficulty: "Hard" },
    { id: "oh3", title: "Fish Tacos", price: "$16.99", dietaryType: "non-veg", co2Saved: "1.9kg CO₂ saved", description: "Fresh fish tacos with cabbage slaw", ingredients: ["White fish", "Corn tortillas", "Cabbage", "Lime", "Cilantro"], calories: 420, prepTime: "18min", difficulty: "Medium" },
  ],
}

// Sample restaurants data
const sampleRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Green Garden Bistro",
    image: restaurantImage1,
    rating: 4.8,
    deliveryTime: "25-35 min",
    category: "Organic • Vegetarian",
    description: "Farm-to-table organic meals with a focus on sustainability",
    cuisine: "Mediterranean",
    specialties: ["Vegan Bowls", "Organic Salads", "Fresh Juices"],
    menuItems: []
  },
  {
    id: 2,
    name: "Eco Eats Kitchen",
    image: restaurantImage2,
    rating: 4.6,
    deliveryTime: "30-40 min",
    category: "Healthy • Plant-Based",
    description: "Delicious plant-based meals for conscious eaters",
    cuisine: "Modern Asian",
    specialties: ["Buddha Bowls", "Quinoa Dishes", "Green Smoothies"],
    menuItems: []
  },
  {
    id: 3,
    name: "Sustainable Spoon",
    image: restaurantImage3,
    rating: 4.7,
    deliveryTime: "20-30 min",
    category: "Local • Organic",
    description: "Local ingredients, global flavors, zero waste",
    cuisine: "Global Fusion",
    specialties: ["Seasonal Specials", "Zero Waste Meals", "Local Sourced"],
    menuItems: []
  },
  {
    id: 4,
    name: "Harvest Table",
    image: restaurantImage4,
    rating: 4.9,
    deliveryTime: "15-25 min",
    category: "Farm Fresh • Seasonal",
    description: "Seasonal ingredients from local farms, prepared with love",
    cuisine: "American Farm",
    specialties: ["Seasonal Bowls", "Fresh Salads", "Artisan Breads"],
    menuItems: []
  },
  {
    id: 5,
    name: "Plant Power Co.",
    image: restaurantImage5,
    rating: 4.5,
    deliveryTime: "20-35 min",
    category: "100% Vegan • High Protein",
    description: "Power-packed plant-based meals for active lifestyles",
    cuisine: "Modern Vegan",
    specialties: ["Protein Bowls", "Energy Smoothies", "Raw Desserts"],
    menuItems: []
  },
  {
    id: 6,
    name: "Earth & Sky Cafe",
    image: restaurantImage6,
    rating: 4.8,
    deliveryTime: "25-40 min",
    category: "Organic • Artisanal",
    description: "Handcrafted meals with ethically sourced ingredients",
    cuisine: "International",
    specialties: ["Artisan Soups", "Grain Bowls", "Herbal Teas"],
    menuItems: []
  },
  {
    id: 7,
    name: "Pure Leaf Eatery",
    image: restaurantImage7,
    rating: 4.7,
    deliveryTime: "18-28 min",
    category: "Clean Eating • Superfood",
    description: "Nutrient-dense meals featuring superfoods and clean ingredients",
    cuisine: "Health-Conscious",
    specialties: ["Superfood Salads", "Detox Juices", "Acai Bowls"],
    menuItems: []
  },
  {
    id: 8,
    name: "Mindful Kitchen",
    image: restaurantImage8,
    rating: 4.6,
    deliveryTime: "22-32 min",
    category: "Mindful • Balanced",
    description: "Thoughtfully prepared meals for mind, body, and soul wellness",
    cuisine: "Wellness Cuisine",
    specialties: ["Balanced Bowls", "Healing Broths", "Mindful Desserts"],
    menuItems: []
  },
  {
    id: 9,
    name: "Bella Vista Italian",
    image: restaurantImage9,
    rating: 4.8,
    deliveryTime: "25-35 min",
    category: "Authentic • Traditional",
    description: "Traditional Italian dishes made with imported ingredients and family recipes",
    cuisine: "Italian",
    specialties: ["Wood-fired Pizza", "Fresh Pasta", "Tiramisu"],
    menuItems: []
  },
  {
    id: 10,
    name: "Spice Route Indian",
    image: restaurantImage10,
    rating: 4.7,
    deliveryTime: "30-40 min",
    category: "Authentic • Spicy",
    description: "Rich and aromatic Indian cuisine with traditional spices and cooking methods",
    cuisine: "Indian",
    specialties: ["Curry Bowls", "Tandoori", "Naan Bread"],
    menuItems: []
  },
  {
    id: 11,
    name: "Tokyo Street Food",
    image: restaurantImage11,
    rating: 4.9,
    deliveryTime: "20-30 min",
    category: "Japanese • Street Food",
    description: "Authentic Japanese street food and ramen in a modern setting",
    cuisine: "Japanese",
    specialties: ["Ramen Bowls", "Sushi Rolls", "Miso Soup"],
    menuItems: []
  },
  {
    id: 12,
    name: "Azteca Mexican Grill",
    image: restaurantImage12,
    rating: 4.5,
    deliveryTime: "18-28 min",
    category: "Mexican • Grill",
    description: "Fresh Mexican flavors with locally sourced ingredients and bold spices",
    cuisine: "Mexican",
    specialties: ["Tacos", "Burritos", "Fresh Guacamole"],
    menuItems: []
  },
  {
    id: 13,
    name: "Ocean's Harvest",
    image: restaurantImage13,
    rating: 4.8,
    deliveryTime: "35-45 min",
    category: "Seafood • Fresh",
    description: "Daily fresh catch prepared with sustainable fishing practices",
    cuisine: "Seafood",
    specialties: ["Grilled Fish", "Seafood Bowls", "Fish Tacos"],
    menuItems: []
  }
]

// Sample recent orders
const sampleRecentOrders: RecentOrder[] = [
  {
    id: 1,
    restaurantName: "Green Garden Bistro",
    itemName: "Mediterranean Bowl",
    image: foodImages[0],
    price: "$14.99",
    orderDate: "Yesterday"
  },
  {
    id: 2,
    restaurantName: "Eco Eats Kitchen",
    itemName: "Buddha Bowl",
    image: foodImages[1],
    price: "$12.99",
    orderDate: "2 days ago"
  },
  {
    id: 3,
    restaurantName: "Plant Power Co.",
    itemName: "Power Protein Bowl",
    image: foodImages[2],
    price: "$14.99",
    orderDate: "3 days ago"
  },
  {
    id: 4,
    restaurantName: "Sustainable Spoon",
    itemName: "Global Fusion Bowl",
    image: foodImages[3],
    price: "$16.99",
    orderDate: "4 days ago"
  },
  {
    id: 5,
    restaurantName: "Harvest Table",
    itemName: "Farm Fresh Salad",
    image: foodImages[4],
    price: "$12.99",
    orderDate: "5 days ago"
  },
  {
    id: 6,
    restaurantName: "Pure Leaf Eatery",
    itemName: "Superfood Salad",
    image: foodImages[5],
    price: "$16.99",
    orderDate: "1 week ago"
  },
  {
    id: 7,
    restaurantName: "Earth & Sky Cafe",
    itemName: "Artisan Soup",
    image: foodImages[6],
    price: "$10.99",
    orderDate: "1 week ago"
  },
  {
    id: 8,
    restaurantName: "Mindful Kitchen",
    itemName: "Balanced Bowl",
    image: foodImages[7],
    price: "$15.99",
    orderDate: "1 week ago"
  },
  {
    id: 9,
    restaurantName: "Bella Vista Italian",
    itemName: "Margherita Pizza",
    image: foodImages[8],
    price: "$18.99",
    orderDate: "2 weeks ago"
  },
  {
    id: 10,
    restaurantName: "Spice Route Indian",
    itemName: "Vegetable Curry",
    image: foodImages[9],
    price: "$14.99",
    orderDate: "2 weeks ago"
  },
  {
    id: 11,
    restaurantName: "Tokyo Street Food",
    itemName: "Vegetable Ramen",
    image: foodImages[10],
    price: "$15.99",
    orderDate: "2 weeks ago"
  },
  {
    id: 12,
    restaurantName: "Azteca Mexican Grill",
    itemName: "Veggie Tacos",
    image: foodImages[11],
    price: "$11.99",
    orderDate: "3 weeks ago"
  }
]

export default function MenuPage() {
  const [filter, setFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [menuSearchQuery, setMenuSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [isRestaurantMenuOpen, setIsRestaurantMenuOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  // Cart functionality
  const { addToCart } = useCart()
  
  // Fetch menu items from API and distribute to restaurants
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/meals')
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Add random images and process MongoDB data format
        const formattedData = data.map((item: any, index: number) => {
          const dietaryType = item.dietaryType || determineDietaryType(item)
          const title = item.title || item.name || "Unnamed Dish"
          const price = typeof item.price === 'string' && item.price.startsWith('$') 
            ? item.price 
            : `$${item.price}`
          
          return {
            id: item.id || item._id || index,
            title,
            price,
            image: foodImages[index % foodImages.length],
            dietaryType,
            co2Saved: item.co2Saved || `${(Math.random() * 2 + 0.5).toFixed(1)}kg CO₂ saved`,
            isVegan: item.isVegan,
            description: item.description || "A delicious, sustainably-sourced meal prepared with the finest organic ingredients.",
            ingredients: item.ingredients || ["Organic vegetables", "Fresh herbs", "Sustainable proteins", "Whole grains"],
            calories: item.calories || Math.floor(Math.random() * 300) + 250,
            prepTime: item.prepTime || `${Math.floor(Math.random() * 20) + 15}min`,
            difficulty: item.difficulty || ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)]
          }
        })
        
        // Assign specific menu items to each restaurant with unique images
        const restaurantsWithMenus = sampleRestaurants.map((restaurant) => {
          const items = restaurantMenuItems[restaurant.id] || []
          const startIndex = (restaurant.id - 1) * 8 // Start each restaurant with different images
          return {
            ...restaurant,
            menuItems: items.map((item, index) => ({
              ...item,
              image: foodImages[(startIndex + index) % foodImages.length]
            }))
          }
        })
        
        // Collect all menu items for filtering
        const allMenuItems = Object.values(restaurantMenuItems).flat().map((item, index) => ({
          ...item,
          image: foodImages[index % foodImages.length]
        }))
        
        setMenuItems(allMenuItems)
        setRestaurants(restaurantsWithMenus)
        setRecentOrders(sampleRecentOrders)
        setIsLoading(false)
      } catch (err) {
        console.error("Failed to fetch menu items:", err)
        setError("Failed to load menu items. Using fallback data.")
        
        // Use fallback data
        const fallbackItems = [
          {
            id: 1,
            title: "Buddha Bowl",
            price: "$12.99",
            image: foodImages[0],
            dietaryType: "vegan" as DietaryType,
            co2Saved: "1.0kg CO₂ saved",
            description: "A nourishing bowl packed with fresh vegetables, quinoa, and tahini dressing.",
            ingredients: ["Quinoa", "Kale", "Chickpeas", "Avocado", "Tahini", "Hemp seeds"],
            calories: 420,
            prepTime: "25min",
            difficulty: "Easy"
          },
          {
            id: 2,
            title: "Mediterranean Quinoa",
            price: "$10.99",
            image: foodImages[1],
            dietaryType: "vegetarian" as DietaryType,
            co2Saved: "1.0kg CO₂ saved",
            description: "Mediterranean-inspired quinoa bowl with fresh herbs and feta cheese.",
            ingredients: ["Quinoa", "Cucumber", "Tomatoes", "Olives", "Feta", "Herbs"],
            calories: 380,
            prepTime: "20min",
            difficulty: "Easy"
          },
          {
            id: 3,
            title: "Asian Stir-Fry",
            price: "$11.99",
            image: foodImages[2],
            dietaryType: "vegan" as DietaryType,
            co2Saved: "2.1kg CO₂ saved",
            description: "Vibrant stir-fry with seasonal vegetables and ginger soy glaze.",
            ingredients: ["Mixed vegetables", "Tofu", "Ginger", "Soy sauce", "Sesame oil", "Brown rice"],
            calories: 340,
            prepTime: "18min",
            difficulty: "Medium"
          },
          {
            id: 4,
            title: "Grilled Chicken Plate",
            price: "$14.99",
            image: foodImages[3],
            dietaryType: "non-veg" as DietaryType,
            co2Saved: "1.2kg CO₂ saved",
            description: "Sustainably-raised grilled chicken with roasted vegetables.",
            ingredients: ["Free-range chicken", "Sweet potato", "Broccoli", "Herbs", "Olive oil"],
            calories: 520,
            prepTime: "30min",
            difficulty: "Medium"
          },
          {
            id: 5,
            title: "Salmon Poke Bowl",
            price: "$15.99",
            image: foodImages[4],
            dietaryType: "non-veg" as DietaryType,
            co2Saved: "1.3kg CO₂ saved",
            description: "Fresh salmon poke bowl with brown rice and seaweed salad.",
            ingredients: ["Wild salmon", "Brown rice", "Seaweed", "Edamame", "Avocado", "Ponzu"],
            calories: 480,
            prepTime: "15min",
            difficulty: "Easy"
          },
          {
            id: 6,
            title: "Mexican Bowl",
            price: "$13.99",
            image: foodImages[5],
            dietaryType: "vegan" as DietaryType,
            co2Saved: "3.3kg CO₂ saved",
            description: "Spicy Mexican-inspired bowl with black beans and fresh salsa.",
            ingredients: ["Black beans", "Brown rice", "Corn", "Peppers", "Cilantro", "Lime"],
            calories: 390,
            prepTime: "22min",
            difficulty: "Easy"
          }
        ]
        
        const restaurantsWithMenus = sampleRestaurants.map((restaurant, index) => ({
          ...restaurant,
          menuItems: fallbackItems.filter((_: any, itemIndex: number) => itemIndex % 3 === index)
        }))
        
        setMenuItems(fallbackItems)
        setRestaurants(restaurantsWithMenus)
        setRecentOrders(sampleRecentOrders)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper function to determine dietary type based on MongoDB data
  function determineDietaryType(item: any): DietaryType {
    if (item.isVegan === true) {
      return "vegan"
    } else if (item.isVegetarian === true) {
      return "vegetarian"
    } else {
      return "non-veg"
    }
  }

  const openRestaurantMenu = useCallback((restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant)
    setIsRestaurantMenuOpen(true)
    setFilter(null) // Reset filter when opening new restaurant
  }, [])

  // Add to cart function
  const handleAddToCart = useCallback((item: MenuItem) => {
    // Extract numeric price value
    const numericPrice = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
      : item.price

    // Extract numeric CO2 saved value
    const co2Match = item.co2Saved.match(/(\d+\.?\d*)/)
    const co2Impact = co2Match ? parseFloat(co2Match[1]) : 2 // Default to 2 if not found
    
    // Determine if vegan based on dietary type
    const isVegan = item.dietaryType === 'vegan'
    
    // Create cart item according to CartItem interface
    const cartItem = {
      id: item.id,
      name: item.title,
      price: numericPrice,
      quantity: 1,
      isVegan,
      dietaryType: item.dietaryType,
      co2Impact,
      image: typeof item.image === 'string' ? item.image : item.image?.src,
      restaurantName: selectedRestaurant?.name || 'Unknown Restaurant'
    }
    
    // Add to cart
    addToCart(cartItem)
    
    // Show success toast
    toast.success(`Added to cart!`, {
      description: `${item.title} has been added to your cart.`,
      duration: 3000,
    })
  }, [addToCart])

  // Reorder function
  const handleReorder = useCallback((order: RecentOrder) => {
    // Extract numeric price value
    const numericPrice = parseFloat(order.price.replace(/[^0-9.]/g, ''))
    
    // Create cart item from recent order
    const cartItem = {
      id: `reorder-${order.id}-${Date.now()}`, // Unique ID for reorder
      name: order.itemName,
      price: numericPrice,
      quantity: 1,
      isVegan: true, // Default assumption for reorder, can be improved with more data
      dietaryType: 'vegetarian', // Default assumption
      co2Impact: 2, // Default CO2 impact
      image: typeof order.image === 'string' ? order.image : order.image?.src,
      restaurantName: order.restaurantName
    }
    
    // Add to cart
    addToCart(cartItem)
    
    // Show success toast
    toast.success(`Reordered successfully!`, {
      description: `${order.itemName} from ${order.restaurantName} has been added to your cart.`,
      duration: 3000,
    })
  }, [addToCart])

  // Optimized filtering with memoization
  const filteredMenuItems = useMemo(() => {
    if (!selectedRestaurant?.menuItems) return []
    
    return selectedRestaurant.menuItems.filter(item => {
      // Apply dietary filter
      const matchesFilter = filter === null || 
        (filter === "vegetarian" && (item.dietaryType === "vegetarian" || item.dietaryType === "vegan")) ||
        (filter === "non-vegetarian" && item.dietaryType === "non-veg")
      
      // Apply search filter
      const searchLower = menuSearchQuery.toLowerCase()
      const matchesSearch = menuSearchQuery === "" || 
        item.title.toLowerCase().includes(searchLower) ||
        (item.description && item.description.toLowerCase().includes(searchLower)) ||
        (item.ingredients && item.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchLower)
        ))
      
      return matchesFilter && matchesSearch
    })
  }, [selectedRestaurant?.menuItems, filter, menuSearchQuery])

  // Optimized restaurant filtering with memoization
  const filteredRestaurants = useMemo(() => {
    if (!searchQuery) return restaurants
    
    const searchLower = searchQuery.toLowerCase()
    return restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchLower) ||
      restaurant.cuisine.toLowerCase().includes(searchLower) ||
      restaurant.category.toLowerCase().includes(searchLower) ||
      restaurant.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchLower)
      )
    )
  }, [restaurants, searchQuery])

  return (
    <div className="min-h-screen dark:bg-background">
      {/* Container for the rounded hero section */}
      <div className="container mx-auto px-6 pt-8 pb-4">
        {/* Hero Section with Background Image */}
        <div className="relative rounded-3xl overflow-hidden my-6 h-[400px]">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full">
              <FoodSlideshow />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
          </div>

          <div className="relative z-1 py-12 px-6 md:px-10 h-full flex items-center justify-center">
            <div className="text-center max-w-2xl">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium mb-4">
                <Leaf className="h-3.5 w-3.5 text-white" />
                <span>Eco-Conscious Dining</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Restaurants Near You
              </h1>
              <p className="text-white text-lg max-w-md mx-auto mb-6">
                Discover sustainable restaurants committed to reducing environmental impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 bg-[#FFF5ED] dark:bg-background">
        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 py-2 px-4 rounded-md mb-6 dark:bg-amber-900/20 dark:border-amber-800/30 dark:text-amber-300">
            {error}
          </div>
        )}

        {/* Recent Orders Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Orders</h2>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span>Scroll to see more</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-muted-foreground/60 rounded-full animate-pulse delay-200"></div>
                <div className="w-1 h-1 bg-muted-foreground/40 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-64 h-36 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm">
                  <Skeleton className="h-20 w-full" />
                  <div className="p-3">
                    <Skeleton className="h-3 w-20 mb-1" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Scroll Indicator - Left */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 dark:from-background to-transparent z-10 pointer-events-none opacity-50"></div>
              
              {/* Scroll Indicator - Right */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 dark:from-background to-transparent z-10 pointer-events-none opacity-50"></div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={`order-${order.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex-shrink-0 w-64 h-36 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image 
                        src={order.image} 
                        alt={order.itemName} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 bg-green-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                      {order.price}
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0">
                      <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-t-xl p-3 border-t border-white/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-white leading-tight truncate">{order.itemName}</h3>
                            <p className="text-xs text-white/80 truncate">{order.restaurantName}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-white/70">
                            <Clock className="h-3 w-3" />
                            <span>{order.orderDate}</span>
                          </div>
                          
                          {/* Reorder Button */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleReorder(order)
                            }}
                            className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium hover:bg-green-600 hover:text-white transition-all duration-200"
                          >
                            <RotateCcw className="h-3 w-3" />
                            <span>Reorder</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Restaurants Section */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-foreground">Popular Restaurants</h2>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search restaurants, cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mb-4 text-sm text-muted-foreground">
              Found {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 13 }).map((_, index) => (
                <div key={index} className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => openRestaurantMenu(restaurant)}
                  className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 text-foreground">{restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{restaurant.category}</p>
                    <p className="text-xs text-muted-foreground mb-3">{restaurant.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {restaurant.deliveryTime}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        2.5 km
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No results message */}
          {searchQuery && filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">No restaurants found matching your search</div>
              <Button 
                variant="ghost" 
                onClick={() => setSearchQuery("")}
                className="text-green-600 hover:text-green-700"
              >
                Clear search
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Beautiful Restaurant Menu Drawer */}
      <Drawer open={isRestaurantMenuOpen} onOpenChange={setIsRestaurantMenuOpen}>
        <DrawerContent className="h-[98vh] max-w-none bg-gray-50 dark:bg-zinc-950 border-none">
          {selectedRestaurant && (
            <div className="flex flex-col h-full">
              {/* Hidden Title for Accessibility */}
              <DrawerTitle className="sr-only">
                {selectedRestaurant.name} Menu
              </DrawerTitle>
              
              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="w-full p-6 pb-12">
                  {/* Restaurant Info Card - Elegant Minimal Design */}
                  <div className="mb-8 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-zinc-800">
                    <div className="flex flex-col lg:flex-row">
                      {/* Restaurant Image */}
                      <div className="lg:w-2/5">
                        <div className="relative h-64 lg:h-full lg:min-h-[380px]">
                          <Image 
                            src={selectedRestaurant.image} 
                            alt={selectedRestaurant.name}
                            fill
                            className="object-cover"
                          />
                          {/* Subtle overlay with action buttons */}
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors">
                              <Share className="h-4 w-4" />
                            </button>
                            <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
                              <Heart className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Restaurant Details - Clean & Organized */}
                      <div className="lg:w-3/5 p-6 space-y-6">
                        {/* Header Section */}
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-2xl font-bold text-foreground mb-1">{selectedRestaurant.name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedRestaurant.cuisine} • {selectedRestaurant.category}</p>
                          </div>
                          
                          {/* Quick Info Row */}
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                              </div>
                              <span className="font-medium text-foreground">{selectedRestaurant.rating}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{selectedRestaurant.deliveryTime}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>2.5 km</span>
                            </div>
                          </div>
                        </div>

                        {/* About Section */}
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground leading-relaxed">{selectedRestaurant.description}</p>
                          <div className="text-sm font-medium text-green-600">$3.99 delivery fee</div>
                        </div>

                        {/* Info Grid - Clean 2x2 Layout */}
                        <div className="grid grid-cols-2 gap-6">
                          {/* Stats Column */}
                          <div className="space-y-4">
                            <div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Restaurant Stats</div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">Orders</span>
                                  <span className="text-sm font-medium">500+</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">Distance</span>
                                  <span className="text-sm font-medium">2.5 km</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">Status</span>
                                  <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-green-600">Open until 11 PM</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Hours Column */}
                          <div className="space-y-4">
                            <div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Operating Hours</div>
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">Mon - Fri</span>
                                  <span className="text-sm font-medium">9:00 AM - 11:00 PM</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">Weekend</span>
                                  <span className="text-sm font-medium">10:00 AM - 12:00 AM</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Specialties & Activity */}
                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                          {/* Specialties */}
                          <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Specialties</div>
                            <div className="flex flex-wrap gap-2">
                              {selectedRestaurant.specialties.map((specialty, index) => (
                                <span key={index} className="inline-flex items-center gap-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full text-xs font-medium">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Recent Activity */}
                          <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3 border-l-3 border-green-500">
                            <div className="flex items-center gap-2 mb-1">
                              <RotateCcw className="h-3.5 w-3.5 text-green-600" />
                              <span className="text-xs text-muted-foreground uppercase tracking-wide">Your Last Order</span>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium text-foreground">Mediterranean Quinoa</span>
                              <span className="text-muted-foreground ml-2">• 2 days ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Search Bar */}
                  <div className="mb-6">
                    <div className="relative max-w-md mx-auto">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search menu items..."
                        value={menuSearchQuery}
                        onChange={(e) => setMenuSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all"
                      />
                      {menuSearchQuery && (
                        <button
                          onClick={() => setMenuSearchQuery("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Search Results Info */}
                  {menuSearchQuery && (
                    <div className="mb-4 text-center text-sm text-muted-foreground">
                      Found {filteredMenuItems.length} item{filteredMenuItems.length !== 1 ? 's' : ''} matching "{menuSearchQuery}"
                    </div>
                  )}

                  {/* Filter Buttons */}
                  <div className="mb-8">
                    <div className="flex justify-center gap-3">
                      <Button
                        variant={filter === null ? "default" : "outline"}
                        onClick={() => setFilter(null)}
                        className="rounded-full"
                        size="sm"
                      >
                        <AlignJustify className="h-4 w-4 mr-2" />
                        All Items
                      </Button>
                      <Button
                        variant={filter === "vegetarian" ? "default" : "outline"}
                        onClick={() => setFilter("vegetarian")}
                        className="rounded-full"
                        size="sm"
                      >
                        <Salad className="h-4 w-4 mr-2" />
                        Vegetarian
                      </Button>
                      <Button
                        variant={filter === "non-vegetarian" ? "default" : "outline"}
                        onClick={() => setFilter("non-vegetarian")}
                        className="rounded-full"
                        size="sm"
                      >
                        <Beef className="h-4 w-4 mr-2" />
                        Non-Vegetarian
                      </Button>
                    </div>
                  </div>

                  {/* Menu Items Grid - Elegant Overlay Design */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8">
                    {filteredMenuItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.2, 
                          delay: Math.min(index * 0.05, 0.3),
                          ease: "easeOut"
                        }}
                        className="relative h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <Image 
                            src={item.image || foodImages[0]} 
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                          <div className="flex gap-2">
                            {item.dietaryType === "vegan" && (
                              <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                                <Leaf className="h-3 w-3" />
                                <span>Vegan</span>
                              </div>
                            )}
                            {item.dietaryType === "vegetarian" && (
                              <div className="bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                                <Salad className="h-3 w-3" />
                                <span>Vegetarian</span>
                              </div>
                            )}
                          </div>
                          <div className="bg-green-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                            {item.co2Saved.replace(' CO₂ saved', '')}
                          </div>
                        </div>

                        {/* Content Overlay - Translucent with Blur */}
                        <div className="absolute bottom-0 left-0 right-0">
                          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-t-2xl p-4 border-t border-x border-white/20">
                            {/* Title and Price */}
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-base text-white leading-tight pr-2">{item.title}</h3>
                              <span className="font-bold text-green-400 whitespace-nowrap">{item.price}</span>
                            </div>
                            
                            {/* Description */}
                            <p className="text-xs text-white/90 mb-3 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>

                            {/* Quick Stats and Cart Button */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 text-xs text-white/80">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{item.prepTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>•</span>
                                  <span>{item.calories} cal</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>•</span>
                                  <span className="capitalize">{item.difficulty}</span>
                                </div>
                              </div>
                              
                              {/* Add to Cart Button */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAddToCart(item)
                                }}
                                className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-green-600 hover:text-white hover:scale-110 transition-all duration-200 group/cart"
                                title={`Add ${item.title} to cart`}
                              >
                                <ShoppingCart className="h-3.5 w-3.5 text-gray-700 group-hover/cart:text-white transition-colors" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {filteredMenuItems.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">
                        {menuSearchQuery 
                          ? `No items found matching "${menuSearchQuery}"` 
                          : "No items found matching your criteria."
                        }
                      </p>
                      <div className="flex gap-2 justify-center">
                        {filter && (
                          <Button onClick={() => setFilter(null)} variant="outline">
                            Clear filters
                          </Button>
                        )}
                        {menuSearchQuery && (
                          <Button onClick={() => setMenuSearchQuery("")} variant="outline">
                            Clear search
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* Cart Button and Drawer */}
      <CartButton onClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
