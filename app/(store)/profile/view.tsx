/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Package,
  Heart,
  Edit,
  Save,
  X,
  Trash2,
  Eye,
  Calendar,
} from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Checkbox from "@/components/ui/checkbox"
import Breadcrumb from "@/components/ui/breadcrumb"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useNotifications } from "@/src/hooks/use-notification"
import { useGetQuery, useMutationAction } from "@/src/hooks/queries-actions"
import { formatDateTime } from "@/lib/date"
import Link from "next/link"

// Types
interface UserProfile {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  birth_date: string | null
  gender: "male" | "female" | null
  avatar: string | null
  created_at: string
}

// interface Address {
//   id: number
//   name: string
//   phone: string
//   address_line_1: string
//   address_line_2: string | null
//   city: string
//   district: string
//   postal_code: string | null
//   country: string
//   is_default: boolean
// }

interface Order {
  id: number
  order_number: string
  order_status: string
  total: number
  items_count: number
  created_at: string
  delivery_date: string | null
}

interface FavoriteProduct {
  id: number
  product_id: number
  product: {
    id: number
    name: string
    image: string
    sell_price: number
    original_price: number | null
    stock: number
  }
  created_at: string
}


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const { notify } = useNotifications()

  // Profile data
  const {
    data: profile,
    // isLoading: profileLoading,
    refetch: refetchProfile,
  } = useGetQuery<UserProfile>({
    key: ["profile"],
    url: "profile",
  })

  // Addresses data
  // const {
  //   data: addresses,
  //   isLoading: addressesLoading,
  //   refetch: refetchAddresses,
  // } = useGetQuery<Address[]>({
  //   key: ["addresses"],
  //   url: "profile/addresses",
  // })

  // Orders data
  const {
    data: orders,
    isLoading: ordersLoading,
    // refetch: refetchOrders,
  } = useGetQuery<Order[]>({
    key: ["orders"],
    url: "orders",
  })

  console.log(orders);
  

  // Favorites data
  const {
    data: favorites,
    isLoading: favoritesLoading,
    refetch: refetchFavorites,
  } = useGetQuery<FavoriteProduct[]>({
    key: ["favorites"],
    url: "profile/favorites",
  })



  // Local state for editing
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: ""
  })

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    sms: true,
  })

  // Update profile mutation
  const updateProfileMutation = useMutationAction({
    method: "put",
    url: "profile",
    onSuccessCallback: () => {
      notify.success("تم تحديث الملف الشخصي بنجاح")
      setIsEditing(false)
      refetchProfile()
    },
    onErrorCallback: (error: any) => {
      notify.error(error.response?.data?.message || "حدث خطأ أثناء التحديث")
    },
  })

  // Delete address mutation
  // const deleteAddressMutation = useMutationAction({
  //   method: "delete",
  //   url: "profile/addresses",
  //   onSuccessCallback: () => {
  //     notify.success("تم حذف العنوان بنجاح")
  //     // refetchAddresses()
  //   },
  //   onErrorCallback: (error: any) => {
  //     notify.error(error.response?.data?.message || "حدث خطأ أثناء الحذف")
  //   },
  // })

  // Remove from favorites mutation
  const removeFavoriteMutation = useMutationAction({
    method: "delete",
    url: "profile/favorites",
    onSuccessCallback: () => {
      notify.success("تم إزالة المنتج من المفضلة")
      refetchFavorites()
    },
    onErrorCallback: (error: any) => {
      notify.error(error.response?.data?.message || "حدث خطأ أثناء الإزالة")
    },
  })

  // Update profile data when profile loads
  // useEffect(() => {
  //   if (profile) {
  //     setProfileData({
  //       first_name: profile.first_name || "",
  //       last_name: profile.last_name || "",
  //       email: profile.email || "",
  //       phone: profile.phone || "",
  //       birth_date: profile.birth_date || "",
  //       gender: profile.gender || "male",
  //     })
  //   }
  // }, [profile])

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(profileData)
  }

  // const handleDeleteAddress = (addressId: number) => {
  //   if (confirm("هل أنت متأكد من حذف هذا العنوان؟")) {
  //     deleteAddressMutation.mutate({ id: addressId })
  //   }
  // }

  const handleRemoveFavorite = (favoriteId: number) => {
    removeFavoriteMutation.mutate({ id: favoriteId })
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "in-check":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case "in-check":
        return "في انتظار الموافقة"
      case "pending":
        return "قيد الانتظار"
      case "confirmed":
        return "مؤكد"
      case "shipped":
        return "تم الشحن"
      case "delivered":
        return "تم التسليم"
      case "cancelled":
        return "ملغي"
      default:
        return status
    }
  }

  const tabs = [
    { id: "profile", label: "المعلومات الشخصية", icon: User },
    { id: "orders", label: "طلباتي", icon: Package },
    { id: "favorites", label: "المفضلة", icon: Heart },
    { id: "security", label: "الأمان", icon: Lock },
    { id: "notifications", label: "الإشعارات", icon: Bell },
  ]

  const stats = [
    { label: "إجمالي الطلبات", value: orders?.length.toString() || "0" },
    { label: "المفضلة", value: favorites?.length.toString() || "0" },
  ]

  // if (profileLoading) {
  //   return (
  //     <>
  //       <Navbar />
  //       <div className="min-h-screen bg-background flex items-center justify-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //       </div>
  //       <Footer />
  //     </>
  //   )
  // }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الملف الشخصي" }]} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Profile Card */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    {profile?.avatar ? (
                      <img
                        src={profile.avatar || "/placeholder.svg"}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-primary mb-1">
                    {profile?.first_name} {profile?.last_name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">{profile?.email}</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    {stats.map((stat, index) => (
                      <div key={index}>
                        <p className="text-lg font-bold text-primary">{stat.value}</p>
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
                        activeTab === tab.id ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
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
                      <h1 className="text-2xl font-bold text-primary">المعلومات الشخصية</h1>
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
                          value={profileData.first_name}
                          onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">اسم العائلة</label>
                        <Input
                          value={profileData.last_name}
                          onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
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
                   
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 mt-6">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Save}
                          onClick={handleSaveProfile}
                          loading={updateProfileMutation.isPending}
                        >
                          حفظ التغييرات
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
                          إلغاء
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div>
                    <h1 className="text-2xl font-bold text-primary mb-6">طلباتي</h1>
                    {ordersLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      </div>
                    ) : orders && orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="bg-primary/10 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h3 className="font-medium text-primary">طلب #{order.order_number}</h3>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDateTime(new Date(order.created_at))}
                                </p>
                              </div>
                              <span className={`px-3 py-1 text-xs rounded-full ${getOrderStatusColor(order.order_status)}`}>
                                {getOrderStatusText(order.order_status)}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">المجموع:</span>
                                <p className="font-medium">{(+order.total).toFixed(2)} دينار</p>
                              </div>
                              <div>
                                <span className="text-gray-600">عدد المنتجات:</span>
                                <p className="font-medium">{order.items_count}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">تاريخ التسليم:</span>
                                <p className="font-medium">
                                  {order.delivery_date
                                    ? new Date(order.delivery_date).toLocaleDateString("ar-SA")
                                    : "غير محدد"}
                                </p>
                              </div>
                              
                            </div>
                            <div className="mt-4">
                              <Link href={`/orders/${order.id}`}>
                                    <Button variant="primary" size="sm" icon={Eye}>
                                      عرض
                                    </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
                        <p className="text-gray-600 mb-4">لم تقم بأي طلبات حتى الآن</p>
                        <div className="flex items-center justify-center">
                          <Button variant="primary" size="sm">
                            تسوق الآن
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Favorites Tab */}
                {activeTab === "favorites" && (
                  <div>
                    <h1 className="text-2xl font-bold text-primary mb-6">المفضلة</h1>
                    {favoritesLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      </div>
                    ) : favorites && favorites.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favorites.map((favorite) => (
                          <div key={favorite.id} className="border border-gray-200 rounded-lg p-4">
                            <img
                              src={favorite.product.image || "/placeholder.svg"}
                              alt={favorite.product.name}
                              className="w-full h-32 object-cover rounded mb-3"
                            />
                            <h3 className="font-medium text-primary mb-2 line-clamp-2">{favorite.product.name}</h3>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg font-bold text-red-500">
                                {favorite.product.sell_price.toFixed(2)} دينار
                              </span>
                              {favorite.product.original_price && (
                                <span className="text-sm text-gray-400 line-through">
                                  {favorite.product.original_price.toFixed(2)} دينار
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="primary" size="sm" className="flex-1">
                                أضف للسلة
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                icon={Trash2}
                                onClick={() => handleRemoveFavorite(favorite.id)}
                                loading={removeFavoriteMutation.isPending}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد منتجات مفضلة</h3>
                        <p className="text-gray-600 mb-4">لم تقم بإضافة أي منتجات للمفضلة</p>
                        <Button variant="primary" size="sm">
                          تصفح المنتجات
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Addresses Tab */}
                {/* {activeTab === "addresses" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-2xl font-bold text-primary">العناوين</h1>
                      <Button variant="primary" size="sm" icon={Plus}>
                        إضافة عنوان جديد
                      </Button>
                    </div>
                    {addressesLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      </div>
                    ) : addresses && addresses.length > 0 ? (
                      <div className="space-y-4">
                        {addresses.map((address) => (
                          <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-medium text-primary">{address.name}</h3>
                              {address.is_default && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">افتراضي</span>
                              )}
                            </div>
                            <div className="text-gray-600 space-y-1 mb-4">
                              <p>{address.address_line_1}</p>
                              {address.address_line_2 && <p>{address.address_line_2}</p>}
                              <p>
                                {address.district}، {address.city}
                              </p>
                              <p>
                                {address.postal_code}، {address.country}
                              </p>
                              <p className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {address.phone}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="secondary" size="sm" icon={Edit}>
                                تعديل
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                icon={Trash2}
                                onClick={() => handleDeleteAddress(address.id)}
                                loading={deleteAddressMutation.isPending}
                              >
                                حذف
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عناوين</h3>
                        <p className="text-gray-600">لم تقم بإضافة أي عناوين حتى الآن</p>
                      </div>
                    )}
                  </div>
                )} */}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <div>
                    <h1 className="text-2xl font-bold text-primary mb-6">الأمان</h1>
                    <div className="space-y-6">
                      <div className="bg-primary/10 rounded-lg p-4">
                        <h3 className="font-medium text-primary mb-2">تغيير كلمة المرور</h3>
                        <p className="text-gray-600 text-sm mb-4">قم بتحديث كلمة المرور للحفاظ على أمان حسابك</p>
                        <Button variant="primary" size="sm">
                          تغيير كلمة المرور
                        </Button>
                      </div>


                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div>
                    <h1 className="text-2xl font-bold text-primary mb-6">الإشعارات</h1>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-primary mb-4">إشعارات البريد الإلكتروني</h3>
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
                        <h3 className="font-medium text-primary mb-4">إشعارات الرسائل النصية</h3>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
