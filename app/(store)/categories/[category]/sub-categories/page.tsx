"use client"

import { useState } from "react"
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import Breadcrumb from "@/components/ui/breadcrumb"
import ProductCard from "@/components/custom/product-card"
import Select from "@/components/ui/select"

export default function CategoryDetailsPage() {
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  // Mock category data - this would come from route params in real app
  const category = {
    id: 1,
    name: "الأدوات الكهربائية",
    description: "مجموعة شاملة من الأدوات الكهربائية عالية الجودة للمحترفين والهواة",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=400&fit=crop",
    productCount: 450,
  }

  const subcategories = [
    {
      id: 1,
      name: "مثاقب كهربائية",
      productCount: 85,
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "مناشير كهربائية",
      productCount: 67,
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      name: "أدوات الصنفرة",
      productCount: 45,
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200&h=200&fit=crop",
    },
    {
      id: 4,
      name: "أدوات القياس",
      productCount: 92,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&h=200&fit=crop",
    },
    {
      id: 5,
      name: "كابلات وأسلاك",
      productCount: 78,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop",
    },
    {
      id: 6,
      name: "أدوات اللحام",
      productCount: 56,
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=200&fit=crop",
    },
  ]

  const products = [
    {
      id: 1,
      name: "مثقاب كهربائي بوش 18 فولت",
      category: "مثاقب كهربائية",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop",
      price: 450.0,
      originalPrice: 550.0,
      discount: 18,
      badge: "خصم 18%",
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
      originalPrice: 800.0,
      discount: 15,
      badge: "خصم 15%",
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
      originalPrice: 380.0,
      discount: 16,
      badge: "خصم 16%",
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
      badge: "جديد",
      rating: 4.9,
      reviewCount: 34,
      brand: "هيلتي",
    },
    {
      id: 5,
      name: "كابل كهربائي 2.5 مم - 100 متر",
      category: "كابلات وأسلاك",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop",
      price: 180.0,
      originalPrice: 220.0,
      discount: 18,
      badge: "خصم 18%",
      rating: 4.3,
      reviewCount: 123,
      brand: "الكابل السعودي",
    },
    {
      id: 6,
      name: "ماكينة لحام إنفرتر 200 أمبير",
      category: "أدوات اللحام",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop",
      price: 1250.0,
      originalPrice: 1450.0,
      discount: 14,
      badge: "خصم 14%",
      rating: 4.6,
      reviewCount: 78,
      brand: "لينكولن",
    },
  ]

  const sortOptions = [
    { value: "popular", label: "الأكثر شعبية" },
    { value: "price-low", label: "السعر: من الأقل للأعلى" },
    { value: "price-high", label: "السعر: من الأعلى للأقل" },
    { value: "newest", label: "الأحدث" },
    { value: "rating", label: "الأعلى تقييماً" },
  ]

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "الفئات", href: "/categories" },
            { label: category.name, href: "#" },
          ]}
          variant="light"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="relative overflow-hidden rounded-xl mb-8">
          <div className="absolute inset-0 bg-gray-900"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${category.image})` }}
          ></div>
          <div className="relative px-4 py-12 text-white">
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            <p className="text-white/90 mb-4 max-w-2xl">{category.description}</p>
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">الفئات الفرعية</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subcategories.map((subcat) => (
              <div
                key={subcat.id}
                style={{
                  backgroundImage: `url(${subcat.image || "/placeholder.svg"})`
                }}
                className="bg-white relative rounded-xl p-4 h-32 overflow-hidden text-center border border-gray-100 transition-shadow cursor-pointer group"
              >

                <div className="absolute inset-0 bg-gray-900/60">
                </div>
                <div className="absolute top-0 right-0 flex flex-col justify-end items-start h-full p-2">
                  <h3 className="font-medium text-white text-md">{subcat.name}</h3>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              icon={SlidersHorizontal}
            >
              فلترة
            </Button>
            <span className="text-gray-600">{products.length} منتج</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e)}
                options={sortOptions}
                className="bg-white !w-60"
              />
              <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showRating={true}
              onAddToCart={(product) => console.log("Add to cart:", product)}
              onToggleWishlist={(product) => console.log("Toggle wishlist:", product)}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center items-center mt-12">
          <Button variant="secondary" size="sm">
            عرض المزيد من المنتجات
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
