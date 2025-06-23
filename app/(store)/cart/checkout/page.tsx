"use client"

import { useState } from "react"
import { CreditCard, MapPin, User, Phone, Mail, CheckCircle } from 'lucide-react'
import Footer from "@/components/custom/footer"
import Navbar from "@/components/header"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import PaymentMethodSelector from "@/components/ui/payment-method"
import Select from "@/components/ui/select"
import Link from "next/link"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    // Payment Info
    paymentMethod: "",
  })

  const cartItems = [
    {
      id: 1,
      name: "ساعة ذكية جديدة من سلسلة 8",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      price: 250.0,
      quantity: 1,
    },
    {
      id: 2,
      name: "سماعة سامسونغ كير بودز فوق الأذن",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      price: 450.0,
      quantity: 2,
    },
  ]

  const cities = [
    { value: "riyadh", label: "الرياض" },
    { value: "jeddah", label: "جدة" },
    { value: "dammam", label: "الدمام" },
    { value: "mecca", label: "مكة" },
  ]

  const paymentMethods = [
    { id: "card", name: "بطاقة ائتمان", icon: "card", description: "فيزا، ماستركارد، مدى" },
    { id: "apple", name: "أبل باي", icon: "mobile", description: "دفع سريع وآمن" },
    { id: "cod", name: "الدفع عند الاستلام", icon: "bank", description: "ادفع عند وصول الطلب" },
  ]

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 1) {
      setCurrentStep(2)
    } else {
      // Process order
      setOrderComplete(true)
    }
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">تم تأكيد طلبك!</h2>
            <p className="text-gray-600 mb-6">
              شكراً لك على طلبك. سيتم معالجة طلبك وشحنه في أقرب وقت ممكن.
            </p>
            <div className="bg-gray-50 rounded p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">رقم الطلب</p>
              <p className="text-lg font-bold text-[var(--primary)]">#ORD-2024-001</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1">
                <Link href="/">العودة للرئيسية</Link>
              </Button>
              <Button variant="primary" className="flex-1">
                تتبع الطلب
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">إتمام الطلب</h1>
          
          {/* Steps */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-[var(--primary)]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[var(--primary)] text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-medium">معلومات الشحن</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-[var(--primary)]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[var(--primary)] text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-medium">الدفع</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[var(--primary)] mb-6">معلومات الشحن</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          placeholder="الاسم الأول"
                          icon={<User className="w-5 h-5" />}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">اسم العائلة</label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          placeholder="اسم العائلة"
                          icon={<User className="w-5 h-5" />}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="البريد الإلكتروني"
                          icon={<Mail className="w-5 h-5" />}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="05xxxxxxxx"
                          icon={<Phone className="w-5 h-5" />}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                      <Input
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="العنوان التفصيلي"
                        icon={<MapPin className="w-5 h-5" />}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                        <Select
                          options={cities}
                          value={formData.city}
                          onChange={(value) => setFormData({...formData, city: value})}
                          placeholder="اختر المدينة"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الحي</label>
                        <Input
                          value={formData.district}
                          onChange={(e) => setFormData({...formData, district: e.target.value})}
                          placeholder="الحي"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الرمز البريدي</label>
                        <Input
                          value={formData.postalCode}
                          onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                          placeholder="12345"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button type="submit" variant="primary" size="sm" className="w-full">
                      متابعة للدفع
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[var(--primary)] mb-6">طريقة الدفع</h3>
                  
                  <PaymentMethodSelector
                    methods={paymentMethods}
                    value={formData.paymentMethod}
                    onChange={(value) => setFormData({...formData, paymentMethod: value})}
                  />

                  <div className="mt-6 flex gap-3">
                    <Button 
                      type="button" 
                      variant="secondary" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setCurrentStep(1)}
                    >
                      السابق
                    </Button>
                    <Button type="submit" variant="primary" size="sm" className="flex-1">
                      تأكيد الطلب
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-[var(--primary)] mb-6">ملخص الطلب</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                      <p className="text-sm font-bold text-[var(--primary)]">
                        ريال {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-medium">ريال {getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن</span>
                  <span className="font-medium text-green-600">مجاني</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ضريبة القيمة المضافة</span>
                  <span className="font-medium">ريال {(getTotalPrice() * 0.15).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع الكلي</span>
                    <span className="text-[var(--primary)]">ريال {(getTotalPrice() * 1.15).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
