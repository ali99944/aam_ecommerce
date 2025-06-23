"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Headphones, Users } from "lucide-react"
import Navbar from "@/components/header"
import Footer from "@/components/custom/footer"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Select from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const contactInfo = [
    {
      icon: Phone,
      title: "اتصل بنا",
      details: ["+966 11 123 4567", "+966 50 123 4567"],
      description: "متاح من السبت إلى الخميس، 9 صباحاً - 9 مساءً",
    },
    {
      icon: Mail,
      title: "راسلنا",
      details: ["info@salla-store.com", "support@salla-store.com"],
      description: "سنرد عليك خلال 24 ساعة",
    },
    {
      icon: MapPin,
      title: "زورنا",
      details: ["شارع الملك فهد، حي العليا", "الرياض 12345، المملكة العربية السعودية"],
      description: "مفتوح من السبت إلى الخميس، 10 صباحاً - 10 مساءً",
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: ["السبت - الخميس: 9:00 - 21:00", "الجمعة: 14:00 - 21:00"],
      description: "خدمة العملاء متاحة على مدار الساعة",
    },
  ]

  const supportTypes = [
    { value: "general", label: "استفسار عام", icon: MessageSquare },
    { value: "order", label: "استفسار عن طلب", icon: Users },
    { value: "technical", label: "مشكلة تقنية", icon: Headphones },
    { value: "complaint", label: "شكوى", icon: Mail },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        type: "general",
      })
    }, 1000)
  }

  const faqItems = [
    {
      question: "كيف يمكنني تتبع طلبي؟",
      answer: "يمكنك تتبع طلبك من خلال صفحة 'تتبع الطلب' باستخدام رقم الطلب المرسل إليك عبر البريد الإلكتروني.",
    },
    {
      question: "ما هي طرق الدفع المتاحة؟",
      answer: "نقبل جميع البطاقات الائتمانية (فيزا، ماستركارد، مدى)، أبل باي، والدفع عند الاستلام.",
    },
    {
      question: "كم تستغرق عملية الشحن؟",
      answer: "عادة ما يستغرق التوصيل من 2-5 أيام عمل داخل المملكة، حسب موقعك الجغرافي.",
    },
    {
      question: "هل يمكنني إرجاع المنتج؟",
      answer: "نعم، يمكنك إرجاع المنتج خلال 14 يوم من تاريخ الاستلام، بشرط أن يكون في حالته الأصلية.",
    },
  ]

  if (success) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">تم إرسال رسالتك بنجاح!</h2>
            <p className="text-gray-600 mb-6">شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.</p>
            <div className="flex gap-3 justify-center">
              <Button variant="primary" size="sm" onClick={() => setSuccess(false)}>
                إرسال رسالة أخرى
              </Button>
              <Button variant="secondary" size="sm">
                <a href="/">العودة للرئيسية</a>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />


      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-6">تواصل معنا</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن هنا لمساعدتك! لا تتردد في التواصل معنا لأي استفسار أو مساعدة تحتاجها
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 text-center border border-gray-100  transition-shadow"
            >
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--primary)] mb-3">{info.title}</h3>
              <div className="space-y-1 mb-3">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-700 font-medium">
                    {detail}
                  </p>
                ))}
              </div>
              <p className="text-gray-600 text-sm">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">أرسل لنا رسالة</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسمك الكامل"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="أدخل بريدك الإلكتروني"
                    icon={<Mail className="w-5 h-5" />}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05xxxxxxxx"
                    icon={<Phone className="w-5 h-5" />}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع الاستفسار</label>
                  <Select
                    value={formData.type}
                    options={supportTypes}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="موضوع الرسالة"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتب رسالتك هنا..."
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] resize-none"
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full" loading={isLoading} icon={Send}>
                إرسال الرسالة
              </Button>
            </form>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">الأسئلة الشائعة</h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
                  <h3 className="text-lg font-bold text-[var(--primary)] mb-3">{item.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[var(--primary)] text-center mb-8">موقعنا</h2>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">خريطة الموقع</p>
                <p className="text-sm text-gray-500">شارع الملك فهد، حي العليا، الرياض</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
