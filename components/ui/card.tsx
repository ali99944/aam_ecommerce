import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg"
  shadow?: "none" | "sm" | "md" | "lg"
}

export default function Card({ children, className = "", padding = "md" }: CardProps) {
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }

  // const shadows = {
  //   none: "",
  //   sm: "shadow-sm",
  //   md: "shadow-md",
  //   lg: "shadow-lg",
  // }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg ${paddings[padding]}  ${className}`}>
      {children}
    </div>
  )
}

// ${shadows[shadow]}