import React from 'react'
import VerifyOTPPage from './view'
import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo_fetcher'

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await constructMetadata('verify_otp')
    return metadata
}

function Page() {
  return (
    <VerifyOTPPage />
  )
}

export default Page