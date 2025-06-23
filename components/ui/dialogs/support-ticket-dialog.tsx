"use client"

import { useState } from "react"
import { X, Upload, Paperclip } from 'lucide-react'
import Button from "../button"
import Input from "../input"
import Textarea from "../textarea"
import Select from "../select"

interface SupportTicketDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function SupportTicketDialog({ isOpen, onClose }: SupportTicketDialogProps) {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
    attachments: [] as File[]
  })
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { value: "technical", label: "مشكلة تقنية" },
    { value: "order", label: "استفسار عن الطلب" },
    { value: "payment", label: "مشكلة في الدفع" },
    { value: "shipping", label: "مشكلة في الشحن" },
    { value: "return", label: "طلب إرجاع" },
    { value: "other", label: "أخرى" }
  ]

  const priorities = [
    { value: "low", label: "منخفضة" },
    { value: "medium", label: "متوسطة" },
    { value: "high", label: "عالية" },
    { value: "urgent", label: "عاجلة" }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onClose()
      // Show success message
    }, 1500)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" dir="rtl">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-[var(--primary)]">إنشاء تذكرة دعم جديدة</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              موضوع التذكرة *
            </label>
            <Input
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="اكتب موضوع المشكلة"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                فئة المشكلة *
              </label>
              <Select
                value={formData.category}
                onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                options={categories}
                placeholder="اختر فئة المشكلة"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الأولوية *
              </label>
              <Select
                value={formData.priority}
                onChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                options={priorities}
                placeholder="اختر الأولوية"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وصف المشكلة *
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="اشرح المشكلة بالتفصيل..."
              rows={5}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المرفقات (اختياري)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept="image/*,.pdf,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">اضغط لرفع الملفات</span>
                <span className="text-xs text-gray-400">PNG, JPG, PDF, DOC (حد أقصى 10MB)</span>
              </label>
            </div>

            {formData.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <Paperclip className="w-4 h-4" />
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        attachments: prev.attachments.filter((_, i) => i !== index)
                      }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" loading={isLoading} className="flex-1">
              إرسال التذكرة
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
