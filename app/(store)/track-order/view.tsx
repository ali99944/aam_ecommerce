/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { Search, Truck, CheckCircle, MapPin, Phone, Package, User, Calendar, CreditCard } from "lucide-react"
import Button from "@/components/ui/button"
import Breadcrumb from "@/components/ui/breadcrumb"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [trackingData, setTrackingData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        orderNumber: orderNumber,
        status: "في الطريق",
        estimatedDelivery: "غداً، 25 يناير بين 2:00 - 6:00 مساءً",
        currentLocation: "مركز التوزيع - الرياض",
        trackingNumber: "TRK789456123",
        courierName: "أحمد محمد",
        courierPhone: "0501234567",
        orderDate: "22 يناير 2024",
        orderValue: "4,999.00 ريال",
        paymentMethod: "بطاقة ائتمان",
        steps: [
          {
            title: "تم تأكيد الطلب",
            date: "22 يناير، 10:30 ص",
            completed: true,
            description: "تم استلام طلبك وتأكيد الدفع بنجاح",
          },
          {
            title: "جاري التحضير",
            date: "22 يناير، 2:15 م",
            completed: true,
            description: "يتم تحضير منتجاتك في المستودع",
          },
          {
            title: "تم الشحن",
            date: "23 يناير، 9:00 ص",
            completed: true,
            description: "تم شحن الطلب من المستودع",
          },
          {
            title: "في الطريق للتسليم",
            date: "24 يناير، 11:45 ص",
            completed: true,
            current: true,
            description: "الطلب في طريقه إليك مع المندوب",
          },
          {
            title: "تم التسليم",
            date: "",
            completed: false,
            description: "سيتم تسليم الطلب قريباً",
          },
        ],
        items: [
          {
            name: "آيفون 15 برو ماكس - 256 جيجا",
            quantity: 1,
            price: 4499.0,
            image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop",
          },
          {
            name: "غطاء حماية شفاف",
            quantity: 1,
            price: 299.0,
            image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop",
          },
        ],
        deliveryInfo: {
          address: "شارع الملك فهد، حي العليا، الرياض 12345",
          phone: "0501234567",
          courier: "شركة التوصيل السريع",
          customerName: "أحمد محمد علي",
        },
        timeline: [
          { time: "10:30 ص", date: "22 يناير", event: "تم تأكيد الطلب", location: "الرياض" },
          { time: "2:15 م", date: "22 يناير", event: "بدء التحضير", location: "مستودع الرياض" },
          { time: "9:00 ص", date: "23 يناير", event: "تم الشحن", location: "مستودع الرياض" },
          { time: "11:45 ص", date: "24 يناير", event: "وصل لمركز التوزيع", location: "مركز التوزيع - الرياض" },
          { time: "8:30 ص", date: "25 يناير", event: "خرج للتسليم", location: "مع المندوب" },
        ],
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      <Navbar />
      <div className="bg-background py-12" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "تتبع الطلب" }]} className="mb-6" />



        <div className="max-w-7xl mx-auto mb-12">
        <p className="text-gray-600 mb-4">
          تتبع طلبك للبقاء على اطلاع بحالته.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="ro p-4 bg-white rounded-xl">
            <h3 className="font-semibold text-primary mb-2">قيد المعالجة</h3>
            <p className="text-sm text-gray-600">طلبك قيد المعالجة وسيتم تحضيره قريبًا.</p>
          </div>
          <div className="ro p-4 bg-white rounded-xl">
            <h3 className="font-semibold text-primary mb-2">تم الشحن</h3>
            <p className="text-sm text-gray-600">تم شحن طلبك وهو في طريقه إليك.</p>
          </div>
          <div className="ro p-4 bg-white rounded-xl">
            <h3 className="font-semibold text-primary mb-2">تم التسليم</h3>
            <p className="text-sm text-gray-600">تم تسليم طلبك بنجاح.</p>
          </div>
        </div>
      </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl p-4 ">
          <form onSubmit={handleTrack}>
          <div className="flex border border-gray-300">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="أدخل رقم الطلب (مثال: ORD-123456)"
              className="flex-grow px-4 py-2 focus:outline-none focus:border-blue-500"
              aria-label="أدخل رقم الطلب (مثال: ORD-123456)"
            />
            <Button
              type="submit"
              aria-label="تتبع"
              loading={isLoading}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>
        </div>

        {/* {error && (
          <div className="border-l-4 border-red-500 bg-red-50 p-4 mb-4" role="alert">
            <p className="text-red-700">{error}</p>
          </div>
        )} */}

        {/* Tracking Results */}
        {trackingData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status Card */}
              <div className="bg-white rounded-xl   p-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-2">
                      طلب رقم: {trackingData.orderNumber}
                    </h2>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {trackingData.status}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600">رقم التتبع: {trackingData.trackingNumber}</span>
                    </div>
                    <p className="text-green-600 font-medium">التسليم المتوقع: {trackingData.estimatedDelivery}</p>
                  </div>
                  <div className="text-center">
                    <Truck className="w-8 h-8 text-primary mx-auto mb-4" />
                    <p className="text-sm text-gray-600 font-medium">{trackingData.currentLocation}</p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="space-y-4">
                  {trackingData.steps.map((step: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                          step.completed ? "bg-green-100" : "bg-gray-100"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3
                            className={`font-medium ${
                              step.current ? "text-primary" : step.completed ? "text-green-600" : "text-gray-600"
                            }`}
                          >
                            {step.title}
                            {step.current && <span className="mr-2 text-sm">(الحالة الحالية)</span>}
                          </h3>
                          <span className="text-sm text-gray-500">{step.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Timeline */}
              <div className="bg-white rounded-xl   p-4">
                <h3 className="text-lg font-bold text-primary mb-4">التتبع التفصيلي</h3>
                <div className="space-y-3">
                  {trackingData.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                      <div className="text-center min-w-[80px]">
                        <div className="text-sm font-medium text-primary">{event.time}</div>
                        <div className="text-xs text-gray-500">{event.date}</div>
                      </div>
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{event.event}</div>
                        <div className="text-sm text-gray-600">{event.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl   p-4">
                <h3 className="text-lg font-bold text-primary mb-4">محتويات الطلب</h3>
                <div className="space-y-4">
                  {trackingData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-gray-100 rounded">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-primary">{item.name}</h4>
                        <p className="text-gray-600">الكمية: {item.quantity}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-primary">ريال {item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-xl   p-4">
                <h3 className="text-lg font-bold text-primary mb-4">ملخص الطلب</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">تاريخ الطلب</p>
                      <p className="font-medium">{trackingData.orderDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">قيمة الطلب</p>
                      <p className="font-medium">{trackingData.orderValue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">طريقة الدفع</p>
                      <p className="font-medium">{trackingData.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white rounded-xl   p-4">
                <h3 className="text-lg font-bold text-primary mb-4">معلومات التسليم</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">اسم المستلم</p>
                      <p className="font-medium">{trackingData.deliveryInfo.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">العنوان</p>
                      <p className="font-medium">{trackingData.deliveryInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">رقم الهاتف</p>
                      <p className="font-medium">{trackingData.deliveryInfo.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Courier Information */}
              <div className="bg-white rounded-xl   p-4">
                <h3 className="text-lg font-bold text-primary mb-4">معلومات المندوب</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">اسم المندوب</p>
                      <p className="font-medium">{trackingData.courierName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">رقم المندوب</p>
                      <p className="font-medium">{trackingData.courierPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">شركة الشحن</p>
                      <p className="font-medium">{trackingData.deliveryInfo.courier}</p>
                    </div>
                  </div>
                </div>
                <Button variant="primary" size="sm" className="w-full mt-4">
                  اتصال بالمندوب
                </Button>
              </div>

            </div>
          </div>
        )}
      </div>
          <div className="max-w-6xl mx-auto mt-12 bg-white rounded-xl p-4 ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">تحتاج إلى مساعدة؟</h2>
        <p className="text-gray-600 mb-4">
          يرجى الاتصال بنا لنساعدك في أي مشكلة تواجهك
        </p>
        <div className="flex items-center gap-x-4">
          <img src="/image/logo.png" alt="Customer Support" width={150} height={150} />
          <div>
            <p className="font-semibold">ساعات العمل لدى فريق الدعم</p>
            <p className="text-sm text-gray-600">البريد الإلكتروني: support@aam.com</p>
            <p className="text-sm text-gray-600">رقم الهاتف: +20 123 456 7890</p>
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </>
  )
}
