"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import Footer from "@/components/custom/footer"
import Navbar from "@/components/header"
import Button from "@/components/ui/button"
import Dialog from "@/components/ui/dialog"


interface CartItem {
  id: number
  name: string
  image: string
  price: number
  originalPrice?: number
  quantity: number
  category: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "ساعة ذكية جديدة من سلسلة 8",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      price: 250.0,
      originalPrice: 350.0,
      quantity: 1,
      category: "ساعات",
    },
    {
      id: 2,
      name: "سماعة سامسونغ كير بودز فوق الأذن",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      price: 450.0,
      originalPrice: 550.0,
      quantity: 2,
      category: "سماعات",
    },
  ])

  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalOriginalPrice = () => {
    return cartItems.reduce((total, item) => total + ((item.originalPrice || item.price) * item.quantity), 0)
  }

  const getTotalSavings = () => {
    return getTotalOriginalPrice() - getTotalPrice()
  }

  const handleCheckout = () => {
    setShowCheckoutDialog(true)
  }

  const proceedToCheckout = () => {
    setShowCheckoutDialog(false)
    window.location.href = "/checkout"
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">سلة التسوق فارغة</h2>
            <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
            <Button variant="primary" size="sm">
              <a href="/">تسوق الآن</a>
            </Button>
          </div>
        </div>
        <CompleteFooterV2 />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">سلة التسوق</h1>
          <p className="text-gray-600">{cartItems.length} منتج في السلة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                      <h3 className="font-semibold text-[var(--primary)] mb-2">{item.name}</h3>
                      
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

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-[var(--primary)] mb-6">ملخص الطلب</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-medium">ريال {getTotalOriginalPrice().toFixed(2)}</span>
                </div>
                
                {getTotalSavings() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>التوفير</span>
                    <span className="font-medium">- ريال {getTotalSavings().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن</span>
                  <span className="font-medium text-green-600">مجاني</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع الكلي</span>
                    <span className="text-[var(--primary)]">ريال {getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                variant="primary" 
                size="sm" 
                className="w-full mb-4"
                onClick={handleCheckout}
              >
                متابعة للدفع
              </Button>
              
              <Button variant="secondary" size="sm" className="w-full">
                <a href="/" className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  متابعة التسوق
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Confirmation Dialog */}
      <Dialog isOpen={showCheckoutDialog} onClose={() => setShowCheckoutDialog(false)}>
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-[var(--primary)] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[var(--primary)] mb-4">تأكيد الطلب</h3>
          <p className="text-gray-600 mb-6">
            هل أنت متأكد من أنك تريد المتابعة إلى صفحة الدفع؟
          </p>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded p-3">
              <div className="flex justify-between text-sm">
                <span>عدد المنتجات:</span>
                <span className="font-medium">{cartItems.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>المجموع الكلي:</span>
                <span className="font-bold text-[var(--primary)]">ريال {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowCheckoutDialog(false)} className="flex-1">
                إلغاء
              </Button>
              <Button variant="primary" onClick={proceedToCheckout} className="flex-1">
                متابعة للدفع
              </Button>
            </div>
          </div>
        </div>
      </Dialog>

      <Footer />
    </div>
  )
}
