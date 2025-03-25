"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Search } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Breadcrumb } from "@/components/ui/breadcrumb"

// Mock category data with subcategories
const getCategoryWithSubcategories = (slug: string) => {
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
        description: "مثاقب كهربائية احترافية للاستخدامات المنزلية والمهنية",
        image: "/placeholder.svg?height=300&width=300&text=مثاقب",
        products_count: 25,
        featured: true,
      },
      {
        id: 22,
        name: "مفكات كهربائية",
        slug: "screwdrivers",
        description: "مفكات كهربائية بمختلف الأحجام والقدرات",
        image: "/placeholder.svg?height=300&width=300&text=مفكات",
        products_count: 18,
        featured: true,
      },
      {
        id: 23,
        name: "مناشير كهربائية",
        slug: "saws",
        description: "مناشير كهربائية دائرية وترددية وشريطية",
        image: "/placeholder.svg?height=300&width=300&text=مناشير",
        products_count: 15,
        featured: false,
      },
      {
        id: 24,
        name: "جلاخات",
        slug: "grinders",
        description: "جلاخات زاوية وجلاخات مستقيمة بمختلف الأحجام",
        image: "/placeholder.svg?height=300&width=300&text=جلاخات",
        products_count: 12,
        featured: false,
      },
      {
        id: 25,
        name: "مطارق كهربائية",
        slug: "hammers",
        description: "مطارق كهربائية دوارة وهدم للأعمال الشاقة",
        image: "/placeholder.svg?height=300&width=300&text=مطارق",
        products_count: 10,
        featured: true,
      },
      {
        id: 26,
        name: "ملحقات العدد الكهربائية",
        slug: "accessories",
        description: "ملحقات متنوعة للعدد الكهربائية من لقم وأقراص وفرش",
        image: "/placeholder.svg?height=300&width=300&text=ملحقات",
        products_count: 30,
        featured: false,
      },
      {
        id: 27,
        name: "مكابس كهربائية",
        slug: "presses",
        description: "مكابس كهربائية للأعمال الدقيقة",
        image: "/placeholder.svg?height=300&width=300&text=مكابس",
        products_count: 8,
        featured: false,
      },
      {
        id: 28,
        name: "مكاوي لحام",
        slug: "soldering-irons",
        description: "مكاوي لحام كهربائية للأعمال الإلكترونية",
        image: "/placeholder.svg?height=300&width=300&text=مكاوي لحام",
        products_count: 15,
        featured: false,
      },
      {
        id: 29,
        name: "مسدسات حرارية",
        slug: "heat-guns",
        description: "مسدسات حرارية متعددة الاستخدامات",
        image: "/placeholder.svg?height=300&width=300&text=مسدسات حرارية",
        products_count: 7,
        featured: false,
      },
      {
        id: 30,
        name: "روترات",
        slug: "routers",
        description: "روترات كهربائية للأعمال الخشبية",
        image: "/placeholder.svg?height=300&width=300&text=روترات",
        products_count: 9,
        featured: false,
      },
      {
        id: 31,
        name: "مكانس كهربائية صناعية",
        slug: "industrial-vacuums",
        description: "مكانس كهربائية صناعية للورش والمصانع",
        image: "/placeholder.svg?height=300&width=300&text=مكانس",
        products_count: 12,
        featured: false,
      },
      {
        id: 32,
        name: "ماكينات تلميع",
        slug: "polishers",
        description: "ماكينات تلميع للأسطح المختلفة",
        image: "/placeholder.svg?height=300&width=300&text=ماكينات تلميع",
        products_count: 8,
        featured: false,
      },
    ],
  }
}

export default function SubcategoriesPage({ params }: { params: { slug: string } }) {
  const [category, setCategory] = useState<any>(null)
  const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const categoryData = getCategoryWithSubcategories(params.slug)
      setCategory(categoryData)
      setFilteredSubcategories(categoryData.subcategories)
      setIsLoading(false)
    }, 1000)
  }, [params.slug])

  useEffect(() => {
    if (!category) return

    if (searchTerm) {
      setFilteredSubcategories(
        category.subcategories.filter(
          (subcategory: any) =>
            subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subcategory.description.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    } else {
      setFilteredSubcategories(category.subcategories)
    }
  }, [category, searchTerm])

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

              <div className="h-10 bg-gray-200 rounded-sm mb-8"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-sm"></div>
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
              { label: category.name, href: `/category/${category.slug}` },
              { label: "الأقسام الفرعية" },
            ]}
            className="mb-6"
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">الأقسام الفرعية لـ {category.name}</h1>
              <p className="text-gray-600">تصفح جميع الأقسام الفرعية المتوفرة</p>
            </div>
            <Button icon={ChevronLeft} variant="secondary">
              العودة للقسم الرئيسي
            </Button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <Input
              placeholder="ابحث في الأقسام الفرعية..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              iconPosition="right"
              className="max-w-md"
            />
          </div>

          {/* Featured Subcategories */}
          {!searchTerm && (
            <section className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
                  الأقسام الفرعية المميزة
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.subcategories
                  .filter((subcategory: any) => subcategory.featured)
                  .map((subcategory: any) => (
                    <Link
                      key={subcategory.id}
                      href={`/category/${category.slug}/${subcategory.slug}`}
                      className="relative h-64 rounded-sm overflow-hidden group"
                    >
                      <Image
                        src={subcategory.image || "/placeholder.svg"}
                        alt={subcategory.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">{subcategory.name}</h3>
                        <p className="mb-3 opacity-90 line-clamp-2">{subcategory.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm bg-white/20 px-3 py-1 rounded-sm">
                            {subcategory.products_count} منتج
                          </span>
                          <span className="text-sm underline">تصفح القسم</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          )}

          {/* All Subcategories */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
                {searchTerm ? "نتائج البحث" : "جميع الأقسام الفرعية"}
              </h2>
              {searchTerm && (
                <div className="text-sm text-gray-600">تم العثور على {filteredSubcategories.length} قسم</div>
              )}
            </div>

            {filteredSubcategories.length === 0 ? (
              <div className="bg-white rounded-sm border border-gray-200 p-8 text-center">
                <h3 className="text-lg font-bold mb-2">لا توجد أقسام فرعية</h3>
                <p className="text-gray-600 mb-4">
                  لم نتمكن من العثور على أقسام فرعية تطابق بحثك. يرجى تجربة كلمات بحث أخرى.
                </p>
                <Button onClick={() => setSearchTerm("")}>عرض جميع الأقسام</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredSubcategories.map((subcategory: any) => (
                  <Link
                    key={subcategory.id}
                    href={`/category/${category.slug}/${subcategory.slug}`}
                    className="bg-white rounded-sm border border-gray-200 overflow-hidden group transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={subcategory.image || "/placeholder.svg"}
                        alt={subcategory.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {subcategory.featured && !searchTerm && (
                        <div className="absolute top-2 right-2 bg-[#00998F] text-white text-xs px-2 py-1 rounded-sm">
                          مميز
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-[#00998F] transition-colors">
                        {subcategory.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{subcategory.description}</p>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{subcategory.products_count} منتج</span>
                        <span className="text-[#00998F] text-sm font-medium">تصفح القسم</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

