import { Shield, Truck, Award, Users, Clock, Globe } from "lucide-react"
import Button from "../ui/button"

export default function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: "أمان وثقة",
      description: "نضمن لك تجربة تسوق آمنة ومحمية بأحدث تقنيات الأمان",
    },
    {
      icon: Truck,
      title: "توصيل سريع",
      description: "خدمة توصيل سريعة وموثوقة لجميع أنحاء المملكة",
    },
    {
      icon: Award,
      title: "جودة عالية",
      description: "منتجات أصلية ومضمونة من أفضل الماركات العالمية",
    },
    {
      icon: Users,
      title: "دعم العملاء",
      description: "فريق دعم متخصص متاح على مدار الساعة لخدمتك",
    },
    {
      icon: Clock,
      title: "خدمة 24/7",
      description: "متجر مفتوح على مدار الساعة لراحتك وسهولة التسوق",
    },
    {
      icon: Globe,
      title: "تغطية شاملة",
      description: "نصل إليك في جميع مدن ومناطق المملكة العربية السعودية",
    },
  ]

  const stats = [
    { number: "50,000+", label: "عميل راضي" },
    { number: "10,000+", label: "منتج متنوع" },
    { number: "500+", label: "ماركة عالمية" },
    { number: "99%", label: "رضا العملاء" },
  ]

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6">من نحن</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            متجر محلاتنا هو وجهتك الأولى للتسوق الإلكتروني في المملكة العربية السعودية. نقدم لك أفضل المنتجات التقنية
            والإلكترونية من أشهر الماركات العالمية بأسعار تنافسية وخدمة عملاء متميزة
          </p>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-6">رؤيتنا ورسالتنا</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              نسعى لأن نكون المتجر الإلكتروني الرائد في المنطقة، ونهدف إلى تقديم تجربة تسوق استثنائية تجمع بين الجودة
              والسعر المناسب والخدمة المتميزة. رسالتنا هي جعل التكنولوجيا في متناول الجميع.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-gray-700">منتجات أصلية ومضمونة 100%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-gray-700">أسعار تنافسية وعروض حصرية</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-gray-700">خدمة عملاء متميزة ودعم فني متخصص</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-gray-700">توصيل سريع وآمن لجميع أنحاء المملكة</span>
              </div>
            </div>
        <Button variant="primary" size="sm">
              تعرف على المزيد
            </Button>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="https://img.freepik.com/premium-photo/boxes-trolley-laptop_36051-524.jpg?ga=GA1.1.1052836384.1750646072&semt=ais_hybrid&w=740"
              alt="About Us"
              className="w-full rounded"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-[var(--primary)] rounded p-6 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] text-center mb-12">
            لماذا تختار متجر محلاتنا؟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-[var(--background)] rounded transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-[var(--primary)] mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary rounded p-6 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">ابدأ تجربة التسوق معنا اليوم</h3>
          <p className="text-lg mb-6 opacity-90">
            انضم إلى آلاف العملاء الراضين واستمتع بأفضل تجربة تسوق إلكتروني في المملكة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="sm">
              تسوق الآن
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-[var(--primary)]"
            >
              تواصل معنا
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
