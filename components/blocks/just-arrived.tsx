"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "../ui/button"
import SuccessDialog from "../ui/success-dialog"
import ProductCard from "../custom/product-card"


interface Product {
  id: number
  name: string
  category: string
  image: string
  price: number
  originalPrice?: number
  discount?: number | null
  badge?: string
}

export default function JustArrived() {
  const [successDialog, setSuccessDialog] = useState<{
    isOpen: boolean
    productName: string
    productImage: string
  }>({
    isOpen: false,
    productName: "",
    productImage: "",
  })

  const products: Product[] = [
    {
      id: 1,
      name: "ساعة ذكية جديدة من سلسلة 8",
      category: "ساعات",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      badge: "جديد",
    },
    {
      id: 2,
      name: "سماعة كبر صوت عالي الدقة",
      category: "سماعات",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      badge: "خصم 25%",
    },
    {
      id: 3,
      name: "سماعات إيربودز 3 سيم أوريجينال",
      category: "سماعات",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      badge: "جديد",
    },
    {
      id: 4,
      name: "سماعة سامسونغ كير بودز فوق الأذن",
      category: "سماعات",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      badge: "خصم 25%",
    },
  ]

  const promoCards = [
    {
      id: 1,
      title: "معالجة أسبوع واحد فقط",
      subtitle: "أسبوع 6 مايو - EXPIRED 6 مايو - EXPIRED",
      description: "4.5 ميجابكسل من الوضوح للتفاصيل الدقيقة",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      bgColor: "from-pink-200 to-pink-300",
    },
    {
      id: 2,
      title: "معالجة أسبوع واحد فقط",
      subtitle: "أسبوع 6 مايو - EXPIRED 6 مايو - EXPIRED",
      description: "4.5 ميجابكسل من الوضوح للتفاصيل الدقيقة",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      bgColor: "from-yellow-200 to-orange-200",
    },
    {
      id: 3,
      title: "معالجة أسبوع واحد فقط",
      subtitle: "أسبوع 6 مايو - EXPIRED 6 مايو - EXPIRED",
      description: "4.5 ميجابكسل من الوضوح للتفاصيل الدقيقة",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      bgColor: "from-green-200 to-teal-200",
    },
  ]

  const handleAddToCart = (product: Product) => {
    setSuccessDialog({
      isOpen: true,
      productName: product.name,
      productImage: product.image,
    })
  }

  const handleCloseDialog = () => {
    setSuccessDialog((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[var(--primary)]">وصل حديثاً</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>

          {/* Promotional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promoCards.map((card) => (
              <div
                key={card.id}
                className={`relative bg-gradient-to-br ${card.bgColor} rounded-2xl p-6 overflow-hidden`}
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{card.subtitle}</p>
                  <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                  <Button variant="primary" size="sm">
                    تسوق الآن
                  </Button>
                </div>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <img src={card.image || "/placeholder.svg"} alt="Product" className="w-20 h-20 object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SuccessDialog
        isOpen={successDialog.isOpen}
        onClose={handleCloseDialog}
        productName={successDialog.productName}
        productImage={successDialog.productImage}
      />
    </>
  )
}
