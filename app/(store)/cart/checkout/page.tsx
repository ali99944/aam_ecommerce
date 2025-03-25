"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import {
  CreditCard,
  Truck,
  ShieldCheck,
  ChevronLeft,
  CheckCircle,
  MapPin,
  Phone,
  User,
  Mail,
  Home,
  CreditCardIcon as CardIcon,
  Wallet,
  Clock,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioItem } from "@/components/ui/radio-group"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Banner } from "@/components/ui/banner"

// Mock cart data
const cartItems = [
  {
    id: 1,
    product_id: 1,
    name: "مثقاب كهربائي احترافي بوش GSB 13 RE",
    price: 120.0,
    discount_price: 102.0,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    product_code: "GSB13RE-600",
  },
  {
    id: 2,
    product_id: 2,
    name: "مفك كهربائي بوش GSR 12V",
    price: 95.0,
    discount_price: null,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    product_code: "GSR12V-200",
  },
]

// Payment methods
const paymentMethods = [
  { id: "credit_card", name: "بطاقة ائتمان", icon: <CardIcon className="h-5 w-5" /> },
  { id: "cash_on_delivery", name: "الدفع عند الاستلام", icon: <Wallet className="h-5 w-5" /> },
  { id: "bank_transfer", name: "تحويل بنكي", icon: <CreditCard className="h-5 w-5" /> },
]

// Installment options
const installmentOptions = [
  { id: "no_installment", name: "دفعة واحدة", months: 0 },
  { id: "3_months", name: "تقسيط 3 أشهر", months: 3 },
  { id: "6_months", name: "تقسيط 6 أشهر", months: 6 },
  { id: "12_months", name: "تقسيط 12 شهر", months: 12 },
]

// Shipping methods
const shippingMethods = [
  { id: "standard", name: "توصيل قياسي (3-5 أيام)", price: 5 },
  { id: "express", name: "توصيل سريع (1-2 يوم)", price: 10 },
]

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [installmentOption, setInstallmentOption] = useState("no_installment")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (activeStep < 3) {
      setActiveStep(activeStep + 1)
      window.scrollTo(0, 0)
    } else {
      // Submit order
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setOrderComplete(true)
        setOrderNumber(
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0"),
        )
      }, 1500)
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount_price || item.price
    return total + itemPrice * item.quantity
  }, 0)

  const shippingCost = shippingMethods.find((method) => method.id === shippingMethod)?.price || 0
  const total = subtotal + shippingCost

  // Calculate installment amount if applicable
  const selectedInstallment = installmentOptions.find((option) => option.id === installmentOption)
  const installmentAmount =
    selectedInstallment && selectedInstallment.months > 0 ? (total / selectedInstallment.months).toFixed(2) : null

  if (orderComplete) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-12 bg-[#D2EAE8]">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              <h1 className="text-2xl font-bold mb-4">تم تأكيد طلبك بنجاح!</h1>
              <p className="text-gray-600 mb-6">شكراً لك على طلبك. تم إرسال تفاصيل الطلب إلى بريدك الإلكتروني.</p>

              <div className=" p-4 rounded-sm mb-6">
                <p className="text-gray-700 mb-2">
                  رقم الطلب: <span className="font-bold">{orderNumber}</span>
                </p>
                <p className="text-gray-700">
                  المبلغ الإجمالي: <span className="font-bold">{total.toFixed(2)} دينار</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>
                  العودة للرئيسية
                </Button>

                <Button variant="outline">
                  تتبع طلبك
                </Button>
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
            items={[{ label: "الرئيسية", href: "/" }, { label: "سلة التسوق", href: "/cart" }, { label: "إتمام الطلب" }]}
            className="mb-6"
          />

          <h1 className="text-2xl font-bold mb-6">إتمام الطلب</h1>

          {/* Checkout Steps */}
          <div className="flex justify-between mb-8 border-b border-gray-200">
            <button
              className={`pb-4 px-4 relative ${activeStep >= 1 ? "text-[#00998F] font-medium" : "text-gray-500"}`}
              onClick={() => activeStep > 1 && setActiveStep(1)}
              disabled={activeStep < 1}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full ${
                    activeStep >= 1 ? "bg-[#00998F] text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </div>
                <span>معلومات الشحن</span>
              </div>
              {activeStep === 1 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00998F]"></div>}
            </button>

            <button
              className={`pb-4 px-4 relative ${activeStep >= 2 ? "text-[#00998F] font-medium" : "text-gray-500"}`}
              onClick={() => activeStep > 2 && setActiveStep(2)}
              disabled={activeStep < 2}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full ${
                    activeStep >= 2 ? "bg-[#00998F] text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
                <span>طريقة الدفع</span>
              </div>
              {activeStep === 2 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00998F]"></div>}
            </button>

            <button
              className={`pb-4 px-4 relative ${activeStep >= 3 ? "text-[#00998F] font-medium" : "text-gray-500"}`}
              disabled={activeStep < 3}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full ${
                    activeStep >= 3 ? "bg-[#00998F] text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span>مراجعة الطلب</span>
              </div>
              {activeStep === 3 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00998F]"></div>}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Shipping Information */}
                {activeStep === 1 && (
                  <div className="bg-white border border-gray-200 rounded-sm overflow-hidden mb-6">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="font-bold text-lg flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-[#00998F]" />
                        معلومات الشحن
                      </h2>
                    </div>

                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="الاسم الأول"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          icon={User}
                          iconPosition="right"
                          required
                        />

                        <Input
                          label="الاسم الأخير"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          icon={User}
                          iconPosition="right"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="البريد الإلكتروني"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          icon={Mail}
                          iconPosition="right"
                          required
                        />

                        <Input
                          label="رقم الهاتف"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          icon={Phone}
                          iconPosition="right"
                          required
                        />
                      </div>

                      <Input
                        label="العنوان"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        icon={Home}
                        iconPosition="right"
                        required
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="المدينة" name="city" value={formData.city} onChange={handleChange} required />

                        <Input
                          label="الرمز البريدي"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                        />
                      </div>

                      <Textarea
                        label="ملاحظات إضافية"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                      />

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-medium mb-3">طريقة الشحن</h3>
                        <RadioGroup value={shippingMethod} onChange={setShippingMethod}>
                          {shippingMethods.map((method) => (
                            <RadioItem
                              key={method.id}
                              value={method.id}
                              label={method.name}
                              description={`${method.price === 0 ? "مجاني" : `${method.price.toFixed(2)} دينار`}`}
                            />
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Method */}
                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                      <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-lg flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-[#00998F]" />
                          طريقة الدفع
                        </h2>
                      </div>

                      <div className="p-4">
                        <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                          {paymentMethods.map((method) => (
                            <RadioItem key={method.id} value={method.id} label={method.name} />
                          ))}
                        </RadioGroup>
                      </div>
                    </div>

                    {/* Credit Card Details */}
                    {paymentMethod === "credit_card" && (
                      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                          <h2 className="font-bold text-lg">تفاصيل البطاقة</h2>
                        </div>

                        <div className="p-4 space-y-4">
                          <Input
                            label="رقم البطاقة"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleCardDetailsChange}
                            placeholder="0000 0000 0000 0000"
                            required={paymentMethod === "credit_card"}
                          />

                          <Input
                            label="الاسم على البطاقة"
                            name="cardName"
                            value={cardDetails.cardName}
                            onChange={handleCardDetailsChange}
                            required={paymentMethod === "credit_card"}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              label="تاريخ الانتهاء"
                              name="expiryDate"
                              value={cardDetails.expiryDate}
                              onChange={handleCardDetailsChange}
                              placeholder="MM/YY"
                              required={paymentMethod === "credit_card"}
                            />

                            <Input
                              label="رمز الأمان (CVV)"
                              name="cvv"
                              value={cardDetails.cvv}
                              onChange={handleCardDetailsChange}
                              placeholder="123"
                              required={paymentMethod === "credit_card"}
                            />
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                            <ShieldCheck className="h-5 w-5 text-[#00998F]" />
                            <span>جميع المعاملات آمنة ومشفرة</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Installment Options */}
                    {paymentMethod === "credit_card" && (
                      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                          <h2 className="font-bold text-lg flex items-center gap-2">
                            <Clock className="h-5 w-5 text-[#00998F]" />
                            خيارات التقسيط
                          </h2>
                        </div>

                        <div className="p-4">
                          <RadioGroup value={installmentOption} onChange={setInstallmentOption}>
                            {installmentOptions.map((option) => (
                              <RadioItem
                                key={option.id}
                                value={option.id}
                                label={option.name}
                                description={
                                  option.months > 0 ? `${(total / option.months).toFixed(2)} دينار شهرياً` : undefined
                                }
                              />
                            ))}
                          </RadioGroup>

                          <Banner
                            message="التقسيط متاح فقط للبطاقات الائتمانية الصادرة من البنوك المحلية"
                            variant="info"
                            className="mt-4"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Review Order */}
                {activeStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                      <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-lg">مراجعة الطلب</h2>
                      </div>

                      <div className="p-4">
                        <h3 className="font-medium mb-3">المنتجات</h3>
                        <div className="divide-y divide-gray-200 mb-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="py-3 flex gap-4">
                              <div className="relative h-16 w-16 flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>

                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-gray-500">الكمية: {item.quantity}</div>
                                  </div>

                                  <div className="text-right">
                                    {item.discount_price ? (
                                      <div className="font-bold text-[#00998F]">
                                        {(item.discount_price * item.quantity).toFixed(2)} دينار
                                      </div>
                                    ) : (
                                      <div className="font-bold text-[#00998F]">
                                        {(item.price * item.quantity).toFixed(2)} دينار
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <h3 className="font-medium mb-3">معلومات الشحن</h3>
                        <div className="bg-gray-50 p-3 rounded-sm mb-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium">الاسم:</span> {formData.firstName} {formData.lastName}
                            </div>
                            <div>
                              <span className="font-medium">البريد الإلكتروني:</span> {formData.email}
                            </div>
                            <div>
                              <span className="font-medium">رقم الهاتف:</span> {formData.phone}
                            </div>
                            <div>
                              <span className="font-medium">العنوان:</span> {formData.address}
                            </div>
                            <div>
                              <span className="font-medium">المدينة:</span> {formData.city}
                            </div>
                            <div>
                              <span className="font-medium">الرمز البريدي:</span> {formData.postalCode || "-"}
                            </div>
                          </div>

                          {formData.notes && (
                            <div className="mt-2 text-sm">
                              <span className="font-medium">ملاحظات:</span> {formData.notes}
                            </div>
                          )}
                        </div>

                        <h3 className="font-medium mb-3">طريقة الدفع</h3>
                        <div className="bg-gray-50 p-3 rounded-sm mb-4">
                          <div className="text-sm">
                            <div className="font-medium mb-1">
                              {paymentMethods.find((method) => method.id === paymentMethod)?.name}
                            </div>

                            {paymentMethod === "credit_card" && (
                              <div className="text-gray-600">
                                {cardDetails.cardNumber && `**** **** **** ${cardDetails.cardNumber.slice(-4)}`}
                              </div>
                            )}

                            {installmentOption !== "no_installment" && paymentMethod === "credit_card" && (
                              <div className="mt-2">
                                <span className="font-medium">خطة التقسيط:</span>{" "}
                                {installmentOptions.find((option) => option.id === installmentOption)?.name} (
                                {installmentAmount} دينار شهرياً)
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  {activeStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveStep(activeStep - 1)}
                      icon={ChevronLeft}
                      iconPosition="right"
                    >
                      العودة
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"

                      icon={ChevronLeft}
                      iconPosition="right"
                    >
                      العودة للسلة
                    </Button>
                  )}

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "جاري المعالجة..." : activeStep < 3 ? "متابعة" : "تأكيد الطلب"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white border border-gray-200 rounded-sm overflow-hidden sticky top-4">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-bold text-lg">ملخص الطلب</h2>
                </div>

                <div className="p-4">
                  <div className="max-h-60 overflow-y-auto mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 mb-3">
                        <div className="relative h-16 w-16 flex-shrink-0 border border-gray-200 rounded-sm">
                          <Image
                            src={'https://images.pexels.com/photos/237950/pexels-photo-237950.jpeg?auto=compress&cs=tinysrgb&w=600'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="text-sm font-medium line-clamp-1">{item.name}</div>
                          <div className="text-xs text-gray-500">الكمية: {item.quantity}</div>
                          <div className="text-sm font-bold text-[#00998F]">
                            {((item.discount_price || item.price) * item.quantity).toFixed(2)} دينار
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">المجموع الفرعي:</span>
                      <span className="font-medium">{subtotal.toFixed(2)} دينار</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">الشحن:</span>
                      <span className="font-medium">
                        {shippingCost === 0 ? "مجاني" : `${shippingCost.toFixed(2)} دينار`}
                      </span>
                    </div>

                    <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                      <span>المجموع:</span>
                      <span className="text-[#00998F]">{total.toFixed(2)} دينار</span>
                    </div>

                    {installmentAmount && (
                      <div className="flex justify-between text-sm text-[#00998F] pt-2">
                        <span>قسط شهري:</span>
                        <span>{installmentAmount} دينار</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Truck className="h-4 w-4 text-[#00998F]" />
                    <span>توصيل سريع لجميع أنحاء المملكة</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="h-4 w-4 text-[#00998F]" />
                    <span>ضمان الجودة على جميع المنتجات</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

