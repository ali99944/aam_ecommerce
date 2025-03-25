import Link from "next/link"
import { RefreshCw, Package, Clock, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export default function ReturnPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "سياسة الإرجاع" }]} className="mb-6" />

          <div className="bg-white rounded-sm border border-gray-200 p-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D2EAE8] rounded-full mb-4">
                  <RefreshCw className="h-8 w-8 text-[#00998F]" />
                </div>
                <h1 className="text-3xl font-bold mb-2">سياسة الإرجاع والاستبدال</h1>
                <p className="text-gray-600">آخر تحديث: 15 أكتوبر 2023</p>
              </div>

              <div className="prose prose-lg max-w-none">
                <p>
                  في محلات علي أبو مسعود، نسعى دائماً لتقديم منتجات عالية الجودة ونضمن رضا عملائنا. تشرح سياسة الإرجاع
                  والاستبدال هذه الشروط والإجراءات المتعلقة بإرجاع المنتجات واستبدالها.
                </p>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#00998F]" />
                    فترة الإرجاع
                  </h2>

                  <p>
                    يمكنك إرجاع المنتجات التي اشتريتها من محلات علي أبو مسعود خلال 14 يوماً من تاريخ الاستلام. بعد انقضاء
                    هذه الفترة، لن نتمكن من قبول الإرجاع إلا في حالة وجود عيب مصنعي في المنتج.
                  </p>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5 text-[#00998F]" />
                    شروط الإرجاع
                  </h2>

                  <p className="mb-4">لقبول إرجاع المنتج، يجب استيفاء الشروط التالية:</p>

                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>يجب أن يكون المنتج في حالته الأصلية وغير مستخدم.</li>
                    <li>يجب أن تكون جميع الملصقات والعلامات الأصلية موجودة.</li>
                    <li>يجب تقديم إثبات الشراء (فاتورة أو إيصال).</li>
                    <li>يجب أن يكون المنتج في عبوته الأصلية وبجميع الملحقات والهدايا المرفقة.</li>
                    <li>لا يمكن إرجاع المنتجات المخصصة أو المصنوعة حسب الطلب.</li>
                  </ul>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-[#00998F]" />
                    المنتجات غير القابلة للإرجاع
                  </h2>

                  <p className="mb-4">
                    بعض المنتجات غير قابلة للإرجاع لأسباب تتعلق بالصحة والسلامة أو لأسباب أخرى، وتشمل:
                  </p>

                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>المنتجات التي تم فتحها أو استخدامها (باستثناء حالات العيوب المصنعية).</li>
                    <li>المنتجات المخصصة أو المصنوعة حسب الطلب.</li>
                    <li>البرمجيات والتطبيقات التي تم تفعيلها.</li>
                    <li>المواد الاستهلاكية التي تم فتحها.</li>
                    <li>المنتجات المباعة بخصومات خاصة أو في عروض التصفية.</li>
                  </ul>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00998F]" />
                    إجراءات الإرجاع
                  </h2>

                  <p className="mb-4">لإرجاع منتج، يرجى اتباع الخطوات التالية:</p>

                  <ol className="list-decimal list-inside space-y-2 mr-6">
                    <li>
                      اتصل بخدمة العملاء على الرقم +962 79 123 4567 أو أرسل بريداً إلكترونياً إلى returns@abumassoud.com
                      لإبلاغنا برغبتك في إرجاع المنتج.
                    </li>
                    <li>سنزودك برقم تتبع للإرجاع وتعليمات حول كيفية إرجاع المنتج.</li>
                    <li>قم بتغليف المنتج بشكل آمن في عبوته الأصلية مع جميع الملحقات.</li>
                    <li>أرفق نسخة من الفاتورة ونموذج الإرجاع المعبأ.</li>
                    <li>أرسل المنتج إلى العنوان المحدد في تعليمات الإرجاع.</li>
                  </ol>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-[#00998F]" />
                    استرداد المبالغ والاستبدال
                  </h2>

                  <p className="mb-4">بعد استلام المنتج المرتجع وفحصه، سنقوم بإعلامك بقرارنا:</p>

                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>في حالة قبول الإرجاع، سيتم استرداد المبلغ بنفس طريقة الدفع الأصلية خلال 7-14 يوم عمل.</li>
                    <li>يمكنك اختيار استبدال المنتج بمنتج آخر من نفس القيمة أو أعلى (مع دفع الفرق).</li>
                    <li>في حالة وجود عيب مصنعي، سنقوم باستبدال المنتج بنفس المنتج أو استرداد المبلغ كاملاً.</li>
                    <li>لن يتم استرداد تكاليف الشحن الأصلية إلا في حالة وجود عيب مصنعي في المنتج.</li>
                  </ul>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#00998F]" />
                    الأسئلة الشائعة
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold mb-1">هل يمكنني إرجاع منتج اشتريته من أحد فروعكم؟</h3>
                      <p>نعم، يمكنك إرجاع المنتج إلى أي من فروعنا أو عبر الإنترنت، شرط تقديم إثبات الشراء.</p>
                    </div>

                    <div>
                      <h3 className="font-bold mb-1">هل يمكنني إرجاع منتج تم شراؤه في عرض خاص؟</h3>
                      <p>
                        يعتمد ذلك على شروط العرض. بعض العروض الخاصة قد تكون غير قابلة للإرجاع أو الاستبدال. يرجى مراجعة
                        شروط العرض أو الاتصال بخدمة العملاء.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold mb-1">كم من الوقت يستغرق استرداد المبلغ؟</h3>
                      <p>
                        بعد استلام وفحص المنتج المرتجع، يستغرق استرداد المبلغ عادةً 7-14 يوم عمل، اعتماداً على طريقة الدفع
                        الأصلية.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold mb-1">هل يمكنني إرجاع منتج به عيب بعد انتهاء فترة الإرجاع؟</h3>
                      <p>نعم، في حالة وجود عيب مصنعي، يمكنك إرجاع المنتج خلال فترة الضمان المحددة للمنتج.</p>
                    </div>
                  </div>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4">الاتصال بنا</h2>

                  <p className="mb-4">
                    إذا كان لديك أي أسئلة أو استفسارات حول سياسة الإرجاع والاستبدال، يرجى الاتصال بخدمة العملاء على:
                  </p>

                  <div className="bg-gray-50 p-4 rounded-sm mt-4">
                    <p className="mb-2">
                      <strong>محلات علي أبو مسعود - قسم خدمة العملاء</strong>
                    </p>
                    <p className="mb-2">عمان، الأردن - شارع الملك عبدالله الثاني</p>
                    <p className="mb-2" dir="ltr">
                      +962 79 123 4567
                    </p>
                    <p>returns@abumassoud.com</p>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <p className="text-gray-600 mb-6">نحن نسعى دائماً لتقديم أفضل خدمة لعملائنا. شكراً لثقتكم بنا.</p>
                  <Button as={Link} href="/contact">
                    تواصل معنا
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

