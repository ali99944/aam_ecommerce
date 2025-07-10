"use client"


import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import { useGetQuery } from "@/src/hooks/queries-actions"
import { PageLoadingSkeleton } from "@/components/ui/skeletons"
import { Category } from "@/src/types"
import { ErrorAlert } from "@/components/ui/error-components"
import { EmptyCategory } from "@/components/ui/empty-state"

export default function CategoriesPage() {


  const { data: categories, isFetching: is_categories_loading, isError, error } = useGetQuery<Category[]>({
    url: 'categories',
    key: ['categories'],
    options: {
      initialData: []
    }
  })

  
  
  
  if(is_categories_loading){
    return <PageLoadingSkeleton />
  }
  
  if(isError){
    return <ErrorAlert
    message={error.message}
    />
  }

  const handleCategoryClick = (category: Category) => {
    window.location.href = `/categories/sub-categories/${category.slug}`
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      <div className="px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">فئات المنتجات</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            تصفح مجموعتنا الواسعة من الأدوات الكهربائية ومعدات السباكة ومواد البناء والخرسانة
          </p>
        </div>

        {/* Main Categories */}
        {
          categories?.length == 0 ? (
            <EmptyCategory />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => handleCategoryClick(category)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br bg-gray-900`}></div>
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 object-center"
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>

              <div className="relative p-4 h-80 flex flex-col justify-end text-white">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90">{category.description}</p>
                </div>

                
              </div>
            </div>
          ))}
        </div>
          )
        }



        

        {/* CTA Section */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl max-w-7xl mx-auto shadow-lg">
          <h2 className="text-3xl font-extrabold text-white mb-4">لم تجد ما تبحث عنه؟</h2>
          <p className="text-lg text-white/80 mb-6">تواصل معنا للحصول على المساعدة في العثور على المنتج المثالي لك.</p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="sm" asLink href="/contact-us">
              تواصل معنا
            </Button>
            {/* <Button variant="secondary" size="md">
              تصفح المنتجات
            </Button> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
