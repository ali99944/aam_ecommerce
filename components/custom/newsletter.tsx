"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NewsletterProps {
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  successMessage?: string
  variant?: "default" | "primary" | "minimal"
  className?: string
}

export function Newsletter({
  title = "اشترك في نشرتنا الإخبارية",
  description = "احصل على آخر العروض والتحديثات مباشرة إلى بريدك الإلكتروني",
  placeholder = "أدخل بريدك الإلكتروني",
  buttonText = "اشترك الآن",
  successMessage = "تم الاشتراك بنجاح! شكراً لك.",
  variant = "default",
  className = "",
}: NewsletterProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح")
      return
    }

    setError("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)

      // Reset after 5 seconds for demo purposes
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 5000)
    }, 1500)
  }

  // Variant styles
  const variantStyles = {
    default: "bg-white p-6 rounded-sm  border border-gray-200",
    primary: "bg-[#00998F] p-6 rounded-sm  text-white",
    minimal: "",
  }

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      {variant !== "minimal" && (
        <div className="mb-4">
          <h3 className={`text-xl font-bold mb-2 ${variant === "primary" ? "text-white" : ""}`}>{title}</h3>
          <p className={`${variant === "primary" ? "text-white/90" : "text-gray-600"}`}>{description}</p>
        </div>
      )}

      {isSubscribed ? (
        <div
          className={`flex items-center gap-3 p-4 rounded-sm ${
            variant === "primary" ? "bg-white/20" : "bg-[#D2EAE8] border border-green-100"
          }`}
        >
          <CheckCircle className={`h-5 w-5 flex-shrink-0 ${variant === "primary" ? "text-white" : "text-[#00998F]"}`} />
          <span className={variant === "primary" ? "text-white" : "text-[#00998F]"}>{successMessage}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative">
            <Input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              iconPosition="right"
              className={`${variant === "primary" ? "bg-white/10 border-white/20 text-white placeholder:text-white/70" : ""}`}
              error={error}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            variant={variant === "primary" ? "secondary" : "primary"}
            className="flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                جاري الاشتراك...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {buttonText}
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  )
}

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasClosedPopup, setHasClosedPopup] = useState(false)

  // Show popup after 5 seconds if not closed before
  useState(() => {
    if (!hasClosedPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  })

  const handleClose = () => {
    setIsOpen(false)
    setHasClosedPopup(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-sm shadow-lg max-w-md w-full animate-fade-in-up">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="إغلاق"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="p-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#D2EAE8] rounded-full mb-4">
              <Mail className="h-6 w-6 text-[#00998F]" />
            </div>
            <h3 className="text-xl font-bold mb-2">احصل على خصم 10% على طلبك الأول</h3>
            <p className="text-gray-600 mb-4">اشترك في نشرتنا الإخبارية واحصل على خصم 10% على طلبك الأول</p>
          </div>

          <Newsletter
            variant="minimal"
            placeholder="أدخل بريدك الإلكتروني للحصول على الخصم"
            buttonText="الحصول على الخصم"
            successMessage="رائع! تم إرسال رمز الخصم إلى بريدك الإلكتروني."
          />

          <div className="mt-4 text-center">
            <button onClick={handleClose} className="text-sm text-gray-500 hover:text-gray-700">
              لا شكراً، ربما لاحقاً
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

