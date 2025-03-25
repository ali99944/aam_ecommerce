"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { IconButton } from "./button"

interface CarouselProps {
  children: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showDots?: boolean
  className?: string
}

export function Carousel({
  children,
  autoPlay = false,
  interval = 5000,
  showArrows = true,
  showDots = true,
  className = "",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const totalSlides = children.length
  const slideRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay || isHovered) return

    const interval_id = setInterval(nextSlide, interval)
    return () => clearInterval(interval_id)
  }, [autoPlay, interval, isHovered])

  return (
    <div
      className={`relative overflow-hidden rounded-sm ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={slideRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(${currentIndex * 100 * -1}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {showArrows && totalSlides > 1 && (
        <>
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
            <IconButton
              icon={ChevronRight}
              variant="primary"
              onClick={nextSlide}
              aria-label="Next slide"
              className="bg-white/80 text-[#00998F] hover:bg-white"
            />
          </div>
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <IconButton
              icon={ChevronLeft}
              variant="primary"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="bg-white/80 text-[#00998F] hover:bg-white"
            />
          </div>
        </>
      )}

      {showDots && totalSlides > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "bg-[#00998F] w-4" : "bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const CarouselContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex">{children}</div>
}

export const CarouselItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full flex-shrink-0">{children}</div>
}

export const CarouselPrevious = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton
      icon={ChevronLeft}
      variant="primary"
      onClick={onClick}
      aria-label="Previous slide"
      className="bg-white/80 text-[#00998F] hover:bg-white"
    />
  )
}

export const CarouselNext = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton
      icon={ChevronRight}
      variant="primary"
      onClick={onClick}
      aria-label="Next slide"
      className="bg-white/80 text-[#00998F] hover:bg-white"
    />
  )
}

