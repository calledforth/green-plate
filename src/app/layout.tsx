import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import Header from "@/components/header";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFF5ED]`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
