"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'
import Button from "@/components/ui/button"
import Checkbox from "@/components/ui/checkbox"
import Input from "@/components/ui/input"
import Link from "next/link"
import ConfirmationDialog from "@/components/ui/confirmation-dialog"
import { ValidationError } from "@/components/ui/error-components"
import { useMutationAction } from "@/src/hooks/queries-actions"
import { useNotifications } from "@/src/hooks/use-notification"


interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
  subscribeNewsletter: boolean
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "الاسم الأول مطلوب"
    if (!formData.lastName.trim()) newErrors.lastName = "اسم العائلة مطلوب"
    if (!formData.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "البريد الإلكتروني غير صالح"
    if (!formData.phone.trim()) newErrors.phone = "رقم الهاتف مطلوب"
    // else if (!/^\d{11}$/.test(formData.phone)) newErrors.phone = "رقم الهاتف يجب أن يكون 10 أرقام"
    if (formData.password.length < 8) newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "كلمات المرور غير متطابقة"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "يجب الموافقة على الشروط والأحكام"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { notify } = useNotifications()

  const { mutateAsync, isPending } = useMutationAction({
    method: "post",
    url: "auth/customer/register",

    onSuccessCallback: (data) => {
      notify.info('تم انشاء حسابك بنجاح')
    },
    onErrorCallback: (error) => {
      notify.error(error.response?.data?.message || "حدث خطأ أثناء التسجيل. حاول مرة أخرى.")
    },
    contentType: 'aplication/json',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    mutateAsync({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      subscribe_newsletter: formData.subscribeNewsletter,
    })
  }

  const handleConfirm = () => {
    setShowSuccessDialog(false)
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Success Dialog */}
          <ConfirmationDialog
            isOpen={showSuccessDialog}
            onClose={() => setShowSuccessDialog(false)}
            onConfirm={handleConfirm}
            title="تم إنشاء الحساب بنجاح!"
            message="مرحباً بك في متجر سلة! تم إرسال رسالة تأكيد إلى بريدك الإلكتروني."
            confirmText="تسجيل الدخول"
            cancelText="إغلاق"
          />

          {/* Header */}
          <div className="text-center">
            <img
              src="/image/logo.png"
              alt="متجر سلة"
              className="mx-auto w-20 h-20 rounded-lg"
            />
            <h2 className="mt-6 text-3xl font-bold text-primary">إنشاء حساب جديد</h2>
            <p className="mt-2 text-sm text-gray-600">
              لديك حساب بالفعل؟{" "}
              <Link href="/login" className="font-medium text-accent hover:text-accent/80">
                تسجيل الدخول
              </Link>
            </p>
          </div>


          {/* Validation Errors */}
          {Object.keys(errors).length > 0 && (
            <ValidationError
              errors={Object.values(errors)}
              onGoBack={() => setErrors({})}
            />
          )}

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg p-6 space-y-4">
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
                    disabled={isPending}
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
                    disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                    disabled={isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isPending}
                  >
                    {showPassword ? <EyeOff class постоянный /> : <Eye className="w-5 h-5" />}
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

              {/* Checkboxes */}
              <div className="space-y-3">
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  label={
                    <span>
                      أوافق على{" "}
                      <Link href="/terms" className="text-accent hover:underline">
                        الشروط والأحكام
                      </Link>{" "}
                      و{" "}
                      <Link href="/privacy" className="text-accent hover:underline">
                        سياسة الخصوصية
                      </Link>
                    </span>
                  }
                  disabled={isPending}
                />
                {errors.agreeToTerms && <p className="text-red-600 text-sm">{errors.agreeToTerms}</p>}

                <Checkbox
                  checked={formData.subscribeNewsletter}
                  onChange={(e) => setFormData({ ...formData, subscribeNewsletter: e.target.checked })}
                  label="أريد الحصول على العروض والتحديثات عبر البريد الإلكتروني"
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
                إنشاء الحساب
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}