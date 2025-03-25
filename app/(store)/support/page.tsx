"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MessageSquare, Search, Filter, Plus, Clock, CheckCircle, XCircle, ChevronLeft, HelpCircle, FileText, Phone, Mail, MessageCircle, Text, Home } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
} from "@/components/ui/select"
import {
  Tabs,
} from "@/components/ui/tabs"
import {
  Breadcrumb,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import {
  Pagination
} from "@/components/ui/pagination"

// Mock tickets data
const mockTickets = [
  {
    id: "TKT-12345",
    subject: "استفسار عن توفر منتج",
    status: "open",
    date: "2023-10-15T09:30:00",
    lastUpdate: "2023-10-15T14:20:00",
    category: "product",
    priority: "medium",
    messages: 3,
  },
  {
    id: "TKT-12346",
    subject: "مشكلة في الدفع الإلكتروني",
    status: "in_progress",
    date: "2023-10-10T11:45:00",
    lastUpdate: "2023-10-14T16:30:00",
    category: "payment",
    priority: "high",
    messages: 5,
  },
  {
    id: "TKT-12347",
    subject: "تأخير في الشحن",
    status: "in_progress",
    date: "2023-09-28T08:15:00",
    lastUpdate: "2023-10-12T10:20:00",
    category: "shipping",
    priority: "high",
    messages: 4,
  },
  {
    id: "TKT-12348",
    subject: "طلب استرجاع منتج",
    status: "closed",
    date: "2023-09-15T13:20:00",
    lastUpdate: "2023-09-20T09:45:00",
    category: "return",
    priority: "medium",
    messages: 6,
  },
  {
    id: "TKT-12349",
    subject: "استفسار عن الضمان",
    status: "closed",
    date: "2023-09-05T10:10:00",
    lastUpdate: "2023-09-08T11:30:00",
    category: "warranty",
    priority: "low",
    messages: 2,
  },
]

// Status options
const statusOptions = [
  { value: "", label: "جميع الحالات" },
  { value: "open", label: "مفتوح" },
  { value: "in_progress", label: "قيد المعالجة" },
  { value: "closed", label: "مغلق" },
]

// Category options
const categoryOptions = [
  { value: "", label: "جميع الفئات" },
  { value: "product", label: "منتجات" },
  { value: "payment", label: "الدفع" },
  { value: "shipping", label: "الشحن" },
  { value: "return", label: "الإرجاع" },
  { value: "warranty", label: "الضمان" },
  { value: "other", label: "أخرى" },
]

// Priority options
const priorityOptions = [
  { value: "", label: "جميع الأولويات" },
  { value: "low", label: "منخفضة" },
  { value: "medium", label: "متوسطة" },
  { value: "high", label: "عالية" },
]

// FAQ items
const faqItems = [
  {
    question: "كيف يمكنني تتبع طلبي؟",
    answer: "يمكنك تتبع طلبك من خلال الدخول إلى حسابك والانتقال إلى صفحة 'طلباتي'. ستجد هناك جميع طلباتك مع إمكانية تتبع حالة كل طلب."
  },
  {
    question: "ما هي سياسة الإرجاع؟",
    answer: "يمكنك إرجاع المنتجات خلال 14 يوماً من تاريخ الاستلام، شرط أن تكون بحالتها الأصلية وغير مستخدمة. لمزيد من التفاصيل، يرجى زيارة صفحة سياسة الإرجاع."
  },
  {
    question: "كم تستغرق عملية الشحن؟",
    answer: "تستغرق عملية الشحن عادةً 3-5 أيام عمل للشحن القياسي، و1-2 يوم عمل للشحن السريع، اعتماداً على موقعك."
  },
  {
    question: "هل تقدمون خدمة التركيب؟",
    answer: "نعم، نقدم خدمة التركيب للعديد من منتجاتنا مثل المكيفات والأجهزة الكهربائية الكبيرة. يرجى الاستفسار عن تفاصيل وتكلفة التركيب عند الشراء."
  },
  {
    question: "كيف يمكنني إلغاء طلبي؟",
    answer: "يمكنك إلغاء طلبك قبل شحنه من خلال الاتصال بخدمة العملاء أو من خلال صفحة 'طلباتي' في حسابك."
  },
  {
    question: "هل تقدمون ضمان على المنتجات؟",
    answer: "نعم، جميع منتجاتنا تأتي مع ضمان المصنّع. تختلف مدة الضمان حسب المنتج والشركة المصنعة."
  },
]

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [filteredTickets, setFilteredTickets] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("tickets")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showNewTicketForm, setShowNewTicketForm] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "medium",
    message: "",
  })
  const ticketsPerPage = 5

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTickets(mockTickets)
      setFilteredTickets(mockTickets)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // Apply filters
    let result = tickets

    if (searchTerm) {
      result = result.filter(ticket => 
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter) {
      result = result.filter(ticket => ticket.status === statusFilter)
    }

    if (categoryFilter) {
      result = result.filter(ticket => ticket.category === categoryFilter)
    }

    if (priorityFilter) {
      result = result.filter(ticket => ticket.priority === priorityFilter)
    }

    setFilteredTickets(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [tickets, searchTerm, statusFilter, categoryFilter, priorityFilter])

  // Get current tickets for pagination
  const indexOfLastTicket = currentPage * ticketsPerPage
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket)
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage)

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('ar-EG', options)
  }

  // Status badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> مفتوح</Badge>
      case 'in_progress':
        return <Badge variant="primary" className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> قيد المعالجة</Badge>
      case 'closed':
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> مغلق</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Priority badge renderer
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">منخفضة</Badge>
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">متوسطة</Badge>
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">عالية</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const handleNewTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate API call to create ticket
    setIsLoading(true)
    
    setTimeout(() => {
      const newTicketObj = {
        id: `TKT-${Math.floor(10000 + Math.random() * 90000)}`,
        subject: newTicket.subject,
        status: "open",
        date: new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        category: newTicket.category,
        priority: newTicket.priority,
        messages: 1,
      }
      
      setTickets([newTicketObj, ...tickets])
      setNewTicket({
        subject: "",
        category: "",
        priority: "medium",
        message: "",
      })
      setShowNewTicketForm(false)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumb 
            items={[
              { label: "الرئيسية", href: "/", icon: Home },
              { label: "الدعم الفني" }
            ]} 
            className="mb-6" 
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">الدعم الفني</h1>
              <p className="text-gray-600">نحن هنا لمساعدتك في أي استفسار أو مشكلة</p>
            </div>
          </div>

          <Tabs
            tabs={[
              { id: "tickets", label: "تذاكر الدعم" },
              { id: "faq", label: "الأسئلة الشائعة" },
              { id: "contact", label: "اتصل بنا" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            className="mb-6"
          >
            {/* Tickets Tab */}
            {activeTab === "tickets" && (
              <div className="space-y-6">
                {showNewTicketForm ? (
                  <div className="bg-white rounded-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowNewTicketForm(false)}
                        className="flex items-center gap-1"
                        icon={ChevronLeft}
                      >
                        العودة
                      </Button>
                      <h2 className="text-xl font-bold">إنشاء تذكرة دعم جديدة</h2>
                    </div>
                    
                    <form onSubmit={handleNewTicketSubmit} className="space-y-4">
                      <Input
                        icon={Text}
                        label="عنوان التذكرة"
                        placeholder="أدخل عنوان موجز للمشكلة"
                        value={newTicket.subject}
                        onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                        required
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                          label="الفئة"
                          options={categoryOptions.filter(opt => opt.value !== "")}
                          value={newTicket.category}
                          onChange={(value) => setNewTicket({...newTicket, category: value})}
                          placeholder="اختر فئة"
                          required
                        />
                        
                        <Select
                          label="الأولوية"
                          options={priorityOptions.filter(opt => opt.value !== "")}
                          value={newTicket.priority}
                          onChange={(value) => setNewTicket({...newTicket, priority: value})}
                          placeholder="اختر الأولوية"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-base font-medium mb-1 text-right">تفاصيل المشكلة</label>
                        <textarea
                          className="w-full border border-gray-200 rounded-sm py-2 px-4 text-base focus:outline-none focus:ring-1 focus:ring-[#00998F] focus:border-[#00998F] transition-colors resize-vertical min-h-[150px]"
                          placeholder="اشرح المشكلة بالتفصيل..."
                          value={newTicket.message}
                          onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-base font-medium mb-1 text-right">المرفقات (اختياري)</label>
                        <div className="border border-dashed border-gray-300 rounded-sm p-4 text-center">
                          <input type="file" className="hidden" id="file-upload" multiple />
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="text-gray-500">
                              <p className="mb-1">اسحب الملفات هنا أو انقر للتصفح</p>
                              <p className="text-xs">يمكنك إرفاق ملفات بصيغة JPG، PNG، PDF بحد أقصى 5 ميجابايت</p>
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 pt-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowNewTicketForm(false)}
                        >
                          إلغاء
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isLoading || !newTicket.subject || !newTicket.category || !newTicket.message}
                        >
                          {isLoading ? "جاري الإرسال..." : "إرسال التذكرة"}
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <>
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-sm border border-gray-200 mb-6">
                      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                        <h2 className="text-lg font-bold">تذاكر الدعم الفني</h2>
                        <Button 
                          onClick={() => setShowNewTicketForm(true)}
                          className="flex items-center gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          تذكرة جديدة
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Input
                            placeholder="البحث برقم التذكرة أو العنوان..."
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
                            options={categoryOptions}
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                            placeholder="فلترة حسب الفئة"
                          />
                        </div>
                        <div>
                          <Select
                            options={priorityOptions}
                            value={priorityFilter}
                            onChange={setPriorityFilter}
                            placeholder="فلترة حسب الأولوية"
                          />
                        </div>
                      </div>
                    </div>

                    {isLoading ? (
                      <div className="bg-white rounded-sm border border-gray-200 p-8 text-center">
                        <div className="animate-spin h-8 w-8 border-4 border-[#00998F] border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p>جاري تحميل التذاكر...</p>
                      </div>
                    ) : filteredTickets.length === 0 ? (
                      <div className="bg-white rounded-sm border border-gray-200 p-8 text-center">
                        <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">لا توجد تذاكر</h2>
                        <p className="text-gray-600 mb-6">
                          {searchTerm || statusFilter || categoryFilter || priorityFilter
                            ? "لا توجد تذاكر تطابق معايير البحث الخاصة بك"
                            : "لم تقم بإنشاء أي تذاكر دعم بعد"}
                        </p>
                        <Button onClick={() => setShowNewTicketForm(true)}>إنشاء تذكرة جديدة</Button>
                      </div>
                    ) : (
                      <>
                        <div className="bg-white rounded-sm border border-gray-200 overflow-hidden mb-6">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 text-right">
                                <tr>
                                  <th className="px-6 py-3 text-sm font-medium text-gray-500">رقم التذكرة</th>
                                  <th className="px-6 py-3 text-sm font-medium text-gray-500">العنوان</th>
                                  <th className="px-6 py-3 text-sm font-medium text-gray-500">الحالة</th>
                                  <th className="px-6 py-3 text-sm font-medium text-gray-500">الفئة</th>
                                  <th className="px-6 py-3 text-sm font-medium text-gray-500">الأولوية</th>
                                  <th className="px-6 py-3 text-sm font-medium text-gray-500">آخر تحديث</th>
                                  <th className="px-6 py-3 text-sm font-medium text-gray-500">الإجراءات</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {currentTickets.map((ticket) => (
                                  <tr key={ticket.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{ticket.id}</td>
                                    <td className="px-6 py-4">{ticket.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {renderStatusBadge(ticket.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {categoryOptions.find(opt => opt.value === ticket.category)?.label || ticket.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {renderPriorityBadge(ticket.priority)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                      {formatDate(ticket.lastUpdate)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <Button 
                                        as={Link} 
                                        href={`/support/ticket/${ticket.id}`} 
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
                  </>
                )}
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === "faq" && (
              <div className="bg-white rounded-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-[#00998F]" />
                  الأسئلة الشائعة
                </h2>
                
                <div className="space-y-6">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <h3 className="font-bold text-lg mb-2 flex items-start gap-2">
                        <span className="bg-[#D2EAE8] text-[#00998F] h-6 w-6 flex items-center justify-center rounded-full flex-shrink-0">
                          {index + 1}
                        </span>
                        {item.question}
                      </h3>
                      <p className="text-gray-600 mr-8">{item.answer}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-gray-50 p-4 rounded-sm">
                  <p className="text-center mb-4">لم تجد إجابة لسؤالك؟ يمكنك إنشاء تذكرة دعم جديدة أو التواصل معنا مباشرة</p>
                  <div className="flex justify-center gap-4">
                    <Button 
                      onClick={() => {
                        setActiveTab("tickets")
                        setShowNewTicketForm(true)
                      }}
                      variant="primary"
                    >
                      إنشاء تذكرة دعم
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("contact")}
                      variant="outline"
                    >
                      اتصل بنا
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-[#00998F]" />
                      تواصل معنا
                    </h2>
                    
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="الاسم"
                          placeholder="أدخل اسمك الكامل"
                          required
                        />
                        
                        <Input
                          label="البريد الإلكتروني"
                          type="email"
                          placeholder="أدخل بريدك الإلكتروني"
                          required
                        />
                      </div>
                      
                      <Input
                        label="الموضوع"
                        placeholder="أدخل موضوع الرسالة"
                        required
                      />
                      
                      <div>
                        <label className="block text-base font-medium mb-1 text-right">الرسالة</label>
                        <textarea
                          className="w-full border border-gray-200 rounded-sm py-2 px-4 text-base focus:outline-none focus:ring-1 focus:ring-[#00998F] focus:border-[#00998F] transition-colors resize-vertical min-h-[150px]"
                          placeholder="اكتب رسالتك هنا..."
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full md:w-auto">
                        إرسال الرسالة
                      </Button>
                    </form>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold mb-4">معلومات التواصل</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-[#00998F] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">رقم الهاتف</div>
                          <div className="text-gray-600" dir="ltr">+962 79 123 4567</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-[#00998F] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">البريد الإلكتروني</div>
                          <div className="text-gray-600">support@abumassoud.com</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-[#00998F] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">ساعات العمل</div>
                          <div className="text-gray-600">السبت - الخميس: 8 صباحاً - 8 مساءً</div>
                          <div className="text-gray-600">الجمعة: مغلق</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-bold mb-4">الدعم السريع</h2>
                    <p className="text-gray-600 mb-4">
                      للحصول على دعم سريع، يمكنك استخدام إحدى الطرق التالية
                    </p>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button variant="secondary" className="w-full justify-start" as="a" href="tel:+962791234567">
                        <Phone className="h-5 w-5 ml-2" />
                        اتصل بنا
                      </Button>
                      
                      <Button variant="secondary" className="w-full justify-start" as="a" href="mailto:support@abumassoud.com">
                        <Mail className="h-5 w-5 ml-2" />
                        أرسل بريد إلكتروني
                      </Button>
                      
                      <Button variant="secondary" className="w-full justify-start" onClick={() => {
                        setActiveTab("tickets")
                        setShowNewTicketForm(true)
                      }}>
                        <MessageSquare className="h-5 w-5 ml-2" />
                        إنشاء تذكرة دعم
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-[#00998F] rounded-sm border border-gray-200 p-6 text-white">
                    <h2 className="text-lg font-bold mb-4">تحتاج إلى مساعدة خاصة؟</h2>
                    <p className="mb-4 opacity-90">
                      فريق المبيعات والدعم الفني لدينا جاهز لمساعدتك في المشاريع الكبيرة والطلبات الخاصة.
                    </p>
                    <Button variant="secondary">تواصل مع فريق المبيعات</Button>
                  </div>
                </div>
              </div>
            )}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
