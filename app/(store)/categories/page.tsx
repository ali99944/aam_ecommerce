"use client"

import { useState } from "react"
import {
  Zap,
  Wrench,
  Truck,
  Building,

} from "lucide-react"
import Navbar from "@/components/header"
import Footer from "@/components/custom/footer"
import Button from "@/components/ui/button"

export default function CategoriesPage() {
  const [, setHoveredCategory] = useState<number | null>(null)

  const mainCategories = [
    {
      id: 1,
      name: "الأدوات الكهربائية",
      description: "مثاقب، مناشير، وجميع الأدوات الكهربائية المتطورة",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      productCount: 450,
      subcategories: ["مثاقب كهربائية", "مناشير", "صنفرة", "أدوات قياس", "كابلات وأسلاك"],
      bgColor: "from-blue-500 to-blue-700",
    },
    {
      id: 2,
      name: "أدوات السباكة",
      description: "مواسير، تركيبات، ومضخات المياه",
      icon: Wrench,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      productCount: 320,
      subcategories: ["مواسير", "تركيبات", "مضخات", "صمامات", "عدد سباكة"],
      bgColor: "from-teal-500 to-teal-700",
    },
    {
      id: 3,
      name: "مواد البناء",
      description: "أسمنت، طوب، حديد، وجميع مواد البناء الأساسية",
      icon: Building,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
      productCount: 280,
      subcategories: ["أسمنت", "طوب", "حديد تسليح", "رمل وحصى", "بلاط وسيراميك"],
      bgColor: "from-orange-500 to-red-600",
    },
    {
      id: 4,
      name: "الخرسانة الجاهزة",
      description: "خرسانة جاهزة بمواصفات عالية للمشاريع الكبيرة",
      icon: Truck,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      productCount: 85,
      subcategories: ["خرسانة عادية", "خرسانة مسلحة", "خرسانة خاصة", "إضافات خرسانة"],
      bgColor: "from-gray-600 to-gray-800",
    },

    {
      id: 5,
      name: "أدوات الميكانيك",
      description: "أدوات لصيانة السيارات والآلات",
      icon: Wrench,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      productCount: 150,
      subcategories: ["أدوات ميكانيكية", "أدوات لصيانة السيارات", "أدوات لصيانة الآلات"],
      bgColor: "from-teal-500 to-teal-700",
    },
    {
      id: 6,
      name: "أدوات الكهرباء",
      description: "أدوات لصيانة الكهرباء والكهربائية",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      productCount: 120,
      subcategories: ["أدوات كهربائية", "أدوات لصيانة الكهرباء", "أدوات لصيانة الكهربائية"],
      bgColor: "from-blue-500 to-blue-700",
    },
    {
      id: 7,
      name: "أدوات النجارة",
      description: "أدوات لصناعة الأثاث والنجارة",
      icon: Wrench,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      productCount: 100,
      subcategories: ["أدوات نجارة", "أدوات لصناعة الأثاث", "أدوات لصيانة النجارة"],
      bgColor: "from-teal-500 to-teal-700",
    },
    {
      id: 8,
      name: "أدوات الزراعة",
      description: "أدوات لزراعة النباتات والبساتين",
      icon: Truck,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      productCount: 80,
      subcategories: ["أدوات زراعية", "أدوات لزراعة النباتات", "أدوات لصيانة البساتين"],
      bgColor: "from-gray-600 to-gray-800",
    },
  ]


  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">فئات المنتجات</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            تصفح مجموعتنا الواسعة من الأدوات الكهربائية ومعدات السباكة ومواد البناء والخرسانة
          </p>
        </div>

        {/* Main Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {mainCategories.map((category) => (
            <div
              key={category.id}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br bg-gray-900`}></div>
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>

              <div className="relative p-4 h-80 flex flex-col justify-end text-white">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  {/* <p className="text-white/90 mb-4">{category.description}</p> */}
                  <p className="text-sm text-white/80">{category.productCount} منتج</p>
                </div>

                
              </div>
            </div>
          ))}
        </div>



        {/* Stats Section */}
        <div className="bg-primary rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-6">إحصائيات متجرنا</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">1,500+</div>
              <div className="text-white/90">منتج متاح</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-white/90">علامة تجارية</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-white/90">عميل راضٍ</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/90">خدمة العملاء</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 py-12 bg-gray-900 rounded-xl">
          <h2 className="text-2xl font-bold text-white/80 mb-4">لم تجد ما تبحث عنه؟</h2>
          <p className="text-white/70 mb-6">تواصل معنا وسنساعدك في العثور على المنتج المناسب</p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="sm">
              تواصل معنا
            </Button>
            <Button variant="secondary" size="sm">
              طلب عرض سعر
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
