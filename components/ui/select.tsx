"use client"

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search, X, Check } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  name?: string
  options: Option[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  required?: boolean
  error?: string
  searchable?: boolean
  className?: string
}

export function Select({
  name,
  options,
  value,
  onChange,
  placeholder = 'اختر...',
  label,
  required = false,
  error,
  searchable = false,
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const selectRef = useRef<HTMLDivElement>(null)
  
  const selectedOption = options.find(option => option.value === value)
  
  const filteredOptions = searchTerm
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  return (
    <div className="w-full" ref={selectRef}>
      {label && (
        <label className="block text-base font-medium mb-1 text-right">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className={`relative ${className}`}>
        <button
          type="button"
          className={`w-full bg-white border border-gray-200 rounded py-1.5 px-4 text-base text-right flex items-center justify-between focus:outline-none  transition-colors ${
            error ? 'border-red-500' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`${!selectedOption ? 'text-gray-400' : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`h-5 w-5 transform duration-300 text-gray-400 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-sm shadow-md max-h-60 overflow-auto">
            {searchable && (
              <div className="sticky top-0 p-2 bg-white border-b border-gray-100">
                <div className="relative">
                  <input
                    name={name}
                    type="text"
                    placeholder="بحث..."
                    className="w-full border border-gray-200 rounded-sm py-1.5 px-3 pr-8 text-sm focus:outline-none "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {searchTerm && (
                    <button
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSearchTerm('')
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
            
            <ul className="p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className={`w-full text-right px-4 py-2 text-base hover:bg-[#D2EAE8] flex items-center justify-between ${
                        option.value === value ? 'bg-[#D2EAE8] text-[#00998F]' : ''
                      }`}
                      onClick={() => {
                        onChange(option.value)
                        setIsOpen(false)
                        setSearchTerm('')
                      }}
                    >
                      {option.value === value && <Check className="h-4 w-4" />}
                      {option.label}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm text-gray-500 text-center">لا توجد نتائج</li>
              )}
            </ul>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500 text-right">{error}</p>
      )}
    </div>
  )
}

