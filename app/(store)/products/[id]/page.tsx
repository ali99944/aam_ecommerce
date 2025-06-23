"use client"

import { useState } from "react"
import { Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw, CheckCircle, MessageSquare } from "lucide-react"
import Navbar from "@/components/header"
import Footer from "@/components/custom/footer"
import Button from "@/components/ui/button"
import Select from "@/components/ui/select"
import Tabs from "@/components/ui/tabs"
import ImageGallery from "@/components/ui/image-gallery"
import QuantitySelector from "@/components/ui/quantity-selector"
import ReviewCard from "@/components/ui/review-card"
import ProductCard from "@/components/custom/product-card"
import Breadcrumb from "@/components/ui/breadcrumb"
import PaymentMethods from "@/components/ui/payment-methods"
import WriteReviewDialog from "@/components/ui/dialogs/write-review-dialog"

// Mock product data
const mockProduct = {
  id: 1,
  name: "سماعات أبل إيربودز برو 3 مع علبة الشحن اللاسلكية",
  category: "سماعات",
  brand: "أبل",
  images: [
    "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
  ],
  price: 850.0,
  originalPrice: 1200.0,
  discount: 29,
  rating: 4.7,
  reviewCount: 324,
  inStock: true,
  stockCount: 15,
  description:
    "سماعات أبل إيربودز برو الجيل الثالث مع تقنية إلغاء الضوضاء النشطة وجودة صوت استثنائية. تأتي مع علبة شحن لاسلكية توفر حتى 30 ساعة من الاستماع.",
  features: [
    "تقنية إلغاء الضوضاء النشطة",
    "مقاومة للماء والعرق (IPX4)",
    "شحن لاسلكي سريع",
    "عمر بطارية يصل إلى 6 ساعات",
    "تحكم باللمس",
    "متوافق مع Siri",
  ],
  specifications: {
    النوع: "سماعات لاسلكية",
    التوصيل: "Bluetooth 5.3",
    "عمر البطارية": "6 ساعات + 24 ساعة مع العلبة",
    "مقاومة الماء": "IPX4",
    الوزن: "5.4 جرام لكل سماعة",
    "الألوان المتاحة": "أبيض",
  },
}

const mockReviews = [
  {
    id: 1,
    userName: "أحمد محمد",
    rating: 5,
    date: "منذ أسبوع",
    comment: "سماعات ممتازة جداً، جودة الصوت رائعة وتقنية إلغاء الضوضاء تعمل بشكل مثالي. أنصح بها بشدة.",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    userName: "فاطمة علي",
    rating: 4,
    date: "منذ أسبوعين",
    comment: "سماعات جيدة جداً، الصوت واضح والبطارية تدوم طويلاً. الوحيد العيب أن السعر مرتفع قليلاً.",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    userName: "محمد السعيد",
    rating: 5,
    date: "منذ شهر",
    comment: "أفضل سماعات استخدمتها على الإطلاق. التوصيل سريع والجودة عالية جداً.",
    helpful: 15,
    verified: false,
  },
]

const relatedProducts = [
  {
    id: 2,
    name: "سماعات سوني WH-1000XM4",
    category: "سماعات",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    price: 1200.0,
    originalPrice: 1500.0,
    discount: 20,
    badge: "خصم 20%",
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: 3,
    name: "سماعات بوز QuietComfort",
    category: "سماعات",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    price: 950.0,
    originalPrice: 1100.0,
    discount: 14,
    badge: "خصم 14%",
    rating: 4.4,
    reviewCount: 156,
  },
  {
    id: 4,
    name: "سماعات JBL Live 650BTNC",
    category: "سماعات",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    price: 450.0,
    badge: "جديد",
    rating: 4.2,
    reviewCount: 67,
  },
  {
    id: 5,
    name: "سماعات Beats Studio3",
    category: "سماعات",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    price: 800.0,
    originalPrice: 950.0,
    discount: 16,
    badge: "خصم 16%",
    rating: 4.3,
    reviewCount: 234,
  },
]

const colorOptions = [
  { value: "white", label: "أبيض", color: "#FFFFFF" },
  { value: "black", label: "أسود", color: "#000000" },
]

export default function ProductDetailsPage() {
  const [selectedColor, setSelectedColor] = useState("white")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false)
  const [reviews, setReviews] = useState(mockReviews)
  const [reviewsPage, setReviewsPage] = useState(1)
  const reviewsPerPage = 3
  const [activeTab, setActiveTab] = useState("description")

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  const handleAddToCart = () => {
    console.log("Added to cart:", { product: mockProduct, quantity, color: selectedColor })
  }

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const tabs = [
    {
      id: "description",
      label: "الوصف",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[var(--primary)] mb-4">وصف المنتج</h3>
            <p className="text-gray-700 leading-relaxed">{mockProduct.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[var(--primary)] mb-4">المميزات</h3>
            <ul className="space-y-2">
              {mockProduct.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "specifications",
      label: "المواصفات",
      content: (
        <div>
          <h3 className="text-lg font-bold text-[var(--primary)] mb-4">المواصفات التقنية</h3>
          <div className="space-y-4">
            {Object.entries(mockProduct.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-900">{key}</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "reviews",
      label: `التقييمات (${reviews.length})`,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[var(--primary)]">{mockProduct.rating}</div>
                  <div className="flex items-center justify-center mt-1">
                    {renderStars(Math.floor(mockProduct.rating))}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{reviews.length} تقييم على المنتج</div>
                </div>

                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-sm w-8">{stars}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${Math.random() * 80 + 10}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{Math.floor(Math.random() * 50)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="primary" size="sm" icon={MessageSquare} onClick={() => setIsWriteReviewOpen(true)}>
                نشر تقييمك
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.slice(0, reviewsPage * reviewsPerPage).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {reviews.length > reviewsPage * reviewsPerPage && (
            <div className="flex justify-center">
              <Button variant="secondary" size="sm" onClick={() => setReviewsPage((prev) => prev + 1)}>
                عرض المزيد
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "المنتجات", href: "/products" },
            { label: mockProduct.category, href: `/products?category=${mockProduct.category}` },
            { label: mockProduct.name, href: "#" },
          ]}
          variant="light"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div>
            <ImageGallery images={mockProduct.images} productName={mockProduct.name} discount={mockProduct.discount} />
          </div>

          {/* Product Info */}
          <div className="space-y-6 ">
            <div className="bg-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">{mockProduct.brand}</span>
                <span className="text-sm text-gray-300">•</span>
                <span className="text-sm text-gray-500">{mockProduct.category}</span>
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-[var(--primary)] mb-4">{mockProduct.name}</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {renderStars(Math.floor(mockProduct.rating))}
                  <span className="text-sm text-gray-600">({mockProduct.reviewCount} تقييم)</span>
                </div>
              </div>
            </div>


            

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 bg-white p-4 rounded-xl">
            <div className="flex gap-4 w-[60%]">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">اللون</h3>
              <Select
                  options={colorOptions}
                  value={selectedColor}
                  onChange={setSelectedColor}
                  placeholder="اختر اللون"
                  className="w-full bg-white"
                />
            </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">الكمية</h3>
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  max={mockProduct.stockCount}
                  className="bg-white h-10"
                />
              </div>
            </div>

              <div className="flex gap-4">
                <Button
                  variant="primary"
                  size="sm"
                  icon={ShoppingCart}
                  onClick={handleAddToCart}
                  disabled={!mockProduct.inStock}
                  className="flex-1"
                >
                  أضف إلى السلة
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Heart}
                  onClick={handleToggleWishlist}
                  className={isWishlisted ? "text-red-500 border-red-500" : ""}
                >
                  {isWishlisted ? "مضاف للمفضلة" : "أضف للمفضلة"}
                </Button>
                <Button variant="secondary" size="sm" icon={Share2}>
                  مشاركة
                </Button>
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
        <div>
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-8">منتجات ذات صلة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showRating={true}
                onAddToCart={(product) => console.log("Add to cart:", product)}
                onToggleWishlist={(product) => console.log("Toggle wishlist:", product)}
              />
            ))}
          </div>
        </div>

        {/* Write Review Dialog */}
        <WriteReviewDialog
          isOpen={isWriteReviewOpen}
          onClose={() => setIsWriteReviewOpen(false)}
          onSubmit={(newReview) => {
            const review = {
              ...newReview,
              id: reviews.length + 1,
              date: "الآن",
              helpful: 0,
              verified: false,
            }
            setReviews((prev) => [review, ...prev])
          }}
        />
      </div>

      <Footer />
    </div>
  )
}
