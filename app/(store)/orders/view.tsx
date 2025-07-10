"use client"

import { useState } from "react"
import { Package, Eye, RotateCcw, Star, Truck, CheckCircle, Clock, X } from 'lucide-react'
import Button from "@/components/ui/button"
import Breadcrumb from "@/components/ui/breadcrumb"
import RatingDialog from "@/components/ui/dialogs/rating-dialog"
import ReorderDialog from "@/components/ui/dialogs/reorder-dialog"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useGetQuery } from "@/src/hooks/queries-actions"
import { Order } from "@/src/types/old"
import { PageLoadingSkeleton } from "@/components/ui/skeletons"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")

  const [ratingDialog, setRatingDialog] = useState<{ isOpen: boolean; order: Order | null }>({ isOpen: false, order: null })
  const [reorderDialog, setReorderDialog] = useState<{ isOpen: boolean; order: Order | null }>({ isOpen: false, order: null })

    const { data: orders, isFetching: is_orders_loading, error } = useGetQuery<Order[]>({
        url: 'orders',
        key: ['orders']
    })

    console.log(error);
    

//   const orders = [
//     {
//       id: "ORD-123456",
//       date: "2024-01-20",
//       status: "delivered", 
//       statusText: "تم التسليم",
//       total: 4999.0,
//       items: [
//         {
//           id: 1,
//           name: "آيفون 15 برو ماكس",
//           quantity: 1,
//           price: 4499.0,
//           image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=80&h=80&fit=crop"
//         },
//         {
//           id: 2,
//           name: "حافظة آيفون",
//           quantity: 1,
//           price: 500.0,
//           image: "/accessories/case.jpg"
//         }
//       ],
//       image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=80&h=80&fit=crop",
//       mainProduct: "آيفون 15 برو ماكس",
//     },
//     {
//       id: "ORD-123455",
//       date: "2024-01-18", 
//       status: "shipped",
//       statusText: "تم الشحن",
//       total: 8999.0,
//       items: [
//         {
//           id: 3,
//           name: "ماك بوك برو 14 إنش",
//           quantity: 1,
//           price: 8999.0,
//           image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=80&h=80&fit=crop"
//         }
//       ],
//       image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=80&h=80&fit=crop",
//       mainProduct: "ماك بوك برو 14 إنش",
//     },
//     {
//       id: "ORD-123454",
//       date: "2024-01-15",
//       status: "processing",
//       statusText: "قيد التحضير", 
//       total: 1599.0,
//       items: [
//         {
//           id: 4,
//           name: "ساعة آبل الجيل التاسع",
//           quantity: 1,
//           price: 999.0,
//           image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=80&h=80&fit=crop"
//         },
//         {
//           id: 5,
//           name: "حزام ساعة رياضي",
//           quantity: 1,
//           price: 300.0,
//           image: "/accessories/band.jpg"
//         },
//         {
//           id: 6,
//           name: "شاحن لاسلكي",
//           quantity: 1,
//           price: 300.0,
//           image: "/accessories/charger.jpg"
//         }
//       ],
//       image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=80&h=80&fit=crop",
//       mainProduct: "ساعة آبل الجيل التاسع",
//     },
//     {
//       id: "ORD-123453",
//       date: "2024-01-10",
//       status: "cancelled",
//       statusText: "ملغي",
//       total: 899.0,
//       items: [
//         {
//           id: 7,
//           name: "سماعات AirPods Pro",
//           quantity: 1,
//           price: 899.0,
//           image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=80&h=80&fit=crop"
//         }
//       ],
//       image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=80&h=80&fit=crop",
//       mainProduct: "سماعات AirPods Pro",
//     },
//   ]

  const handleRating = (order: Order) => {
    setRatingDialog({ isOpen: true, order })
  }

  const handleReorder = (order: Order) => {
    setReorderDialog({ isOpen: true, order })
  }

  const handleRatingSubmit = (rating: number, review: string) => {
    console.log('Rating submitted:', rating, review)
    // Handle rating submission
  }

  const handleReorderSubmit = (items: Array<{ id: number; quantity: number }>) => {
    console.log('Reorder submitted:', items)
    // Handle reorder submission
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "cancelled":
        return <X className="w-5 h-5 text-red-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders = orders?.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  const tabs = [
    { id: "all", label: "جميع الطلبات", count: orders?.length },
    { id: "processing", label: "قيد التحضير", count: orders?.filter((o) => o.status === "processing").length },
    // { id: "shipped", label: "تم الشحن", count: orders?.filter((o) => o.status === 'completed').length },
    { id: "delivered", label: "تم التسليم", count: orders?.filter((o) => o.status === 'completed').length },
  ]

  if(is_orders_loading){
    return <PageLoadingSkeleton />
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "طلباتي" }]} className="mb-6" />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">طلباتي</h1>
            <p className="text-gray-600">تتبع وإدارة جميع طلباتك</p>
          </div>
          <Package className="w-8 h-8 text-primary" />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg p-1 mb-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 rounded text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-primary text-white" : "text-gray-600 hover:text-primary"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders?.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-primary mb-2">لا توجد طلبات</h2>
            <p className="text-gray-600 mb-6">لم تقم بإجراء أي طلبات بعد</p>
            <Button variant="primary" size="sm">
              <Link href="/">ابدأ التسوق</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders?.map((order) => (
              <div key={order.id} className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={order.image || "/placeholder.svg"}
                      alt={order.mainProduct}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-bold text-primary mb-1">طلب رقم: {order.id}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {order.mainProduct} {order.items.length > 1 && `+ ${order.items.length - 1} منتج آخر`}
                      </p>
                      <p className="text-gray-500 text-sm">تاريخ الطلب: {order.date}</p>
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.statusText}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-primary">ريال {order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <Button variant="primary" size="sm" icon={Eye}>
                    <a href={`/orders/${order.id}`}>عرض التفاصيل</a>
                  </Button>

                  {order.status === "delivered" && (
                    <>
                      <Button variant="secondary" size="sm" icon={Star} onClick={() => handleRating(order)}>
                        تقييم المنتج
                      </Button>
                      <Button variant="secondary" size="sm" icon={RotateCcw} onClick={() => handleReorder(order)}>
                        إعادة الطلب
                      </Button>
                    </>
                  )}

                  {(order.status === "shipped" || order.status === "processing") && (
                    <Button variant="secondary" size="sm" icon={Truck}>
                      <a href={`/track-order?order=${order.id}`}>تتبع الطلب</a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rating Dialog */}
        <RatingDialog
          isOpen={ratingDialog.isOpen}
          onClose={() => setRatingDialog({ isOpen: false, order: null })}
          product={{
            name: ratingDialog.order?.mainProduct || "",
            image: ratingDialog.order?.image || ""
          }}
          onSubmit={handleRatingSubmit}
        />

        {/* Reorder Dialog */}
        <ReorderDialog
          isOpen={reorderDialog.isOpen}
          onClose={() => setReorderDialog({ isOpen: false, order: null })}
          orderItems={ratingDialog.order?.items || []}
          onReorder={handleReorderSubmit}
        />
      </div>
    </div>
      <Footer />
    </>
  )
}
