'use client'

import { CreditCard, Truck, ShoppingBag } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: CreditCard,
      title: "مدفوعات آمنة",
      description: "مدفوعات آمنة استمتع بتجربة آمنة خلال 12 ساعة",
    },
    {
      icon: Truck,
      title: "شحن مجاني",
      description: "مدفوعات آمنة استمتع بتجربة آمنة خلال 12 ساعة",
    },
    {
      icon: ShoppingBag,
      title: "منتجات متنوعة",
      description: "مدفوعات آمنة استمتع بتجربة آمنة خلال 12 ساعة",
    },
  ]

  return (
    <section className="py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-2xl  transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
