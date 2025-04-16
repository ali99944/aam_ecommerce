"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X, ChevronDown, ChevronUp, Grid, List, ShoppingBag, Heart } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ProductCard } from "@/components/ui/product-card"
import { RadioGroup, RadioItem } from "@/components/ui/radio-group"
import { EmptyState } from "@/components/ui/empty-state"
import { Select } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination" // Your Pagination component
import { useGetQuery } from "@/src/providers/hooks/queries-actions"
import { debounce } from 'lodash' // Import lodash debounce
import { Category, PaginatedProductsResponse, ProductFilters } from "@/src/types"
import { Banner } from "@/components/ui/banner"
import { WithPagination } from "@/src/types/with-pagination"

// Price Ranges (Keep for UI, mapping happens before API call)
const priceRanges = [
  { id: 'all', name: 'جميع الأسعار', min: null, max: null },
  { id: '0-100', name: 'أقل من 100 دينار', min: 0, max: 100 },
  { id: '100-200', name: '100 - 200 دينار', min: 100, max: 200 },
  { id: '200-300', name: '200 - 300 دينار', min: 200, max: 300 },
  { id: '300+', name: 'أكثر من 300 دينار', min: 300, max: null }
]

const sortOptions = [
  { value: 'created_at:desc', label: 'الأحدث' }, // Match API field + direction
  { value: 'sell_price:asc', label: 'السعر: من الأقل للأعلى' },
  { value: 'sell_price:desc', label: 'السعر: من الأعلى للأقل' },
  { value: 'overall_rating:desc', label: 'التقييم الأعلى' },
  { value: 'name:asc', label: 'الاسم (أ-ي)' }, // Example
]

export default function ProductsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [sortValue, setSortValue] = useState<string>(sortOptions[0].value); // e.g., 'created_at:desc'
  const [priceRangeValue, setPriceRangeValue] = useState<string>('all'); // e.g., '100-200'
  
  // --- State Management ---
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true
  })
  
  // --- Filters State (derived from URL search params) ---
  const [filters, setFilters] = useState<ProductFilters>(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialFilters: ProductFilters = { page: 1 }; // Default page
    params.forEach((value, key) => {
      // Handle potential multiple values for array filters like brands later if needed
       if (key === 'page') initialFilters.page = parseInt(value, 10) || 1;
       else if (key === 'sort_by') initialFilters.sort_by = value;
       else if (key === 'sort_dir') initialFilters.sort_dir = value as 'asc' | 'desc';
       else if (key === 'search') initialFilters.search = value;
       else if (key === 'sub_category_id') initialFilters.sub_category_id = value;
       else if (key === 'brand_id') initialFilters.brand_id = value; // Assuming single brand filter for now
       else if (key === 'min_price') initialFilters.min_price = parseFloat(value);
       else if (key === 'max_price') initialFilters.max_price = parseFloat(value);
       else if (key === 'onlyInStock') initialFilters.onlyInStock = value === 'true';
       else if (key === 'onlyDiscounted') initialFilters.onlyDiscounted = value === 'true';
       // Add other filters
      });
      // Derive sort value for Select component
      if (initialFilters.sort_by && initialFilters.sort_dir) {
       setSortValue(`${initialFilters.sort_by}:${initialFilters.sort_dir}`);
    } else {
       setSortValue(sortOptions[0].value); // Default sort
    }

    // Derive price range value for RadioGroup
    if (initialFilters.min_price !== null && initialFilters.max_price !== null) {
        setPriceRangeValue(`${initialFilters.min_price}-${initialFilters.max_price}`);
    } else if (initialFilters.min_price !== null) {
        setPriceRangeValue(`${initialFilters.min_price}+`);
    } else if (initialFilters.max_price !== null) {
         setPriceRangeValue(`0-${initialFilters.max_price}`); // Assuming less than max means 0-max
    } else {
        setPriceRangeValue('all');
    }

    
    return initialFilters;
  });
  
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  // Separate state for UI elements that control multiple filter fields

  // --- API Calls ---

  // Fetch Products based on filters
  const buildProductQueryString = (currentFilters: ProductFilters): string => {
     const params = new URLSearchParams();
     Object.entries(currentFilters).forEach(([key, value]) => {
         if (value !== null && value !== undefined && value !== '' && value !== false) {
             // Map frontend-specific filters to API params
              if (key === 'onlyInStock' && value === true) {
                  params.append('status', 'active');
              } else if (key === 'onlyDiscounted' && value === true) {
                   // Need API support for this, e.g., /api/products?has_discount=true
                   params.append('has_discount', 'true'); // Example
              } else if (key !== 'onlyInStock' && key !== 'onlyDiscounted') {
                   params.append(key, String(value));
              }
         }
     });
     return params.toString();
  };

   const productQueryString = useMemo(() => buildProductQueryString(filters), [filters]);
   const { data: productsResponse, isLoading: isLoadingProducts, error: productsError } = useGetQuery<PaginatedProductsResponse>({
       url: `/products?${productQueryString}`,
       key: ['products', filters], // Query key includes filters object
       options: {
          // keepPreviousData: true, // Keep previous data while loading new page/filters
          // staleTime: 5 * 60 * 1000, // 5 minutes
       }
   });

   // Fetch Categories (example, replace with actual subcategories if needed)
   const { data: categoriesData } = useGetQuery<WithPagination<Category[]>>({
       url: '/catalog/categories', // Or your subcategories endpoint
       key: ['catalog/categories']
   });

   console.log(categoriesData);
   

   

    // Fetch Brands
  //   const { data: brandsData, isLoading: isLoadingBrands } = useGetQuery<Brand[]>({
  //      url: '/brands',
  //      key: ['brands']
  //  });

   // --- Update URL Search Params Reactively ---
   useEffect(() => {
      const queryString = buildProductQueryString(filters);
      // Use router.replace to update URL without adding to history stack
      router.replace(`${pathname}?${queryString}`, { scroll: false });
   }, [filters, pathname, router]);


   // --- Debounced Search Handler ---
   const debouncedUpdateSearch = useCallback(
        debounce((value: string) => {
            setFilters(prev => ({ ...prev, search: value || undefined, page: 1 })); // Reset page on search
        }, 500), // 500ms debounce
    []);

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const value = e.target.value;
       setSearchTerm(value);
       debouncedUpdateSearch(value);
   }

  // --- Filter Handlers ---
  const handleCategoryChange = (value: string) => {
     setFilters(prev => ({ ...prev, sub_category_id: value === 'all' ? null : value, page: 1 }));
  }

   const handlePriceRangeChange = (value: string) => {
        setPriceRangeValue(value); // Update local state for RadioGroup
        const selectedRange = priceRanges.find(r => r.id === value);
        setFilters(prev => ({
            ...prev,
            min_price: selectedRange?.min ?? null,
            max_price: selectedRange?.max ?? null,
            page: 1
        }));
   }

   const handleSortChange = (value: string) => {
        setSortValue(value);
        const [field, direction] = value.split(':');
        setFilters(prev => ({
             ...prev,
             sort_by: field,
             sort_dir: direction as 'asc' | 'desc',
             page: 1 // Reset page on sort change
        }));
   }

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
        window.scrollTo(0, 0); // Scroll to top on page change
    }


  const clearAllFilters = () => {
     // Reset UI state first
     setSearchTerm("");
     setSortValue(sortOptions[0].value);
     setPriceRangeValue('all');
     // Reset filters state, keeping default page
     setFilters({ page: 1 });
     // The useEffect for filters will update the URL
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  // --- Animation Variants ---
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  // --- Loading / Error States ---
  const products = productsResponse?.data ?? [];
  const paginationMeta = productsResponse?.meta;

  // --- Render ---
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "الرئيسية", href: "/" },{ label: "المنتجات" }]} className="mb-6" />

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="w-full" icon={Filter} iconPosition="right">
              {showFilters ? "إخفاء الفلاتر" : "عرض الفلاتر"} ({paginationMeta?.total ?? 0})
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <AnimatePresence>
              {(showFilters || typeof window !== 'undefined' && window.innerWidth >= 768) && ( // Check window width client-side
                <motion.div
                  className="md:w-1/4 lg:w-1/5 bg-white border border-gray-200 rounded-sm p-4 mb-4 md:mb-0 self-start md:sticky md:top-4" // Added sticky positioning
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">الفلاتر</h2>
                    <button onClick={clearAllFilters} className="text-sm text-[#00998F] hover:underline"> مسح الكل </button>
                  </div>

                  {/* Categories Filter - Use Select or RadioGroup */}
                  <div className="mb-4 border-b border-gray-200 pb-4">
                     <button className="flex justify-between items-center w-full mb-2" onClick={() => toggleSection('categories')}>
                        <h3 className="font-bold">الفئات</h3> {expandedSections.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                     </button>
                     <AnimatePresence>{expandedSections.categories && (
                         <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                             <RadioGroup value={filters.sub_category_id || 'all'} onChange={handleCategoryChange}>
                                 <RadioItem key="all-cats" value="all" label="جميع الفئات" />
                                 {(categoriesData?.data || []).map((category) => (
                                     <RadioItem key={category.id} value={category.id.toString()} label={category.name ?? ''} />
                                 ))}
                             </RadioGroup>
                         </motion.div>
                     )}</AnimatePresence>
                  </div>

                  {/* Brands Filter - Use Select or Checkboxes */}
                  {/* <div className="mb-4 border-b border-gray-200 pb-4">
                     <button className="flex justify-between items-center w-full mb-2" onClick={() => toggleSection('brands')}>
                         <h3 className="font-bold">الماركات</h3> {expandedSections.brands ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                     </button>
                      <AnimatePresence>{expandedSections.brands && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                            <Select 
                              options={[{ value: 'all', label: 'جميع الماركات' }, ...(brandsData || []).map((brand) => ({ value: brand.id.toString(), label: brand.name }))]}
                            value={filters.brand_id || 'all'} onChange={(value) => handleBrandChange(value, true)}>
                                
                            </Select>
                        </motion.div>
                     )}</AnimatePresence>
                  </div> */}

                  {/* Price Range Filter */}
                  <div className="mb-4 border-b border-gray-200 pb-4">
                    <button className="flex justify-between items-center w-full mb-2" onClick={() => toggleSection('price')}>
                       <h3 className="font-bold">نطاق السعر</h3> {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                     <AnimatePresence>{expandedSections.price && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                            <RadioGroup value={priceRangeValue} onChange={handlePriceRangeChange}>
                                {priceRanges.map((range) => ( <RadioItem key={range.id} value={range.id} label={range.name} /> ))}
                            </RadioGroup>
                        </motion.div>
                     )}</AnimatePresence>
                  </div>

                  {/* Additional Filters */}
                  {/* <div>
                     <h3 className="font-bold mb-2">فلاتر إضافية</h3>
                     <div className="space-y-2">
                       <div className="flex items-center">
                         <Checkbox id="in-stock" checked={!!filters.onlyInStock} onCheckedChange={(checked) => handleCheckboxFilterChange('onlyInStock', checked)} />
                         <label htmlFor="in-stock" className="mr-2 text-sm cursor-pointer"> متوفر في المخزون فقط </label>
                       </div>
                       <div className="flex items-center">
                         <Checkbox id="discounted" checked={!!filters.onlyDiscounted} onCheckedChange={(checked) => handleCheckboxFilterChange('onlyDiscounted', checked)} />
                         <label htmlFor="discounted" className="mr-2 text-sm cursor-pointer"> العروض فقط </label>
                       </div>
                     </div>
                  </div> */}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Content */}
            <div className="md:w-3/4 lg:w-4/5">
              {/* Search and Sort Bar */}
              <div className="bg-white border border-gray-200 rounded-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative flex-grow w-full sm:w-auto">
                     <Input type="text" placeholder="ابحث عن منتج..." value={searchTerm} onChange={handleSearchChange} className="pr-10" />
                     <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 h-5 w-5 pointer-events-none" />
                     {searchTerm && ( <button className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" onClick={() => {setSearchTerm(""); debouncedUpdateSearch("");}}><X className="h-5 w-5" /> </button> )}
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                     {/* Sort Select */}
                     <Select 
                     options={[{ value: 'relevance', label: 'ترتيب حسب الاهمية' }, ...(sortOptions || []).map((option) => ({ value: option.value, label: option.label }))]}
                     value={sortValue} onChange={handleSortChange}>
                         
                     </Select>
                     {/* View Mode Toggle */}
                     <div className="flex border border-gray-200 rounded-sm overflow-hidden">
                        <Button variant={viewMode === 'grid' ? 'primary' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} aria-label="عرض شبكي" className="rounded-none border-l border-gray-200"> <Grid className="h-5 w-5" /> </Button>
                        <Button variant={viewMode === 'list' ? 'primary' : 'ghost'} size="sm" onClick={() => setViewMode('list')} aria-label="عرض قائمة" className="rounded-none"> <List className="h-5 w-5" /> </Button>
                     </div>
                  </div>
                </div>
              </div>

              {/* Results Info & Active Filters */}
               <div className="flex flex-col sm:flex-row justify-between items-center mb-4 text-sm">
                    <p className="text-gray-600 mb-2 sm:mb-0">
                        عرض {paginationMeta?.from ?? 0}-{paginationMeta?.to ?? 0} من {paginationMeta?.total ?? 0} منتج
                    </p>
                    {/* Add display for active filters here if needed */}
              </div>

              {/* Products Grid/List */}
              {isLoadingProducts ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => ( <div key={i} className="h-64 bg-gray-200 rounded-sm animate-pulse"></div> ))}
                  </div>
              ) : productsError ? (
                  <Banner message={`Error loading products: ${productsError.message}`} variant="error" />
              ) : products.length === 0 ? (
                 <EmptyState title="لا توجد منتجات" description="لم نجد منتجات تطابق بحثك. حاول تعديل الفلاتر." icon={ShoppingBag} actions={{ primary: { label: "مسح الفلاتر", onClick: clearAllFilters }}} className="py-16 bg-white border border-gray-200 rounded-sm"/>
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" variants={container} initial="hidden" animate="show">
                      {products.map((product) => ( <motion.div key={product.id} variants={item}> <ProductCard product={product} /> </motion.div> ))}
                    </motion.div>
                  ) : ( // List View
                    <div className="space-y-4">
                      {products.map((product) => (
                        <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                           {/* --- List Item Structure (copy/adapt from original code) --- */}
                            <div className="flex flex-col sm:flex-row">
                                <Link href={`/product/${product.id}`} className="block relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
                                    <Image src={product.main_image_url || "/images/placeholder-product.png"} alt={product.name} fill className="object-contain" />
                                    {/* Badges */}
                                </Link>
                                <div className="p-4 flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg mb-1"><Link href={`/product/${product.id}`} className="hover:text-[#00998F]">{product.name}</Link></h3>
                                        {/* Rating */}
                                        <div className="flex items-center gap-1 text-xs flex-shrink-0">...</div>
                                    </div>
                                    {/* Description - Add if API provides */}
                                    {/* <p className="text-gray-600 text-sm mb-4 line-clamp-2">...</p> */}
                                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                                        {/* Price */}
                                        <div className="flex items-baseline gap-2 mb-2 sm:mb-0">...</div>
                                        {/* Actions */}
                                        <div className="flex gap-2">
                                          {/* isToggling, isAdding, out of stock */}
                                            <Button size="sm" variant="outline" onClick={() => {}} disabled={false} title="Favorite"> <Heart size={16}/> </Button>
                                            <Button size="sm" onClick={() => {}} disabled={false} icon={ShoppingBag} iconPosition="right"> Add to Cart </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           {/* --- End List Item Structure --- */}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Pagination */}
              <div className="mt-8">
                <Pagination
                  totalPages={paginationMeta?.last_page ?? 1}
                  currentPage={paginationMeta?.current_page ?? 1}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}