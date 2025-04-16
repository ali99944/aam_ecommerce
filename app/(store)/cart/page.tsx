"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react" // Added React import
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, RefreshCw, AlertCircle, HomeIcon, Loader2, CheckCircle } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button, IconButton } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Banner } from "@/components/ui/banner"
import { EmptyState } from "@/components/ui/empty-state"
import { useGetQuery, useMutationAction } from "@/src/providers/hooks/queries-actions"
import { getCartToken, setCartToken, removeCartToken } from '@/lib/cart-token'
import { debounce } from 'lodash'
import { useQueryClient } from "@tanstack/react-query"
import { selectAuthToken, selectIsAuthenticated } from "@/src/store/slices/auth-slice"
import { useAppDispatch, useAppSelector } from "@/src/store/hook"
import { CartData } from "@/src/types"
import { useToast } from "@/components/ui/toast"
// --- Redux Imports ---
// ---------------------

export default function CartPage() {
  const router = useRouter()
  const dispatch = useAppDispatch(); // Get dispatch function if needed for actions

  // --- Get Auth State from Redux ---
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authToken = useAppSelector(selectAuthToken); // Get token for potential direct use if needed

  console.log("isAuthenticated", isAuthenticated);
  console.log("authToken", authToken);
  
  
  // ----------------------------------

  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [showCouponError, setShowCouponError] = useState(false)
  const [guestCartToken, setGuestCartToken] = useState<string | null>(null)

  // Get initial guest token only if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
        setGuestCartToken(getCartToken())
    } else {
        setGuestCartToken(null) // Clear guest token if user is logged in
    }
  }, [isAuthenticated])

  // --- Determine Headers for API Calls ---
  const apiHeaders = useMemo(() => {
      // Auth token takes precedence (Axios interceptor should handle this)
      // Guest token is fallback
      if (guestCartToken) {
          return { 'X-Cart-Token': guestCartToken };
      }
      return {}; // Let Axios interceptor handle auth token
  }, [guestCartToken]); // Depend only on guestCartToken here

  // --- API Call to fetch Cart Data ---
  const { data: cartData, isLoading: isLoadingCart, error: cartError, refetch: refetchCart } = useGetQuery<CartData>({
    url: '/cart',
    key: ['cart', guestCartToken, isAuthenticated], // Include isAuthenticated in key
    headers: apiHeaders,
    options: {
        enabled: !!guestCartToken || isAuthenticated, // Fetch only if identified
        // staleTime: 1 * 60 * 1000, // Shorter stale time for cart? 1 min
        refetchOnWindowFocus: true,
        // initialData: { data: [], total: 0, subtotal: 0, guest_cart_token: null },
    },
  })

  // Handle cart token from API response for guests
   useEffect(() => {
       if (!isAuthenticated && cartData?.guest_cart_token && cartData.guest_cart_token !== guestCartToken) {
           setGuestCartToken(cartData.guest_cart_token);
           setCartToken(cartData.guest_cart_token);
       }
   }, [cartData, isAuthenticated, guestCartToken]);


   // --- API Mutations (Update URLs if needed) ---

   const { addToast } = useToast()

   // Update Item Quantity
   const { mutate: updateItemQuantity, isPending: isUpdatingQuantity } = useMutationAction<CartData, { cartItemId: number; quantity: number }>({
     url: `/cart/items/`, // Base URL, ID added dynamically later
        method: 'put',
        key: ['cart'],
        onSuccessCallback: (updatedCartData) => {
             // Update guest token if necessary
             if (!isAuthenticated && updatedCartData.guest_cart_token) setCartToken(updatedCartData.guest_cart_token);
             // addToast("Quantity updated.") // Maybe too noisy
        },
        onErrorCallback: (error) => {
             addToast(error.response?.data?.message || "Failed to update quantity.", 'error')
        }
    });
    const [selectedCartItemId, setSelectedCartItemId] = useState<number | null>(null)

    // Remove Item
    const { mutate: removeItem, isPending: isRemovingItem } = useMutationAction<CartData>({
        url: `cart/items/${selectedCartItemId}`, // Base URL
        method: 'delete',
        key: ['cart'],
        headers: apiHeaders,
        onErrorCallback: (error) => {
             addToast(error.response?.data?.message || "Failed to remove item.", 'error')
        }
    });

     // Clear Cart
    const { mutate: clearCart, isPending: isClearingCart } = useMutationAction<CartData, void>({
        url: `/cart`,
        method: 'delete',
        key: ['cart'],
        onSuccessCallback: (updatedCartData) => {
             if (!isAuthenticated && updatedCartData.guest_cart_token) setCartToken(updatedCartData.guest_cart_token);
            addToast("Cart cleared.", 'success')
        },
         onErrorCallback: (error) => {
             addToast(error.response?.data?.message || "Failed to clear cart.", 'error')
        }
    });


  // --- Event Handlers ---

  // Debounced quantity update (modified to pass headers)
  const debouncedUpdateQuantity = useCallback(
    debounce((cartItemId: number, quantity: number) => {
        updateItemQuantity({ cartItemId, quantity }, {
            // Pass dynamic URL part if hook is modified, or rely on invalidation
            // url: `/cart/items/${cartItemId}`, // Example if hook supported dynamic URL parts
            headers: apiHeaders // Pass relevant headers for the request
        });
    }, 750),
    [updateItemQuantity, apiHeaders] // Add apiHeaders as dependency
  );


  const handleQuantityChange = (id: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    const item = cartData?.data.find(item => item.id === id);
    if (item && newQuantity > (item.product?.stock ?? 0)) {
        addToast(`Only ${item.product?.stock ?? 0} items available for "${item.product?.name ?? 'Product'}"`, 'warning');
        return;
    }
    debouncedUpdateQuantity(id, newQuantity);
  }


  const handleRemoveItem = (id: number) => {
    setSelectedCartItemId(id)
    console.log(selectedCartItemId);
    removeItem(undefined, {});
    
  }

  const handleClearCart = () => {
    if (confirm("Are you sure you want to empty your cart?")) {
       clearCart(undefined); // Pass undefined for void payload
    }
  }

  // Coupon handler remains client-side for now
  const handleApplyCoupon = () => { /* ... same as before ... */ }

  // --- Calculations ---
  const subtotal = cartData?.subtotal ?? 0;
  const shipping = subtotal > 50 ? 0 : 5; // Keep simple shipping logic
  const discount = couponApplied ? (subtotal * couponDiscount / 100) : 0;
  const total = cartData?.total ?? 0;
  const cartItems = cartData?.data ?? [];

  

  // --- Render Logic ---
  // Loading skeleton and error handling remain similar

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb & Title */}
           <Breadcrumb items={[{ label: "الرئيسية", href: "/", icon: HomeIcon }, { label: "سلة التسوق" }]} className="mb-6" />
           <h1 className="text-2xl font-bold mb-6">سلة التسوق</h1>

           {/* Loading State */}
           {isLoadingCart && !cartData && (
               <div className="text-center py-16">
                    <Loader2 className="h-12 w-12 animate-spin text-[#00998F] mx-auto" />
                    <p className="mt-4 text-gray-600">جاري تحميل السلة...</p>
               </div>
           )}

            {/* Error State */}
           {cartError && !isLoadingCart && (
                 <div className="py-16">
                     <Banner message={`Error loading cart: ${cartError.message || 'Please try again.'}`} variant="error" />
                     <div className="text-center mt-4">
                         <Button onClick={() => refetchCart()} icon={RefreshCw} iconPosition="right">Retry</Button>
                     </div>
                 </div>
           )}

            {/* Empty State */}
            {!isLoadingCart && cartItems.length === 0 && (
                <EmptyState title="سلة التسوق فارغة" description="ابدأ بإضافة بعض المنتجات الرائعة!" icon={ShoppingBag} action={{ label: "تصفح المنتجات", onClick: () => router.push('/products') }} className="py-16"/>
            )}

            {/* Cart Content */}
            {!isLoadingCart && cartItems.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden mb-6">
                            {/* Header & Clear Button */}
                             <div className="flex justify-between items-center p-4 bg-[#D2EAE8]/80">
                                <Button variant="ghost" size="sm" onClick={handleClearCart} icon={Trash2} iconPosition="right" disabled={isClearingCart}>
                                {isClearingCart ? <Loader2 className="h-4 w-4 animate-spin mr-1"/> : null}
                                {isClearingCart ? 'جاري...' : 'إفراغ السلة'}
                                </Button>
                                <span className="text-sm font-medium">{cartItems.length} منتجات</span>
                             </div>
                             {/* Items */}
                             <div className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4 relative">
                                        {/* Item Updating Overlay */}
                                        {/* Use item-specific loading if mutation provides item ID */}
                                        {(isUpdatingQuantity || isRemovingItem) && (
                                            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 rounded-sm">
                                                <Loader2 className="h-6 w-6 animate-spin text-gray-500"/>
                                            </div>
                                        )}
                                        {/* Rest of item rendering (Image, Name, Price, Quantity Controls, Remove Button) */}
                                         <div className="relative h-24 w-24 flex-shrink-0 self-center sm:self-start">
                                            <Image src={item.product?.main_image_url || "/images/placeholder-product.png"} alt={item.product?.name ?? 'Product'} fill className="object-contain border rounded-sm" />
                                         </div>
                                          <div className="flex-1">
                                            {/* ... Name, Price ... */}
                                             <Link href={`/product/${item.product.id}`} className="font-medium hover:text-[#00998F] mb-1 text-sm sm:text-base line-clamp-2">
                                                {item.product?.name ?? 'Product Name Unavailable'}
                                            </Link>
                                            <div className="text-xs text-gray-500 mb-2"> رمز المنتج: {item.product?.sku_code ?? 'N/A'} </div>
                                             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
                                                <div className="flex items-center border border-gray-200 rounded-sm mb-2 sm:mb-0">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity, -1)} disabled={item.quantity <= 1 || isUpdatingQuantity}><Minus className="h-4 w-4" /></Button>
                                                    <span className="px-3 text-sm font-medium w-10 text-center">{item.quantity}</span>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity, +1)} disabled={item.quantity >= (item.product?.stock ?? 0) || isUpdatingQuantity}><Plus className="h-4 w-4" /></Button>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                     <div className="text-sm sm:text-base font-bold text-[#00998F]">
                                                        {item.line_total.toFixed(2)} دينار
                                                    </div>
                                                    <IconButton icon={Trash2} variant="ghost" onClick={() => handleRemoveItem(item.id)} label="إزالة" disabled={isRemovingItem} className="text-gray-500 hover:text-red-500"/>
                                                </div>
                                             </div>
                                             {item.quantity >= (item.product?.stock ?? 0) && <p className="text-xs text-red-500 mt-1">الحد الأقصى للكمية المتوفرة</p>}
                                          </div>

                                    </div>
                                ))}
                             </div>
                        </div>
                         {/* Continue Shopping / Checkout Buttons */}
                         <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <Button variant="outline" icon={ArrowLeft} iconPosition="right" onClick={() => router.push('/products')}> متابعة التسوق </Button>
                            <Button icon={ShoppingBag} iconPosition="right" onClick={() => router.push('/cart/checkout')} disabled={cartItems.length === 0}> إتمام الطلب </Button>
                        </div>
                    </div>
                    {/* Order Summary & Coupon */}
                    <div>
                         <div className="bg-white border border-gray-200 rounded-sm overflow-hidden mb-6 sticky top-4">
                             {/* ... Summary content (Subtotal, Shipping, Discount, Total) ... */}
                                <div className="p-4 border-b border-gray-200 bg-[#D2EAE8]/80"><h2 className="font-bold text-lg">ملخص الطلب</h2></div>
                                <div className="p-4 space-y-4">
                                    <div className="flex justify-between"> <span className="text-gray-600">المجموع الفرعي:</span> <span className="font-medium">{subtotal.toFixed(2)} دينار</span> </div>
                                    {/* <div className="flex justify-between"> <span className="text-gray-600">الشحن (مقدر):</span> <span className="font-medium"> {shipping === 0 ? 'مجاني' : `${shipping.toFixed(2)} دينار`} </span> </div> */}
                                    {couponApplied && ( <div className="flex justify-between text-green-600"><span>خصم الكوبون:</span><span>- {discount.toFixed(2)} دينار</span></div> )}
                                    <Button className="w-full mt-2" onClick={() => router.push('/cart/checkout')} disabled={cartItems.length === 0}> الانتقال للدفع </Button>
                                </div>
                         </div>
                          {/* Coupon Code Section */}
                          {/* <div className="bg-white border border-gray-200 rounded-sm overflow-hidden mb-6">
                             <div className="p-4 border-b border-gray-200 bg-[#D2EAE8]/80"><h2 className="font-bold text-md">كوبون الخصم</h2></div>
                             <div className="p-4">
                                 <div className="flex gap-2 mb-2">
                                    <Input placeholder="أدخل كود الكوبون" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                                    <Button onClick={handleApplyCoupon} variant="secondary" disabled={!couponCode}> تطبيق </Button>
                                 </div>
                                 {showCouponError && ( <div className="text-red-500 text-sm"> كود الكوبون غير صالح </div> )}
                                 {couponApplied && ( <div className="text-green-600 text-sm flex items-center gap-1"> <CheckCircle className="h-4 w-4" /> تم تطبيق الخصم بنجاح </div> )}
                             </div>
                         </div> */}
                    </div>
                </div>
            )}

        </div>
      </main>
      <Footer />
    </div>
  )
}