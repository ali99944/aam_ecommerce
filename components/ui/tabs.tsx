"use client"

import { useState } from 'react'

interface Tab {
  id: string
  label: string
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  children: React.ReactNode
  className?: string
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  children,
  className = ''
}: TabsProps) {
  return (
    <div className={className}>
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#00998F] text-[#00998F]'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !tab.disabled && onChange(tab.id)}
              disabled={tab.disabled}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        {children}
      </div>
    </div>
  )
}
