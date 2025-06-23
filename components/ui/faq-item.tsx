"use client"

import { useState } from "react"
import { Plus, Minus } from 'lucide-react'

interface FAQItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
  className?: string
}

export default function FAQItem({ question, answer, defaultOpen = false, className = "" }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-right hover:text-[var(--primary)] transition-colors group"
      >
        <div className="w-8 h-8 bg-[var(--accent)]/10 rounded-full flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors">
          {isOpen ? (
            <Minus className="w-4 h-4 text-[var(--accent)]" />
          ) : (
            <Plus className="w-4 h-4 text-[var(--accent)]" />
          )}
        </div>
        <span className="font-semibold text-lg text-[var(--primary)] flex-1 mr-4">{question}</span>
      </button>
      {isOpen && (
        <div className="pb-6 pr-12">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
