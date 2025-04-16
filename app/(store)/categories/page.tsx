'use client'

import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import BenefitsSection from "@/components/custom/benefits"
import { useGetQuery } from "@/src/providers/hooks/queries-actions"
import { Category } from "@/src/types"
import { WithPagination } from "@/src/types/with-pagination"

export default function CategoriesPage() {
  const { data: categories } = useGetQuery<WithPagination<Category[]>>({
    url: "/categories",
    key: ["categories"], 
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الأقسام" }]} className="mb-6" />

          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">أقسام المتجر</h1>
            <p className="text-gray-600 max-w-3xl">
              تصفح مجموعتنا الواسعة من المنتجات المصنفة في أقسام متخصصة لتسهيل وصولك إلى ما تبحث عنه
            </p>
          </div>

          {/* Featured Categories */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
                الأقسام المميزة
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(categories?.data.filter((category) => category.is_featured) || []).slice(0, 2).map((category) => (
                <div key={category.id} className="relative overflow-hidden rounded-sm group">
                  <div className="relative h-80 w-full">
                    <Image
                      src={category.cover_image || "/placeholder.svg"}
                      alt={category.name || ''}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="mb-4 opacity-90 line-clamp-2">{category.description}</p>
                      <div className="flex gap-4">
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-sm">
                          {category.total_sub_categories} أقسام فرعية
                        </span>
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-sm">{0} منتج</span>
                      </div>
                      <Link href={`/categories/${category.id}`}>
                      <Button className="mt-4">
                        تصفح القسم
                      </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {(categories?.data.filter((category) => category.is_featured) ?? []).slice(2, 5).map((category) => (
                <div key={category.id} className="relative overflow-hidden rounded-sm group">
                  <div className="relative h-60 w-full">
                    <Image
                      src={category.cover_image || "/placeholder.svg"}
                      alt={category.name ??' '}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      <p className="mb-3 opacity-90 text-sm line-clamp-2">{category.description}</p>
                      <Link href={`/categories/${category.id}`}>
                        <Button size="sm">
                          تصفح القسم
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All Categories */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
                جميع الأقسام
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories?.data.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="bg-white rounded-sm border border-gray-200 overflow-hidden group transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={category.cover_image || "/placeholder.svg"}
                      alt={category.name ?? ''}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {category.is_featured && (
                      <div className="absolute top-2 right-2 bg-[#00998F] text-white text-xs px-2 py-1 rounded-sm">
                        مميز
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#00998F] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{category.total_sub_categories} أقسام فرعية</span>
                      <span className="text-[#00998F] font-medium">{0} منتج</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <BenefitsSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}

