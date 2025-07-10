"use client"

import { CreditCard, Smartphone, Building } from 'lucide-react'

interface PaymentMethod {
  id: string
  name: string
  icon: "card" | "mobile" | "bank"
  description?: string
}

interface PaymentMethodProps {
  methods: PaymentMethod[]
  value?: string
  onChange: (value: string) => void
  className?: string
}

export default function PaymentMethodSelector({ methods, value, onChange, className = "" }: PaymentMethodProps) {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "card":
        return <CreditCard className="w-6 h-6" />
      case "mobile":
        return <Smartphone className="w-6 h-6" />
      case "bank":
        return <Building className="w-6 h-6" />
      default:
        return <CreditCard className="w-6 h-6" />
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {methods.map((method) => (
        <label
          key={method.id}
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
            value === method.id
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="payment-method"
            value={method.id}
            checked={value === method.id}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <div className="flex items-center gap-4 flex-1">
            <div className={`p-2 rounded-lg ${value === method.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}>
              {getIcon(method.icon)}
            </div>
            <div className="text-right flex-1">
              <div className="font-medium text-primary">{method.name}</div>
              {method.description && (
                <div className="text-sm text-gray-600">{method.description}</div>
              )}
            </div>
          </div>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            value === method.id ? "border-primary" : "border-gray-300"
          }`}>
            {value === method.id && (
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            )}
          </div>
        </label>
      ))}
    </div>
  )
}
