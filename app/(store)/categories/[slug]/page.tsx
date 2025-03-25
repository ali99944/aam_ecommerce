"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"

// Mock category data
const getCategoryData = (slug: string) => {
  // This would normally be fetched from an API
  return {
    id: 2,
    name: "العدد الكهربائية",
    slug: "electrical-tools",
    description: "مجموعة متنوعة من العدد الكهربائية عالية الجودة من أشهر الماركات العالمية",
    image: "/placeholder.svg?height=600&width=1200&text=العدد الكهربائية",
    subcategories: [
      {
        id: 21,
        name: "مثاقب كهربائية",
        slug: "drills",
        image: "/placeholder.svg?height=300&width=300&text=مثاقب",
        products_count: 25,
      },
      {
        id: 22,
        name: "مفكات كهربائية",
        slug: "screwdrivers",
        image: "/placeholder.svg?height=300&width=300&text=مفكات",
        products_count: 18,
      },
      {
        id: 23,
        name: "مناشير كهربائية",
        slug: "saws",
        image: "/placeholder.svg?height=300&width=300&text=مناشير",
        products_count: 15,
      },
      {
        id: 24,
        name: "جلاخات",
        slug: "grinders",
        image: "/placeholder.svg?height=300&width=300&text=جلاخات",
        products_count: 12,
      },
      {
        id: 25,
        name: "مطارق كهربائية",
        slug: "hammers",
        image: "/placeholder.svg?height=300&width=300&text=مطارق",
        products_count: 10,
      },
      {
        id: 26,
        name: "ملحقات العدد الكهربائية",
        slug: "accessories",
        image: "/placeholder.svg?height=300&width=300&text=ملحقات",
        products_count: 30,
      },
    ],
    brands: [
      { id: 1, name: "بوش", slug: "bosch", products_count: 35 },
      { id: 2, name: "ماكيتا", slug: "makita", products_count: 28 },
      { id: 3, name: "ديوالت", slug: "dewalt", products_count: 22 },
      { id: 4, name: "ميلواكي", slug: "milwaukee", products_count: 15 },
      { id: 5, name: "هيتاشي", slug: "hitachi", products_count: 10 },
    ],
    featured_products: [
      {
        id: 101,
        name: "مثقاب كهربائي احترافي بوش GSB 13 RE",
        price: 120.0,
        discount_price: 102.0,
        image: "/placeholder.svg?height=300&width=300",
        category: "مثاقب كهربائية",
        rating: 4.5,
      },
      {
        id: 102,
        name: "مفك كهربائي بوش GSR 12V",
        price: 95.0,
        discount_price: null,
        image: "/placeholder.svg?height=300&width=300",
        category: "مفكات كهربائية",
        rating: 4.2,
      },
      {
        id: 103,
        name: "منشار دائري بوش GKS 190",
        price: 150.0,
        discount_price: null,
        image: "/placeholder.svg?height=300&width=300",
        category: "مناشير كهربائية",
        rating: 4.7,
      },
    ],
    total_products: 110,
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, setCategory] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategory(getCategoryData(params.slug))
      setIsLoading(false)
    }, 1000)
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded-sm w-1/3 mb-6"></div>
              <div className="h-8 bg-gray-200 rounded-sm w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-sm w-3/4 mb-8"></div>

              <div className="h-64 bg-gray-200 rounded-sm mb-8"></div>

              <div className="h-6 bg-gray-200 rounded-sm w-1/4 mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-40 bg-gray-200 rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">القسم غير موجود</h1>
            <p className="mb-6">عذراً، لم نتمكن من العثور على القسم المطلوب.</p>
            <Button as={Link} href="/categories">
              تصفح الأقسام
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "الأقسام", href: "/categories" },
              { label: category.name },
            ]}
            className="mb-6"
          />

          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-gray-600 max-w-3xl mb-6">{category.description}</p>

            <div className="flex flex-wrap gap-3">
              <span className="text-sm bg-[#D2EAE8] text-[#00998F] px-3 py-1 rounded-sm">
                {category.total_products} منتج
              </span>
              <span className="text-sm bg-[#D2EAE8] text-[#00998F] px-3 py-1 rounded-sm">
                {category.subcategories.length} أقسام فرعية
              </span>
              <span className="text-sm bg-[#D2EAE8] text-[#00998F] px-3 py-1 rounded-sm">
                {category.brands.length} ماركات
              </span>
            </div>
          </div>

          {/* Category Banner */}
          <div className="relative h-64 md:h-80 rounded-sm overflow-hidden mb-10">
            <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="text-white p-8 max-w-lg">
                <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
                <p className="mb-6 text-white/90">{category.description}</p>
                <Button as={Link} href={`/products?category=${category.slug}`}>
                  تصفح جميع المنتجات
                </Button>
              </div>
            </div>
          </div>

          {/* Subcategories */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="h-6 w-1 bg-[#00998F] inline-block"></span>
                الأقسام الفرعية
              </h2>
              <Button
                variant="secondary"
                icon={ChevronLeft}
              >
                عرض الكل
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {category.subcategories.map((subcategory: any) => (
                <Link
                  key={subcategory.id}
                  href={`/category/${category.slug}/${subcategory.slug}`}
                  className="bg-white rounded-sm border border-gray-200 overflow-hidden group  transition-shadow"
                >
                  <div className="relative h-40">
                    <Image
                      src={subcategory.image || "/placeholder.svg"}
                      alt={subcategory.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-bold text-base mb-1">{subcategory.name}</h3>
                      <span className="text-xs">{subcategory.products_count} منتج</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="h-6 w-1 bg-[#00998F] inline-block"></span>
                منتجات مميزة
              </h2>
              <Button
                variant="secondary"
                icon={ChevronLeft}
              >
                عرض الكل
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.featured_products.map((product: any) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="bg-white rounded-sm border border-gray-200 overflow-hidden group  transition-shadow"
                >
                  <div className="relative h-48 md:h-56">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />

                    {product.discount_price && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
                        {Math.round((1 - product.discount_price / product.price) * 100)}% خصم
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="text-sm text-gray-600 mb-1">{product.category}</div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#00998F] transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex justify-between items-center">
                      <div>
                        {product.discount_price ? (
                          <div className="flex flex-col">
                            <span className="font-bold text-[#00998F]">{product.discount_price.toFixed(2)} دينار</span>
                            <span className="text-sm text-gray-500 line-through">{product.price.toFixed(2)} دينار</span>
                          </div>
                        ) : (
                          <span className="font-bold text-[#00998F]">{product.price.toFixed(2)} دينار</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Brands */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="h-6 w-1 bg-[#00998F] inline-block"></span>
                الماركات
              </h2>
            </div>

            <div className="bg-white rounded-sm border border-gray-200 p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {category.brands.map((brand: any) => (
                  <Link
                    key={brand.id}
                    href={`/products?category=${category.slug}&brand=${brand.slug}`}
                    className="flex flex-col items-center p-4 bg-[#D3EBE8] hover:bg-[#D3EBE8]/80 transition-all duration-300 border-gray-200 rounded-sm"
                  >
                    <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Image
                        src={`/placeholder.svg?height=60&width=60&text=${brand.name}`}
                        alt={brand.name}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-base mb-1">{brand.name}</h3>
                    <span className="text-sm text-gray-600">{brand.products_count} منتج</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-[#00998F] rounded-sm border border-gray-200 p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">تصفح جميع منتجات {category.name}</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              اكتشف مجموعتنا الواسعة من {category.name} عالية الجودة من أشهر الماركات العالمية بأسعار تنافسية
            </p>
            <Button as={Link} href={`/products?category=${category.slug}`} variant="secondary" size="lg">
              عرض جميع المنتجات ({category.total_products})
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

