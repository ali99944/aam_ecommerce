"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
    }
    if (!/[A-Z]/.test(value)) {
      return "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل"
    }
    if (!/[a-z]/.test(value)) {
      return "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل"
    }
    if (!/[0-9]/.test(value)) {
      return "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل"
    }
    return ""
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setPasswordError(validatePassword(value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password
    const error = validatePassword(password)
    if (error) {
      setPasswordError(error)
      return
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("كلمات المرور غير متطابقة")
      return
    }

    setIsLoading(true)
    setPasswordError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
  }

  // Calculate password strength
  const getPasswordStrength = () => {
    if (!password) return 0

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    return strength
  }

  const passwordStrength = getPasswordStrength()
  const strengthText = ["ضعيفة جداً", "ضعيفة", "متوسطة", "جيدة", "قوية", "ممتازة"]
  const strengthColor = ["bg-red-500", "bg-red-400", "bg-amber-400", "bg-amber-300", "bg-green-400", "bg-green-500"]

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {!isSuccess && (
              <Link href="/verify-otp" className="flex items-center text-[#00998F] mb-6 hover:underline">
                <ArrowLeft className="h-4 w-4 ml-2" />
                العودة
              </Link>
            )}

            <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Form Column */}
                <div className="p-8">
                  {isSuccess ? (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h1 className="text-2xl font-bold mb-4">تم تغيير كلمة المرور بنجاح</h1>
                      <p className="text-gray-600 mb-6">
                        تم تغيير كلمة المرور الخاصة بك بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.
                      </p>
                      <Button as={Link} href="/login" fullWidth>
                        تسجيل الدخول
                      </Button>

                      <div className="mt-6 p-4 bg-blue-50 rounded-sm border border-blue-100">
                        <p className="text-sm text-blue-700">
                          <Shield className="h-4 w-4 inline-block ml-1" />
                          تم تسجيل تغيير كلمة المرور من جهازك. إذا لم تقم بهذا الإجراء، يرجى الاتصال بدعم العملاء فوراً.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">إعادة تعيين كلمة المرور</h1>
                        <p className="text-gray-600">أدخل كلمة المرور الجديدة</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-[#D2EAE8]/30 p-4 rounded-sm border border-[#D2EAE8] mb-6">
                          <p className="text-sm text-gray-700">
                            اختر كلمة مرور قوية وفريدة لحسابك. تأكد من عدم استخدامها في مواقع أخرى.
                          </p>
                        </div>

                        <div className="relative">
                          <Input
                            label="كلمة المرور الجديدة"
                            type={showPassword ? "text" : "password"}
                            placeholder="أدخل كلمة المرور الجديدة"
                            value={password}
                            onChange={handlePasswordChange}
                            icon={Lock}
                            iconPosition="right"
                            error={passwordError}
                            required
                          />
                          <button
                            type="button"
                            className="absolute left-3 top-9 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>

                        {password && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-600">
                                قوة كلمة المرور: {strengthText[passwordStrength]}
                              </span>
                              <span className="text-xs text-gray-600">{passwordStrength}/5</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${strengthColor[passwordStrength]} transition-all duration-300`}
                                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="relative">
                          <Input
                            label="تأكيد كلمة المرور"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="أعد إدخال كلمة المرور الجديدة"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            icon={Lock}
                            iconPosition="right"
                            required
                          />
                          <button
                            type="button"
                            className="absolute left-3 top-9 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600">
                          <p>كلمة المرور يجب أن تحتوي على:</p>
                          <ul className="space-y-1">
                            <li className={`flex items-center gap-1 ${password.length >= 8 ? "text-green-600" : ""}`}>
                              {password.length >= 8 ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <span className="h-4 w-4 rounded-full border border-gray-300 inline-block"></span>
                              )}
                              8 أحرف على الأقل
                            </li>
                            <li className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? "text-green-600" : ""}`}>
                              {/[A-Z]/.test(password) ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <span className="h-4 w-4 rounded-full border border-gray-300 inline-block"></span>
                              )}
                              حرف كبير واحد على الأقل
                            </li>
                            <li className={`flex items-center gap-1 ${/[a-z]/.test(password) ? "text-green-600" : ""}`}>
                              {/[a-z]/.test(password) ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <span className="h-4 w-4 rounded-full border border-gray-300 inline-block"></span>
                              )}
                              حرف صغير واحد على الأقل
                            </li>
                            <li className={`flex items-center gap-1 ${/[0-9]/.test(password) ? "text-green-600" : ""}`}>
                              {/[0-9]/.test(password) ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <span className="h-4 w-4 rounded-full border border-gray-300 inline-block"></span>
                              )}
                              رقم واحد على الأقل
                            </li>
                          </ul>
                        </div>

                        <Button
                          type="submit"
                          fullWidth
                          disabled={isLoading || !!passwordError || password !== confirmPassword || !password}
                        >
                          {isLoading ? (
                            <>
                              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                              جاري المعالجة...
                            </>
                          ) : (
                            "تغيير كلمة المرور"
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </div>

                {/* Image Column */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-[#00998F]">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        backgroundSize: "24px 24px",
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-white text-center">
                        <div className="mb-6">
                          <Image
                            src="/placeholder.svg?height=120&width=120&text=🔒"
                            alt="Reset Password"
                            width={120}
                            height={120}
                            className="mx-auto"
                          />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">تأمين حسابك</h2>
                        <p className="opacity-90 mb-6">
                          اختر كلمة مرور قوية لحماية حسابك. كلمة المرور القوية تجمع بين الأحرف الكبيرة والصغيرة والأرقام
                          والرموز.
                        </p>
                        <div className="bg-white/20 p-4 rounded-sm">
                          <p className="text-sm">
                            نصيحة أمان: لا تستخدم نفس كلمة المرور لحسابات متعددة، ولا تشاركها مع أي شخص.
                          </p>
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

