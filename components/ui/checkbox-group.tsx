"use client"

import { createContext, useContext } from "react"

interface CheckboxGroupContextType {
  values: string[]
  onChange: (value: string) => void
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType | undefined>(undefined)

interface CheckboxGroupProps {
  values: string[]
  onChange: (values: string[]) => void
  children: React.ReactNode
  className?: string
  orientation?: "horizontal" | "vertical"
}

export function CheckboxGroup({
  values,
  onChange,
  children,
  className = "",
  orientation = "vertical",
}: CheckboxGroupProps) {
  const handleChange = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value))
    } else {
      onChange([...values, value])
    }
  }

  return (
    <CheckboxGroupContext.Provider value={{ values, onChange: handleChange }}>
      <div className={`flex ${orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-4"} ${className}`}>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  )
}

interface CheckboxItemProps {
  value: string
  label: string
  description?: string
  disabled?: boolean
  className?: string
}

export function CheckboxItem({ value, label, description, disabled = false, className = "" }: CheckboxItemProps) {
  const context = useContext(CheckboxGroupContext)

  if (!context) {
    throw new Error("CheckboxItem must be used within a CheckboxGroup")
  }

  const { values, onChange } = context
  const isChecked = values.includes(value)

  return (
    <label
      className={`flex items-start cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      <div className="flex-shrink-0 mt-1">
        <div
          className={`h-4 w-4 rounded-sm border ${
            isChecked ? "border-primary bg-primary" : "border-gray-300 bg-white"
          } flex items-center justify-center`}
        >
          {isChecked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3 text-white"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
        <input
          type="checkbox"
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

