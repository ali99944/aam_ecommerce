import { Shield, Lock, Eye, FileText, Server, UserCheck } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "سياسة الخصوصية" }]} className="mb-6" />

          <div className="bg-white rounded-sm border border-gray-200 p-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D2EAE8] rounded-full mb-4">
                  <Shield className="h-8 w-8 text-[#00998F]" />
                </div>
                <h1 className="text-3xl font-bold mb-2">سياسة الخصوصية</h1>
                <p className="text-gray-600">آخر تحديث: 15 أكتوبر 2023</p>
              </div>

              <div className="prose prose-lg max-w-none">
                <p>
                  نحن في محلات علي أبو مسعود نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. تشرح سياسة الخصوصية هذه كيفية
                  جمعنا واستخدامنا وحمايتنا لمعلوماتك عند استخدام موقعنا الإلكتروني.
                </p>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#00998F]" />
                    المعلومات التي نجمعها
                  </h2>

                  <p className="mb-4">قد نقوم بجمع المعلومات التالية:</p>

                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>المعلومات الشخصية مثل الاسم والعنوان ورقم الهاتف والبريد الإلكتروني.</li>
                    <li>معلومات الدفع مثل تفاصيل بطاقة الائتمان أو الحساب البنكي.</li>
                    <li>معلومات حول زياراتك لموقعنا الإلكتروني وكيفية استخدامك له.</li>
                    <li>المعلومات التي تقدمها عند التواصل معنا أو إنشاء حساب.</li>
                    <li>تفضيلاتك وتاريخ مشترياتك.</li>
                  </ul>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-[#00998F]" />
                    كيف نستخدم معلوماتك
                  </h2>

                  <p className="mb-4">نستخدم المعلومات التي نجمعها للأغراض التالية:</p>

                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>توفير المنتجات والخدمات التي تطلبها.</li>
                    <li>معالجة طلباتك وإدارة حسابك.</li>
                    <li>التواصل معك بخصوص طلباتك والمنتجات والعروض.</li>
                    <li>تحسين موقعنا الإلكتروني وخدماتنا.</li>
                    <li>إجراء بحوث السوق وتحليل البيانات.</li>
                    <li>منع الاحتيال وحماية أمن موقعنا.</li>
                  </ul>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-[#00998F]" />
                    أمن المعلومات
                  </h2>

                  <p>
                    نحن ملتزمون بضمان أمن معلوماتك. لقد اتخذنا تدابير تقنية وتنظيمية مناسبة لمنع فقدان أو سوء استخدام أو
                    تغيير المعلومات التي نجمعها. جميع معلومات الدفع مشفرة باستخدام تقنية SSL. ومع ذلك، يرجى العلم أن لا
                    يمكن ضمان أمن المعلومات المرسلة عبر الإنترنت بشكل كامل.
                  </p>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Server className="h-5 w-5 text-[#00998F]" />
                    ملفات تعريف الارتباط (Cookies)
                  </h2>

                  <p>
                    نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم
                    تخزينها على جهازك عند زيارة موقعنا. يمكنك تعطيل ملفات تعريف الارتباط في إعدادات متصفحك، ولكن قد يؤثر
                    ذلك على وظائف معينة في موقعنا.
                  </p>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-[#00998F]" />
                    حقوقك
                  </h2>

                  <p className="mb-4">لديك الحق في:</p>

                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>الوصول إلى المعلومات الشخصية التي نحتفظ بها عنك.</li>
                    <li>طلب تصحيح أو تحديث معلوماتك الشخصية.</li>
                    <li>طلب حذف معلوماتك الشخصية في ظروف معينة.</li>
                    <li>الاعتراض على معالجة معلوماتك الشخصية.</li>
                    <li>طلب تقييد معالجة معلوماتك الشخصية.</li>
                    <li>طلب نقل معلوماتك الشخصية إلى طرف ثالث.</li>
                  </ul>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4">التغييرات على سياسة الخصوصية</h2>

                  <p>
                    قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بنشر أي تغييرات على هذه الصفحة وسنعلمك بأي
                    تغييرات جوهرية. نشجعك على مراجعة سياسة الخصوصية هذه بانتظام للبقاء على اطلاع بكيفية حمايتنا
                    لمعلوماتك.
                  </p>
                </div>

                <div className="my-8">
                  <h2 className="text-xl font-bold mb-4">الاتصال بنا</h2>

                  <p>
                    إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارساتنا المتعلقة بالخصوصية، يرجى الاتصال بنا على:
                  </p>

                  <div className="bg-gray-50 p-4 rounded-sm mt-4">
                    <p className="mb-2">
                      <strong>محلات علي أبو مسعود</strong>
                    </p>
                    <p className="mb-2">عمان، الأردن - شارع الملك عبدالله الثاني</p>
                    <p className="mb-2" dir="ltr">
                      +962 79 123 4567
                    </p>
                    <p>info@abumassoud.com</p>
                  </div>
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

