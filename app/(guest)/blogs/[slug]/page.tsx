"use client"

import { useState } from "react"
import { Calendar, Eye, Clock, Share2, Heart, MessageCircle, Facebook, Twitter, Linkedin, Tag } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"

export default function BlogDetailsPage() {
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState("")

  // Mock blog post data - in real app this would come from route params/API
  const blogPost = {
    id: 1,
    title: "دليل شامل لاختيار المثقاب الكهربائي المناسب لمشاريعك",
    excerpt: "تعرف على أهم المعايير والمواصفات التي يجب مراعاتها عند شراء مثقاب كهربائي جديد",
    content: `
      <p>يعتبر المثقاب الكهربائي من أهم الأدوات في أي ورشة أو موقع بناء، ولكن اختيار النوع المناسب قد يكون مهمة صعبة نظراً لتنوع الخيارات المتاحة في السوق. في هذا الدليل الشامل، سنستعرض أهم المعايير التي يجب مراعاتها عند اختيار المثقاب الكهربائي المناسب لاحتياجاتك.</p>

      <h2>أنواع المثاقب الكهربائية</h2>
      <p>هناك عدة أنواع من المثاقب الكهربائية، كل منها مصمم لاستخدامات محددة:</p>
      
      <h3>1. المثقاب العادي (Standard Drill)</h3>
      <p>هذا النوع مناسب للأعمال البسيطة مثل ثقب الخشب والمعادن الرقيقة. يتميز بسهولة الاستخدام والسعر المعقول، لكنه محدود القوة مقارنة بالأنواع الأخرى.</p>

      <h3>2. المثقاب المطرقي (Hammer Drill)</h3>
      <p>يجمع بين الحركة الدورانية والحركة المطرقية، مما يجعله مثالياً لثقب الخرسانة والطوب. هذا النوع ضروري لأعمال البناء والتشييد.</p>

      <h3>3. المثقاب اللاسلكي (Cordless Drill)</h3>
      <p>يوفر حرية الحركة دون الحاجة لمصدر كهرباء، مما يجعله مناسباً للأعمال في المواقع النائية أو الأماكن التي يصعب الوصول إليها بالكابلات.</p>

      <h2>المعايير المهمة للاختيار</h2>
      
      <h3>القوة والعزم</h3>
      <p>تقاس قوة المثقاب بالواط، وكلما زادت القوة، زادت قدرة المثقاب على التعامل مع المواد الصلبة. للاستخدام المنزلي، يكفي مثقاب بقوة 500-800 واط، بينما الاستخدام المهني يتطلب 1000 واط أو أكثر.</p>

      <h3>سرعة الدوران</h3>
      <p>تقاس بعدد الدورات في الدقيقة (RPM). المثاقب ذات السرعات المتعددة توفر مرونة أكبر في التعامل مع مواد مختلفة.</p>

      <h3>حجم الظرف (Chuck Size)</h3>
      <p>يحدد أقصى قطر للريش التي يمكن استخدامها. الأحجام الشائعة هي 10مم و 13مم و 16مم.</p>

      <h2>نصائح للاستخدام الآمن</h2>
      <ul>
        <li>ارتدِ دائماً نظارات الحماية والقفازات</li>
        <li>تأكد من ثبات قطعة العمل قبل البدء</li>
        <li>استخدم السرعة المناسبة لنوع المادة</li>
        <li>لا تضغط بقوة مفرطة على المثقاب</li>
        <li>اتركه يبرد بين الاستخدامات الطويلة</li>
      </ul>

      <h2>الصيانة والعناية</h2>
      <p>للحفاظ على المثقاب في حالة جيدة:</p>
      <ul>
        <li>نظف المثقاب بعد كل استخدام</li>
        <li>تحقق من حالة الكابل والقابس بانتظام</li>
        <li>قم بتشحيم الأجزاء المتحركة حسب تعليمات الشركة المصنعة</li>
        <li>احفظه في مكان جاف وآمن</li>
      </ul>

      <h2>الخلاصة</h2>
      <p>اختيار المثقاب الكهربائي المناسب يعتمد على نوع الأعمال التي ستقوم بها، الميزانية المتاحة، وتكرار الاستخدام. استثمر في مثقاب عالي الجودة من علامة تجارية موثوقة لضمان الأداء والمتانة على المدى الطويل.</p>
    `,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=500&fit=crop",
    category: "أدلة التشغيل",
    author: {
      name: "أحمد المهندس",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      bio: "مهندس ميكانيكي متخصص في الأدوات الصناعية مع خبرة 15 عام في المجال",
    },
    date: "15 يناير 2024",
    readTime: "8 دقائق",
    views: 1250,
    likes: 89,
    comments: 12,
    tags: ["مثاقب", "أدوات كهربائية", "دليل الشراء", "نصائح"],
  }

  const relatedPosts = [
    {
      id: 2,
      title: "أفضل 10 أدوات كهربائية لا غنى عنها في ورشتك",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop",
      date: "12 يناير 2024",
      readTime: "6 دقائق",
    },
    {
      id: 3,
      title: "كيفية صيانة المناشير الكهربائية وإطالة عمرها الافتراضي",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop",
      date: "10 يناير 2024",
      readTime: "5 دقائق",
    },
    {
      id: 4,
      title: "دليل السلامة: استخدام الأدوات الكهربائية بأمان",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop",
      date: "8 يناير 2024",
      readTime: "10 دقائق",
    },
  ]

  const comments = [
    {
      id: 1,
      author: "محمد العامل",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
      date: "16 يناير 2024",
      content: "مقال ممتاز ومفيد جداً! استفدت كثيراً من النصائح المذكورة. شكراً لك على المجهود.",
      likes: 5,
    },
    {
      id: 2,
      author: "سارة المقاولة",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop",
      date: "16 يناير 2024",
      content: "هل يمكنك كتابة مقال مشابه عن المناشير الكهربائية؟ أحتاج لمعلومات مفصلة عنها.",
      likes: 3,
    },
  ]

  const tableOfContents = [
    { id: "types", title: "أنواع المثاقب الكهربائية" },
    { id: "criteria", title: "المعايير المهمة للاختيار" },
    { id: "safety", title: "نصائح للاستخدام الآمن" },
    { id: "maintenance", title: "الصيانة والعناية" },
    { id: "conclusion", title: "الخلاصة" },
  ]

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />



      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <article className="bg-white rounded-xl overflow-hidden border border-gray-100 mb-8">
              <img
                src={blogPost.image || "/placeholder.svg"}
                alt={blogPost.title}
                className="w-full h-64 md:h-96 object-cover"
              />

              <div className="p-4">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="bg-primary text-white px-3 py-1 rounded-full">{blogPost.category}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{blogPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{blogPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{blogPost.views} مشاهدة</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                  {blogPost.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={blogPost.author.avatar || "/placeholder.svg"}
                    alt={blogPost.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-primary">{blogPost.author.name}</h3>
                    <p className="text-gray-600 text-sm">{blogPost.author.bio}</p>
                  </div>
                </div>

                {/* Social Share */}
                <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        liked ? "bg-red-100 text-red-600" : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-600"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                      <span>{blogPost.likes + (liked ? 1 : 0)}</span>
                    </button>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageCircle className="w-4 h-4" />
                      <span>{blogPost.comments} تعليق</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm">شارك:</span>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Article Content */}
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-primary mb-4">الكلمات المفتاحية</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag, index) => (
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
              </div>
            </article>

            {/* Comments Section */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 mb-8">
              <h3 className="text-2xl font-bold text-primary mb-6">التعليقات ({blogPost.comments})</h3>

              {/* Add Comment */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-primary mb-4">أضف تعليقك</h4>
                <div className="space-y-4">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="اكتب تعليقك هنا..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  <Button variant="primary" size="sm">
                    نشر التعليق
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <img
                      src={comment.avatar || "/placeholder.svg"}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-bold text-primary">{comment.author}</h5>
                          <span className="text-gray-500 text-sm">{comment.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-primary text-sm">
                          <Heart className="w-4 h-4" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-gray-500 hover:text-primary text-sm">رد</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            <div className=" p-4">
              <h3 className="text-2xl font-bold text-primary mb-6">مقالات ذات صلة</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((post) => (
                  <article key={post.id} className="group cursor-pointer bg-white rounded-xl p-2">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-32 object-cover rounded-lg mb-3  transition-transform"
                    />
                    <h4 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-4">
              {/* Table of Contents */}
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-4">محتويات المقال</h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-gray-600 hover:text-primary text-sm py-1 transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Author Card */}
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-center">
                  <img
                    src={blogPost.author.avatar || "/placeholder.svg"}
                    alt={blogPost.author.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-lg font-bold text-primary mb-2">{blogPost.author.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{blogPost.author.bio}</p>
                  <Button variant="primary" size="sm" className="w-full">
                    عرض جميع المقالات
                  </Button>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-white rounded-xl p-4 text-primary">
                <h3 className="text-lg font-bold mb-4">اشترك في النشرة البريدية</h3>
                <p className="text-black/90 text-sm mb-4">احصل على أحدث المقالات والنصائح مباشرة في بريدك</p>
                <div className="space-y-3">
                  <Input placeholder="بريدك الإلكتروني" />
                  <Button variant="primary" size="sm" className="w-full">
                    اشتراك
                  </Button>
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
