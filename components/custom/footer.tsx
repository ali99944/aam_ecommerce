export default function Footer() {
  return (
    <footer className="bg-white/60">
      {/* Main Footer Content */}
      <div className="py-12 bg-white/60">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Section */}
            <div className="lg:col-span-1">
              <h4 className="font-bold text-primary text-lg mb-2 border-b-2 border-b-gray-400 w-fit">عن متجرنا</h4>
              <p className="text-gray-600 text-md leading-relaxed">
                متجر محلاتنا من أفضل المتاجر الإلكترونية التي تقدم منتجات الرقمية بأفضل الأسعار وأجود المنتجات العالمية
                والمنتجات الرقمية بأفضل الأسعار وأجود المنتجات والخدمات
              </p>
            </div>

            {/* My Account */}
            <div>
              <h4 className="font-bold text-primary text-lg mb-2 border-b-2 border-b-gray-400 w-fit">حسابي</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors text-md">
                    حسابي
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors text-md">
                    سلة المشتريات
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors text-md">
                    المفضلة
                  </a>
                </li>
              </ul>
            </div>

            {/* Important Links */}
            <div>
              <h4 className="font-bold text-primary text-lg mb-2 border-b-2 border-b-gray-400 w-fit">روابط مهمة</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors text-md">
                    من نحن
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors text-md">
                    سياسة الخصوصية
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors text-md">
                    الشروط والأحكام
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors text-md">
                    الدعم الفني
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-primary text-lg mb-2 border-b-2 border-b-gray-400 w-fit">تواصل معنا</h4>
              <ul className="space-y-2">
                <li className="text-gray-600 text-md">0096123456789</li>
                <li className="text-gray-600 text-md">0096123456789</li>
                <li className="text-gray-600 text-md">https://salla.sa</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      {/* Bottom Section - Keep Same */}
      <div className="bg-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="bg-white/90 text-primary px-2 py-1 rounded text-xs font-bold">VISA</div>
                <div className="bg-white/90 text-primary px-2 py-1 rounded text-xs font-bold">PayPal</div>
                <div className="bg-white/90 text-primary px-2 py-1 rounded text-xs font-bold">MC</div>
                <div className="bg-white/90 text-primary px-2 py-1 rounded text-xs font-bold">VISA</div>
                <div className="bg-white/90 text-primary px-2 py-1 rounded text-xs font-bold">MADA</div>
              </div>
              <span className="text-sm">الرقم الضريبي - 546987552</span>
            </div>
            <div className="flex gap-4 text-sm text-white/90">
              <a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a>
              <span>|</span>
              <a href="#" className="hover:text-primary transition-colors">الشروط والأحكام</a>
              <span>|</span>
              <a href="#" className="hover:text-primary transition-colors">سياسة الإرجاع</a>
            </div>
            <div className="text-sm">
              <span>الحقوق محفوظة لمتجر محلاتنا © 2023</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
