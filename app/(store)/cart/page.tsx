import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import React from 'react'
import CartPage from './view'

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await constructMetadata('cart')
    return metadata
}

function Page() {
  return (
    <CartPage />
  )
}

export default Page