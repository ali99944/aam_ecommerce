"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, ShieldCheck, Truck, Package, CreditCard } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle login logic
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Login Form */}
            <div className="bg-white p-8 rounded-sm border border-gray-200">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">تسجيل الدخول</h1>
                <p className="text-gray-600">أهلاً بك مجدداً! قم بتسجيل الدخول للوصول إلى حسابك</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                  iconPosition="right"
                  required
                />

                <div className="relative">
                  <Input
                    label="كلمة المرور"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={Lock}
                    iconPosition="right"
                    required
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-9 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#00998F] border-gray-300 rounded-sm focus:ring-[#00998F]"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span className="mr-2 text-sm">تذكرني</span>
                  </label>

                  <Link href="/forgot-password" className="text-sm text-[#00998F] hover:underline">
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <Button type="submit" fullWidth disabled={isLoading}>
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    ليس لديك حساب؟{" "}
                    <Link href="/register" className="text-[#00998F] hover:underline">
                      إنشاء حساب جديد
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Info Column */}
            <div className="bg-[#00998F] p-8 rounded-sm text-white">
              <h2 className="text-2xl font-bold mb-6">مرحباً بك في محلات علي أبو مسعود</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6" />
                  لماذا تنضم إلينا؟
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-white/20 p-1 rounded-sm mt-1">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">سهولة في تقييم المنتجات وتتبع الطلبات</h4>
                      <p className="text-white/80 text-sm">يمكنك متابعة طلباتك وتقييم المنتجات التي اشتريتها بسهولة</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-white/20 p-1 rounded-sm mt-1">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">الوصول إلى قائمة المفضلات وحفظ المنتجات</h4>
                      <p className="text-white/80 text-sm">احفظ منتجاتك المفضلة للرجوع إليها لاحقاً بسهولة</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-white/20 p-1 rounded-sm mt-1">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">الحصول على كل الإشعارات بخصوص طلبك</h4>
                      <p className="text-white/80 text-sm">تلقي إشعارات فورية عن حالة طلبك ومواعيد التوصيل</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border-t border-white/20 pt-6">
                <h3 className="text-lg font-bold mb-4">هل أنت مورّد أو شركة توصيل؟</h3>
                <p className="mb-4 text-white/80">نحن دائماً نبحث عن شركاء جدد للعمل معهم. تواصل معنا لمناقشة فرص التعاون.</p>
                <Button variant="secondary">تواصل معنا</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
