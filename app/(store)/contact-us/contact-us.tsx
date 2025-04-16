"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, CheckCircle, Twitter, Instagram, Facebook } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { FAQItem } from "@/components/ui/faq"
import { useGetQuery, useMutationAction } from "@/src/providers/hooks/queries-actions"
import Faq from "@/src/types/faq"
import { Settings } from "@/src/types/settings"
import { CardLoader, LinesLoader } from "@/components/ui/loaders"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const contactMessageAction = useMutationAction({
    url: 'contact-messages',
    method: 'post'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await contactMessageAction.mutateAsync(formData, {
      onSuccess: () => {
        setIsSubmitted(true)
        setIsLoading(false)
      },
      onError: () => {
        setIsLoading(false)
      }
    })
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

  const { data: faqs, isLoading: faqsLoading } = useGetQuery<Faq[]>({
    url: 'faq-categories/contact-us/faqs',
    key: ['faqs', 'contact-us']
  })

  const { data: settings, isLoading: settingsLoading } = useGetQuery<Settings>({
    url: 'settings',
    key: ['settings']
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#00998F] text-white py-12">

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
                    <span dir="ltr">{settings?.contact.primary_phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#00998F]" />
                    <span dir="ltr">{settings?.contact.secondary_phone}</span>
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
                        icon={User}
                        iconPosition="right"
                        required
                      />

                      <Input
                        label="البريد الإلكتروني"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        icon={Mail}
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
                        icon={Phone}
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
                      loading={isLoading}
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

                  {
                    settingsLoading ? (
                        <LinesLoader variant="secondary" lines={1} />
                    ):(
                        <div className="flex gap-3">
                    <a target="_blank" href={settings?.social.facebook} className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a target="_blank" href={settings?.social.instagram} className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a target="_blank" href={settings?.social.twitter} className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                    )
                  }
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

            {
                faqsLoading ? (
                    <CardLoader />
                ): (
                    <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {faqs?.map((faq, index) => (
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
                )
            }
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

