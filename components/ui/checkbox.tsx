"use client"

import { Check } from "lucide-react"
import type { InputHTMLAttributes } from "react"

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  description?: string
  size?: "sm" | "md" | "lg"
}

export default function Checkbox({ label, description, size = "md", className = "", ...props }: CheckboxProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input type="checkbox" className="sr-only" {...props} />
        <div
          className={`${sizes[size]} rounded transition-all ${
            props.checked ? "bg-[var(--primary)] border-[var(--primary)]" : "bg-white hover:border-gray-400 border-2 border-gray-300 "
          }`}
        >
          {props.checked && <Check className={`${sizes[size]} text-white p-0.5`} />}
        </div>
      </div>
      {(label || description) && (
        <div className="text-right">
          {label && <div className="font-medium text-[var(--primary)]">{label}</div>}
          {description && <div className="text-sm text-gray-600">{description}</div>}
        </div>
      )}
    </label>
  )
}
