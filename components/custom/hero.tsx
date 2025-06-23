"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "../ui/button"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  const slides = [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1920&h=1080&fit=crop",
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${slides[currentSlide]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right order-2 lg:order-1 text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">أفضل التخفيضات 2022</h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
              متجر محلاتنا يوفر لك كل ما تحتاجه من كمبيوترات أو أجهزة ذكية بأفضل التخفيضات على المنتجات. تسوق الآن واستمتع
              بكل التخفيضات على المنتجات المتوفرة
            </p>
            <Button className="w-full sm:w-auto">
              اكتشف المزيد
            </Button>
          </div>

          {/* Empty div to maintain grid structure */}
          <div className="order-1 lg:order-2" />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 cursor-pointer ${
                index === currentSlide ? "bg-teal-500" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
