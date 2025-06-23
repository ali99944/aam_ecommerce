"use client"

import { useState } from "react"
import { Plus, Search, Filter, MessageCircle, Clock, CheckCircle, AlertCircle, User, Calendar } from 'lucide-react'
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Select from "@/components/ui/select"
import Badge from "@/components/ui/badge"
import Breadcrumb from "@/components/ui/breadcrumb"
import SupportTicketDialog from "@/components/ui/dialogs/support-ticket-dialog"

export default function SupportPage() {
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  const tickets = [
    {
      id: "T-001",
      subject: "مشكلة في عملية الدفع",
      category: "payment",
      status: "open",
      priority: "high",
      createdAt: "2024-01-15",
      lastUpdate: "2024-01-16",
      messages: 3
    },
    {
      id: "T-002", 
      subject: "استفسار عن حالة الطلب #12345",
      category: "order",
      status: "in_progress",
      priority: "medium",
      createdAt: "2024-01-14",
      lastUpdate: "2024-01-15",
      messages: 5
    },
    {
      id: "T-003",
      subject: "طلب إرجاع منتج",
      category: "return",
      status: "resolved",
      priority: "low",
      createdAt: "2024-01-10",
      lastUpdate: "2024-01-12",
      messages: 8
    }
  ]

  const statusOptions = [
    { value: "", label: "جميع الحالات" },
    { value: "open", label: "مفتوحة" },
    { value: "in_progress", label: "قيد المعالجة" },
    { value: "resolved", label: "محلولة" },
    { value: "closed", label: "مغلقة" }
  ]

  const categoryOptions = [
    { value: "", label: "جميع الفئات" },
    { value: "technical", label: "مشكلة تقنية" },
    { value: "order", label: "استفسار عن الطلب" },
    { value: "payment", label: "مشكلة في الدفع" },
    { value: "shipping", label: "مشكلة في الشحن" },
    { value: "return", label: "طلب إرجاع" }
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = {
      open: { label: "مفتوحة", variant: "primary" as const },
      in_progress: { label: "قيد المعالجة", variant: "warning" as const },
      resolved: { label: "محلولة", variant: "success" as const },
      closed: { label: "مغلقة", variant: "secondary" as const }
    }
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: "secondary" as const }
  }

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      low: { label: "منخفضة", variant: "secondary" as const },
      medium: { label: "متوسطة", variant: "warning" as const },
      high: { label: "عالية", variant: "danger" as const },
      urgent: { label: "عاجلة", variant: "danger" as const }
    }
    return priorityMap[priority as keyof typeof priorityMap] || { label: priority, variant: "secondary" as const }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <AlertCircle className="w-4 h-4" />
      case "in_progress": return <Clock className="w-4 h-4" />
      case "resolved": return <CheckCircle className="w-4 h-4" />
      default: return <MessageCircle className="w-4 h-4" />
    }
  }

  const breadcrumbItems = [
    { label: "الرئيسية", href: "/" },
    { label: "الدعم الفني", href: "/support" }
  ]

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">الدعم الفني</h1>
            <p className="text-gray-600">إدارة تذاكر الدعم والاستفسارات</p>
          </div>
          <Button 
            variant="primary" 
            icon={Plus}
            onClick={() => setIsTicketDialogOpen(true)}
          >
            تذكرة جديدة
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--primary)]">12</p>
                <p className="text-sm text-gray-600">إجمالي التذاكر</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--primary)]">5</p>
                <p className="text-sm text-gray-600">قيد المعالجة</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--primary)]">7</p>
                <p className="text-sm text-gray-600">محلولة</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--primary)]">2</p>
                <p className="text-sm text-gray-600">عاجلة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="البحث في التذاكر..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
              />
            </div>
            <div>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
                placeholder="فلترة بالحالة"
              />
            </div>
            <div>
              <Select
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={categoryOptions}
                placeholder="فلترة بالفئة"
              />
            </div>
            <div>
              <Button variant="outline" icon={Filter} className="w-full">
                تطبيق الفلاتر
              </Button>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-[var(--primary)]">تذاكر الدعم</h2>
          </div>

          <div className="divide-y">
            {tickets.map((ticket) => {
              const statusBadge = getStatusBadge(ticket.status)
              const priorityBadge = getPriorityBadge(ticket.priority)
              
              return (
                <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(ticket.status)}
                        <h3 className="font-semibold text-[var(--primary)] hover:text-[var(--accent)] cursor-pointer">
                          {ticket.subject}
                        </h3>
                        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        <Badge variant={priorityBadge.variant}>{priorityBadge.label}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {ticket.id}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {ticket.createdAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {ticket.messages} رسائل
                        </span>
                      </div>

                      <p className="text-sm text-gray-600">
                        آخر تحديث: {ticket.lastUpdate}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        عرض
                      </Button>
                      <Button variant="primary" size="sm">
                        رد
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {tickets.length === 0 && (
            <div className="p-12 text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد تذاكر</h3>
              <p className="text-gray-500 mb-4">لم تقم بإنشاء أي تذاكر دعم بعد</p>
              <Button 
                variant="primary" 
                icon={Plus}
                onClick={() => setIsTicketDialogOpen(true)}
              >
                إنشاء تذكرة جديدة
              </Button>
            </div>
          )}
        </div>
      </div>

      <SupportTicketDialog 
        isOpen={isTicketDialogOpen}
        onClose={() => setIsTicketDialogOpen(false)}
      />
    </div>
  )
}
