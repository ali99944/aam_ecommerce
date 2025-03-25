"use client"

import type React from "react"

import { X } from "lucide-react"
import { useState } from "react"

type BannerVariant = "info" | "success" | "warning" | "error"

interface BannerProps {
  title?: string
  message: string
  variant?: BannerVariant
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  dismissible?: boolean
  className?: string
}

export function Banner({
  title,
  message,
  variant = "info",
  icon,
  action,
  dismissible = false,
  className = "",
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const variantStyles = {
    info: "bg-[#D2EAE8] border-[#00998F] text-[#00998F]",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    error: "bg-red-50 border-red-200 text-red-800",
  }

  return (
    <div className={`border-r-4 p-4 ${variantStyles[variant]} ${className}`}>
      <div className="flex items-start">
        {icon && <div className="flex-shrink-0 ml-3">{icon}</div>}

        <div className="flex-1">
          {title && <h3 className="text-base font-medium">{title}</h3>}
          <div className={`${title ? "mt-1" : ""} text-sm`}>{message}</div>

          {action && (
            <div className="mt-3">
              <button onClick={action.onClick} className="text-sm font-medium underline hover:no-underline">
                {action.label}
              </button>
            </div>
          )}
        </div>

        {dismissible && (
          <button className="flex-shrink-0 mr-3 hover:opacity-75" onClick={() => setIsVisible(false)}>
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}

