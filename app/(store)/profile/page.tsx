"use client"

import { useState } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  CreditCard,
  Package,
  Heart,
  Settings,
  Edit,
  Save,
  X,
} from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Checkbox from "@/components/ui/checkbox"
import Breadcrumb from "@/components/ui/breadcrumb"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed@example.com",
    phone: "0501234567",
    birthDate: "1990-01-01",
    gender: "male",
  })

  const [addressData, setAddressData] = useState({
    street: "شارع الملك فهد",
    city: "الرياض",
    district: "حي العليا",
    postalCode: "12345",
    country: "المملكة العربية السعودية",
  })

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    sms: true,
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save logic here
  }

  const tabs = [
    { id: "profile", label: "المعلومات الشخصية", icon: User },
    { id: "addresses", label: "العناوين", icon: MapPin },
    { id: "security", label: "الأمان", icon: Lock },
    { id: "notifications", label: "الإشعارات", icon: Bell },
    { id: "payment", label: "طرق الدفع", icon: CreditCard },
  ]

  const stats = [
    { label: "إجمالي الطلبات", value: "12", icon: Package },
    { label: "المفضلة", value: "8", icon: Heart },
    { label: "النقاط", value: "2,450", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الملف الشخصي" }]} className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[var(--primary)] mb-1">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{profileData.email}</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <stat.icon className="w-5 h-5 text-[var(--primary)] mx-auto mb-1" />
                      <p className="text-lg font-bold text-[var(--primary)]">{stat.value}</p>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-lg p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${
                      activeTab === tab.id ? "bg-[var(--primary)] text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-[var(--primary)]">المعلومات الشخصية</h1>
                    <Button
                      variant={isEditing ? "secondary" : "primary"}
                      size="sm"
                      icon={isEditing ? X : Edit}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "إلغاء" : "تعديل"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم العائلة</label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        icon={<Mail className="w-5 h-5" />}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                      <Input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        icon={<Phone className="w-5 h-5" />}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الميلاد</label>
                      <Input
                        type="date"
                        value={profileData.birthDate}
                        onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الجنس</label>
                      <select
                        value={profileData.gender}
                        onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:bg-gray-50"
                      >
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                      </select>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 mt-6">
                      <Button variant="primary" size="sm" icon={Save} onClick={handleSaveProfile}>
                        حفظ التغييرات
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
                        إلغاء
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-[var(--primary)]">العناوين</h1>
                    <Button variant="primary" size="sm">
                      إضافة عنوان جديد
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-[var(--primary)]">العنوان الرئيسي</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">افتراضي</span>
                      </div>
                      <div className="text-gray-600 space-y-1">
                        <p>{addressData.street}</p>
                        <p>
                          {addressData.district}، {addressData.city}
                        </p>
                        <p>
                          {addressData.postalCode}، {addressData.country}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="secondary" size="sm">
                          تعديل
                        </Button>
                        <Button variant="secondary" size="sm">
                          حذف
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h1 className="text-2xl font-bold text-[var(--primary)] mb-6">الأمان</h1>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-[var(--primary)] mb-2">تغيير كلمة المرور</h3>
                      <p className="text-gray-600 text-sm mb-4">قم بتحديث كلمة المرور للحفاظ على أمان حسابك</p>
                      <Button variant="primary" size="sm">
                        تغيير كلمة المرور
                      </Button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-[var(--primary)] mb-2">المصادقة الثنائية</h3>
                      <p className="text-gray-600 text-sm mb-4">أضف طبقة حماية إضافية لحسابك</p>
                      <Button variant="secondary" size="sm">
                        تفعيل المصادقة الثنائية
                      </Button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-[var(--primary)] mb-2">الجلسات النشطة</h3>
                      <p className="text-gray-600 text-sm mb-4">إدارة الأجهزة المتصلة بحسابك</p>
                      <Button variant="secondary" size="sm">
                        عرض الجلسات
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h1 className="text-2xl font-bold text-[var(--primary)] mb-6">الإشعارات</h1>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-[var(--primary)] mb-4">إشعارات البريد الإلكتروني</h3>
                      <div className="space-y-3">
                        <Checkbox
                          checked={notifications.orderUpdates}
                          onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })}
                          label="تحديثات الطلبات"
                        />
                        <Checkbox
                          checked={notifications.promotions}
                          onChange={(e) => setNotifications({ ...notifications, promotions: e.target.checked })}
                          label="العروض والتخفيضات"
                        />
                        <Checkbox
                          checked={notifications.newsletter}
                          onChange={(e) => setNotifications({ ...notifications, newsletter: e.target.checked })}
                          label="النشرة البريدية"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-[var(--primary)] mb-4">إشعارات الرسائل النصية</h3>
                      <div className="space-y-3">
                        <Checkbox
                          checked={notifications.sms}
                          onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                          label="تحديثات الطلبات عبر الرسائل النصية"
                        />
                      </div>
                    </div>

                    <Button variant="primary" size="sm">
                      حفظ الإعدادات
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Tab */}
              {activeTab === "payment" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-[var(--primary)]">طرق الدفع</h1>
                    <Button variant="primary" size="sm">
                      إضافة بطاقة جديدة
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-6 h-6 text-gray-400" />
                          <div>
                            <h3 className="font-medium text-[var(--primary)]">بطاقة ائتمان</h3>
                            <p className="text-gray-600 text-sm">**** **** **** 1234</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">افتراضية</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          تعديل
                        </Button>
                        <Button variant="secondary" size="sm">
                          حذف
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
