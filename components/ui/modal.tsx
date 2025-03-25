"use client"

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Button } from './button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md' 
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])
  
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" dir='rtl'>
      <div 
        ref={modalRef}
        className={`bg-white rounded-sm w-full ${sizeClasses[size]} shadow-lg`}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-gray-200 p-2">
            <h3 className="text-lg font-bold">{title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        <div className="p-4 max-h-[70vh] overflow-auto">
          {children}
        </div>
        
        {footer && (
          <div className=" border-gray-200 p-2 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isDanger?: boolean
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  isDanger = false
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button
            onClick={onClose}
            variant="outline"
            size='sm'
          >
            {cancelText}
          </Button>
          <Button
            size='sm'
            onClick={() => {
              onConfirm()
              onClose()
            }}
            variant={isDanger ? 'danger' : 'primary'}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-base text-right">{message}</p>
    </Modal>
  )
}

export function DangerModal(props: Omit<ConfirmationModalProps, 'isDanger'>) {
  return <ConfirmationModal {...props} isDanger={true} />
}
