"use client"

import { Heart } from 'lucide-react'
import Button from "@/components/ui/button"
import Breadcrumb from "@/components/ui/breadcrumb"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import ProductCard from "@/components/custom/product-card"
import { ProductCardSkeleton } from '@/components/ui/skeletons'
import { useGetQuery } from '@/src/hooks/queries-actions'
import { Product } from '@/src/types'
import Carousel from '@/components/ui/carousel'

export default function FavoritesPage() {

  const favorites = [
    {
      id: 1,
      name: "آيفون 15 برو ماكس - 256 جيجا",
      category: "هواتف ذكية",
      price: 4999,
      originalPrice: 5499,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      inStock: true,
      addedDate: "منذ 3 أيام"
    },
    {
      id: 2,
      name: "ماك بوك برو 14 إنش M3",
      category: "أجهزة كمبيوتر",
      price: 8999,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
      inStock: true,
      addedDate: "منذ أسبوع"
    },
    {
      id: 3,
      name: "سماعات AirPods Pro الجيل الثاني",
      category: "سماعات",
      price: 899,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
      inStock: false,
      addedDate: "منذ يومين"
    },
    {
      id: 4,
      name: "ساعة آبل الجيل التاسع",
      category: "ساعات ذكية",
      price: 1599,
      originalPrice: 1799,
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
      inStock: true,
      addedDate: "منذ 5 أيام"
    }
  ]

  const { data: products, isFetching: is_products_loading } = useGetQuery<Product[]>({
    url: 'products/listings/recommended',
    key: ['products', 'recommended']
  })

  if (is_products_loading) return <ProductCardSkeleton />

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "المفضلة" }
          ]}
          className="mb-6"
        />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-2">قائمة المفضلة</h1>
            <p className="text-gray-600">{favorites.length} منتج في قائمة المفضلة</p>
          </div>
          {/* <Heart className="w-6 h-6 text-red-500" /> */}
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-primary mb-2">قائمة المفضلة فارغة</h2>
            <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد</p>
            <div className="flex justify-center">
              <Button variant="primary" size="sm">
                <Link href="/">تصفح المنتجات</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {favorites.length > 0 && (
          <div className="mt-12">
            <div className=" rounded-lg p-4">
              <div>
                          <Carousel
                            slidesPerView={{
                              small_mobile: 2,
                              mobile: 2,
                              tablet: 3,
                              desktop: 4,
                            }}
                            spaceBetween={18}
                            loop={false}
                            title="قد يعجبك أيضاً"
                          >
                            {(products ?? [])?.map((product) => (
                              <ProductCard key={product.id} product={product} />
                            ))}
                          </Carousel>
                        </div>
            </div>
          </div>
        )}
      </div>
    </div>
      <Footer />
    </>
  )
}
