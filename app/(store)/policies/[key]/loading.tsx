import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"

export default function PolicyLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "السياسات", href: "/policies" },
          { label: "جاري التحميل..." },
        ]}
        className="mb-6"
      />

      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="bg-[#00998F] p-6">
            <div className="h-8 w-64 bg-white/20 rounded-md animate-pulse"></div>
          </div>

          <div className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse w-5/6"></div>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse w-4/5"></div>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
