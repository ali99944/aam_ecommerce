"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

type TooltipPosition = "top" | "right" | "bottom" | "left"

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  position?: TooltipPosition
  delay?: number
  className?: string
}

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 300,
  className = ""
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const scrollY = window.scrollY
    const scrollX = window.scrollX

    let top = 0
    let left = 0

    switch (position) {
      case "top":
        top = triggerRect.top + scrollY - tooltipRect.height - 8
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2)
        break
      case "right":
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2)
        left = triggerRect.right + scrollX + 8
        break
      case "bottom":
        top = triggerRect.bottom + scrollY + 8
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2)
        break
      case "left":
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2)
        left = triggerRect.left + scrollX - tooltipRect.width - 8
        break
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Adjust horizontal position if needed
    if (left < 10) left = 10
    if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10
    }

    // Adjust vertical position if needed
    if (top < 10) top = 10
    if (top + tooltipRect.height > viewportHeight + scrollY - 10) {
      top = viewportHeight + scrollY - tooltipRect.height - 10
    }

    setTooltipPosition({ top, left })
  }

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      // Wait for next tick to ensure tooltip is rendered before calculating position
      setTimeout(calculatePosition, 0)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  // Position classes based on direction
  const getPositionClasses = () => {
    switch (position) {
      case "top": return "mb-2 bottom-full left-1/2 transform -translate-x-1/2"
      case "right": return "mr-2 right-full top-1/2 transform -translate-y-1/2"
      case "bottom": return "mt-2 top-full left-1/2 transform -translate-x-1/2"
      case "left": return "ml-2 left-full top-1/2 transform -translate-y-1/2"
      default: return "mb-2 bottom-full left-1/2 transform -translate-x-1/2"
    }
  }

  return (
    <div 
      className="inline-block relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      ref={triggerRef}
    >
      {children}
      
      {isMounted && isVisible && createPortal(
        <div
          ref={tooltipRef}
          className={`fixed z-50 px-2 py-1 text-sm text-white bg-gray-800 rounded-sm shadow-lg whitespace-nowrap ${className}`}
          style={{ 
            top: `${tooltipPosition.top}px`, 
            left: `${tooltipPosition.left}px`,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out'
          }}
        >
          {content}
          <div 
            className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${
              position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
              position === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2' :
              position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
              'right-[-4px] top-1/2 -translate-y-1/2'
            }`}
          />
        </div>,
        document.body
      )}
    </div>
  )
}
