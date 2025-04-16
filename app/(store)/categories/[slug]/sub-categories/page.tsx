"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Search } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import Category, { SubCategory } from "@/src/types/category"
import { useGetQuery } from "@/src/providers/hooks/queries-actions"
import { useParams } from "next/navigation"

// Helper function to create a slug from a string (remains the same)
const createSlug = (text: string) => {
  if (!text) return ""
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

// Define the expected structure of the API response item
interface SubCategoryApiResponse extends SubCategory {
  category: Category // The API includes the parent category in each subcategory item
}

export default function SubcategoriesPage() {
  const { slug } = useParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [transformedSubcategories, setTransformedSubcategories] = useState<
    (SubCategoryApiResponse & { slug: string; featured?: boolean })[]
  >([])
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    (SubCategoryApiResponse & { slug: string; featured?: boolean })[]
  >([])

  // Fetch data using the custom hook
  const {
    data: rawSubcategoriesData, // Rename to avoid conflict with component state
    isLoading,
    error: fetchError, // Rename to avoid conflict with component state
  } = useGetQuery<SubCategoryApiResponse[]>({
    url: `categories/${slug}/sub-categories`,
    key: ["subcategories", slug], // Query key for caching/refetching
  })

  // Extract parent category information once data is loaded
  // Using useMemo to avoid recalculating on every render unless rawSubcategoriesData changes
  const category = useMemo(() => {
    if (rawSubcategoriesData && rawSubcategoriesData.length > 0) {
      return rawSubcategoriesData[0].category // Get category from the first subcategory
    }
    return null
  }, [rawSubcategoriesData])

  // Effect to transform data when it arrives (add slug, featured)
  useEffect(() => {
    if (rawSubcategoriesData) {
      const transformed = rawSubcategoriesData.map((subcat) => ({
        ...subcat,
        slug: createSlug(subcat.name),
        // TODO: Replace random featured logic if API provides this info
        featured: Math.random() > 0.7,
      }))
      setTransformedSubcategories(transformed)
    } else {
      setTransformedSubcategories([]) // Reset if data is null/undefined
    }
  }, [rawSubcategoriesData])

  // Effect to filter subcategories based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredSubcategories(
        transformedSubcategories.filter(
          (subcategory) =>
            subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (subcategory.description && subcategory.description.toLowerCase().includes(searchTerm.toLowerCase())),
        ),
      )
    } else {
      // If no search term, show all transformed subcategories
      setFilteredSubcategories(transformedSubcategories)
    }
  }, [transformedSubcategories, searchTerm])

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Simplified Pulse Animation */}
            <div className="animate-pulse space-y-6">
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded max-w-md"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // --- Error State ---
  // Handle fetch error OR the case where data loaded but category couldn't be determined
  if (fetchError || (!isLoading && !category)) {
    const errorMessage = fetchError ? (fetchError as Error).message || "فشل في جلب البيانات" : "القسم غير موجود"
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">{errorMessage}</h1>
            <p className="mb-6">عذراً، لم نتمكن من العثور على القسم المطلوب أو حدث خطأ.</p>
            <Button >
              <Link href="/categories">تصفح الأقسام</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // --- Data Loaded State ---

  // Calculate featured only once based on filtered results (respecting search)
  const featuredSubcategoriesToDisplay = filteredSubcategories.filter((subcategory) => subcategory.featured)
  const hasFeatureSubcategories = featuredSubcategoriesToDisplay.length > 0 && !searchTerm // Show featured only if not searching

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Breadcrumb - Needs category name */}
          <Breadcrumb
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "الأقسام", href: "/categories" },
              { label: category?.name ?? "قسم غير معروف", href: `/category/${slug}` }, // Use category name
              { label: "الأقسام الفرعية" },
            ]}
            className="mb-6"
          />

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">الأقسام الفرعية لـ {category?.name}</h1> {/* Use category name */}
              <p className="text-gray-600">تصفح جميع الأقسام الفرعية المتوفرة</p>
            </div>
            <Button variant="outline" >
              <Link href={`/category/${slug}`} className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                العودة للقسم الرئيسي
              </Link>
            </Button>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <Input
              placeholder="ابحث في الأقسام الفرعية..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
              icon={Search}
              iconPosition="right"
            />
          </div>

          {/* Featured Subcategories Section */}
          {hasFeatureSubcategories && (
            <section className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
                  الأقسام الفرعية المميزة
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Map over featured subcategories */}
                {featuredSubcategoriesToDisplay.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={`/category/${slug}/${subcategory.slug}`}
                    className="relative h-64 rounded-sm overflow-hidden group"
                  >
                    <Image
                      src={
                        subcategory.cover_image ||
                        // Use placeholder with subcategory name
                        `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(subcategory.name)}`
                      }
                      alt={subcategory.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes prop for optimization
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      // Add placeholder fallback for missing images
                      onError={(e) => {
                        e.currentTarget.src = `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(subcategory.name)}`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{subcategory.name}</h3>
                      <p className="mb-3 opacity-90 line-clamp-2">{subcategory.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-sm">
                          {subcategory.total_products} منتج
                        </span>
                        <span className="text-sm underline">تصفح القسم</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* All Subcategories Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
                {/* Dynamic title based on search */}
                {searchTerm ? "نتائج البحث" : "جميع الأقسام الفرعية"}
              </h2>
              {/* Show count only when searching */}
              {searchTerm && (
                <div className="text-sm text-gray-600">تم العثور على {filteredSubcategories.length} قسم</div>
              )}
            </div>

            {/* Conditional Rendering: Empty State vs. Grid */}
            {filteredSubcategories.length === 0 ? (
              <div className="bg-white rounded-sm border border-gray-200 p-8 text-center">
                <h3 className="text-lg font-bold mb-2">
                  {searchTerm ? "لا توجد نتائج تطابق بحثك" : "لا توجد أقسام فرعية"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm
                    ? "يرجى محاولة البحث بكلمات أخرى."
                    : "لا توجد أقسام فرعية متاحة حالياً لهذا القسم."}
                </p>
                {/* Show 'Clear Search' button only when searching and no results */}
                {searchTerm && <Button onClick={() => setSearchTerm("")}>عرض جميع الأقسام</Button>}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Map over filtered subcategories */}
                {filteredSubcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={`/category/${slug}/${subcategory.slug}`} // Use generated slug
                    className="bg-white rounded-sm border border-gray-200 overflow-hidden group"
                  >
                    <div className="relative h-48">
                      <Image
                        src={
                          subcategory.cover_image ||
                          // Use placeholder with subcategory name
                          `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(subcategory.name)}`
                        }
                        alt={subcategory.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Add sizes prop
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        // Add placeholder fallback for missing images
                        onError={(e) => {
                          e.currentTarget.src = `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(subcategory.name)}`
                        }}
                      />
                      {/* Show featured badge only if not searching */}
                      {subcategory.featured && !searchTerm && (
                        <div className="absolute top-2 right-2 bg-[#00998F] text-white text-xs px-2 py-1 rounded-sm">
                          مميز
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-[#00998F] transition-colors">
                        {subcategory.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{subcategory.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{subcategory.total_products} منتج</span>
                        <span className="text-[#00998F] text-sm font-medium">تصفح القسم</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}