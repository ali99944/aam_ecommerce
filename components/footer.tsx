'use client'

import { useGetQuery } from "@/src/hooks/queries-actions"
import PaymentMethod from "@/src/types/payment_method"
import { LineSkeleton } from "./ui/skeletons"
import { PolicyCategory } from "@/src/types/policy"

export default function Footer() {
  const { data: payment_methods, isFetching: is_payment_methods_loading } = useGetQuery<PaymentMethod[]>({
    url: 'payment-methods',
    key: ['payment-methods']
  })

  const { data: policies_categories, isFetching: is_policies_categories_loading } = useGetQuery<PolicyCategory[]>({
    url: 'policies',
    key: ['policies']
  })

  return (
    <footer className=" text-white">
      {/* Main Footer Content */}
      <div className="py-10 bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Store Logo and Name */}
            <div className="lg:col-span-1">
              <div className="flex flex-col ">
                {/* Placeholder for logo - replace with actual image source */}
                <img 
                  src="/image/logo.png" 
                  alt="علي ابو مسعود Logo" 
                  className="h-40 w-40"
                />
                <h4 className="font-bold text-white/80 text-lg">محلات علي ابو مسعود</h4>
              </div>
            </div>

            {/* About Section */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-white text-lg mb-4 border-b-gray-700 w-fit">عن متجرنا</h4>
              <p className="text-white/70 text-md leading-relaxed">
                محلات علي ابو مسعود من أفضل المتاجر الإلكترونية التي تقدم منتجات الرقمية بأفضل الأسعار وأجود المنتجات العالمية
                والمنتجات الرقمية بأفضل الأسعار وأجود المنتجات والخدمات
              </p>
            </div>

            {/* Important Links */}
            <div>
              <h4 className="font-bold text-white text-lg mb-4 border-b-gray-700 w-fit">روابط مهمة</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-white/90 transition-colors text-md">
                    من نحن
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white/90 transition-colors text-md">
                    سياسة الخصوصية
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white/90 transition-colors text-md">
                    الشروط والأحكام
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white/90 transition-colors text-md">
                    الدعم الفني
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-white text-lg mb-4 border-b-gray-700 w-fit">تواصل معنا</h4>
              <ul className="space-y-2">
                <li className="text-white/70 text-md">0096123456789</li>
                <li className="text-white/70 text-md">0096123456789</li>
                <li className="text-white/70 text-md">https://salla.sa</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {
                  is_payment_methods_loading && (
                    <LineSkeleton />
                  )
                }
                {
                  payment_methods?.map(method => {
                    return (
                      <div 
                        key={method.code} 
                        className="bg-white/90 text-primary px-2 py-1 rounded text-xs font-bold"
                      >
                        {method.code.toUpperCase()}
                      </div>
                    )
                  })
                }
              </div>
              <span className="text-sm">الرقم الضريبي - 546987552</span>
            </div>
            <div className="flex gap-4 text-sm text-white/70">
              {
                is_policies_categories_loading && (
                  <div className="flex items-center gap-2">
                    <LineSkeleton />
                    <LineSkeleton />
                    <LineSkeleton />
                  </div>
                )
              }
              {
                policies_categories?.map(cat => {
                  return (
                    <a 
                      key={cat.key} 
                      href={`/policies/${cat.key}`}
                      className="text-white/90 hover:text-white/90 transition-colors"
                    >
                      {cat.name}
                    </a>
                  )
                })
              }
            </div>
            <div className="text-sm">
              <span>الحقوق محفوظة لمحلات علي ابو مسعود © 2025</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}