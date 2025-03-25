import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@radix-ui/react-toast'
import { ToastProvider as ToastContainer } from '@/components/ui/toast'
import { Newsletter } from '@/components/custom/newsletter'
import { Alert } from '@/components/ui/alert'

export const metadata: Metadata = {
  title: 'محلات علي ابو مسعود',
  description: 'متجر لمواد البناء والعدد الكهربائية والمواد الزراعية',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`text-[#393e41]`}>
        <ToastProvider>
        <ToastContainer>
        {children}
        <Alert 
          title='لبلسبل'
          description='لبلاسبيشنلشيب'
        />
        </ToastContainer>
        </ToastProvider>
      </body>
    </html>
  )
}
