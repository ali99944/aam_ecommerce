"use client"

import { Truck, Package, MapPin, Clock, Shield, AlertTriangle, Calculator } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/ui/breadcrumb"
import Collapsible from "@/components/ui/collabsible"
import Select from "@/components/ui/select"

export default function ShippingPolicyPage() {
  const shippingZones = [
    {
      zone: "المنطقة الأولى",
      cities: ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة"],
      standardTime: "1-2 أيام عمل",
      expressTime: "نفس اليوم",
      cost: "مجاني للطلبات أكثر من 300 ريال",
    },
    {
      zone: "المنطقة الثانية",
      cities: ["الطائف", "أبها", "تبوك", "حائل", "القصيم"],
      standardTime: "2-3 أيام عمل",
      expressTime: "1-2 أيام عمل",
      cost: "مجاني للطلبات أكثر من 500 ريال",
    },
    {
      zone: "المنطقة الثالثة",
      cities: ["جازان", "نجران", "الباحة", "عرعر", "سكاكا"],
      standardTime: "3-5 أيام عمل",
      expressTime: "2-3 أيام عمل",
      cost: "مجاني للطلبات أكثر من 700 ريال",
    },
  ]

  const specialHandling = [
    {
      category: "الأدوات الثقيلة",
      description: "المعدات أكثر من 50 كيلو",
      handling: "توصيل متخصص مع رافعة",
      additionalCost: "100-200 ريال",
      icon: Package,
    },
    {
      category: "المواد الخطرة",
      description: "الدهانات والمواد الكيميائية",
      handling: "شحن متخصص معتمد",
      additionalCost: "50-100 ريال",
      icon: AlertTriangle,
    },
    {
      category: "الأدوات الدقيقة",
      description: "أجهزة القياس والمعايرة",
      handling: "تغليف خاص مقاوم للصدمات",
      additionalCost: "25-50 ريال",
      icon: Shield,
    },
    {
      category: "الطلبات الكبيرة",
      description: "أكثر من 20 قطعة أو 500 كيلو",
      handling: "توصيل بشاحنة كبيرة",
      additionalCost: "حسب الحجم والوزن",
      icon: Truck,
    },
  ]

  const shippingFaqs = [
    {
      question: "كيف يتم حساب تكلفة الشحن؟",
      answer:
        "تحسب تكلفة الشحن بناءً على الوزن، الحجم، المسافة، ونوع المنتج. الأدوات الثقيلة والمواد الخطرة تتطلب رسوم إضافية. يمكنك حساب التكلفة الدقيقة في صفحة الدف��.",
    },
    {
      question: "هل يمكنني تتبع شحنتي؟",
      answer:
        "نعم، ستحصل على رقم تتبع فور شحن طلبك. يمكنك تتبع الشحنة من خلال موقعنا أو تطبيق شركة الشحن. ستصلك تحديثات عبر الرسائل النصية والبريد الإلكتروني.",
    },
    {
      question: "ماذا لو تضررت البضاعة أثناء الشحن؟",
      answer:
        "جميع شحناتنا مؤمنة ضد التلف والفقدان. في حالة وصول البضاعة تالفة، يرجى عدم استلامها والتواصل معنا فوراً. سنقوم بإرسال بديل أو استرداد المبلغ كاملاً.",
    },
    {
      question: "هل تشحنون خارج المملكة؟",
      answer:
        "حالياً نقدم الشحن داخل المملكة العربية السعودية فقط. نعمل على توسيع خدماتنا لتشمل دول الخليج قريباً. للطلبات الدولية، يرجى التواصل معنا مباشرة.",
    },
    {
      question: "هل يمكنني تغيير عنوان التوصيل بعد الشحن؟",
      answer:
        "يمكن تغيير عنوان التوصيل قبل خروج الشحنة من المستودع. بعد الشحن، يمكن التنسيق مع شركة الشحن لتغيير العنوان مقابل رسوم إضافية قد تطبق.",
    },
  ]

  const processingTimes = [
    { category: "الأدوات الكهربائية", time: "24 ساعة", availability: "متوفر في المخزون" },
    { category: "مواد البناء", time: "1-2 أيام عمل", availability: "يتطلب تجهيز خاص" },
    { category: "الأدوات اليدوية", time: "12 ساعة", availability: "متوفر في المخزون" },
    { category: "المعدات الثقيلة", time: "2-3 أيام عمل", availability: "قد يتطلب طلب خاص" },
  ]

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "سياسة الشحن", href: "/shipping-policy" },
          ]}
          variant="light"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-xl mb-12 bg-primary">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-3xl lg:text-4xl font-bold mb-6">سياسة الشحن</h1>
              <p className="text-white/90 text-lg leading-relaxed">
                تعرف على تفاصيل خدمات الشحن والتوصيل لدينا. نقدم خيارات متنوعة تناسب احتياجاتك مع ضمان وصول منتجاتك
                بأمان وفي الوقت المحدد.
              </p>
            </div>

            {/* Right Content - Shipping Image */}
            <div className="flex justify-center items-center">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop"
                alt="خدمات الشحن"
                className="w-full max-w-sm h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Processing Times */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-8">أوقات المعالجة</h2>
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <p className="text-gray-600 mb-6">
              أوقات المعالجة تختلف حسب نوع المنتج وتوفره في المخزون. جميع الأوقات المذكورة هي أيام عمل (السبت إلى
              الخميس).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {processingTimes.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-bold text-primary">{item.category}</h3>
                    <p className="text-sm text-gray-600">{item.availability}</p>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="font-medium text-accent">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Zones */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-8">مناطق الشحن</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {shippingZones.map((zone, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-100 "
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold text-primary">{zone.zone}</h3>
                </div>
                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">المدن المشمولة:</h4>
                    <p className="text-sm text-gray-600">{zone.cities.join("، ")}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">الشحن العادي:</span>
                      <p className="font-medium text-primary">{zone.standardTime}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">الشحن السريع:</span>
                      <p className="font-medium text-accent">{zone.expressTime}</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-primary border border-green-200 rounded-lg">
                  <p className="text-white text-sm font-medium">{zone.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Handling */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-8">المعالجة الخاصة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialHandling.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-100 "
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary mb-2">{item.category}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">نوع المعالجة:</span>
                        <span className="text-primary text-sm font-medium">{item.handling}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">التكلفة الإضافية:</span>
                        <span className="text-accent text-sm font-medium">{item.additionalCost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance and Liability */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-8">التأمين والمسؤولية</h2>
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <Shield className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">التأمين الشامل</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      جميع الشحنات مؤمنة ضد التلف والفقدان بقيمة كاملة. التأمين يشمل الأدوات الكهربائية، المعدات
                      الثقيلة، والمواد الحساسة.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• تغطية شاملة للتلف أثناء النقل</li>
                  <li>• حماية ضد الفقدان والسرقة</li>
                  <li>• تعويض فوري في حالة التلف</li>
                </ul>
              </div>
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">المسؤولية والاستثناءات</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      نتحمل المسؤولية الكاملة عن سلامة البضاعة حتى التسليم. هناك استثناءات محدودة للظروف القاهرة.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• الكوارث الطبيعية والظروف الجوية القاسية</li>
                  <li>• التأخير بسبب الإجراءات الحكومية</li>
                  <li>• عدم توفر المستلم في العنوان المحدد</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Calculator */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-8">حاسبة الشحن</h2>
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <Calculator className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">احسب تكلفة الشحن</h3>
                <p className="text-gray-600 mb-4">
                  استخدم حاسبة الشحن لمعرفة التكلفة الدقيقة والوقت المتوقع للتوصيل بناءً على موقعك ونوع المنتجات.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                <Select 
                    onChange={() => {}}
                    options={[
                        { value: '*', label: 'اختر المدينة' },
                        { value: 'جدة', label: 'جدة' },
                        { value: 'الدمام', label: 'الدمام' },
                    ]}
                />

   
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوزن التقريبي (كيلو)</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  احسب التكلفة
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-8">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {shippingFaqs.map((faq, index) => (
              <Collapsible key={index} title={faq.question}>
                {faq.answer}
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-primary rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">هل تحتاج مساعدة في الشحن؟</h3>
          <p className="text-white/90 mb-6">فريق خدمة العملاء متاح لمساعدتك في جميع استفسارات الشحن والتوصيل</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
              تواصل معنا
            </button>
            <button className="bg-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors">
              تتبع الشحنة
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
