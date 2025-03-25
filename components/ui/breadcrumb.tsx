import type React from "react"
import Link from "next/link"
import { ChevronLeft, type LucideIcon } from "lucide-react"
import { IconType } from "react-icons"


interface BreadcrumbItem {
  label: string
  href?: string
  icon?: LucideIcon | IconType
  iconPosition?: 'left' | 'right'
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  separator?: React.ReactNode
}

export function Breadcrumb({
  items,
  className = "",
  separator = <ChevronLeft className="h-4 w-4 mx-2 text-gray-400" />,
}: BreadcrumbProps) {
  return (
    <nav className={`flex ${className}`}>
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const Icon = item.icon
          const iconPosition = item.iconPosition || 'left'

          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <Link 
                  href={item.href} 
                  className="text-sm text-gray-600 hover:text-[#00998F] flex items-center gap-1"
                >
                  {Icon && iconPosition === 'left' && <Icon size={16} className="text-gray-500" />}
                  {item.label}
                  {Icon && iconPosition === 'right' && <Icon size={16} className="text-gray-500" />}
                </Link>
              ) : (
                <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                  {Icon && iconPosition === 'left' && <Icon size={16} className={isLast ? "text-gray-900" : "text-gray-500"} />}
                  {item.label}
                  {Icon && iconPosition === 'right' && <Icon size={16} className={isLast ? "text-gray-900" : "text-gray-500"} />}
                </span>
              )}

              {!isLast && separator}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}