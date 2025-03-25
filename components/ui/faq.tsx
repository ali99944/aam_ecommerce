"use client"

import { useState } from "react"
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

interface FAQItemProps {
  question: string
  answer: string
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      className=" rounded-sm overflow-hidden bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <button
        className={`w-full flex justify-between items-center p-4 text-right focus:outline-none ${
          isOpen ? "bg-[#D2EAE8]" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
          <h3 className={`font-bold text-md ${isOpen ? "text-[#00998F]" : "text-gray-800"}`}>{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`h-5 w-5 ${isOpen ? "text-[#00998F]" : "text-gray-500"}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white border-t border-gray-200">
              <p className="text-gray-700">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface FAQProps {
  items: FAQItemProps[]
  title?: string
  description?: string
  className?: string
}

export function FAQ({ items, title, description, className = "" }: FAQProps) {
  return (
    <div className={className}>
      {(title || description) && (
        <div className="text-center mb-8">
          {title && (
            <motion.h2 
              className="text-2xl font-bold mb-3 text-gray-900"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {title}
            </motion.h2>
          )}
          {title && (
            <motion.div 
              className="h-1 w-24 bg-[#00998F] mx-auto mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          )}
          {description && (
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, index) => (
          <FAQItem 
            key={index} 
            question={item.question} 
            answer={item.answer} 
          />
        ))}
      </div>
    </div>
  )
}
