import Link from "next/link"
import Image from "next/image"
import { Truck, ShieldCheck, CreditCard, Package } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import BenefitsSection from "@/components/custom/benefits"

// Mock categories data
const categories = [
  {
    id: 1,
    name: "مواد البناء",
    slug: "building-materials",
    description: "جميع مواد البناء الأساسية من أسمنت، رمل، طوب، حديد وغيرها",
    image: "/placeholder.svg?height=400&width=600&text=مواد البناء",
    subcategories_count: 8,
    products_count: 120,
    featured: true,
  },
  {
    id: 2,
    name: "العدد الكهربائية",
    slug: "electrical-tools",
    description: "مجموعة متنوعة من العدد الكهربائية عالية الجودة من أشهر الماركات العالمية",
    image: "/placeholder.svg?height=400&width=600&text=العدد الكهربائية",
    subcategories_count: 6,
    products_count: 85,
    featured: true,
  },
  {
    id: 3,
    name: "العدد اليدوية",
    slug: "hand-tools",
    description: "تشكيلة واسعة من العدد اليدوية للاستخدامات المنزلية والمهنية",
    image: "/placeholder.svg?height=400&width=600&text=العدد اليدوية",
    subcategories_count: 5,
    products_count: 70,
    featured: false,
  },
  {
    id: 4,
    name: "السباكة",
    slug: "plumbing",
    description: "جميع مستلزمات السباكة من أنابيب، وصلات، صنابير وأدوات",
    image: "/placeholder.svg?height=400&width=600&text=السباكة",
    subcategories_count: 7,
    products_count: 95,
    featured: true,
  },
  {
    id: 5,
    name: "الإضاءة",
    slug: "lighting",
    description: "تشكيلة متنوعة من وحدات الإضاءة الداخلية والخارجية",
    image: "/placeholder.svg?height=400&width=600&text=الإضاءة",
    subcategories_count: 4,
    products_count: 60,
    featured: false,
  },
  {
    id: 6,
    name: "المواد الزراعية",
    slug: "agricultural-materials",
    description: "مستلزمات الزراعة من بذور، أسمدة، مبيدات وأدوات",
    image: "/placeholder.svg?height=400&width=600&text=المواد الزراعية",
    subcategories_count: 6,
    products_count: 75,
    featured: true,
  },
  {
    id: 7,
    name: "الدهانات",
    slug: "paints",
    description: "مجموعة متكاملة من الدهانات الداخلية والخارجية بمختلف الألوان",
    image: "/placeholder.svg?height=400&width=600&text=الدهانات",
    subcategories_count: 3,
    products_count: 45,
    featured: false,
  },
  {
    id: 8,
    name: "العزل",
    slug: "insulation",
    description: "مواد العزل المائي والحراري لجميع الاستخدامات",
    image: "/placeholder.svg?height=400&width=600&text=العزل",
    subcategories_count: 4,
    products_count: 30,
    featured: false,
  },
  {
    id: 9,
    name: "الأجهزة المنزلية",
    slug: "home-appliances",
    description: "تشكيلة من الأجهزة المنزلية الكهربائية",
    image: "/placeholder.svg?height=400&width=600&text=الأجهزة المنزلية",
    subcategories_count: 5,
    products_count: 55,
    featured: true,
  },
  {
    id: 10,
    name: "مستلزمات السلامة",
    slug: "safety-equipment",
    description: "معدات وأدوات السلامة للاستخدام المنزلي والمهني",
    image: "/placeholder.svg?height=400&width=600&text=مستلزمات السلامة",
    subcategories_count: 3,
    products_count: 40,
    featured: false,
  },
]

export default function CategoriesPage() {
  // Get featured categories
  const featuredCategories = categories.filter((category) => category.featured)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الأقسام" }]} className="mb-6" />

          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">أقسام المتجر</h1>
            <p className="text-gray-600 max-w-3xl">
              تصفح مجموعتنا الواسعة من المنتجات المصنفة في أقسام متخصصة لتسهيل وصولك إلى ما تبحث عنه
            </p>
          </div>

          {/* Featured Categories */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
                الأقسام المميزة
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredCategories.slice(0, 2).map((category) => (
                <div key={category.id} className="relative overflow-hidden rounded-sm group">
                  <div className="relative h-80 w-full">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="mb-4 opacity-90 line-clamp-2">{category.description}</p>
                      <div className="flex gap-4">
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-sm">
                          {category.subcategories_count} أقسام فرعية
                        </span>
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-sm">{category.products_count} منتج</span>
                      </div>
                      <Button as={Link} href={`/category/${category.slug}`} className="mt-4">
                        تصفح القسم
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {featuredCategories.slice(2, 5).map((category) => (
                <div key={category.id} className="relative overflow-hidden rounded-sm group">
                  <div className="relative h-60 w-full">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      <p className="mb-3 opacity-90 text-sm line-clamp-2">{category.description}</p>
                      <Button as={Link} href={`/category/${category.slug}`} size="sm">
                        تصفح القسم
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All Categories */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="h-6 w-1.5 bg-[#00998F] inline-block"></span>
                جميع الأقسام
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="bg-white rounded-sm border border-gray-200 overflow-hidden group transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {category.featured && (
                      <div className="absolute top-2 right-2 bg-[#00998F] text-white text-xs px-2 py-1 rounded-sm">
                        مميز
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#00998F] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{category.subcategories_count} أقسام فرعية</span>
                      <span className="text-[#00998F] font-medium">{category.products_count} منتج</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <BenefitsSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}

