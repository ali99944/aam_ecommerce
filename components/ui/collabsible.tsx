"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from 'lucide-react'

interface CollapsibleProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export default function Collapsible({ title, children, defaultOpen = false, className = "" }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 text-right flex items-center justify-between hover:bg-gray-50 transition-colors group"
      >
        <h3 className="font-semibold text-primary text-lg">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-gray-400 group-hover:text-primary transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut",
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 border-t border-gray-100">
              <div className="pt-3 text-gray-600 leading-relaxed">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
