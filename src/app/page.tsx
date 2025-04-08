"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to menu page
    router.push("/menu")
  }, [router])
  
  // Return empty div while redirecting
  return <div></div>
}
