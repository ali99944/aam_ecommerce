"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, ChevronLeft, Truck, MapPin, CreditCard, Clock, CheckCircle, AlertTriangle, XCircle, FileText, Download, Printer, User, Phone } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"

// Mock order data
const getOrderDetails = (id: string) => {
  return {
    id,
    date: "2023-10-15",
    status: "delivered",
    statusHistory: [
      { status: "processing", date: "2023-10-15T09:30:00", message: "تم استلام طلبك وهو قيد المعالجة" },
      { status: "confirmed", date: "2023-10-15T10:45:00", message: "تم تأكيد طلبك وجاري تجهيزه" },
      { status: "shipped", date: "2023-10-16T14:20:00", message: "تم شحن طلبك وهو في الطريق إليك" },
      { status: "delivered", date: "2023-10-18T11:15:00", message: "تم توصيل طلبك بنجاح" },
    ],
    items: [
      {
        id: 1,
        name: "مثقاب كهربائي احترافي بوش GSB 13 RE",
        price: 120.0,
        discount_price: 102.0,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
        product_code: "GSB13RE-600",
      },
      {
        id: 2,
        name: "مفك كهربائي بوش GSR 12V",
        price: 95.0,
        discount_price: null,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100",
        product_code: "GSR12V-200",
      },
    ],
    shipping: {
      method: "standard",
      cost: 5.0,
      address: "عمان، الأردن - شارع الملك عبدالله الثاني",
      recipient: "محمد أحمد",
      phone: "+962 79 123 4567",
    },
    payment: {
      method: "credit_card",
      card: "**** **** **** 1234",
      status: "paid",
    },
    subtotal: 292.0,
    discount: 18.0,
    total: 279.0,
  }
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrder(getOrderDetails(params.id))
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('ar-EG', options)
  }

  // Format datetime
  const formatDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateTimeString).toLocaleDateString('ar-EG', options)
  }

  // Status badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> قيد المعالجة</Badge>
      case 'confirmed':
        return <Badge variant="secondary" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> تم التأكيد</Badge>
      case 'shipped':
        return <Badge variant="primary" className="flex items-center gap-1"><Truck className="h-3 w-3" /> تم الشحن</Badge>
      case 'delivered':
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> تم التوصيل</Badge>
      case 'cancelled':
        return <Badge variant="danger" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> ملغي</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-sm border border-gray-200 p-8 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-[#00998F] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>جاري تحميل تفاصيل الطلب...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-sm border border-gray-200 p-8 text-center">
              <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">لم يتم العثور على الطلب</h2>
              <p className="text-gray-600 mb-6">
                عذراً، لم نتمكن من العثور على تفاصيل الطلب المطلوب.
              </p>
              <Button as={Link} href="/account/orders">العودة إلى الطلبات</Button>
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

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumb 
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "حسابي", href: "/account" },
              { label: "طلباتي", href: "/account/orders" },
              { label: order.id }
            ]} 
            className="mb-6" 
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">تفاصيل الطلب #{order.id}</h1>
              <p className="text-gray-600">تاريخ الطلب: {formatDate(order.date)}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4" />
                طباعة
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                تحميل الفاتورة
              </Button>
              <Button 
                as={Link} 
                href="/account/orders" 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                العودة للطلبات
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Items and Status */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status */}
              <div className="bg-white rounded-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#00998F]" />
                  حالة الطلب
                </h2>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="text-lg font-bold">
                    {renderStatusBadge(order.status)}
                  </div>
                </div>
                
                <div className="relative">
                  {/* Status Timeline */}
                  <div className="absolute top-0 bottom-0 right-3 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-8">
                    {order.statusHistory.map((status: any, index: number) => (
                      <div key={index} className="relative flex gap-4">
                        <div className={`w-6 h-6 rounded-full mt-0.5 z-10 flex items-center justify-center ${
                          status.status === order.status 
                            ? 'bg-[#00998F] text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">{renderStatusBadge(status.status)}</h3>
                              <p className="text-gray-600">{status.message}</p>
                            </div>
                            <span className="text-sm text-gray-500">{formatDateTime(status.date)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Package className="h-5 w-5 text-[#00998F]" />
                    منتجات الطلب
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <Link
                            href={`/product/${item.id}`}
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
                              <span className="font-bold text-[#00998F]">{item.price.toFixed(2)} دينار</span>
                            )}
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 mb-2">رمز المنتج: {item.product_code}</div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            الكمية: <span className="font-medium">{item.quantity}</span>
                          </div>
                          <div className="text-sm font-bold">
                            المجموع: <span className="text-[#00998F]">
                              {((item.discount_price || item.price) * item.quantity).toFixed(2)} دينار
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary and Info */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#00998F]" />
                  ملخص الطلب
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي:</span>
                    <span>{order.subtotal.toFixed(2)} دينار</span>
                  </div>
                  
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>الخصم:</span>
                      <span>- {order.discount.toFixed(2)} دينار</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">الشحن:</span>
                    <span>
                      {order.shipping.cost === 0 ? "مجاني" : `${order.shipping.cost.toFixed(2)} دينار`}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                    <span>المجموع:</span>
                    <span className="text-[#00998F]">{order.total.toFixed(2)} دينار</span>
                  </div>
                </div>
              </div>
              
              {/* Shipping Info */}
              <div className="bg-white rounded-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#00998F]" />
                  معلومات الشحن
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#00998F] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">عنوان التوصيل</div>
                      <div className="text-gray-600">{order.shipping.address}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-[#00998F] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">المستلم</div>
                      <div className="text-gray-600">{order.shipping.recipient}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#00998F] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">رقم الهاتف</div>
                      <div className="text-gray-600" dir="ltr">{order.shipping.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-[#00998F] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">طريقة الشحن</div>
                      <div className="text-gray-600">
                        {order.shipping.method === 'standard' ? 'توصيل قياسي (3-5 أيام)' : 'توصيل سريع (1-2 يوم)'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Info */}
              <div className="bg-white rounded-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#00998F]" />
                  معلومات الدفع
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-[#00998F] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">طريقة الدفع</div>
                      <div className="text-gray-600">
                        {order.payment.method === 'credit_card' 
                          ? `بطاقة ائتمان (${order.payment.card})` 
                          : order.payment.method === 'cash_on_delivery'
                            ? 'الدفع عند الاستلام'
                            : 'تحويل بنكي'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">حالة الدفع</div>
                      <div className="text-green-600">
                        {order.payment.status === 'paid' ? 'تم الدفع' : 'في انتظار الدفع'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="bg-white rounded-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold mb-4">هل تحتاج إلى مساعدة؟</h2>
                <p className="text-gray-600 mb-4">
                  إذا كان لديك أي استفسار بخصوص طلبك، يرجى التواصل مع فريق خدمة العملاء.
                </p>
                <Button as={Link} href="/contact" variant="outline" fullWidth>
                  تواصل معنا
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
