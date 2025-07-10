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


  return (
    <div className={`flex items-center bg-white  rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="w-8 h-8 rounded-2xl cursor-pointer text-white bg-primary flex items-center justify-center  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>

      <span className="w-16 h-10 flex items-center justify-center bg-white">
        {quantity}
      </span>

      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-8 h-8 rounded-2xl cursor-pointer text-white bg-primary flex items-center justify-center  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
