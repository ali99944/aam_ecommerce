"use client"

import { useState } from "react"
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  CreditCard,
  Truck,
  FileText,
  Calculator,
  Phone,
  Mail,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Button from "@/components/ui/button"
import Breadcrumb from "@/components/ui/breadcrumb"
import Collapsible from "@/components/ui/collabsible"
import ClientSupportChat from "@/components/support-chat-widget"

export default function RefundPolicyPage() {
  const [, setSelectedRefundType] = useState("product")

  const refundTypes = [
    {
      id: "product",
      title: "إرجاع المنتج",
      description: "إرجاع المنتج واسترداد المبلغ كاملاً",
      icon: RotateCcw,
      timeframe: "14 يوم",
      conditions: ["المنتج في حالته الأصلية", "العبوة والملحقات مكتملة", "إيصال الشراء"],
    },
    {
      id: "exchange",
      title: "استبدال المنتج",
      description: "استبدال المنتج بآخر من نفس القيمة أو أعلى",
      icon: CheckCircle,
      timeframe: "30 يوم",
      conditions: ["المنتج في حالة جيدة", "متوفر بديل مناسب", "دفع الفرق إن وجد"],
    },
    {
      id: "defective",
      title: "منتج معيب",
      description: "إرجاع أو استبدال المنتجات المعيبة أو التالفة",
      icon: AlertTriangle,
      timeframe: "فوري",
      conditions: ["إثبات العيب", "تقرير فني إن لزم", "ضمن فترة الضمان"],
    },
  ]

  const refundMethods = [
    {
      method: "البطاقة الائتمانية",
      timeframe: "3-5 أيام عمل",
      description: "استرداد إلى نفس البطاقة المستخدمة في الدفع",
      icon: CreditCard,
      fees: "بدون رسوم",
    },
    {
      method: "المحفظة الإلكترونية",
      timeframe: "24-48 ساعة",
      description: "استرداد إلى المحفظة الإلكترونية (STC Pay, أبل باي)",
      icon: CreditCard,
      fees: "بدون رسوم",
    },
    {
      method: "التحويل البنكي",
      timeframe: "5-7 أيام عمل",
      description: "تحويل المبلغ إلى حسابك البنكي",
      icon: CreditCard,
      fees: "رسوم تحويل قد تطبق",
    },
    {
      method: "رصيد المتجر",
      timeframe: "فوري",
      description: "إضافة المبلغ كرصيد في حسابك لاستخدامه في مشتريات مستقبلية",
      icon: CreditCard,
      fees: "بدون رسوم + 5% إضافي",
    },
  ]

  const eligibleProducts = [
    { category: "الأدوات الكهربائية", eligible: true, note: "ضمن 14 يوم من الاستلام" },
    { category: "مواد البناء", eligible: true, note: "العبوات غير المفتوحة فقط" },
    { category: "الأدوات اليدوية", eligible: true, note: "في حالتها الأصلية" },
    { category: "معدات الأمان", eligible: false, note: "لأسباب صحية وأمنية" },
    { category: "المنتجات المخصصة", eligible: false, note: "مصنوعة حسب الطلب" },
    { category: "البطاريات والمواد الكيميائية", eligible: false, note: "لأسباب أمنية وبيئية" },
  ]

  const refundProcess = [
    {
      step: 1,
      title: "طلب الإرجاع",
      description: "قدم طلب إرجاع عبر الموقع أو تطبيق الجوال",
      icon: FileText,
      timeframe: "خلال فترة الإرجاع المسموحة",
    },
    {
      step: 2,
      title: "مراجعة الطلب",
      description: "سيقوم فريقنا بمراجعة طلبك والموافقة عليه",
      icon: CheckCircle,
      timeframe: "خلال 24 ساعة",
    },
    {
      step: 3,
      title: "شحن المنتج",
      description: "أرسل المنتج إلينا باستخدام ملصق الشحن المجاني",
      icon: Truck,
      timeframe: "خلال 7 أيام من الموافقة",
    },
    {
      step: 4,
      title: "فحص المنتج",
      description: "سنفحص المنتج للتأكد من حالته ومطابقته للشروط",
      icon: CheckCircle,
      timeframe: "1-2 أيام عمل",
    },
    {
      step: 5,
      title: "معالجة الاسترداد",
      description: "سيتم استرداد المبلغ بالطريقة التي اخترتها",
      icon: CreditCard,
      timeframe: "حسب طريقة الاسترداد",
    },
  ]

  const refundCalculator = {
    productPrice: 500,
    shippingCost: 25,
    discount: 50,
    totalPaid: 475,
    refundAmount: 450, // excluding return shipping
    returnShipping: 25,
  }

  const refundFaqs = [
    {
      question: "متى يمكنني طلب إرجاع المنتج؟",
      answer:
        "يمكنك طلب إرجاع المنتج خلال 14 يوم من تاريخ الاستلام، شرط أن يكون المنتج في حالته الأصلية مع العبوة والملحقات.",
    },
    {
      question: "هل يمكنني إرجاع منتج استخدمته؟",
      answer:
        "يمكن إرجاع المنتجات المستخدمة بشكل طبيعي للاختبار، لكن لا يمكن إرجاع المنتجات التي تظهر عليها علامات استخدام مفرط أو تلف.",
    },
    {
      question: "من يتحمل تكلفة شحن الإرجاع؟",
      answer:
        "إذا كان المنتج معيباً أو مختلفاً عن الوصف، نتحمل نحن تكلفة الشحن. في الحالات الأخرى، يتحمل العميل تكلفة الإرجاع.",
    },
    {
      question: "كم يستغرق استرداد المبلغ؟",
      answer:
        "يختلف وقت الاسترداد حسب طريقة الدفع: البطاقات الائتمانية (3-5 أيام)، المحافظ الإلكترونية (24-48 ساعة)، التحويل البنكي (5-7 أيام).",
    },
    {
      question: "هل يمكنني إرجاع جزء من طلبي؟",
      answer: "نعم، يمكنك إرجاع منتجات محددة من طلبك. سيتم احتساب الاسترداد بناءً على قيمة المنتجات المرجعة فقط.",
    },
    {
      question: "ماذا لو فقدت إيصال الشراء؟",
      answer:
        "يمكنك العثور على تفاصيل طلبك في حسابك على الموقع. كما يمكن لفريق خدمة العملاء مساعدتك في استرجاع معلومات الطلب.",
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
            { label: "سياسة الاسترداد", href: "/refund-policy" },
          ]}
          variant="light"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-xl mb-12 bg-primary">
          <div className="text-white p-4">
              <h1 className="text-3xl lg:text-4xl font-bold mb-6">سياسة الاسترداد والإرجاع</h1>
              <p className="text-white/90 text-lg leading-relaxed">
                نحن ملتزمون برضاك التام. تعرف على سياسة الإرجاع والاسترداد الخاصة بنا وكيفية إرجاع المنتجات بسهولة
                وأمان.
              </p>
              <p className="text-white/80 text-sm mt-4">آخر تحديث: 15 يناير 2024</p>
            </div>
        </div>

        {/* Refund Types */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">أنواع الإرجاع والاسترداد</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {refundTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedRefundType(type.id)}
                className={`bg-white rounded-xl p-4 border border-gray-100   cursor-pointer`}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary text-center mb-2">{type.title}</h3>
                <p className="text-gray-600 text-center text-sm mb-4">{type.description}</p>
                <div className="text-center mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    خلال {type.timeframe}
                  </span>
                </div>
                <div className="space-y-2">
                  {type.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">خطوات عملية الإرجاع</h2>
          <div className="relative">
            {/* Process Line */}
            <div className="absolute top-8 right-8 left-8 h-0.5 bg-gray-200 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {refundProcess.map((step) => (
                <div key={step.step} className="relative">
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                    {/* Step Number */}
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-lg font-bold">{step.step}</span>
                    </div>

                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>

                    <h3 className="font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{step.timeframe}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Eligible Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">المنتجات القابلة للإرجاع</h2>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="bg-gray-50 p-4 font-bold text-primary">فئة المنتج</div>
              <div className="bg-gray-50 p-4 font-bold text-primary">قابل للإرجاع</div>
              <div className="bg-gray-50 p-4 font-bold text-primary">ملاحظات</div>
            </div>
            {eligibleProducts.map((product, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-gray-100">
                <div className="p-4 text-gray-700">{product.category}</div>
                <div className="p-4">
                  {product.eligible ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span>نعم</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="w-5 h-5" />
                      <span>لا</span>
                    </div>
                  )}
                </div>
                <div className="p-4 text-gray-600 text-sm">{product.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">طرق الاسترداد</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {refundMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-100  "
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary mb-2">{method.method}</h3>
                    <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{method.timeframe}</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">{method.fees}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Calculator Example */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">مثال على حساب الاسترداد</h2>
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <Calculator className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">حاسبة الاسترداد</h3>
                <p className="text-gray-600">مثال توضيحي لكيفية حساب مبلغ الاسترداد</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-primary mb-4">تفاصيل الطلب الأصلي</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">سعر المنتج:</span>
                    <span className="font-medium">{refundCalculator.productPrice} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تكلفة الشحن:</span>
                    <span className="font-medium">{refundCalculator.shippingCost} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الخصم:</span>
                    <span className="font-medium text-green-600">-{refundCalculator.discount} ريال</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-bold">
                      <span>المبلغ المدفوع:</span>
                      <span>{refundCalculator.totalPaid} ريال</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-primary mb-4">حساب الاسترداد</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">مبلغ المنتج المرجع:</span>
                    <span className="font-medium">{refundCalculator.refundAmount} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تكلفة شحن الإرجاع:</span>
                    <span className="font-medium text-red-600">-{refundCalculator.returnShipping} ريال</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>صافي الاسترداد:</span>
                      <span className="text-green-600">
                        {refundCalculator.refundAmount - refundCalculator.returnShipping} ريال
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-primary rounded-lg">
                  <p className="text-white text-sm">
                    <AlertTriangle className="w-4 h-4 inline ml-1" />
                    في حالة المنتجات المعيبة، لا يتم خصم تكلفة شحن الإرجاع
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {refundFaqs.map((faq, index) => (
              <Collapsible key={index} title={faq.question}>
                {faq.answer}
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-primary rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">هل تحتاج مساعدة في عملية الإرجاع؟</h3>
          <p className="text-white/90 mb-6">فريق خدمة العملاء متاح لمساعدتك في جميع خطوات عملية الإرجاع والاسترداد</p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" size="sm">
              <Mail className="w-4 h-4 ml-2" />
              support@amcstore.com
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Phone className="w-4 h-4 ml-2" />
              920001234
            </Button>
          </div>
        </div>
      </div>

      <Footer />

      <ClientSupportChat />
    </div>
  )
}
