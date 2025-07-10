import type React from "react"
interface BadgeProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function Badge({ children, variant = "primary", size = "sm", className = "" }: BadgeProps) {
  const variants = {
    primary: "bg-primary text-black",
    secondary: "bg-gray-500 text-black",
    success: "bg-accent text-black",
    warning: "bg-yellow-500 text-black",
    danger: "bg-red-500 text-black",
    info: "bg-blue-500 text-black",
  }

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  )
}
