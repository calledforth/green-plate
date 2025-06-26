"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Import local assets
import heroImg from "@/app/assets/alex-munsell-auIbTAcSH6E-unsplash.jpg"
import aboutImg from "@/app/assets/brooke-lark-R18ecx07b3c-unsplash.jpg"
import organicImg1 from "@/app/assets/eaters-collective-ddZYOtZUnBk-unsplash.jpg"
import organicImg2 from "@/app/assets/victoria-shes-UC0HZdUitWY-unsplash.jpg"
import organicImg3 from "@/app/assets/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg"
import organicImg4 from "@/app/assets/chad-montano-eeqbbemH9-c-unsplash.jpg"
import premiumImg from "@/app/assets/odiseo-castrejon-1SPu0KT-Ejg-unsplash.jpg"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLElement[]>([])

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

  return (
    <div ref={containerRef} className="w-full">
      {/* Hero Section - Slide 1 */}
      <section 
        ref={addToRefs}
        className="relative h-screen flex items-center justify-start overflow-hidden"
      >
        <div className="absolute inset-0 bg-image">
          <Image
            src={heroImg}
            alt="Fresh organic food"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl">
            <div className="space-y-8">
              <h1 className="animate-text text-6xl md:text-8xl lg:text-[8rem] font-thin text-white leading-[0.9] tracking-tight">
                Fresh & <span className="italic font-light">Organic</span>
                <br />
                <span className="italic font-extralight text-5xl md:text-7xl lg:text-[7rem]">farm to table</span>
                <br />
                <span className="font-normal text-5xl md:text-7xl lg:text-[7rem]">Delivered</span>
              </h1>
              
              <p className="animate-text text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-light">
                Discover our selection of eco-conscious meals that help reduce your carbon footprint while delighting your taste buds.
              </p>
              
              <div className="animate-text pt-6">
                <Link href="/login">
                  <Button 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 text-xl font-medium rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Explore Menu
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
        className="relative h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-background dark:to-muted/30"
      >
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="animate-text text-6xl md:text-8xl font-thin mb-12 text-foreground leading-tight">
                About <span className="italic font-extralight">Us</span>
              </h2>
              <div className="space-y-8">
                <p className="animate-text text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  We are on a mission to provide you with the finest, freshest, and healthiest organic produce straight from the farm to your table.
                </p>
                <p className="animate-text text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  We believe that everyone deserves access to delicious, nutritious, rich, and pesticide-free food that nourishes both body and soul.
                </p>
              </div>
            </div>
            
            <div className="relative h-[70vh] animate-image">
              <Image
                src={aboutImg}
                alt="About our organic farm"
                fill
                className="object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Section - Slide 3 */}
      <section 
        ref={addToRefs}
        className="relative h-screen flex items-center justify-center bg-white dark:bg-background overflow-hidden"
      >
        {/* Background Design Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Image Shapes */}
          <div className="absolute top-20 left-10 w-40 h-40 animate-image">
            <Image
              src={organicImg1}
              alt="Organic ingredient"
              fill
              className="object-cover rounded-full shadow-2xl opacity-20"
            />
          </div>
          
          <div className="absolute top-32 right-16 w-60 h-32 animate-image">
            <Image
              src={organicImg2}
              alt="Fresh produce"
              fill
              className="object-cover rounded-[50px] shadow-2xl opacity-15 rotate-12"
            />
          </div>
          
          <div className="absolute bottom-40 left-20 w-32 h-48 animate-image">
            <Image
              src={organicImg3}
              alt="Farm fresh"
              fill
              className="object-cover rounded-[60px] shadow-2xl opacity-25 -rotate-6"
            />
          </div>
          
          <div className="absolute bottom-32 right-10 w-44 h-44 animate-image">
            <Image
              src={organicImg4}
              alt="Sustainable food"
              fill
              className="object-cover rounded-full shadow-2xl opacity-20"
            />
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 animate-image">
            <Image
              src={aboutImg}
              alt="Quality ingredients"
              fill
              className="object-cover rounded-full shadow-2xl opacity-10"
            />
          </div>
          
          {/* Additional decorative shapes */}
          <div className="absolute top-16 left-1/3 w-24 h-16 animate-image">
            <Image
              src={premiumImg}
              alt="Premium quality"
              fill
              className="object-cover rounded-[40px] shadow-xl opacity-15 rotate-45"
            />
          </div>
          
          <div className="absolute bottom-20 left-1/2 w-36 h-20 animate-image">
            <Image
              src={heroImg}
              alt="Farm to table"
              fill
              className="object-cover rounded-[50px] shadow-xl opacity-20 -rotate-12"
            />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto space-y-12 text-center">
            <h2 className="animate-text text-7xl md:text-9xl font-thin text-foreground leading-tight">
              Sustainable
              <br />
              <span className="italic font-extralight">farm to table</span>
            </h2>
            <p className="animate-text text-2xl md:text-3xl text-muted-foreground leading-relaxed font-light max-w-4xl mx-auto">
              Every ingredient tells a story of careful cultivation, environmental respect, and uncompromising quality. From seed to plate, we ensure sustainable practices that benefit both your health and our planet.
            </p>
            
            {/* Central Feature Image */}
            <div className="animate-image pt-8">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 rounded-full"></div>
                <div className="absolute inset-4 overflow-hidden rounded-full shadow-2xl">
                  <Image
                    src={organicImg1}
                    alt="Sustainable organic food"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white dark:bg-background rounded-full shadow-xl flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Organic Picks - Slide 4 */}
      <section 
        ref={addToRefs}
        className="relative h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-muted/30 dark:to-background"
      >
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="animate-text text-6xl md:text-8xl font-thin mb-8 text-foreground">
              Popular <span className="italic font-extralight">Organic</span> Picks
            </h2>
            <p className="animate-text text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Handpicked selections from our finest organic produce, prepared with care and delivered fresh to your doorstep.
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
                    alt={`Organic selection ${index + 1}`}
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

      {/* Ready to Taste Excellence - Slide 5 */}
      <section 
        ref={addToRefs}
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-image">
          <Image
            src={premiumImg}
            alt="Organic excellence"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-8 lg:px-16">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="animate-text text-7xl md:text-9xl font-thin text-white leading-tight">
              Ready to Taste
              <br />
              <span className="italic font-extralight">Organic Excellence</span>?
            </h2>
            <p className="animate-text text-2xl md:text-3xl text-white/90 leading-relaxed font-light max-w-4xl mx-auto">
              Join our community of conscious eaters and experience the difference that truly organic, sustainable food can make in your life.
            </p>
            <div className="animate-text pt-8">
              <Link href="/menu">
                <Button 
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-16 py-6 text-2xl font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  Start Your Journey
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Selection - Slide 6 */}
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
                  alt="Premium organic selection"
                  fill
                  className="object-cover rounded-full shadow-2xl"
                />
              </div>
            </div>
            
            <div>
              <h2 className="animate-text text-6xl md:text-8xl font-thin mb-12 text-foreground leading-tight">
                Premium
                <br />
                <span className="italic font-extralight">Organic</span>
                <br />
                Selection
              </h2>
              <div className="space-y-8">
                <p className="animate-text text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Our premium selection features the finest organic ingredients, carefully sourced from trusted local farms and prepared with artisanal techniques.
                </p>
                <div className="animate-text pt-6">
                  <Link href="/menu">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full px-12 py-4 text-xl font-medium transition-all duration-300"
                    >
                      View Premium Selection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questions Section - Slide 7 */}
      <section 
        ref={addToRefs}
        className="relative h-screen flex items-center justify-center text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-muted/30 dark:to-background"
      >
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="animate-text text-7xl md:text-9xl font-thin text-foreground">
              Questions
            </h2>
            <div className="space-y-8">
              <p className="animate-text text-2xl md:text-3xl text-muted-foreground leading-relaxed font-light">
                Have questions about our organic selections, delivery process, or sustainability practices?
              </p>
              <div className="animate-text space-y-6 text-lg md:text-xl text-muted-foreground font-light">
                <p className="italic">"Why green? Because we care"</p>
                <p className="italic">"Why organic? Because you deserve better"</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

