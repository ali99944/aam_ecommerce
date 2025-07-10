"use client"

import { useState, useMemo } from "react"
import {  ChevronDown, ChevronUp, ShoppingBasket, Star } from "lucide-react"
import Footer from "@/components/footer"
import ProductCard from "@/components/custom/product-card"
import Navbar from "@/components/navbar"
import Button from "@/components/ui/button"
import Checkbox from "@/components/ui/checkbox"
import Input from "@/components/ui/input"
import RangeSlider from "@/components/ui/range-slider"
import Select from "@/components/ui/select"


// Mock products data
const mockProducts = [
  {
    id: 1,
    name: "سماعات أبل إيربودز 3 مع علبة الشحن",
    category: "سماعات",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop",
    price: 250.0,
    originalPrice: 300.0,
    discount: 17,
    badge: "خصم 17%",
    rating: 4.5,
    reviewCount: 128,
    brand: "أبل",
    color: "أبيض",
  },
  {
    id: 2,
    name: "آي باد برو 12.9 بوصة مع قلم أبل",
    category: "تابلت",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop",
    price: 2500.0,
    originalPrice: 3500.0,
    discount: 29,
    badge: "خصم 29%",
    rating: 4.8,
    reviewCount: 89,
    brand: "أبل",
    color: "رمادي",
  },
  {
    id: 3,
    name: "موبايل آيفون 14 (128) جيجابايت",
    category: "موبايل",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
    price: 3200.0,
    originalPrice: 3800.0,
    discount: 16,
    badge: "خصم 16%",
    rating: 4.7,
    reviewCount: 256,
    brand: "أبل",
    color: "أصفر",
  },
  {
    id: 4,
    name: "ساعة ذكية جديدة من سلسلة 8",
    category: "ساعات ذكية",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    price: 1800.0,
    badge: "جديد",
    rating: 4.6,
    reviewCount: 45,
    brand: "أبل",
    color: "أسود",
  },
  {
    id: 5,
    name: "موبايل سامسونج جالاكسي S23",
    category: "موبايل",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
    price: 2200.0,
    originalPrice: 2800.0,
    discount: 21,
    badge: "خصم 21%",
    rating: 4.4,
    reviewCount: 167,
    brand: "سامسونج",
    color: "أسود",
  },
  {
    id: 6,
    name: "سماعة سوني فوق الأذن",
    category: "سماعات",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    price: 1200.0,
    originalPrice: 1600.0,
    discount: 25,
    badge: "خصم 25%",
    rating: 4.3,
    reviewCount: 92,
    brand: "سوني",
    color: "أسود",
  },
  {
    id: 7,
    name: "لابتوب ديل إنسبايرون 15",
    category: "لابتوبات",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
    price: 3500.0,
    originalPrice: 4200.0,
    discount: 17,
    badge: "خصم 17%",
    rating: 4.2,
    reviewCount: 73,
    brand: "ديل",
    color: "فضي",
  },
  {
    id: 8,
    name: "كاميرا كانون EOS R6",
    category: "كاميرات",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop",
    price: 4500.0,
    originalPrice: 5200.0,
    discount: 13,
    badge: "خصم 13%",
    rating: 4.9,
    reviewCount: 156,
    brand: "كانون",
    color: "أسود",
  },
  {
    id: 9,
    name: "سماعات بوز كوايت كومفورت",
    category: "سماعات",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    price: 1400.0,
    originalPrice: 1800.0,
    discount: 22,
    badge: "خصم 22%",
    rating: 4.6,
    reviewCount: 234,
    brand: "بوز",
    color: "أسود",
  },
]

const categories = [
  { name: "الكل", count: 100 },
  { name: "إلكترونيات وتكنولوجيا", count: 60 },
  { name: "تليفونات وتابلتات", count: 25 },
  { name: "سماعات أذن", count: 30 },
  { name: "خلفيات موبايل", count: 36 },
  { name: "شاشات جيمز", count: 10 },
]

const brands = [
  { name: "الكل", count: 100 },
  { name: "أبل", count: 30 },
  { name: "آيفون", count: 34 },
  { name: "سامسونج", count: 25 },
  { name: "ديل", count: 12 },
  { name: "لينوفو", count: 9 },
]

const colors = [
  { name: "الكل", count: 50, color: "#6B7280" },
  { name: "أحمر", count: 8, color: "#EF4444" },
  { name: "أخضر", count: 3, color: "#10B981" },
  { name: "أزرق", count: 12, color: "#3B82F6" },
  { name: "فيروزي", count: 9, color: "#06B6D4" },
  { name: "برتقالي", count: 4, color: "#F97316" },
]

const sortOptions = [
  { value: "price-asc", label: "الأقل إلى الأعلى سعر" },
  { value: "price-desc", label: "الأعلى إلى الأقل سعر" },
  { value: "newest", label: "الأحدث" },
  { value: "bestseller", label: "الأكثر مبيعاً" },
  { value: "rating", label: "الأعلى تقييماً" },
]

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price-asc")
  const [showCategories, setShowCategories] = useState(true)
  const [showBrands, setShowBrands] = useState(false)
  const [showColors, setShowColors] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [showPrice, setShowPrice] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(6)

  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesRating = !selectedRating || (product.rating && product.rating >= selectedRating)
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesCategory && matchesBrand && matchesColor && matchesPrice && matchesRating && matchesSearch
    })

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        break
    }

    return filtered
  }, [selectedCategories, selectedBrands, selectedColors, priceRange, selectedRating, searchTerm, sortBy])

  const paginatedProducts = filteredProducts.slice(0, currentPage * productsPerPage)
  const hasMoreProducts = paginatedProducts.length < filteredProducts.length

  const handleCategoryChange = (category: string) => {
    if (category === "الكل") {
      setSelectedCategories([])
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
      )
    }
  }

  const handleBrandChange = (brand: string) => {
    if (brand === "الكل") {
      setSelectedBrands([])
    } else {
      setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
    }
  }

  const handleColorChange = (color: string) => {
    if (color === "الكل") {
      setSelectedColors([])
    } else {
      setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
    }
  }

  const loadMoreProducts = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < rating ? "text-yellow-500" : "text-gray-300"}`}>
            <Star size={18} />
          </span>
        ))}
      </div>
    )
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedColors([])
    setSelectedRating(null)
    setPriceRange([0, 5000])
    setSearchTerm("")
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      {/* <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumb
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "كل المنتجات", href: "/products" },
            ]}
            variant="light"
          />
        </div> */}

      <div className=" px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Categories Filter */}
            <div className="bg-white rounded-xl p-4  border border-gray-100">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center justify-between w-full text-right font-bold text-primary text-lg hover:text-primary/80 transition-colors"
              >
                الفئة
                {showCategories ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {showCategories && (
                <div className="space-y-4 mt-4">
                  {categories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={
                            category.name === "الكل"
                              ? selectedCategories.length === 0
                              : selectedCategories.includes(category.name)
                          }
                          onChange={() => handleCategoryChange(category.name)}
                        />
                        <span className="text-gray-700 hover:text-primary transition-colors cursor-pointer">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Brands Filter */}
            <div className="bg-white rounded-xl p-4  border border-gray-100">
              <button
                onClick={() => setShowBrands(!showBrands)}
                className="flex items-center justify-between w-full text-right font-bold text-primary text-lg hover:text-primary/80 transition-colors"
              >
                الماركة
                {showBrands ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {showBrands && (
                <div className="space-y-4 mt-4">
                  {brands.map((brand) => (
                    <div key={brand.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={
                            brand.name === "الكل" ? selectedBrands.length === 0 : selectedBrands.includes(brand.name)
                          }
                          onChange={() => handleBrandChange(brand.name)}
                        />
                        <span className="text-gray-700 hover:text-primary transition-colors cursor-pointer">
                          {brand.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{brand.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-xl p-4  border border-gray-100">
              <button
                onClick={() => setShowPrice(!showPrice)}
                className="flex items-center justify-between w-full text-right font-bold text-primary text-lg hover:text-primary/80 transition-colors"
              >
                السعر
                {showPrice ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {showPrice && (
                <div className="space-y-4 mt-4">
                  <RangeSlider min={0} max={5000} value={priceRange} onChange={setPriceRange} step={50} />
                </div>
              )}
            </div>

            {/* Colors Filter */}
            <div className="bg-white rounded-xl p-4  border border-gray-100">
              <button
                onClick={() => setShowColors(!showColors)}
                className="flex items-center justify-between w-full text-right font-bold text-primary text-lg hover:text-primary/80 transition-colors"
              >
                اللون
                {showColors ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {showColors && (
                <div className="space-y-4 mt-4">
                  {colors.map((color) => (
                    <div key={color.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={
                            color.name === "الكل" ? selectedColors.length === 0 : selectedColors.includes(color.name)
                          }
                          onChange={() => handleColorChange(color.name)}
                        />
                        <div className="flex items-center gap-2">
                          {color.name !== "الكل" && (
                            <div
                              className="w-5 h-5 rounded-full  "
                              style={{ backgroundColor: color.color }}
                            ></div>
                          )}
                          <span className="text-gray-700 hover:text-primary transition-colors cursor-pointer">
                            {color.name}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{color.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div className="bg-white rounded-xl p-4  border border-gray-100">
              <button
                onClick={() => setShowRating(!showRating)}
                className="flex items-center justify-between w-full text-right font-bold text-primary text-lg hover:text-primary/80 transition-colors"
              >
                التقييم
                {showRating ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {showRating && (
                <div className="space-y-4 mt-4">
                  {[5, 4, 3, 2].map((rating) => (
                    <div key={rating} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedRating === rating}
                          onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                        />
                        <div className="flex items-center gap-2">
                          {renderStars(rating)}
                          <span className="text-sm text-gray-600">فأكثر</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {Math.floor(Math.random() * 50) + 10}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>



          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl p-4 mb-8  border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    placeholder="ترت��ب حسب"
                    className="min-w-[200px]"
                  />
                  <span className="text-sm text-gray-600">
                    عرض {paginatedProducts.length} من {filteredProducts.length} منتج
                  </span>
                </div>

                <Input
                type="text"
                placeholder="ابحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="!w-[60%]"
              />
              </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showRating={true}
                      onAddToCart={(product) => console.log("Add to cart:", product)}
                      onToggleWishlist={(product) => console.log("Toggle wishlist:", product)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreProducts && (
                  <div className="flex justify-center items-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={loadMoreProducts}
                    >
                      عرض المزيد
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-xl p-16 text-center  border border-gray-100">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingBasket className="w-20 h-20 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">لا توجد منتجات حتى الآن</h3>
                <p className="text-gray-600 mb-8 text-lg">يمكنك أن تبدأ بأي منتجات</p>
                <div className="flex justify-center items-center">
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={resetFilters}   
                >
                  إعادة تعيين الفلاتر
                </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
