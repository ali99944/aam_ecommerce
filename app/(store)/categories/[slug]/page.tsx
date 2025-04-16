"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,

} from "@/components/ui/breadcrumb"
import { useGetQuery } from "@/src/providers/hooks/queries-actions"
import Category, { SubCategory } from "@/src/types/category"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { data: category, isLoading, error } = useGetQuery<Category>({
    url: `categories/${params.slug}`,
    key: ["category", params.slug],
  })

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

  if (error || !category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">القسم غير موجود</h1>
            <p className="mb-6">عذراً، لم نتمكن من العثور على القسم المطلوب.</p>
            <Button>
              <Link href="/categories">تصفح الأقسام</Link>
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
                {category.total_sub_categories} أقسام فرعية
              </span>
            </div>
          </div>

          {/* Category Banner */}
          <div className="relative h-64 md:h-80 rounded-sm overflow-hidden mb-10">
            <Image 
              src={category.cover_image || "/placeholder.svg?height=600&width=1200"} 
              alt={category.name} 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="text-white p-8 max-w-lg">
                <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
                <p className="mb-6 text-white/90">{category.description}</p>
                <Button>
                  <Link href={`/products?category=${category.id}`}>تصفح جميع المنتجات</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Subcategories */}
          {category.sub_categories && category.sub_categories.length > 0 && (
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
                  الأقسام الفرعية
                </h2>
                <Button variant="outline" className="flex items-center gap-1">
                  <Link href={`/category/${category.id}/subcategories`}>
                    عرض الكل
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {category.sub_categories.map((subcategory: SubCategory) => (
                  <Link
                    key={subcategory.id}
                    href={`/category/${category.id}/${subcategory.id}`}
                    className="bg-white rounded-sm shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-40">
                      <Image
                        src={subcategory.cover_image || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(subcategory.name)}`}
                        alt={subcategory.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h3 className="font-bold text-base mb-1">{subcategory.name}</h3>
                        <span className="text-xs">{subcategory.total_products} منتج</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="bg-[#00998F] rounded-sm shadow-sm p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">تصفح جميع منتجات {category.name}</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              اكتشف مجموعتنا الواسعة من {category.name} عالية الجودة بأسعار تنافسية
            </p>
            <Button variant="secondary" size="lg">
              <Link href={`/products?category=${category.id}`}>
                عرض جميع المنتجات
              </Link>
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
