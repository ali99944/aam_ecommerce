"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, RefreshCw, AlertCircle, HomeIcon } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button, IconButton } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb
} from "@/components/ui/breadcrumb"
import { Banner } from "@/components/ui/banner"
import { EmptyState } from "@/components/ui/empty-state"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    product_id: 1,
    name: "مثقاب كهربائي احترافي بوش GSB 13 RE",
    price: 120.00,
    discount_price: 102.00,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    stock: 25,
    product_code: "GSB13RE-600"
  },
  {
    id: 2,
    product_id: 2,
    name: "مفك كهربائي بوش GSR 12V",
    price: 95.00,
    discount_price: null,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    stock: 15,
    product_code: "GSR12V-200"
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showCouponError, setShowCouponError] = useState(false)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCartItems(initialCartItems)
      setIsLoading(false)
    }, 500)
  }, [])

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const item = cartItems.find(item => item.id === id)
    if (item && newQuantity > item.stock) return
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setCouponApplied(true)
      setCouponDiscount(10)
      setShowCouponError(false)
    } else {
      setCouponApplied(false)
      setCouponDiscount(0)
      setShowCouponError(true)
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount_price || item.price
    return total + (itemPrice * item.quantity)
  }, 0)
  
  const shipping = subtotal > 50 ? 0 : 5
  const discount = couponApplied ? (subtotal * couponDiscount / 100) : 0
  const total = subtotal + shipping - discount

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded-sm w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-32 bg-gray-200 rounded-sm"></div>
                  <div className="h-32 bg-gray-200 rounded-sm"></div>
                </div>
                <div className="h-64 bg-gray-200 rounded-sm"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: "الرئيسية", href: "/", icon: HomeIcon },
              { label: "سلة التسوق" }
            ]}
            className="mb-6"
          />
          
          <h1 className="text-2xl font-bold mb-6">سلة التسوق</h1>
          
          {cartItems.length === 0 ? (
            <EmptyState
              title="سلة التسوق فارغة"
              description="لم تقم بإضافة أي منتجات إلى سلة التسوق بعد."
              icon={<ShoppingBag className="h-16 w-16" />}
              action={{
                label: "تصفح المنتجات",
                onClick: () => window.location.href = "/products"
              }}
              className="py-16"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-sm overflow-hidden mb-6">
                  <div className="flex justify-between items-center p-4  bg-[#D2EAE8]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleClearCart}
                      icon={Trash2}
                      iconPosition="right"
                    >
                      إفراغ السلة
                    </Button>
                    <span className="text-sm font-medium">{cartItems.length} منتجات</span>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0">
                          <Image 
                            src={'https://images.pexels.com/photos/237950/pexels-photo-237950.jpeg?auto=compress&cs=tinysrgb&w=600' || "/placeholder.svg"} 
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <Link 
                              href={`/product/${item.product_id}`}
                              className="font-medium hover:text-[#00998F] mb-1"
                            >
                              {item.name}
                            </Link>
                            
                            <div className="flex items-center gap-2">
                              {item.discount_price ? (
                                <>
                                  <span className="font-bold text-[#00998F]">
                                    {item.discount_price.toFixed(2)} دينار
                                  </span>
                                  <span className="text-sm text-gray-500 line-through">
                                    {item.price.toFixed(2)} دينار
                                  </span>
                                </>
                              ) : (
                                <span className="font-bold text-[#00998F]">
                                  {item.price.toFixed(2)} دينار
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-500 mb-2">
                            رمز المنتج: {item.product_code}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center border border-gray-200 rounded-sm">
                              <button 
                                className="px-2 py-2 text-gray-600 hover:text-[#00998F]"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <p className="px-2">{item.quantity}</p>
                              <button 
                                className="px-2 py-2 text-gray-600 hover:text-[#00998F]"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <IconButton
                              icon={Trash2}
                              variant="ghost"
                              onClick={() => handleRemoveItem(item.id)}
                              label="إزالة"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    icon={ArrowLeft}
                    iconPosition="right"
                  >
                    متابعة التسوق
                  </Button>
                  
                  <Button 
                    icon={ShoppingBag}
                    iconPosition="right"
                  >
                    إتمام الطلب
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white border border-gray-200 rounded-sm overflow-hidden mb-6">
                  <div className="p-4 border-b border-gray-200 bg-[#D2EAE8]/80 ">
                    <h2 className="font-bold text-lg">ملخص الطلب</h2>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">المجموع الفرعي:</span>
                      <span className="font-medium">{subtotal.toFixed(2)} دينار</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">الشحن:</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'مجاني' : `${shipping.toFixed(2)} دينار`}
                      </span>
                    </div>
                    
                    {couponApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>خصم الكوبون:</span>
                        <span>- {discount.toFixed(2)} دينار</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="font-bold">المجموع:</span>
                      <span className="font-bold text-[#00998F]">{total.toFixed(2)} دينار</span>
                    </div>
                  </div>
                </div>
                
                {/* Coupon Code */}
                <div className="bg-white border border-gray-200 rounded-sm overflow-hidden mb-6">
                  <div className="p-4 border-b border-gray-200 bg-[#D2EAE8]/80">
                    <h2 className="font-bold text-lg">كوبون الخصم</h2>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="أدخل كود الكوبون"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button 
                        onClick={handleApplyCoupon}
                        variant="secondary"
                        disabled={!couponCode}
                      >
                        تطبيق
                      </Button>
                    </div>
                    
                    {showCouponError && (
                      <div className="text-red-500 text-sm">
                        كود الكوبون غير صالح
                      </div>
                    )}
                    
                    {couponApplied && (
                      <div className="text-green-600 text-sm flex items-center gap-1">
                        <RefreshCw className="h-4 w-4" />
                        تم تطبيق الخصم بنجاح
                      </div>
                    )}
                  </div>
                </div>
                
                <Banner
                  message="التوصيل مجاني للطلبات التي تزيد عن 50 دينار"
                  variant="info"
                  icon={<AlertCircle className="h-5 w-5" />}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
