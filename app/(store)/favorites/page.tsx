"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Trash2, Share2 } from 'lucide-react'
import Button from "@/components/ui/button"
import Breadcrumb from "@/components/ui/breadcrumb"
import Navbar from "@/components/header"
import Footer from "@/components/custom/footer"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
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
  ])

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id))
  }

  const addToCart = (item: any) => {
    // Add to cart logic
    console.log('Added to cart:', item)
  }

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
            <h1 className="text-2xl font-bold text-[var(--primary)] mb-2">قائمة المفضلة</h1>
            <p className="text-gray-600">{favorites.length} منتج في قائمة المفضلة</p>
          </div>
          <Heart className="w-6 h-6 text-red-500" />
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[var(--primary)] mb-2">قائمة المفضلة فارغة</h2>
            <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد</p>
            <Button variant="primary" size="sm">
              <a href="/">تصفح المنتجات</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                        غير متوفر
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                  <h3 className="font-semibold text-[var(--primary)] mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-red-500">
                      ريال {item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ريال {item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mb-4">أُضيف {item.addedDate}</p>

                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      disabled={!item.inStock}
                      onClick={() => addToCart(item)}
                    >
                      <ShoppingCart className="w-4 h-4 ml-2" />
                      {item.inStock ? 'أضف للسلة' : 'غير متوفر'}
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {favorites.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-xl font-bold text-[var(--primary)] mb-4">قد يعجبك أيضاً</h2>
              <p className="text-gray-600 mb-6">منتجات مشابهة لما في قائمة المفضلة</p>
              <Button variant="primary" size="sm">
                عرض التوصيات
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
      <Footer />
    </>
  )
}
