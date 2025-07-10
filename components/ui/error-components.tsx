"use client"

import type React from "react"

import { AlertTriangle, Wifi, Server, Shield, Clock, RefreshCw, Home, ArrowLeft, Bug, Lock, Ban, AlertCircle, XCircle, Info, CheckCircle, Zap, Database, Globe, LucideIcon } from 'lucide-react'
import Button from "./button"

interface ErrorComponentProps {
  title: string
  description: string
  icon?: React.ReactNode
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: "primary" | "secondary"
    icon?: LucideIcon
  }>
  className?: string
  code?: string | number
}

// Base Error Component
export function BaseError({ title, description, icon, actions, className = "", code }: ErrorComponentProps) {
  return (
    <div className={`text-center py-16 px-4 ${className}`}>
      <div className="max-w-md mx-auto">
        {code && (
          <div className="text-6xl font-bold text-gray-300 mb-4" style={{ fontFamily: "monospace" }}>
            {code}
          </div>
        )}
        {icon && (
          <div className="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">{icon}</div>
        )}
        <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
        {actions && actions.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "primary"}
                size="sm"
                onClick={action.onClick}
                icon={action.icon}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 404 Not Found
export function Error404({ onGoHome, onGoBack }: { onGoHome?: () => void; onGoBack?: () => void }) {
  return (
    <BaseError
      code="404"
      icon={<AlertTriangle className="w-12 h-12 text-red-500" />}
      title="الصفحة غير موجودة"
      description="عذراً، الصفحة التي تبحث عنها غير موجودة. قد تكون قد تم حذفها أو نقلها إلى موقع آخر."
      actions={[
        ...(onGoHome
          ? [
              {
                label: "العودة للرئيسية",
                onClick: onGoHome,
                variant: "primary" as const,
                icon: Home,
              },
            ]
          : []),
        ...(onGoBack
          ? [
              {
                label: "العودة للخلف",
                onClick: onGoBack,
                variant: "secondary" as const,
                icon: ArrowLeft,
              },
            ]
          : []),
      ]}
    />
  )
}

// 500 Server Error
export function Error500({ onRetry, onContactSupport }: { onRetry?: () => void; onContactSupport?: () => void }) {
  return (
    <BaseError
      code="500"
      icon={<Server className="w-12 h-12 text-red-500" />}
      title="خطأ في الخادم"
      description="حدث خطأ داخلي في الخادم. نحن نعمل على حل هذه المشكلة. يرجى المحاولة مرة أخرى لاحقاً."
      actions={[
        ...(onRetry
          ? [
              {
                label: "إعادة المحاولة",
                onClick: onRetry,
                variant: "primary" as const,
                icon: RefreshCw,
              },
            ]
          : []),
        ...(onContactSupport
          ? [
              {
                label: "تواصل مع الدعم",
                onClick: onContactSupport,
                variant: "secondary" as const,
              },
            ]
          : []),
      ]}
    />
  )
}

// Network Error
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <BaseError
      icon={<Wifi className="w-12 h-12 text-red-500" />}
      title="مشكلة في الاتصال"
      description="تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت وحاول مرة أخرى."
      actions={
        onRetry
          ? [
              {
                label: "إعادة المحاولة",
                onClick: onRetry,
                variant: "primary",
                icon: RefreshCw,
              },
            ]
          : undefined
      }
    />
  )
}

// Permission Denied
export function PermissionDenied({ onLogin, onGoHome }: { onLogin?: () => void; onGoHome?: () => void }) {
  return (
    <BaseError
      code="403"
      icon={<Shield className="w-12 h-12 text-red-500" />}
      title="غير مسموح بالوصول"
      description="ليس لديك صلاحية للوصول إلى هذه الصفحة. يرجى تسجيل الدخول أو التواصل مع المسؤول."
      actions={[
        ...(onLogin
          ? [
              {
                label: "تسجيل الدخول",
                onClick: onLogin,
                variant: "primary" as const,
                icon: Lock,
              },
            ]
          : []),
        ...(onGoHome
          ? [
              {
                label: "العودة للرئيسية",
                onClick: onGoHome,
                variant: "secondary" as const,
                icon: Home,
              },
            ]
          : []),
      ]}
    />
  )
}

// Timeout Error
export function TimeoutError({ onRetry }: { onRetry?: () => void }) {
  return (
    <BaseError
      icon={<Clock className="w-12 h-12 text-orange-500" />}
      title="انتهت مهلة الطلب"
      description="استغرق الطلب وقتاً أطول من المتوقع. يرجى المحاولة مرة أخرى."
      actions={
        onRetry
          ? [
              {
                label: "إعادة المحاولة",
                onClick: onRetry,
                variant: "primary",
                icon: RefreshCw,
              },
            ]
          : undefined
      }
    />
  )
}

// Rate Limited
export function RateLimited({ retryAfter }: { retryAfter?: string }) {
  return (
    <BaseError
      code="429"
      icon={<Ban className="w-12 h-12 text-orange-500" />}
      title="تم تجاوز الحد المسموح"
      description={
        retryAfter
          ? `لقد تجاوزت الحد المسموح من الطلبات. يرجى المحاولة مرة أخرى بعد ${retryAfter}.`
          : "لقد تجاوزت الحد المسموح من الطلبات. يرجى المحاولة مرة أخرى لاحقاً."
      }
    />
  )
}

// Database Error
export function DatabaseError({ onRetry, onContactSupport }: { onRetry?: () => void; onContactSupport?: () => void }) {
  return (
    <BaseError
      icon={<Database className="w-12 h-12 text-red-500" />}
      title="خطأ في قاعدة البيانات"
      description="حدث خطأ أثناء الوصول إلى قاعدة البيانات. نحن نعمل على حل هذه المشكلة."
      actions={[
        ...(onRetry
          ? [
              {
                label: "إعادة المحاولة",
                onClick: onRetry,
                variant: "primary" as const,
                icon: RefreshCw,
              },
            ]
          : []),
        ...(onContactSupport
          ? [
              {
                label: "تواصل مع الدعم",
                onClick: onContactSupport,
                variant: "secondary" as const,
              },
            ]
          : []),
      ]}
    />
  )
}

// API Error
export function APIError({
  message,
  onRetry,
  onContactSupport,
}: { message?: string; onRetry?: () => void; onContactSupport?: () => void }) {
  return (
    <BaseError
      icon={<Globe className="w-12 h-12 text-red-500" />}
      title="خطأ في واجهة البرمجة"
      description={message || "حدث خطأ أثناء التواصل مع الخادم. يرجى المحاولة مرة أخرى."}
      actions={[
        ...(onRetry
          ? [
              {
                label: "إعادة المحاولة",
                onClick: onRetry,
                variant: "primary" as const,
                icon: RefreshCw,
              },
            ]
          : []),
        ...(onContactSupport
          ? [
              {
                label: "تواصل مع الدعم",
                onClick: onContactSupport,
                variant: "secondary" as const,
              },
            ]
          : []),
      ]}
    />
  )
}

// Validation Error
export function ValidationError({ errors, onGoBack }: { errors?: string[]; onGoBack?: () => void }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-4">خطأ في البيانات</h3>
        <p className="text-gray-600 mb-6">يرجى تصحيح الأخطاء التالية:</p>
        {errors && errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-right">
            <ul className="space-y-2">
              {errors.map((error, index) => (
                <li key={index} className="text-red-700 text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        {onGoBack && (
          <Button variant="primary" size="sm" onClick={onGoBack} icon={ArrowLeft}>
            العودة للتعديل
          </Button>
        )}
      </div>
    </div>
  )
}

// Bug Report
export function BugReport({ onReportBug, onGoHome }: { onReportBug?: () => void; onGoHome?: () => void }) {
  return (
    <BaseError
      icon={<Bug className="w-12 h-12 text-red-500" />}
      title="حدث خطأ غير متوقع"
      description="واجهنا مشكلة غير متوقعة. يرجى الإبلاغ عن هذا الخطأ لمساعدتنا في تحسين الخدمة."
      actions={[
        ...(onReportBug
          ? [
              {
                label: "الإبلاغ عن الخطأ",
                onClick: onReportBug,
                variant: "primary" as const,
                icon: Bug,
              },
            ]
          : []),
        ...(onGoHome
          ? [
              {
                label: "العودة للرئيسية",
                onClick: onGoHome,
                variant: "secondary" as const,
                icon: Home,
              },
            ]
          : []),
      ]}
    />
  )
}

// Alert Components for inline errors
export function ErrorAlert({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-red-800 text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-500 hover:text-red-700">
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export function WarningAlert({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-yellow-800 text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-yellow-500 hover:text-yellow-700">
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export function InfoAlert({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
      <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-blue-800 text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-blue-500 hover:text-blue-700">
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export function SuccessAlert({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-green-800 text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-green-500 hover:text-green-700">
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// Power Outage Error
export function PowerOutageError({ estimatedRestoreTime }: { estimatedRestoreTime?: string }) {
  return (
    <BaseError
      icon={<Zap className="w-12 h-12 text-yellow-500" />}
      title="انقطاع في الخدمة"
      description={
        estimatedRestoreTime
          ? `نواجه حالياً انقطاعاً في الخدمة. الوقت المتوقع للإصلاح: ${estimatedRestoreTime}`
          : "نواجه حالياً انقطاعاً في الخدمة. نعمل على إصلاح المشكلة في أقرب وقت ممكن."
      }
    />
  )
}
