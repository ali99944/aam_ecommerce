"use client"

import type React from "react"
import { Button } from "./button"
import { LucideIcon, Package } from "lucide-react"
import { IconType } from "react-icons"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: LucideIcon | IconType
  illustration?: React.ReactNode
  illustrationSize?: 'sm' | 'md' | 'lg'
  actions?: {
    primary?: {
      label: string
      onClick: () => void
      variant?: 'primary' | 'secondary' | 'outline'
    }
    secondary?: {
      label: string
      onClick: () => void
      variant?: 'outline' | 'ghost'
    }
  }
  variant?: 'default' | 'compact' | 'card'
  className?: string
}

export function EmptyState({ 
  title, 
  description, 
  icon: Icon, 
  illustration, 
  illustrationSize = 'md',
  actions,
  variant = 'default',
  className = "" 
}: EmptyStateProps) {
  const illustrationSizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  }

  const variantClasses = {
    default: 'p-8',
    compact: 'p-4',
    card: 'p-8 border border-gray-200 rounded-lg shadow-sm bg-white'
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center ${variantClasses[variant]} ${className}`}>
      {illustration ? (
        <div className={`mb-4 ${illustrationSizeClasses[illustrationSize]}`}>
          {illustration}
        </div>
      ) : Icon ? (
        <div className="text-[#00998F] bg-[#D2EAE8] mb-4 flex items-center justify-center w-20 h-20 rounded-full">
          <Icon size={48}/>
        </div>
      ) : (
        <div className="text-[#00998F] bg-[#D2EAE8] mb-4 flex items-center justify-center w-20 h-20 rounded-full">
          <Package size={48} />
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      
      {description && (
        <p className="text-base text-gray-500 max-w-md mb-4">{description}</p>
      )}
      
      {actions && (
        <div className="flex flex-wrap gap-3 justify-center">
          {actions.primary && (
            <Button 
              variant={actions.primary.variant || 'primary'} 
              onClick={actions.primary.onClick}
            >
              {actions.primary.label}
            </Button>
          )}
          
          {actions.secondary && (
            <Button 
              variant={actions.secondary.variant || 'outline'} 
              onClick={actions.secondary.onClick}
            >
              {actions.secondary.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}