"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Filter, Grid, List, ShoppingCart, Heart, Sliders, X, Star, StarHalf } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Select
} from "@/components/ui/select"
import {
  Pagination
} from "@/components/ui/pagination"
import {
  Breadcrumb
} from "@/components/ui/breadcrumb"
import { ProductCard } from "@/components/ui/product-card"
import { Placeholder } from "@/components/ui/placeholder"
import {
  Alert,
} from "@/components/ui/alert"

// Mock subcategory data with products
const getSubcategoryWithProducts = (categorySlug: string, subcategorySlug: string) => {
  // This would normally be fetched from an API
  return {
    id: 21,
    name: "مثاقب كهربائية",
    slug: "drills",
    description: "مثاقب كهربائية احترافية للاستخدامات المنزلية والمهنية",
    image: "/placeholder.svg?height=600&width=1200&text=مثاقب كهربائية",
    category: {
      id: 2,
      name: "العدد الكهربائية",
      slug: "electrical-tools",
    },
    products_count: 25,
    products: [
      {
        id: 101,
        name: "مثقاب كهربائي احترافي بوش GSB 13 RE",
        price: 120.0,
        oldPrice: 140.0,
        rating: 4.5,
        reviewCount: 28,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: true,
        isBestSeller: true,
        isDiscounted: true,
        discount: 14,
        brand: "بوش",
        stock: "in_stock",
      },
      {
        id: 102,
        name: "مثقاب كهربائي ماكيتا HP1630",
        price: 95.0,
        oldPrice: null,
        rating: 4.2,
        reviewCount: 15,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isBestSeller: false,
        isDiscounted: false,
        discount: 0,
        brand: "ماكيتا",
        stock: "in_stock",
      },
      {
        id: 103,
        name: "مثقاب كهربائي ديوالت DWD024",
        price: 150.0,
        oldPrice: 180.0,
        rating: 4.7,
        reviewCount: 32,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isBestSeller: true,
        isDiscounted: true,
        discount: 17,
        brand: "ديوالت",
        stock: "in_stock",
      },
      {
        id: 104,
        name: "مثقاب كهربائي بلاك آند ديكر KR504RE",
        price: 75.0,
        oldPrice: null,
        rating: 3.8,
        reviewCount: 12,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isBestSeller: false,
        isDiscounted: false,
        discount: 0,
        brand: "بلاك آند ديكر",
        stock: "in_stock",
      },
      {
        id: 105,
        name: "مثقاب كهربائي ميلواكي M18 FUEL",
        price: 220.0,
        oldPrice: 250.0,
        rating: 4.9,
        reviewCount: 45,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: true,
        isBestSeller: false,
        isDiscounted: true,
        discount: 12,
        brand: "ميلواكي",
        stock: "low_stock",
      },
      {
        id: 106,
        name: "مثقاب كهربائي هيتاشي DV18DBL2",
        price: 180.0,
        oldPrice: null,
        rating: 4.3,
        reviewCount: 19,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isBestSeller: false,
        isDiscounted: false,
        discount: 0,
        brand: "هيتاشي",
        stock: "in_stock",
      },
      {
        id: 107,
        name: "مثقاب كهربائي ماكيتا HP1640",
        price: 110.0,
        oldPrice: 125.0,
        rating: 4.1,
        reviewCount: 22,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isBestSeller: false,
        isDiscounted: true,
        discount: 12,
        brand: "ماكيتا",
        stock: "in_stock",
      },
      {
        id: 108,
        name: "مثقاب كهربائي بوش GSB 16 RE",
        price: 135.0,
        oldPrice: null,
        rating: 4.6,
        reviewCount: 31,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isBestSeller: true,
        isDiscounted: false,
        discount: 0,
        brand: "بوش",
        stock: "in_stock",
      },
      {
        id: 109,
        name: "مثقاب كهربائي ديوالت DWD522",
        price: 165.0,
        oldPrice: 190.0,
        rating: 4.4,
        reviewCount: 27,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isBestSeller: false,
        isDiscounted: true,
        discount: 13,
        brand: "ديوالت",
        stock: "out_of_stock",
      },
      {
        id: 110,
        name: "مثقاب كهربائي ميلواكي M12 FUEL",
        price: 195.0,
        oldPrice: null,
        rating: 4.8,
        reviewCount: 36,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: true,
        isBestSeller: false,
        isDiscounted: false,
        discount: 0,
        brand: "ميلواكي",
        stock: "in_stock",
      },
      {
        id: 111,
        name: "مثقاب كهربائي بلاك آند ديكر KR554RE",
        price: 85.0,
        oldPrice: 100.0,
        rating: 3.9,
        reviewCount: 14,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isBestSeller: false,
        isDiscounted: true,
        discount: 15,
        brand: "بلاك آند ديكر",
        stock: "in_stock",
      },
      {
        id: 112,
        name: "مثقاب كهربائي هيتاشي DV18DSDL",
        price: 170.0,
        oldPrice: null,
        rating: 4.2,
        reviewCount: 18,
        category: "مثاقب كهربائية",
        image: "/placeholder.svg?height=300&width=300",
        isNew: false,
        isBestSeller: false,
        isDiscounted: false,
        discount: 0,
        brand: "هيتاشي",
        stock: "low_stock",
      },
    ],
    brands: [
      { id: 1, name: "بوش", count: 5 },
      { id: 2, name: "ماكيتا", count: 4 },
      { id: 3, name: "ديوالت", count: 3 },
      { id: 4, name: "بلاك آند ديكر", count: 2 },
      { id: 5, name: "ميلواكي", count: 2 },
      { id: 6, name: "هيتاشي", count: 2 },
    ],
    price_ranges: [
      { id: 1, name: "أقل من 100 دينار", min: 0, max: 100, count: 4 },
      { id: 2, name: "100 - 150 دينار", min: 100, max: 150, count: 5 },
      { id: 3, name: "150 - 200 دينار", min: 150, max: 200, count: 2 },
      { id: 4, name: "أكثر من 200 دينار", min: 200, max: null, count: 1 },
    ],
    features: [
      { id: 1, name: "بطارية", count: 5 },
      { id: 2, name: "سلكي", count: 7 },
      { id: 3, name: "خاصية الطرق", count: 8 },
      { id: 4, name: "تحكم بالسرعة", count: 6 },
    ],
  }
}

// Sort options
const sortOptions = [
  { value: "featured", label: "الأكثر شهرة" },
  { value: "newest", label: "الأحدث" },
  { value: "price_asc", label: "السعر: من الأقل إلى الأعلى" },
  { value: "price_desc", label: "السعر: من الأعلى إلى الأقل" },
  { value: "rating", label: "التقييم" },
]

export default function SubcategoryProductsPage({ params }: { params: { slug: string, subcategory: string } }) {
  const [subcategory, setSubcategory] = useState<any>(null)
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    brands: [] as string[],
    priceRange: [] as string[],
    features: [] as string[],
    inStock: false,
    onSale: false,
  })
  const productsPerPage = 9

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const subcategoryData = getSubcategoryWithProducts(params.slug, params.subcategory)
      setSubcategory(subcategoryData)
      setFilteredProducts(subcategoryData.products)
      setIsLoading(false)
    }, 1000)
  }, [params.slug, params.subcategory])

  useEffect(() => {
    if (!subcategory) return
    
    // Apply filters and sorting
    let result = [...subcategory.products]
    
    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(product => filters.brands.includes(product.brand))
    }
    
    // Apply price range filter
    if (filters.priceRange.length > 0) {
      result = result.filter(product => {
        const price = product.oldPrice ? product.price : product.price
        return filters.priceRange.some(range => {
          const [min, max] = range.split('-').map(Number)
          return max ? (price >= min && price <= max) : (price >= min)
        })
      })
    }
    
    // Apply feature filter
    if (filters.features.length > 0) {
      // This is a simplified example. In a real app, you would have feature data for each product
      // For now, we'll just filter randomly based on the product ID
      result = result.filter(product => {
        return filters.features.some(feature => product.id % parseInt(feature) === 0)
      })
    }
    
    // Apply in stock filter
    if (filters.inStock) {
      result = result.filter(product => product.stock !== 'out_of_stock')
    }
    
    // Apply on sale filter
    if (filters.onSale) {
      result = result.filter(product => product.isDiscounted)
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        // For demo purposes, we'll sort by ID (higher ID = newer)
        result.sort((a, b) => b.id - a.id)
        break
      case 'price_asc':
        result.sort((a, b) => {
          const priceA = a.oldPrice ? a.price : a.price
          const priceB = b.oldPrice ? b.price : b.price
          return priceA - priceB
        })
        break
      case 'price_desc':
        result.sort((a, b) => {
          const priceA = a.oldPrice ? a.price : a.price
          const priceB = b.oldPrice ? b.price : b.price
          return priceB - priceA
        })
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default: // featured
        // For demo purposes, we'll prioritize best sellers and new products
        result.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1
          if (!a.isBestSeller && b.isBestSeller) return 1
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return 0
        })
    }
    
    setFilteredProducts(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [subcategory, filters, sortBy])

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // Toggle filter
  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      
      if (type === 'brands' || type === 'priceRange' || type === 'features') {
        if (newFilters[type].includes(value)) {
          newFilters[type] = newFilters[type].filter(item => item !== value)
        } else {
          newFilters[type] = [...newFilters[type], value]
        }
      } else if (type === 'inStock' || type === 'onSale') {
        newFilters[type] = !newFilters[type]
      }
      
      return newFilters
    })
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: [],
      features: [],
      inStock: false,
      onSale: false,
    })
  }

  // Render price range
  const renderPriceRange = (min: number, max: number | null) => {
    if (max) {
      return `${min} - ${max} دينار`
    }
    return `أكثر من ${min} دينار`
  }

  // Render stock status
  const renderStockStatus = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <span className="text-green-600">متوفر</span>
      case 'low_stock':
        return <span className="text-amber-600">متوفر بكمية محدودة</span>
      case 'out_of_stock':
        return <span className="text-red-600">غير متوفر</span>
      default:
        return <span>{status}</span>
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <Placeholder type="breadcrumb" className="mb-6" />
            <Placeholder type="heading" className="mb-4" />
            <Placeholder type="text" className="mb-8 w-3/4" />
            
            <div className="flex justify-between items-center mb-6">
              <Placeholder type="button" className="w-32" />
              <div className="flex gap-2">
                <Placeholder type="button" className="w-24" />
                <Placeholder type="button" className="w-24" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="hidden md:block">
                <Placeholder type="sidebar" className="h-96" />
              </div>
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Placeholder key={i} type="product-card" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!subcategory) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">القسم غير موجود</h1>
            <p className="mb-6">عذراً، لم نتمكن من العثور على القسم الفرعي المطلوب.</p>
            <Button as={Link} href={`/category/${params.slug}`}>العودة للقسم الرئيسي</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumb 
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "الأقسام", href: "/categories" },
              { label: subcategory.category.name, href: `/category/${subcategory.category.slug}` },
              { label: subcategory.name }
            ]} 
            className="mb-6" 
          />

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{subcategory.name}</h1>
            <p className="text-gray-600 max-w-3xl">{subcategory.description}</p>
          </div>

          {/* Product Count and Filters Toggle */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">
                عرض {filteredProducts.length} من {subcategory.products_count} منتج
              </span>
              
              {Object.values(filters).some(filter => 
                Array.isArray(filter) ? filter.length > 0 : filter
              ) && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs h-7 px-2"
                >
                  <X className="h-3 w-3 ml-1" />
                  مسح الفلاتر
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-48">
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="ترتيب حسب"
                />
              </div>
              
              <div className="flex items-center gap-1 border border-gray-200 rounded-sm">
                <button
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[#00998F] text-white' : 'bg-white text-gray-600'}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="عرض شبكي"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  className={`p-2 ${viewMode === 'list' ? 'bg-[#00998F] text-white' : 'bg-white text-gray-600'}`}
                  onClick={() => setViewMode('list')}
                  aria-label="عرض قائمة"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-1"
              >
                <Filter className="h-4 w-4 ml-1" />
                الفلاتر
              </Button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden bg-white rounded-sm shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">الفلاتر</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Brands Filter */}
                <div>
                  <h4 className="font-medium mb-2">الماركات</h4>
                  <div className="space-y-1">
                    {subcategory.brands.map((brand: any) => (
                      <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={filters.brands.includes(brand.name)} 
                          onChange={() => toggleFilter('brands', brand.name)}
                          className="h-4 w-4 rounded-sm border-gray-300 text-[#00998F] focus:ring-[#00998F]"
                        />
                        <span className="text-sm">{brand.name} ({brand.count})</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <h4 className="font-medium mb-2">نطاق السعر</h4>
                  <div className="space-y-1">
                    {subcategory.price_ranges.map((range: any) => (
                      <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={filters.priceRange.includes(`${range.min}-${range.max || ''}`)} 
                          onChange={() => toggleFilter('priceRange', `${range.min}-${range.max || ''}`)}
                          className="h-4 w-4 rounded-sm border-gray-300 text-[#00998F] focus:ring-[#00998F]"
                        />
                        <span className="text-sm">{range.name} ({range.count})</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Features Filter */}
                <div>
                  <h4 className="font-medium mb-2">المميزات</h4>
                  <div className="space-y-1">
                    {subcategory.features.map((feature: any) => (
                      <label key={feature.id} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={filters.features.includes(feature.id.toString())} 
                          onChange={() => toggleFilter('features', feature.id.toString())}
                          className="h-4 w-4 rounded-sm border-gray-300 text-[#00998F] focus:ring-[#00998F]"
                        />
                        <span className="text-sm">{feature.name} ({feature.count})</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Availability Filter */}
                <div>
                  <h4 className="font-medium mb-2">التوفر</h4>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={filters.inStock} 
                        onChange={() => toggleFilter('inStock', '')}
                        className="h-4 w-4 rounded-sm border-gray-300 text-[#00998F] focus:ring-[#00998F]"
                      />
                      <span className="text-sm">متوفر فقط</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={filters.onSale} 
                        onChange={() => toggleFilter('onSale', '')}
                        className="h-4 w-4 rounded-sm border-gray-300 text-[#00998F] focus:ring-[#00998F]"
                      />
                      <span className="text-sm">عروض فقط</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearFilters}
                >
                  مسح الكل
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  عرض النتائج
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block">
              <div className="bg-white rounded-sm shadow-sm p-4 sticky top-4">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-[#00998F]" />
                  الفلاتر
                </h3>
                
                <div className="space-y-6">
                  {/* Brands Filter */}
                  <div>
                    <h4 className="font-medium mb-3 border-r-2 border-[#00998F] pr-2">الماركات</h4>
                    <div className="space-y-2">
                      {subcategory.brands.map((brand: any) => (
                        <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={filters.brands.includes(brand.name)} 
                            onChange={() => toggleFilter('brands', brand.name)}
                            className="h-4 w-4 rounded-sm border-gray-300 text-[#00998F] focus:ring-[#00998F]"
                          />
                          <span className="text-sm">{brand.name} ({brand.count})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div>
                    <h4 className="font-medium mb-3 border-r-2 border-[#00998F] pr-2">نطاق السعر</h4>
                    <div className="space-y-2">
                      {subcategory.price_ranges.map((range: any) => (
                        <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={filters.priceRange.includes(`${range.min}-${range.max || ''}`)} 
                            onChange={() => toggleFilter('priceRange', `${range.min}-${range.max || ''}`)}
                            className="h-4 w-4 rounded-sm border-gray-300 text-[#00998F] focus:ring-[#00998F]"
                          />
                          <span className="text-sm">{renderPriceRange(range.min, range.max)} ({range.count})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Features Filter */}
                  <div>
                    <h4 className="font-medium mb-3 border-r-2 border-[#00998F] pr-2">المميزات</h4>
                    <div className="space-y-2">
                      {subcategory.features.map((feature: any) => (
                        <label key={feature.id} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={filters.features.includes(feature.id.toString())} 
                            onChange={() => toggleFilter('features', feature.id.toString())}
                            className="h-4 w-4 rounded-sm border-gray-300 text-[#00998F] focus:ring-[#00998F]"
                          />
                          <span className="text-sm">{feature.name} ({feature.count})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Availability Filter */}
                  <div>
                    <h4 className="font-medium mb-3 border-r-2 border-[#00998F] pr-2">التوفر</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={filters.inStock} 
                          onChange={() => toggleFilter('inStock', '')}
                          className="h-4 w-4 rounded-sm border-gray-300 text-[#00998F] focus:ring-[#00998F]"
                        />
                        <span className="text-sm">متوفر فقط</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={filters.onSale} 
                          onChange={() => toggleFilter('onSale', '')}
                          className="h-4 w-4 rounded-sm border-gray-300 text-[#00998F] focus:ring-[#00998F]"
                        />
                        <span className="text-sm">عروض فقط</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Clear Filters */}
                  {Object.values(filters).some(filter => 
                    Array.isArray(filter) ? filter.length > 0 : filter
                  ) && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      مسح جميع الفلاتر
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="md:col-span-3">
              {filteredProducts.length === 0 ? (
                <Alert 
                  title="لا توجد منتجات" 
                  description="لم نتمكن من العثور على منتجات تطابق معايير البحث الخاصة بك. يرجى تجربة معايير أخرى."
                  variant="warning"
                  action={{
                    label: "مسح الفلاتر",
                    onClick: clearFilters
                  }}
                />
              ) : (
                <>
                  {/* Grid View */}
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {currentProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                  
                  {/* List View */}
                  {viewMode === 'list' && (
                    <div className="space-y-6 mb-8">
                      {currentProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-sm shadow-sm overflow-hidden relative">
                          <div className="flex flex-col sm:flex-row">
                            {/* Product Image */}
                            <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
                              <Link href={`/product/${product.id}`}>
                                <Image 
                                  src={product.image || "/placeholder.svg"} 
                                  alt={product.name} 
                                  fill 
                                  className="object-contain p-4" 
                                />
                              </Link>
                              
                              {/* Badges */}
                              <div className="absolute top-2 right-2 flex flex-col gap-1">
                                {product.isNew && (
                                  <span className="bg-[#00998F] text-white text-xs font-bold px-2 py-0.5 rounded-sm">جديد</span>
                                )}
                                {product.isBestSeller && (
                                  <span className="bg-[#83c5be] text-[#393e41] text-xs font-bold px-2 py-0.5 rounded-sm">الأكثر مبيعاً</span>
                                )}
                                {product.isDiscounted && (
                                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                                    خصم {product.discount}%
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Product Info */}
                            <div className="p-4 flex-1 flex flex-col">
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <Link href={`/product/${product.id}`} className="block">
                                      <h3 className="font-bold text-lg mb-1 hover:text-[#00998F]">
                                        {product.name}
                                      </h3>
                                    </Link>
                                    
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => {
                                          const starValue = i + 1;
                                          return (
                                            <span key={i}>
                                              {starValue <= Math.floor(product.rating) ? (
                                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                              ) : starValue - 0.5 <= product.rating ? (
                                                <StarHalf className="h-4 w-4 text-amber-400 fill-amber-400" />
                                              ) : (
                                                <Star className="h-4 w-4 text-gray-300" />
                                              )}
                                            </span>
                                          );
                                        })}
                                      </div>
                                      <span className="text-sm text-gray-600">({product.reviewCount})</span>
                                    </div>
                                    
                                    <div className="text-sm text-gray-600 mb-2">
                                      الماركة: <span className="font-medium">{product.brand}</span>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    {product.oldPrice ? (
                                      <div className="flex flex-col items-end">
                                        <span className="font-bold text-lg text-[#00998F]">{product.price.toFixed(2)} دينار</span>
                                        <span className="text-sm text-gray-500 line-through">{product.oldPrice.toFixed(2)} دينار</span>
                                      </div>
                                    ) : (
                                      <span className="font-bold text-lg text-[#00998F]">{product.price.toFixed(2)} دينار</span>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="mt-2">
                                  <p className="text-gray-600 text-sm line-clamp-2">
                                    {/* Product description would go here */}
                                    مثقاب كهربائي احترافي من {product.brand} بتصميم مريح وأداء قوي، مثالي للاستخدامات المنزلية والمهنية.
                                  </p>
                                </div>
                                
                                <div className="flex items-center mt-2">
                                  <span className="text-sm ml-2">الحالة:</span>
                                  {renderStockStatus(product.stock)}
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex items-center gap-1"
                                  onClick={() => {/* Add to wishlist logic */}}
                                >
                                  <Heart className="h-4 w-4 ml-1" />
                                  المفضلة
                                </Button>
                                
                                <Button 
                                  size="sm"
                                  className="flex items-center gap-1"
                                  disabled={product.stock === 'out_of_stock'}
                                  onClick={() => {/* Add to cart logic */}}
                                >
                                  <ShoppingCart className="h-4 w-4 ml-1" />
                                  إضافة للسلة
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                      className="my-6"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
