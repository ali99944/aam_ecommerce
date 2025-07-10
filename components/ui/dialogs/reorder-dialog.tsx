"use client"

import { useState } from "react"
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import Button from "../button"
import Dialog from "../dialog"
import Checkbox from "../checkbox"

interface ReorderDialogProps {
  isOpen: boolean
  onClose: () => void
  orderItems: Array<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }>
  onReorder: (items: Array<{ id: number; quantity: number }>) => void
}

export default function ReorderDialog({ isOpen, onClose, orderItems, onReorder }: ReorderDialogProps) {
  const [selectedItems, setSelectedItems] = useState(
    orderItems.map(item => ({ ...item, selected: true }))
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 0) return
    setSelectedItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity, selected: newQuantity > 0 } : item
      )
    )
  }

  const toggleItem = (id: number) => {
    setSelectedItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected, quantity: item.selected ? 0 : 1 } : item
      )
    )
  }

  const handleReorder = async () => {
    const itemsToReorder = selectedItems
      .filter(item => item.selected && item.quantity > 0)
      .map(item => ({ id: item.id, quantity: item.quantity }))

    if (itemsToReorder.length === 0) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    onReorder(itemsToReorder)
    setIsSubmitting(false)
    onClose()
  }

  const totalItems = selectedItems.filter(item => item.selected).length
  const totalPrice = selectedItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className=" rounded-lg  w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">إعادة الطلب</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">اختر المنتجات التي تريد إعادة طلبها وحدد الكمية</p>

        {/* Items List */}
        <div className="space-y-4 mb-6">
          {selectedItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded">
              {/* <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleItem(item.id)}
                className="w-4 h-4 text-primary rounded"
              /> */}

              <Checkbox
                checked={item.selected}
                onChange={() => toggleItem(item.id)}
              />
              
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              
              <div className="flex-1">
                <h3 className="font-medium text-primary mb-1">{item.name}</h3>
                <p className="text-primary font-bold">ريال {item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={!item.selected}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={!item.selected}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">المنتجات المحددة: {totalItems}</span>
            <span className="text-lg font-bold text-primary">
              المجموع: ريال {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            icon={ShoppingCart}
            onClick={handleReorder}
            loading={isSubmitting}
            disabled={totalItems === 0}
          >
            أضف إلى السلة ({totalItems})
          </Button>
          <Button variant="secondary" size="sm" onClick={onClose}>
            إلغاء
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
