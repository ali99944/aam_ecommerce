"use client"

import type React from "react"

import { useState } from "react"
import Input from "../ui/input"
import Button from "../ui/button"
import NewsletterSuccessDialog from "../ui/newsletter-success-dialog"


export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSuccessOpen(true)
      setEmail(email)
    }
  }

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-xl p-12 text-center text-white">
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              احصل على إشعار عند إطلاق العروض الجديدة
            </h2>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              اشترك في نشرتنا البريدية واحصل على أفضل العروض والتخفيضات الحصرية على جميع المنتجات التقنية والإلكترونية
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <Input
                size="md"
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-black placeholder:text-black/60 ring-0 focus:ring-0 border-none"
                required
              />
              <Button variant="primary" size="md" type="submit">
                اشتراك
              </Button>
            </form>

            {/* Optional: Small disclaimer text */}
            <p className="text-sm text-gray-400 mt-6">يمكنك إلغاء الاشتراك في أي وقت. نحن نحترم خصوصيتك.</p>
          </div>
        </div>
      </section>

      <NewsletterSuccessDialog isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} email={email} />
    </>
  )
}
