"use client"

import type { InputHTMLAttributes } from "react"

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  description?: string
  size?: "sm" | "md" | "lg"
}

export default function Radio({ label, description, size = "md", className = "", ...props }: RadioProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input type="radio" className="sr-only" {...props} />
        <div
          className={`${sizes[size]} border-2 border-gray-300 rounded-full transition-all ${
            props.checked ? "border-[var(--primary)]" : "hover:border-gray-400"
          }`}
        >
          {props.checked && (
            <div className="w-full h-full rounded-full p-0.5">
              <div className="w-full h-full bg-[var(--primary)] rounded-full"></div>
            </div>
          )}
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
