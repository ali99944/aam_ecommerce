"use client"

import type React from "react"
import { AlertTriangle, CheckCircle, Info, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

type AlertVariant = "info" | "success" | "warning" | "error" | "neutral"

interface AlertProps {
  title?: string
  description: string
  variant?: AlertVariant
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  onClose?: () => void
  className?: string
}

export function Alert({ title, description, variant = "info", icon, action, onClose, className = "" }: AlertProps) {
  // Variant styles
  const variantStyles = {
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-800",
      icon: <Info className="h-5 w-5 text-blue-500" />,
      button: "text-blue-700 hover:bg-blue-100 focus:ring-blue-500",
    },
    success: {
      container: "bg-green-50 border-green-200 text-green-800",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      button: "text-green-700 hover:bg-green-100 focus:ring-green-500",
    },
    warning: {
      container: "bg-amber-50 border-amber-200 text-amber-800",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      button: "text-amber-700 hover:bg-amber-100 focus:ring-amber-500",
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-800",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      button: "text-red-700 hover:bg-red-100 focus:ring-red-500",
    },
    neutral: {
      container: "bg-gray-50 border-gray-200 text-gray-800",
      icon: <Info className="h-5 w-5 text-gray-500" />,
      button: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    },
  }

  const styles = variantStyles[variant]

  return (
    <div className={`border rounded-sm p-4 ${styles.container} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">{icon || styles.icon}</div>
        <div className="mr-3 flex-1">
          {title && <h3 className="text-base font-medium mb-1">{title}</h3>}
          <div className="text-sm">{description}</div>

          {action && (
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={action.onClick} className={styles.button}>
                {action.label}
              </Button>
            </div>
          )}
        </div>

        {onClose && (
          <div className="mr-auto pr-3">
            <button
              type="button"
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">إغلاق</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function AlertWithIcon({
  title,
  description,
  variant = "info",
  icon,
  action,
  onClose,
  className = "",
}: AlertProps) {
  // Variant styles
  const variantStyles = {
    info: {
      container: "bg-blue-50 border-blue-200",
      iconContainer: "bg-blue-100 text-blue-600",
      title: "text-blue-800",
      description: "text-blue-700",
      button: "bg-blue-700 hover:bg-blue-800 text-white",
    },
    success: {
      container: "bg-green-50 border-green-200",
      iconContainer: "bg-green-100 text-green-600",
      title: "text-green-800",
      description: "text-green-700",
      button: "bg-green-700 hover:bg-green-800 text-white",
    },
    warning: {
      container: "bg-amber-50 border-amber-200",
      iconContainer: "bg-amber-100 text-amber-600",
      title: "text-amber-800",
      description: "text-amber-700",
      button: "bg-amber-700 hover:bg-amber-800 text-white",
    },
    error: {
      container: "bg-red-50 border-red-200",
      iconContainer: "bg-red-100 text-red-600",
      title: "text-red-800",
      description: "text-red-700",
      button: "bg-red-700 hover:bg-red-800 text-white",
    },
    neutral: {
      container: "bg-gray-50 border-gray-200",
      iconContainer: "bg-gray-100 text-gray-600",
      title: "text-gray-800",
      description: "text-gray-700",
      button: "bg-gray-700 hover:bg-gray-800 text-white",
    },
  }

  const styles = variantStyles[variant]

  // Default icons based on variant
  const defaultIcons = {
    info: <Info className="h-6 w-6" />,
    success: <CheckCircle className="h-6 w-6" />,
    warning: <AlertTriangle className="h-6 w-6" />,
    error: <AlertCircle className="h-6 w-6" />,
    neutral: <Info className="h-6 w-6" />,
  }

  return (
    <div className={`border rounded-sm overflow-hidden ${styles.container} ${className}`}>
      <div className="flex">
        <div className={`flex-shrink-0 p-4 ${styles.iconContainer}`}>
          <div className="flex items-center justify-center h-full">{icon || defaultIcons[variant]}</div>
        </div>

        <div className="p-4 flex-1">
          {title && <h3 className={`text-lg font-medium mb-1 ${styles.title}`}>{title}</h3>}
          <div className={`text-sm ${styles.description}`}>{description}</div>

          {action && (
            <div className="mt-4">
              <Button onClick={action.onClick} className={styles.button}>
                {action.label}
              </Button>
            </div>
          )}
        </div>

        {onClose && (
          <div className="p-4">
            <button type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none" onClick={onClose}>
              <span className="sr-only">إغلاق</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function AlertBanner({
  title,
  description,
  variant = "info",
  icon,
  action,
  onClose,
  className = "",
}: AlertProps) {
  // Variant styles
  const variantStyles = {
    info: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-amber-500 text-white",
    error: "bg-red-500 text-white",
    neutral: "bg-gray-800 text-white",
  }

  // Default icons based on variant
  const defaultIcons = {
    info: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    neutral: <Info className="h-5 w-5" />,
  }

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">{icon || defaultIcons[variant]}</div>
            <div className="mr-3">
              {title && <h3 className="text-base font-medium">{title}</h3>}
              <div className="text-sm opacity-90">{description}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {action && (
              <Button
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className="border-white text-white hover:bg-white/20"
              >
                {action.label}
              </Button>
            )}

            {onClose && (
              <button type="button" className="text-white hover:text-white/80 focus:outline-none" onClick={onClose}>
                <span className="sr-only">إغلاق</span>
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

