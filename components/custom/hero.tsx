"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "../ui/button"
import Link from "next/link"
import { useGetQuery } from "@/src/hooks/queries-actions"

// Define the type for a single banner object coming from the API
interface Banner {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  button_text: string | null;
  button_url: string | null;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // --- API Integration ---
  const { data: banners, isLoading, error } = useGetQuery<Banner[]>({
    url: "/banners",
    key: ['banners']
  })

  console.log(banners);
  

  // --- Component Logic ---
  const totalSlides = banners?.length || 0

  const nextSlide = useCallback(() => {
    if (totalSlides > 0) {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }
  }, [totalSlides])

  const prevSlide = () => {
    if (totalSlides > 0) {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    }
  }

  // Optional: Auto-play slider
  useEffect(() => {
    if (totalSlides > 1) {
      const slideInterval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
      return () => clearInterval(slideInterval) // Clean up on component unmount
    }
  }, [nextSlide, totalSlides])


  // --- Render States ---

  // Loading State
  if (isLoading) {
    // You can use a dedicated skeleton loader for the hero section
    return <div className="relative h-[600px] bg-gray-200 animate-pulse" />
  }

  // Error State
  if (error || !banners) {
    return (
      <div className="relative h-[600px] bg-red-100 flex items-center justify-center text-center">
        <div>
            <h2 className="text-2xl font-bold text-red-700">حدث خطأ</h2>
            <p className="text-red-600 mt-2">لم نتمكن من تحميل العروض. يرجى المحاولة مرة أخرى لاحقاً.</p>
        </div>
      </div>
    )
  }

  // Empty State (API returns empty array)
  if (totalSlides === 0) {
     return (
      <div className="relative h-[600px] bg-gray-100 flex items-center justify-center text-center">
        <div>
            <h2 className="text-2xl font-bold text-gray-700">لا توجد عروض حالياً</h2>
            <p className="text-gray-600 mt-2">يرجى التحقق مرة أخرى قريباً!</p>
        </div>
      </div>
    )
  }

  // --- Main Component Render ---
  const activeBanner = banners[currentSlide];

  return (
    <div className="relative h-[600px] overflow-hidden text-white" dir="rtl">
      {/* Background Image Slider */}
      {banners.map((banner, index) => (
         <div 
            key={banner.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${banner.image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
             {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}
     

      <div className="relative h-full max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            {/* Animate content on slide change */}
             <div key={currentSlide} className="animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">{activeBanner.title}</h1>
                {activeBanner.description && (
                  <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                    {activeBanner.description}
                  </p>
                )}
                {activeBanner.button_text && activeBanner.button_url && (
                   <Link href={activeBanner.button_url}>
                      <Button className="w-full sm:w-auto">
                        {activeBanner.button_text}
                      </Button>
                   </Link>
                )}
             </div>
          </div>

          {/* Empty div to maintain grid structure */}
          <div className="order-1 lg:order-2" />
        </div>

        {/* Navigation Arrows (only show if more than one slide) */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer z-10"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer z-10"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md-h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 cursor-pointer ${
                    index === currentSlide ? "bg-teal-500" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}