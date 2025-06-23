"use client"

import { useState } from "react"
import { Play, Star, ChevronLeft, ChevronRight } from 'lucide-react'

export default function VRTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "محمد السيد",
      role: "مهندس استشاري في شركة سلة",
      rating: 5,
      text: "استخدمنا سلة قبل أربع سنوات أو أكثر وكان لدي فريق جيدات تجربة مدهشة معهم. سلعنا مبيع كبيرة جداً في أعمال متجر وقدموا لنا التعامل مع العملاء. أم عمل متجر وقدموا لنا التعامل مع العملاء أنصح بشدة وبجدية تجربة هذه المنصة ومعاملة ممتازة",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "أحمد محمد",
      role: "مطور تطبيقات في شركة تقنية",
      rating: 5,
      text: "استخدمنا سلة قبل أربع سنوات أو أكثر وكان لدي فريق جيدات تجربة مدهشة معهم. سلعنا مبيع كبيرة جداً في أعمال متجر وقدموا لنا التعامل مع العملاء. أم عمل متجر وقدموا لنا التعامل مع العملاء أنصح بشدة وبجدية تجربة هذه المنصة ومعاملة ممتازة",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "سارة أحمد",
      role: "مديرة مشاريع في شركة رقمية",
      rating: 5,
      text: "استخدمنا سلة قبل أربع سنوات أو أكثر وكان لدي فريق جيدات تجربة مدهشة معهم. سلعنا مبيع كبيرة جداً في أعمال متجر وقدموا لنا التعامل مع العملاء. أم عمل متجر وقدموا لنا التعامل مع العملاء أنصح بشدة وبجدية تجربة هذه المنصة ومعاملة ممتازة",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div>
      {/* VR Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-right order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">رؤية واضحة للعالم</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                متجر محلاتنا يوفر لك كل ما تحتاجه من كمبيوترات أو أجهزة ذكية بأفضل التخفيضات على المنتجات. تسوق الآن واستمتع
                بكل التخفيضات على المنتجات
              </p>
            </div>

            {/* VR Image with Play Button */}
            <div className="relative order-1 lg:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=400&fit=crop"
                  alt="VR Experience"
                  className="w-full rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-[var(--accent)] hover:bg-[var(--accent)]/90 rounded-full flex items-center justify-center transition-colors group">
                    <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[var(--primary)]">آراء العملاء</h2>
            <p className="text-gray-600">يتم استطلاع رأي العملاء وتقييمات المستخدمين</p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`bg-white p-4 rounded-lg transition-all duration-300`}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-[var(--primary)]">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
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
