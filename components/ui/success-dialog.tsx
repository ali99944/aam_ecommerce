"use client"

import { useEffect } from "react"
import { CheckCircle, X, ShoppingCart } from 'lucide-react'
import Button from "./button"
import { useRouter } from "next/navigation"

interface SuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  productImage: string
}

export default function SuccessDialog({ isOpen, onClose, productName, productImage }: SuccessDialogProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  const router = useRouter()
  const navigateToCart = () => {
    router.push('/cart')
    onClose?.()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl p-4 max-w-md w-full mx-4 transform animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg">تم إضافة المنتج!</h3>
              <p className="text-gray-600 text-sm">تم إضافة المنتج إلى سلة التسوق بنجاح</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
          <img 
            src={productImage || "/placeholder.svg"} 
            alt={productName}
            className="w-12 h-12 object-cover rounded-lg"
          />
          <div className="flex-1">
            <p className="font-medium text-primary text-sm line-clamp-2">{productName}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1" onClick={onClose}>
            متابعة التسوق
          </Button>
          <Button variant="primary" size="sm" className="flex-1" icon={ShoppingCart} onClick={navigateToCart}>
              عرض السلة
          </Button>
        </div>
      </div>
    </div>
  )
}
