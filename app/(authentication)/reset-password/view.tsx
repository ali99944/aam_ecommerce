"use client"

import { useState, useContext } from "react"
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react'
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Link from "next/link"
import { ValidationError } from "@/components/ui/error-components"
import { useMutationAction } from "@/src/hooks/queries-actions"
import { NotificationContext } from "@/src/providers/notification-provider"
import { useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const { addNotification } = useContext(NotificationContext)

  const query = useSearchParams()
  const email = query.get('email')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (formData.password.length < 8) {
      newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل"
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمات المرور غير متطابقة"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { mutate, isPending } = useMutationAction({
    method: "post",
    url: "/auth/customer/reset-password",
    onSuccessCallback: () => {
      setSuccess(true)
      localStorage.removeItem("reset_token")
      addNotification("تم تغيير كلمة المرور بنجاح!", "success")
    },
    onErrorCallback: (error) => {
      console.log(error);
      
      addNotification(error.response?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور.", "error")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    const reset_token = localStorage.getItem("reset_token")
    if (!reset_token) {
      addNotification("رمز إعادة التعيين غير صالح. يرجى طلب رمز جديد.", "error")
      return
    }
    mutate({
      email: email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      reset_token: reset_token,
    })
  }


  if (success) {
    return (
          <div className="min-h-screen bg-background" dir="rtl">
          <div className="flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4">تم تغيير كلمة المرور!</h2>
                <p className="text-gray-600 mb-6">
                  تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.
                </p>
                  <Link href="/login">
                    <Button variant="primary" size="sm" className="w-full">
                      تسجيل الدخول
                    </Button>
                  </Link>
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
              <h2 className="mt-4 text-3xl font-bold text-primary">إعادة تعيين كلمة المرور</h2>
              <p className="mt-2 text-sm text-gray-600">أدخل كلمة المرور الجديدة</p>
            </div>

            {/* Errors */}
            {Object.keys(errors).length > 0 && (
              <ValidationError
                errors={Object.values(errors)}
                onGoBack={() => setErrors({})}
              />
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg p-6 space-y-4">
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    كلمة المرور الجديدة
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="أدخل كلمة المرور الجديدة"
                      icon={<Lock className="w-5 h-5" />}
                      error={errors.password}
                      required
                      disabled={isPending}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isPending}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="أعد إدخال كلمة المرور"
                      icon={<Lock className="w-5 h-5" />}
                      error={errors.confirmPassword}
                      required
                      disabled={isPending}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isPending}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">متطلبات كلمة المرور:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      8 أحرف على الأقل
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      حرف كبير واحد على الأقل
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      رقم واحد على الأقل
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="w-full"
                  loading={isPending}
                  disabled={isPending}
                >
                  تغيير كلمة المرور
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