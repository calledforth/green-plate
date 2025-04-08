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
  }
}
