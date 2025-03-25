"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }

    // Start countdown for resend
    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)

      // Focus the last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus()
      }
    }
  }

  const handleResendOTP = () => {
    setCanResend(false)
    setResendCountdown(60)

    // Start countdown again
    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if OTP is complete
    if (otp.some((digit) => !digit)) {
      setError("يرجى إدخال رمز التحقق كاملاً")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      
      // For demo purposes, we'll consider "123456" as the correct OTP
      if (otp.join("") === "123456") {
        setIsVerified(true)
      } else {
        setError("رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.")
      }
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Link href="/forgot-password" className="flex items-center text-[#00998F] mb-6 hover:underline">
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Link>

            <div className="bg-white rounded-sm shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Form Column */}
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">التحقق من رمز OTP</h1>
                    <p className="text-gray-600">أدخل رمز التحقق المكون من 6 أرقام الذي تم إرساله إلى بريدك الإلكتروني</p>
                  </div>

                  {isVerified ? (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h2 className="text-lg font-medium text-green-800 mb-2">تم التحقق بنجاح</h2>
                      <p className="text-gray-700 mb-6">
                        تم التحقق من رمز OTP بنجاح. يمكنك الآن إعادة تعيين كلمة المرور الخاصة بك.
                      </p>
                      <Button as={Link} href="/reset-password" fullWidth>
                        إعادة تعيين كلمة المرور
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="bg-[#D2EAE8]/30 p-4 rounded-sm border border-[#D2EAE8] mb-6">
                        <p className="text-sm text-gray-700">
                          تم إرسال رمز التحقق إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد والرسائل غير المرغوب فيها.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <label className="block text-base font-medium mb-1 text-right">رمز التحقق</label>
                        <div className="flex justify-center gap-2">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => (inputRefs.current[index] = el)}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleChange(index, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              onPaste={index === 0 ? handlePaste : undefined}
                              className={`w-12 h-12 text-center text-xl font-bold border ${
                                error ? 'border-red-500' : 'border-gray-300'
                              } rounded-sm focus:outline-none focus:ring focus:ring-[#00998F] focus:border-[#00998F] transition-all`}
                              required
                            />
                          ))}
                        </div>
                        
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                      </div>

                      <Button loading={isLoading} type="submit" fullWidth disabled={isLoading}>
                        تحقق
                      </Button>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">لم تستلم الرمز؟</p>
                        {canResend ? (
                          <button
                            type="button"
                            onClick={handleResendOTP}
                            className="text-[#00998F] font-medium hover:underline flex items-center justify-center mx-auto"
                          >
                            <RefreshCw className="h-4 w-4 ml-1" />
                            إعادة إرسال الرمز
                          </button>
                        ) : (
                          <p className="text-gray-500">يمكنك إعادة الإرسال بعد {resendCountdown} ثانية</p>
                        )}
                      </div>
                    </form>
                  )}
                </div>
                
                {/* Image Column */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-[#00998F]">
                    <div className="absolute inset-0 opacity-20" style={{ 
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                      backgroundSize: '24px 24px'
                    }}></div>
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-white text-center">
                        <div className="mb-6">
                          <Image 
                            src="/placeholder.svg?height=120&width=120&text=🔐" 
                            alt="Verify OTP" 
                            width={120} 
                            height={120}
                            className="mx-auto"
                          />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">التحقق من رمز OTP</h2>
                        <p className="opacity-90 mb-6">
                          لقد أرسلنا رمز التحقق إلى بريدك الإلكتروني. يرجى إدخال الرمز المكون من 6 أرقام للمتابعة.
                        </p>
                        <div className="bg-white/20 p-4 rounded-sm">
                          <p className="text-sm">
                            لم تستلم الرمز؟ تحقق من مجلد البريد غير المرغوب فيه أو اتصل بفريق الدعم على:
                          </p>
                          <p className="font-bold mt-2" dir="ltr">+962 79 123 4567</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
