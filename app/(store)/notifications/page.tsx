"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Package, Heart, Star, Gift, AlertCircle, CheckCircle, Clock, Trash2 } from "lucide-react"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import Badge from "@/components/ui/badge"
import Navbar from "@/components/navbar"

interface Notification {
  id: string
  type: "order" | "wishlist" | "review" | "promotion" | "system"
  title: string
  message: string
  time: string
  read: boolean
  icon: React.ComponentType<any>
  color: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "تم شحن طلبك",
    message: "طلبك رقم #12345 تم شحنه وسيصل خلال 2-3 أيام عمل",
    time: "منذ ساعة",
    read: false,
    icon: Package,
    color: "text-blue-600",
  },
  {
    id: "2",
    type: "promotion",
    title: "عرض خاص لك!",
    message: "خصم 25% على جميع الإلكترونيات - العرض ينتهي خلال 24 ساعة",
    time: "منذ 3 ساعات",
    read: false,
    icon: Gift,
    color: "text-green-600",
  },
  {
    id: "3",
    type: "wishlist",
    title: "منتج في قائمة الأمنيات متوفر الآن",
    message: "آيفون 14 برو الذي أضفته لقائمة الأمنيات أصبح متوفراً",
    time: "منذ 5 ساعات",
    read: true,
    icon: Heart,
    color: "text-red-600",
  },
  {
    id: "4",
    type: "review",
    title: "تقييم منتجك",
    message: "لا تنس تقييم سماعات أبل إيربودز التي اشتريتها مؤخراً",
    time: "منذ يوم",
    read: true,
    icon: Star,
    color: "text-yellow-600",
  },
  {
    id: "5",
    type: "order",
    title: "تم تأكيد طلبك",
    message: "طلبك رقم #12344 تم تأكيده وسيتم تحضيره للشحن",
    time: "منذ يومين",
    read: true,
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: "6",
    type: "system",
    title: "تحديث سياسة الخصوصية",
    message: "تم تحديث سياسة الخصوصية الخاصة بنا، يرجى مراجعتها",
    time: "منذ 3 أيام",
    read: true,
    icon: AlertCircle,
    color: "text-gray-600",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.read
    return true
  })

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      order: "طلب",
      wishlist: "المفضلة",
      review: "تقييم",
      promotion: "عرض",
      system: "نظام",
    }
    return labels[type as keyof typeof labels] || type
  }

  const getTypeColor = (type: string) => {
    const colors = {
      order: "bg-primary text-white",
      wishlist: "bg-red-100 text-red-800",
      review: "bg-yellow-100 text-yellow-800",
      promotion: "text-white",
      system: "text-white",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">الإشعارات</h1>
              <p className="text-gray-600">
                {unreadCount > 0 ? `لديك ${unreadCount} إشعار غير مقروء` : "جميع الإشعارات مقروءة"}
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <Button variant="secondary" size="sm" onClick={markAllAsRead}>
              تحديد الكل كمقروء
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 cursor-pointer  font-medium transition-colors ${
              filter === "all" ? "bg-primary text-white" : "bg-white !text-gray-600 hover:bg-gray-50"
            }`}
          >
            جميع الإشعارات ({notifications.length})
          </Button>
          <Button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 cursor-pointer  font-medium transition-colors ${
              filter === "unread" ? "bg-primary text-black" : "bg-white !text-gray-600 hover:bg-gray-50"
            }`}
          >
            غير المقروءة ({unreadCount})
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const IconComponent = notification.icon
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl p-4  transition-all  ${
                    !notification.read ? "border-primary/20 bg-primary/5" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full bg-gray-100 ${notification.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                            <Badge className={getTypeColor(notification.type)}>{getTypeLabel(notification.type)}</Badge>
                            {!notification.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                          </div>
                          <p className="text-gray-600 mb-3">{notification.message}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{notification.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button variant="secondary" size="sm" onClick={() => markAsRead(notification.id)}>
                              تحديد كمقروء
                            </Button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {filter === "unread" ? "لا توجد إشعارات غير مقروءة" : "لا توجد إشعارات"}
              </h3>
              <p className="text-gray-600">
                {filter === "unread" ? "جميع إشعاراتك مقروءة" : "ستظهر إشعاراتك هنا عند وصولها"}
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
