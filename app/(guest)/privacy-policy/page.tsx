"use client"

import { Shield, Eye, Lock, Users, Cookie, FileText, Phone, Mail } from 'lucide-react'
import Navbar from "@/components/header"
import Footer from "@/components/custom/footer"
import Breadcrumb from "@/components/ui/breadcrumb"
import Collapsible from '@/components/ui/collabsible'

export default function PrivacyPolicyPage() {
  const dataTypes = [
    {
      title: "المعلومات الشخصية",
      description: "الاسم، البريد الإلكتروني، رقم الهاتف، العنوان",
      icon: Users,
    },
    {
      title: "معلومات الدفع",
      description: "تفاصيل البطاقة الائتمانية (مشفرة)، تاريخ المعاملات",
      icon: Lock,
    },
    {
      title: "بيانات التصفح",
      description: "عنوان IP، نوع المتصفح، صفحات الزيارة",
      icon: Eye,
    },
    {
      title: "معلومات الطلبات",
      description: "تاريخ الطلبات، المنتجات المشتراة، تفضيلات التوصيل",
      icon: FileText,
    },
  ]

  const userRights = [
    "الحق في الوصول إلى بياناتك الشخصية",
    "الحق في تصحيح البيانات غير الصحيحة",
    "الحق في حذف بياناتك الشخصية",
    "الحق في تقييد معالجة البيانات",
    "الحق في نقل البيانات",
    "الحق في الاعتراض على معالجة البيانات",
  ]

  const securityMeasures = [
    {
      title: "التشفير المتقدم",
      description: "نستخدم تشفير SSL 256-bit لحماية جميع البيانات المنقولة",
    },
    {
      title: "الخوادم الآمنة",
      description: "خوادمنا محمية بأحدث تقنيات الأمان والمراقبة على مدار الساعة",
    },
    {
      title: "الوصول المحدود",
      description: "الوصول للبيانات مقتصر على الموظفين المخولين فقط",
    },
    {
      title: "النسخ الاحتياطي",
      description: "نسخ احتياطية منتظمة لضمان عدم فقدان البيانات",
    },
  ]

  const privacyFaqs = [
    {
      question: "ما هي البيانات التي تجمعونها عني؟",
      answer:
        "نجمع المعلومات الضرورية لتقديم خدماتنا مثل الاسم، البريد الإلكتروني، رقم الهاتف، العنوان، ومعلومات الدفع. كما نجمع بيانات التصفح لتحسين تجربة المستخدم.",
    },
    {
      question: "كيف تستخدمون بياناتي الشخصية؟",
      answer:
        "نستخدم بياناتك لمعالجة الطلبات، التواصل معك، تحسين خدماتنا، وإرسال العروض التسويقية (بموافقتك). لا نبيع أو نشارك بياناتك مع أطراف ثالثة دون موافقتك.",
    },
    {
      question: "هل تشاركون بياناتي مع أطراف أخرى؟",
      answer:
        "نشارك البيانات فقط مع شركاء الخدمة الضروريين مثل شركات الشحن ومعالجات الدفع، وذلك لتنفيذ طلباتك. جميع الشركاء ملتزمون بحماية بياناتك.",
    },
    {
      question: "كم من الوقت تحتفظون ببياناتي؟",
      answer:
        "نحتفظ ببياناتك طالما كان حسابك نشطاً أو حسب الحاجة لتقديم الخدمات. يمكنك طلب حذف بياناتك في أي وقت، مع مراعاة المتطلبات القانونية.",
    },
    {
      question: "كيف يمكنني تحديث أو حذف بياناتي؟",
      answer:
        "يمكنك تحديث بياناتك من خلال حسابك الشخصي أو التواصل معنا. لحذف البيانات، يرجى إرسال طلب عبر البريد الإلكتروني وسنقوم بمعالجته خلال 30 يوماً.",
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
            { label: "سياسة الخصوصية", href: "/privacy-policy" },
          ]}
          variant="light"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-xl mb-12 bg-[var(--primary)]">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-3xl lg:text-4xl font-bold mb-6">سياسة الخصوصية</h1>
              <p className="text-white/90 text-lg leading-relaxed">
                نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية. تعرف على كيفية جمع واستخدام وحماية معلوماتك عند استخدام
                متجرنا الإلكتروني.
              </p>
              <p className="text-white/80 text-sm mt-4">آخر تحديث: 15 يناير 2024</p>
            </div>

            {/* Right Content - Privacy Image */}
            <div className="flex justify-center items-center">
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
                alt="حماية الخصوصية"
                className="w-full max-w-sm h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl p-8 border border-gray-100 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-8 h-8 text-[var(--primary)] mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">التزامنا بحماية خصوصيتك</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                في متجر الأدوات المتخصص، نؤمن بأن خصوصيتك حق أساسي. هذه السياسة توضح كيفية جمع واستخدام وحماية
                معلوماتك الشخصية عند استخدام موقعنا الإلكتروني وخدماتنا.
              </p>
              <p className="text-gray-600 leading-relaxed">
                نلتزم بأعلى معايير الأمان والشفافية في التعامل مع بياناتك، ونضمن عدم استخدامها إلا للأغراض المحددة في
                هذه السياسة.
              </p>
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-8">البيانات التي نجمعها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                    <type.icon className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--primary)] mb-2">{type.title}</h3>
                    <p className="text-gray-600 text-sm">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How We Use Data */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-8">كيف نستخدم بياناتك</h2>
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-[var(--primary)] mb-4">الأغراض الأساسية</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2"></div>
                    <span className="text-gray-600">معالجة وتنفيذ طلباتك</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2"></div>
                    <span className="text-gray-600">التواصل معك بخصوص الطلبات</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2"></div>
                    <span className="text-gray-600">تقديم خدمة العملاء</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2"></div>
                    <span className="text-gray-600">معالجة المدفوعات والفواتير</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--primary)] mb-4">الأغراض الثانوية</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full mt-2"></div>
                    <span className="text-gray-600">تحسين تجربة المستخدم</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full mt-2"></div>
                    <span className="text-gray-600">إرسال العروض التسويقية (بموافقتك)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full mt-2"></div>
                    <span className="text-gray-600">تحليل سلوك التسوق</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full mt-2"></div>
                    <span className="text-gray-600">منع الاحتيال والأنشطة المشبوهة</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Security Measures */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-8">إجراءات الأمان</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityMeasures.map((measure, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <Lock className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-[var(--primary)] mb-2">{measure.title}</h3>
                    <p className="text-gray-600 text-sm">{measure.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Rights */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-8">حقوقك</h2>
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <p className="text-gray-600 mb-6">
              وفقاً لقوانين حماية البيانات، لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userRights.map((right, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[var(--primary)] mt-0.5" />
                  <span className="text-gray-700">{right}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cookies Policy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-8">سياسة ملفات تعريف الارتباط</h2>
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <Cookie className="w-6 h-6 text-[var(--primary)] mt-1" />
              <div>
                <h3 className="text-lg font-bold text-[var(--primary)] mb-4">ما هي ملفات تعريف الارتباط؟</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة يتم حفظها على جهازك عند زيارة موقعنا. تساعدنا
                  هذه الملفات في تحسين تجربتك وتذكر تفضيلاتك.
                </p>
                <h4 className="font-bold text-[var(--primary)] mb-3">أنواع ملفات تعريف الارتباط التي نستخدمها:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• ملفات ضرورية: لضمان عمل الموقع بشكل صحيح</li>
                  <li>• ملفات الأداء: لتحليل استخدام الموقع وتحسينه</li>
                  <li>• ملفات التسويق: لعرض إعلانات مخصصة (بموافقتك)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-8">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {privacyFaqs.map((faq, index) => (
              <Collapsible key={index} title={faq.question}>
                {faq.answer}
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-[var(--primary)] rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">هل لديك أسئلة حول الخصوصية؟</h3>
          <p className="text-white/90 mb-6">تواصل معنا للحصول على مزيد من المعلومات حول سياسة الخصوصية</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-[var(--primary)] px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" />
              privacy@store.com
            </button>
            <button className="bg-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +966 11 123 4567
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
