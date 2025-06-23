"use client"

import { useState } from "react"
import { Star, X } from 'lucide-react'
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Textarea from "@/components/ui/textarea"
import Dialog from "../dialog"

interface WriteReviewDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (review: { rating: number; comment: string; userName: string }) => void
}

export default function WriteReviewDialog({ isOpen, onClose, onSubmit }: WriteReviewDialogProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [userName, setUserName] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating > 0 && comment.trim() && userName.trim()) {
      onSubmit({ rating, comment: comment.trim(), userName: userName.trim() })
      setRating(0)
      setComment("")
      setUserName("")
      onClose()
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
        <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[var(--primary)]">نشر تقييمك</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">التقييم</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم</label>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="أدخل اسمك"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">التعليق</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتب تقييمك هنا..."
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" size="sm" className="flex-1">
              نشر التقييم
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              إلغاء
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}
