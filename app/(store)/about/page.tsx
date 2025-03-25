import Image from "next/image"
import { Award, Target, TrendingUp, CheckCircle, Calendar, Truck, ShieldCheck, ThumbsUp } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
} from "@/components/ui/breadcrumb"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#00998F] text-white py-16">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
            <div className="absolute right-20 top-10 w-20 h-20 rounded-full bg-white opacity-5"></div>
            <div className="absolute left-1/3 bottom-10 w-32 h-32 rounded-full bg-white opacity-5"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* <Breadcrumb 
              items={[
                { label: "الرئيسية", href: "/" },
                { label: "من نحن" }
              ]}
              className=" text-white"
            /> */}
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-right mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-2">محلات علي ابو مسعود</h1>
                <div className="h-1 w-24 bg-white mb-6 mr-1"></div>
                <p className="text-xl mb-6">نحن نقدم أفضل مواد البناء والعدد الكهربائية منذ أكثر من 25 عاماً</p>
                <p className="mb-8 opacity-90">
                  تأسست محلات علي ابو مسعود عام 1998 لتكون واحدة من أكبر المحلات المتخصصة في مجال مواد البناء والعدد الكهربائية والمواد الزراعية في الأردن. نسعى دائماً لتقديم منتجات ذات جودة عالية وخدمة متميزة لعملائنا.
                </p>
              </div>
              
              <div className="md:w-1/2">
                <div className="relative h-72 w-full">
                  <div className="absolute inset-0 bg-[#D2EAE8] rounded-sm transform rotate-3"></div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="محلات علي ابو مسعود"
                    fill
                    className="object-cover rounded-sm transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
          
        </section>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">قصتنا</h2>
              <div className="h-1 w-24 bg-[#00998F] mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                بدأت رحلتنا منذ أكثر من 25 عاماً بهدف توفير أفضل المنتجات وتقديم خدمة متميزة لعملائنا
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className=" p-6 rounded-sm  bg-[#D2EAE8] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00998F] rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">التأسيس</h3>
                <p className="text-gray-600">
                  تأسست محلات علي ابو مسعود عام 1998 كمتجر صغير في وسط عمان، وبدأت بتوفير مواد البناء الأساسية للمقاولين والأفراد.
                </p>
              </div>
              
              <div className=" p-6 rounded-sm  bg-[#D2EAE8] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00998F] rounded-full mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">النمو والتطور</h3>
                <p className="text-gray-600">
                  توسعت أعمالنا على مدار السنوات لتشمل العدد الكهربائية والمواد الزراعية، وافتتحنا فروعاً جديدة في مختلف مناطق المملكة.
                </p>
              </div>
              
              <div className=" p-6 rounded-sm  bg-[#D2EAE8] text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00998F] rounded-full mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">الحاضر والمستقبل</h3>
                <p className="text-gray-600">
                  اليوم، نفخر بأننا أصبحنا من أكبر المحلات في مجالنا، ونسعى دائماً للتطوير وتقديم أفضل المنتجات والخدمات لعملائنا.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Vision & Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#D2EAE8] p-4 rounded-sm  border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00998F] rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">رؤيتنا</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  أن نكون الخيار الأول والأفضل في مجال مواد البناء والعدد الكهربائية والمواد الزراعية في الأردن، من خلال تقديم منتجات ذات جودة عالية وخدمة متميزة.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00998F]" />
                    <span>توفير منتجات عالية الجودة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00998F]" />
                    <span>تقديم خدمة متميزة للعملاء</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00998F]" />
                    <span>المساهمة في تطوير قطاع البناء</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#D2EAE8] p-4 rounded-sm  border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00998F] rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">رسالتنا</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  نسعى لتوفير منتجات ذات جودة عالية وبأسعار منافسة، مع تقديم خدمة متميزة لعملائنا وتلبية احتياجاتهم بكفاءة وسرعة.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00998F]" />
                    <span>توفير منتجات متنوعة تلبي احتياجات العملاء</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00998F]" />
                    <span>تقديم استشارات فنية متخصصة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00998F]" />
                    <span>بناء علاقات طويلة الأمد مع العملاء</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-[#D2EAE8]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">لماذا تختارنا</h2>
              <div className="h-0.5 w-24 bg-[#00998F] mx-auto mb-6"></div>
              <p className="max-w-2xl mx-auto text-gray-600">
                نحن نسعى دائماً لتقديم أفضل المنتجات والخدمات لعملائنا
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-sm ">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00998F] rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">جودة عالية</h3>
                </div>
                <p className="text-gray-600">
                  نوفر منتجات ذات جودة عالية من أفضل الماركات العالمية، مع ضمان على جميع المنتجات.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-sm ">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00998F] rounded-full flex items-center justify-center">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">توصيل سريع</h3>
                </div>
                <p className="text-gray-600">
                  نقدم خدمة توصيل سريعة وموثوقة لجميع مناطق المملكة، مع إمكانية التوصيل في نفس اليوم للطلبات العاجلة.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-sm ">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00998F] rounded-full flex items-center justify-center">
                    <ThumbsUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">خدمة متميزة</h3>
                </div>
                <p className="text-gray-600">
                  فريق خدمة العملاء لدينا متاح دائماً للإجابة على استفساراتكم وتقديم المشورة الفنية المتخصصة.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-[#00998F] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">هل أنت مستعد للتعاون معنا؟</h2>
            <p className="max-w-2xl mx-auto mb-8 opacity-90">
              نحن نتطلع دائماً للتعاون مع عملاء جدد وتقديم أفضل الخدمات والمنتجات. تواصل معنا اليوم!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary"
              >
                تواصل معنا
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                تصفح منتجاتنا
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
