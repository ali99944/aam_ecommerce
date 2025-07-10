import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import React from 'react'
import CheckoutPage from './view'

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await constructMetadata('checkout')
    return metadata
}

function Page() {
  return (
    <CheckoutPage />
  )
}

export default Page