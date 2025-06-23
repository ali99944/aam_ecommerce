"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Share2, Heart } from "lucide-react"
import Navbar from "@/components/header"
import Footer from "@/components/custom/footer"
import Button from "@/components/ui/button"
import Breadcrumb from "@/components/ui/breadcrumb"
import ProductCard from "@/components/custom/product-card"

export default function PromotionDetailsPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 45,
    seconds: 30,
  })

  // Mock promotion data
  const promotion = {
    id: 1,
    title: "عروض الأدوات الكهربائية الكبرى",
    subtitle: "خصومات هائلة تصل إلى 40% على جميع الأدوات الكهربائية",
    description:
      "استفد من أكبر عروض السنة على الأدوات الكهربائية من أفضل العلامات التجارية العالمية. عرض محدود لفترة قصيرة!",
    discount: "40%",
    startDate: "15 يناير 2024",
    endDate: "30 يناير 2024",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop",
    bgColor: "from-primary to-primary",
    store: "متجر الأدوات المتخصص",
  }

  const promotionProducts = [
    {
      id: 1,
      name: "مثقاب كهربائي بوش 18 فولت",
      category: "مثاقب كهربائية",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop",
      price: 450.0,
      originalPrice: 750.0,
      discount: 40,
      badge: "خصم 40%",
      rating: 4.7,
      reviewCount: 89,
      brand: "بوش",
    },
    {
      id: 2,
      name: "منشار دائري ديوالت 1200 واط",
      category: "مناشير كهربائية",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop",
      price: 680.0,
      originalPrice: 1100.0,
      discount: 38,
      badge: "خصم 38%",
      rating: 4.8,
      reviewCount: 156,
      brand: "ديوالت",
    },
    {
      id: 3,
      name: "صنفرة مداري ماكيتا 300 واط",
      category: "أدوات الصنفرة",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop",
      price: 320.0,
      originalPrice: 520.0,
      discount: 38,
      badge: "خصم 38%",
      rating: 4.5,
      reviewCount: 67,
      brand: "ماكيتا",
    },
    {
      id: 4,
      name: "متر قياس ليزر هيلتي 50 متر",
      category: "أدوات القياس",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=300&fit=crop",
      price: 890.0,
      originalPrice: 1200.0,
      discount: 26,
      badge: "خصم 26%",
      rating: 4.9,
      reviewCount: 34,
      brand: "هيلتي",
    },
    {
      id: 5,
      name: "ماكينة لحام إنفرتر 200 أمبير",
      category: "أدوات اللحام",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop",
      price: 1250.0,
      originalPrice: 1850.0,
      discount: 32,
      badge: "خصم 32%",
      rating: 4.6,
      reviewCount: 78,
      brand: "لينكولن",
    },
    {
      id: 6,
      name: "مجموعة عدد كهربائية شاملة",
      category: "مجموعات",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop",
      price: 2100.0,
      originalPrice: 3200.0,
      discount: 34,
      badge: "خصم 34%",
      rating: 4.8,
      reviewCount: 145,
      brand: "بوش",
    },
  ]

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "العروض", href: "/promotions" },
            { label: promotion.title, href: "#" },
          ]}
          variant="light"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Promotion Header - Based on the provided image */}
        <div className={`relative overflow-hidden rounded-xl mb-12 bg-gradient-to-r ${promotion.bgColor}`}>
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                أسرع واحصل على خصومات على جميع الأدوات الكهربائية تصل إلى {promotion.discount}
              </h1>
              <p className="text-white/90 mb-6 text-lg">
                {promotion.startDate} - {promotion.endDate}
              </p>

              {/* Countdown Timer */}
              <div className="flex flex-row-reverse  gap-4 mb-6" dir="ltr">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-[70px]">
                  <div className="text-2xl font-bold">{timeLeft.days}</div>
                  <div className="text-sm opacity-90">أيام</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-[70px]">
                  <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, "0")}</div>
                  <div className="text-sm opacity-90">ساعة</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-[70px]">
                  <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, "0")}</div>
                  <div className="text-sm opacity-90">دقيقة</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-[70px]">
                  <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, "0")}</div>
                  <div className="text-sm opacity-90">ثانية</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="accent" size="sm">
                  تسوق الآن
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  <Share2 className="w-4 h-4 ml-2" />
                  مشاركة
                </Button>
              </div>
            </div>

            {/* Right Content - Product Images */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop"
                alt="أدوات كهربائية"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Store Info */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-bold text-primary mb-2">عرض خاص من {promotion.store}</h3>
          <p className="text-gray-600 mb-4">{promotion.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>ينتهي في {promotion.endDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>عرض محدود</span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary">المنتجات المشمولة في العرض</h2>
            <Button variant="primary" size="sm" icon={Heart}>
              حفظ العرض
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {promotionProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showRating={true}
                onAddToCart={(product) => console.log("Add to cart:", product)}
                onToggleWishlist={(product) => console.log("Toggle wishlist:", product)}
              />
            ))}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-primary mb-4">الشروط والأحكام</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              • العرض ساري من {promotion.startDate} حتى {promotion.endDate}
            </li>
            <li>• الخصم يطبق على المنتجات المحددة فقط</li>
            <li>• لا يمكن دمج هذا العرض مع عروض أخرى</li>
            <li>• الكمية محدودة والعرض ساري حتى نفاد الكمية</li>
            <li>• يحق للمتجر إنهاء العرض في أي وقت دون إشعار مسبق</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  )
}
