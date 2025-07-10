"use client"

import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Button from "@/components/ui/button"
import Link from "next/link"
import { useCart } from "@/src/redux/hooks-operations/use-cart"

export default function CartPage() {
  const {
    items,
    total,
    itemsCount,
    loading,
    initialized,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart()

  // Show loading state while cart is being initialized
  if (!initialized && loading) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل السلة...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Show empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-primary mb-4">سلة التسوق فارغة</h2>
            <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
            <div className="flex items-center justify-center">
              <Button variant="primary" size="sm">
                <Link href="/">تسوق الآن</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleUpdateQuantity = (cartItemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(cartItemId)
      return
    }
    updateQuantity(cartItemId, newQuantity)
  }

  const handleRemoveItem = (cartItemId: number) => {
    removeItem(cartItemId)
  }

  // const getTotalOriginalPrice = () => {
  //   return items.reduce((total, item) => {
  //     const originalPrice = item.product.sell_price // You might have original_price field
  //     return total + (originalPrice * item.quantity)
  //   }, 0)
  // }

  const getTotalSavings = () => {
    // Calculate savings if you have original prices
    return 0 // Placeholder
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">سلة التسوق</h1>
          <p className="text-gray-600">{itemsCount} منتج في السلة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-4">
              {loading && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-gray-600">جاري التحديث...</p>
                </div>
              )}
              
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0">
                    <img
                      src={item.product.image || "/image/product-placeholder.png"}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">{item.product.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-red-500">
                          ريال {item.product.sell_price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-primary/20 rounded overflow-hidden">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-primary text-white flex items-center justify-center hover:bg-primary/90 cursor-pointer transition-all duration-300 disabled:opacity-50"
                            disabled={loading}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-primary text-white flex items-center justify-center hover:bg-primary/90 cursor-pointer transition-all duration-300 disabled:opacity-50"
                            disabled={loading || item.quantity >= item.product.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="bg-red-600 hover:bg-red-700 transition-all duration-300 rounded text-white cursor-pointer p-2 disabled:opacity-50"
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Stock warning */}
                      {item.quantity >= item.product.stock && (
                        <p className="text-sm text-orange-600 mt-2">
                          الكمية المتاحة: {item.product.stock}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              {items.length > 0 && (
                <div className="mt-6 pt-6 border-t border-t-gray-300">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => clearCart()}
                    disabled={loading}
                    className="!bg-red-600 hover:!bg-red-700"
                  >
                    إفراغ السلة
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-4 sticky top-4">
              <h3 className="text-xl font-bold text-primary mb-6">ملخص الطلب</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-medium">ريال {total.toFixed(2)}</span>
                </div>
                
                {getTotalSavings() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>التوفير</span>
                    <span className="font-medium">- ريال {getTotalSavings().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن</span>
                  <span className="font-medium text-green-600">يحسب في الخطوة التالية</span>
                </div>
                
                <div className="border-t border-t-gray-300 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع الكلي</span>
                    <span className="text-primary">ريال {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/cart/checkout" className="flex items-center justify-center gap-2 !w-full">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className='!w-full'
                      disabled={loading || items.length === 0}
                    >
                        متابعة للدفع
                    </Button>
                  </Link>
                
                  <Link href="/" className="flex items-center justify-center gap-2 !w-full ">
                    <Button variant="secondary" size="sm" className='!w-full'>
                      متابعة التسوق
                    </Button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
