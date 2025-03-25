import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  bordered?: boolean
  hoverable?: boolean
}

export function Card({ 
  children, 
  className = '', 
  header, 
  footer,
  bordered = false,
  hoverable = false
}: CardProps) {
  return (
    <div 
      className={`bg-[#00998F] ${
        bordered ? 'border border-gray-200' : ''
      } ${
        hoverable ? 'transition-shadow hover:shadow-md' : ''
      } ${className}`}
    >
      {header && (
        <div className="border-b border-gray-200 p-4">
          {header}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-gray-200 p-4">
          {footer}
        </div>
      )}
    </div>
  )
}
