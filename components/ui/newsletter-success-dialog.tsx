"use client"

import { CheckCircle, Mail } from "lucide-react"
import Dialog from "./dialog"
import Button from "./button"

interface NewsletterSuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  email?: string
}

export default function NewsletterSuccessDialog({ isOpen, onClose, email }: NewsletterSuccessDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className="w-20 h-20 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-[var(--primary)] mb-3">تم الاشتراك بنجاح!</h3>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-[var(--accent)]" />
          <span className="text-gray-600">{email}</span>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          شكراً لك على الاشتراك في نشرتنا البريدية! ستصلك أحدث العروض والتخفيضات الحصرية على بريدك الإلكتروني.
        </p>

        <div className="bg-[var(--accent)]/5 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            <strong>ما التالي؟</strong>
            <br />• ستحصل على خصم 10% على أول عملية شراء
            <br />• إشعارات فورية بالعروض الجديدة
            <br />• محتوى حصري للمشتركين فقط
          </p>
        </div>

        <Button variant="primary" onClick={onClose} className="w-full">
          ممتاز، شكراً لك
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          يمكنك إلغاء الاشتراك في أي وقت من خلال الرابط الموجود في البريد الإلكتروني
        </p>
      </div>
    </Dialog>
  )
}
