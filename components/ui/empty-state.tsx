"use client"

import type React from "react"

import { ShoppingCart, Search, Package, Heart, FileText, Construction, AlertTriangle, Wifi, RefreshCw, Plus, Filter, Star, Bell, MessageCircle, BarChart3, Mail, ImageIcon, Download, Clock, Settings } from 'lucide-react'
import Button from "./button"

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
    variant?: "primary" | "secondary"
  }
  className?: string
}

// Base Empty State Component
export function EmptyState({ title, description, icon, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`text-center py-16 px-4 ${className}`}>
      <div className="max-w-md mx-auto">
        {icon && (
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">{icon}</div>
        )}
        <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
        {action && (
          <Button variant={action.variant || "primary"} size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}

// Empty Cart
export function EmptyCart({ onStartShopping }: { onStartShopping?: () => void }) {
  return (
    <EmptyState
      icon={<ShoppingCart className="w-12 h-12 text-gray-400" />}
      title="سلة التسوق فارغة"
      description="لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. ابدأ التسوق واكتشف منتجاتنا المميزة."
      action={
        onStartShopping
          ? {
              label: "ابدأ التسوق",
              onClick: onStartShopping,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Empty Search Results
export function EmptySearchResults({ searchTerm, onClearSearch }: { searchTerm?: string; onClearSearch?: () => void }) {
  return (
    <EmptyState
      icon={<Search className="w-12 h-12 text-gray-400" />}
      title="لا توجد نتائج"
      description={
        searchTerm
          ? `لم نجد أي منتجات تطابق "${searchTerm}". جرب البحث بكلمات مختلفة أو تصفح الفئات.`
          : "لم نجد أي منتجات تطابق بحثك. جرب البحث بكلمات مختلفة أو تصفح الفئات."
      }
      action={
        onClearSearch
          ? {
              label: "مسح البحث",
              onClick: onClearSearch,
              variant: "secondary",
            }
          : undefined
      }
    />
  )
}

// Empty Wishlist
export function EmptyWishlist({ onBrowseProducts }: { onBrowseProducts?: () => void }) {
  return (
    <EmptyState
      icon={<Heart className="w-12 h-12 text-gray-400" />}
      title="قائمة الأمنيات فارغة"
      description="لم تقم بحفظ أي منتجات في قائمة الأمنيات بعد. احفظ المنتجات المفضلة لديك للعودة إليها لاحقاً."
      action={
        onBrowseProducts
          ? {
              label: "تصفح المنتجات",
              onClick: onBrowseProducts,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// No Products in Category
export function EmptyCategory({
  categoryName,
  onViewAllProducts,
}: { categoryName?: string; onViewAllProducts?: () => void }) {
  return (
    <EmptyState
      icon={<Package className="w-12 h-12 text-gray-400" />}
      title="لا توجد فئات"
      description={
        categoryName
          ? `لا توجد فئات في فئة "${categoryName}" حالياً. تحقق من الفئات الأخرى أو عد لاحقاً.`
          : "لا توجد فئات في هذه الفئة حالياً. تحقق من الفئات الأخرى أو عد لاحقاً."
      }
      action={
        onViewAllProducts
          ? {
              label: "عرض جميع الفئات",
              onClick: onViewAllProducts,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Empty Blog/Articles
export function EmptyBlog({ onCreatePost }: { onCreatePost?: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="w-12 h-12 text-gray-400" />}
      title="لا توجد مقالات"
      description="لم يتم نشر أي مقالات بعد. تابعنا للحصول على أحدث المقالات والنصائح المفيدة."
      action={
        onCreatePost
          ? {
              label: "إنشاء مقال جديد",
              onClick: onCreatePost,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Under Construction
export function UnderConstruction({ expectedDate }: { expectedDate?: string }) {
  return (
    <EmptyState
      icon={<Construction className="w-12 h-12 text-yellow-500" />}
      title="الصفحة قيد الإنشاء"
      description={
        expectedDate
          ? `نعمل حالياً على تطوير هذه الصفحة. متوقع الانتهاء في ${expectedDate}.`
          : "نعمل حالياً على تطوير هذه الصفحة. سنقوم بإشعارك عند اكتمالها."
      }
    />
  )
}

// Error State
export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      icon={<AlertTriangle className="w-12 h-12 text-red-500" />}
      title="حدث خطأ"
      description="عذراً، حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى."
      action={
        onRetry
          ? {
              label: "إعادة المحاولة",
              onClick: onRetry,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// No Internet Connection
export function NoConnection({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      icon={<Wifi className="w-12 h-12 text-gray-400" />}
      title="لا يوجد اتصال بالإنترنت"
      description="تحقق من اتصالك بالإنترنت وحاول مرة أخرى."
      action={
        onRetry
          ? {
              label: "إعادة المحاولة",
              onClick: onRetry,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Loading State
export function LoadingState({ message = "جاري التحميل..." }: { message?: string }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <RefreshCw className="w-12 h-12 text-primary animate-spin" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-4">{message}</h3>
        <p className="text-gray-600">يرجى الانتظار قليلاً...</p>
      </div>
    </div>
  )
}

// Empty Filters Result
export function EmptyFiltersResult({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState
      icon={<Filter className="w-12 h-12 text-gray-400" />}
      title="لا توجد نتائج للفلاتر المحددة"
      description="لم نجد أي منتجات تطابق الفلاتر المحددة. جرب تعديل الفلاتر أو إزالة بعضها."
      action={
        onClearFilters
          ? {
              label: "مسح الفلاتر",
              onClick: onClearFilters,
              variant: "secondary",
            }
          : undefined
      }
    />
  )
}

// Empty Reviews
export function EmptyReviews({ onWriteReview }: { onWriteReview?: () => void }) {
  return (
    <EmptyState
      icon={<Star className="w-12 h-12 text-gray-400" />}
      title="لا توجد تقييمات"
      description="لم يتم تقييم هذا المنتج بعد. كن أول من يكتب تقييماً لمساعدة الآخرين."
      action={
        onWriteReview
          ? {
              label: "اكتب تقييماً",
              onClick: onWriteReview,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Coming Soon
export function ComingSoon({ feature, date }: { feature?: string; date?: string }) {
  return (
    <EmptyState
      icon={<Plus className="w-12 h-12 text-primary" />}
      title="قريباً"
      description={
        feature && date
          ? `${feature} ستكون متاحة قريباً في ${date}.`
          : feature
            ? `${feature} ستكون متاحة قريباً.`
            : "هذه الميزة ستكون متاحة قريباً."
      }
    />
  )
}

// Empty Notifications
export function EmptyNotifications({ onEnableNotifications }: { onEnableNotifications?: () => void }) {
  return (
    <EmptyState
      icon={<Bell className="w-12 h-12 text-gray-400" />}
      title="لا توجد إشعارات"
      description="لم تتلق أي إشعارات بعد. سنقوم بإشعارك عند وجود تحديثات مهمة."
      action={
        onEnableNotifications
          ? {
              label: "تفعيل الإشعارات",
              onClick: onEnableNotifications,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Empty Orders
export function EmptyOrders({ onStartShopping }: { onStartShopping?: () => void }) {
  return (
    <EmptyState
      icon={<Package className="w-12 h-12 text-gray-400" />}
      title="لا توجد طلبات"
      description="لم تقم بأي طلبات بعد. ابدأ التسوق واطلب منتجاتك المفضلة."
      action={
        onStartShopping
          ? {
              label: "ابدأ التسوق",
              onClick: onStartShopping,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Empty Comments
export function EmptyComments({ onWriteComment }: { onWriteComment?: () => void }) {
  return (
    <EmptyState
      icon={<MessageCircle className="w-12 h-12 text-gray-400" />}
      title="لا توجد تعليقات"
      description="لم يتم إضافة أي تعليقات بعد. كن أول من يشارك رأيه."
      action={
        onWriteComment
          ? {
              label: "اكتب تعليقاً",
              onClick: onWriteComment,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Empty Dashboard
export function EmptyDashboard({ onSetupDashboard }: { onSetupDashboard?: () => void }) {
  return (
    <EmptyState
      icon={<BarChart3 className="w-12 h-12 text-gray-400" />}
      title="لوحة التحكم فارغة"
      description="لا توجد بيانات لعرضها في لوحة التحكم. ابدأ بإضافة بعض المحتوى."
      action={
        onSetupDashboard
          ? {
              label: "إعداد لوحة التحكم",
              onClick: onSetupDashboard,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Empty Inbox
export function EmptyInbox({ onSendMessage }: { onSendMessage?: () => void }) {
  return (
    <EmptyState
      icon={<Mail className="w-12 h-12 text-gray-400" />}
      title="صندوق الوارد فارغ"
      description="لا توجد رسائل في صندوق الوارد. جميع رسائلك ستظهر هنا."
      action={
        onSendMessage
          ? {
              label: "إرسال رسالة",
              onClick: onSendMessage,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Empty Gallery
export function EmptyGallery({ onUploadImages }: { onUploadImages?: () => void }) {
  return (
    <EmptyState
      icon={<ImageIcon className="w-12 h-12 text-gray-400" />}
      title="المعرض فارغ"
      description="لم يتم رفع أي صور بعد. ابدأ برفع صورك لإنشاء معرض جميل."
      action={
        onUploadImages
          ? {
              label: "رفع صور",
              onClick: onUploadImages,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Empty Downloads
export function EmptyDownloads({ onBrowseFiles }: { onBrowseFiles?: () => void }) {
  return (
    <EmptyState
      icon={<Download className="w-12 h-12 text-gray-400" />}
      title="لا توجد تحميلات"
      description="لم تقم بتحميل أي ملفات بعد. جميع تحميلاتك ستظهر هنا."
      action={
        onBrowseFiles
          ? {
              label: "تصفح الملفات",
              onClick: onBrowseFiles,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Empty Favorites
export function EmptyFavorites({ onExploreFavorites }: { onExploreFavorites?: () => void }) {
  return (
    <EmptyState
      icon={<Star className="w-12 h-12 text-gray-400" />}
      title="لا توجد مفضلات"
      description="لم تقم بإضافة أي عناصر إلى المفضلة. احفظ العناصر التي تعجبك هنا."
      action={
        onExploreFavorites
          ? {
              label: "استكشف المحتوى",
              onClick: onExploreFavorites,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Empty History
export function EmptyHistory({ onStartBrowsing }: { onStartBrowsing?: () => void }) {
  return (
    <EmptyState
      icon={<Clock className="w-12 h-12 text-gray-400" />}
      title="لا يوجد تاريخ"
      description="لا يوجد تاريخ تصفح أو نشاط سابق. ابدأ باستخدام الموقع لرؤية تاريخك هنا."
      action={
        onStartBrowsing
          ? {
              label: "ابدأ التصفح",
              onClick: onStartBrowsing,
              variant: "primary",
            }
          : undefined
      }
    />
  )
}

// Maintenance Mode
export function MaintenanceMode({ estimatedTime }: { estimatedTime?: string }) {
  return (
    <EmptyState
      icon={<Settings className="w-12 h-12 text-orange-500" />}
      title="الموقع قيد الصيانة"
      description={
        estimatedTime
          ? `نقوم حالياً بصيانة الموقع لتحسين الخدمة. الوقت المتوقع للانتهاء: ${estimatedTime}`
          : "نقوم حالياً بصيانة الموقع لتحسين الخدمة. سنعود قريباً."
      }
    />
  )
}
