import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import Header from "@/components/header";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Green Plate - Sustainable Food Choices",
  description: "Discover delicious, eco-friendly meals that help reduce your carbon footprint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
        bg-[#FFF5ED] dark:bg-background text-gray-900 dark:text-foreground transition-colors duration-200`}
      >
        <ThemeProvider>
          <Header />
          <CartProvider>
            <main className="min-h-screen">
              {children}
            </main>
            <Toaster richColors position="bottom-center" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
