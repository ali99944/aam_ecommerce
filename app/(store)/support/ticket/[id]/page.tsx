"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MessageSquare, ChevronLeft, Clock, CheckCircle, XCircle, FileText, Paperclip, Send, MessageCircle, User, X } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"

// Mock ticket data
const getTicketDetails = (id: string) => {
  return {
    id,
    subject: "استفسار عن توفر منتج",
    status: "in_progress",
    date: "2023-10-15T09:30:00",
    lastUpdate: "2023-10-16T14:20:00",
    category: "product",
    priority: "medium",
    messages: [
      {
        id: 1,
        sender: "customer",
        senderName: "محمد أحمد",
        message: "السلام عليكم، أود الاستفسار عن توفر مثقاب كهربائي احترافي بوش GSB 13 RE في متجركم. هل هو متوفر حالياً؟ وما هو سعره؟",
        date: "2023-10-15T09:30:00",
        attachments: []
      },
      {
        id: 2,
        sender: "support",
        senderName: "خدمة العملاء",
        message: "وعليكم السلام ورحمة الله وبركاته، شكراً لتواصلك معنا. نعم، المنتج متوفر حالياً في متجرنا بسعر 120 دينار. هل ترغب في معرفة أي معلومات إضافية عن المنتج؟",
        date: "2023-10-15T11:45:00",
        attachments: []
      },
      {
        id: 3,
        sender: "customer",
        senderName: "محمد أحمد",
        message: "شكراً لردكم السريع. هل يأتي المنتج مع ضمان؟ وهل هناك خدمة توصيل متاحة؟",
        date: "2023-10-16T10:15:00",
        attachments: []
      },
      {
        id: 4,
        sender: "support",
        senderName: "خدمة العملاء",
        message: "نعم، المنتج يأتي مع ضمان لمدة سنتين من الشركة المصنعة. كما نوفر خدمة توصيل لجميع مناطق المملكة. التوصيل داخل عمان مجاني للطلبات التي تزيد قيمتها عن 50 دينار.",
        date: "2023-10-16T14:20:00",
        attachments: [
          {
            name: "product_warranty.pdf",
            size: "1.2 MB",
            type: "application/pdf"
          }
        ]
      }
    ]
  }
}

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTicket(getTicketDetails(params.id))
      setIsLoading(false)
    }, 1000)
  }, [params.id])

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim()) return
    
    // Simulate API call to send message
    setIsLoading(true)
    
    setTimeout(() => {
      const newMessageObj = {
        id: ticket.messages.length + 1,
        sender: "customer",
        senderName: "محمد أحمد",
        message: newMessage,
        date: new Date().toISOString(),
        attachments: []
      }
      
      setTicket({
        ...ticket,
        messages: [...ticket.messages, newMessageObj],
        lastUpdate: new Date().toISOString()
      })
      
      setNewMessage("")
      setIsLoading(false)
    }, 1000)
  }

  if (isLoading && !ticket) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-sm border border-gray-200 p-8 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>جاري تحميل تفاصيل التذكرة...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-sm border border-gray-200 p-8 text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">لم يتم العثور على التذكرة</h2>
              <p className="text-gray-600 mb-6">
                عذراً، لم نتمكن من العثور على تفاصيل التذكرة المطلوبة.
              </p>
              <Button as={Link} href="/support">العودة إلى الدعم الفني</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <Breadcrumb 
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "الدعم الفني", href: "/support" },
              { label: `تذكرة #${ticket.id}` }
            ]} 
            className="mb-6" 
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">تذكرة #{ticket.id}</h1>
              <p className="text-gray-600">تاريخ الإنشاء: {formatDate(ticket.date)}</p>
            </div>
            <Button 
              variant="outline"
              className="flex items-center gap-1"
              icon={ChevronLeft}
            >
              العودة إلى التذاكر
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ticket Messages */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ticket Info */}
              <div className="bg-white rounded-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">{ticket.subject}</h2>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">الحالة:</span>
                    {renderStatusBadge(ticket.status)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">الأولوية:</span>
                    {renderPriorityBadge(ticket.priority)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">آخر تحديث:</span>
                    <span>{formatDate(ticket.lastUpdate)}</span>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="bg-white rounded-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  المحادثة
                </h2>
                
                <div className="space-y-6">
                  {ticket.messages.map((message: any) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.sender === 'customer' 
                            ? 'bg-gray-100 text-gray-800' 
                            : 'bg-primary/10 text-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.sender === 'customer' 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-primary/20 text-primary'
                          }`}>
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-bold">{message.senderName}</div>
                            <div className="text-xs text-gray-500">{formatDate(message.date)}</div>
                          </div>
                        </div>
                        
                        <div className="whitespace-pre-wrap">{message.message}</div>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="text-sm font-medium mb-2">المرفقات:</div>
                            <div className="space-y-2">
                              {message.attachments.map((attachment: any, index: number) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <Paperclip className="h-4 w-4 text-gray-500" />
                                  <span>{attachment.name}</span>
                                  <span className="text-gray-500">({attachment.size})</span>
                                  <Button variant="ghost" size="sm" className="h-6 py-0 px-2 text-primary">
                                    تحميل
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {ticket.status !== 'closed' && (
                  <form onSubmit={handleSendMessage} className="mt-6 pt-6 border-t border-gray-200">
                    <div className="mb-4">
                      <label className="block text-base font-medium mb-1 text-right">إضافة رد</label>
                      <textarea
                        className="w-full border border-gray-200 rounded-sm py-2 px-4 text-base focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-vertical min-h-[120px]"
                        placeholder="اكتب ردك هنا..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <input type="file" id="attachment" className="hidden" multiple />
                        <label htmlFor="attachment" className="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-primary">
                          <Paperclip className="h-4 w-4" />
                          <span>إضافة مرفقات</span>
                        </label>
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isLoading || !newMessage.trim()}
                        className="flex items-center gap-1"
                      >
                        <Send className="h-4 w-4" />
                        إرسال
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Ticket Info Sidebar */}
            <div className="space-y-6">
              {/* Ticket Summary */}
              <div className="bg-white rounded-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  ملخص التذكرة
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">رقم التذكرة:</span>
                    <span className="font-medium">{ticket.id}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">الحالة:</span>
                    <span>{renderStatusBadge(ticket.status)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">الأولوية:</span>
                    <span>{renderPriorityBadge(ticket.priority)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">تاريخ الإنشاء:</span>
                    <span>{formatDate(ticket.date)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">آخر تحديث:</span>
                    <span>{formatDate(ticket.lastUpdate)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">عدد الردود:</span>
                    <span>{ticket.messages.length - 1}</span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="bg-white rounded-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold mb-4">الإجراءات</h2>
                
                <div className="flex items-center gap-2">
                  {ticket.status === 'closed' ? (
                    <Button variant="secondary" className="" icon={MessageSquare}>
                      إعادة فتح التذكرة
                    </Button>
                  ) : (
                    <Button variant='danger' icon={X}>
                      إغلاق التذكرة
                    </Button>
                  )}
                  
                  <Button variant="secondary" icon={FileText}>
                    تصدير المحادثة
                  </Button>
                </div>
              </div>
              
              {/* Related Articles */}
              <div className="bg-white rounded-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold mb-4">مقالات ذات صلة</h2>
                
                <div className="space-y-3">
                  <Link href="#" className="block p-3 bg-gray-50 rounded-sm hover:bg-secondary">
                    <h3 className="font-medium mb-1">كيفية تتبع طلبك</h3>
                    <p className="text-sm text-gray-600">دليل شامل لتتبع طلبك خطوة بخطوة</p>
                  </Link>
                  
                  <Link href="#" className="block p-3 bg-gray-50 rounded-sm hover:bg-secondary">
                    <h3 className="font-medium mb-1">سياسة الإرجاع والاستبدال</h3>
                    <p className="text-sm text-gray-600">تعرف على شروط وإجراءات إرجاع المنتجات</p>
                  </Link>
                  
                  <Link href="#" className="block p-3 bg-gray-50 rounded-sm hover:bg-secondary">
                    <h3 className="font-medium mb-1">الأسئلة الشائعة حول الضمان</h3>
                    <p className="text-sm text-gray-600">إجابات على الأسئلة الشائعة حول ضمان المنتجات</p>
                  </Link>
                </div>
              </div>
              
              {/* Need More Help */}
              <div className="bg-primary rounded-sm border border-gray-200 p-6 text-white">
                <h2 className="text-lg font-bold mb-4">تحتاج إلى مساعدة فورية؟</h2>
                <p className="mb-4 opacity-90">
                  يمكنك التواصل مع فريق خدمة العملاء مباشرة عبر الهاتف خلال ساعات العمل.
                </p>
                <Button variant="secondary" as="a" href="tel:+962791234567" className="w-full">
                  اتصل بنا الآن
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
