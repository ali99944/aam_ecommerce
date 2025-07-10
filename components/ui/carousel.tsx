"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Swiper as SwiperType } from "swiper"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface CarouselProps {
  children: React.ReactNode[]
  slidesPerView?: {
    small_mobile: number
    mobile?: number
    tablet?: number
    desktop?: number
  }
  spaceBetween?: number
  className?: string
  title: string
  loop?: boolean
  showPagination?: boolean
  autoplay?: boolean
  autoplayDelay?: number
}

export default function Carousel({
  children,
  slidesPerView = {
    small_mobile: 1,
    mobile: 2,
    tablet: 3,
    desktop: 4
  },
  spaceBetween = 24,
  className = "",
  title,
  loop = false,
  showPagination = false,
  autoplay = false,
  autoplayDelay = 3000,
}: CarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <div className={`relative ${className}`} dir="rtl">
      {/* Header with title and navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-bold text-primary">{title}</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevSlide}
            disabled={!loop && isBeginning}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
              border border-gray-200 hover:border-primary
              ${
                !loop && isBeginning
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-primary text-gray-600 hover:text-white cursor-pointer"
              }
            `}
            aria-label="Previous slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleNextSlide}
            disabled={!loop && isEnd}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
              border border-gray-200 hover:border-primary
              ${
                !loop && isEnd
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-primary text-gray-600 hover:text-white cursor-pointer"
              }
            `}
            aria-label="Next slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            handleSlideChange(swiper)
          }}
          onSlideChange={handleSlideChange}
          spaceBetween={spaceBetween}
          loop={loop}
          autoplay={
            autoplay
              ? {
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }
              : false
          }
          pagination={
            showPagination
              ? {
                  clickable: true,
                  bulletClass: "swiper-pagination-bullet !bg-gray-300",
                  bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
                }
              : false
          }
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: slidesPerView.small_mobile || 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: slidesPerView.mobile || 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: slidesPerView.tablet || 2,
              spaceBetween: spaceBetween,
            },
            1024: {
              slidesPerView: slidesPerView.desktop || 4,
              spaceBetween: spaceBetween,
            },
          }}
          className="!pb-8"
          style={{
            overflow: "hidden", // This is key - prevents showing all slides
          }}
        >
          {children.map((child, index) => (
            <SwiperSlide key={index} className="h-auto">
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
