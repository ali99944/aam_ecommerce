// src/components/ui/product-card.tsx

"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from './button' // Assuming Button is separate
import { useMutationAction } from '@/src/providers/hooks/queries-actions' // Adjust path
import { useQueryClient } from '@tanstack/react-query'
import { getCartToken,} from '@/lib/cart-token' // Import cart token utils
import { AddToCartPayload, CartData, ProductSummary, ToggleFavoriteResponse } from '@/src/types'
import { useToast } from './toast'
import { AxiosError } from 'axios'

interface ProductCardProps {
  product: ProductSummary;
  // Optional: Pass initial favorite status if available from parent list query
  isInitiallyFavorited?: boolean;
}

export function ProductCard({ product, isInitiallyFavorited }: ProductCardProps) {
  const queryClient = useQueryClient();
  // const { isAuthenticated } = useAuth(); // Get auth status
  const { addToast } = useToast()

  // --- Add to Cart Mutation ---
  const { mutate: addToCart, isPending: isAddingToCart } = useMutationAction<CartData, AddToCartPayload>({
    url: '/cart',
    method: 'post',
    headers: { 
      'X-Cart-Token': getCartToken()
    },
    key: ['cart'], // Invalidate cart query on success
    onSuccessCallback: (data) => {
        addToast(`"${product.name}" added to cart!`, 'success')
        // Save guest token if received and user is guest
        if (!false && data.guest_cart_token) {
            // setCartToken(data.guest_cart_token == true);
        }
        // Optionally update cart state in parent or rely on query invalidation
    },
    onErrorCallback: (error) => {
        const errorMsg = (error.response?.data as AxiosError)?.message || error.message || 'Failed to add item to cart.';
        addToast(errorMsg, 'error')
        console.error("Add to cart error:", error.response?.data || error);
    }
  })

  // --- Toggle Favorite Mutation ---
  const { mutate: toggleFavorite, isPending: isTogglingFavorite } = useMutationAction<ToggleFavoriteResponse, void>({
      url: `/products/${product.id}/favorite`, // Use the correct endpoint
      method: 'post',
      key: ['product', product.id], // Invalidate specific product query if needed
      onSuccessCallback: (data) => {
          addToast(data.message, 'success')
          // Update favorite status in relevant queries (e.g., product lists, detail pages)
          queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate main product list
          // Potentially update the single product query if viewing details
          // queryClient.invalidateQueries({ queryKey: ['product', product.id] });
          // Optionally update local state if passed down via props or context
      },
      onErrorCallback: (error) => {
         // Handle cases like not being authenticated
         if (error.response?.status === 401) {
             addToast("Please log in to add favorites.", 'error');
             // Optionally redirect to login: router.push('/login');
         } else {
            const errorMsg = (error.response?.data as AxiosError)?.message || 'Failed to update favorites.';
            addToast(errorMsg, 'error');
         }
         console.error("Toggle favorite error:", error.response?.data || error);
      }
  })

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
     e.stopPropagation(); // Prevent navigating if card itself is a link
     e.preventDefault();
     addToCart({ product_id: product.id, quantity: 1 });
  };

   const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
     e.stopPropagation();
     e.preventDefault();
     if (!false) {
         addToast("Please log in to add favorites.", 'error');
         // Optionally redirect or show login modal
         return;
     }
     toggleFavorite(); // No payload needed for toggle usually
   };

  // Note: isFavorited status should ideally come from the API data
  // We use isInitiallyFavorited as a prop for now, but ideally the API response includes it
  const isFavorited = isInitiallyFavorited ?? false; // Placeholder logic

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true }}
      // transition={{ delay: product.id * 0.05 }} // Delay can cause layout shifts, use carefully
      className="bg-white rounded-sm overflow-hidden border border-gray-100 group relative flex flex-col h-full" // Added relative, flex, h-full
    >
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block relative h-44 overflow-hidden">
        <Image
          src={product.main_image_url || "/images/placeholder-product.png"} // Use placeholder
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" // Responsive image sizes
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {/* Product Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
            {/* Example Badges - Get these from product data if available */}
          {/* {product.isNew && (...)} */}
          {/* {product.isDiscounted && (...)} */}
        </div>
      </Link>

        {/* Quick Actions - Absolutely positioned within the card */}
       <div className="absolute top-2 left-2 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
                variant="outline"
                size="sm"
                className="w-12 h-12  rounded-full bg-white  hover:bg-[#00998F] hover:text-white"
                icon={Heart}
                aria-label="إضافة للمفضلة"
                onClick={handleToggleFavorite}
                disabled={isTogglingFavorite}
                title={isFavorited ? "إزالة من المفضلة" : "إضافة للمفضلة"}
            > </Button>
            {/* Remove Quick View or implement modal logic */}
            {/* <Button variant="outline" size="icon" className="w-8 h-8 rounded-full bg-white shadow-md hover:bg-[#00998F] hover:text-white" aria-label="عرض سريع"> <Eye className="w-4 h-4" /> </Button> */}
        </div>


      {/* Product Info */}
      <div className="p-3 flex flex-col flex-grow"> {/* flex-grow added */}
        {/* Category/Brand (Optional) */}
        {/* <div className="text-xs text-gray-500 mb-1">{product.brand?.name}</div> */}

        <Link href={`/product/${product.id}`} className="block mb-1 group-hover:text-[#00998F] transition-colors">
          <h3 className="font-bold text-sm line-clamp-2">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2 text-xs">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${ i < Math.floor(product.rating ?? 0) ? "text-[#00998F] fill-[#00998F]" : "text-gray-300" }`} />
            ))}
          </div>
          <span className="text-gray-500">({product.reviewCount ?? 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-bold text-md text-[#00998F]">{product.sell_price} دينار</span>
          {product.oldPrice && (
            <span className="text-gray-400 text-xs line-through">{product.oldPrice} دينار</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
            size="sm"
            className="w-full mt-auto" // Push button to bottom
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock <= 0 || product.status !== 'active'}
            icon={isAddingToCart ? Loader2 : ShoppingBag}
            // iconClassName={isAddingToCart ? 'animate-spin' : ''}
            iconPosition="right"
        >
            {product.stock == 0 || product.status != 'active' ? "نفذت الكمية" : isAddingToCart ? 'جاري الإضافة...' : 'إضافة للسلة'}
        </Button>
      </div>
    </motion.div>
  )
}