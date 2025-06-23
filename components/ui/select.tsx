"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function Select({ options, value, onChange, placeholder = "اختر...", className = "", size = "sm" }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  }

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-200 flex items-center justify-between text-right ${sizes[size]} ${className}`}
      >
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className="w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              {option.value === value && <Check className="w-4 h-4 text-[var(--accent)]" />}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
