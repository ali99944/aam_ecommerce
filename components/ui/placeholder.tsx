"use client"

import type React from "react"

import { ImageIcon, User, MapPin, BarChart3 } from 'lucide-react'

interface PlaceholderProps {
  width?: string | number
  height?: string | number
  className?: string
  children?: React.ReactNode
}

// Basic Image Placeholder
export function ImagePlaceholder({ width = "100%", height = "200px", className = "" }: PlaceholderProps) {
  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-center text-gray-400">
        <ImageIcon className="w-12 h-12 mx-auto mb-2" />
        <p className="text-sm">صورة</p>
      </div>
    </div>
  )
}

// Avatar Placeholder
export function AvatarPlaceholder({ width = "60px", height = "60px", className = "" }: PlaceholderProps) {
  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <User className="w-6 h-6 text-gray-400" />
    </div>
  )
}

// Product Card Placeholder
export function ProductCardPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>
      <ImagePlaceholder height="200px" className="mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  )
}

// Text Placeholder
export function TextPlaceholder({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 rounded ${index === lines - 1 ? "w-2/3" : index % 2 === 0 ? "w-full" : "w-5/6"}`}
        ></div>
      ))}
    </div>
  )
}

// Button Placeholder
export function ButtonPlaceholder({ width = "120px", height = "40px", className = "" }: PlaceholderProps) {
  return <div className={`bg-gray-200 rounded-lg ${className}`} style={{ width, height }}></div>
}

// Video Placeholder
export function VideoPlaceholder({ width = "100%", height = "300px", className = "" }: PlaceholderProps) {
  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-center text-gray-400">
        <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="w-0 h-0 border-l-[8px] border-l-gray-400 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
        </div>
        <p className="text-sm">فيديو</p>
      </div>
    </div>
  )
}

// Map Placeholder
export function MapPlaceholder({ width = "100%", height = "400px", className = "" }: PlaceholderProps) {
  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-center text-gray-400">
        <MapPin className="w-12 h-12 mx-auto mb-2" />
        <p className="text-sm">خريطة</p>
      </div>
    </div>
  )
}

// Chart Placeholder
export function ChartPlaceholder({ width = "100%", height = "300px", className = "" }: PlaceholderProps) {
  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-center text-gray-400">
        <BarChart3 className="w-12 h-12 mx-auto mb-2" />
        <p className="text-sm">رسم بياني</p>
      </div>
    </div>
  )
}

// Form Field Placeholder
export function FormFieldPlaceholder({ label, width = "100%", className = "" }: { label?: string; width?: string | number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`} style={{ width }}>
      {label && <div className="h-4 bg-gray-200 rounded w-20"></div>}
      <div className="h-10 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg"></div>
    </div>
  )
}

// Navigation Placeholder
export function NavigationPlaceholder({ items = 5, className = "" }: { items?: number; className?: string }) {
  return (
    <div className={`flex gap-6 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="h-6 bg-gray-200 rounded w-16"></div>
      ))}
    </div>
  )
}

// Logo Placeholder
export function LogoPlaceholder({ width = "120px", height = "40px", className = "" }: PlaceholderProps) {
  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <span className="text-gray-400 text-xs font-medium">شعار</span>
    </div>
  )
}

// Banner Placeholder
export function BannerPlaceholder({ width = "100%", height = "200px", className = "" }: PlaceholderProps) {
  return (
    <div
      className={`bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-center text-gray-400">
        <ImageIcon className="w-16 h-16 mx-auto mb-2" />
        <p className="text-sm">بانر إعلاني</p>
      </div>
    </div>
  )
}
