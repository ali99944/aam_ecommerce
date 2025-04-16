import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@radix-ui/react-toast'
import { ToastProvider as ToastContainer } from '@/components/ui/toast'
import { Providers } from '@/src/providers/query-providers'

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
        <Providers>
          <ToastProvider>
          <ToastContainer>
          {children}
          </ToastContainer>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
