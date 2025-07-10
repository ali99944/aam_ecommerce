"use client"

import { useState, useContext } from "react"
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Link from "next/link"
import { useMutationAction } from "@/src/hooks/queries-actions"
import NotificationProvider, { NotificationContext } from "@/src/providers/notification-provider"
import { useAppDispatch } from "@/src/redux/hook"
import { loginSuccess } from "@/src/redux/reducers/auth_reducer"
import Customer from "@/src/types/customer"
import { clearGuestCartToken } from "@/src/redux/reducers/cart_reducer"


interface LoginFormData {
  email: string
  password: string
}

interface LoginResponse {
    token: string
    customer: Customer
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const { addNotification } = useContext(NotificationContext)
  const dispatch = useAppDispatch()

  const { mutate, isPending } = useMutationAction({
    method: "post",
    url: "auth/customer/login",
    onSuccessCallback: (data: LoginResponse) => {
      // Assuming the API returns a token and customer data
      dispatch(
        loginSuccess({
          token: data.token, // Adjust based on your API response
          customer: data.customer,
        })
      )
      
      dispatch(
        clearGuestCartToken()
      )
      addNotification("تسجيل الدخول ناجح! مرحباً بك في محلات علي ابو مسعود!", "success")
      setTimeout(() => {
        window.location.href = "/"
      }, 2000) // Redirect after 2 seconds
    },
    onErrorCallback: (error) => {
      const message =
        error.response?.data && typeof error.response.data === "object" && "message" in error.response.data
          ? (error.response.data as { message?: string }).message
          : undefined
      addNotification(message || "حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.", "error")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    mutate({
      email: formData.email,
      password: formData.password,
    })
  }

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              <img
                src="/image/logo.png"
                alt="متجر سلة"
                className="mx-auto w-20 h-20 rounded-lg"
              />
              <h2 className="mt-4 text-3xl font-bold text-primary">تسجيل الدخول</h2>
              <p className="mt-2 text-sm text-gray-600">
                أو{" "}
                <Link href="/register" className="font-medium text-accent hover:text-accent/80">
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>

            {/* Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg p-6 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="أدخل بريدك الإلكتروني"
                    icon={<Mail className="w-5 h-5" />}
                    required
                    disabled={isPending}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="أدخل كلمة المرور"
                      icon={<Lock className="w-5 h-5" />}
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

                <div className="flex items-center justify-between">
                  <Link href="/forgot-password" className="text-sm text-accent hover:text-accent/80">
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="w-full"
                  loading={isPending}
                  disabled={isPending}
                >
                  تسجيل الدخول
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NotificationProvider>
  )
}