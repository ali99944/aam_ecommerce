'use client'

import { ChevronLeft } from 'lucide-react'
import Button from './button'

export default function ShopByCategories() {
  const categories = [
    {
      name: "سماعات أذن",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      productCount: 150,
    },
    {
      name: "أجهزة لابتوب",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop",
      productCount: 150,
    },
    {
      name: "سماعات",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      productCount: 150,
    },
    {
      name: "ساعات رقمية",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop",
      productCount: 150,
    },
    {
      name: "موبايلات",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop",
      productCount: 150,
    },
    {
      name: "شاشات كمبيوتر",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&h=150&fit=crop",
      productCount: 150,
    },
    {
      name: "سماعات أذن",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      productCount: 150,
    },
  ]

  return (
    <section className="py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg md:text-xl font-bold text-[var(--primary)]">تسوق حسب الفئات</h2>
          <Button variant="secondary" size="sm">
            عرض الكل
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-3 rounded-full overflow-hidden bg-white  transition-shadow">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-[var(--primary)] text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.productCount} منتج</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
