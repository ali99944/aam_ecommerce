"use client"

import type React from "react"

import { useState } from "react"
import { Star, X } from "lucide-react"
import Button from "../button"

interface WriteReviewDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (review: { rating: number; comment: string }) => void
  loading?: boolean
}

export default function WriteReviewDialog({ isOpen, onClose, onSubmit, loading = false }: WriteReviewDialogProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) return

    onSubmit({ rating, comment })

    // Reset form
    setRating(0)
    setHoveredRating(0)
    setComment("")
  }

  const handleClose = () => {
    setRating(0)
    setHoveredRating(0)
    setComment("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-primary">اكتب تقييمك</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">التقييم *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                  disabled={loading}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {rating === 1 && "سيء جداً"}
                {rating === 2 && "سيء"}
                {rating === 3 && "متوسط"}
                {rating === 4 && "جيد"}
                {rating === 5 && "ممتاز"}
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التعليق</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="شاركنا رأيك في المنتج..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              disabled={loading}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleClose}
              disabled={loading}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={rating === 0 || loading}
              loading={loading}
              className="flex-1"
            >
              نشر التقييم
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
