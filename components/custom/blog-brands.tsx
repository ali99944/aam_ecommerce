"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "../ui/button"

export default function BlogBrands() {
  const articles = [
    {
      id: 1,
      title: "مدى تأثير التكنولوجيا على حياة الإنسان",
      excerpt:
        "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض عليك التفاصيل الحقيقية لما قاله هذا المستكشف الحقيقي لهذه السعادة البشرية. فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضون أنفسهم لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      date: "18 يناير",
    },
    {
      id: 2,
      title: "مدى تأثير التكنولوجيا على حياة الإنسان",
      excerpt:
        "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض عليك التفاصيل الحقيقية لما قاله هذا المستكشف الحقيقي لهذه السعادة البشرية.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      date: "18 يناير",
    },
    {
      id: 3,
      title: "مدى تأثير التكنولوجيا على حياة الإنسان",
      excerpt:
        "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض عليك التفاصيل الحقيقية لما قاله هذا المستكشف الحقيقي لهذه السعادة البشرية.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      date: "18 يناير",
    },
  ]

  const brands = [
    { name: "JOYROOM", logo: "https://via.placeholder.com/120x60/333/fff?text=JOYROOM" },
    { name: "JOYROOM", logo: "https://via.placeholder.com/120x60/333/fff?text=JOYROOM" },
    { name: "OPPO", logo: "https://via.placeholder.com/120x60/333/fff?text=OPPO" },
    { name: "SAMSUNG", logo: "https://via.placeholder.com/120x60/333/fff?text=SAMSUNG" },
    { name: "OPPO", logo: "https://via.placeholder.com/120x60/333/fff?text=OPPO" },
  ]

  return (
    <div>
      {/* Blog Section */}
      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[var(--primary)]">أحدث المقالات</h2>
            <Button variant="secondary" size="sm">
              عرض الكل
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white overflow-hidden rounded-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded px-3 py-1">
                    <span className="text-sm font-semibold text-[var(--primary)]">{article.date}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-xl font-bold text-[var(--primary)] mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className=" items-center mb-8">
            <h2 className="text-lg md:text-xl font-bold text-[var(--primary)]">الماركات التجارية</h2>
            <p className="text-gray-600">يمكنك التسوق من خلال الماركات التجارية</p>
          </div>

          <div className="flex items-center justify-between">
            <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-8 flex-1">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 rounded transition-colors cursor-pointer"
                >
                  <img
                    src={"/image/orbis.png"}
                    alt={brand.name}
                    className="h-10 object-cover transition-all"
                  />
                </div>
              ))}
            </div>

            <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
