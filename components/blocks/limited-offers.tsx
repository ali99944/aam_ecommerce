"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import SuccessDialog from "../ui/success-dialog"
import Button from "../ui/button"

interface Product {
  id: number
  name: string
  category: string
  image: string
  price: number
  originalPrice?: number
  discount?: number | null
  badge?: string
  rating?: number
  reviewCount?: number
}

export default function LimitedOffers() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 55,
    seconds: 16,
    days: 55,
  })

  const [successDialog, setSuccessDialog] = useState<{
    isOpen: boolean
    productName: string
    productImage: string
  }>({
    isOpen: false,
    productName: "",
    productImage: "",
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const products: Product[] = [
    {
      id: 1,
      name: "ساعة ذكية جديدة من سلسلة 8",
      category: "ساعات",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      discount: 25,
      badge: "خصم 25%",
      rating: 5,
      reviewCount: 4,
    },
    {
      id: 2,
      name: "ساعة ذكية جديدة من سلسلة 8",
      category: "ساعات",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      discount: 25,
      badge: "خصم 25%",
      rating: 5,
      reviewCount: 4,
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
      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-2">عروض لثنين فقط</h2>
            <p className="text-gray-600">تسوق أحدث المنتجات المميزة الجديدة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <div key={product.id} className="bg-white border-2 border-gray-200/80 rounded-xl p-4">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/2">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 lg:h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="lg:w-1/2 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <h3 className="text-xl font-bold text-[var(--primary)] mb-3">{product.name}</h3>

                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < product.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.reviewCount})</span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-red-500">ريال {product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            ريال {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Countdown Timer */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="text-center">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="text-xl font-bold text-[var(--primary)]">
                              {timeLeft.days.toString().padStart(2, "0")}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">يوم</div>
                        </div>
                        <div className="text-center">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="text-xl font-bold text-[var(--primary)]">
                              {timeLeft.hours.toString().padStart(2, "0")}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">ساعة</div>
                        </div>
                        <div className="text-center">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="text-xl font-bold text-[var(--primary)]">
                              {timeLeft.minutes.toString().padStart(2, "0")}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">دقيقة</div>
                        </div>
                        <div className="text-center">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="text-xl font-bold text-[var(--primary)]">
                              {timeLeft.seconds.toString().padStart(2, "0")}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">ثانية</div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleAddToCart(product)}
                    >
                      أضف للسلة
                    </Button>
                  </div>
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
