"use client"

import { Truck, Package, MessageSquare, MapPin, Clock, Shield, RotateCcw, CheckCircle, AlertCircle } from "lucide-react"
import Navbar from "@/components/header"
import Footer from "@/components/custom/footer"
import Breadcrumb from "@/components/ui/breadcrumb"
import Collapsible from "@/components/ui/collabsible"

export default function DeliveryReturnPolicyPage() {

  const deliverySteps = [
    {
      step: 1,
      title: "اطلب المنتج واختر طريقة التوصيل",
      description: "اختر المنتجات وحدد طريقة التوصيل المناسبة لك",
      icon: Package,
    },
    {
      step: 2,
      title: "ستتلقى رسالة تأكيد الطلب",
      description: "سنرسل لك تأكيد الطلب ورقم التتبع",
      icon: MessageSquare,
    },
    {
      step: 3,
      title: "انتظر وصول طلبك",
      description: "تتبع طلبك حتى وصوله إلى عنوانك",
      icon: Truck,
    },
    {
      step: 4,
      title: "استلم طلبك في المكان المحدد",
      description: "استلم منتجاتك وتأكد من سلامتها",
      icon: MapPin,
    },
  ]

  const deliveryOptions = [
    {
      title: "التوصيل العادي",
      duration: "3-5 أيام عمل",
      cost: "مجاني للطلبات أكثر من 500 ريال",
      description: "توصيل عادي لجميع أنحاء المملكة",
    },
    {
      title: "التوصيل السريع",
      duration: "1-2 أيام عمل",
      cost: "50 ريال",
      description: "توصيل سريع للمدن الرئيسية",
    },
    {
      title: "التوصيل في نفس اليوم",
      duration: "خلال 6 ساعات",
      cost: "100 ريال",
      description: "متاح في الرياض وجدة والدمام",
    },
  ]

  const returnRequirements = [
    "المعدات مكتملة التجهيز",
    "إيصال يثبت الشراء من المتجر",
    "بطاقة الضمان",
    "وصف للعيب مُعد من قسم خدمة العملاء",
  ]

  const faqs = [
    {
      question: "لم يصل طلبي بعد. أين هو؟",
      answer:
        "يمكنك تتبع طلبك من خلال رقم التتبع المرسل إليك عبر الرسائل النصية أو البريد الإلكتروني. إذا تأخر الطلب عن الموعد المحدد، يرجى التواصل مع خدمة العملاء.",
    },
    {
      question: "هل تقومون بالتوصيل في العطل الرسمية؟",
      answer: "لا نقوم بالتوصيل في العطل الرسمية والجمع. سيتم تأجيل التوصيل إلى أول يوم عمل تالي.",
    },
    {
      question: "هل تقومون بالتوصيل إلى الرمز البريدي الخاص بي؟",
      answer:
        "نقوم بالتوصيل إلى جميع أنحاء المملكة العربية السعودية. يمكنك التحقق من إمكانية التوصيل لمنطقتك عند إدخال الرمز البريدي في صفحة الدفع.",
    },
    {
      question: "هل التوصيل في اليوم التالي متاح لجميع الطلبات؟",
      answer:
        "التوصيل في اليوم التالي متاح للمدن الرئيسية فقط وللطلبات المؤكدة قبل الساعة 2 ظهراً. بعض المنتجات الثقيلة قد تحتاج وقت إضافي.",
    },
    {
      question: "هل أحتاج للتوقيع عند استلام الطلب؟",
      answer:
        "نعم، يتطلب التوقيع عند الاستلام لضمان وصول الطلب للشخص المناسب. في حالة عدم وجودك، سيحاول المندوب التواصل معك لترتيب موعد آخر.",
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
            { label: "سياسة التوصيل والإرجاع", href: "/delivery-return-policy" },
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
              <h1 className="text-3xl lg:text-4xl font-bold mb-6">التوصيل والإرجاع</h1>
              <p className="text-white/90 text-lg leading-relaxed">
                توصيل مجاني متاح على آلاف المنتجات للطلبات أكثر من 500 ريال. اختر تاريخ ووقت توصيل محدد يناسبك مقابل
                رسوم إضافية.
              </p>
            </div>

            {/* Right Content - Delivery Image */}
            <div className="flex justify-center items-center">
              <img
                src="https://img.freepik.com/free-photo/high-angle-box-red-arrow_23-2148790075.jpg?ga=GA1.1.13001579.1750676221&semt=ais_hybrid&w=740"
                alt="خدمة التوصيل"
                className="w-full max-w-sm h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Delivery Options Overview */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-6">نظرة عامة على خيارات التوصيل</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            متجر الأدوات المتخصص يقدم طرق شحن مثالية لأي متطلب. سواء كان بسعر منخفض من خلال البريد العادي، أو بشكل أسرع
            عبر الشحن السريع، أو موثوق وآمن بواسطة مندوب متخصص. وبالإضافة يمكنك أيضاً استلام طلبك بنفسك من متجرنا إذا كنت
            تفضل ذلك. في هذه الصفحة ستجد نظرة عامة على جميع طرق الشحن المتاحة.
          </p>

          {/* Delivery Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-xl p-6 border border-gray-100 transition-shadow">
                  <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-[var(--primary)]" />
                  </div>
                  <h3 className="font-bold text-[var(--primary)] mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-sm text-center">{step.description}</p>
                </div>
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">خيارات التوصيل</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-100 transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Truck className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold text-primary">{option.title}</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{option.duration}</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">{option.cost}</div>
                </div>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Return Policy */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">استبدال أو إرجاع البضائع</h2>

          <div className="bg-white rounded-xl p-8 border border-gray-100 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <RotateCcw className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">حق الإرجاع خلال 14 يوم</h3>
                <p className="text-gray-600 leading-relaxed">
                  إذا كان المنتج بجودة جيدة، يحق للمشتري إنهاء العقد المبرم عن بُعد خلال 14 يوماً من تاريخ تنفيذه.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">شروط الحفاظ على حق الإرجاع</h4>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    لكي يتم الحفاظ على حق إنهاء الاتفاقية، يحتاج المستهلك إلى مراقبة الحفاظ على المنتجات في حالتها
                    الأصلية. إذا تم تدمير الجهاز أو تلفه أو إتلافه دون خطأ من العميل، فإن العميل لا يُحرم من فرصة إنهاء
                    العقد. إذا انخفضت القيمة بسبب فتح المنتج أو فحص وظائفه، فهذا لا يعني أن المستهلك لا يمكنه كتابة طلب
                    استرداد.
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-primary mb-4">
              لا يتم قبول المنتج للإرجاع إذا كان ينقص أحد المكونات التالية:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {returnRequirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary border border-blue-200 rounded-lg">
              <p className="text-white text-sm">
                <Shield className="w-4 h-4 inline ml-2" />
                سيتم إرجاع الأموال للبضائع خلال الشروط المحددة بموجب التشريع الحالي.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-8">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible key={index} title={faq.question}>
                {faq.answer}
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-[var(--primary)] rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">هل لديك أسئلة أخرى؟</h3>
          <p className="text-white/90 mb-6">فريق خدمة العملاء متاح لمساعدتك في أي استفسار</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-[var(--primary)] px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
              تواصل معنا
            </button>
            <button className="bg-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors">
              الدردشة المباشرة
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
