"use client"

import { useState, useEffect } from "react"
import { Package, Search, ChevronLeft, Clock, CheckCircle, XCircle } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select
} from "@/components/ui/select"
import {
  Pagination,
} from "@/components/ui/pagination"
import {
  Breadcrumb,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-12345",
    date: "2023-10-15",
    total: 235.50,
    status: "delivered",
    items: 3,
    paymentMethod: "credit_card",
  },
  {
    id: "ORD-12346",
    date: "2023-10-10",
    total: 120.75,
    status: "processing",
    items: 2,
    paymentMethod: "cash_on_delivery",
  },
  {
    id: "ORD-12347",
    date: "2023-09-28",
    total: 450.00,
    status: "shipped",
    items: 5,
    paymentMethod: "bank_transfer",
  },
  {
    id: "ORD-12348",
    date: "2023-09-15",
    total: 85.25,
    status: "cancelled",
    items: 1,
    paymentMethod: "credit_card",
  },
  {
    id: "ORD-12349",
    date: "2023-09-05",
    total: 320.00,
    status: "delivered",
    items: 4,
    paymentMethod: "cash_on_delivery",
  },
  {
    id: "ORD-12350",
    date: "2023-08-22",
    total: 175.50,
    status: "delivered",
    items: 2,
    paymentMethod: "credit_card",
  },
]

// Status options
const statusOptions = [
  { value: "", label: "جميع الحالات" },
  { value: "processing", label: "قيد المعالجة" },
  { value: "shipped", label: "تم الشحن" },
  { value: "delivered", label: "تم التوصيل" },
  { value: "cancelled", label: "ملغي" },
]

// Date range options
const dateRangeOptions = [
  { value: "", label: "جميع الفترات" },
  { value: "last_month", label: "الشهر الماضي" },
  { value: "last_3_months", label: "آخر 3 أشهر" },
  { value: "last_6_months", label: "آخر 6 أشهر" },
  { value: "last_year", label: "السنة الماضية" },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [filteredOrders, setFilteredOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateRangeFilter, setDateRangeFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders)
      setFilteredOrders(mockOrders)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // Apply filters
    let result = orders

    if (searchTerm) {
      result = result.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter) {
      result = result.filter(order => order.status === statusFilter)
    }

    if (dateRangeFilter) {
      const now = new Date()
      const startDate = new Date()
      
      switch (dateRangeFilter) {
        case 'last_month':
          startDate.setMonth(now.getMonth() - 1)
          break
        case 'last_3_months':
          startDate.setMonth(now.getMonth() - 3)
          break
        case 'last_6_months':
          startDate.setMonth(now.getMonth() - 6)
          break
        case 'last_year':
          startDate.setFullYear(now.getFullYear() - 1)
          break
      }
      
      result = result.filter(order => new Date(order.date) >= startDate)
    }

    setFilteredOrders(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [orders, searchTerm, statusFilter, dateRangeFilter])

  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  // Status badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> قيد المعالجة</Badge>
      case 'shipped':
        return <Badge variant="primary" className="flex items-center gap-1"><Package className="h-3 w-3" /> تم الشحن</Badge>
      case 'delivered':
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> تم التوصيل</Badge>
      case 'cancelled':
        return <Badge variant="danger" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> ملغي</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('ar-EG', options)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumb 
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "حسابي", href: "/account" },
              { label: "طلباتي" }
            ]} 
            className="mb-6" 
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">طلباتي</h1>
              <p className="text-gray-600">عرض وتتبع جميع طلباتك السابقة</p>
            </div>
            <Button icon={ChevronLeft} variant="secondary" className="flex items-center gap-2">
              متابعة التسوق
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-sm border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="البحث برقم الطلب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={Search}
                  iconPosition="right"
                />
              </div>
              <div>
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="فلترة حسب الحالة"
                />
              </div>
              <div>
                <Select
                  options={dateRangeOptions}
                  value={dateRangeFilter}
                  onChange={setDateRangeFilter}
                  placeholder="فلترة حسب التاريخ"
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-sm border border-gray-200 p-8 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-[#00998F] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>جاري تحميل الطلبات...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white rounded-sm border border-gray-200 p-8 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">لا توجد طلبات</h2>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter || dateRangeFilter
                  ? "لا توجد طلبات تطابق معايير البحث الخاصة بك"
                  : "لم تقم بإجراء أي طلبات بعد"}
              </p>
              <Button>تصفح المنتجات</Button>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-sm border border-gray-200 overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-right">
                      <tr>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">رقم الطلب</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">التاريخ</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">المجموع</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">الحالة</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">العناصر</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{formatDate(order.date)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{order.total.toFixed(2)} دينار</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderStatusBadge(order.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{order.items} منتجات</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              عرض التفاصيل
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                className="my-6"
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
