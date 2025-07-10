"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, Star, SlidersHorizontal, Package } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Breadcrumb from "@/components/ui/breadcrumb"
import ProductCard from "@/components/custom/product-card"
import Checkbox from "@/components/ui/checkbox"
import RangeSlider from "@/components/ui/range-slider"
import Dialog from "@/components/ui/dialog"
import BottomSheet from "@/components/ui/bottom-sheet"
import Select from "@/components/ui/select"
import { useGetQuery } from "@/src/hooks/queries-actions"
import { useCart } from "@/src/redux/hooks-operations/use-cart"

// Types
interface Product {
  id: number
  name: string
  main_image: string
  sell_price: string
  overall_rating: string
  total_rating: number
  stock: number
  brand: {
    id: number
    name: string
  }
  sub_category: {
    id: number
    name: string
    category: {
      id: number
      name: string
      slug: string
    }
  }
  discount?: {
    id: number
    percentage: number
  }[]
}

interface Category {
  id: number
  name: string
  slug: string
  sub_categories: SubCategory[]
}

interface SubCategory {
  id: number
  name: string
  category_id: number
}

interface Brand {
  id: number
  name: string
  total_products: number
}

interface ProductsResponse {
  data: Product[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // URL params
  const initialSearch = searchParams.get("q") || ""

  // State
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>([])
  const [selectedBrands, setSelectedBrands] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortDir, setSortDir] = useState("desc")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [onlyDiscounted, setOnlyDiscounted] = useState(false)
  const [stockStatus, setStockStatus] = useState<string>("")

  const { addToCart } = useCart()

  // Build query parameters
  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      page: currentPage,
      per_page: 12,
      sort_by: sortBy,
      sort_dir: sortDir,
    }

    if (searchQuery.trim()) {
      params.search = searchQuery.trim()
    }

    if (selectedSubCategories.length > 0) {
      params.sub_category_id = selectedSubCategories[0] // API accepts single subcategory
    }

    if (selectedBrands.length > 0) {
      params.brand_id = selectedBrands[0] // API accepts single brand
    }

    if (priceRange[0] > 0) {
      params.min_price = priceRange[0]
    }

    if (priceRange[1] < 10000) {
      params.max_price = priceRange[1]
    }

    if (stockStatus) {
      params.status = stockStatus
    }

    if (onlyDiscounted) {
      params.onlyDiscounted = true
    }

    return params
  }, [
    searchQuery,
    selectedSubCategories,
    selectedBrands,
    priceRange,
    stockStatus,
    onlyDiscounted,
    sortBy,
    sortDir,
    currentPage,
  ])

  // Fetch products
  const {
    data: productsResponse,
    isLoading: productsLoading,
    error: productsError,
  } = useGetQuery<ProductsResponse>({
    key: ["products", queryParams],
    url: "products",
    params: queryParams,
  })

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useGetQuery<Category[]>({
    key: ["categories"],
    url: "categories",
  })

  // Fetch brands
  const { data: brands, isLoading: brandsLoading } = useGetQuery<Brand[]>({
    key: ["brands"],
    url: "brands",
  })

  // Get all subcategories for filtering
  const allSubCategories = useMemo(() => {
    if (!categories) return []
    return categories.flatMap((cat) =>
      (cat?.sub_categories ?? []).map((sub) => ({
        ...sub,
        categoryName: cat.name,
      })),
    )
  }, [categories])

  const sortOptions = [
    { value: "createdAt", label: "الأحدث" },
    { value: "sell_price", label: "السعر" },
    { value: "name", label: "الاسم" },
    { value: "overall_rating", label: "التقييم" },
  ]

  const sortDirectionOptions = [
    { value: "desc", label: "تنازلي" },
    { value: "asc", label: "تصاعدي" },
  ]

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim())
    }

    const newUrl = `/search${params.toString() ? `?${params.toString()}` : ""}`
    router.replace(newUrl, { scroll: false })
  }, [searchQuery, router])

  const handleSubCategoryChange = (subCategoryId: number) => {
    setSelectedSubCategories(
      (prev) => (prev.includes(subCategoryId) ? prev.filter((id) => id !== subCategoryId) : [subCategoryId]), // Only allow one subcategory for now
    )
    setCurrentPage(1)
  }

  const handleBrandChange = (brandId: number) => {
    setSelectedBrands(
      (prev) => (prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [brandId]), // Only allow one brand for now
    )
    setCurrentPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split("-")
    setSortBy(field)
    setSortDir(direction || "desc")
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedSubCategories([])
    setSelectedBrands([])
    setPriceRange([0, 10000])
    setSelectedRating(null)
    setOnlyDiscounted(false)
    setStockStatus("")
    setCurrentPage(1)
  }

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product.id, 1)
    } catch (error) {
      // Error handled by useCart hook
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  // Filters component
  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-primary">الفلاتر</h3>
        <Button variant="secondary" size="sm" onClick={clearFilters}>
          مسح الكل
        </Button>
      </div>

      {/* Categories */}
      {!categoriesLoading && allSubCategories.length > 0 && (
        <div>
          <h4 className="font-bold text-primary mb-3">الفئات</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allSubCategories.map((subCategory) => (
              <div key={subCategory.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedSubCategories.includes(subCategory.id)}
                    onChange={() => handleSubCategoryChange(subCategory.id)}
                  />
                  <div className="flex flex-col">
                    <span className="text-gray-700 text-sm">{subCategory.name}</span>
                    <span className="text-xs text-gray-500">{subCategory.categoryName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Brands */}
      {!brandsLoading && brands && brands.length > 0 && (
        <div>
          <h4 className="font-bold text-primary mb-3">العلامات التجارية</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={selectedBrands.includes(brand.id)} onChange={() => handleBrandChange(brand.id)} />
                  <span className="text-gray-700">{brand.name}</span>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{brand.total_products}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h4 className="font-bold text-primary mb-3">نطاق السعر</h4>
        <RangeSlider min={0} max={10000} value={priceRange} onChange={setPriceRange} step={100} />
        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
          <span>{priceRange[0]} ريال</span>
          <span>{priceRange[1]} ريال</span>
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <h4 className="font-bold text-primary mb-3">حالة المخزون</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={stockStatus === "in_stock"}
              onChange={() => setStockStatus(stockStatus === "in_stock" ? "" : "in_stock")}
            />
            <span className="text-gray-700">متوفر</span>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={stockStatus === "out_of_stock"}
              onChange={() => setStockStatus(stockStatus === "out_of_stock" ? "" : "out_of_stock")}
            />
            <span className="text-gray-700">غير متوفر</span>
          </div>
        </div>
      </div>

      {/* Discounted Only */}
      <div>
        <h4 className="font-bold text-primary mb-3">العروض</h4>
        <div className="flex items-center gap-3">
          <Checkbox checked={onlyDiscounted} onChange={(e) => setOnlyDiscounted(e.target.checked)} />
          <span className="text-gray-700">المنتجات المخفضة فقط</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-bold text-primary mb-3">التقييم</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <Checkbox
                checked={selectedRating === rating}
                onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
              />
              <div className="flex items-center gap-2">
                {renderStars(rating)}
                <span className="text-sm text-gray-600">فأكثر</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Check if screen is mobile
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const products = productsResponse?.data || []
  const totalResults = productsResponse?.total || 0
  const currentPageNum = productsResponse?.current_page || 1
  const lastPage = productsResponse?.last_page || 1

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Breadcrumb */}
      <div className="px-8 py-4">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "البحث", href: "/search" },
            ...(searchQuery ? [{ label: `نتائج البحث عن "${searchQuery}"` }] : []),
          ]}
          variant="light"
        />
      </div>

      <div className="px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="flex-1 max-w-2xl">
              <Input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowFilters(true)}
                icon={SlidersHorizontal}
                className="md:hidden"
              >
                فلترة
              </Button>
              <div className="flex gap-2">
                <Select options={sortOptions} value={sortBy} onChange={setSortBy} className="!w-32" />
                <Select options={sortDirectionOptions} value={sortDir} onChange={setSortDir} className="!w-24" />
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              {productsLoading
                ? "جاري البحث..."
                : searchQuery
                  ? `تم العثور على ${totalResults} نتيجة للبحث عن "${searchQuery}"`
                  : `عرض ${totalResults} منتج`}
            </p>
            {totalResults > 0 && (
              <span className="text-sm text-gray-500">
                صفحة {currentPageNum} من {lastPage}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="w-80 space-y-6 hidden md:block">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <FiltersContent />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {productsLoading ? (
              /* Loading State */
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : productsError ? (
              /* Error State */
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-4">حدث خطأ</h3>
                <p className="text-gray-600 mb-8">عذراً، حدث خطأ أثناء تحميل المنتجات</p>
                <Button variant="primary" size="sm" onClick={() => window.location.reload()}>
                  إعادة المحاولة
                </Button>
              </div>
            ) : products.length > 0 ? (
              <>
                {/* Search Results */}
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        name: product.name,
                        category: product.brand?.name ?? 'no brand',
                        image: product.main_image,
                        price: Number.parseFloat(product.sell_price),
                        rating: Number.parseFloat(product.overall_rating),
                        reviewCount: product.total_rating,
                        stock: product.stock,
                        originalPrice:
                          product.discount?.length > 0
                            ? Number.parseFloat(product.sell_price) / (1 - product.discount[0].percentage / 100)
                            : undefined,
                        discount: product.discount?.length > 0 ? product.discount[0].percentage : undefined,
                      }}
                      showRating={true}
                      onAddToCart={() => handleAddToCart(product)}
                      onToggleWishlist={(product) => console.log("Toggle wishlist:", product)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {lastPage > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={currentPageNum <= 1}
                      onClick={() => setCurrentPage(currentPageNum - 1)}
                    >
                      السابق
                    </Button>

                    <div className="flex gap-2">
                      {[...Array(Math.min(5, lastPage))].map((_, i) => {
                        const pageNum = i + 1
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPageNum === pageNum ? "primary" : "secondary"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={currentPageNum >= lastPage}
                      onClick={() => setCurrentPage(currentPageNum + 1)}
                    >
                      التالي
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* No Results */
              <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-16 h-16 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">لا توجد نتائج</h3>
                <p className="text-gray-600 mb-8">
                  {searchQuery
                    ? `لم نتمكن من العثور على منتجات تطابق بحثك "${searchQuery}"`
                    : "لا توجد منتجات متاحة حالياً"}
                </p>
                <div className="space-y-4">
                  <p className="text-gray-600">جرب:</p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• التحقق من الإملاء</li>
                    <li>• استخدام كلمات مفتاحية أخرى</li>
                    <li>• تقليل عدد الفلاتر</li>
                  </ul>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-6"
                  onClick={() => {
                    setSearchQuery("")
                    clearFilters()
                  }}
                >
                  تصفح جميع المنتجات
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters - Bottom Sheet */}
      {isMobile && (
        <BottomSheet isOpen={showFilters} onClose={() => setShowFilters(false)}>
          <div className="p-4">
            <FiltersContent />
            <div className="mt-6 flex gap-3">
              <Button variant="primary" size="sm" className="flex-1" onClick={() => setShowFilters(false)}>
                تطبيق الفلاتر ({totalResults})
              </Button>
              <Button variant="secondary" size="sm" onClick={clearFilters}>
                مسح الكل
              </Button>
            </div>
          </div>
        </BottomSheet>
      )}

      {/* Desktop Filters - Dialog */}
      {!isMobile && (
        <Dialog isOpen={showFilters} onClose={() => setShowFilters(false)} title="الفلاتر" size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FiltersContent />
            <div className="space-y-4">
              <h4 className="font-bold text-primary">معاينة النتائج</h4>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {products.slice(0, 6).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={product.main_image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-sm text-primary line-clamp-1">{product.name}</h5>
                      <p className="text-accent font-bold text-sm">
                        {Number.parseFloat(product.sell_price).toFixed(2)} ريال
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="primary" size="sm" className="flex-1" onClick={() => setShowFilters(false)}>
                  عرض النتائج ({totalResults})
                </Button>
                <Button variant="secondary" size="sm" onClick={clearFilters}>
                  مسح الكل
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}

      <Footer />
    </div>
  )
}
