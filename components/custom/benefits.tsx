import { Truck, ShieldCheck, CreditCard, Package } from 'lucide-react'
import React from 'react'

const BenefitsSection = () => {
  return (
    <section className="mt-16 bg-white rounded-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">لماذا تتسوق معنا؟</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D2EAE8] rounded-full mb-4">
                  <Truck className="h-8 w-8 text-[#00998F]" />
                </div>
                <h3 className="font-bold text-lg mb-2">توصيل سريع</h3>
                <p className="text-gray-600">توصيل سريع لجميع مناطق المملكة خلال 1-3 أيام عمل</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D2EAE8] rounded-full mb-4">
                  <ShieldCheck className="h-8 w-8 text-[#00998F]" />
                </div>
                <h3 className="font-bold text-lg mb-2">ضمان الجودة</h3>
                <p className="text-gray-600">جميع منتجاتنا أصلية 100% ومضمونة من الشركة المصنعة</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D2EAE8] rounded-full mb-4">
                  <CreditCard className="h-8 w-8 text-[#00998F]" />
                </div>
                <h3 className="font-bold text-lg mb-2">دفع آمن</h3>
                <p className="text-gray-600">طرق دفع متعددة وآمنة تناسب احتياجاتك</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D2EAE8] rounded-full mb-4">
                  <Package className="h-8 w-8 text-[#00998F]" />
                </div>
                <h3 className="font-bold text-lg mb-2">تنوع المنتجات</h3>
                <p className="text-gray-600">أكثر من 10,000 منتج متنوع لتلبية جميع احتياجاتك</p>
              </div>
            </div>
          </section>
  )
}

export default BenefitsSection