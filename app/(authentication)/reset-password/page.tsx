import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import React from 'react'
import ResetPasswordPage from './view'

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await constructMetadata('reset-password')
    return metadata
}

function Page() {
  return (
    <ResetPasswordPage />
  )
}

export default Page