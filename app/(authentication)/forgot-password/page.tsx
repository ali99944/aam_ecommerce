"use client"

import { useState } from "react"
import { Mail, ArrowLeft } from 'lucide-react'
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending reset email
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
    }, 1000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">تم إرسال الرابط!</h2>
              <p className="text-gray-600 mb-6">
                تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد.
              </p>
              <Button variant="primary" size="sm" className="w-full mb-4">
                <a href="/login">العودة لتسجيل الدخول</a>
              </Button>
              <p className="text-sm text-gray-500">لم تستلم الرسالة؟ تحقق من مجلد الرسائل المزعجة</p>
            </div>
          </div>
        </div>
      </div>
    )
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
            <h2 className="mt-4 text-3xl font-bold text-[var(--primary)]">نسيت كلمة المرور؟</h2>
            <p className="mt-2 text-sm text-gray-600">
              أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg p-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  icon={<Mail className="w-5 h-5" />}
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full" loading={isLoading}>
                إرسال رابط الإعادة
              </Button>
            </div>
          </form>

          {/* Back to login */}
          <div className="text-center">
            <a
              href="/login"
              className="inline-flex items-center text-sm text-gray-600 hover:text-[var(--primary)] transition-colors"
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
