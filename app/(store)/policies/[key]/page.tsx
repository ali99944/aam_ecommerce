"use client"

import { useParams } from "next/navigation"
import { Calendar, ArrowRight, FileText, Clock } from "lucide-react"
import DOMPurify from "dompurify"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/ui/breadcrumb"
import Button from "@/components/ui/button"
import Link from "next/link"
import { useGetQuery } from "@/src/hooks/queries-actions"

interface Policy {
  id: number
  key: string
  name: string
  content: string
  created_at: string
  updated_at: string
}

export default function PolicyPage() {
  const params = useParams()
  const policyKey = params.key as string

  const {
    data: policy,
    isLoading,
    error,
  } = useGetQuery<Policy>({
    key: ["policy", policyKey],
    url: `policies/${policyKey}`,
  })

  const getSanitizedContent = (content: string) => {
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(content)
    }
    return content
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background" dir="rtl">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="bg-white rounded-lg p-6">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !policy) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background" dir="rtl">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">الصفحة غير موجودة</h1>
              <p className="text-gray-600 mb-6">عذراً، لم نتمكن من العثور على السياسة المطلوبة</p>
              <Button variant="primary" size="sm">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  العودة للرئيسية
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: policy.name }]} className="mb-6" />

          <div className="bg-white rounded-lg  border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-3xl font-bold text-primary mb-4">{policy.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>تاريخ الإنشاء: {formatDate(policy.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>آخر تحديث: {formatDate(policy.updated_at)}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div
                className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:my-4 prose-li:mb-2 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: getSanitizedContent(policy.content),
                }}
              />
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  <p>آخر تحديث: {formatDate(policy.updated_at)}</p>
                </div>
                <Button variant="primary" size="sm">
                  <Link href="/">العودة للرئيسية</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
