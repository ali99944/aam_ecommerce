"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send, Paperclip, ChevronDown, ChevronUp, Phone, Mail } from "lucide-react"

export default function ClientSupportChat() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "agent",
      text: "مرحباً بك في خدمة عملاء متجر AMC! كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(Date.now() - 1000 * 60).toISOString(),
      isRead: true,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)
  const [isMinimized, setIsMinimized] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Interface for message object
  interface Message {
    id: string
    sender: "user" | "agent"
    text: string
    timestamp: string
    isRead: boolean
    attachment?: {
      type: string
      url: string
      name: string
    }
  }

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom()
      setUnreadCount(0)
    }
  }, [messages, isChatOpen])

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date().toISOString(),
      isRead: true,
    }

    setMessages([...messages, newUserMessage])
    setInputMessage("")

    // Simulate agent typing
    setIsTyping(true)

    // Simulate agent response after delay
    setTimeout(() => {
      const agentResponses = [
        "شكراً لتواصلك معنا. كيف يمكنني مساعدتك؟",
        "سأكون سعيداً بمساعدتك في هذا الأمر.",
        "يمكنني التحقق من ذلك لك. هل يمكنك تزويدي بمزيد من المعلومات؟",
        "بالتأكيد، يمكنني مساعدتك في ذلك. هل لديك رقم الطلب؟",
        "أفهم ما تقصده. دعني أتحقق من الأمر وأعود إليك.",
        "هل تحتاج مساعدة في اختيار الأدوات المناسبة لمشروعك؟",
        "يمكنني مساعدتك في معرفة حالة طلبك أو تتبع الشحنة.",
        "لدينا عروض خاصة على الأدوات الكهربائية هذا الأسبوع، هل تود معرفة المزيد؟",
      ]

      const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)]

      const newAgentMessage: Message = {
        id: Date.now().toString(),
        sender: "agent",
        text: randomResponse,
        timestamp: new Date().toISOString(),
        isRead: isChatOpen,
      }

      setMessages((prev) => [...prev, newAgentMessage])
      setIsTyping(false)

      if (!isChatOpen) {
        setUnreadCount((prev) => prev + 1)
      }
    }, 1500)
  }

  // Handle file attachment
  const handleAttachment = () => {
    fileInputRef.current?.click()
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Simulate file upload
    const newFileMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: "أرسلت ملفاً",
      timestamp: new Date().toISOString(),
      isRead: true,
      attachment: {
        type: file.type,
        url: URL.createObjectURL(file),
        name: file.name,
      },
    }

    setMessages([...messages, newFileMessage])

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end">
      {/* Chat Button */}
      <button
        onClick={() => {
          setIsChatOpen(!isChatOpen)
          if (!isChatOpen) setUnreadCount(0)
        }}
        className="relative bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all"
      >
        {isChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}

        {!isChatOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div
          className={`absolute bottom-16 left-0 ${isMinimized ? "h-auto" : "h-[400px]"} w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col`}
        >
          {/* Chat Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-primary font-bold text-lg ml-3">
                AMC
              </div>
              <div>
                <h3 className="font-medium">خدمة عملاء متجر AMC</h3>
                <p className="text-xs text-white/80">متصل الآن</p>
              </div>
            </div>
            <button onClick={() => setIsMinimized(!isMinimized)} className="text-white hover:text-white/80">
              {isMinimized ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto h-80 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "agent" && (
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs ml-2 flex-shrink-0">
                        AMC
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] ${message.sender === "user" ? "bg-primary text-white" : "bg-white text-gray-800 border border-gray-200"} rounded p-3`}
                    >
                      {message.attachment ? (
                        <div>
                          <div className="text-sm mb-1">{message.text}</div>
                          <div className="bg-white/10 rounded p-2 text-xs flex items-center">
                            <Paperclip className="h-3 w-3 ml-1 flex-shrink-0" />
                            <span className="truncate">{message.attachment.name}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm">{message.text}</p>
                      )}
                      <div
                        className={`text-xs mt-1 text-left ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="mb-4 flex justify-start">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs ml-2 flex-shrink-0">
                      AMC
                    </div>
                    <div className="bg-white text-gray-800 rounded-lg p-3 border border-gray-200">
                      <div className="flex gap-x-1 space-x-reverse">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-gray-200">
                <div className="flex items-center">
                  <button
                    onClick={handleAttachment}
                    className="p-2 text-gray-500 hover:text-primary"
                    title="إرفاق ملف"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="اكتب رسالتك هنا..."
                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:border-2 mx-2"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={inputMessage.trim() === ""}
                    className={`p-2 rounded-md ${
                      inputMessage.trim() === ""
                        ? "text-gray-400"
                        : "text-primary hover:bg-primary/10"
                    }`}
                    title="إرسال"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Alternative Contact Methods */}
              <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-center gap-x-4">
                <a href="tel:920001234" className="flex items-center hover:text-primary">
                  <Phone className="h-3 w-3 ml-1" />
                  920001234
                </a>
                <a href="mailto:support@amcstore.com" className="flex items-center hover:text-primary">
                  <Mail className="h-3 w-3 ml-1" />
                  support@amcstore.com
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
