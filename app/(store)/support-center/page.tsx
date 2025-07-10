"use client"

import { useState } from "react"
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  FileText,
  Truck,
  CreditCard,
  Shield,
  User,
  ChevronRight,
  Download,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import Breadcrumb from "@/components/ui/breadcrumb"
import Collapsible from "@/components/ui/collabsible"

export default function SupportCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const supportCategories = [
    {
      id: "orders",
      name: "الطلبات والشحن",
      icon: Truck,
      description: "تتبع الطلبات، الشحن، والتوصيل",
      color: "bg-blue-100 text-blue-600",
      articles: 15,
    },
    {
      id: "payments",
      name: "الدفع والفواتير",
      icon: CreditCard,
      description: "طرق الدفع، الفواتير، والاسترداد",
      color: "bg-green-100 text-green-600",
      articles: 12,
    },
    {
      id: "products",
      name: "المنتجات والضمان",
      icon: Shield,
      description: "معلومات المنتجات، الضمان، والصيانة",
      color: "bg-purple-100 text-purple-600",
      articles: 18,
    },
    {
      id: "account",
      name: "الحساب والملف الشخصي",
      icon: User,
      description: "إدارة الحساب، كلمة المرور، والبيانات",
      color: "bg-orange-100 text-orange-600",
      articles: 10,
    },
    {
      id: "technical",
      name: "المساعدة التقنية",
      icon: HelpCircle,
      description: "مشاكل الموقع، التطبيق، والتقنية",
      color: "bg-red-100 text-red-600",
      articles: 8,
    },
    {
      id: "policies",
      name: "السياسات والشروط",
      icon: FileText,
      description: "شروط الاستخدام، الخصوصية، والإرجاع",
      color: "bg-gray-100 text-gray-600",
      articles: 6,
    },
  ]

  const contactMethods = [
    {
      title: "الدردشة المباشرة",
      description: "تحدث مع فريق الدعم مباشرة",
      icon: MessageCircle,
      action: "بدء المحادثة",
      availability: "متاح 24/7",
      responseTime: "فوري",
      color: "bg-primary",
    },
    {
      title: "الاتصال الهاتفي",
      description: "تحدث مع خبير عبر الهاتف",
      icon: Phone,
      action: "920001234",
      availability: "السبت - الخميس: 9ص - 9م",
      responseTime: "فوري",
      color: "bg-green-600",
    },
    {
      title: "البريد الإلكتروني",
      description: "أرسل استفسارك عبر البريد",
      icon: Mail,
      action: "support@amcstore.com",
      availability: "متاح دائماً",
      responseTime: "خلال 24 ساعة",
      color: "bg-blue-600",
    },
  ]


  const quickActions = [
    {
      title: "تتبع الطلب",
      description: "أدخل رقم الطلب لمعرفة حالته",
      icon: Truck,
      link: "/track-order",
    },
    {
      title: "إرجاع منتج",
      description: "ابدأ عملية إرجاع أو استبدال",
      icon: Shield,
      link: "/returns",
    },
    {
      title: "تحديث البيانات",
      description: "عدّل معلومات حسابك الشخصي",
      icon: User,
      link: "/profile",
    },
    {
      title: "تحميل الفاتورة",
      description: "احصل على نسخة من فاتورتك",
      icon: Download,
      link: "/invoices",
    },
  ]

  const faqs = [
    {
      question: "كم يستغرق توصيل الطلب؟",
      answer:
        "عادة ما يستغرق التوصيل من 2-5 أيام عمل داخل المملكة، حسب موقعك الجغرافي. للمدن الرئيسية، يمكن التوصيل خلال 24-48 ساعة.",
    },
    {
      question: "هل يمكنني تغيير أو إلغاء طلبي؟",
      answer: "يمكنك تعديل أو إلغاء طلبك خلال ساعة من تأكيد الطلب. بعد ذلك، يرجى التواصل مع خدمة العملاء لمساعدتك.",
    },
    {
      question: "ما هي طرق الدفع المقبولة؟",
      answer: "نقبل جميع البطاقات الائتمانية (فيزا، ماستركارد، مدى)، أبل باي، STC Pay، والدفع عند الاستلام.",
    },
    {
      question: "هل المنتجات مضمونة؟",
      answer: "نعم، جميع منتجاتنا أصلية ومضمونة من الشركة المصنعة. كما نوفر ضمان إضافي على بعض المنتجات.",
    },
    {
      question: "كيف يمكنني إرجاع منتج؟",
      answer:
        "يمكنك إرجاع المنتج خلال 14 يوم من تاريخ الاستلام. المنتج يجب أن يكون في حالته الأصلية مع العبوة والملحقات.",
    },
  ]


  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "مركز الدعم", href: "/support" },
          ]}
          variant="light"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-xl mb-12 bg-primary">
          <div className="relative p-4">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-3xl lg:text-4xl font-bold mb-6">مركز الدعم والمساعدة</h1>
              <p className="text-white/90 text-lg leading-relaxed">
                نحن هنا لمساعدتك! ابحث في قاعدة المعرفة أو تواصل مع فريق الدعم للحصول على المساعدة التي تحتاجها.
              </p>

            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">طرق التواصل معنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-100   text-center"
              >
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{method.availability}</span>
                  </div>
                  <p className="text-sm text-gray-500">وقت الاستجابة: {method.responseTime}</p>
                </div>
                <Button variant="primary" size="sm" className="w-full">
                  {method.action}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">إجراءات سريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-100   cursor-pointer group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <action.icon className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="font-bold text-primary mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  <span>ابدأ الآن</span>
                  <ChevronRight className="w-4 h-4 mr-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">فئات المساعدة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`bg-white rounded-xl p-4 border border-gray-100   cursor-pointer ${
                  selectedCategory === category.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.articles} مقال</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible key={index} title={faq.question}>
                {faq.answer}
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-primary rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">لا تزال تحتاج مساعدة؟</h3>
          <p className="text-white/90 mb-6">فريق خدمة العملاء متاح على مدار الساعة لمساعدتك في حل أي مشكلة تواجهها</p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
              <MessageCircle className="w-4 h-4 ml-2" />
              بدء المحادثة
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Phone className="w-4 h-4 ml-2" />
              اتصل بنا
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
