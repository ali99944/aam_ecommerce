"use client"

import { InputHTMLAttributes, ReactNode } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg"
  icon?: ReactNode
  iconPosition?: "left" | "right"
}

export default function Input({ 
  size = "sm", 
  icon, 
  iconPosition = "right", 
  className = "", 
  ...props 
}: InputProps) {
  const baseClasses = "border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primary focus:border-primary transition-all duration-200 w-full"
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg"
  }

  if (icon) {
    return (
      <div className="relative">
        <input 
          className={`${baseClasses} ${sizes[size]} ${iconPosition === 'right' ? 'pr-10' : 'pl-10'} ${className}`}
          {...props}
        />
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${iconPosition === 'right' ? 'right-3' : 'left-3'} text-gray-400`}>
          {icon}
        </div>
      </div>
    )
  }

  return (
    <input 
      className={`${baseClasses} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
