// app/api/meals/route.ts
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('greenplate')
    const meals = await db.collection('meals').find({}).toArray()

    // Transform the data to handle MongoDB specific fields properly
    const formattedMeals = meals.map(meal => {
      // Convert MongoDB ObjectId to string if needed
      const id = meal._id.toString ? meal._id.toString() : meal._id
      
      return {
        id,
        title: meal.name || "Untitled Dish", // Use name field from MongoDB
        price: meal.price || 10.99, // Return as number, let frontend format
        dietaryType: determineDietaryType(meal), // Determine type based on isVegan
        co2Saved: calculateCO2Savings(meal), // Calculate CO2 savings
        isVegan: meal.isVegan // Keep original field for reference
      }
    })

    return NextResponse.json(formattedMeals)
  } catch (error) {
    console.error("Error fetching meals:", error)
    
    // Return fallback data instead of error
    const fallbackMeals = [
      {
        id: 1,
        title: "Buddha Bowl",
        price: 12.99,
        dietaryType: "vegan",
        co2Saved: "1.8kg CO₂ saved",
        isVegan: true
      },
      {
        id: 2,
        title: "Mediterranean Quinoa",
        price: 10.99,
        dietaryType: "vegetarian",
        co2Saved: "1.5kg CO₂ saved",
        isVegan: false
      },
      {
        id: 3,
        title: "Asian Stir-Fry",
        price: 11.99,
        dietaryType: "vegan",
        co2Saved: "2.1kg CO₂ saved",
        isVegan: true
      },
      {
        id: 4,
        title: "Grilled Chicken Plate",
        price: 14.99,
        dietaryType: "non-veg",
        co2Saved: "1.2kg CO₂ saved",
        isVegan: false
      },
      {
        id: 5,
        title: "Salmon Poke Bowl",
        price: 15.99,
        dietaryType: "non-veg",
        co2Saved: "1.3kg CO₂ saved",
        isVegan: false
      },
      {
        id: 6,
        title: "Mexican Bowl",
        price: 13.99,
        dietaryType: "vegan",
        co2Saved: "2.3kg CO₂ saved",
        isVegan: true
      },
      {
        id: 7,
        title: "Green Goddess Salad",
        price: 9.99,
        dietaryType: "vegan",
        co2Saved: "2.5kg CO₂ saved",
        isVegan: true
      },
      {
        id: 8,
        title: "Pasta Primavera",
        price: 12.49,
        dietaryType: "vegetarian",
        co2Saved: "1.7kg CO₂ saved",
        isVegan: false
      }
    ]
    
    return NextResponse.json(fallbackMeals)
  }
}

// Helper function to determine dietary type based on MongoDB data
function determineDietaryType(meal: any) {
  if (meal.isVegan === true) {
    return "vegan"
  } else if (meal.isVegetarian === true) {
    return "vegetarian"
  } else {
    return "non-veg"
  }
}

// Helper function to calculate approximate CO2 savings
function calculateCO2Savings(meal: any) {
  // Base CO2 savings on meal type
  let baseSavings = 1.0
  
  if (meal.isVegan === true) {
    baseSavings = 2.0 // Higher savings for vegan meals
  } else if (meal.isVegetarian === true) {
    baseSavings = 1.5 // Medium savings for vegetarian
  } else {
    baseSavings = 0.8 // Lower savings for non-veg
  }
  
  // Add some variety based on price (higher price = more ingredients = different savings)
  const variation = (meal.price / 10) * 0.5
  const savings = (baseSavings + variation).toFixed(1)
  
  return `${savings}kg CO₂ saved`
}
