"use client"

import type React from "react"

import { X } from "lucide-react"

type BadgeVariant = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "outline"
type BadgeSize = "xs" | "sm" | "md" | "lg"

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export function Badge({ 
  children, 
  variant = "default", 
  size = "md", 
  dismissible = false, 
  onDismiss, 
  className = "" 
}: BadgeProps) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-[#00998F] text-white",
    secondary: "bg-[#D2EAE8] text-[#00998F]",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    outline: "bg-transparent border border-gray-300 text-gray-800",
  }

  const sizeClasses = {
    xs: "text-xs px-1.5 py-0.5",
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-sm px-3 py-1.5"
  }

  const iconSizes = {
    xs: "h-2.5 w-2.5",
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4"
  }

  const iconMargins = {
    xs: "ml-1 mr-0.5",
    sm: "ml-1.5 mr-0.5",
    md: "ml-2 mr-1",
    lg: "ml-2.5 mr-1"
  }

  return (
    <span
      className={`inline-flex items-center rounded-sm font-medium max-w-fit ${
        variantClasses[variant]
      } ${
        sizeClasses[size]
      } ${className}`}
    >
      {children}

      {dismissible && (
        <button 
          type="button" 
          className={`hover:opacity-75 ${iconMargins[size]}`} 
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X className={iconSizes[size]} />
        </button>
      )}
    </span>
  )
}