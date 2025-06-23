"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft } from 'lucide-react'
import Button from "@/components/ui/button"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")
    
    if (otpCode.length !== 6) {
      setError("يرجى إدخال الرمز كاملاً")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate verification
    setTimeout(() => {
      if (otpCode === "123456") {
        window.location.href = "/reset-password"
      } else {
        setError("الرمز غير صحيح، يرجى المحاولة مرة أخرى")
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleResend = () => {
    setTimeLeft(120)
    setOtp(["", "", "", "", "", ""])
    setError("")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop"
              alt="متجر سلة"
              className="mx-auto w-16 h-16 rounded-lg object-cover"
            />
            <h2 className="mt-4 text-3xl font-bold text-primary">تأكيد الرمز</h2>
            <p className="mt-2 text-sm text-gray-600">
              أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك الإلكتروني
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}

              {/* OTP Input */}
              <div className="flex gap-3 justify-center" dir="ltr">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  انتهاء صلاحية الرمز خلال: <span className="font-bold text-primary">{formatTime(timeLeft)}</span>
                </p>
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full" loading={isLoading}>
                تأكيد الرمز
              </Button>

              {/* Resend */}
              <div className="text-center">
                {timeLeft === 0 ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-sm text-[var(--accent)] hover:text-[var(--accent)]/80"
                  >
                    إعادة إرسال الرمز
                  </button>
                ) : (
                  <p className="text-sm text-gray-500">لم تستلم الرمز؟ يمكنك طلب رمز جديد بعد انتهاء الوقت</p>
                )}
              </div>
            </div>
          </form>

          {/* Back to login */}
          <div className="text-center">
            <a
              href="/login"
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 ml-1" />
              العودة لتسجيل الدخول
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
