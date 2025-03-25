import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, Youtube, Linkedin, MailIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-4">

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* About Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-[#00998F] rounded-sm flex items-center justify-center text-white font-bold text-lg">
                ع
              </div>
              <h3 className="text-xl font-bold text-[#00998F]">محلات علي ابو مسعود</h3>
            </div>
            <p className="text-base mb-6">متجر متخصص في مواد البناء والعدد الكهربائية والمواد الزراعية في الأردن. نقدم منتجات عالية الجودة بأسعار منافسة مع خدمة توصيل سريعة لجميع أنحاء المملكة.</p>
            
            <div className="flex gap-3 mb-6">
              <a href="#" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="bg-[#00998F] text-white p-2 rounded-sm hover:opacity-90 transition-opacity">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#00998F] border-r-3 border-[#00998F] pr-3">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-base hover:text-[#00998F] transition-colors flex items-center">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-base hover:text-[#00998F] transition-colors flex items-center">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-base hover:text-[#00998F] transition-colors flex items-center">
                  العروض
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-base hover:text-[#00998F] transition-colors flex items-center">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base hover:text-[#00998F] transition-colors flex items-center">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#00998F] border-r-3 border-[#00998F] pr-3">الأقسام</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/building"
                  className="text-base hover:text-[#00998F] transition-colors flex items-center"
                >
                  مواد البناء
                </Link>
              </li>
              <li>
                <Link
                  href="/category/electrical"
                  className="text-base hover:text-[#00998F] transition-colors flex items-center"
                >
                  العدد الكهربائية
                </Link>
              </li>
              <li>
                <Link
                  href="/category/agricultural"
                  className="text-base hover:text-[#00998F] transition-colors flex items-center"
                >
                  المواد الزراعية
                </Link>
              </li>
              <li>
                <Link
                  href="/category/plumbing"
                  className="text-base hover:text-[#00998F] transition-colors flex items-center"
                >
                  السباكة
                </Link>
              </li>
              <li>
                <Link
                  href="/category/lighting"
                  className="text-base hover:text-[#00998F] transition-colors flex items-center"
                >
                  الإضاءة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#00998F] border-r-3 border-[#00998F] pr-3">معلومات التواصل</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-base">
                <MapPin className="h-6 w-6 text-[#00998F]" />
                عمان، الأردن - شارع الملك عبدالله الثاني
              </li>
              <li className="flex items-center gap-3 text-base">
                <Phone className="h-6 w-6 text-[#00998F]" />
                <span dir="ltr">+962 79 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-base">
                <Mail className="h-6 w-6 text-[#00998F]" />
                info@abumassoud.com
              </li>
              <li className="flex items-center gap-3 text-base">
                <Clock className="h-6 w-6 text-[#00998F]" />
                السبت - الخميس: 8 صباحاً - 8 مساءً
              </li>
            </ul>
          </div>
        </div>

        {/* Policy Links */}
        <div className="border-t border-gray-200 pt-6 pb-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base mb-4 md:mb-0">© {new Date().getFullYear()} محلات علي ابو مسعود. جميع الحقوق محفوظة.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/privacy-policy" className="text-sm hover:text-[#00998F] transition-colors">سياسة الخصوصية</Link>
            <span className="text-gray-300">|</span>
            <Link href="/return-policy" className="text-sm hover:text-[#00998F] transition-colors">سياسة الإرجاع</Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms" className="text-sm hover:text-[#00998F] transition-colors">الشروط والأحكام</Link>
            <span className="text-gray-300">|</span>
            <Link href="/sitemap" className="text-sm hover:text-[#00998F] transition-colors">خريطة الموقع</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
