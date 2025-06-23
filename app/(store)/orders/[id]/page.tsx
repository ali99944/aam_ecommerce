"use client"

import { Package, CheckCircle, MapPin, Phone, CreditCard, Star, RotateCcw, FileText } from 'lucide-react'
import Button from "@/components/ui/button"
import Breadcrumb from "@/components/ui/breadcrumb"
import { useState } from "react"
import RatingDialog from '@/components/ui/dialogs/rating-dialog'
import ReorderDialog from '@/components/ui/dialogs/reorder-dialog'
import Navbar from '@/components/header'
import Footer from '@/components/custom/footer'

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const orderData = {
    id: params.id,
    date: "2024-01-20",
    status: "delivered",
    statusText: "تم التسليم",
    deliveryDate: "2024-01-22",
    total: 4999.0,
    subtotal: 4799.0,
    shipping: 50.0,
    tax: 150.0,
    paymentMethod: "بطاقة ائتمان",
    cardLast4: "1234",
    items: [
      {
        id: 1,
        name: "آيفون 15 برو ماكس - 256 جيجا - تيتانيوم طبيعي",
        price: 4499.0,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop",
      },
      {
        id: 2,
        name: "غطاء حماية شفاف للآيفون 15 برو ماكس",
        price: 299.0,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop",
      },
    ],
    shippingAddress: {
      name: "أحمد محمد",
      phone: "0501234567",
      address: "شارع الملك فهد، حي العليا",
      city: "الرياض",
      postalCode: "12345",
    },
    timeline: [
      { title: "تم تأكيد الطلب", date: "20 يناير، 10:30 ص", completed: true },
      { title: "جاري التحضير", date: "20 يناير، 2:15 م", completed: true },
      { title: "تم الشحن", date: "21 يناير، 9:00 ص", completed: true },
      { title: "في الطريق للتسليم", date: "22 يناير، 11:45 ص", completed: true },
      { title: "تم التسليم", date: "22 يناير، 3:20 م", completed: true },
    ],
  }

  const [ratingDialog, setRatingDialog] = useState(false)
  const [reorderDialog, setReorderDialog] = useState(false)

  const handleRatingSubmit = (rating: number, review: string) => {
    console.log('Rating submitted:', rating, review)
    setRatingDialog(false)
  }

  const handleReorderSubmit = (items: Array<{ id: number; quantity: number }>) => {
    console.log('Reorder submitted:', items)
    setReorderDialog(false)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "طلباتي", href: "/orders" },
            { label: `طلب رقم ${orderData.id}` },
          ]}
          className="mb-4"
        />

        {/* Header */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--primary)] mb-2">طلب رقم: {orderData.id}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>تاريخ الطلب: {orderData.date}</span>
                <span>•</span>
                <span>تاريخ التسليم: {orderData.deliveryDate}</span>
              </div>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                {orderData.statusText}
              </span>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" size="sm" icon={Star} onClick={() => setRatingDialog(true)}>
              تقييم المنتجات
            </Button>
            <Button variant="secondary" size="sm" icon={RotateCcw} onClick={() => setReorderDialog(true)}>
              إعادة الطلب
            </Button>
            <Button variant="secondary" size="sm" icon={FileText}>
              <a href={`/orders/invoice/${orderData.id}`}>عرض الفاتورة</a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Timeline */}
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-4">تتبع الطلب</h2>
              <div className="space-y-4">
                {orderData.timeline.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-green-600">{step.title}</h3>
                        <span className="text-sm text-gray-500">{step.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-4">محتويات الطلب</h2>
              <div className="space-y-2">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-[var(--primary)] mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm">الكمية: {item.quantity}</p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-[var(--primary)]">ريال {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-4">عنوان التسليم</h2>
              <div className="space-y-2">
                <p className="font-medium">{orderData.shippingAddress.name}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{orderData.shippingAddress.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 mt-1" />
                  <div>
                    <p>{orderData.shippingAddress.address}</p>
                    <p>
                      {orderData.shippingAddress.city} {orderData.shippingAddress.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-4">ملخص الطلب</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span>ريال {orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن</span>
                  <span>ريال {orderData.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الضريبة</span>
                  <span>ريال {orderData.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>المجموع الكلي</span>
                    <span className="text-[var(--primary)]">ريال {orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-4">طريقة الدفع</h2>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{orderData.paymentMethod}</p>
                  <p className="text-sm text-gray-600">**** **** **** {orderData.cardLast4}</p>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-[var(--primary)] mb-2">تحتاج مساعدة؟</h3>
              <p className="text-gray-600 text-sm mb-4">فريق خدمة العملاء متاح لمساعدتك</p>
              <Button variant="primary" size="sm" className="w-full">
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
        {/* Rating Dialog */}
        <RatingDialog
          isOpen={ratingDialog}
          onClose={() => setRatingDialog(false)}
          product={{
            name: orderData.items[0]?.name || "",
            image: orderData.items[0]?.image || ""
          }}
          onSubmit={handleRatingSubmit}
        />

        {/* Reorder Dialog */}
        <ReorderDialog
          isOpen={reorderDialog}
          onClose={() => setReorderDialog(false)}
          orderItems={orderData.items}
          onReorder={handleReorderSubmit}
        />
      </div>
    </div>
      <Footer />
    </>
  )
}
