"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGetQuery } from "@/src/providers/hooks/queries-actions"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, Youtube, Linkedin, ArrowRight, Send, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "./ui/toast"

// Define interfaces for the API responses
interface Settings {
  general: {
    application_name: string;
    application_logo: string;
    application_url: string;
    site_logo: string;
    site_favicon: string;
    maintenance_mode: boolean;
    enable_registration: boolean;
    enable_newsletter_subscription: boolean;
  };
  contact: {
    primary_phone: string;
    secondary_phone: string;
    support_email: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    google_map_url: string | null;
    working_days: string;
    opening_time: string;
    closing_time: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  localization: {
    default_locale: string;
    default_timezone: string;
    enable_switcher: boolean;
  };
  payment: {
    cod_enabled: boolean;
    default_fee: number;
    free_shipping_threshold: {
      enabled: boolean;
      amount: number;
    };
    allow_partial_payment: boolean;
  };
  delivery: {
    cod_enabled: boolean;
    default_fee: number;
    free_shipping_threshold: number;
  };
  notification: {
    admin_order_notification_email: string;
    customer_order_confirmation_email: boolean;
    abandoned_cart_email_enabled: boolean;
    enable_sms_notifications: boolean;
    sms_provider: string;
    sms_order_updates_enabled: boolean;
    enable_web_push_notifications: boolean;
    push_notification_provider: string;
  };
  discount: {
    enable_coupons: boolean;
    enable_flash_sales: boolean;
    flash_sale_notification: "email";
  };
}

interface Policy {
  id: string | number;
  name: string;
  key: string;
  content: string;
}

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch settings data
  const { data: settings, isLoading: settingsLoading } = useGetQuery<Settings>({
    url: 'settings',
    key: ['settings']
  })

  // Fetch policies data
  const { data: policies, isLoading: policiesLoading } = useGetQuery<Policy[]>({
    url: 'policies',
    key: ['policies']
  })

  const { addToast } = useToast()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    if (!email.trim()) {
      addToast("الرجاء إدخال بريد إلكتروني صالح", 'error')
      return
    }

    try {
      setIsSubmitting(true)
      // Replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      addToast("تم الاشتراك بنجاح", 'success')
      setEmail("")
    } catch (error) {
      console.log(error);
      
      addToast("لم نتمكن من تسجيل اشتراكك، يرجى المحاولة مرة أخرى", 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format working hours
  const getWorkingHours = () => {
    if (!settings) return "غير متاح"
    
    const { working_days, opening_time, closing_time } = settings.contact
    return `${working_days}: ${opening_time} - ${closing_time}`
  }

  // Format address
  const getFullAddress = () => {
    if (!settings) return "غير متاح"
    
    const { street_address, city, state, country } = settings.contact
    return [street_address, city, state, country].filter(Boolean).join("، ")
  }

  // Check if social media link exists
  const hasSocialLink = (platform: keyof Settings['social']) => {
    return settings?.social[platform] && settings.social[platform] !== ""
  }

  // Get social media URL with proper formatting
  const getSocialUrl = (platform: keyof Settings['social']) => {
    const url = settings?.social[platform] || "#"
    return url.startsWith("http") ? url : `https://${url}`
  }

  // Loading skeleton
  if (settingsLoading) {
    return (
      <footer className="bg-gray-50 pt-16 pb-4 animate-pulse">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="h-12 w-48 bg-gray-300 rounded mb-4"></div>
              <div className="h-20 bg-gray-300 rounded mb-6"></div>
              <div className="flex gap-3 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 w-10 bg-gray-300 rounded-sm"></div>
                ))}
              </div>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-32 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-6 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-6 pb-4">
            <div className="h-6 w-full md:w-1/2 bg-gray-300 rounded mb-4"></div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-50 pt-16 pb-4">
      {/* Newsletter Section - Only show if enabled in settings */}
      {settings?.general.enable_newsletter_subscription && (
        <div className="container mx-auto px-4 mb-12">
          <div className="bg-[#00998F] rounded-md p-8 text-white shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">اشترك في نشرتنا الإخبارية</h3>
                <p className="opacity-90">احصل على آخر العروض والتحديثات مباشرة إلى بريدك الإلكتروني</p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني" 
                  className="bg-white border-0 text-gray-800" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  variant="secondary" 
                  className="whitespace-nowrap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري الإرسال
                    </>
                  ) : (
                    <>
                      <Send className="ml-2 h-4 w-4" />
                      اشترك الآن
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* About Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {settings?.general.site_logo ? (
                <Image 
                  src={settings.general.site_logo || "/placeholder.svg"} 
                  alt={settings.general.application_name || "الشعار"} 
                  width={48} 
                  height={48} 
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div className="h-12 w-12 bg-[#00998F] rounded-sm flex items-center justify-center text-white font-bold text-lg">
                  {settings?.general.application_name?.[0] || "ع"}
                </div>
              )}
              <h3 className="text-xl font-bold text-[#00998F]">
                {settings?.general.application_name || "محلات علي ابو مسعود"}
              </h3>
            </div>
            <p className="text-base mb-6">
              متجر متخصص في مواد البناء والعدد الكهربائية والمواد الزراعية في الأردن. نقدم منتجات عالية الجودة بأسعار منافسة مع خدمة توصيل سريعة لجميع أنحاء المملكة.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {hasSocialLink('facebook') && (
                <a href={getSocialUrl('facebook')} target="_blank" rel="noopener noreferrer" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity hover:scale-105">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {hasSocialLink('instagram') && (
                <a href={getSocialUrl('instagram')} target="_blank" rel="noopener noreferrer" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity hover:scale-105">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {hasSocialLink('twitter') && (
                <a href={getSocialUrl('twitter')} target="_blank" rel="noopener noreferrer" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity hover:scale-105">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {hasSocialLink('youtube') && (
                <a href={getSocialUrl('youtube')} target="_blank" rel="noopener noreferrer" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity hover:scale-105">
                  <Youtube className="h-5 w-5" />
                </a>
              )}
              {hasSocialLink('linkedin') && (
                <a href={getSocialUrl('linkedin')} target="_blank" rel="noopener noreferrer" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity hover:scale-105">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>

            {settings?.contact.google_map_url && (
              <div className="mt-4 mb-6 rounded-md overflow-hidden h-40 w-full">
                <iframe 
                  src={settings.contact.google_map_url} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقعنا على الخريطة"
                ></iframe>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#00998F] border-r-4 border-[#00998F] pr-3">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-base hover:text-[#00998F] transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 ml-2 text-[#00998F]" />
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-base hover:text-[#00998F] transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 ml-2 text-[#00998F]" />
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-base hover:text-[#00998F] transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 ml-2 text-[#00998F]" />
                  العروض
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-base hover:text-[#00998F] transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 ml-2 text-[#00998F]" />
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base hover:text-[#00998F] transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 ml-2 text-[#00998F]" />
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-base hover:text-[#00998F] transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 ml-2 text-[#00998F]" />
                  حسابي
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#00998F] border-r-4 border-[#00998F] pr-3">الأقسام</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/building"
                  className="text-base hover:text-[#00998F] transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 ml-2 text-[#00998F]" />
                  مواد البناء
                </Link>
              </li>
              <li>
                <Link
                  href="/category/electrical"
                  className="text-base hover:text-[#00998F] transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 ml-2 text-[#00998F]" />
                  العدد الكهربائية
                </Link>
              </li>
              <li>
                <Link
                  href="/category/agricultural"
                  className="text-base hover:text-[#00998F] transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 ml-2 text-[#00998F]" />
                  المواد الزراعية
                </Link>
              </li>
              <li>
                <Link
                  href="/category/plumbing"
                  className="text-base hover:text-[#00998F] transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 ml-2 text-[#00998F]" />
                  السباكة
                </Link>
              </li>
              <li>
                <Link
                  href="/category/lighting"
                  className="text-base hover:text-[#00998F] transition-colors flex items-center"
                >
                  <ArrowRight className="h-4 w-4 ml-2 text-[#00998F]" />
                  الإضاءة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#00998F] border-r-4 border-[#00998F] pr-3">معلومات التواصل</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base">
                <MapPin className="h-6 w-6 text-[#00998F] flex-shrink-0 mt-0.5" />
                <span>{getFullAddress()}</span>
              </li>
              {settings?.contact.primary_phone && (
                <li className="flex items-center gap-3 text-base">
                  <Phone className="h-6 w-6 text-[#00998F] flex-shrink-0" />
                  <a 
                    href={`tel:${settings.contact.primary_phone}`} 
                    className="hover:text-[#00998F] transition-colors"
                    dir="ltr"
                  >
                    {settings.contact.primary_phone}
                  </a>
                </li>
              )}
              {settings?.contact.secondary_phone && (
                <li className="flex items-center gap-3 text-base">
                  <Phone className="h-6 w-6 text-[#00998F] flex-shrink-0" />
                  <a 
                    href={`tel:${settings.contact.secondary_phone}`} 
                    className="hover:text-[#00998F] transition-colors"
                    dir="ltr"
                  >
                    {settings.contact.secondary_phone}
                  </a>
                </li>
              )}
              {settings?.contact.support_email && (
                <li className="flex items-center gap-3 text-base">
                  <Mail className="h-6 w-6 text-[#00998F] flex-shrink-0" />
                  <a 
                    href={`mailto:${settings.contact.support_email}`} 
                    className="hover:text-[#00998F] transition-colors"
                  >
                    {settings.contact.support_email}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3 text-base">
                <Clock className="h-6 w-6 text-[#00998F] flex-shrink-0" />
                {getWorkingHours()}
              </li>
            </ul>
          </div>
        </div>

        {/* Policy Links */}
        <div className="border-t border-gray-200 pt-6 pb-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base mb-4 md:mb-0">
            © {new Date().getFullYear()} {settings?.general.application_name || "محلات علي ابو مسعود"}. جميع الحقوق محفوظة.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {!policiesLoading && policies?.length ? (
              policies.map((policy, index) => (
                <div key={policy.id}>
                  <Link href={`/${policy.key}`} className="text-sm hover:text-[#00998F] transition-colors">
                    {policy.name}
                  </Link>
                  {index < policies.length - 1 && <span className="text-gray-300">|</span>}
                </div>
              ))
            ) : (
              <>
                <Link href="/privacy-policy" className="text-sm hover:text-[#00998F] transition-colors">
                  سياسة الخصوصية
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/return-policy" className="text-sm hover:text-[#00998F] transition-colors">
                  سياسة الإرجاع
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/terms" className="text-sm hover:text-[#00998F] transition-colors">
                  الشروط والأحكام
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
