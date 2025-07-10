"use client"

import type React from "react"

import { useState, useContext } from "react"
import { Mail, ArrowLeft } from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Link from "next/link"

import { ValidationError } from "@/components/ui/error-components"
import { NotificationContext } from "@/src/providers/notification-provider"
import { useMutationAction } from "@/src/hooks/queries-actions"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const { addNotification } = useContext(NotificationContext)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) newErrors.email = "البريد الإلكتروني مطلوب"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "البريد الإلكتروني غير صالح"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { mutate, isPending } = useMutationAction({
    method: "post",
    url: "auth/customer/forgot-password",
    onSuccessCallback: () => {
      setSuccess(true)
      addNotification("تم إرسال رمز التحقق إلى بريدك الإلكتروني!", "success")
    },
    onErrorCallback: (error) => {
      console.log(error);
      
      const errorMessage = error.response?.data?.errors?.email?.join(", ") || "حدث خطأ أثناء إرسال الرمز. حاول مرة أخرى."
      addNotification(errorMessage, "error")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    mutate({ email })
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
              <h2 className="text-2xl font-bold text-primary mb-4">تم إرسال رمز التحقق!</h2>
              <p className="text-gray-600 mb-6">
                تم إرسال رمز التحقق المكون من 6 أرقام إلى بريدك الإلكتروني{" "}
                <span className="font-medium text-primary">{email}</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">يرجى التحقق من صندوق الوارد وإدخال الرمز في الصفحة التالية</p>

                <Link href={`/verify-otp?email=${encodeURIComponent(email)}&type=password-reset`}>
                  <Button variant="primary" size="sm" className="w-full mb-4">
                      إدخال رمز التحقق
                  </Button>
                </Link>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">لم تستلم الرمز؟</p>
                <button
                  onClick={() => {
                    setSuccess(false)
                    addNotification("يمكنك إعادة إرسال الرمز الآن", "info")
                  }}
                  className="text-sm text-primary hover:text-primary-dark transition-colors underline"
                >
                  إعادة الإرسال
                </button>
              </div>
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
              src="/image/logo.png"
              alt="متجر سلة"
              className="mx-auto w-20 h-20 rounded-lg"
            />
            <h2 className="mt-4 text-3xl font-bold text-primary">نسيت كلمة المرور؟</h2>
            <p className="mt-2 text-sm text-gray-600">
              أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق لإعادة تعيين كلمة المرور
            </p>
          </div>

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <ValidationError errors={Object.values(errors)} onGoBack={() => setErrors({})} />
          )}

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
                  error={errors.email}
                  required
                  disabled={isPending}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full"
                loading={isPending}
                disabled={isPending}
              >
                إرسال رمز التحقق
              </Button>
            </div>
          </form>

          {/* Back to login */}
          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 ml-1" />
              العودة لتسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
