"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Dancing_Script } from "next/font/google"

// Import stylized font
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
})

// Import local assets
import heroImg from "@/app/assets/alex-munsell-auIbTAcSH6E-unsplash.jpg"
import aboutImg from "@/app/assets/brooke-lark-R18ecx07b3c-unsplash.jpg"
import organicImg1 from "@/app/assets/eaters-collective-ddZYOtZUnBk-unsplash.jpg"
import organicImg2 from "@/app/assets/victoria-shes-UC0HZdUitWY-unsplash.jpg"
import organicImg3 from "@/app/assets/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg"
import organicImg4 from "@/app/assets/chad-montano-eeqbbemH9-c-unsplash.jpg"
import premiumImg from "@/app/assets/odiseo-castrejon-1SPu0KT-Ejg-unsplash.jpg"

const slideshowImages = [heroImg, aboutImg, organicImg1, premiumImg, organicImg4];

// Animation Variants
const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const lineAnim = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLElement[]>([])
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % slideshowImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const sections = sectionsRef.current
    const container = containerRef.current

    if (!container || sections.length === 0) return

    // Remove any height restrictions to allow natural scrolling
    gsap.set(container, {
      overflow: "visible"
    })

    // Create timeline for smooth transitions
    sections.forEach((section, index) => {
      if (!section) return

      // Parallax effect for background images
      const bgImage = section.querySelector('.bg-image')
      if (bgImage) {
        gsap.fromTo(bgImage, 
          { scale: 1.2, y: 0 },
          {
            scale: 1,
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        )
      }

      // Text animations
      const textElements = section.querySelectorAll('.animate-text')
      textElements.forEach((text, textIndex) => {
        gsap.fromTo(text,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: textIndex * 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // Image reveal animations
      const images = section.querySelectorAll('.animate-image')
      images.forEach((img, imgIndex) => {
        gsap.fromTo(img,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            delay: imgIndex * 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <div ref={containerRef} className={`w-full ${dancingScript.variable}`}>
      {/* Hero Section - Slide 1 */}
      <section 
        ref={addToRefs}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence>
            <motion.div
              key={imgIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -50, x: 100, rotate: 15 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <Image
                src={slideshowImages[imgIndex]}
                alt="Healthy sustainable food delivery"
                fill
                className="object-cover w-full"
                priority={imgIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-8 lg:px-16 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <motion.h1 
                variants={sentence}
                initial="hidden"
                animate="visible"
                className="text-6xl md:text-8xl lg:text-[8rem] font-thin text-white leading-[0.9] tracking-tight"
              >
                <div className="overflow-hidden pb-4">
                  <motion.div variants={lineAnim}>Healthy <span className="italic font-light">Meals</span></motion.div>
                </div>
                <div className="overflow-hidden pb-4">
                  <motion.div variants={lineAnim} className="italic font-extralight text-5xl md:text-7xl lg:text-[7rem]">for your wellness</motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div variants={lineAnim} className="font-normal text-5xl md:text-7xl lg:text-[7rem]">Delivered</motion.div>
                </div>
              </motion.h1>
              
              <p className="animate-text text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
                Order nutritious, sustainable meals that boost your health while reducing your carbon footprint. Every bite counts towards a healthier you and planet.
              </p>
              
              <div className="animate-text pt-6">
                <Link href="/login">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="bg-black/30 text-white/90 border border-white/20 backdrop-blur-md hover:bg-black/40 hover:border-white/30 px-12 py-6 text-xl font-medium rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Start Eating Healthy
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Slide 2 */}
      <section 
        ref={addToRefs}
        className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900 py-24 overflow-hidden"
      >

        <div className="container mx-auto px-8 lg:px-16">
          <div className="relative flex items-center justify-center lg:h-[70vh]">
            {/* Image Card (Bottom Layer) */}
            <motion.div 
              className="relative w-full lg:w-7/12 h-[50vh] lg:h-full rounded-3xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src={aboutImg}
                alt="Healthy sustainable nutrition"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Text Card (Top Layer) */}
            <motion.div 
              className="absolute lg:left-1/2 -bottom-20 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 w-11/12 lg:w-6/12 bg-white/70 dark:bg-black/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-6xl font-thin mb-8 text-gray-900 dark:text-white leading-tight">
                Your <span className="italic font-extralight">Health</span>
                <br />
                <span className="italic font-extralight">Our Mission</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-light">
                  We deliver fresh, nutritious meals designed by nutritionists to support your health goals while making sustainable choices effortless.
                </p>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-light">
                  Every meal is crafted with locally-sourced, organic ingredients that nourish your body and reduce environmental impact.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainable Section - Slide 3 */}
      <section 
        ref={addToRefs}
        className="relative min-h-screen py-32 flex items-center justify-center bg-white dark:bg-background overflow-hidden"
      >
        {/* Background Design Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Image Shapes */}
          <div className="absolute top-20 left-10 w-40 h-40 animate-image">
            <Image
              src={organicImg1}
              alt="Nutritious ingredients"
              fill
              className="object-cover rounded-full shadow-2xl opacity-30"
            />
          </div>
          
          <div className="absolute top-32 right-16 w-60 h-32 animate-image">
            <Image
              src={organicImg2}
              alt="Fresh healthy produce"
              fill
              className="object-cover rounded-[50px] shadow-2xl opacity-25 rotate-12"
            />
          </div>
          
          <div className="absolute bottom-40 left-20 w-32 h-48 animate-image">
            <Image
              src={organicImg3}
              alt="Wellness-focused meals"
              fill
              className="object-cover rounded-[60px] shadow-2xl opacity-35 -rotate-6"
            />
          </div>
          
          <div className="absolute bottom-32 right-10 w-44 h-44 animate-image">
            <Image
              src={organicImg4}
              alt="Healthy lifestyle food"
              fill
              className="object-cover rounded-full shadow-2xl opacity-30"
            />
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 animate-image">
            <Image
              src={aboutImg}
              alt="Quality nutrition"
              fill
              className="object-cover rounded-full shadow-2xl opacity-20"
            />
          </div>
          
          {/* Additional decorative shapes */}
          <div className="absolute top-16 left-1/3 w-24 h-16 animate-image">
            <Image
              src={premiumImg}
              alt="Premium healthy meals"
              fill
              className="object-cover rounded-[40px] shadow-xl opacity-25 rotate-45"
            />
          </div>
          
          <div className="absolute bottom-20 left-1/2 w-36 h-20 animate-image">
            <Image
              src={heroImg}
              alt="Nutritious delivery"
              fill
              className="object-cover rounded-[50px] shadow-xl opacity-30 -rotate-12"
            />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto space-y-12 text-center">
            <h2 className="animate-text text-7xl md:text-9xl font-thin text-foreground leading-tight">
              Nutrition
              <br />
              <span className="italic font-extralight">meets sustainability</span>
            </h2>
            <p className="animate-text text-2xl md:text-3xl text-muted-foreground leading-relaxed font-light max-w-4xl mx-auto">
              Each meal is scientifically crafted to provide optimal nutrition while supporting environmental wellness. Track calories, CO₂ savings, and health goals with every order.
            </p>
            
            {/* Central Feature Image */}
            <div className="animate-image pt-8">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 rounded-full"></div>
                <div className="absolute inset-4 overflow-hidden rounded-full shadow-2xl">
                  <Image
                    src={organicImg1}
                    alt="Healthy sustainable nutrition"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white dark:bg-background rounded-full shadow-xl flex items-center justify-center">
                  <span className="text-2xl">💚</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthy Picks - Slide 4 */}
      <section 
        ref={addToRefs}
        className="relative h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-muted/30 dark:to-background"
      >
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="animate-text text-6xl md:text-8xl font-thin mb-8 text-foreground">
              Popular <span className="italic font-extralight">Healthy</span> Picks
            </h2>
            <p className="animate-text text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Discover our most-loved nutritious meals, each designed to fuel your body and support your wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[organicImg1, organicImg2, organicImg3, organicImg4].map((img, index) => (
              <div
                key={index}
                className="animate-image group cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src={img}
                    alt={`Healthy meal option ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Plus className="w-6 h-6 text-gray-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Slide 5 */}
      <section 
        ref={addToRefs}
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-image">
          <Image
            src={premiumImg}
            alt="Start your healthy journey"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="animate-text text-7xl md:text-9xl font-thin text-white leading-tight">
              Ready to Transform
              <br />
              <span className="italic font-extralight">Your Health</span>?
            </h2>
            <p className="animate-text text-2xl md:text-3xl text-white/90 leading-relaxed font-light max-w-4xl mx-auto">
              Join thousands who've improved their wellness with nutritious, sustainable meals delivered to their doorstep.
            </p>
            <div className="animate-text pt-8">
              <Link href="/menu">
                <Button 
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-16 py-6 text-2xl font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  Browse Healthy Meals
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Selection - Slide 6 */}
      <section 
        ref={addToRefs}
        className="relative h-screen flex items-center bg-white dark:bg-background"
      >
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative h-[70vh] animate-image">
              <div className="relative w-96 h-96 mx-auto">
                <Image
                  src={organicImg1}
                  alt="Premium wellness nutrition"
                  fill
                  className="object-cover rounded-full shadow-2xl"
                />
              </div>
            </div>
            
            <div>
              <h2 className="animate-text text-6xl md:text-8xl font-thin mb-12 text-foreground leading-tight">
                Wellness
                <br />
                <span className="italic font-extralight">Focused</span>
                <br />
                Nutrition
              </h2>
              <div className="space-y-8">
                <p className="animate-text text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Our nutritionist-designed meals support specific health goals - from weight management to energy boost, immune support to muscle building.
                </p>
                <div className="animate-text pt-6">
                  <Link href="/menu">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full px-12 py-4 text-xl font-medium transition-all duration-300"
                    >
                      Explore Wellness Menu
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Slide 7 */}
      <section 
        ref={addToRefs}
        className="relative min-h-screen py-32 flex items-center justify-center bg-[#2d4a3a] overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 animate-image">
            <Image
              src={organicImg1}
              alt="Healthy ingredients"
              fill
              className="object-cover rounded-full shadow-2xl opacity-10"
            />
          </div>
          <div className="absolute bottom-32 right-20 w-40 h-24 animate-image">
            <Image
              src={organicImg2}
              alt="Nutritious meals"
              fill
              className="object-cover rounded-[30px] shadow-xl opacity-15 rotate-12"
            />
          </div>
          <div className="absolute top-1/3 right-16 w-28 h-28 animate-image">
            <Image
              src={organicImg3}
              alt="Wellness food"
              fill
              className="object-cover rounded-full shadow-xl opacity-12"
            />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-8 lg:px-16">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="animate-text text-5xl md:text-7xl font-thin text-white leading-tight mb-6">
              Get healthy
              <br />
              <span className="italic font-extralight">eating tips</span>
            </h2>
            <p className="animate-text text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-lg mx-auto">
              Receive personalized nutrition insights, meal planning tips, and exclusive healthy recipes delivered to your inbox weekly.
            </p>
            
            <div className="animate-text pt-6">
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-full px-6 py-3 text-lg backdrop-blur-sm focus:bg-white/15 focus:border-white/40"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-white text-[#2d4a3a] hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? "Subscribed! ✓" : "Get Tips"}
                  {!isSubscribed && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>
              
              {isSubscribed && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm mt-4"
                >
                  Welcome to healthy living! Check your inbox for your first tip.
                </motion.p>
              )}
            </div>
            
            <div className="animate-text pt-16">
              <div className={`text-8xl md:text-[12rem] lg:text-[14rem] font-bold text-white/50 tracking-wider leading-none ${dancingScript.className}`}>
                Green Plate
              </div>
              <p className="text-white/70 text-lg md:text-xl mt-4 font-light">
                Your partner in healthy, sustainable eating
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

