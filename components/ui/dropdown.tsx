"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  className?: string
  align?: "left" | "right" | "center"
}

export default function Dropdown({ trigger, children, className = "", align = "right" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0, right: 0 })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      let newPosition = {
        top: triggerRect.bottom + window.scrollY,
        left: triggerRect.left + window.scrollX,
        right: viewportWidth - triggerRect.right - window.scrollX
      }

      // Check if dropdown would overflow right side
      if (align === "right" && triggerRect.right > viewportWidth * 0.7) {
        newPosition.right = viewportWidth - triggerRect.right - window.scrollX
      }
      
      // Check if dropdown would overflow left side
      if (align === "left" && triggerRect.left < viewportWidth * 0.3) {
        newPosition.left = triggerRect.left + window.scrollX
      }

      // Check if dropdown would overflow bottom
      if (triggerRect.bottom > viewportHeight * 0.7) {
        newPosition.top = triggerRect.top + window.scrollY - 200 // Approximate dropdown height
      }

      setPosition(newPosition)
    }
  }, [isOpen, align])

  const getAlignmentClasses = () => {
    switch (align) {
      case "left":
        return "left-0"
      case "center":
        return "left-1/2 transform -translate-x-1/2"
      case "right":
      default:
        return "right-0"
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-max ${getAlignmentClasses()} ${className}`}
          style={{
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
