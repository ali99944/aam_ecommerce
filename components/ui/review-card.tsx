"use client"

import { Star, ThumbsUp } from 'lucide-react'

interface Review {
  id: number
  userName: string
  rating: number
  date: string
  comment: string
  helpful: number
  verified: boolean
}

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {review.userName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
              {review.verified && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  مشتري موثق
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              {renderStars(review.rating)}
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--primary)] transition-colors">
          <ThumbsUp className="w-4 h-4" />
          <span>مفيد ({review.helpful})</span>
        </button>
      </div>
    </div>
  )
}
