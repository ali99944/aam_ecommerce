"use client"

import Button from "../ui/button"
import Carousel from "../ui/carousel"


export default function PromotionalOffers() {


  const promoCards = [
    {
      id: 1,
      title: "معالجة أسبوع واحد فقط",
      subtitle: "أسبوع 6 مايو - EXPIRED 6 مايو - EXPIRED",
      description: "4.5 ميجابكسل من الوضوح للتفاصيل الدقيقة",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      bgColor: "from-pink-200 to-pink-300",
    },
    {
      id: 2,
      title: "معالجة أسبوع واحد فقط",
      subtitle: "أسبوع 6 مايو - EXPIRED 6 مايو - EXPIRED",
      description: "4.5 ميجابكسل من الوضوح للتفاصيل الدقيقة",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      bgColor: "from-yellow-200 to-orange-200",
    },
    {
      id: 3,
      title: "معالجة أسبوع واحد فقط",
      subtitle: "أسبوع 6 مايو - EXPIRED 6 مايو - EXPIRED",
      description: "4.5 ميجابكسل من الوضوح للتفاصيل الدقيقة",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      bgColor: "from-green-200 to-teal-200",
    },
  ]

  return (
    <>
      <section className=" bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Promotional Cards */}
          <Carousel
            slidesPerView={{
                small_mobile: 2,
                mobile: 2,
                tablet: 3,
                desktop: 3,
              }}
            spaceBetween={24}
            loop={false}
            title="عروض ترويجية"
          >
            {promoCards.map((card) => (
              <div
                key={card.id}
                className={`relative bg-gradient-to-br ${card.bgColor} rounded-2xl p-6 overflow-hidden`}
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{card.subtitle}</p>
                  <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                  <Button variant="primary" size="sm">
                    تسوق الآن
                  </Button>
                </div>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <img src={card.image || "/placeholder.svg"} alt="Product" className="w-20 h-20 object-contain" />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

    </>
  )
}
