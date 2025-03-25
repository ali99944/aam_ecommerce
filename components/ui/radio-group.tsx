"use client"

import type React from "react"

import { createContext, useContext } from "react"

interface RadioGroupContextType {
  value: string
  onChange: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined)

interface RadioGroupProps {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
  className?: string
  orientation?: "horizontal" | "vertical"
}

export function RadioGroup({ value, onChange, children, className = "", orientation = "vertical" }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onChange }}>
      <div className={`flex ${orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-4"} ${className}`}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

interface RadioItemProps {
  value: string
  label: string
  description?: string
  disabled?: boolean
  className?: string
}

export function RadioItem({ value, label, description, disabled = false, className = "" }: RadioItemProps) {
  const context = useContext(RadioGroupContext)

  if (!context) {
    throw new Error("RadioItem must be used within a RadioGroup")
  }

  const { value: selectedValue, onChange } = context
  const isChecked = selectedValue === value

  return (
    <label
      className={`flex items-start cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      <div className="flex-shrink-0 mt-1">
        <div
          className={`h-4 w-4 rounded-full border ${
            isChecked ? "border-[#00998F] bg-white" : "border-gray-300 bg-white"
          } flex items-center justify-center`}
        >
          {isChecked && <div className="h-2 w-2 rounded-full bg-[#00998F]"></div>}
        </div>
        <input
          type="radio"
          className="sr-only"
          value={value}
          checked={isChecked}
          onChange={() => onChange(value)}
          disabled={disabled}
        />
      </div>

      <div className="mr-2 text-right">
        <div className="text-sm font-medium">{label}</div>
        {description && <div className="text-xs text-gray-500 mt-0.5">{description}</div>}
      </div>
    </label>
  )
}

