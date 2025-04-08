// app/api/meals/route.ts
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('greenplate')
    const meals = await db.collection('meals').find({}).toArray()

    return NextResponse.json(meals)
  } catch (error) {
    console.error("Error fetching meals:", error)
    return NextResponse.json(
      [
        { name: "Vegan Bowl", price: 10, isVegan: true },
        { name: "Chicken Wrap", price: 12, isVegan: false },
        { name: "Green Smoothie", price: 8, isVegan: true },
        { name: "Grilled Paneer", price: 11, isVegan: true },
        { name: "Fish Taco", price: 13, isVegan: false },
        { name: "Tofu Stir Fry", price: 9, isVegan: true },
      ],
      { status: 200 }
    )
  }
}
