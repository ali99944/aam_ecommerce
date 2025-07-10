"use client"

import { useState } from "react"
import { X, ArrowLeft, Zap, Gift, Truck, Clock } from "lucide-react"
import Button from "@/components/ui/button"

interface PromotionalAdProps {
  type?: "banner" | "popup" | "floating" | "inline"
  variant?: "primary" | "secondary" | "accent" | "gradient"
  dismissible?: boolean
  autoHide?: boolean
  hideDelay?: number
  className?: string
}

export default function PromotionalAd({
  type = "banner",
  variant = "primary",
  dismissible = true,
  autoHide = false,
  hideDelay = 5000,
  className = "",
}: PromotionalAdProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Auto hide functionality
  if (autoHide && hideDelay) {
    setTimeout(() => {
      setIsVisible(false)
    }, hideDelay)
  }

  if (!isVisible) return null

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white"
      case "secondary":
        return "bg-gray-800 text-white"
      case "accent":
        return "bg-accent text-white"
      case "gradient":
        return "bg-gradient-to-r from-primary to-accent text-white"
      default:
        return "bg-primary text-white"
    }
  }

  const getTypeStyles = () => {
    switch (type) {
      case "banner":
        return "w-full"
      case "popup":
        return "fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      case "floating":
        return "fixed bottom-4 right-4 z-40 max-w-sm"
      case "inline":
        return "w-full"
      default:
        return "w-full"
    }
  }

  const BannerAd = () => (
    <div className={`${getVariantStyles()} ${className}`} dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="font-bold">عرض محدود!</span>
            </div>
            <span className="text-sm">خصم 25% على جميع الأدوات الكهربائية - شحن مجاني للطلبات أكثر من 500 ريال</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" >
              تسوق الآن
            </Button>
            {dismissible && (
              <button onClick={() => setIsVisible(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const PopupAd = () => (
    <div className={getTypeStyles()}>
      <div className="bg-white rounded-xl max-w-md mx-4 overflow-hidden shadow-2xl" dir="rtl">
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 left-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <div className={`${getVariantStyles()} p-4 text-center relative`}>
          <div className="mb-4">
            <Gift className="w-12 h-12 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-2">عرض خاص للزوار الجدد!</h3>
            <p className="text-white/90">احصل على خصم 15% على أول طلب لك</p>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Truck className="w-5 h-5 text-primary" />
              <span>شحن مجاني لجميع الطلبات</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Clock className="w-5 h-5 text-primary" />
              <span>توصيل سريع خلال 24 ساعة</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Gift className="w-5 h-5 text-primary" />
              <span>ضمان الجودة 100%</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="primary" size="sm" className="w-full">
              احصل على الخصم
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="w-full text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              لا شكراً، سأتصفح المتجر
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const FloatingAd = () => (
    <div className={`${getTypeStyles()} ${getVariantStyles()} rounded-xl shadow-lg`} dir="rtl">
      <div className="p-4">
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 left-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="text-center">
          <Zap className="w-8 h-8 mx-auto mb-2 animate-pulse" />
          <h4 className="font-bold mb-1">عرض اليوم!</h4>
          <p className="text-sm text-white/90 mb-3">خصم 20% على المثاقب</p>
          <Button variant="secondary" size="sm">
            تسوق الآن
          </Button>
        </div>
      </div>
    </div>
  )

  const InlineAd = () => (
    <div className={`${getVariantStyles()} rounded-xl ${className}`} dir="rtl">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">عروض نهاية الأسبوع</h3>
              <p className="text-white/90">خصومات تصل إلى 40% على مجموعة مختارة من الأدوات</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" >
              اكتشف العروض
            </Button>
            {dismissible && (
              <button onClick={() => setIsVisible(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  switch (type) {
    case "banner":
      return <BannerAd />
    case "popup":
      return <PopupAd />
    case "floating":
      return <FloatingAd />
    case "inline":
      return <InlineAd />
    default:
      return <BannerAd />
  }
}
