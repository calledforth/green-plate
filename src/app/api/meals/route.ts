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
        price: `$${meal.price || 0}`, // Format price with $ sign
        dietaryType: determineDietaryType(meal), // Determine type based on isVegan
        co2Saved: calculateCO2Savings(meal), // Calculate CO2 savings
        isVegan: meal.isVegan // Keep original field for reference
      }
    })

    return NextResponse.json(formattedMeals)
  } catch (error) {
    console.error("Error fetching meals:", error)
    return NextResponse.json(
      { error: "Failed to fetch meals" },
      { status: 500 }
    )
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
