/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useContext, useEffect } from "react"
import {
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle,
  CreditCard,
  Smartphone,
  Banknote,
  Package,
  Clock,
  MapIcon,
} from "lucide-react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Select from "@/components/ui/select"
import Link from "next/link"
import { useGetQuery, useMutationAction } from "@/src/hooks/queries-actions"
import { NotificationContext } from "@/src/providers/notification-provider"
import { useCart } from "@/src/redux/hooks-operations/use-cart"
import Textarea from "@/components/ui/textarea"
import { SkeletonBase } from "@/components/ui/skeletons"


interface City {
  id: number
  state_id: number
  country_id: number
  name: string
}

interface DeliveryFee {
  id: number
  city_id: number
  amount: number
  estimated_delivery_time: string | null
  is_active: boolean
  notes: string | null
}

interface PaymentMethod {
  id: number
  name: string
  code: string
  description?: string | null
  image: string | null
  slug: string
  is_default: boolean
  is_enabled: boolean
  is_online: boolean
  display_order: number
  instructions?: string | null
}


interface OrderData {
  phone_number: string
  address_line_1: string
  address_line_2?: string
  city_id: number
  postal_code?: string
  special_mark?: string
  notes?: string
  payment_method_code: string
  guest_name?: string
  guest_email?: string
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null)
  const [deliveryFee, setDeliveryFee] = useState<number>(0)
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState<string>("")
  const { addNotification } = useContext(NotificationContext)

  const [formData, setFormData] = useState({
    // Personal Info
    guest_name: "",
    guest_email: "",
    phone_number: "",
    // Address Info
    address_line_1: "",
    address_line_2: "",
    city_id: "",
    postal_code: "",
    special_mark: "",
    notes: "",
    // Payment Info
    payment_method_code: "",
  })

  const { items: cartItems } = useCart()

  // Fetch cities
  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useGetQuery<City[]>({
    key: ["cities"],
    url: "cities",
  })

  // Fetch delivery fees
  const { data: deliveryFees } = useGetQuery<DeliveryFee[]>({
    key: ["delivery-fees"],
    url: "delivery-fees",
  })

  // Fetch payment methods
  const { data: paymentMethods, isLoading: paymentMethodsLoading } = useGetQuery<PaymentMethod[]>({
    key: ["payment-methods"],
    url: "payment-methods",
  })

  // Order creation mutation
  const orderMutation = useMutationAction<any, OrderData>({
    method: "post",
    url: "orders",
    onSuccessCallback: () => {
      setOrderComplete(true)
      addNotification("تم إرسال طلبك بنجاح وهو قيد المراجعة", "success")
    },
    onErrorCallback: (error: any) => {
      console.log(error);
      
      const errorMessage = error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب"
      addNotification(errorMessage, "error")
    },
  })

  // Calculate delivery fee when city changes
  useEffect(() => {
    if (selectedCityId && deliveryFees) {
      const cityDeliveryFee = deliveryFees.find((fee) => fee.city_id === selectedCityId && fee.is_active)
      if (cityDeliveryFee) {
        setDeliveryFee(cityDeliveryFee.amount)
        setEstimatedDeliveryTime(cityDeliveryFee.estimated_delivery_time || "2-4 أيام")
      } else {
        setDeliveryFee(5.0) // Default delivery fee
        setEstimatedDeliveryTime("2-4 أيام")
      }
    }
  }, [selectedCityId, deliveryFees])

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.product.sell_price * item.quantity, 0).toFixed(2)
  }

  const getTotalPrice = () => {
    const subtotal = getSubtotal()
    return (+subtotal + +deliveryFee).toFixed(2)
  }

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    if (method.image) {
      return <img src={method.image || "/placeholder.svg"} alt={method.name} className="w-6 h-6" />
    }

    // Default icons based on method type
    if (method.code.includes("card") || method.code.includes("credit")) {
      return <CreditCard className="w-6 h-6" />
    }
    if (method.code.includes("apple") || method.code.includes("mobile")) {
      return <Smartphone className="w-6 h-6" />
    }
    return <Banknote className="w-6 h-6" />
  }

  const handleCityChange = (cityId: string) => {
    const numericCityId = Number.parseInt(cityId)
    setSelectedCityId(numericCityId)
    setFormData({ ...formData, city_id: cityId })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === 1) {
      // Validate step 1
      if (
        !formData.guest_name ||
        !formData.guest_email ||
        !formData.phone_number ||
        !formData.address_line_1 ||
        !formData.city_id
      ) {
        addNotification("يرجى ملء جميع الحقول المطلوبة", "error")
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      // Validate step 2
      if (!formData.payment_method_code) {
        addNotification("يرجى اختيار طريقة الدفع", "error")
        return
      }
      setCurrentStep(3)
    } else if (currentStep === 3) {
      
      // Submit order
      const orderData: OrderData = {
        phone_number: formData.phone_number,
        address_line_1: formData.address_line_1,
        address_line_2: formData.address_line_2 || undefined,
        city_id: Number.parseInt(formData.city_id),
        postal_code: formData.postal_code || undefined,
        special_mark: formData.special_mark || undefined,
        notes: formData.notes || undefined,
        payment_method_code: formData.payment_method_code,
        guest_name: formData.guest_name,
        guest_email: formData.guest_email,
      }

      orderMutation.mutate(orderData)
    }
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">تم إرسال طلبك!</h2>
            <p className="text-gray-600 mb-6">شكراً لك على طلبك. طلبك قيد المراجعة وسيتم التواصل معك قريباً.</p>
            <div className="bg-gray-50 rounded p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">وقت التسليم المتوقع</p>
              <p className="text-lg font-bold text-primary">{estimatedDeliveryTime}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1">
                <Link href="/">العودة للرئيسية</Link>
              </Button>
              <Button variant="primary" className="flex-1">
                <Link href="/orders">طلباتي</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (citiesError) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-red-600">حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.</p>
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
          <h1 className="text-3xl font-bold text-primary mb-4">إتمام الطلب</h1>

          {/* Steps */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <span className="font-medium">معلومات الشحن</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="font-medium">الدفع</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${currentStep >= 3 ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-primary text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              <span className="font-medium">مراجعة الطلب</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary mb-6">معلومات الشحن</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل *</label>
                        <Input
                          value={formData.guest_name}
                          onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                          placeholder="الاسم الكامل"
                          icon={<User className="w-5 h-5" />}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني *</label>
                        <Input
                          type="email"
                          value={formData.guest_email}
                          onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                          placeholder="البريد الإلكتروني"
                          icon={<Mail className="w-5 h-5" />}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف *</label>
                      <Input
                        type="tel"
                        value={formData.phone_number}
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        placeholder="05xxxxxxxx"
                        icon={<Phone className="w-5 h-5" />}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">العنوان الأساسي *</label>
                      <Input
                        value={formData.address_line_1}
                        onChange={(e) => setFormData({ ...formData, address_line_1: e.target.value })}
                        placeholder="العنوان التفصيلي"
                        icon={<MapPin className="w-5 h-5" />}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">العنوان الثانوي (اختياري)</label>
                      <Input
                        value={formData.address_line_2}
                        onChange={(e) => setFormData({ ...formData, address_line_2: e.target.value })}
                        placeholder="تفاصيل إضافية للعنوان"
                        icon={<MapPin className="w-5 h-5" />}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">المدينة *</label>
                        {citiesLoading ? (
                          <div className="px-4 py-1.5">
                            <SkeletonBase className="h-6 w-full bg-gray-200 rounded" />
                          </div>
                        ) : (
                          <Select
                            options={cities?.map((city) => ({ value: city.id.toString(), label: city.name })) || []}
                            value={formData.city_id}
                            onChange={handleCityChange}
                            placeholder="اختر المدينة"
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الرمز البريدي</label>
                        <Input
                          value={formData.postal_code}
                          onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                          placeholder="12345"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">علامة مميزة للعنوان</label>
                      <Input
                        value={formData.special_mark}
                        onChange={(e) => setFormData({ ...formData, special_mark: e.target.value })}
                        placeholder="مثل: بجانب المسجد، أمام البقالة"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات إضافية</label>
                      <Textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="أي ملاحظات خاصة بالطلب"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button type="submit" variant="primary" size="sm" className="w-full">
                      متابعة للدفع
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary mb-6">طريقة الدفع</h3>

                  {paymentMethodsLoading ? (
                    <div className="p-6 text-center">جاري تحميل طرق الدفع...</div>
                  ) : (
                    <div className="space-y-3">
                      {paymentMethods
                        ?.filter((method) => method.is_enabled)
                        .map((method) => (
                          <label
                            key={method.id}
                            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
                              formData.payment_method_code === method.code
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment_method"
                              value={method.code}
                              checked={formData.payment_method_code === method.code}
                              onChange={(e) => setFormData({ ...formData, payment_method_code: e.target.value })}
                              className="sr-only"
                            />
                            <div className="flex items-center gap-3 flex-1">
                              {getPaymentMethodIcon(method)}
                              <div>
                                <div className="font-medium">{method.name}</div>
                                {method.description && (
                                  <div className="text-sm text-gray-600">{method.description}</div>
                                )}
                              </div>
                            </div>
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                formData.payment_method_code === method.code
                                  ? "border-primary bg-primary"
                                  : "border-gray-300"
                              }`}
                            >
                              {formData.payment_method_code === method.code && (
                                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                              )}
                            </div>
                          </label>
                        ))}
                    </div>
                  )}

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
                      مراجعة الطلب
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary mb-6">مراجعة الطلب</h3>

                  <div className="space-y-6">
                    {/* Shipping Info Review */}
                    <div className="border-b pb-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <MapIcon className="w-5 h-5" />
                        معلومات الشحن
                      </h4>
                      <div className="text-sm space-y-1 text-gray-600">
                        <p>
                          <strong>الاسم:</strong> {formData.guest_name}
                        </p>
                        <p>
                          <strong>البريد الإلكتروني:</strong> {formData.guest_email}
                        </p>
                        <p>
                          <strong>الهاتف:</strong> {formData.phone_number}
                        </p>
                        <p>
                          <strong>العنوان:</strong> {formData.address_line_1}
                        </p>
                        {formData.address_line_2 && (
                          <p>
                            <strong>العنوان الثانوي:</strong> {formData.address_line_2}
                          </p>
                        )}
                        <p>
                          <strong>المدينة:</strong> {cities?.find((c) => c.id.toString() === formData.city_id)?.name}
                        </p>
                        {formData.postal_code && (
                          <p>
                            <strong>الرمز البريدي:</strong> {formData.postal_code}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Payment Method Review */}
                    <div className="border-b pb-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        طريقة الدفع
                      </h4>
                      <div className="text-sm text-gray-600">
                        <p>{paymentMethods?.find((m) => m.code === formData.payment_method_code)?.name}</p>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="border-b pb-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        معلومات التسليم
                      </h4>
                      <div className="text-sm text-gray-600">
                        <p>
                          <strong>رسوم التوصيل:</strong> {deliveryFee} دينار
                        </p>
                        <p>
                          <strong>وقت التسليم المتوقع:</strong> {estimatedDeliveryTime}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        المنتجات
                      </h4>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded">
                            <img
                              src={item.product.image || "/image/product-placeholder.png"}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{item.product.name}</h5>
                              <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                              <p className="text-sm font-bold text-primary">
                                {(item.product.sell_price * item.quantity).toFixed(2)} دينار
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      onClick={() => setCurrentStep(2)}
                    >
                      السابق
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      disabled={orderMutation.isPending}
                    >
                      {orderMutation.isPending ? "جاري الإرسال..." : "تأكيد الطلب"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-4">
              <h3 className="text-xl font-bold text-primary mb-6">ملخص الطلب</h3>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product.image || "/image/product-placeholder.png"}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                      <p className="text-sm font-bold text-primary">{(item.product.sell_price * item.quantity).toFixed(2)} دينار</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-t-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-medium">{getSubtotal()} دينار</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">رسوم التوصيل</span>
                  <span className="font-medium">{deliveryFee} دينار</span>
                </div>

                <div className="border-t border-t-gray-300 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع الكلي</span>
                    <span className="text-primary">{getTotalPrice()} دينار</span>
                  </div>
                </div>
                {estimatedDeliveryTime && (
                  <div className="mt-4 p-2 bg-primary/10 rounded-lg">
                    <p className="text-sm text-primary">
                      <Clock className="w-4 h-4 inline ml-2" />
                      وقت التسليم المتوقع: {estimatedDeliveryTime}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
