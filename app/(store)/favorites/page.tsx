"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Trash2, Search } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button, IconButton } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Pagination } from "@/components/ui/pagination"
import { EmptyState } from "@/components/ui/empty-state"
import { Checkbox } from "@/components/ui/checkbox"

// Mock favorites data
const mockFavorites = [
  {
    id: 1,
    name: "مثقاب كهربائي احترافي بوش GSB 13 RE",
    price: 120.0,
    discount_price: 102.0,
    image: "/placeholder.svg?height=300&width=300",
    category: "العدد الكهربائية",
    stock_status: "in_stock",
    date_added: "2023-10-15T09:30:00",
    rating: 4.5,
  },
  {
    id: 2,
    name: "مفك كهربائي بوش GSR 12V",
    price: 95.0,
    discount_price: null,
    image: "/placeholder.svg?height=300&width=300",
    category: "العدد الكهربائية",
    stock_status: "in_stock",
    date_added: "2023-10-10T11:45:00",
    rating: 4.2,
  },
  {
    id: 3,
    name: "منشار دائري بوش GKS 190",
    price: 150.0,
    discount_price: null,
    image: "/placeholder.svg?height=300&width=300",
    category: "العدد الكهربائية",
    stock_status: "low_stock",
    date_added: "2023-09-28T08:15:00",
    rating: 4.7,
  },
  {
    id: 4,
    name: "جلاخة زاوية بوش GWS 7-125",
    price: 110.0,
    discount_price: 99.0,
    image: "/placeholder.svg?height=300&width=300",
    category: "العدد الكهربائية",
    stock_status: "in_stock",
    date_added: "2023-09-15T13:20:00",
    rating: 4.3,
  },
  {
    id: 5,
    name: "طقم عدة يدوية ستانلي 94 قطعة",
    price: 85.0,
    discount_price: null,
    image: "/placeholder.svg?height=300&width=300",
    category: "العدد اليدوية",
    stock_status: "in_stock",
    date_added: "2023-09-05T10:10:00",
    rating: 4.8,
  },
  {
    id: 6,
    name: "مضخة مياه غاطسة 1 حصان",
    price: 75.0,
    discount_price: null,
    image: "/placeholder.svg?height=300&width=300",
    category: "مضخات المياه",
    stock_status: "out_of_stock",
    date_added: "2023-08-22T14:30:00",
    rating: 4.0,
  },
]

// Category options
const categoryOptions = [
  { value: "", label: "جميع الفئات" },
  { value: "العدد الكهربائية", label: "العدد الكهربائية" },
  { value: "العدد اليدوية", label: "العدد اليدوية" },
  { value: "مضخات المياه", label: "مضخات المياه" },
]

// Sort options
const sortOptions = [
  { value: "date_desc", label: "الأحدث أولاً" },
  { value: "date_asc", label: "الأقدم أولاً" },
  { value: "price_asc", label: "السعر: من الأقل إلى الأعلى" },
  { value: "price_desc", label: "السعر: من الأعلى إلى الأقل" },
  { value: "name_asc", label: "الاسم: أ-ي" },
  { value: "name_desc", label: "الاسم: ي-أ" },
]

// Stock status options
const stockOptions = [
  { value: "", label: "جميع المنتجات" },
  { value: "in_stock", label: "متوفر" },
  { value: "low_stock", label: "متوفر بكمية محدودة" },
  { value: "out_of_stock", label: "غير متوفر" },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([])
  const [filteredFavorites, setFilteredFavorites] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [stockFilter, setStockFilter] = useState("")
  const [sortOption, setSortOption] = useState("date_desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const itemsPerPage = 8

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFavorites(mockFavorites)
      setFilteredFavorites(mockFavorites)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // Apply filters and sorting
    let result = [...favorites]

    // Apply search filter
    if (searchTerm) {
      result = result.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply category filter
    if (categoryFilter) {
      result = result.filter((item) => item.category === categoryFilter)
    }

    // Apply stock filter
    if (stockFilter) {
      result = result.filter((item) => item.stock_status === stockFilter)
    }

    // Apply sorting
    switch (sortOption) {
      case "date_desc":
        result.sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime())
        break
      case "date_asc":
        result.sort((a, b) => new Date(a.date_added).getTime() - new Date(b.date_added).getTime())
        break
      case "price_asc":
        result.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price))
        break
      case "price_desc":
        result.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price))
        break
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name_desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    setFilteredFavorites(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [favorites, searchTerm, categoryFilter, stockFilter, sortOption])

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredFavorites.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage)

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("ar-EG", options)
  }

  // Handle item selection
  const toggleItemSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedItems.length === currentItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(currentItems.map((item) => item.id))
    }
  }

  // Remove from favorites
  const removeFromFavorites = (ids: number[]) => {
    setFavorites(favorites.filter((item) => !ids.includes(item.id)))
    setSelectedItems(selectedItems.filter((id) => !ids.includes(id)))
  }

  // Add to cart
  const addToCart = (id: number) => {
    // Simulate adding to cart
    console.log(`Added item ${id} to cart`)
    // Here you would typically call an API to add the item to the cart
  }

  // Render stock status
  const renderStockStatus = (status: string) => {
    switch (status) {
      case "in_stock":
        return <span className="text-green-600">متوفر</span>
      case "low_stock":
        return <span className="text-amber-600">متوفر بكمية محدودة</span>
      case "out_of_stock":
        return <span className="text-red-600">غير متوفر</span>
      default:
        return <span>{status}</span>
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[{ label: "الرئيسية", href: "/" }, { label: "حسابي", href: "/account" }, { label: "المفضلة" }]}
            className="mb-6"
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">المفضلة</h1>
              <p className="text-gray-600">المنتجات التي قمت بإضافتها إلى المفضلة</p>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="px-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list"
                >
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-sm border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="البحث عن منتج..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                  iconPosition="right"
                />
              </div>
              <div>
                <Select
                  options={categoryOptions}
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                  placeholder="فلترة حسب الفئة"
                />
              </div>
              <div>
                <Select
                  options={stockOptions}
                  value={stockFilter}
                  onChange={setStockFilter}
                  placeholder="فلترة حسب التوفر"
                />
              </div>
              <div>
                <Select options={sortOptions} value={sortOption} onChange={setSortOption} placeholder="ترتيب حسب" />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-sm border border-gray-200 p-8 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-[#00998F] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>جاري تحميل المفضلة...</p>
            </div>
          ) : filteredFavorites.length === 0 ? (
            <EmptyState
              title="لا توجد منتجات في المفضلة"
              description={
                searchTerm || categoryFilter || stockFilter
                  ? "لا توجد منتجات تطابق معايير البحث الخاصة بك"
                  : "لم تقم بإضافة أي منتجات إلى المفضلة بعد"
              }
              icon={Heart}
              actions={{
                primary: {
                    label: "تصفح المنتجات",
                onClick: () => (window.location.href = "/products"),
                }
              }}
            />
          ) : (
            <>
              {/* Bulk Actions */}
              {selectedItems.length > 0 && (
                <div className="bg-[#00998F]/10 p-3 rounded-sm mb-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00998F] font-medium">تم تحديد {selectedItems.length} منتج</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromFavorites(selectedItems)}
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      icon={Trash2}
                    >
                      إزالة المحدد
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedItems([])}>
                      إلغاء التحديد
                    </Button>
                  </div>
                </div>
              )}

              {/* Grid View */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {currentItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-sm border border-gray-200 overflow-hidden relative group">
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 right-2 z-10">
                        <Checkbox 
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleItemSelection(item.id)}
                        />
                      </div>

                      {/* Product Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Link href={`/product/${item.id}`}>
                          <Image
                            src={'https://img.freepik.com/premium-photo/battery-drill_101296-71.jpg?ga=GA1.1.259795667.1741285641&semt=ais_keywords_boost' || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </Link>

                        {/* Discount Badge */}
                        {item.discount_price && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
                            {Math.round((1 - item.discount_price / item.price) * 100)}% خصم
                          </div>
                        )}

                        {/* Quick Actions */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 px-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex justify-between">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => addToCart(item.id)}
                              disabled={item.stock_status === "out_of_stock"}
                              className="text-xs px-2 py-1 h-7"
                              icon={ShoppingCart}
                            >
                              إضافة للسلة
                            </Button>
                            <IconButton
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromFavorites([item.id])}
                              icon={Trash2}
                              className="bg-white/80 hover:bg-white text-red-500 border-transparent hover:border-red-200 p-1 h-7 w-7"
                            >
                            </IconButton>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <Link href={`/product/${item.id}`} className="block">
                          <h3 className="font-bold text-base mb-1 line-clamp-2 min-h-[2.5rem] group-hover:text-[#00998F]">
                            {item.name}
                          </h3>
                        </Link>

                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">{item.category}</span>
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span className="text-sm ml-1">{item.rating}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            {item.discount_price ? (
                              <div className="flex flex-col">
                                <span className="font-bold text-[#00998F]">{item.discount_price.toFixed(2)} دينار</span>
                                <span className="text-sm text-gray-500 line-through">
                                  {item.price.toFixed(2)} دينار
                                </span>
                              </div>
                            ) : (
                              <span className="font-bold text-[#00998F]">{item.price.toFixed(2)} دينار</span>
                            )}
                          </div>
                          <div className="text-sm">{renderStockStatus(item.stock_status)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === "list" && (
                <div className="space-y-4 mb-6">
                  {currentItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-sm border border-gray-200 overflow-hidden relative">
                      <div className="flex flex-col sm:flex-row">
                        {/* Product Image */}
                        <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
                          <Link href={`/product/${item.id}`}>
                            <Image
                              src={'https://img.freepik.com/premium-photo/battery-drill_101296-71.jpg?ga=GA1.1.259795667.1741285641&semt=ais_keywords_boost' || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </Link>

                          {/* Discount Badge */}
                          {item.discount_price && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
                              {Math.round((1 - item.discount_price / item.price) * 100)}% خصم
                            </div>
                          )}

                          {/* Selection Checkbox */}
                          <div className="absolute top-2 right-2 z-10">
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onChange={() => toggleItemSelection(item.id)}
                            />
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex-1">
                            <Link href={`/product/${item.id}`} className="block">
                              <h3 className="font-bold text-lg mb-1 hover:text-[#00998F]">{item.name}</h3>
                            </Link>

                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">{item.category}</span>
                              <div className="flex items-center">
                                <svg className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                                <span className="text-sm ml-1">{item.rating}</span>
                              </div>
                            </div>

                            <div className="text-sm text-gray-600 mb-4">
                              تمت الإضافة في: {formatDate(item.date_added)}
                            </div>

                            <div className="flex items-center mb-2">
                              <span className="text-sm ml-2">الحالة:</span>
                              {renderStockStatus(item.stock_status)}
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                            <div>
                              {item.discount_price ? (
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-lg text-[#00998F]">
                                    {item.discount_price.toFixed(2)} دينار
                                  </span>
                                  <span className="text-sm text-gray-500 line-through">
                                    {item.price.toFixed(2)} دينار
                                  </span>
                                </div>
                              ) : (
                                <span className="font-bold text-lg text-[#00998F]">{item.price.toFixed(2)} دينار</span>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFromFavorites([item.id])}
                                icon={Trash2}
                              >
                                إزالة
                              </Button>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => addToCart(item.id)}
                                disabled={item.stock_status === "out_of_stock"}
                                icon={ShoppingCart}
                              >
                                إضافة للسلة
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                    onChange={toggleSelectAll}
                  />
                  <span className="text-sm">تحديد الكل</span>

                  {selectedItems.length > 0 && (
                    <Button
                      variant='danger'
                      size="sm"
                      onClick={() => removeFromFavorites(selectedItems)}
                      icon={Trash2}
                    >
                      إزالة المحدد
                    </Button>
                  )}
                </div>

                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

