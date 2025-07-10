"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Globe, Check } from "lucide-react"

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  dir: "ltr" | "rtl"
}

interface LanguageSelectorProps {
  variant?: "default" | "compact" | "icon-only"
  position?: "left" | "right"
  showFlag?: boolean
  showNativeName?: boolean
  className?: string
  onLanguageChange?: (language: Language) => void
}

const languages: Language[] = [
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    dir: "rtl",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    dir: "ltr",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    dir: "ltr",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    dir: "ltr",
  },
]

export default function LanguageSelector({
  variant = "default",
  position = "right",
  showFlag = true,
  showNativeName = true,
  className = "",
  onLanguageChange,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]) // Default to Arabic
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language)
    setIsOpen(false)
    onLanguageChange?.(language)

    // Update document direction
    document.documentElement.dir = language.dir
    document.documentElement.lang = language.code
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return "px-2 py-1 text-sm"
      case "icon-only":
        return "p-2"
      default:
        return "px-3 py-2"
    }
  }

  const getDropdownPosition = () => {
    return position === "left" ? "left-0" : "right-0"
  }

  const renderTrigger = () => {
    if (variant === "icon-only") {
      return (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${getVariantStyles()} bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center ${className}`}
          aria-label="Select Language"
        >
          <Globe className="w-5 h-5 text-gray-600" />
        </button>
      )
    }

    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${getVariantStyles()} bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 ${className}`}
        dir={selectedLanguage.dir}
      >
        {showFlag && <span className="text-lg">{selectedLanguage.flag}</span>}
        {variant !== "compact" && showNativeName && (
          <span className="font-medium text-gray-700">{selectedLanguage.nativeName}</span>
        )}
        {variant === "compact" && (
          <span className="font-medium text-gray-700">{selectedLanguage.code.toUpperCase()}</span>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {renderTrigger()}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2 ${getDropdownPosition()} bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px] overflow-hidden`}
        >
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors flex items-center justify-between group ${
                  selectedLanguage.code === language.code ? "bg-blue-50" : ""
                }`}
                dir={language.dir}
              >
                <div className="flex items-center gap-3">
                  {showFlag && <span className="text-lg">{language.flag}</span>}
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{language.nativeName}</div>
                    <div className="text-sm text-gray-500">{language.name}</div>
                  </div>
                </div>
                {selectedLanguage.code === language.code && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-4 py-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Globe className="w-3 h-3" />
              <span>اختر لغتك المفضلة</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
