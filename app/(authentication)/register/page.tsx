"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock, User, Phone, ShieldCheck, Clock, Gift, CreditCard } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutationAction } from "@/src/providers/hooks/queries-actions"
import { useToast } from "@/components/ui/toast"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const registerAction = useMutationAction({
    url: "auth/customer/register",
    method: "post"
  })

  const { addToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if(formData.password != formData.password_confirmation) {
      addToast("كلمات المرور غير متطابقة", 'error', 3000)
      setIsLoading(false)
      return
    }

    await registerAction.mutateAsync(formData, {
      onSuccess: () => {
        addToast("تم التسجيل بنجاح", 'success', 3000)
        setIsLoading(false)
        router.replace('/login')
      },
      onError: (error) => {
        addToast((error as AxiosError).response?.data.message, 'error', 3000)
        setIsLoading(false)
      }
    })
  }

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Registration Form */}
            <div className="bg-white p-8 rounded-sm border border-gray-200">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">إنشاء حساب جديد</h1>
                <p className="text-gray-600">انضم إلينا واستمتع بتجربة تسوق مميزة</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="">
                  <Input
                    label="الاسم"
                    name="name"
                    placeholder="الاسم"
                    value={formData.name}
                    onChange={handleChange}
                    icon={User}
                    iconPosition="right"
                    required
                  />
                </div>

                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  name="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                  iconPosition="right"
                  required
                />

                <Input
                  label="رقم الهاتف"
                  type="tel"
                  name="phone"
                  placeholder="أدخل رقم هاتفك"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={Phone}
                  iconPosition="right"
                  required
                />

                <div className="relative">
                  <Input
                    label="كلمة المرور"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="أدخل كلمة المرور"
                    value={formData.password}
                    onChange={handleChange}
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

                <div className="relative">
                  <Input
                    label="تأكيد كلمة المرور"
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirmation"
                    placeholder="أعد إدخال كلمة المرور"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    icon={Lock}
                    iconPosition="right"
                    required
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-9 text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-[#00998F] border-gray-300 rounded-sm focus:ring-[#00998F] mt-1"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    required
                  />
                  <label htmlFor="terms" className="mr-2 text-sm text-gray-600">
                    أوافق على{" "}
                    <Link href="/terms" className="text-[#00998F] hover:underline">
                      الشروط والأحكام
                    </Link>{" "}
                    و{" "}
                    <Link href="/privacy-policy" className="text-[#00998F] hover:underline">
                      سياسة الخصوصية
                    </Link>
                  </label>
                </div>

                <Button type="submit" fullWidth disabled={isLoading || !agreeTerms}>
                  {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                </Button>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    لديك حساب بالفعل؟{" "}
                    <Link href="/login" className="text-[#00998F] hover:underline">
                      تسجيل الدخول
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Benefits Column */}
            <div className="bg-[#00998F] p-8 rounded-sm text-white">
              <h2 className="text-2xl font-bold mb-6">لماذا تسجل معنا؟</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-sm mt-1">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">سهولة في تقييم المنتجات وتتبع الطلبات</h3>
                    <p className="text-white/80">يمكنك متابعة طلباتك بسهولة ومعرفة حالتها في أي وقت، كما يمكنك تقييم المنتجات التي اشتريتها.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-sm mt-1">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">الوصول إلى قائمة المفضلات وحفظ المنتجات</h3>
                    <p className="text-white/80">احفظ منتجاتك المفضلة للرجوع إليها لاحقاً، وقم بإنشاء قوائم مخصصة لمشاريعك المختلفة.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-sm mt-1">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">الحصول على كل الإشعارات بخصوص طلبك</h3>
                    <p className="text-white/80">تلقي إشعارات فورية عن حالة طلبك ومواعيد التوصيل والعروض الخاصة.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-sm mt-1">
                    <Gift className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">عروض وخصومات حصرية</h3>
                    <p className="text-white/80">احصل على عروض وخصومات حصرية للأعضاء المسجلين، وكن أول من يعلم بالمنتجات الجديدة.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 p-4 rounded-sm">
                <h3 className="text-lg font-bold mb-2">انضم إلى أكثر من 10,000 عميل سعيد</h3>
                <p className="text-white/80 mb-4">سجل الآن واستمتع بتجربة تسوق سهلة ومريحة مع محلات علي أبو مسعود.</p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                        <Image 
                          src={`https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?ga=GA1.1.259795667.1741285641&semt=ais_keywords_boost`} 
                          alt={`عميل ${i}`} 
                          width={40} 
                          height={40} 
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-bold">⭐⭐⭐⭐⭐</div>
                    <div>4.9/5 تقييم العملاء</div>
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
