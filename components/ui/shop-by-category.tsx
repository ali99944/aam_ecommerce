'use client'

import { Category } from '@/src/types'
import Button from './button'
import { useGetQuery } from '@/src/hooks/queries-actions'
import { CategoryCardSkeleton } from './skeletons'
import { useRouter } from 'next/navigation'

export default function ShopByCategories() {
  const { data: categories, isFetching: is_categories_loading } = useGetQuery<Category[]>({
    url: 'categories',
    key: ['categories']
  })

  const router = useRouter()

  const handleCategoryClick = (category: Category) => {
    router.push(`/categories/sub-categories/${category.slug}`)
  }

  if(is_categories_loading){
    return <CategoryCardSkeleton />
  }

  return (
    <section className="py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg md:text-xl font-bold text-primary">تسوق حسب الفئات</h2>
          <Button variant="secondary" size="sm" asLink href='/categories'>
            عرض الكل
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {categories?.map((category, index) => (
            <div key={index} className="text-center group cursor-pointer" onClick={() => handleCategoryClick(category)}>
              <div className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-3 rounded-full overflow-hidden bg-white  transition-shadow">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-primary text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.total_sub_categories} فئة داخلية</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
