'use client'

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Truck,
  Wrench,
  Zap,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  PenToolIcon as Tool,
  ShieldCheck,
  Hammer,
  Lightbulb,
  Shovel,
} from "lucide-react"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "مكيف سبليت انفرتر",
    category: "air-conditioners",
    price: 1999,
    oldPrice: 2499,
    rating: 4.8,
    reviewCount: 124,
    image: "https://img.freepik.com/free-vector/realistic-air-conditioner-illustration_23-2149128076.jpg",
    isNew: true,
    isBestSeller: true,
    isDiscounted: true,
    discount: 20,
  },
  {
    id: 2,
    name: "مكيف شباك",
    category: "air-conditioners",
    price: 899,
    oldPrice: 1099,
    rating: 4.5,
    reviewCount: 86,
    image: "https://img.freepik.com/free-vector/realistic-conditioner-illustration_23-2149128075.jpg",
    isNew: false,
    isBestSeller: false,
    isDiscounted: true,
    discount: 18,
  },
  {
    id: 3,
    name: "غسالة أوتوماتيك",
    category: "home-appliances",
    price: 1599,
    oldPrice: 1899,
    rating: 4.7,
    reviewCount: 103,
    image: "https://img.freepik.com/free-vector/realistic-washing-machine-with-open-door_107791-1525.jpg",
    isNew: true,
    isBestSeller: false,
    isDiscounted: true,
    discount: 15,
  },
  {
    id: 4,
    name: "ثلاجة مزدوجة الأبواب",
    category: "home-appliances",
    price: 2899,
    oldPrice: 3299,
    rating: 4.9,
    reviewCount: 157,
    image: "https://img.freepik.com/free-vector/realistic-refrigerator-with-closed-door_107791-1517.jpg",
    isNew: false,
    isBestSeller: true,
    isDiscounted: true,
    discount: 12,
  },
  {
    id: 5,
    name: "فلتر مكيف",
    category: "spare-parts",
    price: 99,
    oldPrice: 129,
    rating: 4.6,
    reviewCount: 42,
    image: "https://img.freepik.com/free-vector/realistic-air-conditioner-filter-illustration_23-2149128077.jpg",
    isNew: false,
    isBestSeller: true,
    isDiscounted: true,
    discount: 23,
  },
  {
    id: 6,
    name: "قطع غيار غسالة",
    category: "spare-parts",
    price: 149,
    oldPrice: 199,
    rating: 4.4,
    reviewCount: 38,
    image: "https://img.freepik.com/free-vector/realistic-washing-machine-parts-illustration_23-2149128078.jpg",
    isNew: false,
    isBestSeller: false,
    isDiscounted: true,
    discount: 25,
  },
  {
    id: 7,
    name: "مكيف متنقل",
    category: "air-conditioners",
    price: 1299,
    oldPrice: 1499,
    rating: 4.3,
    reviewCount: 67,
    image: "https://img.freepik.com/free-vector/realistic-portable-air-conditioner-illustration_23-2149128079.jpg",
    isNew: true,
    isBestSeller: false,
    isDiscounted: true,
    discount: 13,
  },
  {
    id: 8,
    name: "مكنسة كهربائية",
    category: "home-appliances",
    price: 399,
    oldPrice: 499,
    rating: 4.7,
    reviewCount: 91,
    image: "https://img.freepik.com/free-vector/realistic-vacuum-cleaner-illustration_23-2149128080.jpg",
    isNew: false,
    isBestSeller: true,
    isDiscounted: true,
    discount: 20,
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section - Creative Diagonal Design */}
        <section className="relative overflow-hidden bg-[#00998F] text-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
            <div className="absolute right-20 top-10 w-20 h-20 rounded-full bg-white opacity-5"></div>
            <div className="absolute left-1/3 bottom-10 w-32 h-32 rounded-full bg-white opacity-5"></div>
            <div className="absolute right-1/4 bottom-1/4 w-24 h-24 rounded-full bg-white opacity-10"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center py-12">
              <div className="md:w-1/2 text-right">
                <h1 className="text-5xl font-bold mb-3">محلات علي ابو مسعود</h1>
                <div className="h-1.5 w-24 bg-white mb-5 mr-1"></div>
                <p className="text-2xl mb-4">كل ما تحتاجه لمشروعك في مكان واحد</p>
                <p className="mb-6 text-lg opacity-90">مواد بناء | عدد كهربائية | مواد زراعية</p>
                <div className="flex gap-4 justify-start">
                  <Button variant='secondary'>تصفح المنتجات</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    تواصل معنا
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="relative h-72 w-full">
                  <div className="absolute inset-0 bg-[#D2EAE8] rounded-sm transform rotate-3"></div>
                  <Image
                    src="https://lh5.googleusercontent.com/p/AF1QipNP1t52p5--CD6tHlCZ0SgTy2liHyGQjyNQuNKJ=w408-h530-k-no"
                    alt="محلات علي ابو مسعود"
                    fill
                    className="object-cover rounded-sm transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Quick Access Categories - Compact, Justified, Centered */}
        <section className="py-8 bg-[#D2EAE8]">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "مواد بناء", icon: <Hammer size={20} /> },
                { name: "عدد كهربائية", icon: <Tool size={20} /> },
                { name: "مواد زراعية", icon: <Shovel size={20} /> },
                { name: "إضاءة", icon: <Lightbulb size={20} /> },
                { name: "سباكة", icon: <Wrench size={20} /> },
                { name: "توصيل", icon: <Truck size={20} /> },
              ].map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category.name}`}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-sm text-[#00998F] text-base hover:bg-[#00998F] hover:text-white transition-colors"
                >
                  {category.icon}
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Carousel */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-right flex items-center gap-2">
                <span className="h-6 w-1 bg-[#00998F] inline-block"></span>
                منتجات مميزة
              </h2>
              <Link href="/products" className="text-[#00998F] text-base flex items-center">
                عرض الكل <ArrowLeft className="h-4 w-4 mr-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        />
                    ))}
                  </div>
          </div>
        </section>

        {/* Creative Banner Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-[#00998F] opacity-90"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center p-4">
                <div className="md:w-2/3 text-white text-right">
                  <h2 className="text-2xl font-bold mb-3">خصم 15% على جميع العدد الكهربائية</h2>
                  <p className="text-lg mb-4">عروض حصرية لفترة محدودة على أفضل الماركات العالمية</p>
                  <Button variant="secondary">تسوق الآن</Button>
                </div>
                <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
                  <div className="relative h-32 w-32 md:h-40 md:w-40">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="عروض خاصة"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Creative Icons */}
        <section className="py-10 bg-[#D2EAE8]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-right text-[#00998F] flex items-center gap-2">
              <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
              لماذا تختارنا
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10" />}
                title="جودة عالية"
                description="منتجات أصلية بضمان"
              />
              <FeatureCard
                icon={<Truck className="h-10 w-10" />}
                title="توصيل سريع"
                description="لجميع مناطق المملكة"
              />
              <FeatureCard icon={<Wrench className="h-10 w-10" />} title="دعم فني" description="استشارات مجانية" />
              <FeatureCard
                icon={<Zap className="h-10 w-10" />}
                title="أسعار تنافسية"
                description="أفضل الأسعار في السوق"
              />
            </div>
          </div>
        </section>

        {/* Contact Info - Creative Design */}
        <section className="py-10 bg-[#00998F] text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white/10">
                <Phone className="h-8 w-8 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">رقم الهاتف</h3>
                  <p dir="ltr" className="text-base">
                    +962 79 123 4567
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/10">
                <MapPin className="h-8 w-8 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">العنوان</h3>
                  <p className="text-base">عمان، الأردن - شارع الملك عبدالله الثاني</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/10">
                <Clock className="h-8 w-8 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">ساعات العمل</h3>
                  <p className="text-base">السبت - الخميس: 8 صباحاً - 8 مساءً</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white p-4 rounded-sm flex flex-col items-center text-center">
      <div className="text-[#00998F] mb-3">{icon}</div>
      <h3 className="font-bold text-lg text-[#00998F] mb-2">{title}</h3>
      <p className="text-base">{description}</p>
    </div>
  )
}

