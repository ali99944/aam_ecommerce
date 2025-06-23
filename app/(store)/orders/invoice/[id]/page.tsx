"use client"

import { useRef } from "react"
import { Printer, Download, ArrowRight } from 'lucide-react'
import Button from "@/components/ui/button"

export default function InvoicePage({ params }: { params: { id: string } }) {
  const printRef = useRef<HTMLDivElement>(null)

  const invoiceData = {
    id: params.id,
    date: "2024-01-20",
    dueDate: "2024-01-22",
    status: "مدفوع",
    items: [
      {
        name: "آيفون 15 برو ماكس - 256 جيجا - تيتانيوم طبيعي",
        quantity: 1,
        price: 4499.0,
        total: 4499.0,
      },
      {
        name: "غطاء حماية شفاف للآيفون 15 برو ماكس",
        quantity: 1,
        price: 299.0,
        total: 299.0,
      },
    ],
    subtotal: 4798.0,
    shipping: 50.0,
    tax: 151.0,
    total: 4999.0,
    customer: {
      name: "أحمد محمد علي",
      email: "ahmed@example.com",
      phone: "0501234567",
      address: "شارع الملك فهد، حي العليا، الرياض 12345",
    },
    company: {
      name: "متجر محلاتنا",
      address: "شارع التحلية، الرياض 11564",
      phone: "920000000",
      email: "info@mahallatna.com",
      website: "www.mahallatna.com",
      taxNumber: "300000000000003",
    },
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("سيتم تحميل الفاتورة قريباً")
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header - Hidden in print */}
      <div className="bg-white print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm">
                <a href={`/orders/${params.id}`}>العودة للطلب</a>
              </Button>
              <h1 className="text-xl font-bold text-[var(--primary)]">فاتورة رقم: {invoiceData.id}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" icon={Download} onClick={handleDownload}>
                تحميل PDF
              </Button>
              <Button variant="primary" size="sm" icon={Printer} onClick={handlePrint}>
                طباعة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="max-w-4xl mx-auto p-8" ref={printRef}>
        <div className="bg-white rounded-lg p-8 print:shadow-none print:rounded-none">
          {/* Header */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-[var(--primary)]">
            <div>
              <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">{invoiceData.company.name}</h1>
              <div className="text-gray-600 space-y-1">
                <p>{invoiceData.company.address}</p>
                <p>هاتف: {invoiceData.company.phone}</p>
                <p>البريد الإلكتروني: {invoiceData.company.email}</p>
                <p>الموقع: {invoiceData.company.website}</p>
                <p>الرقم الضريبي: {invoiceData.company.taxNumber}</p>
              </div>
            </div>
            <div className="text-start">
              <div className="bg-[var(--primary)] w-fit text-white px-6 py-2 rounded flex justify-end">
                <h2 className="text-xl ">فاتورة</h2>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between gap-8">
                  <span className="text-gray-600">رقم الفاتورة:</span>
                  <span className="font-bold">{invoiceData.id}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-gray-600">تاريخ الإصدار:</span>
                  <span>{invoiceData.date}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-gray-600">تاريخ الاستحقاق:</span>
                  <span>{invoiceData.dueDate}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-gray-600">الحالة:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                    {invoiceData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[var(--primary)] mb-3">فاتورة إلى:</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-bold text-[var(--primary)] mb-2">{invoiceData.customer.name}</p>
              <div className="text-gray-600 space-y-1">
                <p>{invoiceData.customer.address}</p>
                <p>هاتف: {invoiceData.customer.phone}</p>
                <p>البريد الإلكتروني: {invoiceData.customer.email}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--primary)] text-white">
                  <th className="text-right p-3 rounded-tr">المنتج</th>
                  <th className="text-center p-3">الكمية</th>
                  <th className="text-center p-3">السعر</th>
                  <th className="text-center p-3 rounded-tl">المجموع</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3">
                      <div className="font-medium text-[var(--primary)]">{item.name}</div>
                    </td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-center">ريال {item.price.toFixed(2)}</td>
                    <td className="p-3 text-center font-medium">ريال {item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-80">
              <div className="space-y-2">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">المجموع الفرعي:</span>
                  <span>ريال {invoiceData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">الشحن:</span>
                  <span>ريال {invoiceData.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">ضريبة القيمة المضافة (15%):</span>
                  <span>ريال {invoiceData.tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-[var(--primary)] pt-2">
                  <div className="flex justify-between py-2">
                    <span className="text-xl font-bold text-[var(--primary)]">المجموع الكلي:</span>
                    <span className="text-xl font-bold text-[var(--primary)]">ريال {invoiceData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-600">
            <p className="mb-2">شكراً لك على التسوق معنا!</p>
            <p className="text-sm">
              في حالة وجود أي استفسارات، يرجى التواصل معنا على {invoiceData.company.phone} أو {invoiceData.company.email}
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          ${printRef.current ? `#${printRef.current.id}` : ''}, 
          ${printRef.current ? `#${printRef.current.id}` : ''} * {
            visibility: visible;
          }
          ${printRef.current ? `#${printRef.current.id}` : ''} {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
