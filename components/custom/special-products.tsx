"use client"

import { useState } from "react"
import Button from "../ui/button"
import ProductCard from "./product-card"
import SuccessDialog from "../ui/success-dialog"

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

export default function SpecialProductsHero() {
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
      name: "ساعة ذكية جديدة من سلسلة 8",
      category: "ساعات",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      badge: "خصم 25%",
    },
    {
      id: 3,
      name: "سماعة سامسونغ كير بودز فوق الأذن",
      category: "سماعات",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      badge: "جديد",
    },
    {
      id: 4,
      name: "موبايل سامسونغ جالاكسي",
      category: "موبايلات",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      badge: "خصم 25%",
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
      {/* Hero Section */}
      <section className="relative py-16 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gray-900/85"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-right order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">أفضل التخفيضات 2022</h2>
              <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                متجر محلاتنا يوفر لك كل ما تحتاجه من كمبيوترات أو أجهزة ذكية بأفضل التخفيضات على المنتجات. تسوق الآن واستمتع
                بكل التخفيضات على المنتجات
              </p>
              <Button variant="accent" size="sm">
                اكتشف المزيد
              </Button>
            </div>

            {/* Sneakers Image */}
            <div className="relative order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop"
                alt="Sneakers"
                className="w-full max-w-lg mx-auto"
              />
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            <div className="w-3 h-3 rounded-full bg-white/30"></div>
            <div className="w-3 h-3 rounded-full bg-white/30"></div>
            <div className="w-3 h-3 rounded-full bg-[var(--accent)]"></div>
            <div className="w-3 h-3 rounded-full bg-white/30"></div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[var(--primary)]">منتجات خاصة</h2>
            <Button variant="secondary" size="sm">
              عرض الكل
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
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
