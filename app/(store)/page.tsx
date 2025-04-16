/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Truck,
  Wrench,
  Zap,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Shovel,
  Clock3,
  Heart,
  Eye,
  PercentIcon,
  ShoppingBag,
  Grid,
  ChevronLeft,
  PenToolIcon as Tool,
  Hammer,
  Lightbulb,
  Leaf,
  Paintbrush,
  BrickWallIcon as Brick,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGetQuery } from "@/src/providers/hooks/queries-actions"
import type Category from "@/src/types/category"
import type { WithPagination } from "@/src/types/with-pagination"
import { Newsletter } from "@/components/custom/newsletter"
import { ProductCard } from "@/components/ui/product-card"

// Define the Offer interface based on the provided data structure
interface Offer {
  id: number
  title: string
  slug: string
  description: string
  image: string
  type: string
  linked_id: number
  target_url: string | null
  start_date: string
  end_date: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

// Dummy products data
const dummyProducts = [
  {
    id: 1,
    name: "مثقاب كهربائي احترافي",
    slug: "professional-electric-drill",
    price: 120,
    discount_price: 99,
    image: "/placeholder.svg?height=300&width=300",
    category: "أدوات كهربائية",
    rating: 4.8,
    reviews_count: 124,
    is_in_stock: true,
  },
  {
    id: 2,
    name: "طقم مفاتيح متعددة الاستخدامات",
    slug: "multi-purpose-wrench-set",
    price: 85,
    discount_price: 70,
    image: "/placeholder.svg?height=300&width=300",
    category: "أدوات يدوية",
    rating: 4.5,
    reviews_count: 98,
    is_in_stock: true,
  },
  {
    id: 3,
    name: "أسمنت بورتلاند عالي الجودة",
    slug: "high-quality-portland-cement",
    price: 30,
    discount_price: null,
    image: "/placeholder.svg?height=300&width=300",
    category: "مواد بناء",
    rating: 4.7,
    reviews_count: 156,
    is_in_stock: true,
  },
  {
    id: 4,
    name: "منشار كهربائي دائري",
    slug: "electric-circular-saw",
    price: 200,
    discount_price: 160,
    image: "/placeholder.svg?height=300&width=300",
    category: "أدوات كهربائية",
    rating: 4.6,
    reviews_count: 87,
    is_in_stock: true,
  },
  {
    id: 5,
    name: "سماد عضوي طبيعي",
    slug: "natural-organic-fertilizer",
    price: 45,
    discount_price: 38,
    image: "/placeholder.svg?height=300&width=300",
    category: "مواد زراعية",
    rating: 4.9,
    reviews_count: 112,
    is_in_stock: true,
  },
  {
    id: 6,
    name: "طقم حديقة متكامل",
    slug: "complete-garden-set",
    price: 150,
    discount_price: 120,
    image: "/placeholder.svg?height=300&width=300",
    category: "أدوات زراعية",
    rating: 4.4,
    reviews_count: 76,
    is_in_stock: true,
  },
  {
    id: 7,
    name: "خلاط أسمنت صغير",
    slug: "small-cement-mixer",
    price: 350,
    discount_price: 299,
    image: "/placeholder.svg?height=300&width=300",
    category: "معدات بناء",
    rating: 4.7,
    reviews_count: 65,
    is_in_stock: true,
  },
  {
    id: 8,
    name: "مجموعة أدوات نجارة",
    slug: "carpentry-tool-set",
    price: 220,
    discount_price: 180,
    image: "/placeholder.svg?height=300&width=300",
    category: "أدوات نجارة",
    rating: 4.8,
    reviews_count: 92,
    is_in_stock: true,
  },
]

// Filter products with high discount
const highDiscountProducts = dummyProducts.filter(
  (product) => product.discount_price && (product.price - product.discount_price) / product.price > 0.15,
)

// Map of category icons
const categoryIcons: Record<string, React.ReactNode> = {
  default: <Shovel className="h-6 w-6" />,
  "أدوات كهربائية": <Lightbulb className="h-6 w-6" />,
  "أدوات يدوية": <Hammer className="h-6 w-6" />,
  "مواد بناء": <Brick className="h-6 w-6" />,
  "أدوات زراعية": <Leaf className="h-6 w-6" />,
  "أدوات نجارة": <Tool className="h-6 w-6" />,
  "أدوات دهان": <Paintbrush className="h-6 w-6" />,
}

export default function Home() {
  const { data: categories, isLoading: categoriesLoading } = useGetQuery<WithPagination<Category[]>>({
    url: "categories",
    key: ["categories"],
  })

  // Add this to fetch offers
  const { data: offers, isLoading: offersLoading } = useGetQuery<Offer[]>({
    url: "offers",
    key: ["offers"],
  })

  // Get icon for a category
  const getCategoryIcon = (categoryName: string) => {
    return categoryIcons[categoryName] || categoryIcons.default
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">


        {/* Offers Grid Section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            {offersLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-gray-200 h-48 md:h-64 rounded-md animate-pulse"></div>
                ))}
              </div>
            ) : offers && offers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offers.map((offer) => {
                  // Generate a target URL - use offer.target_url if available, otherwise create one based on type and linked_id
                  const targetUrl =
                    offer.target_url ||
                    (offer.type === "category"
                      ? `/category/${offer.linked_id}`
                      : offer.type === "product"
                        ? `/product/${offer.linked_id}`
                        : `/offers/${offer.slug}`)

                  // Generate a background color based on the offer ID for visual variety
                  const bgColors = [
                    "#FFD700",
                    "#00CED1",
                    "#90EE90",
                    "#FFA07A",
                    "#B0E0E6",
                    "#FFB6C1",
                    "#D8BFD8",
                    "#F0E68C",
                  ]
                  const bgColor = bgColors[offer.id % bgColors.length]

                  return (
                    <Link key={offer.id} href={targetUrl} className="block">
                      <div
                        className="relative overflow-hidden rounded-md h-48 md:h-64"
                        style={{ backgroundColor: bgColor }}
                      >
                        <div className="absolute inset-0 p-6 flex flex-col justify-between text-right">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{offer.title}</h3>
                            <p className="text-gray-700">{offer.description}</p>

                            {/* Show dates if available */}
                            {offer.end_date && (
                              <p className="text-sm mt-2 text-gray-600">
                                ينتهي في: {new Date(offer.end_date).toLocaleDateString("ar-EG")}
                              </p>
                            )}
                          </div>
                          <Button variant="secondary" className="self-start">
                            تسوق الآن
                          </Button>
                        </div>
                        <div className="absolute bottom-0 right-0 w-1/3 h-full">
                          <Image
                            src={offer.image || "/placeholder.svg?height=300&width=600"}
                            alt={offer.title}
                            fill
                            className="object-contain object-bottom-right"
                          />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-md">
                <p className="text-gray-500">لا توجد عروض متاحة حالياً</p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Access Categories - Redesigned */}
        <section className="py-8 bg-[#D2EAE8]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-right flex items-center">
                <Grid className="h-5 w-5 ml-2" />
                تصفح حسب الفئات
              </h2>
              <Link href="/categories" className="text-[#00998F] text-base flex items-center">
                عرض كل الفئات <ChevronLeft className="h-4 w-4 mr-1" />
              </Link>
            </div>

            {categoriesLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-200 h-24 rounded-md animate-pulse"></div>
                ))}
              </div>
            ) : categories?.data && categories.data.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {categories.data.slice(0, 6).map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.id}`}
                      className="bg-white rounded-md p-4 flex flex-col items-center justify-center text-center h-24 transition-all hover:bg-[#00998F] hover:text-white group"
                    >
                      <div className="text-[#00998F] group-hover:text-white transition-colors mb-2">
                        {getCategoryIcon(category.name)}
                      </div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </Link>
                  ))}
                </div>

                {categories.data.length > 6 && (
                  <div className="mt-6 flex justify-center">
                    <Button 
                      icon={ArrowLeft}>
                      <Link href="/categories">
                        عرض جميع الفئات ({categories.data.length})
                      </Link>
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 bg-white rounded-md">
                <p className="text-gray-500">لا توجد فئات متاحة حالياً</p>
              </div>
            )}
          </div>
        </section>

        {/* الأكثر مبيعاً Section */}
        <ProductSection
          title="الأكثر مبيعاً"
          icon={<ShoppingBag className="h-5 w-5 ml-2" />}
          products={dummyProducts.slice(0, 4)}
          viewAllLink="/products/best-selling"
        />

        {/* خصم عالي Section */}
        <ProductSection
          title="خصم عالي"
          icon={<PercentIcon className="h-5 w-5 ml-2" />}
          products={highDiscountProducts.slice(0, 4)}
          viewAllLink="/products/discounts"
          bgColor="bg-amber-50"
        />

        {/* وصل حديثاً Section */}
        <ProductSection
          title="وصل حديثاً"
          icon={<Clock3 className="h-5 w-5 ml-2" />}
          products={dummyProducts.slice(4, 8)}
          viewAllLink="/products/new-arrivals"
        />

        {/* قد يعجبك Section */}
        <ProductSection
          title="قد يعجبك"
          icon={<Heart className="h-5 w-5 ml-2" />}
          products={dummyProducts.slice(2, 6)}
          viewAllLink="/products/recommended"
          bgColor="bg-rose-50"
        />

        {/* قمت بزيارته Section */}
        <ProductSection
          title="قمت بزيارته"
          icon={<Eye className="h-5 w-5 ml-2" />}
          products={dummyProducts.slice(1, 5)}
          viewAllLink="/products/recently-viewed"
          bgColor="bg-blue-50"
        />

        {/* Why Choose Us Section */}
        <section className="py-10 bg-[#D2EAE8]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-right text-[#00998F] flex items-center gap-2">
              <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
              لماذا تختارنا
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10" />}
                title="جودة عالية"
                description="منتجات أصلية بضمان"
              />
              <FeatureCard
                icon={<Truck className="h-10 w-10" />}
                title="توصيل سريع"
                description="لجميع مناطق المملكة"
              />
              <FeatureCard icon={<Wrench className="h-10 w-10" />} title="دعم فني" description="استشارات مجانية" />
              <FeatureCard
                icon={<Zap className="h-10 w-10" />}
                title="أسعار تنافسية"
                description="أفضل الأسعار في السوق"
              />
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-10 bg-[#00998F] text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-4 p-4 bg-white/10">
                <Phone className="h-8 w-8 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">رقم الهاتف</h3>
                  <p dir="ltr" className="text-base">
                    +962 79 123 4567
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/10">
                <MapPin className="h-8 w-8 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">العنوان</h3>
                  <p className="text-base">عمان، الأردن - شارع الملك عبدالله الثاني</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/10">
                <Clock className="h-8 w-8 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">ساعات العمل</h3>
                  <p className="text-base">السبت - الخميس: 8 صباحاً - 8 مساءً</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Newsletter className="my-8 mx-12" />
      <Footer />
    </div>
  )
}

// Product Section Component
function ProductSection({
  title,
  icon,
  products,
  viewAllLink,
  bgColor = "bg-white",
}: {
  title: string
  icon: React.ReactNode
  products: any[]
  viewAllLink: string
  bgColor?: string
}) {
  return (
    <section className={`py-8 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-right flex items-center">
            {icon}
            {title}
            <span className="h-6 w-1 bg-[#00998F] inline-block mr-2"></span>
          </h2>
          <Link href={viewAllLink} className="text-[#00998F] text-base flex items-center">
            عرض الكل <ArrowLeft className="h-4 w-4 mr-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white p-4 rounded-sm flex flex-col items-center text-center">
      <div className="text-[#00998F] mb-3">{icon}</div>
      <h3 className="font-bold text-lg text-[#00998F] mb-2">{title}</h3>
      <p className="text-base">{description}</p>
    </div>
  )
}
