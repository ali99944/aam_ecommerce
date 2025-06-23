"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react'
import Button from "@/components/ui/button"
import Checkbox from "@/components/ui/checkbox"
import Input from "@/components/ui/input"
import Link from "next/link"


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "الاسم الأول مطلوب"
    if (!formData.lastName.trim()) newErrors.lastName = "اسم العائلة مطلوب"
    if (!formData.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب"
    if (!formData.phone.trim()) newErrors.phone = "رقم الهاتف مطلوب"
    if (formData.password.length < 8) newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "كلمات المرور غير متطابقة"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "يجب الموافقة على الشروط والأحكام"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
    }, 1500)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg  p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">تم إنشاء الحساب بنجاح!</h2>
              <p className="text-gray-600 mb-6">
                مرحباً بك في متجر سلة! تم إرسال رسالة تأكيد إلى بريدك الإلكتروني.
              </p>
              <Button variant="primary" size="sm" className="w-full mb-4">
                <a href="/login">تسجيل الدخول</a>
              </Button>
              <Link href="/" className="text-sm text-gray-600 hover:text-[var(--primary)]">
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop"
              alt="متجر سلة"
              className="mx-auto w-16 h-16 rounded-lg object-cover"
            />
            <h2 className="mt-6 text-3xl font-bold text-[var(--primary)]">إنشاء حساب جديد</h2>
            <p className="mt-2 text-sm text-gray-600">
              لديك حساب بالفعل؟{" "}
              <a href="/login" className="font-medium text-[var(--accent)] hover:text-[var(--accent)]/80">
                تسجيل الدخول
              </a>
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg  p-6 space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الأول
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="الاسم الأول"
                    icon={<User className="w-5 h-5" />}
                    error={errors.firstName}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    اسم العائلة
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="اسم العائلة"
                    icon={<User className="w-5 h-5" />}
                    error={errors.lastName}
                  />
                </div>
              </div>

              {/* Email */}
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
                  error={errors.email}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="05xxxxxxxx"
                  icon={<Phone className="w-5 h-5" />}
                  error={errors.phone}
                />
              </div>

              {/* Password */}
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
                    error={errors.password}
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  label={
                    <span>
                      أوافق على{" "}
                      <a href="/terms" className="text-[var(--accent)] hover:underline">
                        الشروط والأحكام
                      </a>{" "}
                      و{" "}
                      <a href="/privacy" className="text-[var(--accent)] hover:underline">
                        سياسة الخصوصية
                      </a>
                    </span>
                  }
                />
                {errors.agreeToTerms && <p className="text-red-600 text-sm">{errors.agreeToTerms}</p>}

                <Checkbox
                  checked={formData.subscribeNewsletter}
                  onChange={(e) => setFormData({ ...formData, subscribeNewsletter: e.target.checked })}
                  label="أريد الحصول على العروض والتحديثات عبر البريد الإلكتروني"
                />
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full" loading={isLoading}>
                إنشاء الحساب
              </Button>
            </div>


          </form>
        </div>
      </div>

    </div>
  )
}
