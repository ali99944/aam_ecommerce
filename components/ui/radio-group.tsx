"use client"

import Radio from "./radio"

interface RadioOption {
  value: string
  label: string
  description?: string
}

interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string
  onChange: (value: string) => void
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function RadioGroup({ name, options, value, onChange, className = "", size = "md" }: RadioGroupProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
          label={option.label}
          description={option.description}
          size={size}
        />
      ))}
    </div>
  )
}
