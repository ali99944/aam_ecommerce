'use client'

import Button from "../ui/button";

export default function PromotionalBanners() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Phone Banner */}
          <div className="relative bg-gradient-to-r from-pink-200 to-pink-300 rounded p-4 overflow-hidden h-48">
            <div className="relative z-10">
              <p className="text-sm text-gray-600 mb-2">سماعات رقمية</p>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">أفضل صوت نقي</h3>
              <Button variant="primary" size="sm">
                تسوق الآن
              </Button>
            </div>
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=300&fit=crop"
                alt="Phone"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Headphones Banner */}
          <div className="relative bg-gradient-to-r from-blue-100 to-gray-200 rounded p-4 overflow-hidden h-48">
            <div className="relative z-10">
              <p className="text-sm text-gray-600 mb-2">سماعات رقمية</p>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">أفضل صوت نقي</h3>
              <Button variant="primary" size="sm">
                تسوق الآن
              </Button>
            </div>
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
                alt="Headphones"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
