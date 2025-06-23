"use client"

import { useState } from "react"
import { Heart, Share2Icon, ShoppingCart, Star } from 'lucide-react'
import Button from "../ui/button"

interface Product {
  id: number
  name: string
  category: string
  image: string
  price: number
  originalPrice?: number
  discount?: number | null
  badge?: string
  rating?: number
  reviewCount?: number
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
  showRating?: boolean
  className?: string
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  showRating = false,
  className = "" 
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    onAddToCart?.(product)
  }

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    onToggleWishlist?.(product)
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden  transition-shadow group ${className}`}>
      <div className="relative">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover  transition-transform duration-300"
        />
        {product.badge && (
          <span
            className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold text-white rounded ${
              product.discount ? "bg-red-500" : "bg-[var(--accent)]"
            }`}
          >
            {product.badge}
          </span>
        )}
        <button 
          onClick={handleToggleWishlist}
          className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-red-50 transition-colors"
        >
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}`} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-[var(--primary)] mb-2 line-clamp-2">{product.name}</h3>

        {showRating && product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {product.reviewCount && (
              <span className="text-sm text-gray-500">({product.reviewCount})</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-red-500">ريال {product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">ريال {product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            variant="primary" 
            size="sm" 
            className="flex-1" 
            icon={ShoppingCart}
            onClick={handleAddToCart}
          >
            أضف للسلة
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            icon={Share2Icon}
            onClick={handleToggleWishlist}
            className={isWishlisted ? 'text-red-500 border-red-500' : ''}
          />
        </div>
      </div>
    </div>
  )
}
