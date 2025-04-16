/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Minus, Plus, Star, StarHalf, ChevronRight } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button, IconButton } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ProductCard } from "@/components/ui/product-card"
import { useParams } from "next/navigation"
import { Tabs } from "@/components/ui/tabs"
import { useGetQuery } from "@/src/providers/hooks/queries-actions"
import { getCartToken, setCartToken } from "@/lib/cart-token"
import { useToast } from "@/components/ui/toast"
import { AddToCartPayload, CartData, ProductAddon, ToggleFavoriteResponse } from "@/src/types"
import { useMutationAction } from '@/src/providers/hooks/queries-actions' // Adjust path
import { AxiosError } from "axios"


// --- Helper Function for Image URLs ---
// You might need to adjust this based on your actual API setup
const getImageUrl = (path: string | null): string => {
  if (!path) return "/placeholder.svg?text=No+Image" // Fallback placeholder
  // Assuming relative paths need a base URL
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""; // Set this in your .env.local
  return `${baseUrl}/${path.startsWith('/') ? path.substring(1) : path}`;
}

// --- Type Definitions based on API Response ---
interface ProductImage {
  id: number;
  src: string;
  created_at?: string; // Optional fields
  updated_at?: string; // Optional fields
}

interface ProductSpec {
  id: number;
  name: string;
  value: string;
  is_active?: boolean; // Optional fields
  created_at?: string; // Optional fields
  updated_at?: string; // Optional fields
}

// Addon type (if needed later)
// interface ProductAddon {
//   id: number;
//   name: string;
//   price: number;
//   is_active: boolean;
// }

interface Brand {
  id: number;
  name: string;
  image: string | null;
  total_products?: number; // Optional fields
  created_at?: string; // Optional fields
  updated_at?: string; // Optional fields
}

interface Category {
  id: number;
  name: string;
  description?: string; // Optional fields
  is_active?: boolean; // Optional fields
  is_featured?: string; // Optional fields
  total_sub_categories?: number; // Optional fields
  cover_image?: string | null; // Optional fields
  icon_image?: string | null; // Optional fields
  created_at?: string; // Optional fields
  updated_at?: string; // Optional fields
}

interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  description?: string; // Optional fields
  cover_image?: string | null; // Optional fields
  icon_image?: string | null; // Optional fields
  is_active?: boolean; // Optional fields
  total_products?: number; // Optional fields
  created_at?: string; // Optional fields
  updated_at?: string; // Optional fields
  category: Category; // Nested category
}

interface ProductApiResponse {
  id: number;
  name: string;
  description: string;
  main_image: string | null;
  cost_price: string; // Keep as string as per API
  sell_price: string; // Keep as string as per API
  total_views: number;
  favorites_views: number; // Note: API has this, might be useful later
  stock: number;
  lower_stock_warn: number;
  favorites_count: number;
  sku_code: string; // Renamed from product_code
  overall_rating: string; // Keep as string as per API
  total_rating: string; // Keep as string as per API
  sub_category_id: number;
  brand_id: number | null;
  discount_id: number | null; // Ignored for now
  status: string;
  is_public: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  brand: Brand | null;
  sub_category: SubCategory;
  discount: unknown[] | null; // Ignored for now
  images: ProductImage[];
  specs: ProductSpec[];
  addons: ProductAddon[]; // Assuming type 'any' for now, can be refined if needed
  // NOTE: feedback and related_products are NOT in this response structure
}

// --- Mock Data (Kept for Related Products & Feedback for now) ---
const getMockRelatedProducts = () => {
  // ... (same mock data as before)
    return [
    {
      id: 1,
      title: "مثقاب كهربائي بوش GSB 10 RE",
      price: 85.00,
      image: "/placeholder.svg?height=300&width=300",
      discount: 10,
      isNew: false
    },
    {
      id: 2,
      title: "مفك كهربائي بوش GSR 12V",
      price: 95.00,
      image: "/placeholder.svg?height=300&width=300",
      discount: null,
      isNew: true
    },
    {
      id: 3,
      title: "منشار دائري بوش GKS 190",
      price: 150.00,
      image: "/placeholder.svg?height=300&width=300",
      discount: null,
      isNew: false
    },
    {
      id: 4,
      title: "جلاخة زاوية بوش GWS 7-125",
      price: 110.00,
      image: "/placeholder.svg?height=300&width=300",
      discount: 5,
      isNew: false
    }
  ]
};

const getMockFeedback = () => {
  return [
    { id: 1, product_id: 1, message: "منتج ممتاز وقوي جداً، أنصح به للاستخدام المنزلي والمهني", rating: 5, user_name: "أحمد محمد", date: "2023-10-15" },
    { id: 2, product_id: 1, message: "جودة عالية ومتانة في الاستخدام، لكن السعر مرتفع قليلاً", rating: 4, user_name: "خالد العمري", date: "2023-09-22" },
    { id: 3, product_id: 1, message: "خفيف الوزن وسهل الاستخدام، أداء ممتاز", rating: 5, user_name: "محمد السعيد", date: "2023-08-30" }
  ];
}

// --- Helper function to create slug ---
const createSlug = (text: string) => {
    if (!text) return ""
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  }

export default function ProductPage() {
  // Local UI state
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Mock state (to be replaced if API provides this data)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [mockFeedback, setMockFeedback] = useState<any[]>([]); // Using mock feedback

  const { id } = useParams();
  const { addToast } = useToast()

    // --- Add to Cart Mutation ---
    const { mutate: addToCart } = useMutationAction<CartData, AddToCartPayload>({
      url: '/cart',
      method: 'post',
      headers: { 
        'X-Cart-Token': getCartToken()
      },
      key: ['cart'], // Invalidate cart query on success
      onSuccessCallback: (data) => {
          addToast(`تم الاضافة الي السلة`, 'success')
          // Save guest token if received and user is guest
          if (!false && data.guest_cart_token) {
              setCartToken(data.guest_cart_token);
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
      const { mutate: toggleFavorite } = useMutationAction<ToggleFavoriteResponse, void>({
          url: `/products/${id}/favorite`, // Use the correct endpoint
          method: 'post',
          key: ['product', id], // Invalidate specific product query if needed
          onSuccessCallback: (data) => {
              addToast(data.message, 'success')
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
        addToCart({ product_id: +id!, quantity: 1 });
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
   

  // Fetch product data using the hook
  const {
    data: productData,
    isLoading,
    error: fetchError,
  } = useGetQuery<ProductApiResponse>({
    url: `products/${id}`,
    key: ["product", id as string], // Ensure ID is passed to key
    options: {
      enabled: !!id, // Only fetch if ID is available
    }
  });

  // Fetch mock related products and feedback (replace later if needed)
  useEffect(() => {
    setRelatedProducts(getMockRelatedProducts());
    setMockFeedback(getMockFeedback());
  }, []);

  // --- Derived State & Memoization ---

  // Combine main image and gallery images for display
  const galleryImages = useMemo(() => {
    if (!productData) return [];
    const images = productData.images?.map(img => ({ id: `gallery-${img.id}`, src: getImageUrl(img.src) })) || [];
    // Add main image to the start if it exists and isn't already in the gallery
    if (productData.main_image && !images.some(img => img.src === getImageUrl(productData.main_image))) {
      return [{ id: 'main', src: getImageUrl(productData.main_image) }, ...images];
    }
    return images;
  }, [productData]);

  // Get the currently selected image source
  const currentImageSrc = useMemo(() => {
    return galleryImages[selectedImageIndex]?.src || getImageUrl(null); // Fallback if index is out of bounds
  }, [galleryImages, selectedImageIndex]);

  // Parse numeric values safely
  const sellingPrice = useMemo(() => productData ? parseFloat(productData.sell_price) || 0 : 0, [productData]);
  const overallRating = useMemo(() => productData ? parseFloat(productData.overall_rating) || 0 : 0, [productData]);
  const stock = useMemo(() => productData?.stock || 0, [productData]);

  // --- Event Handlers ---
  const handleQuantityChange = (value: number) => {
    const maxStock = stock; // Use derived stock value
    if (value >= 1 && value <= maxStock) {
      setQuantity(value);
    }
  };

  // --- Rendering Stars --- (Handles parsed rating)
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 fill-[#01988F] text-[#01988F]" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 fill-[#01988F] text-[#01988F]" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-5 w-5 text-gray-300" />);
    }

    return stars;
  };

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            {/* Simplified Pulse Animation */}
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                   <div className="h-96 bg-gray-200 rounded"></div>
                   <div className="flex gap-2">
                       <div className="h-20 w-20 bg-gray-200 rounded"></div>
                       <div className="h-20 w-20 bg-gray-200 rounded"></div>
                       <div className="h-20 w-20 bg-gray-200 rounded"></div>
                       <div className="h-20 w-20 bg-gray-200 rounded"></div>
                   </div>
                </div>
                <div className="space-y-5">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-200 rounded w-full"></div>
                   <div className="h-6 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
               <div className="h-40 bg-gray-200 rounded w-full mb-12"></div>
               <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                 {[...Array(4)].map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded"></div>)}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Error State ---
  if (fetchError || !productData) {
    const errorMessage = fetchError ? (fetchError as Error).message || "فشل في جلب بيانات المنتج" : "المنتج غير موجود";
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">{errorMessage}</h1>
            <p className="mb-6">عذراً، لم نتمكن من العثور على المنتج المطلوب أو حدث خطأ.</p>
            <Button>
               <Link href="/products">تصفح المنتجات</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Data Loaded State ---
  const categorySlug = createSlug(productData.sub_category.category.name)
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "المنتجات", href: "/products" },
              // Link to the main category page
              { label: productData.sub_category.category.name, href: `/category/${categorySlug}` },
               // Link to the sub-category page (optional, needs sub-category slug logic)
               // { label: productData.sub_category.name, href: `/category/${categorySlug}/${createSlug(productData.sub_category.name)}` },
              { label: productData.name } // Current product
            ]}
            className="mb-6"
          />

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative h-96 border border-gray-200 rounded-sm overflow-hidden">
                {/* Discount Badge Removed */}
                <Image
                  src={currentImageSrc} // Use derived current image source
                  alt={productData.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain" // Use contain to show full image, or cover
                  priority // Prioritize loading the main image
                  onError={(e) => { e.currentTarget.src = getImageUrl(null); }} // Fallback on error
                />
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && ( // Only show thumbnails if more than one image
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {galleryImages.map((image, index) => (
                    <button
                      key={image.id}
                      className={`relative h-20 w-20 border rounded-sm overflow-hidden flex-shrink-0 ${
                        selectedImageIndex === index ? 'border-[#00998F]' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={image.src}
                        alt={`${productData.name} - صورة ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                        onError={(e) => { e.currentTarget.src = getImageUrl(null); }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{productData.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderStars(overallRating)} {/* Use parsed rating */}
                </div>
                <span className="text-sm text-gray-600">
                   ({overallRating.toFixed(1)}) - {productData.total_rating || mockFeedback.length} تقييم {/* Use API total_rating or fallback to mock count */}
                </span>
              </div>

              {/* SKU */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">رمز المنتج:</span>
                <span className="text-sm font-medium">{productData.sku_code}</span>
              </div>

              {/* Brand (Optional) */}
               {productData.brand && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">العلامة التجارية:</span>
                   <Link href={`/brands/${productData.brand.id}`} className="text-sm font-medium text-[#00998F] hover:underline">
                       {productData.brand.name}
                   </Link>
                </div>
               )}

              {/* Price */}
              <div className="flex items-center gap-4">
                 {/* Removed discount logic */}
                 <span className="text-2xl font-bold text-[#00998F]">
                   {sellingPrice.toFixed(2)} دينار {/* Use parsed price */}
                 </span>
              </div>

              {/* Description */}
              <div className="border-t border-b border-gray-200 py-4">
                <p className="text-gray-700 leading-relaxed">
                  {productData.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">الكمية:</span>
                <div className="flex items-center border border-gray-200 rounded-sm">
                  <button
                    className="px-3 py-2 text-gray-600 hover:text-[#00998F] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 text-center w-10" aria-live="polite">{quantity}</span>
                  <button
                    className="px-3 py-2 text-gray-600 hover:text-[#00998F] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= stock} // Use parsed stock
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {/* Stock Status */}
                <span className={`text-sm ${stock > productData.lower_stock_warn ? 'text-green-600' : stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
                  {stock > productData.lower_stock_warn
                    ? 'متوفر في المخزون'
                    : stock > 0
                      ? `متبقي ${stock} فقط`
                      : 'غير متوفر حالياً'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleAddToCart}
                  icon={ShoppingCart}
                  iconPosition="right"
                  className="flex-grow sm:flex-grow-0" // Adjust grow behavior
                  disabled={stock <= 0} // Disable if out of stock
                >
                  {stock <= 0 ? 'غير متوفر' : 'إضافة للسلة'}
                </Button>

                {/* <Button
                  variant="secondary"
                  className="flex-grow sm:flex-grow-0" // Adjust grow behavior
                   disabled={stock <= 0}
                >
                  شراء الآن
                </Button> */}

                <IconButton
                  icon={Heart}
                  variant="outline"
                  onClick={handleToggleFavorite}
                  label={isInWishlist ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                  size="lg"
                   className={isInWishlist ? 'text-red-500 border-red-300 hover:bg-red-50' : ''}
                />

              </div>

            </div>
          </div>

          {/* Tabs */}
          <Tabs
            tabs={[
              { id: "description", label: "الوصف" },
              { id: "specifications", label: "المواصفات" },
              { id: "reviews", label: `التقييمات (${productData.total_rating || mockFeedback.length})` } // Use API rating count or mock
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            className="mb-12"
          >
            {/* Tab Content: Description */}
            {activeTab === "description" && (
              <div className="py-6 prose max-w-none"> {/* Added prose for potential markdown */}
                <p>{productData.description}</p>
              </div>
            )}

            {/* Tab Content: Specifications */}
            {activeTab === "specifications" && (
              <div className="py-6">
                {productData.specs && productData.specs.length > 0 ? (
                   <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <tbody className="divide-y">
                        {productData.specs.map((spec: ProductSpec) => (
                            <tr key={spec.id} className="bg-white even:bg-gray-50">
                            <th scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap w-1/3">
                                {spec.name}
                            </th>
                            <td className="px-6 py-3">
                                {spec.value}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                   </div>
                ) : (
                  <p className="text-gray-500">لا توجد مواصفات متاحة لهذا المنتج.</p>
                )}
              </div>
            )}

            {/* Tab Content: Reviews (Using Mock Data) */}
            {activeTab === "reviews" && (
              <div className="py-6">
                <div className="mb-8 p-4 border rounded-md bg-gray-50">
                  <h3 className="text-lg font-semibold mb-3">ملخص التقييمات</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex">
                      {renderStars(overallRating)} {/* Use parsed overall rating */}
                    </div>
                    <span className="text-xl font-bold">
                      {overallRating.toFixed(1)}
                    </span>
                     <span className="text-sm text-gray-600">
                      من 5 نجوم | ({productData.total_rating || mockFeedback.length} تقييم) {/* Use API count or mock */}
                    </span>
                  </div>
                  {/* Add Rating Breakdown bars here if needed */}
                  <Button
                    variant="outline"
                    onClick={() => { /* Add Review Modal/Form Logic */ }}
                    className="mt-2"
                  >
                    أضف تقييمك
                  </Button>
                </div>

                <h3 className="text-lg font-semibold mb-4">آراء العملاء ({mockFeedback.length})</h3>
                 {mockFeedback.length > 0 ? (
                    <div className="space-y-6">
                    {mockFeedback.map((review: any) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{review.user_name}</span>
                            <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('ar-EG')}</span>
                        </div>
                        <div className="flex mb-2">
                            {renderStars(review.rating)}
                        </div>
                        <p className="text-gray-700 text-sm">{review.message}</p>
                        </div>
                    ))}
                    </div>
                 ) : (
                    <p className="text-gray-500">لا توجد تقييمات لهذا المنتج حتى الآن. كن أول من يضيف تقييم!</p>
                 )}
              </div>
            )}
          </Tabs>

          {/* Related Products (Using Mock Data) */}
          {relatedProducts.length > 0 && (
            <div className="mb-12">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
                    منتجات قد تعجبك أيضاً
                  </h2>
                   {/* Optional: Link to category/subcategory */}
                   <Link href={`/category/${categorySlug}`} className="text-[#00998F] text-sm flex items-center gap-1 hover:underline">
                      عرض المزيد <ChevronRight className="h-4 w-4" />
                   </Link>
               </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((relatedProd) => (
                  <ProductCard
                    key={relatedProd.id}
                    // Pass data in the expected format for ProductCard
                     product={{
                        id: relatedProd.id,
                        name: relatedProd.title,
                        sell_price: relatedProd.price.toFixed(2), // Format price
                        discount_percentage: relatedProd.discount, // Pass discount percentage
                        discount_price: 1,
                        category_name: '',
                        brand_name: '',
                        brand: {
                          id: 1,
                          name: "gfsg"
                        },
                        price: 55,
                        is_in_stock: true,
                        main_image_url: '',
                        sku_code: 'Efdg',
                        stock: 20,
                        status: 'active',
                        is_featured: true,
                        // Add other fields required by ProductCard, potentially faking them
                        overall_rating: 4.5, // Example static rating
                        discount: 50, // Adapt discount format
                        is_new: relatedProd.isNew, // Pass isNew flag if needed
                    }}
                  />
                ))}
              </div>
            </div>
           )}
        </div>
      </main>

      <Footer />
    </div>
  );
}