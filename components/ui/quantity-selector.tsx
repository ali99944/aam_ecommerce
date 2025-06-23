"use client"

import type React from "react"

import { useState } from "react"
import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  min?: number
  max?: number
  value?: number
  onChange?: (value: number) => void
  className?: string
}

export default function QuantitySelector({
  min = 1,
  max = 99,
  value = 1,
  onChange,
  className = "",
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(value)

  const handleDecrease = () => {
    if (quantity > min) {
      const newValue = quantity - 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      const newValue = quantity + 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value) || min
    if (newValue >= min && newValue <= max) {
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  return (
    <div className={`flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
      >
        <Minus className="w-4 h-4" />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="w-16 h-10 text-center border-0 focus:outline-none focus:ring-0 bg-white"
      />

      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
