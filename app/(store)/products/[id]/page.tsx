"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Share2, Truck, ShieldCheck, RefreshCw, Minus, Plus, Star, StarHalf, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button, IconButton } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
} from "@/components/ui/breadcrumb"

import { ProductCard } from "@/components/ui/product-card"
import { useParams } from "next/navigation"
import { Tabs } from "@/components/ui/tabs"

// Mock product data based on the database schema
const getProduct = (id: string) => {
  return {
    id: parseInt(id),
    name: "مثقاب كهربائي احترافي بوش GSB 13 RE",
    description: "مثقاب كهربائي احترافي من بوش بقوة 600 واط، مع خاصية الطرق والتحكم في السرعة. مناسب للاستخدامات المنزلية والمهنية. يأتي مع مجموعة من اللقم المتنوعة وحقيبة حمل.",
    cost_price: 85.00,
    selling_price: 120.00,
    stock: 25,
    favorites_count: 42,
    product_code: "GSB13RE-600",
    stock_lower_limit: 5,
    overall_rating: 4.7,
    category_id: 2,
    category_name: "العدد الكهربائية",
    main_image: "/placeholder.svg?height=600&width=600",
    discount_id: 3,
    discount: {
      id: 3,
      discount_type: "percentage",
      value: 15,
      is_active: true,
      total_applies: 100
    },
    views: 1250,
    published: true,
    specifications: [
      { name: "القوة", value: "600 واط" },
      { name: "السرعة", value: "0-2800 دورة في الدقيقة" },
      { name: "سعة الثقب في الخشب", value: "25 ملم" },
      { name: "سعة الثقب في المعدن", value: "13 ملم" },
      { name: "سعة الثقب في الخرسانة", value: "13 ملم" },
      { name: "الوزن", value: "1.8 كجم" },
      { name: "الضمان", value: "سنتان" }
    ],
    gallery: [
      { id: 1, src: "/placeholder.svg?height=600&width=600" },
      { id: 2, src: "/placeholder.svg?height=600&width=600" },
      { id: 3, src: "/placeholder.svg?height=600&width=600" },
      { id: 4, src: "/placeholder.svg?height=600&width=600" }
    ],
    feedback: [
      { id: 1, product_id: 1, message: "منتج ممتاز وقوي جداً، أنصح به للاستخدام المنزلي والمهني", rating: 5, user_name: "أحمد محمد", date: "2023-10-15" },
      { id: 2, product_id: 1, message: "جودة عالية ومتانة في الاستخدام، لكن السعر مرتفع قليلاً", rating: 4, user_name: "خالد العمري", date: "2023-09-22" },
      { id: 3, product_id: 1, message: "خفيف الوزن وسهل الاستخدام، أداء ممتاز", rating: 5, user_name: "محمد السعيد", date: "2023-08-30" }
    ],
    related_products: [1, 2, 3, 4]
  }
}

// Mock related products
const getRelatedProducts = () => {
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
}

export default function ProductPage() {
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct(getProduct(id! as string))
      setRelatedProducts(getRelatedProducts())
      setIsLoading(false)
    }, 500)
  }, [id])

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 10)) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    // Add to cart logic
    console.log(`Added ${quantity} of product ${id} to cart`)
  }

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded-sm w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-200 rounded-sm"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded-sm w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-sm w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded-sm w-1/2"></div>
                  <div className="h-24 bg-gray-200 rounded-sm"></div>
                  <div className="h-10 bg-gray-200 rounded-sm w-1/3"></div>
                  <div className="h-12 bg-gray-200 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
            <p className="mb-6">عذراً، لم نتمكن من العثور على المنتج المطلوب.</p>
            <Button >
              تصفح المنتجات
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const discountedPrice = product.discount && product.discount.is_active
    ? product.discount.discount_type === "percentage"
      ? product.selling_price - (product.selling_price * product.discount.value / 100)
      : product.selling_price - product.discount.value
    : null

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 fill-[#01988F] text-[#01988F]" />)
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 fill-[#01988F] text-[#01988F]" />)
    }
    
    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-5 w-5 text-gray-300" />)
    }
    
    return stars
  }

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
              { label: product.category_name, href: `/category/${product.category_id}` },
              { label: product.name }
            ]}
            className="mb-6"
          />
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative h-96 border border-gray-200 rounded-sm overflow-hidden">
                {product.discount && product.discount.is_active && (
                  <Badge 
                    variant="primary" 
                    className="absolute top-4 left-4 z-10"
                  >
                    {product.discount.discount_type === "percentage" 
                      ? `${product.discount.value}% خصم` 
                      : `خصم ${product.discount.value} دينار`}
                  </Badge>
                )}
                <Image 
                //   src={product.gallery[selectedImage].src || "/placeholder.svg"} 
                  src={'https://images.pexels.com/photos/237950/pexels-photo-237950.jpeg?auto=compress&cs=tinysrgb&w=600' || "/placeholder.svg"} 
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.gallery.map((image: any, index: number) => (
                  <button
                    key={image.id}
                    className={`relative h-20 w-20 border rounded-sm overflow-hidden flex-shrink-0 ${
                      selectedImage === index ? 'border-[#00998F]' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image 
                      src={'https://images.pexels.com/photos/237950/pexels-photo-237950.jpeg?auto=compress&cs=tinysrgb&w=600' || "/placeholder.svg"} 
                      alt={`${product.name} - صورة ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {renderStars(product.overall_rating)}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.overall_rating}) - {product.feedback.length} تقييم
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">رمز المنتج:</span>
                <span className="text-sm font-medium">{product.product_code}</span>
              </div>
              
              <div className="flex items-center gap-4">
                {discountedPrice ? (
                  <>
                    <span className="text-2xl font-bold text-[#00998F]">
                      {discountedPrice.toFixed(2)} دينار
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {product.selling_price.toFixed(2)} دينار
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-[#00998F]">
                    {product.selling_price.toFixed(2)} دينار
                  </span>
                )}
              </div>
              
              <div className="border-t border-b border-gray-200 py-4">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">الكمية:</span>
                <div className="flex items-center border border-gray-200 rounded-sm">
                  <button 
                    className="px-2 py-2 text-gray-600 hover:text-[#00998F]"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <p className="px-2">{quantity}</p>
                  <button 
                    className="px-2 py-2 text-gray-600 hover:text-[#00998F]"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className={`text-sm ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
                  {product.stock > 10 
                    ? 'متوفر في المخزون' 
                    : product.stock > 0 
                      ? `متبقي ${product.stock} فقط` 
                      : 'غير متوفر حالياً'}
                </span>
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={handleAddToCart}
                  icon={ShoppingCart}
                  iconPosition="right"
                  className="flex-1 md:flex-none"
                  disabled={product.stock <= 0}
                >
                  إضافة للسلة
                </Button>
                
                <Button 
                  variant="secondary"
                  className="flex-1 md:flex-none"
                >
                  شراء الآن
                </Button>
                
                <IconButton
                  icon={Heart}
                  variant="outline"
                  onClick={handleToggleWishlist}
                  label="إضافة للمفضلة"
                  size="lg"
                />
                
                <IconButton
                  icon={Share2}
                  variant="outline"
                  onClick={() => {/* Share logic */}}
                  label="مشاركة"
                  size="lg"
                />
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-5 w-5 text-[#00998F]" />
                  <span>توصيل سريع</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-5 w-5 text-[#00998F]" />
                  <span>ضمان لمدة سنتين</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RefreshCw className="h-5 w-5 text-[#00998F]" />
                  <span>استبدال مجاني خلال 14 يوم</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs
            tabs={[
              { id: "description", label: "الوصف" },
              { id: "specifications", label: "المواصفات" },
              { id: "reviews", label: `التقييمات (${product.feedback.length})` }
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            className="mb-12"
          >
            {activeTab === "description" && (
              <div className="py-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
            
            {activeTab === "specifications" && (
              <div className="py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specifications.map((spec: any, index: number) => (
                    <div key={index} className="flex">
                      <div className="w-1/3 font-medium text-gray-700">{spec.name}:</div>
                      <div className="w-2/3 text-gray-600">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "reviews" && (
              <div className="py-6">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex">
                      {renderStars(product.overall_rating)}
                    </div>
                    <span className="text-lg font-medium">
                      {product.overall_rating} من 5
                    </span>
                    <span className="text-sm text-gray-600">
                      ({product.feedback.length} تقييم)
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline"
                    onClick={() => {}}
                  >
                    أضف تقييمك
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {product.feedback.map((review: any) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{review.user_name}</span>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-700">{review.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Tabs>
          
          {/* Related Products */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-right flex items-center gap-2">
              
                <span className="h-6 w-1 bg-[#00998F] inline-block"></span>
                منتجات مشابهة
              </h2>

              <Link href="/products" className="text-[#00998F] text-sm flex items-center">
                عرض الكل <ChevronLeft className="h-4 w-4 mr-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
