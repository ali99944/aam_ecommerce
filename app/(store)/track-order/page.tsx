/* eslint-disable */


"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, Truck, CheckCircle, Clock, AlertCircle, ChevronLeft, Search, Home } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"

// Mock order statuses
const orderStatuses = {
  pending: {
    label: "قيد المعالجة",
    color: "bg-amber-500",
    icon: <Clock className="h-5 w-5" />,
    description: "تم استلام طلبك وهو قيد المعالجة",
  },
  processing: {
    label: "جاري التجهيز",
    color: "bg-blue-500",
    icon: <Package className="h-5 w-5" />,
    description: "جاري تجهيز طلبك في المستودع",
  },
  shipped: {
    label: "تم الشحن",
    color: "bg-indigo-500",
    icon: <Truck className="h-5 w-5" />,
    description: "تم شحن طلبك وهو في الطريق إليك",
  },
  delivered: {
    label: "تم التسليم",
    color: "bg-green-500",
    icon: <CheckCircle className="h-5 w-5" />,
    description: "تم تسليم طلبك بنجاح",
  },
  cancelled: {
    label: "ملغي",
    color: "bg-red-500",
    icon: <AlertCircle className="h-5 w-5" />,
    description: "تم إلغاء الطلب",
  },
}

// Mock order data
const mockOrders = {
  ORD123456: {
    id: "ORD123456",
    date: "2023-05-15",
    status: "shipped",
    items: [
      {
        id: 1,
        name: "مثقاب كهربائي بوش GSB 13 RE",
        price: 120,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "طقم مفكات 12 قطعة",
        price: 45,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    shipping: {
      method: "توصيل قياسي",
      address: "عمان، الأردن - شارع الملك عبدالله الثاني",
      cost: 5,
    },
    payment: {
      method: "بطاقة ائتمان",
      last4: "4242",
    },
    total: 215,
    trackingNumber: "TRK987654321",
    trackingHistory: [
      { date: "2023-05-15 09:30", status: "pending", description: "تم استلام الطلب" },
      { date: "2023-05-16 11:45", status: "processing", description: "جاري تجهيز الطلب" },
      { date: "2023-05-17 14:20", status: "shipped", description: "تم شحن الطلب" },
    ],
    estimatedDelivery: "2023-05-20",
  },
  ORD789012: {
    id: "ORD789012",
    date: "2023-05-10",
    status: "delivered",
    items: [
      {
        id: 3,
        name: "منشار كهربائي دائري",
        price: 180,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    shipping: {
      method: "توصيل سريع",
      address: "عمان، الأردن - شارع الجامعة",
      cost: 10,
    },
    payment: {
      method: "الدفع عند الاستلام",
      last4: null,
    },
    total: 190,
    trackingNumber: "TRK123456789",
    trackingHistory: [
      { date: "2023-05-10 10:15", status: "pending", description: "تم استلام الطلب" },
      { date: "2023-05-11 09:30", status: "processing", description: "جاري تجهيز الطلب" },
      { date: "2023-05-11 16:45", status: "shipped", description: "تم شحن الطلب" },
      { date: "2023-05-12 14:20", status: "delivered", description: "تم تسليم الطلب" },
    ],
    estimatedDelivery: "2023-05-12",
  },
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [searchedOrder, setSearchedOrder] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = () => {
    if (!orderNumber) {
      setError("الرجاء إدخال رقم الطلب")
      return
    }

    setIsLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      if (mockOrders[orderNumber]) {
        setSearchedOrder(orderNumber)
        setError(null)
      } else {
        setSearchedOrder(null)
        setError("لم يتم العثور على الطلب. يرجى التأكد من رقم الطلب والمحاولة مرة أخرى.")
      }
      setIsLoading(false)
    }, 1000)
  }

  const order = searchedOrder ? mockOrders[searchedOrder] : null

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[
            { label: "الرئيسية", href: "/", icon: Home },
            { label: "تتبع الطلب" }
          ]} className="mb-6" />

          <div className="max-w-4xl mx-auto">
            <div className="bg-white border  border-gray-200  rounded-sm p-8 mb-8">
              <h1 className="text-xl font-bold mb-4 text-center">تتبع طلبك</h1>
              <p className="text-center mb-6 opacity-90">أدخل رقم الطلب للتحقق من حالة طلبك وتتبع الشحنة</p>

              <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="أدخل رقم الطلب"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="bg-white text-gray-800 flex-1"
                  icon={Search}
                />
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? "جاري البحث..." : "تتبع الطلب"}
                </Button>
              </div>

              {error && <p className="text-white bg-red-500/20 p-2 rounded-sm mt-4 text-center">{error}</p>}

              <div className="text-center mt-4 text-sm">
                <p>أمثلة لأرقام طلبات للتجربة: ORD123456, ORD789012</p>
              </div>
            </div>

            {order && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {/* Order Summary */}
                <Card className="mb-6 text-white">
                  <div className="p-6">
                    <div className="flex flex-col text-white md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <h2 className="text-xl font-bold mb-1">طلب #{order.id}</h2>
                        <p className="text-white">تاريخ الطلب: {order.date}</p>
                      </div>

                      <div className="mt-4 md:mt-0 flex items-center">
                        <span
                          className={`${orderStatuses[order.status].color} text-white px-3 py-1 rounded-sm flex items-center gap-1`}
                        >
                          {orderStatuses[order.status].icon}
                          {orderStatuses[order.status].label}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="font-bold mb-2">معلومات الشحن</h3>
                        <p className="text-white">{order.shipping.method}</p>
                        <p className="text-white">{order.shipping.address}</p>
                        <p className="text-white">رقم التتبع: {order.trackingNumber}</p>
                      </div>

                      <div>
                        <h3 className="font-bold mb-2">معلومات الدفع</h3>
                        <p className="text-white">{order.payment.method}</p>
                        {order.payment.last4 && <p className="text-white">**** **** **** {order.payment.last4}</p>}
                      </div>

                      <div>
                        <h3 className="font-bold mb-2">ملخص الطلب</h3>
                        <div className="flex justify-between">
                          <span className="text-white">المجموع:</span>
                          <span>{order.total - order.shipping.cost} دينار</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white">الشحن:</span>
                          <span>{order.shipping.cost} دينار</span>
                        </div>
                        <div className="flex justify-between font-bold mt-1 pt-1 border-t border-gray-200">
                          <span>الإجمالي:</span>
                          <span>{order.total} دينار</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Tracking Timeline */}
                <Card className="mb-6">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-6">تتبع الشحنة</h2>

                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute top-0 bottom-0 right-[19px] w-1 bg-gray-200"></div>

                      {/* Timeline Events */}
                      <div className="space-y-8">
                        {order.trackingHistory.map((event, index) => (
                          <div key={index} className="relative flex gap-4">
                            <div
                              className={`w-10 h-10 rounded-full flex-shrink-0 ${orderStatuses[event.status].color} flex items-center justify-center text-white z-10`}
                            >
                              {orderStatuses[event.status].icon}
                            </div>

                            <div className="flex-grow pt-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold">{orderStatuses[event.status].label}</h3>
                                  <p className="text-white">{event.description}</p>
                                </div>
                                <span className="text-sm text-gray-500">{event.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}

                        {order.status !== "delivered" && order.status !== "cancelled" && (
                          <div className="relative flex gap-4">
                            <div className="w-10 h-10 rounded-full flex-shrink-0 bg-gray-200 flex items-center justify-center text-gray-400 z-10">
                              <CheckCircle className="h-5 w-5" />
                            </div>

                            <div className="flex-grow pt-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold text-gray-400">التسليم المتوقع</h3>
                                  <p className="text-gray-500">سيتم تسليم طلبك قريباً</p>
                                </div>
                                <span className="text-sm text-gray-500">{order.estimatedDelivery}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Order Items */}
                <Card className="mb-6">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">منتجات الطلب</h2>

                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                          <div className="relative h-20 w-20 flex-shrink-0 bg-[#f8f8f8] rounded-sm overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>

                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{item.name}</h3>
                              <span className="font-bold">{item.price * item.quantity} دينار</span>
                            </div>
                            <div className="flex justify-between text-sm text-white">
                              <span>الكمية: {item.quantity}</span>
                              <span>{item.price} دينار / قطعة</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <Button
                  
                    variant="outline"
                    icon={ChevronLeft}
                    iconPosition="right"
                  >
                    العودة لقائمة الطلبات
                  </Button>

                  <div className="flex gap-3">
                    <Button
                      href={`mailto:support@abumassoud.com?subject=استفسار حول الطلب ${order.id}`}
                      variant="secondary"
                    >
                      الاستفسار عن الطلب
                    </Button>

                    {order.status !== "cancelled" && order.status !== "delivered" && (
                      <Button variant="danger" onClick={() => alert("سيتم توجيهك لصفحة إلغاء الطلب")}>
                        إلغاء الطلب
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {!order && !error && !isLoading && (
              <div className="bg-white border border-gray-200 rounded-sm p-8 text-center">
                <Package className="h-16 w-16 mx-auto text-[#00998F] mb-4" />
                <h2 className="text-xl mb-2 font-bold">تتبع طلبك</h2>
                <p className=" mb-6">أدخل رقم الطلب في الحقل أعلاه للتحقق من حالة طلبك وتتبع الشحنة</p>
                <div className="max-w-md mx-auto">
                  <p className="text-sm text-gray-500 mb-4">
                    يمكنك العثور على رقم الطلب في رسالة تأكيد الطلب المرسلة إلى بريدك الإلكتروني أو في صفحة "طلباتي" في
                    حسابك
                  </p>
                  <Button as={Link} href="/account/orders" >
                    عرض طلباتي
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

