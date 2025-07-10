"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Heart, Share2, ShoppingCart, Star, MessageSquare, Eye, Users, Package, Shield } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import Tabs from "@/components/ui/tabs"
import ImageGallery from "@/components/ui/image-gallery"
import QuantitySelector from "@/components/ui/quantity-selector"
import ReviewCard from "@/components/ui/review-card"
import ProductCard from "@/components/custom/product-card"
import Breadcrumb from "@/components/ui/breadcrumb"
import PaymentMethods from "@/components/ui/payment-methods"
import WriteReviewDialog from "@/components/ui/dialogs/write-review-dialog"
import { useGetQuery, useMutationAction } from "@/src/hooks/queries-actions"
import { useNotifications } from "@/src/hooks/use-notification"
import { useCart } from "@/src/redux/hooks-operations/use-cart"


// Types
interface Product {
  id: number
  name: string
  description: string
  main_image: string
  cost_price: string
  sell_price: string
  total_views: number
  favorites_views: number
  stock: number
  lower_stock_warn: number
  favorites_count: number
  sku_code: string
  barcode: string | null
  overall_rating: string
  total_rating: number
  sub_category_id: number
  brand_id: number
  discount_id: number | null
  status: string
  is_public: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  brand: {
    id: number
    name: string
    image: string
    total_products: number
  }
  sub_category: {
    id: number
    category_id: number
    name: string
    description: string
    category: {
      id: number
      name: string
      description: string
      slug: string
    }
  }
  discount: any[]
  images: string[]
  specs: Array<{
    id: number
    name: string
    value: string
  }>
  addons: any[]
  feedbacks: Feedback[]
}

interface Feedback {
  id: number
  customer_id: number
  rating: number
  comment: string
  created_at: string
  customer: {
    id: number
    first_name: string
    last_name: string
  }
}

interface RelatedProduct {
  id: number
  name: string
  main_image: string
  sell_price: string
  overall_rating: string
  total_rating: number
  brand: {
    name: string
  }
}

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = params.id as string

  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false)
  const [reviewsPage, setReviewsPage] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const { addToCart, loading: cartLoading } = useCart()
  const { notify } = useNotifications()

  // Fetch product details
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch: refetchProduct,
  } = useGetQuery<Product>({
    key: ["product", productId],
    url: `products/${productId}`,
  })

  // Fetch related products
  const { data: relatedProducts, isLoading: relatedLoading } = useGetQuery<RelatedProduct[]>({
    key: ["related-products", productId],
    url: `products/${productId}/related`,
    options: {
      enabled: !!productId,
    },
  })

  // Create feedback mutation
  const createFeedbackMutation = useMutationAction({
    method: "post",
    url: `products/${productId}/feedbacks`,
    onSuccessCallback: () => {
      notify.success("تم إضافة تقييمك بنجاح")
      setIsWriteReviewOpen(false)
      refetchProduct()
    },
    onErrorCallback: (error: any) => {
      notify.error(error.response?.data?.message || "حدث خطأ أثناء إضافة التقييم")
    },
  })

  // Add to wishlist mutation
  const toggleWishlistMutation = useMutationAction({
    method: isWishlisted ? "delete" : "post",
    url: isWishlisted ? `wishlist/${productId}` : "wishlist",
    onSuccessCallback: () => {
      setIsWishlisted(!isWishlisted)
      notify.success(isWishlisted ? "تم إزالة المنتج من المفضلة" : "تم إضافة المنتج للمفضلة")
    },
    onErrorCallback: (error: any) => {
      notify.error(error.response?.data?.message || "حدث خطأ")
    },
  })

  const reviewsPerPage = 5

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  const handleAddToCart = async () => {
    if (!product) return
    try {
      await addToCart(product.id, quantity)
    } catch (error) {
      // Error handled by useCart hook
    }
  }

  const handleToggleWishlist = () => {
    if (!product) return
    toggleWishlistMutation.mutate(isWishlisted ? {} : { product_id: product.id })
  }

  const handleShareProduct = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      notify.success("تم نسخ رابط المنتج")
    }
  }

  const handleSubmitReview = (reviewData: { rating: number; comment: string }) => {
    createFeedbackMutation.mutate(reviewData)
  }

  if (productLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="aspect-square bg-gray-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (productError || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">المنتج غير موجود</h1>
            <p className="text-gray-600 mb-6">عذراً، لم نتمكن من العثور على المنتج المطلوب</p>
            <Button variant="primary" size="sm">
              العودة للمنتجات
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Prepare images for gallery
  // const galleryImages = product.images.length > 0 ? product.images : [product.main_image]
  const galleryImages = product.images.length > 0 ? product.images : [product.main_image]

  // Calculate discount percentage
  const discountPercentage =
    product.discount?.length > 0
      ? Math.round(
          ((Number.parseFloat(product.cost_price) - Number.parseFloat(product.sell_price)) /
            Number.parseFloat(product.cost_price)) *
            100,
        )
      : 0

  const tabs = [
    {
      id: "description",
      label: "الوصف",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">وصف المنتج</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {product.specs.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">المواصفات</h3>
              <div className="space-y-3">
                {product.specs.map((spec) => (
                  <div key={spec.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{spec.name}</span>
                    <span className="text-gray-700">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">{product.total_views}</div>
              <div className="text-sm text-gray-600">مشاهدة</div>
            </div>
            <div className="text-center">
              <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">{product.favorites_count}</div>
              <div className="text-sm text-gray-600">إعجاب</div>
            </div>
            <div className="text-center">
              <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">
                {Number.parseFloat(product.overall_rating).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">التقييم</div>
            </div>
            <div className="text-center">
              <Package className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">{product.stock}</div>
              <div className="text-sm text-gray-600">متوفر</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "specifications",
      label: "التفاصيل",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">معلومات المنتج</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-900">رمز المنتج</span>
                <span className="text-gray-700 font-mono">{product.sku_code}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-900">العلامة التجارية</span>
                <span className="text-gray-700">{product.brand.name}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-900">الفئة</span>
                <span className="text-gray-700">
                  {product.sub_category.category.name} - {product.sub_category.name}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-900">الكمية المتاحة</span>
                <span className="text-gray-700">{product.stock} قطعة</span>
              </div>
              {product.barcode && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-900">الباركود</span>
                  <span className="text-gray-700 font-mono">{product.barcode}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "reviews",
      label: `التقييمات (${(product.feedbacks ?? []).length})`,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    {Number.parseFloat(product.overall_rating).toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center mt-1">
                    {renderStars(Math.floor(Number.parseFloat(product.overall_rating)))}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{product.total_rating} تقييم</div>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = (product.feedbacks ?? []).filter((f) => f.rating === stars).length
                    const percentage = (product.feedbacks ?? []).length > 0 ? (count / (product.feedbacks ?? []).length) * 100 : 0
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm w-8">{stars}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <Button variant="primary" size="sm" icon={MessageSquare} onClick={() => setIsWriteReviewOpen(true)}>
                اكتب تقييمك
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {(product.feedbacks ?? []).slice(0, reviewsPage * reviewsPerPage).map((feedback) => (
              <ReviewCard
                key={feedback.id}
                review={{
                  id: feedback.id,
                  userName: `${feedback.customer.first_name} ${feedback.customer.last_name}`,
                  rating: feedback.rating,
                  date: new Date(feedback.created_at).toLocaleDateString("ar-SA"),
                  comment: feedback.comment,
                  helpful: 0,
                  verified: true,
                }}
              />
            ))}
          </div>

          {(product.feedbacks ?? []).length > reviewsPage * reviewsPerPage && (
            <div className="flex justify-center">
              <Button variant="secondary" size="sm" onClick={() => setReviewsPage((prev) => prev + 1)}>
                عرض المزيد
              </Button>
            </div>
          )}

          {(product.feedbacks ?? []).length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد تقييمات بعد</h3>
              <p className="text-gray-600 mb-4">كن أول من يقيم هذا المنتج</p>
              <Button variant="primary" size="sm" onClick={() => setIsWriteReviewOpen(true)}>
                اكتب أول تقييم
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "المنتجات", href: "/products" },
            {
              label: product.sub_category.category.name,
              href: `/products?category=${product.sub_category.category.slug}`,
            },
            { label: product.sub_category.name, href: `/products?subcategory=${product.sub_category.id}` },
            { label: product.name },
          ]}
          variant="light"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
          {/* Product Images */}
          <div>
            <ImageGallery images={galleryImages} productName={product.name} discount={discountPercentage} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white p-4 rounded-xl ">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">{product.brand.name}</span>
                <span className="text-sm text-gray-300">•</span>
                <span className="text-sm text-gray-500">{product.sub_category.name}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(Math.floor(Number.parseFloat(product.overall_rating)))}
                  <span className="text-sm text-gray-600">({product.total_rating} تقييم)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>{product.total_views} مشاهدة</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-red-500">
                  {Number.parseFloat(product.sell_price).toFixed(2)} ريال
                </span>
                {discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {Number.parseFloat(product.cost_price).toFixed(2)} ريال
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded">
                      خصم {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">متوفر في المخزون ({product.stock} قطعة)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium">غير متوفر حالياً</span>
                  </div>
                )}

                {product.stock <= product.lower_stock_warn && product.stock > 0 && (
                  <p className="text-sm text-orange-600 mt-1">الكمية محدودة - اطلب الآن!</p>
                )}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="bg-white p-4 rounded-xl ">
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-3">الكمية</h3>
                  <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                    max={product.stock}
                    className="bg-white h-12"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="sm"
                  icon={ShoppingCart}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || cartLoading}
                  loading={cartLoading}
                  className="w-full"
                >
                  أضف إلى السلة
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Heart}
                    onClick={handleToggleWishlist}
                    loading={toggleWishlistMutation.isPending}
                    className={`flex-1 ${isWishlisted ? "text-red-500 border-red-500" : ""}`}
                  >
                    {isWishlisted ? "مضاف للمفضلة" : "أضف للمفضلة"}
                  </Button>
                  <Button variant="secondary" size="sm" icon={Share2} onClick={handleShareProduct} className="flex-1">
                    مشاركة
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white p-4 rounded-xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-gray-600">ضمان الجودة</p>
                </div>
                <div>
                  <Package className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-gray-600">شحن سريع</p>
                </div>
                <div>
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-gray-600">دعم 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 mb-12">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="p-4" />
        </div>

        {/* Payment Methods */}
        <PaymentMethods />

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary mb-8">منتجات ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={{
                    id: relatedProduct.id,
                    name: relatedProduct.name,
                    category: relatedProduct.brand.name,
                    image: relatedProduct.main_image,
                    image: relatedProduct.main_image,
                    price: Number.parseFloat(relatedProduct.sell_price),
                    rating: Number.parseFloat(relatedProduct.overall_rating),
                    reviewCount: relatedProduct.total_rating,
                  }}
                  showRating={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Write Review Dialog */}
        <WriteReviewDialog
          isOpen={isWriteReviewOpen}
          onClose={() => setIsWriteReviewOpen(false)}
          onSubmit={handleSubmitReview}
          loading={createFeedbackMutation.isPending}
        />
      </div>

      <Footer />
    </div>
  )
}
