"use client"

import { AlertTriangle } from 'lucide-react'
import Dialog from "./dialog"
import Button from "./button"

interface DangerDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

export default function DangerDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "حذف",
  cancelText = "إلغاء"
}: DangerDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-[var(--primary)] mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
