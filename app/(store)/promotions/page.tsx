"use client"

import { useState } from "react"
import { Calendar, Tag, Zap, Wrench, Hammer, Truck, Mail } from 'lucide-react'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"

export default function PromotionsPage() {
  const [filter, setFilter] = useState("all")

  const promotions = [
    {
      id: 1,
      title: "عروض الأدوات الكهربائية",
      subtitle: "خصم يصل إلى 40% على جميع المثاقب والمناشير",
      dateRange: "15 يناير - 30 يناير",
      discount: "40%",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      category: "electrical",
      bgColor: "from-blue-600 to-blue-800",
      textColor: "text-white",
    },
    {
      id: 2,
      title: "أسبوع السباكة الذهبي",
      subtitle: "أفضل الأسعار على المواسير والتركيبات",
      dateRange: "20 يناير - 27 يناير",
      discount: "35%",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      category: "plumbing",
      bgColor: "from-teal-500 to-teal-700",
      textColor: "text-white",
    },
    {
      id: 3,
      title: "مهرجان مواد البناء",
      subtitle: "خصومات هائلة على الأسمنت والطوب والحديد",
      dateRange: "10 يناير - 25 يناير",
      discount: "25%",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
      category: "building",
      bgColor: "from-orange-500 to-red-600",
      textColor: "text-white",
    },
    {
      id: 4,
      title: "عروض الخرسانة الجاهزة",
      subtitle: "أسعار خاصة للمقاولين والمشاريع الكبيرة",
      dateRange: "5 يناير - 20 يناير",
      discount: "20%",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      category: "concrete",
      bgColor: "from-gray-600 to-gray-800",
      textColor: "text-white",
    },
    {
      id: 5,
      title: "أدوات القياس والمعايرة",
      subtitle: "دقة عالية بأسعار منافسة",
      dateRange: "12 يناير - 19 يناير",
      discount: "30%",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
      category: "electrical",
      bgColor: "from-purple-600 to-purple-800",
      textColor: "text-white",
    },
    {
      id: 6,
      title: "معدات الأمان والحماية",
      subtitle: "خوذات، قفازات، وأحذية أمان",
      dateRange: "8 يناير - 22 يناير",
      discount: "45%",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      category: "safety",
      bgColor: "from-yellow-500 to-orange-500",
      textColor: "text-white",
    },
    {
      id: 7,
      title: "أدوات اللحام والقطع",
      subtitle: "معدات احترافية للحرفيين المهرة",
      dateRange: "18 يناير - 31 يناير",
      discount: "35%",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
      category: "electrical",
      bgColor: "from-indigo-600 to-blue-700",
      textColor: "text-white",
    },
    {
      id: 8,
      title: "مضخات المياه والضغط",
      subtitle: "حلول متكاملة لضخ المياه",
      dateRange: "14 يناير - 28 يناير",
      discount: "28%",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      category: "plumbing",
      bgColor: "from-cyan-500 to-blue-600",
      textColor: "text-white",
    },
    {
      id: 9,
      title: "عدد اليد التقليدية",
      subtitle: "مطارق، مفكات، وكماشات عالية الجودة",
      dateRange: "6 يناير - 20 يناير",
      discount: "50%",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
      category: "tools",
      bgColor: "from-green-600 to-green-800",
      textColor: "text-white",
    },
  ]

  const categories = [
    { id: "all", name: "جميع العروض", icon: Tag },
    { id: "electrical", name: "أدوات كهربائية", icon: Zap },
    { id: "plumbing", name: "سباكة", icon: Wrench },
    { id: "building", name: "مواد بناء", icon: Hammer },
    { id: "concrete", name: "خرسانة", icon: Truck },
    { id: "safety", name: "أمان", icon: Tag },
    { id: "tools", name: "عدد يدوية", icon: Hammer },
  ]

  const filteredPromotions = filter === "all" 
    ? promotions 
    : promotions.filter(promo => promo.category === filter)

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">أدوات ومعدات تحتاجها</p>
          <h1 className="text-4xl font-bold text-primary mb-4">العروض والتخفيضات</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اكتشف أفضل العروض على الأدوات الكهربائية ومعدات السباكة ومواد البناء والخرسانة
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category.id
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map((promo) => (
            <div
              key={promo.id}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br bg-gray-900 group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative p-4 h-64 flex flex-col justify-between">
                {/* Date Badge */}
                <div className="flex items-center gap-2 text-white/90 text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  {promo.dateRange}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${promo.textColor}`}>
                    {promo.title}
                  </h3>
                  <p className={`text-sm opacity-90 ${promo.textColor}`}>
                    {promo.subtitle}
                  </p>
                </div>

                {/* Discount Badge */}
                <div className="flex items-center justify-between">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white font-bold text-sm">خصم {promo.discount}</span>
                  </div>
                  <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    تسوق الآن
                  </Button>
                </div>
              </div>

              {/* Background Image */}
              <div 
                className="absolute top-0 right-0 w-full h-full opacity-20 bg-cover bg-center"
                style={{ backgroundImage: `url(${promo.image})` }}
              ></div>
            </div>
          ))}
        </div>



        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-xl p-8 text-center border border-gray-100">
          <h3 className="text-2xl font-bold text-primary mb-4">لا تفوت العروض القادمة</h3>
          <p className="text-gray-600 mb-6">اشترك في نشرتنا البريدية لتصلك أحدث العروض والتخفيضات</p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              icon={<Mail size={20}/>}
              className="!w-80"
            />
            <Button variant="primary" size="sm">
              اشتراك
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
