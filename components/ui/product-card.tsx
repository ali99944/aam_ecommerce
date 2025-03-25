"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: {
    id: number,
    name: string,
    category: string,
    price: number,
    oldPrice?: number,
    rating: number,
    reviewCount: number,
    image: string,
    isNew?: boolean,
    isBestSeller?: boolean,
    isDiscounted?: boolean,
    discount?: number,
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true }}
      transition={{ delay: product.id * 0.05 }}
      className="bg-white rounded-sm overflow-hidden border border-gray-100 group"
    >
      {/* Product Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={'https://img.freepik.com/premium-photo/battery-drill_101296-71.jpg?ga=GA1.1.259795667.1741285641&semt=ais_keywords_boost'}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Product Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-[#00998F] text-white text-xs font-bold px-2 py-0.5 rounded-sm">جديد</span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#83c5be] text-[#393e41] text-xs font-bold px-2 py-0.5 rounded-sm">
              الأكثر مبيعاً
            </span>
          )}
          {product.isDiscounted && (
            <span className="bg-gray-800 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
              خصم {product.discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 py-2 bg-[#D2EAE8] bg-opacity-50 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            className="w-7 h-7 rounded-sm bg-white flex items-center justify-center hover:bg-[#00998F] hover:text-white transition-colors"
            aria-label="إضافة للمفضلة"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            className="w-7 h-7 rounded-sm bg-white flex items-center justify-center hover:bg-[#00998F] hover:text-white transition-colors"
            aria-label="عرض سريع"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="w-7 h-7 rounded-sm bg-white flex items-center justify-center hover:bg-[#00998F] hover:text-white transition-colors"
            aria-label="إضافة للسلة"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold mb-1 group-hover:text-[#00998F] transition-colors">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) ? "text-[#00998F] fill-[#00998F]" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount ?? 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-md">{product.price} دينار</span>
          {product.oldPrice && (
            <span className="text-gray-400 text-sm line-through">{product.oldPrice} دينار</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
