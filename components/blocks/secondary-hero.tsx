import Button from "../ui/button";

export default function SecondaryHero() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">أفضل التخفيضات 2022</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              محلات علي ابو مسعود يوفر لك كل ما تحتاجه من كمبيوترات أو أجهزة ذكية بأفضل التخفيضات على المنتجات. 
              أفضل التخفيضات على المنتجات، تسوق الآن واستمتع بكل التخفيضات على المنتجات
            </p>
            <Button variant="accent" size="sm">
              اكتشف المزيد
            </Button>
          </div>

          {/* Products Image */}
          <div className="relative order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop"
                  alt="Apple Watch"
                  className="w-full rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=300&fit=crop"
                  alt="iPhone"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
                  alt="MacBook"
                  className="w-full rounded-lg"
                />
                <img
                  src="https://img.freepik.com/premium-psd/tablet-pro-psd-mockup_165789-454.jpg?semt=ais_hybrid&w=740"
                  alt="iPad"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
