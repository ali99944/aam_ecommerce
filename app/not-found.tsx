"use client"

import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="relative mx-auto w-64 h-40 mb-8">
            {/* First "4" */}
            <div className="absolute left-0 top-0 w-32 h-32 bg-[#00998F]/10 rounded-full flex items-center justify-center">
              <span className="text-[#00998F] text-7xl font-bold">4</span>
            </div>
            
            {/* "0" in the middle */}
            <div className="absolute left-0 right-0 mx-auto w-32 h-32 bg-[#D2EAE8] rounded-full flex items-center justify-center opacity-80">
              <span className="text-[#00998F] text-7xl font-bold">0</span>
            </div>
            
            {/* Second "4" */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#00998F]/10 rounded-full flex items-center justify-center">
              <span className="text-[#00998F] text-7xl font-bold">4</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-gray-900">الصفحة غير موجودة</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              icon={ArrowLeft}
              iconPosition="right"
            >
              العودة للصفحة السابقة
            </Button>

            <Link href={'/'}>
              <Button icon={Home} iconPosition="right">
                الذهاب للصفحة الرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}