"use client"

import { CreditCard, Smartphone, Banknote, Truck } from 'lucide-react'

export default function PaymentMethods() {
  const paymentMethods = [
    {
      icon: CreditCard,
      name: "بطاقة ائتمانية",
      description: "Visa, Mastercard, American Express",
    },
    {
      icon: Smartphone,
      name: "الدفع الإلكتروني",
      description: "Apple Pay, Google Pay, Samsung Pay",
    },
    {
      icon: Banknote,
      name: "الدفع عند الاستلام",
      description: "ادفع نقداً عند وصول الطلب",
    },
  ]

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
      <h3 className="text-lg font-bold text-[var(--primary)] mb-4">طرق الدفع المتاحة</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {paymentMethods.map((method, index) => (
          <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center">
              <method.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">{method.name}</div>
              <div className="text-sm text-gray-600">{method.description}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
