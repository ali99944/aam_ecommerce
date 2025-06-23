import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
export const metadata: Metadata = {
  title: "محلاتنا - أفضل متجر إلكتروني",
  description: "تسوق أحدث الأجهزة الإلكترونية والتقنية من محلاتنا",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic antialiased">
        {children}
      </body>
    </html>
  )
}
