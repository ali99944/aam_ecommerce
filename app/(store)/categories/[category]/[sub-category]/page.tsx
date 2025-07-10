"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp, ShoppingBasket, Star, SlidersHorizontal } from "lucide-react"
import Footer from "@/components/footer"
import ProductCard from "@/components/custom/product-card"
import Navbar from "@/components/navbar"
import Button from "@/components/ui/button"
import Checkbox from "@/components/ui/checkbox"
import Input from "@/components/ui/input"
import RangeSlider from "@/components/ui/range-slider"
import Select from "@/components/ui/select"
import Breadcrumb from "@/components/ui/breadcrumb"

// Mock products data for construction tools
const mockProducts = [
  {
    id: 1,
    name: "مثقاب كهربائي بوش 18 فولت مع بطاريتين",
    category: "مثاقب كهربائية",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop",
    price: 450.0,
    originalPrice: 550.0,
    discount: 18,
    badge: "خصم 18%",
    rating: 4.7,
    reviewCount: 89,
    brand: "بوش",
    powerSource: "بطارية",
    voltage: "18V",
    warranty: "سنتان",
  },
  {
    id: 2,
    name: "منشار دائري ديوالت 1200 واط مع قاعدة",
    category: "مناشير كهربائية",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop",
    price: 680.0,
    originalPrice: 800.0,
    discount: 15,
    badge: "خصم 15%",
    rating: 4.8,
    reviewCount: 156,
    brand: "ديوالت",
    powerSource: "كهرباء",
    voltage: "220V",
    warranty: "3 سنوات",
  },
  {
    id: 3,
    name: "صنفرة مداري ماكيتا 300 واط",
    category: "أدوات الصنفرة",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop",
    price: 320.0,
    originalPrice: 380.0,
    discount: 16,
    badge: "خصم 16%",
    rating: 4.5,
    reviewCount: 67,
    brand: "ماكيتا",
    powerSource: "كهرباء",
    voltage: "220V",
    warranty: "سنتان",
  },
  {
    id: 4,
    name: "متر قياس ليزر هيلتي 50 متر",
    category: "أدوات القياس",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=300&fit=crop",
    price: 890.0,
    badge: "جديد",
    rating: 4.9,
    reviewCount: 34,
    brand: "هيلتي",
    powerSource: "بطارية",
    voltage: "3V",
    warranty: "سنتان",
  },
  {
    id: 5,
    name: "مثقاب مطرقي ميلووكي 800 واط",
    category: "مثاقب كهربائية",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop",
    price: 520.0,
    originalPrice: 620.0,
    discount: 16,
    badge: "خصم 16%",
    rating: 4.6,
    reviewCount: 112,
    brand: "ميلووكي",
    powerSource: "كهرباء",
    voltage: "220V",
    warranty: "3 سنوات",
  },
  {
    id: 6,
    name: "منشار تقطيع معادن بوش 14 بوصة",
    category: "مناشير كهربائية",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop",
    price: 750.0,
    originalPrice: 900.0,
    discount: 17,
    badge: "خصم 17%",
    rating: 4.4,
    reviewCount: 78,
    brand: "بوش",
    powerSource: "كهرباء",
    voltage: "220V",
    warranty: "سنتان",
  },
  {
    id: 7,
    name: "مجموعة عدد يدوية ستانلي 150 قطعة",
    category: "عدد يدوية",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop",
    price: 280.0,
    originalPrice: 350.0,
    discount: 20,
    badge: "خصم 20%",
    rating: 4.3,
    reviewCount: 145,
    brand: "ستانلي",
    powerSource: "يدوي",
    voltage: "-",
    warranty: "سنة واحدة",
  },
  {
    id: 8,
    name: "ماكينة لحام إنفرتر 200 أمبير",
    category: "أدوات اللحام",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop",
    price: 1250.0,
    originalPrice: 1450.0,
    discount: 14,
    badge: "خصم 14%",
    rating: 4.6,
    reviewCount: 89,
    brand: "لينكولن",
    powerSource: "كهرباء",
    voltage: "220V",
    warranty: "3 سنوات",
  },
  {
    id: 9,
    name: "مفك كهربائي ماكيتا 12 فولت",
    category: "مثاقب كهربائية",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop",
    price: 180.0,
    originalPrice: 220.0,
    discount: 18,
    badge: "خصم 18%",
    rating: 4.2,
    reviewCount: 67,
    brand: "ماكيتا",
    powerSource: "بطارية",
    voltage: "12V",
    warranty: "سنتان",
  },
]

// const categories = [
//   { name: "الكل", count: 150 },
//   { name: "مثاقب كهربائية", count: 45 },
//   { name: "مناشير كهربائية", count: 32 },
//   { name: "أدوات الصنفرة", count: 28 },
//   { name: "أدوات القياس", count: 25 },
//   { name: "عدد يدوية", count: 35 },
//   { name: "أدوات اللحام", count: 18 },
// ]

const brands = [
  { name: "الكل", count: 150 },
  { name: "بوش", count: 42 },
  { name: "ديوالت", count: 38 },
  { name: "ماكيتا", count: 35 },
  { name: "ميلووكي", count: 28 },
  { name: "هيلتي", count: 22 },
  { name: "ستانلي", count: 25 },
  { name: "لينكولن", count: 15 },
]

const powerSources = [
  { name: "الكل", count: 150 },
  { name: "كهرباء", count: 85 },
  { name: "بطارية", count: 45 },
  { name: "يدوي", count: 20 },
]

const voltages = [
  { name: "الكل", count: 150 },
  { name: "12V", count: 25 },
  { name: "18V", count: 35 },
  { name: "220V", count: 70 },
  { name: "أخرى", count: 20 },
]

const warranties = [
  { name: "الكل", count: 150 },
  { name: "سنة واحدة", count: 45 },
  { name: "سنتان", count: 65 },
  { name: "3 سنوات", count: 40 },
]

const sortOptions = [
  { value: "price-asc", label: "الأقل إلى الأعلى سعر" },
  { value: "price-desc", label: "الأعلى إلى الأقل سعر" },
  { value: "newest", label: "الأحدث" },
  { value: "bestseller", label: "الأكثر مبيعاً" },
  { value: "rating", label: "الأعلى تقييماً" },
  { value: "discount", label: "الأعلى خصماً" },
]

export default function SubcategoryProductsPage() {
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPowerSources, setSelectedPowerSources] = useState<string[]>([])
  const [selectedVoltages, setSelectedVoltages] = useState<string[]>([])
  const [selectedWarranties, setSelectedWarranties] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price-asc")
  const [showFilters, setShowFilters] = useState(false)

  // Collapsible sections state
  const [showBrands, setShowBrands] = useState(false)
  const [showPowerSources, setShowPowerSources] = useState(false)
  const [showVoltages, setShowVoltages] = useState(false)
  const [showWarranties, setShowWarranties] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [showPrice, setShowPrice] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  // Mock route params - in real app these would come from useParams()
  const category = "الأدوات الكهربائية"
  const subcategory = "مثاقب كهربائية"

  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
    //   const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesPowerSource = selectedPowerSources.length === 0 || selectedPowerSources.includes(product.powerSource)
      const matchesVoltage = selectedVoltages.length === 0 || selectedVoltages.includes(product.voltage)
      const matchesWarranty = selectedWarranties.length === 0 || selectedWarranties.includes(product.warranty)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesRating = !selectedRating || (product.rating && product.rating >= selectedRating)
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

      return (
        // matchesCategory &&
        matchesBrand &&
        matchesPowerSource &&
        matchesVoltage &&
        matchesWarranty &&
        matchesPrice &&
        matchesRating &&
        matchesSearch
      )
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
      case "discount":
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0))
        break
      default:
        break
    }

    return filtered
  }, [
    // selectedCategories,
    selectedBrands,
    selectedPowerSources,
    selectedVoltages,
    selectedWarranties,
    priceRange,
    selectedRating,
    searchTerm,
    sortBy,
  ])

  const paginatedProducts = filteredProducts.slice(0, currentPage * productsPerPage)
  const hasMoreProducts = paginatedProducts.length < filteredProducts.length


  const handleBrandChange = (brand: string) => {
    if (brand === "الكل") {
      setSelectedBrands([])
    } else {
      setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
    }
  }

  const handlePowerSourceChange = (powerSource: string) => {
    if (powerSource === "الكل") {
      setSelectedPowerSources([])
    } else {
      setSelectedPowerSources((prev) =>
        prev.includes(powerSource) ? prev.filter((p) => p !== powerSource) : [...prev, powerSource],
      )
    }
  }

  const handleVoltageChange = (voltage: string) => {
    if (voltage === "الكل") {
      setSelectedVoltages([])
    } else {
      setSelectedVoltages((prev) => (prev.includes(voltage) ? prev.filter((v) => v !== voltage) : [...prev, voltage]))
    }
  }

  const handleWarrantyChange = (warranty: string) => {
    if (warranty === "الكل") {
      setSelectedWarranties([])
    } else {
      setSelectedWarranties((prev) =>
        prev.includes(warranty) ? prev.filter((w) => w !== warranty) : [...prev, warranty],
      )
    }
  }

  const loadMoreProducts = () => {
    setCurrentPage((prev) => prev + 1)
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

  const resetFilters = () => {
    // setSelectedCategories([])
    setSelectedBrands([])
    setSelectedPowerSources([])
    setSelectedVoltages([])
    setSelectedWarranties([])
    setSelectedRating(null)
    setPriceRange([0, 2000])
    setSearchTerm("")
    setCurrentPage(1)
  }

  const FilterSection = ({
    title,
    isOpen,
    onToggle,
    children,
  }: { title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) => (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-right font-bold text-primary text-lg hover:text-primary/80 transition-colors"
      >
        {title}
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  )

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Breadcrumb */}
      <div className="mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "الفئات", href: "/categories" },
            { label: category, href: `/categories/${category}` },
            { label: subcategory, href: "#" },
          ]}
          variant="light"
        />
      </div>

      {/* Page Header */}
      <div className="mx-auto px-4 mb-4">
        <div className="bg-primary rounded-xl p-4 text-white">
          <h1 className="text-3xl font-bold mb-4">{subcategory}</h1>
          <p className="text-white/90 mb-4">
            اكتشف مجموعتنا الواسعة من {subcategory} عالية الجودة من أفضل العلامات التجارية العالمية
          </p>
          <div className="flex items-center gap-6 text-white/80">
            <span>{filteredProducts.length} منتج متاح</span>
            <span>شحن مجاني للطلبات أكثر من 500 ريال</span>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-8">
        <div className="flex gap-4">
          {/* Sidebar - Desktop */}
          <div className={`w-80 space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}>

            {/* Brands Filter */}
            <FilterSection title="العلامة التجارية" isOpen={showBrands} onToggle={() => setShowBrands(!showBrands)}>
              <div className="space-y-4">
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
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="السعر" isOpen={showPrice} onToggle={() => setShowPrice(!showPrice)}>
              <div className="space-y-4">
                <RangeSlider min={0} max={2000} value={priceRange} onChange={setPriceRange} step={50} />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{priceRange[0]} ريال</span>
                  <span>{priceRange[1]} ريال</span>
                </div>
              </div>
            </FilterSection>

            {/* Power Source Filter */}
            <FilterSection
              title="مصدر الطاقة"
              isOpen={showPowerSources}
              onToggle={() => setShowPowerSources(!showPowerSources)}
            >
              <div className="space-y-4">
                {powerSources.map((powerSource) => (
                  <div key={powerSource.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={
                          powerSource.name === "الكل"
                            ? selectedPowerSources.length === 0
                            : selectedPowerSources.includes(powerSource.name)
                        }
                        onChange={() => handlePowerSourceChange(powerSource.name)}
                      />
                      <span className="text-gray-700 hover:text-primary transition-colors cursor-pointer">
                        {powerSource.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {powerSource.count}
                    </span>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Voltage Filter */}
            <FilterSection
              title="الجهد الكهربائي"
              isOpen={showVoltages}
              onToggle={() => setShowVoltages(!showVoltages)}
            >
              <div className="space-y-4">
                {voltages.map((voltage) => (
                  <div key={voltage.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={
                          voltage.name === "الكل"
                            ? selectedVoltages.length === 0
                            : selectedVoltages.includes(voltage.name)
                        }
                        onChange={() => handleVoltageChange(voltage.name)}
                      />
                      <span className="text-gray-700 hover:text-primary transition-colors cursor-pointer">
                        {voltage.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{voltage.count}</span>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Warranty Filter */}
            <FilterSection
              title="فترة الضمان"
              isOpen={showWarranties}
              onToggle={() => setShowWarranties(!showWarranties)}
            >
              <div className="space-y-4">
                {warranties.map((warranty) => (
                  <div key={warranty.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={
                          warranty.name === "الكل"
                            ? selectedWarranties.length === 0
                            : selectedWarranties.includes(warranty.name)
                        }
                        onChange={() => handleWarrantyChange(warranty.name)}
                      />
                      <span className="text-gray-700 hover:text-primary transition-colors cursor-pointer">
                        {warranty.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{warranty.count}</span>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Rating Filter */}
            <FilterSection title="التقييم" isOpen={showRating} onToggle={() => setShowRating(!showRating)}>
              <div className="space-y-4">
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
            </FilterSection>

            {/* Reset Filters */}
            <Button variant="secondary" size="sm" onClick={resetFilters} className="w-full">
              إعادة تعيين الفلاتر
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl p-4 mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                    icon={SlidersHorizontal}
                  >
                    فلترة
                  </Button>

                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    placeholder="ترتيب حسب"
                    className="min-w-[200px]"
                  />

                  <span className="text-sm text-gray-600">
                    عرض {paginatedProducts.length} من {filteredProducts.length} منتج
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Input
                    type="text"
                    placeholder="ابحث في المنتجات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-80"
                  />

                </div>
              </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div
                  className={`grid gap-4 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
                >
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
                    <Button variant="secondary" size="sm" onClick={loadMoreProducts}>
                      عرض المزيد
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-xl p-16 text-center border border-gray-100">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingBasket className="w-20 h-20 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">لا توجد منتجات مطابقة للفلاتر</h3>
                <p className="text-gray-600 mb-8 text-lg">جرب تعديل الفلاتر أو البحث عن منتجات أخرى</p>
                <div className="flex justify-center items-center">
                  <Button variant="primary" size="sm" onClick={resetFilters}>
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
