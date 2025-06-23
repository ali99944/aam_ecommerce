"use client"

import { useState } from "react"
import { Star, X } from 'lucide-react'
import Button from "../button"
import Dialog from "../dialog"
import Textarea from "../textarea"

interface RatingDialogProps {
  isOpen: boolean
  onClose: () => void
  product: {
    name: string
    image: string
  }
  onSubmit: (rating: number, review: string) => void
}

export default function RatingDialog({ isOpen, onClose, product, onSubmit }: RatingDialogProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    onSubmit(rating, review)
    setIsSubmitting(false)
    onClose()
    setRating(0)
    setReview("")
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return "سيء جداً"
      case 2: return "سيء"
      case 3: return "متوسط"
      case 4: return "جيد"
      case 5: return "ممتاز"
      default: return "اختر التقييم"
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className=" rounded-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[var(--primary)]">تقييم المنتج</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            <h3 className="font-medium text-[var(--primary)]">{product.name}</h3>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">كيف تقيم هذا المنتج؟</p>
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm font-medium text-[var(--primary)]">
            {getRatingText(hoveredRating || rating)}
          </p>
        </div>

        {/* Review Text */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اكتب تقييمك (اختياري)
          </label>
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="شاركنا رأيك في المنتج..."
            rows={4}
            className="w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={rating === 0}
          >
            إرسال التقييم
          </Button>
          <Button variant="secondary" size="sm" onClick={onClose}>
            إلغاء
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
