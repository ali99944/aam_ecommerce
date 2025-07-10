"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  ShoppingCart,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  Package,
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
import Dialog from "./ui/dialog"
import StoreRatingDialog from "./ui/dialogs/store-rating-dialog"
import { useRouter } from "next/navigation"
import { useCart } from "@/src/redux/hooks-operations/use-cart"
import { useContactSettings } from "@/src/hooks/use-settings"
import { useGetQuery } from "@/src/hooks/queries-actions"
import { PolicyCategory } from "@/src/types/policy"
import { useAppDispatch, useAppSelector } from "@/src/redux/hook"
import { logout } from "@/src/redux/reducers/auth_reducer"
import { Order } from "@/src/types"
import { formatShortDate } from "@/lib/date"


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const { items } = useCart()
  const { contact } = useContactSettings()
  const { isAuthenticated, customer } = useAppSelector(state => state.auth)
  

    const { data: policies_categories } = useGetQuery<PolicyCategory[]>({
      url: 'policies',
      key: ['policies']
    })

    const { data: orders } = useGetQuery<Order[]>({
      url: 'orders',
      key: ['orders'],
    })


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSearch(e as any)
    }
  }

  useEffect(() => {
    return () => {
      if (megaMenuTimeoutRef.current) {
        clearTimeout(megaMenuTimeoutRef.current)
      }
    }
  }, [])

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="bg-gray-100 py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a
              href="tel:+966567654172"
              className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+966567654172</span>
            </a>
            <a
              href={`mailto:${contact?.support_email}`}
              className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{contact?.support_email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {
              !isAuthenticated && (
                <>
                  <a href="/login" className="hover:text-primary cursor-pointer transition-colors">
              تسجيل دخول
            </a>
            <span>|</span>
                </>
              )
            }

            <Dropdown
              trigger={
                <div className="flex items-center gap-1 hover:text-primary cursor-pointer transition-colors">
                  <span>سياسات الموقع</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              }
              className="w-40 "
            >
{
              policies_categories?.map(cat => {
                return (
                  <Link
                    key={cat.key}
                    href={`/policies/${cat.key}`}
                  >
                    <div  className="p-2 hover:bg-gray-100 cursor-pointer">
                      <a href="/refund-policy" className="hover:text-primary cursor-pointer transition-colors">
                        {cat.name}
                      </a>
                    </div>
                  </Link>
                )
              })
            }
            </Dropdown>
            {/* <span>|</span> */}
            {/* <a href="/support-center" className="hover:text-primary cursor-pointer transition-colors">
              المساعدة
            </a> */}
            {/* <span>|</span>
            <Dropdown
              trigger={
                <div className="flex items-center gap-1 hover:text-primary cursor-pointer transition-colors">
                  <span>العربية - دينار</span>
                  <div className="w-6 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">🇸🇦</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </div>
              }
              className="w-40"
            >
              <div className="p-2">
                {(cities ?? []).map((city, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <span className="text-lg">{city.name.slice(0,2)}</span>
                    <div>
                      <div className="font-medium">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.currency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Dropdown> */}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-b-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/image/logo.png"
              alt="متجر سلة"
              className="w-12 h-14 rounded-lg"
            />
            <div className="mr-3 hidden sm:block">
              <div className="font-bold text-xl text-primary">علي ابو مسعود</div>
              <div className="text-xs text-gray-500">للتسوق الإلكتروني</div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <form onSubmit={handleSearch}>
              <Input
                type="text"
                placeholder="ابحث عن المنتجات..."
                size="sm"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
                icon={
                  <button type="submit" className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                }
                iconPosition="left"
                className="w-full text-right focus:ring-primary focus:border-primary"
              />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Avatar
                  src={'/image/avatar.png'}
                  alt={customer?.name}
                  size="md"
                  onClick={() => setShowUserMenu(true)}
                  className="cursor-pointer"
                />
                <div className="hidden md:block">
                  <div className="font-medium">{customer?.name}</div>
                  <div className="text-gray-500 text-xs">
                    <span className="text-red-600 text-sm hover:text-red-700 cursor-pointer" onClick={handleLogout}>
                      تسجيل الخروج
                    </span>
                  </div>
                </div>
              </div>
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
            <Link href="/cart" className="relative cursor-pointer">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            </Link>
            <div className="text-sm hidden lg:block">
              <div>سلة المشتريات</div>
              <div className="text-gray-500">{items.reduce((i, el) => el.product.sell_price * el.quantity, 0).toFixed(2)} دينار</div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="ابحث عن المنتجات..."
              size="sm"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
              icon={
                <button type="submit" className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              }
              iconPosition="left"
              className="w-full text-right focus:ring-primary focus:border-primary"
            />
          </form>
        </div>
      </div>


      {/* User Profile Dialog */}
      <Dialog isOpen={showUserMenu} onClose={() => setShowUserMenu(false)} size="lg">
        <div className="p-0">
          {/* Header Banner */}
          <div className="relative bg-gradient-to-br from-primary to-primary/90 p-4 text-white overflow-hidden rounded-xl">
  

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 mb-4">
                <Avatar
                  src="/image/avatar.png"
                  alt={customer?.name ?? 'customer logo'}
                  size="lg"
                />
                <div>
                  <h3 className="font-bold text-xl mb-1">{customer?.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-white/80 text-sm">عضو منذ {formatShortDate(customer?.created_at)}</p>
                    <span>-</span>
                  <span className="text-sm text-white/80">{orders?.length ?? 0} طلب</span>
                  </div>

                </div>

                
              </div>
              <Button
              onClick={() => {
                handleLogout()
                setShowUserMenu(false)
              }}
              icon={LogOut}
              variant='danger'
            >
              <span>تسجيل خروج</span>
            </Button>
              </div>

            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Primary Actions - Large Cards */}
              <Link
                href="/orders"
                className="col-span-2 bg-primary/10 p-4 rounded-xl  transition-all duration-200 group"
                onClick={() => setShowUserMenu(false)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center  transition-transform">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">طلباتي</h3>
                    <p className="text-sm text-gray-600">تتبع وإدارة طلباتك</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">{orders?.length ?? 0}</div>
                </div>
              </Link>

            </div>

            {/* Secondary Actions - Compact Grid */}
            <div className="grid grid-cols-3 gap-3">
              <Link
                href="/favorites"
                className="bg-gray-100 p-3 rounded-lg hover:bg-gray-100 transition-colors text-center group"
                onClick={() => setShowUserMenu(false)}
              >
                <Heart className="w-6 h-6 text-gray-600 mx-auto mb-2 group-hover:text-red-500 transition-colors" />
                <span className="text-xs font-medium text-gray-700">المفضلة</span>
              </Link>

              <button
                onClick={() => {
                  setShowUserMenu(false)
                  setShowRatingDialog(true)
                }}
                className="bg-gray-100 p-3 rounded-lg hover:bg-gray-100 transition-colors text-center group cursor-pointer"
              >
                <Star className="w-6 h-6 text-primary mx-auto mb-2 group-hover:text-primary/90 transition-colors" />
                <span className="text-xs font-medium text-gray-700">تقييم المتجر</span>
              </button>

              <Link
                href="/profile"
                className="bg-gray-100 p-3 rounded-lg hover:bg-gray-100 transition-colors text-center group"
                onClick={() => setShowUserMenu(false)}
              >
                <Settings className="w-6 h-6 text-gray-600 mx-auto mb-2 group-hover:text-primary transition-colors" />
                <span className="text-xs font-medium text-gray-700">حسابي</span>
              </Link>
            </div>


          
          </div>
        </div>
      </Dialog>

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
