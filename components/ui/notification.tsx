"use client"

import { useEffect } from "react"
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react"

interface NotificationProps {
  type: "success" | "error" | "warning" | "info"
  title?: string
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
}

export default function Notification({
  type,
  title,
  message,
  isVisible,
  onClose,
  duration = 5000,
  position = "top-right",
}: NotificationProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const styles = {
    success: {
      container: "bg-white border-l-4 border-green-500 shadow-lg",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    },
    error: {
      container: "bg-white border-l-4 border-red-500 shadow-lg",
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
    },
    warning: {
      container: "bg-white border-l-4 border-yellow-500 shadow-lg",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
    },
    info: {
      container: "bg-white border-l-4 border-blue-500 shadow-lg",
      icon: <Info className="w-6 h-6 text-blue-600" />,
    },
  }

  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  }

  const style = styles[type]

  if (!isVisible) return null

  return (
    <div className={`fixed ${positions[position]} z-50 max-w-sm w-full`}>
      <div
        className={`rounded-lg p-4 ${style.container} transform transition-all duration-300 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex items-start gap-3">
          {style.icon}
          <div className="flex-1 text-right">
            {title && <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>}
            <p className="text-sm text-gray-700">{message}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
