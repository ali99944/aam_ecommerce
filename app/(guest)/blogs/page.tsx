"use client"

import { useState } from "react"
import { Search, Calendar, User, Tag, Eye } from 'lucide-react'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Breadcrumb from "@/components/ui/breadcrumb"

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", name: "جميع المقالات", count: 45 },
    { id: "guides", name: "أدلة التشغيل", count: 12 },
    { id: "reviews", name: "مراجعات المنتجات", count: 8 },
    { id: "news", name: "أخبار الصناعة", count: 10 },
    { id: "tips", name: "نصائح وحيل", count: 15 },
  ]

  const featuredPosts = [
    {
      id: 1,
      title: "دليل شامل لاختيار المثقاب الكهربائي المناسب",
      excerpt: "تعرف على أهم المعايير والمواصفات التي يجب مراعاتها عند شراء مثقاب كهربائي جديد لمشاريعك",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop",
      category: "أدلة التشغيل",
      author: "أحمد المهندس",
      date: "15 يناير 2024",
      readTime: "8 دقائق",
      views: 1250,
      featured: true,
    },
    {
      id: 2,
      title: "أفضل 10 أدوات كهربائية لا غنى عنها في ورشتك",
      excerpt: "قائمة بأهم الأدوات الكهربائية التي يحتاجها كل حرفي ومقاول في ورشته لإنجاز المهام بكفاءة",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
      category: "نصائح وحيل",
      author: "سارة التقنية",
      date: "12 يناير 2024",
      readTime: "6 دقائق",
      views: 980,
      featured: true,
    },

    {
      id: 3,
      title: "أدوات كهربائية شائعة الاستخدام في المشاريع والورش",
      excerpt: "تعرف على أهم الأدوات الكهربائية التي يحتاجها كل حرفي ومقاول في مشاريعه",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
      category: "أدلة التشغيل",
      author: "محمد أحمد",
      date: "8 يناير 2024",
      readTime: "10 دقائق",
      views: 780,
      featured: true,
    },
  ]

  const blogPosts = [
    {
      id: 3,
      title: "كيفية صيانة المناشير الكهربائية وإطالة عمرها الافتراضي",
      excerpt: "نصائح مهمة للحفاظ على المناشير الكهربائية وضمان عملها بكفاءة لأطول فترة ممكنة",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      category: "نصائح وحيل",
      author: "محمد الخبير",
      date: "10 يناير 2024",
      readTime: "5 دقائق",
      views: 750,
    },
    {
      id: 4,
      title: "مراجعة شاملة: مثقاب بوش الجديد GSB 18V-85 C",
      excerpt: "تجربة مفصلة لأحدث مثقاب من بوش مع تقييم الأداء والمميزات والعيوب",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      category: "مراجعات المنتجات",
      author: "علي المختبر",
      date: "8 يناير 2024",
      readTime: "12 دقيقة",
      views: 1100,
    },
    {
      id: 5,
      title: "اتجاهات جديدة في صناعة الأدوات الكهربائية لعام 2024",
      excerpt: "نظرة على أحدث التطورات والابتكارات في عالم الأدوات الكهربائية والتقنيات الناشئة",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
      category: "أخبار الصناعة",
      author: "فاطمة الصناعية",
      date: "5 يناير 2024",
      readTime: "7 دقائق",
      views: 650,
    },
    {
      id: 6,
      title: "دليل السلامة: استخدام الأدوات الكهربائية بأمان",
      excerpt: "إرشادات مهمة وقواعد السلامة الأساسية عند التعامل مع الأدوات الكهربائية في موقع العمل",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
      category: "أدلة التشغيل",
      author: "خالد الأمان",
      date: "3 يناير 2024",
      readTime: "10 دقائق",
      views: 890,
    },
    {
      id: 7,
      title: "مقارنة بين أفضل ماركات المثاقب الكهربائية",
      excerpt: "مقارنة شاملة بين أشهر العلامات التجارية للمثاقب الكهربائية من حيث الجودة والسعر",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      category: "مراجعات المنتجات",
      author: "نور المقارنات",
      date: "1 يناير 2024",
      readTime: "15 دقيقة",
      views: 1350,
    },
    {
      id: 8,
      title: "كيفية اختيار المنشار المناسب لمشروعك",
      excerpt: "دليل شامل لاختيار نوع المنشار المناسب حسب نوع المواد والمشروع المطلوب تنفيذه",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      category: "أدلة التشغيل",
      author: "أحمد المهندس",
      date: "28 ديسمبر 2023",
      readTime: "9 دقائق",
      views: 720,
    },
  ]

  const popularTags = [
    "أدوات كهربائية",
    "مثاقب",
    "مناشير",
    "صيانة",
    "سلامة",
    "مراجعات",
    "نصائح",
    "بوش",
    "ديوالت",
    "ماكيتا",
  ]

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => {
        const categoryMap: { [key: string]: string } = {
          guides: "أدلة التشغيل",
          reviews: "مراجعات المنتجات", 
          news: "أخبار الصناعة",
          tips: "نصائح وحيل"
        }
        return post.category === categoryMap[selectedCategory]
      })

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "المدونة", href: "/blogs" },
          ]}
          variant="light"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">


        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-8">المقالات المميزة</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden border border-gray-100  transition-shadow group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                          مميز
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{post.category}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {/* <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div> */}
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                        <span className="text-accent text-sm font-medium">{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex-1 max-w-md">
                  <Input
                    placeholder="ابحث في المقالات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search className="w-5 h-5" />}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? "bg-primary text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100  transition-shadow group cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">{post.category}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      <span className="text-accent text-sm font-medium">{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center items-center">
              <Button variant="secondary" size="sm">
                عرض المزيد من المقالات
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Newsletter Signup */}
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-4">اشترك في النشرة البريدية</h3>
                <p className="text-gray-600 text-sm mb-4">
                  احصل على أحدث المقالات والنصائح مباشرة في بريدك الإلكتروني
                </p>
                <div className="space-y-3">
                  <Input placeholder="بريدك الإلكتروني" />
                  <Button variant="primary" size="sm" className="w-full">
                    اشتراك
                  </Button>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-4">الكلمات المفتاحية</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <button
                      key={index}
                      className="bg-gray-100 hover:bg-primary hover:text-white px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      <Tag className="w-3 h-3 inline ml-1" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-4">المقالات الحديثة</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 4).map((post) => (
                    <div key={post.id} className="flex gap-3 group cursor-pointer">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-primary text-sm mb-1 group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-4">الفئات</h3>
                <div className="space-y-2">
                  {categories.slice(1).map((category) => (
                    <button
                      key={category.id}
                      className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors text-right"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
