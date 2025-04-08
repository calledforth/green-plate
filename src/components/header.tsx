"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4">
      <Link
        href="/menu"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/menu"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Menu
      </Link>
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Dashboard
      </Link>
    </nav>
  );
}

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">Green Plate</h1>
        </Link>
        <Button 
          variant="outline" 
          onClick={() => console.log("Sign out clicked")}
        >
          Sign Out
        </Button>
      </div>
    </header>
  )
}