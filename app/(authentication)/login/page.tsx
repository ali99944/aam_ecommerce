"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import Alert from "@/components/ui/alert"
import Button from "@/components/ui/button"
import Checkbox from "@/components/ui/checkbox"
import Input from "@/components/ui/input"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate login process
    setTimeout(() => {
      if (formData.email === "test@example.com" && formData.password === "password") {
        // Success - redirect to home
        window.location.href = "/"
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">

      <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop"
              alt="متجر سلة"
              className="mx-auto w-16 h-16 rounded-lg object-cover"
            />
            <h2 className="mt-4 text-3xl font-bold text-[var(--primary)]">تسجيل الدخول</h2>
            <p className="mt-2 text-sm text-gray-600">
              أو{" "}
              <a href="/register" className="font-medium text-[var(--accent)] hover:text-[var(--accent)]/80">
                إنشاء حساب جديد
              </a>
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg  p-6 space-y-4">
              {error && <Alert type="error" message={error} />}

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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Checkbox
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  label="تذكرني"
                />
                <a href="/forgot-password" className="text-sm text-[var(--accent)] hover:text-[var(--accent)]/80">
                  نسيت كلمة المرور؟
                </a>
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full" loading={isLoading}>
                تسجيل الدخول
              </Button>
            </div>


            {/* Social Login */}
            <div className="bg-white rounded-lg  p-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">أو تسجيل الدخول بواسطة</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    f
                  </div>
                  Facebook
                </Button>
              </div>
            </div>

          </form>
        </div>
      </div>

    </div>
  )
}
