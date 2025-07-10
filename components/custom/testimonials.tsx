"use client"

import { useGetQuery } from '@/src/hooks/queries-actions';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  id: number;
  name: string;
  title_or_company: string | null;
  quote: string;
  avatar_url: string | null;
  rating: number | null;
} 

export default function Testimonials() {

  const { data: testimonials, isLoading, error } = useGetQuery<Testimonial[]>({
    url: "/testimonials",
    key: ['testimonials']
  })

    if (error) {
    return (
        <section className="py-16 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-4 text-center">
                 <h3 className="text-xl font-bold text-red-700">حدث خطأ</h3>
                 <p className="text-red-600 mt-2">لم نتمكن من تحميل آراء العملاء.</p>
            </div>
        </section>
    );
  }

  // Show a message if there are no testimonials to display
  if (!isLoading && testimonials?.length == 0) {
      return (
        <section className="py-16 bg-[var(--background)]">
             <div className="max-w-7xl mx-auto px-4 text-center">
                 <h2 className="text-lg md:text-xl font-bold text-primary">آراء العملاء</h2>
                 <p className="text-gray-600 mt-2">لا توجد تقييمات لعرضها في الوقت الحالي.</p>
            </div>
        </section>
      )
  }


  return (
    <div>

      {/* Testimonials Section */}
      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-primary">آراء العملاء</h2>
            <p className="text-gray-600">يتم استطلاع رأي العملاء وتقييمات المستخدمين</p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoading &&
                        [...Array(3)].map((_, i) => (
                           <div key={i} className="min-w-full md:min-w-[33.33%] flex-shrink-0 px-3">
                                <TestimonialSkeleton />
                           </div>
                        ))
                    }
              {(testimonials ?? []).map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`bg-white p-4 rounded-lg transition-all duration-300`}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.title_or_company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}


export function TestimonialSkeleton() {
    return (
        <div className="bg-white p-6 rounded-lg h-full animate-pulse">
            <div className="flex items-center gap-1 mb-4">
                <div className="w-5 h-5 bg-gray-200 rounded-sm"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-sm"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-sm"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-sm"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-sm"></div>
            </div>
            <div className="space-y-3 mb-6">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                     <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
            </div>
        </div>
    )
}