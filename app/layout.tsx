import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AppProviders } from "@/src/providers/app-providers"
import { constructMetadata } from "@/lib/seo_fetcher"
import { ReduxProvider } from "@/src/providers/redux-provider"


export async function generateMetadata(): Promise<Metadata> {
    const metadata = await constructMetadata('home')
    return metadata
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic antialiased">
        <ReduxProvider>
          <AppProviders>
            {children}
          </AppProviders>
        </ReduxProvider>
      </body>
    </html>
  )
}
