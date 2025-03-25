"use client"

import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface NotificationProps {
  title: string
  message: string
  type?: NotificationType
  onClose?: () => void
  duration?: number | null
  action?: {
    label: string
    onClick: () => void
  }
}

export function Notification({
  title,
  message,
  type = 'info',
  onClose,
  duration = 5000,
  action
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) setTimeout(onClose, 300) // Allow animation to complete
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])
  
  const handleClose = () => {
    setIsVisible(false)
    if (onClose) setTimeout(onClose, 300) // Allow animation to complete
  }
  
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />
  }
  
  const bgColors = {
    success: 'bg-white border-green-200',
    error: 'bg-white border-red-200',
    info: 'bg-white border-blue-200',
    warning: 'bg-white border-amber-200'
  }
  
  return (
    <div 
      className={`flex p-4 rounded-sm border shadow-md max-w-md transition-all duration-300 ${bgColors[type]} ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
      }`}
    >
      <div className="flex-shrink-0 ml-3">
        {icons[type]}
      </div>
      
      <div className="flex-1 ml-3">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-medium">{title}</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 ml-3">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-1 text-sm text-gray-600">{message}</div>
        
        {action && (
          <div className="mt-3">
            <button
              onClick={() => {
                action.onClick()
                handleClose()
              }}
              className="text-sm font-medium text-[#00998F] hover:text-[#00998F]/80"
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


export function NotificationCenter({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {children}
    </div>
  )
}
