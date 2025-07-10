"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Check, Star, Share2, Trash2, Loader2 } from "lucide-react"
import Button from "../ui/button"
import { useCart } from "@/src/redux/hooks-operations/use-cart"
import { useNotifications } from "@/src/hooks/use-notification"
import { Product } from "@/src/types"
import { useMutationAction } from "@/src/hooks/queries-actions"


interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)


  const { addToCart, loading, isItemInCart, getItemQuantity } = useCart()
  const { notify } = useNotifications()

  const itemQuantity = getItemQuantity(product.id)
  const inCart = isItemInCart(product.id)

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1)
    } catch (error) {
      notify.error(error as string)
    }
  }

  const toggleFavoriteAction = useMutationAction({
    method: 'post',
    url: `products/${product.id}/favorite`
  })

  const handleToggleWishlist = async () => {
    await toggleFavoriteAction.mutateAsync({}, {
      onSuccess() {
        setIsWishlisted(!isWishlisted)
        notify.success('تم اضافة الي المفضلة')
      },

      onError() {
        setIsWishlisted(false)
        notify.error("failed to add product to favorite")
      }
    })
  }

  const isOutOfStock = product.stock !== undefined && product.stock <= 0
  // const isOutOfStock = true

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl overflow-hidden transition-shadow group  ${className}`}
      dir="rtl"
    >
      <div className="relative">
        <img
          // src={product.image || "/placeholder.svg"}
          src={"/image/product-placeholder.png"}
          alt={product.name}
          className="w-full h-48 object-cover object-center"
        />
        {product.badge && (
          <span
            className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold text-white rounded ${
              product.discount ? "bg-red-500" : "bg-accent"
            }`}
          >
            {product.badge}
          </span>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">نفد المخزون</span>
          </div>
        )}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-red-50 transition-colors"
        >
          {
            toggleFavoriteAction.isPending ? (
                <Loader2 className="animate-spin text-red-500 w-4 h-4 transform transition-all duration-300" />
            ): (
              isWishlisted ? (
              <Trash2
                className={`w-4 h-4 transition-colors text-red-500`}
              />
            ) : (
              <Heart
                className={`w-4 h-4 transition-colors text-red-500 `}
              />
            )
            )
          }
        </button>
      </div>

      <div className="px-3 py-2">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-primary mb-2 line-clamp-2">{product.name}</h3>

        { (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < 4.7! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            {<span className="text-sm text-gray-500">4.7</span>}
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-red-500">ريال {(+(product.sell_price ?? 0)).toFixed(2)}</span>
          {/* {product.original_price && (
            <span className="text-sm text-gray-400 line-through">ريال {(product.original_price ?? 0).toFixed(2)}</span>
          )} */}
        </div>

        {/* Stock info */}
        {/* {product.stock !== undefined && (
          <div className="mb-3">
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-sm text-orange-600">متبقي {product.stock} قطع فقط</p>
            )}
          </div>
        )} */}

        {/* Show quantity if item is in cart */}
        {inCart && (
          <div className="mb-3 p-2 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 flex items-center gap-1">
              <Check className="w-4 h-4" />
              في السلة ({itemQuantity} قطعة)
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            icon={inCart ? Check : ShoppingCart}
            onClick={handleAddToCart}
            disabled={loading || isOutOfStock}
            loading={loading}
          >
            {inCart ? "أضف المزيد" : "أضف للسلة"}
          </Button>

          <Button variant="secondary" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        
      </div>
    </div>
  )
}
