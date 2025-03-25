"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Link href="/login" className="flex items-center text-[#00998F] mb-6 hover:underline">
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة لتسجيل الدخول
            </Link>

            <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Form Column */}
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">استعادة كلمة المرور</h1>
                    <p className="text-gray-600">أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق لإعادة تعيين كلمة المرور</p>
                  </div>

                  {isSubmitted ? (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h2 className="text-lg font-medium text-green-800 mb-2">تم إرسال رمز التحقق</h2>
                      <p className="text-gray-700 mb-6">
                        لقد أرسلنا رمز التحقق إلى بريدك الإلكتروني {email}. يرجى التحقق من بريدك الإلكتروني وإدخال الرمز.
                      </p>
                      <Button as={Link} href="/verify-otp" fullWidth>
                        إدخال رمز التحقق
                      </Button>
                      
                      <div className="mt-6 text-sm text-gray-600">
                        لم تستلم الرمز؟{" "}
                        <button 
                          type="button" 
                          className="text-[#00998F] hover:underline"
                          onClick={() => setIsSubmitted(false)}
                        >
                          إعادة الإرسال
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="bg-[#D2EAE8]/30 p-4 rounded-sm border border-[#D2EAE8] mb-6">
                        <p className="text-sm text-gray-700">
                          سنرسل لك رمز تحقق على بريدك الإلكتروني المسجل. استخدم هذا الرمز لإعادة تعيين كلمة المرور الخاصة بك.
                        </p>
                      </div>
                      
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

                      <Button loading={isLoading} type="submit" fullWidth disabled={isLoading}>
                      إرسال رمز التحقق
                      </Button>
                      
                      <div className="text-center text-sm text-gray-600">
                        تذكرت كلمة المرور؟{" "}
                        <Link href="/login" className="text-[#00998F] hover:underline">
                          تسجيل الدخول
                        </Link>
                      </div>
                    </form>
                  )}
                </div>
                
                {/* Image Column */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-[#00998F]">
                    <div className="absolute inset-0 opacity-20" style={{ 
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                      backgroundSize: '24px 24px'
                    }}></div>
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-white text-center">
                        <div className="mb-6">
                          <Image 
                            src="/placeholder.svg?height=120&width=120&text=🔒" 
                            alt="Forgot Password" 
                            width={120} 
                            height={120}
                            className="mx-auto"
                          />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">نسيت كلمة المرور؟</h2>
                        <p className="opacity-90 mb-6">
                          لا تقلق، يحدث هذا للجميع. أدخل بريدك الإلكتروني وسنرسل لك رمز تحقق لإعادة تعيين كلمة المرور الخاصة بك.
                        </p>
                        <div className="bg-white/20 p-4 rounded-sm">
                          <p className="text-sm">
                            إذا كنت بحاجة إلى مساعدة إضافية، يرجى التواصل مع فريق خدمة العملاء على الرقم:
                          </p>
                          <p className="font-bold mt-2" dir="ltr">+962 79 123 4567</p>
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

      <Footer />
    </div>
  )
}
