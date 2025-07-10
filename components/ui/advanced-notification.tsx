"use client"

import { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, ShoppingCart, Package, Truck } from "lucide-react"
import Button from "./button"
import { NotificationContext } from "@/src/providers/notification-provider"

export type NotificationType = "success" | "error" | "warning" | "info" | "cart" | "order" | "shipping"

interface NotificationAction {
  label: string
  onClick: () => void
  variant?: "primary" | "secondary"
}

interface NotificationProps {
  id: string
  message: string
  type: NotificationType
  title?: string
  actions?: NotificationAction[]
  persistent?: boolean
  image?: string
}

export default function AdvancedNotification({
  id,
  message,
  type,
  title,
  actions,
  persistent = false,
  image,
}: NotificationProps) {
  const { removeNotification } = useContext(NotificationContext)
  const [progress, setProgress] = useState(100)

  // Auto-dismiss after 6 seconds unless persistent
  useEffect(() => {
    if (persistent) return

    const duration = 6000
    const interval = 50
    const decrement = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          removeNotification(id)
          return 0
        }
        return prev - decrement
      })
    }, interval)

    return () => clearInterval(timer)
  }, [id, removeNotification, persistent])

  const typeConfig = {
    success: {
      bg: "bg-gradient-to-br from-green-50 via-emerald-50 to-green-50",
      border: "border-green-200",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      text: "text-green-800",
      title: "text-green-900",
      accent: "bg-green-500",
      shadow: "shadow-green-100/50",
    },
    error: {
      bg: "bg-gradient-to-br from-red-50 via-rose-50 to-red-50",
      border: "border-red-200",
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      text: "text-red-800",
      title: "text-red-900",
      accent: "bg-red-500",
      shadow: "shadow-red-100/50",
    },
    warning: {
      bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50",
      border: "border-amber-200",
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      text: "text-amber-800",
      title: "text-amber-900",
      accent: "bg-amber-500",
      shadow: "shadow-amber-100/50",
    },
    info: {
      bg: "bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50",
      border: "border-blue-200",
      icon: <Info className="w-6 h-6 text-blue-600" />,
      text: "text-blue-800",
      title: "text-blue-900",
      accent: "bg-blue-500",
      shadow: "shadow-blue-100/50",
    },
    cart: {
      bg: "bg-gradient-to-br from-purple-50 via-violet-50 to-purple-50",
      border: "border-purple-200",
      icon: <ShoppingCart className="w-6 h-6 text-purple-600" />,
      text: "text-purple-800",
      title: "text-purple-900",
      accent: "bg-purple-500",
      shadow: "shadow-purple-100/50",
    },
    order: {
      bg: "bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50",
      border: "border-indigo-200",
      icon: <Package className="w-6 h-6 text-indigo-600" />,
      text: "text-indigo-800",
      title: "text-indigo-900",
      accent: "bg-indigo-500",
      shadow: "shadow-indigo-100/50",
    },
    shipping: {
      bg: "bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-50",
      border: "border-teal-200",
      icon: <Truck className="w-6 h-6 text-teal-600" />,
      text: "text-teal-800",
      title: "text-teal-900",
      accent: "bg-teal-500",
      shadow: "shadow-teal-100/50",
    },
  }

  const config = typeConfig[type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 400, scale: 0.8, rotateY: 90 }}
      animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
      exit={{
        opacity: 0,
        x: 400,
        scale: 0.8,
        rotateY: -90,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`
        relative overflow-hidden rounded-2xl border backdrop-blur-sm
        ${config.bg} ${config.border} ${config.shadow}
        shadow-xl hover:shadow-2xl transition-all duration-300
        min-w-[320px] max-w-sm
      `}
      dir="rtl"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <div className={`w-full h-full rounded-full ${config.accent} transform translate-x-6 -translate-y-6`} />
      </div>

      {/* Progress bar for auto-dismiss */}
      {!persistent && (
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          className={`absolute bottom-0 right-0 h-1 ${config.accent} opacity-40`}
        />
      )}

      <div className="relative p-5">
        <div className="flex items-start gap-4">
          {/* Product image if provided */}
          {image && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="flex-shrink-0"
            >
              <img
                src={image || "/placeholder.svg"}
                alt="Product"
                className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm"
              />
            </motion.div>
          )}

          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="flex-shrink-0 mt-1"
          >
            {config.icon}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <motion.h4
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={`text-base font-bold mb-1 ${config.title}`}
              >
                {title}
              </motion.h4>
            )}

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-sm leading-relaxed ${config.text}`}
            >
              {message}
            </motion.p>

            {/* Actions */}
            {actions && actions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-2 mt-3"
              >
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "secondary"}
                    size="sm"
                    onClick={() => {
                      action.onClick()
                      removeNotification(id)
                    }}
                    className="text-xs px-3 py-1.5"
                  >
                    {action.label}
                  </Button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => removeNotification(id)}
            className="flex-shrink-0 p-2 rounded-full hover:bg-white/60 transition-all duration-200 group"
          >
            <X className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
