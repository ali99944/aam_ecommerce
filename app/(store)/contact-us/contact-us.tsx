"use client"

import { useState, useContext } from "react"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Headphones, Users } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Select from "@/components/ui/select"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { ValidationError } from "@/components/ui/error-components"
import { CategoryCardSkeleton, PageLoadingSkeleton } from "@/components/ui/skeletons"
import { useGetQuery, useMutationAction } from "@/src/hooks/queries-actions"
import { NotificationContext } from "@/src/providers/notification-provider"
import { useAppSelector } from "@/src/redux/hook"
import Textarea from "@/components/ui/textarea"
import Link from "next/link"

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const { settings } = useAppSelector((state) => state.settings)
  const { data: faqs, isFetching: isFaqsLoading, error: faqsError } = useGetQuery({
    url: `faq-categories/contact-us/faqs`,
    key: ['faqs'],
    options: {
      initialData:  []
    }
  })
  const { addNotification } = useContext(NotificationContext)
  const guestCartToken = useAppSelector((state) => state.cart.guestCartToken)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "الاسم الكامل مطلوب"
    if (!formData.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "البريد الإلكتروني غير صالح"
    if (!formData.subject.trim()) newErrors.subject = "الموضوع مطلوب"
    if (!formData.message.trim()) newErrors.message = "الرسالة مطلوبة"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { mutate, isPending } = useMutationAction({
    method: "post",
    url: "contact-messages",
    headers: { "X-Cart-Token": guestCartToken || undefined },
    onSuccessCallback: () => {
      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        type: "general",
      })
      addNotification("تم إرسال رسالتك بنجاح!", "success")
    },
    onErrorCallback: (error) => {
      addNotification(error.response?.data?.message || "حدث خطأ أثناء إرسال الرسالة.", "error")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    mutate(formData)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "اتصل بنا",
      details: [settings?.contact.primary_phone, settings?.contact.secondary_phone].filter(Boolean),
      // description: "متاح من السبت إلى الخميس، 9 صباحاً - 9 مساءً",
    },
    {
      icon: Mail,
      title: "راسلنا",
      details: [settings?.contact.support_email],
      // description: "سنرد عليك خلال 24 ساعة",
    },
    {
      icon: MapPin,
      title: "زورنا",
      details: [settings?.contact.street_address],
      // description: "مفتوح من السبت إلى الخميس، 10 صباحاً - 10 مساءً",
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: [settings?.contact.opening_time, settings?.contact.closing_time].filter(Boolean),
      // description: "خدمة العملاء متاحة على مدار الساعة",
    },
  ]

  const supportTypes = [
    { value: "general", label: "استفسار عام", icon: MessageSquare },
    { value: "order", label: "استفسار عن طلب", icon: Users },
    { value: "technical", label: "مشكلة تقنية", icon: Headphones },
    { value: "complaint", label: "شكوى", icon: Mail },
  ]

  // Extract coordinates from google_map_url or use default (Riyadh)
  const getCoordinates = () => {
    if (settings?.contact.google_map_url) {
      const url = new URL(settings.contact.google_map_url)
      const latlng = url.searchParams.get("ll")?.split(",") || url.searchParams.get("q")?.split(",")
      if (latlng && latlng.length === 2) {
        return [parseFloat(latlng[0]), parseFloat(latlng[1])]
      }
    }
    return [24.7136, 46.6753] // Default: Riyadh
  }

  // if (isPending || isFaqsLoading) {
  //   return <PageLoadingSkeleton />
  // }

  if (faqsError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
          {faqsError.message}
        </div>``
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">تم إرسال رسالتك بنجاح!</h2>
            <p className="text-gray-600 mb-6">شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.</p>
            <div className="flex gap-3 justify-center">
              <Button variant="primary" size="sm" onClick={() => setSuccess(false)}>
                إرسال رسالة أخرى
              </Button>
              <Button variant="secondary" size="sm">
                <Link href="/">العودة للرئيسية</Link>
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
          <h1 className="text-4xl font-bold text-primary mb-6">تواصل معنا</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن هنا لمساعدتك! لا تتردد في التواصل معنا لأي استفسار أو مساعدة تحتاجها
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 text-center border border-gray-100 transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">{info.title}</h3>
              <div className="space-y-1 mb-3">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-700 font-medium">
                    {detail || "غير متوفر"}
                  </p>
                ))}
              </div>
              {/* <p className="text-gray-600 text-sm">{info.description}</p> */}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 max-h-fit">
            <h2 className="text-2xl font-bold text-primary mb-6">أرسل لنا رسالة</h2>
            {Object.keys(errors).length > 0 && (
              <ValidationError
                errors={Object.values(errors)}
                onGoBack={() => setErrors({})}
              />
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسمك الكامل"
                    error={errors.name}
                    required
                    disabled={isPending}
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
                    error={errors.email}
                    required
                    disabled={isPending}
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
                    error={errors.phone}
                    disabled={isPending}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع الاستفسار</label>
                  <Select
                    value={formData.type}
                    options={supportTypes}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    disabled={isPending}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="موضوع الرسالة"
                  error={errors.subject}
                  required
                  disabled={isPending}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتب رسالتك هنا..."
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary focus:border-primary resize-none"
                  required
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
                icon={Send}
              >
                إرسال الرسالة
              </Button>
            </form>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">الأسئلة الشائعة</h2>
            {isFaqsLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      <CategoryCardSkeleton />
                    </h3>

                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {faqs?.map((item) => (
                  <div key={Math.random()} className="bg-white rounded-xl p-4 border border-gray-100">
                    <h3 className="text-lg font-bold text-primary mb-3">{item.question}</h3>
                    <p className="text-gray-700 leading-relaxed" 
                      dangerouslySetInnerHTML={{
                        __html: item.answer
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">موقعنا</h2>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <MapContainer
              center={getCoordinates()}
              zoom={13}
              style={{ height: '400px', width: '100%' }}
              className="rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={getCoordinates()}>
                <Popup>
                  {settings?.contact.street_address || "شارع الملك فهد، حي العليا، الرياض"}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}