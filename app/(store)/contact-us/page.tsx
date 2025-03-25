"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, CheckCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { FAQItem } from "@/components/ui/faq"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      }, 5000)
    }, 1500)
  }

  const subjectOptions = [
    { value: "", label: "اختر الموضوع" },
    { value: "inquiry", label: "استفسار عام" },
    { value: "order", label: "استفسار عن طلب" },
    { value: "product", label: "استفسار عن منتج" },
    { value: "complaint", label: "شكوى" },
    { value: "feedback", label: "اقتراح" },
    { value: "other", label: "أخرى" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#00998F] text-white py-12">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
            <div className="absolute right-20 top-10 w-20 h-20 rounded-full bg-white opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "اتصل بنا" }]} className="mb-6 text-white" />

            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">اتصل بنا</h1>
              <div className="h-1 w-24 bg-white mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto opacity-90">
                نحن هنا للإجابة على جميع استفساراتكم. يمكنكم التواصل معنا من خلال النموذج أدناه أو من خلال معلومات
                الاتصال المتوفرة.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-24 relative z-10">
              <div className="bg-[#D2EAE8] p-6 rounded-sm  ">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00998F] rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">اتصل بنا</h3>
                    <p className="text-gray-600 text-sm">نحن متاحون للرد على استفساراتكم</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#00998F]" />
                    <span dir="ltr">+962 79 123 4567</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#00998F]" />
                    <span dir="ltr">+962 6 420 0000</span>
                  </p>
                </div>
              </div>

              <div className="bg-[#D2EAE8] p-6 rounded-sm  ">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00998F] rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">موقعنا</h3>
                    <p className="text-gray-600 text-sm">يمكنكم زيارتنا في أي وقت</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#00998F]" />
                    <span>عمان، الأردن - شارع الملك عبدالله الثاني</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#00998F]" />
                    <span>بجانب مجمع الجنوب - مقابل البنك العربي</span>
                  </p>
                </div>
              </div>

              <div className="bg-[#D2EAE8] p-6 rounded-sm  ">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00998F] rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">ساعات العمل</h3>
                    <p className="text-gray-600 text-sm">نحن متاحون للخدمة</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#00998F]" />
                    <span>السبت - الخميس: 8 صباحاً - 8 مساءً</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#00998F]" />
                    <span>الجمعة: مغلق</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className=" p-6 rounded-sm bg-white border border-gray-100 ">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-[#00998F]" />
                  <span>ارسل لنا رسالة</span>
                </h2>

                {isSubmitted ? (
                  <div className="bg-[#D2EAE8] border border-green-200 rounded-sm p-6 text-center">
                    <CheckCircle className="h-12 w-12 text-[#00998F] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[#00998F] mb-2">تم إرسال رسالتك بنجاح</h3>
                    <p className="text-[#00998F]">شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="الاسم"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        icon={<User className="h-5 w-5" />}
                        iconPosition="right"
                        required
                      />

                      <Input
                        label="البريد الإلكتروني"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        icon={<Mail className="h-5 w-5" />}
                        iconPosition="right"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="رقم الهاتف"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        icon={<Phone className="h-5 w-5" />}
                        iconPosition="right"
                      />

                      <Select
                        label="الموضوع"
                        name="subject"
                        value={formData.subject}
                        onChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
                        options={subjectOptions}
                        required
                      />
                    </div>

                    <Textarea
                      label="الرسالة"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />

                    <Button
                      type="submit"
                      icon={Send}
                      iconPosition="right"
                      disabled={isLoading}
                    >
                      {isLoading ? "جاري الإرسال..." : "إرسال الرسالة"}
                    </Button>
                  </form>
                )}
              </div>

              {/* Map */}
              <div className="bg-[#D2EAE8] p-6 rounded-sm  ">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-[#00998F]" />
                  <span>موقعنا على الخريطة</span>
                </h2>

                <div className="relative h-96 w-full rounded-sm overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800&text=خريطة"
                    alt="موقعنا على الخريطة"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-sm ">
                      <p className="font-bold">محلات علي ابو مسعود</p>
                      <p className="text-sm text-gray-600">عمان، الأردن - شارع الملك عبدالله الثاني</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-lg mb-2">معلومات إضافية</h3>
                  <p className="text-gray-600 mb-4">
                    يمكنكم أيضاً التواصل معنا عبر البريد الإلكتروني: info@abumassoud.com أو من خلال حساباتنا على مواقع
                    التواصل الاجتماعي.
                  </p>

                  <div className="flex gap-3">
                    <a href="#" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-facebook"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-instagram"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </a>
                    <a href="#" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-twitter"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">الأسئلة الشائعة</h2>
              <div className="h-1 w-24 bg-[#00998F] mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">إليكم بعض الأسئلة الشائعة التي قد تساعدكم</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {[
                  {
                    question: "ما هي طرق الدفع المتاحة؟",
                    answer:
                      "نقبل الدفع نقداً، وبالبطاقات الائتمانية، وعن طريق التحويل البنكي، كما نوفر خيار الدفع عند الاستلام للطلبات داخل عمان.",
                  },
                  {
                    question: "هل توفرون خدمة التوصيل؟",
                    answer:
                      "نعم، نوفر خدمة التوصيل لجميع مناطق المملكة. التوصيل مجاني للطلبات التي تزيد قيمتها عن 50 دينار داخل عمان.",
                  },
                  {
                    question: "ما هي سياسة الإرجاع والاستبدال؟",
                    answer:
                      "يمكن إرجاع أو استبدال المنتجات خلال 14 يوماً من تاريخ الشراء، شرط أن تكون بحالتها الأصلية وبدون استخدام.",
                  },
                  {
                    question: "هل تقدمون خدمات التركيب؟",
                    answer:
                      "نعم، نقدم خدمات التركيب للعديد من منتجاتنا مثل المكيفات والأجهزة الكهربائية الكبيرة. يرجى الاستفسار عن تفاصيل وتكلفة التركيب عند الشراء.",
                  },
                ].map((faq, index) => (
                  <FAQItem 
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">لم تجد إجابة لسؤالك؟ لا تتردد في التواصل معنا مباشرة</p>
                <Button  icon={Phone} iconPosition="right">
                  اتصل بنا الآن
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

