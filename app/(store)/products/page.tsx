"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X, ChevronDown, ChevronUp, Grid, List, ShoppingBag, Star } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
} from "@/components/ui/breadcrumb"
import { ProductCard } from "@/components/ui/product-card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioItem } from "@/components/ui/radio-group"
import { EmptyState } from "@/components/ui/empty-state"
import {
  Select,
} from "@/components/ui/select"

// Mock products data
const generateProducts = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `منتج ${i + 1} ${i % 3 === 0 ? 'مثقاب كهربائي' : i % 3 === 1 ? 'مفك كهربائي' : 'منشار كهربائي'}`,
    category: i % 3 === 0 ? 'electrical-tools' : i % 3 === 1 ? 'building-materials' : 'plumbing',
    subcategory: i % 3 === 0 ? 'drills' : i % 3 === 1 ? 'screwdrivers' : 'saws',
    price: 50 + (i * 10),
    oldPrice: i % 2 === 0 ? 70 + (i * 10) : undefined,
    rating: 3 + (i % 3),
    reviewCount: 10 + i,
    image: "/placeholder.svg?height=300&width=300",
    isNew: i % 5 === 0,
    isBestSeller: i % 7 === 0,
    isDiscounted: i % 2 === 0,
    discount: i % 2 === 0 ? 10 + (i % 3) * 5 : undefined,
    brand: i % 4 === 0 ? 'بوش' : i % 4 === 1 ? 'ماكيتا' : i % 4 === 2 ? 'ديوالت' : 'بلاك آند ديكر',
    inStock: i % 10 !== 9,
  }))
}

const productsData = generateProducts(24)

// Filter options
const categories = [
  { id: 'all', name: 'جميع الفئات' },
  { id: 'electrical-tools', name: 'عدد كهربائية' },
  { id: 'building-materials', name: 'مواد بناء' },
  { id: 'plumbing', name: 'سباكة' }
]

const brands = [
  { id: 'bosch', name: 'بوش' },
  { id: 'makita', name: 'ماكيتا' },
  { id: 'dewalt', name: 'ديوالت' },
  { id: 'black-decker', name: 'بلاك آند ديكر' }
]

const priceRanges = [
  { id: 'all', name: 'جميع الأسعار' },
  { id: '0-100', name: 'أقل من 100 دينار' },
  { id: '100-200', name: '100 - 200 دينار' },
  { id: '200-300', name: '200 - 300 دينار' },
  { id: '300+', name: 'أكثر من 300 دينار' }
]

const sortOptions = [
  { value: 'featured', label: 'الأكثر شيوعاً' },
  { value: 'newest', label: 'الأحدث' },
  { value: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-desc', label: 'السعر: من الأعلى للأقل' },
  { value: 'rating', label: 'التقييم' }
]

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState(productsData)
  const [filteredProducts, setFilteredProducts] = useState(productsData)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    brands: [] as string[],
    priceRange: 'all',
    onlyInStock: false,
    onlyDiscounted: false
  })
  const [sortBy, setSortBy] = useState('featured')
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = [...productsData]
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply category filter
    if (activeFilters.category !== 'all') {
      filtered = filtered.filter(product => product.category === activeFilters.category)
    }
    
    // Apply brand filter
    if (activeFilters.brands.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.brands.includes(product.brand.toLowerCase().replace(' ', '-'))
      )
    }
    
    // Apply price range filter
    if (activeFilters.priceRange !== 'all') {
      const [min, max] = activeFilters.priceRange.split('-').map(Number)
      if (max) {
        filtered = filtered.filter(product => product.price >= min && product.price <= max)
      } else {
        filtered = filtered.filter(product => product.price >= min)
      }
    }
    
    // Apply in stock filter
    if (activeFilters.onlyInStock) {
      filtered = filtered.filter(product => product.inStock)
    }
    
    // Apply discount filter
    if (activeFilters.onlyDiscounted) {
      filtered = filtered.filter(product => product.isDiscounted)
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered = [...filtered].sort((a, b) => b.id - a.id)
        break
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      default:
        // featured - no additional sorting
        break
    }
    
    setFilteredProducts(filtered)
  }, [searchTerm, activeFilters, sortBy])

  const toggleBrandFilter = (brandId: string) => {
    setActiveFilters(prev => {
      const brands = prev.brands.includes(brandId)
        ? prev.brands.filter(id => id !== brandId)
        : [...prev.brands, brandId]
      
      return { ...prev, brands }
    })
  }

  const clearAllFilters = () => {
    setActiveFilters({
      category: 'all',
      brands: [],
      priceRange: 'all',
      onlyInStock: false,
      onlyDiscounted: false
    })
    setSearchTerm("")
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <div className="h-6 bg-gray-200 rounded-sm w-1/3 mb-6 animate-pulse"></div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar Skeleton */}
              <div className="md:w-1/4 lg:w-1/5">
                <div className="h-96 bg-gray-200 rounded-sm animate-pulse"></div>
              </div>
              
              {/* Main Content Skeleton */}
              <div className="md:w-3/4 lg:w-4/5">
                <div className="h-12 bg-gray-200 rounded-sm mb-6 animate-pulse"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 8, 9].map((item) => (
                    <div key={item} className="h-64 bg-gray-200 rounded-sm animate-pulse"></div>
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Breadcrumb 
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "المنتجات" }
            ]}
            className="mb-6"
          />
          
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full"
              icon={Filter}
              iconPosition="right"
            >
              {showFilters ? "إخفاء الفلاتر" : "عرض الفلاتر"}
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 768) && (
                <motion.div 
                  className="md:w-1/4 lg:w-1/5 bg-white border border-gray-200 rounded-sm p-4 mb-4 md:mb-0"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">الفلاتر</h2>
                    <button 
                      onClick={clearAllFilters}
                      className="text-sm text-[#00998F] hover:underline"
                    >
                      مسح الكل
                    </button>
                  </div>
                  
                  {/* Categories Filter */}
                  <div className="mb-4 border-b border-gray-200 pb-4">
                    <button 
                      className="flex justify-between items-center w-full mb-2"
                      onClick={() => toggleSection('categories')}
                    >
                      <h3 className="font-bold">الفئات</h3>
                      {expandedSections.categories ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections.categories && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <RadioGroup 
                            value={activeFilters.category} 
                            onChange={(value) => setActiveFilters(prev => ({ ...prev, category: value }))}
                          >
                            {categories.map((category) => (
                              <RadioItem 
                                key={category.id} 
                                value={category.id} 
                                label={category.name} 
                              />
                            ))}
                          </RadioGroup>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Brands Filter */}
                  <div className="mb-4 border-b border-gray-200 pb-4">
                    <button 
                      className="flex justify-between items-center w-full mb-2"
                      onClick={() => toggleSection('brands')}
                    >
                      <h3 className="font-bold">الماركات</h3>
                      {expandedSections.brands ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections.brands && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="space-y-2">
                            {brands.map((brand) => (
                              <div key={brand.id} className="flex items-center">
                                <Checkbox
                                  id={`brand-${brand.id}`}
                                  checked={activeFilters.brands.includes(brand.id)}
                                  onCheckedChange={() => toggleBrandFilter(brand.id)}
                                />
                                <label 
                                  htmlFor={`brand-${brand.id}`}
                                  className="mr-2 text-sm cursor-pointer"
                                >
                                  {brand.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div className="mb-4 border-b border-gray-200 pb-4">
                    <button 
                      className="flex justify-between items-center w-full mb-2"
                      onClick={() => toggleSection('price')}
                    >
                      <h3 className="font-bold">نطاق السعر</h3>
                      {expandedSections.price ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections.price && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <RadioGroup 
                            value={activeFilters.priceRange} 
                            onChange={(value) => setActiveFilters(prev => ({ ...prev, priceRange: value }))}
                          >
                            {priceRanges.map((range) => (
                              <RadioItem 
                                key={range.id} 
                                value={range.id} 
                                label={range.name} 
                              />
                            ))}
                          </RadioGroup>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Additional Filters */}
                  <div>
                    <h3 className="font-bold mb-2">فلاتر إضافية</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox
                          id="in-stock"
                          checked={activeFilters.onlyInStock}
                          onCheckedChange={(checked) => 
                            setActiveFilters(prev => ({ ...prev, onlyInStock: !!checked }))
                          }
                        />
                        <label 
                          htmlFor="in-stock"
                          className="mr-2 text-sm cursor-pointer"
                        >
                          متوفر في المخزون فقط
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <Checkbox
                          id="discounted"
                          checked={activeFilters.onlyDiscounted}
                          onCheckedChange={(checked) => 
                            setActiveFilters(prev => ({ ...prev, onlyDiscounted: !!checked }))
                          }
                        />
                        <label 
                          htmlFor="discounted"
                          className="mr-2 text-sm cursor-pointer"
                        >
                          العروض فقط
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Products Content */}
            <div className="md:w-3/4 lg:w-4/5">
              {/* Search and Sort Bar */}
              <div className="bg-white border border-gray-200 rounded-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Input
                      type="text"
                      placeholder="ابحث عن منتج..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    {searchTerm && (
                      <button 
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setSearchTerm("")}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Select
                      value={sortBy}
                      onChange={(value) => setSortBy(value)}
                      options={sortOptions}
                      className="w-48"
                    />
                    
                    <div className="flex border border-gray-200 rounded-sm overflow-hidden">
                      <button 
                        className={`p-2 ${viewMode === 'grid' ? 'bg-[#00998F] text-white' : 'bg-white text-gray-600'}`}
                        onClick={() => setViewMode('grid')}
                        aria-label="عرض شبكي"
                      >
                        <Grid className="h-5 w-5" />
                      </button>
                      <button 
                        className={`p-2 ${viewMode === 'list' ? 'bg-[#00998F] text-white' : 'bg-white text-gray-600'}`}
                        onClick={() => setViewMode('list')}
                        aria-label="عرض قائمة"
                      >
                        <List className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Results Info */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  عرض {filteredProducts.length} من {productsData.length} منتج
                </p>
                
                {/* Active Filters */}
                {(activeFilters.category !== 'all' || 
                  activeFilters.brands.length > 0 || 
                  activeFilters.priceRange !== 'all' || 
                  activeFilters.onlyInStock || 
                  activeFilters.onlyDiscounted) && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">الفلاتر النشطة:</span>
                    <button 
                      onClick={clearAllFilters}
                      className="text-sm text-[#00998F] hover:underline flex items-center"
                    >
                      مسح الكل
                      <X className="h-4 w-4 mr-1" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Products Grid/List */}
              {filteredProducts.length === 0 ? (
                <EmptyState
                  title="لا توجد منتجات"
                  description="لم يتم العثور على منتجات تطابق معايير البحث الخاصة بك. يرجى تعديل الفلاتر أو البحث بكلمات مختلفة."
                  icon={ShoppingBag}
                  actions={{
                    primary: {
                        label: "مسح الفلاتر",
                    onClick: clearAllFilters
                    }
                  }}
                  className="py-16 bg-white border border-gray-200 rounded-sm"
                />
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {filteredProducts.map((product) => (
                        <motion.div key={product.id} variants={item}>
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {filteredProducts.map((product) => (
                        <motion.div 
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white border border-gray-200 rounded-sm overflow-hidden"
                        >
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
                              <Image
                                src={'https://img.freepik.com/premium-photo/battery-drill_101296-71.jpg?ga=GA1.1.259795667.1741285641&semt=ais_keywords_boost' || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-contain"
                              />
                              {product.isNew && (
                                <span className="absolute top-2 right-2 bg-[#00998F] text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                                  جديد
                                </span>
                              )}
                              {product.isDiscounted && (
                                <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                                  خصم {product.discount}%
                                </span>
                              )}
                            </div>
                            
                            <div className="p-4 flex-grow">
                              <div className="flex justify-between">
                                <h3 className="font-bold text-lg mb-1">
                                  <Link href={`/product/${product.id}`} className="hover:text-[#00998F]">
                                    {product.name}
                                  </Link>
                                </h3>
                                <div className="flex items-center gap-1">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < Math.floor(product.rating) ? "text-[#00998F] fill-[#00998F]" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500">({product.reviewCount})</span>
                                </div>
                              </div>
                              
                              <p className="text-gray-600 mb-4 line-clamp-2">
                                وصف المنتج يظهر هنا. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.
                              </p>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-lg">{product.price} دينار</span>
                                  {product.oldPrice && (
                                    <span className="text-gray-400 text-sm line-through">{product.oldPrice} دينار</span>
                                  )}
                                </div>
                                
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm"
                                    icon={ShoppingBag}
                                    iconPosition="right"
                                  >
                                    إضافة للسلة
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
              
              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex border border-gray-200 rounded-sm overflow-hidden">
                    <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
                      السابق
                    </button>
                    <button className="px-4 py-2 bg-[#00998F] text-white">1</button>
                    <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-50">2</button>
                    <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-50">3</button>
                    <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-50">التالي</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
