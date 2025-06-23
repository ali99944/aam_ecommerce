"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  ShoppingCart,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  Bell,
  Package,
  CreditCard,
  Star,
  Heart,
  LogOut,
  Settings,
} from "lucide-react"
import Input from "./ui/input"
import Dropdown from "./ui/dropdown"
import Button from "./ui/button"
import Link from "next/link"
import Avatar from "./ui/avatar"
import BottomSheet from "./ui/bottom-sheet"
import StoreRatingDialog from "./ui/dialogs/store-rating-dialog"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state

  const categories = [
    {
      name: "كل المنتجات",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
      subcategories: ["جميع الفئات", "الأكثر مبيعاً", "العروض الخاصة", "منتجات جديدة", "تخفيضات"],
      featured: [
        {
          name: "لابتوب ديل",
          price: "2,500 دينار",
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop",
        },
        {
          name: "آيفون 14",
          price: "3,200 دينار",
          image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      name: "لابتوبات",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
      subcategories: ["لابتوب جيمنج", "لابتوب أعمال", "لابتوب طلاب", "ماك بوك", "لابتوب رقيق"],
      featured: [
        {
          name: "ماك بوك برو",
          price: "8,500 دينار",
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
        },
        {
          name: "لابتوب HP",
          price: "3,200 دينار",
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      name: "سماعات",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
      subcategories: ["سماعات لاسلكية", "سماعات سلكية", "سماعات جيمنج", "إيربودز", "سماعات استوديو"],
      featured: [
        {
          name: "إيربودز برو",
          price: "850 دينار",
          image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop",
        },
        {
          name: "سماعات سوني",
          price: "1,200 دينار",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      name: "كاميرات رقمية",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop",
      subcategories: ["كاميرات احترافية", "كاميرات فورية", "عدسات", "حوامل", "إكسسوارات"],
      featured: [
        {
          name: "كانون EOS",
          price: "4,500 دينار",
          image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop",
        },
        {
          name: "نيكون D850",
          price: "6,200 دينار",
          image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      name: "ساعات رقمية",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
      subcategories: ["ساعات ذكية", "ساعات رياضية", "ساعات كلاسيكية", "أبل واتش", "سامسونغ جالاكسي"],
      featured: [
        {
          name: "أبل واتش سيريز 8",
          price: "1,800 دينار",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
        },
        {
          name: "سامسونغ جالاكسي واتش",
          price: "1,200 دينار",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      name: "تابلت كمبيوتر",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop",
      subcategories: ["آيباد", "تابلت أندرويد", "تابلت ويندوز", "تابلت رسم", "إكسسوارات"],
      featured: [
        {
          name: "آيباد برو",
          price: "3,500 دينار",
          image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop",
        },
        {
          name: "سامسونغ تاب",
          price: "2,200 دينار",
          image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop",
        },
      ],
    },
  ]

  const cities = [
    { name: "الرياض", currency: "ريال سعودي", flag: "🇸🇦" },
    { name: "جدة", currency: "ريال سعودي", flag: "🇸🇦" },
    { name: "الدمام", currency: "ريال سعودي", flag: "🇸🇦" },
    { name: "مكة", currency: "ريال سعودي", flag: "🇸🇦" },
  ]

  const handleMegaMenuEnter = (categoryName: string) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current)
    }
    setActiveMegaMenu(categoryName)
  }

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 300) // 300ms delay before closing
  }

  useEffect(() => {
    return () => {
      if (megaMenuTimeoutRef.current) {
        clearTimeout(megaMenuTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="bg-gray-100 py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a
              href="tel:+966567654172"
              className="flex items-center gap-2 hover:text-[var(--primary)] cursor-pointer transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+966567654172</span>
            </a>
            <a
              href="mailto:Support@Salla.sa"
              className="flex items-center gap-2 hover:text-[var(--primary)] cursor-pointer transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Support@Salla.sa</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/login" className="hover:text-[var(--primary)] cursor-pointer transition-colors">
              تسجيل دخول
            </a>
            <span>|</span>
            <a href="/return-policy" className="hover:text-[var(--primary)] cursor-pointer transition-colors">
              سياسة الاستبدال أو الاسترداد
            </a>
            <span>|</span>
            <a href="/help" className="hover:text-[var(--primary)] cursor-pointer transition-colors">
              المساعدة
            </a>
            <span>|</span>
            <Dropdown
              trigger={
                <div className="flex items-center gap-1 hover:text-[var(--primary)] cursor-pointer transition-colors">
                  <span>العربية - ريال</span>
                  <div className="w-6 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">🇸🇦</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </div>
              }
              className="w-64 right-0"
            >
              <div className="p-2">
                {cities.map((city, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <span className="text-lg">{city.flag}</span>
                    <div>
                      <div className="font-medium">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.currency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop"
              alt="متجر سلة"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="mr-3 hidden sm:block">
              <div className="font-bold text-xl text-[var(--primary)]">متجر سلة</div>
              <div className="text-xs text-gray-500">للتسوق الإلكتروني</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <Input
              type="text"
              placeholder="ابحث عن المنتجات..."
              size="sm"
              icon={<Search className="w-5 h-5" />}
              iconPosition="left"
              className="w-full text-right focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="محمد عبدالله"
                size="sm"
                onClick={() => setShowUserMenu(true)}
                className="cursor-pointer"
              />
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = "/login")}
                className="hidden md:flex"
              >
                تسجيل دخول
              </Button>
            )}
            <div className="relative cursor-pointer">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </div>
            <div className="text-sm hidden lg:block">
              <div>سلة المشتريات</div>
              <div className="text-gray-500">1,200 دينار</div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <Input
            type="text"
            placeholder="ابحث عن المنتجات..."
            size="sm"
            icon={<Search className="w-5 h-5" />}
            iconPosition="left"
            className="w-full text-right focus:ring-[var(--primary)] focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-gray-800 text-white py-3 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-8 text-sm">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMegaMenuEnter(category.name)}
                onMouseLeave={handleMegaMenuLeave}
              >
                <button className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors duration-200 whitespace-nowrap cursor-pointer py-2">
                  {category.name}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Enhanced Mega Menu */}
                {activeMegaMenu === category.name && (
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded-lg shadow-2xl z-50 w-96 border border-gray-200"
                    onMouseEnter={() => handleMegaMenuEnter(category.name)}
                    onMouseLeave={handleMegaMenuLeave}
                  >
                    <div className="p-4">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-bold text-lg mb-4 text-right text-[var(--primary)]">{category.name}</h3>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Subcategories */}
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-3">الفئات</h4>
                          <div className="space-y-2">
                            {category.subcategories.map((sub, subIndex) => (
                              <a
                                key={subIndex}
                                href={`/category/${sub}`}
                                className="block text-right p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors text-sm text-gray-600 hover:text-[var(--primary)]"
                              >
                                {sub}
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Featured Products */}
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-3">منتجات مميزة</h4>
                          <div className="space-y-3">
                            {category.featured.map((product, productIndex) => (
                              <div
                                key={productIndex}
                                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                              >
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1 text-right">
                                  <div className="font-medium text-sm text-[var(--primary)]">{product.name}</div>
                                  <div className="text-xs text-[var(--accent)] font-semibold">{product.price}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <a
                          href={`/category/${category.name}`}
                          className="text-[var(--accent)] hover:text-[var(--accent)]/80 text-sm font-semibold transition-colors"
                        >
                          عرض جميع منتجات {category.name} ←
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="p-4 space-y-4">
            {categories.map((category, index) => (
              <div key={index}>
                <button className="flex items-center justify-between w-full text-right p-2 hover:bg-gray-50 rounded cursor-pointer">
                  {category.name}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="border-t pt-4 space-y-2">
              <a href="/login" className="block p-2 hover:bg-gray-50 rounded cursor-pointer">
                تسجيل دخول
              </a>
              <a href="/help" className="block p-2 hover:bg-gray-50 rounded cursor-pointer">
                المساعدة
              </a>
            </div>
          </div>
        </div>
      )}

      {/* User Menu Bottom Sheet */}
      <BottomSheet isOpen={showUserMenu} onClose={() => setShowUserMenu(false)}>
        <div className="p-4">
          {/* Header */}
          <div className="bg-primary rounded-xl p-4 mb-6 text-white">
            <div className="flex items-center gap-4">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                alt="محمد عبدالله"
                size="md"
              />
              <div>
                <h3 className="font-bold text-lg">أفضل التخفيضات 2022</h3>
                <p className="text-sm opacity-90">
                  متجر سلة يوفر لك كل ما تحتاجه من منتجات أصلية بأفضل الأسعار مع أفضل التخفيضات. تسوق الآن واستمتع بأفضل
                  التخفيضات
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div>
            <a
              href="/notifications"
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowUserMenu(false)}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="font-medium">الإشعارات</span>
              </div>
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">10</div>
            </a>

            <Link
              href="/orders"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowUserMenu(false)}
            >
              <Package className="w-5 h-5 text-gray-600" />
              <span className="font-medium">الطلبات</span>
            </Link>

            <Link
              href="/orders?status=pending"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowUserMenu(false)}
            >
              <CreditCard className="w-5 h-5 text-gray-600" />
              <span className="font-medium">طلبات بانتظار الدفع</span>
            </Link>

            <button
              onClick={() => {
                setShowUserMenu(false)
                setShowRatingDialog(true)
              }}
              className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors w-full text-right"
            >
              <Star className="w-5 h-5 text-gray-600" />
              <span className="font-medium">تقييم المتجر والمنتجات</span>
            </button>

            <a
              href="/profile"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowUserMenu(false)}
            >
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="font-medium">حسابي</span>
            </a>

            <a
              href="/favorites"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowUserMenu(false)}
            >
              <Heart className="w-5 h-5 text-gray-600" />
              <span className="font-medium">المفضلة</span>
            </a>

            <button
              onClick={() => {
                setIsLoggedIn(false)
                setShowUserMenu(false)
              }}
              className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors w-full text-right text-red-500"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">تسجيل خروج</span>
            </button>
          </div>
        </div>
      </BottomSheet>

      {/* Store Rating Dialog */}
      <StoreRatingDialog
        isOpen={showRatingDialog}
        onClose={() => setShowRatingDialog(false)}
        onSubmit={(rating, review) => {
          console.log("Store rating:", rating, review)
          setShowRatingDialog(false)
        }}
      />
    </div>
  )
}
