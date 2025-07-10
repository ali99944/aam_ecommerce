"use client"

import type React from "react"
import { useState } from "react"
import { Copy, Check, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import Button from "./button"

interface ClipboardProps {
  text: string
  children?: React.ReactNode
  className?: string
  variant?: "default" | "command" | "inline"
  showIcon?: boolean
  successMessage?: string
  onCopy?: () => void
}

export function Clipboard({
  text,
  children,
  className,
  variant = "default",
  successMessage = "تم النسخ!",
  onCopy,
}: ClipboardProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      onCopy?.()
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  if (variant === "command") {
    return (
      <div className={cn("relative bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm", className)}>
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="h-4 w-4" />
          <span className="text-gray-400">Terminal</span>
        </div>
        <div className="flex items-center justify-between">
          <code className="flex-1">{text}</code>
          <Button variant="ghost" size="sm" onClick={handleCopy} className="text-gray-400 hover:text-white h-8 w-8 p-0">
            {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        {isCopied && (
          <div className="absolute -top-8 right-0 bg-green-600 text-white px-2 py-1 rounded text-xs">
            {successMessage}
          </div>
        )}
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <span className={cn("inline-flex items-center gap-1", className)}>
        {children || <code className="bg-gray-100 px-2 py-1 rounded text-sm">{text}</code>}
        <button onClick={handleCopy} className="text-gray-500 hover:text-gray-700 transition-colors">
          {isCopied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
        </button>
      </span>
    )
  }

  return (
    <div className={cn("relative flex items-center gap-2 p-3 bg-gray-50 border rounded-md", className)}>
      <div className="flex-1 font-mono text-sm">{children || text}</div>
      <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0">
        {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      </Button>
      {isCopied && (
        <div className="absolute -top-8 right-0 bg-black text-white px-2 py-1 rounded text-xs">{successMessage}</div>
      )}
    </div>
  )
}
