"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, User, Phone, MapPin, ChevronDown, Globe } from "lucide-react"
import { Dropdown } from "./ui/dropdown"
import { useAppDispatch, useAppSelector } from "@/src/store/hook"
import { logout, selectIsAuthenticated } from "@/src/store/slices/auth-slice"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { RichSearch } from "./custom/rich-search"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(0)

  const languages = [
    { code: "ar", name: "العربية", flag: "🇯🇴" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ]

  const countries = [
    { code: "JO", name: "الأردن", flag: "🇯🇴", currency: "JOD" },
    { code: "SA", name: "السعودية", flag: "🇸🇦", currency: "SAR" },
    { code: "AE", name: "الإمارات", flag: "🇦🇪", currency: "AED" },
    { code: "EG", name: "مصر", flag: "🇪🇬", currency: "EGP" },
  ]

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    router.replace('/login')
  }


  return (
    <header className="bg-white z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#00998F] text-white py-2">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span dir="ltr" className="text-sm">
                +962 79 123 4567
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">عمان، الأردن</span>
            </div>
          </div>
          <div className="text-sm font-medium">توصيل مجاني للطلبات فوق 50 دينار</div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 bg-[#00998F] rounded-sm flex items-center justify-center text-white font-bold text-xl">
                ع
              </div>
              <div className="text-xl font-bold text-[#00998F] hidden sm:block">محلات علي ابو مسعود</div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <div className="relative">
                <RichSearch />
              </div>

              {/* Language Selector */}
              <Dropdown
                trigger={
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#00998F]">
                    <Globe className="h-4 w-4" />
                    <span>العربية</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                }
                align="left"
              >
                <div className="py-1 w-40">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="w-full text-right px-4 py-2 text-sm hover:bg-[#D2EAE8] flex items-center gap-2"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </Dropdown>

              {/* Country/Currency Selector */}
              <Dropdown
                trigger={
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#00998F]">
                    <span>🇯🇴</span>
                    <span>JOD</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                }
                align="left"
              >
                <div className="py-1 w-40">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      className="w-full text-right px-4 py-2 text-sm hover:bg-[#D2EAE8] flex items-center gap-2"
                    >
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                      <span className="text-gray-500 text-xs mr-auto">{country.currency}</span>
                    </button>
                  ))}
                </div>
              </Dropdown>

              {/* Auth Links */}
              {
                isAuthenticated ? (
                  <div className="flex items-center gap-4 border-r border-gray-200 pr-4">
                    <Link href="/profile" className="text-sm text-gray-600 hover:text-[#00998F] transition-colors">
                      حسابي
                    </Link>
                    <Button onClick={handleLogout} variant='danger'>
                      تسجيل الخروج
                    </Button>
                  </div>
                ): (
                  <div className="flex items-center gap-4 border-r border-gray-200 pr-4">
                <Link href="/login" className="text-sm text-gray-600 hover:text-[#00998F] transition-colors">
                  تسجيل الدخول
                </Link>
                <Link href="/register" className="text-sm text-gray-600 hover:text-[#00998F] transition-colors">
                  إنشاء حساب
                </Link>
              </div>
                )
              }

              <Link href="/cart" className="p-2 relative text-[#393e41] hover:text-[#00998F] transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#00998F] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            <button className="md:hidden text-[#00998F]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block py-2 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <ul className="flex gap-8 justify-center">
            <li>
              <Link href="/" className="text-sm hover:text-[#00998F] font-medium relative group">
                الرئيسية
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00998F] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-sm hover:text-[#00998F] font-medium relative group">
                الأقسام
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00998F] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-sm hover:text-[#00998F] font-medium relative group">
                المنتجات
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00998F] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm hover:text-[#00998F] font-medium relative group">
                من نحن
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00998F] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="text-sm hover:text-[#00998F] font-medium relative group">
                اتصل بنا
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00998F] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden overflow-y-auto">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4 border-b border-gray-100">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative h-10 w-10 bg-[#00998F] rounded-sm flex items-center justify-center text-white font-bold text-xl">
                  ع
                </div>
                <div className="text-xl font-bold text-[#00998F]">محلات علي ابو مسعود</div>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="text-[#00998F]">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="relative my-4">
              <RichSearch />
            </div>

            {/* Auth Links Mobile */}
            <div className="flex justify-between my-4 border-b border-gray-100 pb-4">
              <Link href="/register" className="bg-[#00998F] text-white px-4 py-2 rounded-sm text-sm">
                إنشاء حساب
              </Link>
              <Link href="/login" className="border border-[#00998F] text-[#00998F] px-4 py-2 rounded-sm text-sm">
                تسجيل الدخول
              </Link>
            </div>

            {/* Language & Country Selectors Mobile */}
            <div className="flex justify-between my-4 border-b border-gray-100 pb-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">اللغة</span>
                <select className="border border-gray-200 rounded-sm py-1 px-2 text-sm">
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">البلد</span>
                <select className="border border-gray-200 rounded-sm py-1 px-2 text-sm">
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name} ({country.currency})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <nav className="py-4">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    href="/"
                    className="block py-2 hover:text-[#00998F] font-medium text-base border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="block py-2 hover:text-[#00998F] font-medium text-base border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    الأقسام
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="block py-2 hover:text-[#00998F] font-medium text-base border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    المنتجات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/offers"
                    className="block py-2 hover:text-[#00998F] font-medium text-base border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    العروض
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block py-2 hover:text-[#00998F] font-medium text-base border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="block py-2 hover:text-[#00998F] font-medium text-base border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100">
              <Link
                href="/account"
                className="flex items-center gap-2 py-2 hover:text-[#00998F] font-medium text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>حسابي</span>
              </Link>

              <Link
                href="/cart"
                className="flex items-center gap-2 py-2 hover:text-[#00998F] font-medium text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>سلة التسوق ({cartCount})</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

