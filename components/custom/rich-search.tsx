"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Search, X, Filter, ChevronDown, ChevronUp, ArrowLeft, ShoppingBag, Heart, Clock, Star, Zap, Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
} from "@/components/ui/select"
import { EmptyState } from "@/components/ui/empty-state"
import { useGetQuery } from "@/src/providers/hooks/queries-actions"
import { debounce } from "lodash"
import type { Brand, Category, PaginatedProductsResponse, ProductFilters } from "@/src/types"
import type { WithPagination } from "@/src/types/with-pagination"

// Price Ranges
const priceRanges = [
  { id: "all", name: "جميع الأسعار", min: null, max: null },
  { id: "0-100", name: "أقل من 100 دينار", min: 0, max: 100 },
  { id: "100-200", name: "100 - 200 دينار", min: 100, max: 200 },
  { id: "200-300", name: "200 - 300 دينار", min: 200, max: 300 },
  { id: "300+", name: "أكثر من 300 دينار", min: 300, max: null },
]

// Sort Options
const sortOptions = [
  { value: "created_at:desc", label: "الأحدث" },
  { value: "sell_price:asc", label: "السعر: من الأقل للأعلى" },
  { value: "sell_price:desc", label: "السعر: من الأعلى للأقل" },
  { value: "overall_rating:desc", label: "التقييم الأعلى" },
  { value: "name:asc", label: "الاسم (أ-ي)" },
]

interface RichSearchProps {
  placeholder?: string
  className?: string
}

export function RichSearch({ placeholder = "ابحث عن منتجات...", className = "" }: RichSearchProps) {
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // State
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortValue, setSortValue] = useState<string>(sortOptions[0].value)
  const [priceRangeValue, setPriceRangeValue] = useState<string>("all")
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
  })
  const [filters, setFilters] = useState<ProductFilters>({ page: 1 })
  const [isMounted, setIsMounted] = useState(false)

  // Effect to handle mounting (for portal)
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Effect to handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Effect to handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeSearch()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  // API Calls
  const buildProductQueryString = (currentFilters: ProductFilters): string => {
    const params = new URLSearchParams()
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "" && value !== false) {
        if (key === "onlyInStock" && value === true) {
          params.append("status", "active")
        } else if (key === "onlyDiscounted" && value === true) {
          params.append("has_discount", "true")
        } else if (key !== "onlyInStock" && key !== "onlyDiscounted") {
          params.append(key, String(value))
        }
      }
    })
    return params.toString()
  }

  const productQueryString = buildProductQueryString(filters)
  const { data: productsResponse, isLoading: isLoadingProducts } = useGetQuery<PaginatedProductsResponse>({
    url: `/products?${productQueryString}`,
    key: ["search-products", filters],
    options: {
      enabled: isOpen && !!searchTerm,
    },
  })

  const { data: categoriesData, isLoading: isLoadingCategories } = useGetQuery<WithPagination<Category[]>>({
    url: "/catalog/categories",
    key: ["catalog/categories"],
    options: {
      enabled: isOpen,
    },
  })

  const { data: brandsData, isLoading: isLoadingBrands } = useGetQuery<Brand[]>({
    url: "/brands",
    key: ["brands"],
    options: {
      enabled: isOpen,
    },
  })

  // Handlers
  const openSearch = () => {
    setIsOpen(true)
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }

  const closeSearch = () => {
    setIsOpen(false)
    setSearchTerm("")
    setFilters({ page: 1 })
  }

  const debouncedUpdateSearch = useCallback(
    debounce((value: string) => {
      setFilters((prev) => ({ ...prev, search: value || undefined, page: 1 }))
    }, 500),
    []
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedUpdateSearch(value)
  }

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sub_category_id: value === "all" ? null : value, page: 1 }))
  }

  const handleBrandChange = (brandId: string) => {
    setFilters((prev) => ({ ...prev, brand_id: brandId === "all" ? null : brandId, page: 1 }))
  }

  const handlePriceRangeChange = (value: string) => {
    setPriceRangeValue(value)
    const selectedRange = priceRanges.find((r) => r.id === value)
    setFilters((prev) => ({
      ...prev,
      min_price: selectedRange?.min ?? null,
      max_price: selectedRange?.max ?? null,
      page: 1,
    }))
  }

  const handleSortChange = (value: string) => {
    setSortValue(value)
    const [field, direction] = value.split(":")
    setFilters((prev) => ({
      ...prev,
      sort_by: field,
      sort_dir: direction as "asc" | "desc",
      page: 1,
    }))
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSortValue(sortOptions[0].value)
    setPriceRangeValue("all")
    setFilters({ page: 1, search: searchTerm || undefined })
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const navigateToProduct = (productId: number | string) => {
    router.push(`/product/${productId}`)
    closeSearch()
  }

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  const dialogVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } },
  }

  const resultsVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const resultItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Render search dialog
  const renderSearchDialog = () => {
    const products = productsResponse?.data || []
    const paginationMeta = productsResponse?.meta
    const isLoading = isLoadingProducts || isLoadingCategories || isLoadingBrands

    return (
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={closeSearch}
      >
        <motion.div
          ref={dialogRef}
          className="h-full w-full bg-white overflow-hidden flex flex-col"
          variants={dialogVariants}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-gray-200 p-4 flex items-center gap-4">
            <button onClick={closeSearch} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="ابحث عن منتجات..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pr-10 py-2 text-lg"
                autoFocus
              />
              <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              {searchTerm && (
                <button
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                  onClick={() => {
                    setSearchTerm("")
                    debouncedUpdateSearch("")
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-auto">
            <div className="flex h-full">
              {/* Filters Sidebar */}
              <div className="w-1/4 lg:w-1/5 border-l border-gray-200 p-4 overflow-y-auto bg-gray-50 hidden md:block">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">الفلاتر</h2>
                  <button onClick={clearAllFilters} className="text-sm text-[#00998F] hover:underline">
                    مسح الكل
                  </button>
                </div>

                {/* Categories Filter */}
                <div className="mb-4 border-b border-gray-200 pb-4">
                  <button
                    className="flex justify-between items-center w-full mb-2"
                    onClick={() => toggleSection("categories")}
                  >
                    <h3 className="font-bold">الفئات</h3>{" "}
                    {expandedSections.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.categories && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <RadioGroup value={filters.sub_category_id || "all"} onChange={handleCategoryChange}>
                          <RadioItem key="all-cats" value="all" label="جميع الفئات" />
                          {(categoriesData?.data || []).map((category) => (
                            <RadioItem key={category.id} value={category.id.toString()} label={category.name as string} />
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
                    onClick={() => toggleSection("brands")}
                  >
                    <h3 className="font-bold">الماركات</h3>{" "}
                    {expandedSections.brands ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.brands && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Select
                          options={[
                            { value: "all", label: "جميع الماركات" },
                            ...(brandsData || []).map((brand) => ({
                              value: brand.id.toString(),
                              label: brand.name,
                            })),
                          ]}
                          value={filters.brand_id || "all"}
                          onChange={(value) => handleBrandChange(value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Price Range Filter */}
                <div className="mb-4 border-b border-gray-200 pb-4">
                  <button
                    className="flex justify-between items-center w-full mb-2"
                    onClick={() => toggleSection("price")}
                  >
                    <h3 className="font-bold">نطاق السعر</h3>{" "}
                    {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.price && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <RadioGroup value={priceRangeValue} onChange={handlePriceRangeChange}>
                          {priceRanges.map((range) => (
                            <RadioItem key={range.id} value={range.id} label={range.name} />
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
                        checked={!!filters.onlyInStock}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({ ...prev, onlyInStock: !!checked, page: 1 }))
                        }
                      />
                      <label htmlFor="in-stock" className="mr-2 text-sm cursor-pointer">
                        متوفر في المخزون فقط
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="discounted"
                        checked={!!filters.onlyDiscounted}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({ ...prev, onlyDiscounted: !!checked, page: 1 }))
                        }
                      />
                      <label htmlFor="discounted" className="mr-2 text-sm cursor-pointer">
                        العروض فقط
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Area */}
              <div className="flex-grow p-4 overflow-y-auto">
                {/* Sort and Filter Controls */}
                <div className="flex justify-between items-center mb-6">
                  <div className="md:hidden">
                    <Button variant="outline" size="sm" icon={Filter}>
                      الفلاتر
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">ترتيب حسب:</span>
                    <Select
                      options={sortOptions.map((option) => ({ value: option.value, label: option.label }))}
                      value={sortValue}
                      onChange={handleSortChange}
                      className="w-48"
                    />
                  </div>
                </div>

                {/* Results Info */}
                {searchTerm && !isLoading && (
                  <div className="mb-4 text-sm text-gray-600">
                    {paginationMeta?.total ? (
                      <p>
                        تم العثور على {paginationMeta.total} نتيجة لـ &quot;{searchTerm}&quot;
                      </p>
                    ) : (
                      <p>لا توجد نتائج لـ &quot;{searchTerm}&quot;</p>
                    )}
                  </div>
                )}

                {/* Loading State */}
                {isLoading && (
                  <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-10 w-10 text-[#00998F] animate-spin mb-4" />
                    <p className="text-gray-500">جاري البحث...</p>
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && searchTerm && products.length === 0 && (
                  <EmptyState
                    title="لا توجد نتائج"
                    description="لم نجد منتجات تطابق بحثك. حاول تعديل الفلاتر أو البحث بكلمات أخرى."
                    icon={Search}
                    actions={{
                      primary: {
                        label: "مسح الفلاتر",
                      onClick: clearAllFilters,
                      }
                    }}
                    className="py-16"
                  />
                )}

                {/* Initial State */}
                {!isLoading && !searchTerm && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Search className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">ابدأ البحث</h3>
                    <p className="text-gray-500 max-w-md">اكتب ما تبحث عنه في مربع البحث أعلاه للعثور على المنتجات</p>
                  </div>
                )}

                {/* Results Grid */}
                {!isLoading && searchTerm && products.length > 0 && (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={resultsVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        className="group bg-white rounded-lg overflow-hidden transition-shadow border border-gray-200"
                        variants={resultItemVariants}
                        onClick={() => navigateToProduct(product.id)}
                      >
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <Image
                            src={product.main_image_url || "/placeholder.svg?height=300&width=300"}
                            alt={product.name}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.discount_percentage > 0 && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
                              {product.discount_percentage}% خصم
                            </div>
                          )}
                          {product.is_new && (
                            <div className="absolute top-2 right-2 bg-[#00998F] text-white text-xs font-bold px-2 py-1 rounded-sm">
                              جديد
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <h3 className="font-medium text-base line-clamp-2 mb-1 group-hover:text-[#00998F] transition-colors">
                              {product.name}
                            </h3>
                            {(product.overall_rating  ?? 0) > 0 && (
                              <div className="flex items-center gap-1 text-amber-500 flex-shrink-0">
                                <Star className="h-3.5 w-3.5 fill-current" />
                                <span className="text-xs font-medium">{product.overall_rating}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                            <span>{product.category_name}</span>
                            {/* {product.brand_name && (
                              <>
                                <span>•</span>
                                <span>{product.brand_name}</span>
                              </>
                            )} */}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              {product.discount_price ? (
                                <>
                                  <span className="font-bold text-base">{product.discount_price} دينار</span>
                                  <span className="text-xs text-gray-500 line-through">
                                    {product.price} دينار
                                  </span>
                                </>
                              ) : (
                                <span className="font-bold text-base">{product.price} دينار</span>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {product.is_in_stock ? (
                                <div className="flex items-center text-xs text-green-600">
                                  <Zap className="h-3.5 w-3.5 mr-0.5" />
                                  <span>متوفر</span>
                                </div>
                              ) : (
                                <div className="flex items-center text-xs text-red-500">
                                  <Clock className="h-3.5 w-3.5 mr-0.5" />
                                  <span>نفذت الكمية</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex border-t border-gray-100">
                          <button
                            className="flex-1 py-2 text-center text-sm font-medium text-[#00998F] hover:bg-[#00998F]/5 transition-colors flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Add to wishlist logic
                            }}
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            <span>المفضلة</span>
                          </button>
                          <button
                            className="flex-1 py-2 text-center text-sm font-medium text-[#00998F] hover:bg-[#00998F]/5 transition-colors border-r border-gray-100 flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Add to cart logic
                            }}
                          >
                            <ShoppingBag className="h-4 w-4 mr-1" />
                            <span>أضف للسلة</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* View All Results Button */}
                {!isLoading && searchTerm && products.length > 0 && (
                  <div className="mt-8 text-center">
                    <Link
                      href={`/products?search=${searchTerm}`}
                      className="inline-flex items-center text-[#00998F] hover:underline"
                      onClick={closeSearch}
                    >
                      عرض كل النتائج <ArrowLeft className="h-4 w-4 mr-1" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <>
      <div
        className={`relative flex items-center border border-gray-200 rounded-md bg-white hover:border-[#00998F] transition-colors ${className}`}
        onClick={openSearch}
      >
        <Search className="absolute right-3 text-gray-400 h-5 w-5" />
        <input
          type="text"
          readOnly
          placeholder={placeholder}
          className="w-full py-2 px-4 pr-10 bg-transparent border-none focus:outline-none cursor-pointer"
        />
      </div>

      {isMounted &&
        createPortal(
          <AnimatePresence>{isOpen && renderSearchDialog()}</AnimatePresence>,
          document.body
        )}
    </>
  )
}
