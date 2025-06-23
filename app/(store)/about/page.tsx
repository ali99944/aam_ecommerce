"use client"

import { Users, Target, Award, Heart, Truck, Shield, Clock, Star, Eye } from 'lucide-react'
import Navbar from "@/components/header"
import Footer from "@/components/custom/footer"
import Button from "@/components/ui/button"
import Card from '@/components/ui/card'
import Link from 'next/link'

export default function AboutPage() {
  const stats = [
    { number: "50,000+", label: "عميل راضٍ", icon: Users },
    { number: "10,000+", label: "منتج متنوع", icon: Target },
    { number: "5", label: "سنوات خبرة", icon: Award },
    { number: "99%", label: "رضا العملاء", icon: Heart },
  ]

  const features = [
    {
      icon: Truck,
      title: "شحن مجاني",
      description: "شحن مجاني لجميع الطلبات أكثر من 200 ريال"
    },
    {
      icon: Shield,
      title: "ضمان الجودة",
      description: "جميع منتجاتنا أصلية ومضمونة 100%"
    },
    {
      icon: Clock,
      title: "خدمة 24/7",
      description: "فريق خدمة العملاء متاح على مدار الساعة"
    },
    {
      icon: Star,
      title: "تقييم عالي",
      description: "أكثر من 50 ألف تقييم إيجابي من عملائنا"
    },
  ]

  const team = [
    {
      name: "أحمد محمد",
      position: "المدير التنفيذي",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      description: "خبرة أكثر من 10 سنوات في مجال التجارة الإلكترونية"
    },
    {
      name: "فاطمة علي",
      position: "مديرة التسويق",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      description: "متخصصة في استراتيجيات التسويق الرقمي والعلامات التجارية"
    },
    {
      name: "محمد السعيد",
      position: "مدير التقنية",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      description: "خبير في تطوير المنصات الإلكترونية والتقنيات الحديثة"
    },
  ]

  const values = [
    {
      icon: Target,
      title: "رؤيتنا",
      description: "أن نكون المتجر الإلكتروني الرائد في المنطقة العربية، ونقدم أفضل تجربة تسوق رقمية تجمع بين الجودة والابتكار.",
    },
    {
      icon: Eye,
      title: "رسالتنا",
      description: "نسعى لجعل التكنولوجيا في متناول الجميع من خلال توفير منتجات عالية الجودة بأسعار تنافسية وخدمة عملاء استثنائية.",
    },
    {
      icon: Heart,
      title: "قيمنا",
      description: "الثقة، الجودة، الابتكار، والالتزام بتقديم أفضل خدمة للعملاء مع الحفاظ على أعلى معايير الأمان والموثوقية.",
    },
  ]

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-6">من نحن</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن متجر محلاتنا، وجهتك الأولى للتسوق الإلكتروني في المملكة العربية السعودية. 
            نقدم أفضل المنتجات بأسعار تنافسية وخدمة عملاء متميزة.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">قصتنا</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                بدأت رحلتنا في عام 2019 بحلم بسيط: جعل التسوق الإلكتروني أسهل وأكثر متعة للجميع. 
                انطلقنا من فكرة توفير منصة موثوقة تجمع أفضل المنتجات من مختلف الفئات في مكان واحد.
              </p>
              <p>
                اليوم، نفخر بخدمة أكثر من 50 ألف عميل راضٍ، ونقدم أكثر من 10 آلاف منتج متنوع 
                يلبي احتياجات جميع أفراد الأسرة. نؤمن بأن كل عميل يستحق تجربة تسوق استثنائية.
              </p>
              <p>
                رؤيتنا هي أن نكون المتجر الإلكتروني الأول في المنطقة، ونواصل العمل يومياً 
                لتحقيق هذا الهدف من خلال الابتكار والتطوير المستمر.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://img.freepik.com/premium-photo/boxes-trolley-laptop_36051-524.jpg?ga=GA1.1.1052836384.1750646072&semt=ais_hybrid&w=740"
              alt="قصة متجر محلاتنا"
              className="w-full h-96 object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
          </div>
        </div>

      {/* Vision, Mission, Values */}
      <section className=" bg-[var(--background)] mb-20">
        <div className="max-w-7xl">


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-4  !border-none">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">لماذا نحن مختلفون؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">فريق العمل</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center border border-gray-100">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                <p className="text-[var(--accent)] font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>


        {/* CTA Section */}
        <div className="text-center bg-gray-900 px-4 py-8 rounded-xl">
          <h2 className="text-3xl font-bold text-white/85 mb-2">انضم إلى متجر محلاتنا</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            اكتشف آلاف المنتجات المتميزة واستمتع بتجربة تسوق لا تُنسى مع خدمة عملاء استثنائية
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="sm">
              <Link href="/products">تسوق الآن</Link>
            </Button>
            <Button variant="secondary" size="sm">
              <a href="/contact">تواصل معنا</a>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
