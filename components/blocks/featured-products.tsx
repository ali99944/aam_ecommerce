"use client"

import { useState } from "react"
import { ChevronLeft } from 'lucide-react'
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
  rating?: number
  reviewCount?: number
}

export default function FeaturedProducts() {
  const [successDialog, setSuccessDialog] = useState<{
    isOpen: boolean
    productName: string
    productImage: string
  }>({
    isOpen: false,
    productName: "",
    productImage: ""
  })

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
    },
    {
      id: 2,
      name: "سماعة سامسونغ كير بودز فوق الأذن",
      category: "سماعات",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      price: 450.0,
      originalPrice: 550.0,
      discount: 25,
      badge: "خصم 25%",
    },
    {
      id: 3,
      name: "ساعة ذكية جديدة من سلسلة 8",
      category: "ساعات",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      discount: 25,
      badge: "خصم 25%",
    },
    {
      id: 4,
      name: "سماعة سامسونغ كير بودز فوق الأذن",
      category: "سماعات",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      price: 450.0,
      originalPrice: 550.0,
      discount: 25,
      badge: "خصم 25%",
    },
    {
      id: 5,
      name: "سماعات إيربودز 3 سيم أوريجينال",
      category: "سماعات",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      discount: null,
      badge: "جديد",
    },
    {
      id: 6,
      name: "ساعة ذكية جديدة من سلسلة 8",
      category: "ساعات",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      discount: 25,
      badge: "خصم 25%",
    },
    {
      id: 7,
      name: "موبايل آي فون 14 الجيل 128 جيجابايت",
      category: "موبايلات",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      discount: null,
      badge: "جديد",
    },
    {
      id: 8,
      name: "آي باد برو 12.9 بوصة واي فاي",
      category: "تابلت",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      discount: 25,
      badge: "خصم 25%",
    },
  ]

  const handleAddToCart = (product: Product) => {
    setSuccessDialog({
      isOpen: true,
      productName: product.name,
      productImage: product.image
    })
  }

  const handleCloseDialog = () => {
    setSuccessDialog(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[var(--primary)]">منتجات مميزة</h2>
            <Button variant="secondary" size="sm">
              عرض الكل
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
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
