"use client"

import { useState } from "react"
import { X, Star, Package, Truck, HeadphonesIcon, ShoppingBag } from 'lucide-react'
import Button from "../button"
import Textarea from "../textarea"
import Dialog from "../dialog"

interface StoreRatingDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (ratings: RatingData, review: string) => void
}

interface RatingData {
  overall: number
  products: number
  service: number
  delivery: number
  website: number
}

const ratingCategories = [
  {
    key: "overall" as keyof RatingData,
    label: "التقييم العام",
    icon: Star,
    description: "تقييمك العام للمتجر"
  },
  {
    key: "products" as keyof RatingData,
    label: "جودة المنتجات",
    icon: Package,
    description: "مدى رضاك عن جودة المنتجات"
  },
  {
    key: "service" as keyof RatingData,
    label: "خدمة العملاء",
    icon: HeadphonesIcon,
    description: "تقييم خدمة العملاء والدعم"
  },
  {
    key: "delivery" as keyof RatingData,
    label: "سرعة التوصيل",
    icon: Truck,
    description: "مدى رضاك عن سرعة التوصيل"
  },
  {
    key: "website" as keyof RatingData,
    label: "سهولة الاستخدام",
    icon: ShoppingBag,
    description: "تقييم سهولة استخدام الموقع"
  }
]

export default function StoreRatingDialog({ isOpen, onClose, onSubmit }: StoreRatingDialogProps) {
  const [ratings, setRatings] = useState<RatingData>({
    overall: 0,
    products: 0,
    service: 0,
    delivery: 0,
    website: 0
  })
  const [review, setReview] = useState("")
  const [hoveredRating, setHoveredRating] = useState<{ category: keyof RatingData; value: number } | null>(null)

  const handleRatingChange = (category: keyof RatingData, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }))
  }

  const handleSubmit = () => {
    onSubmit(ratings, review)
    // Reset form
    setRatings({
      overall: 0,
      products: 0,
      service: 0,
      delivery: 0,
      website: 0
    })
    setReview("")
  }

  const renderStars = (category: keyof RatingData) => {
    const currentRating = ratings[category]
    const hovered = hoveredRating?.category === category ? hoveredRating.value : 0

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="p-1 transition-transform hover:scale-110"
            onMouseEnter={() => setHoveredRating({ category, value: star })}
            onMouseLeave={() => setHoveredRating(null)}
            onClick={() => handleRatingChange(category, star)}
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                star <= (hovered || currentRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const isFormValid = Object.values(ratings).some(rating => rating > 0)

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Dialog */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary)]">تقييم المتجر</h2>
                  <p className="text-gray-600 mt-1">شاركنا رأيك لتحسين خدماتنا</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="space-y-8">
                  {/* Rating Categories */}
                  {ratingCategories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <div key={category.key} className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[var(--primary)]/10 rounded-lg">
                            <IconComponent className="w-5 h-5 text-[var(--primary)]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{category.label}</h3>
                            <p className="text-sm text-gray-600">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          {renderStars(category.key)}
                          <span className="text-sm text-gray-500 min-w-[60px] text-left">
                            {ratings[category.key] > 0 ? `${ratings[category.key]}/5` : "غير مقيم"}
                          </span>
                        </div>
                      </div>
                    )
                  })}

                  {/* Review Text */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">تعليق إضافي (اختياري)</h3>
                    <Textarea
                      placeholder="شاركنا تجربتك مع المتجر وأي اقتراحات للتحسين..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onClose}
                >
                  إلغاء
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                >
                  إرسال التقييم
                </Button>
              </div>
            </div>
          </div>
        </>
    </Dialog>
  )
}
