"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function MenuPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Green Plate</h1>
          <Button 
            variant="outline" 
            onClick={() => router.push("/login")}
          >
            Sign Out
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6">Welcome to the Menu Page</h2>
        <p>This is a simple placeholder for your menu content.</p>
      </main>
    </div>
  );
}