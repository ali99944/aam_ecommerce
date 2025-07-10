import Button from "../ui/button";

export default function PromotionalGrid() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Row - 3 Small Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* AirPods Banner */}
          <div className="relative rounded overflow-hidden h-48">
            <img
              src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=400&fit=crop"
              alt="AirPods"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/60">
              <div className="relative h-full p-4 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-white mb-2">سماعات رقمية</p>
                  <h3 className="text-xl font-bold text-white mb-4">أفضل صوت نقي</h3>
                </div>
                <Button className="w-fit" variant="primary" size="sm">
                  تسوق الآن
                </Button>
              </div>
            </div>
          </div>

          {/* Gaming Controller Banner */}
          <div className="relative rounded overflow-hidden h-48">
            <img
              src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=400&fit=crop"
              alt="Gaming Controller"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/60">
              <div className="relative h-full p-4 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-blue-100 mb-2">سماعات رقمية</p>
                  <h3 className="text-xl font-bold text-white mb-4">أفضل صوت نقي</h3>
                </div>
                <Button className="w-fit" variant="accent" size="sm">
                  تسوق الآن
                </Button>
              </div>
            </div>
          </div>

          {/* Headphones Banner */}
          <div className="relative rounded overflow-hidden h-48">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop"
              alt="Headphones"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/60">
              <div className="relative h-full p-4 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-white mb-2">سماعات رقمية</p>
                  <h3 className="text-xl font-bold text-white mb-4">أفضل صوت نقي</h3>
                </div>
                <Button className="w-fit" variant="primary" size="sm">
                  تسوق الآن
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Large Camera Banner */}
        <div className="relative rounded overflow-hidden h-64">
          <img
            src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=400&fit=crop"
            alt="Camera"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60">
            <div className="relative h-full p-8 flex flex-col items-center justify-center">
              <div>
                <p className="text-sm text-white mb-2">سماعات رقمية</p>
                <h3 className="text-xl font-bold text-white mb-4">أفضل صوت نقي</h3>
              </div>
              <Button className="w-fit" variant="accent" size="sm">
                تسوق الآن
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
