import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import React from 'react'
import OrdersPage from './view'

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await constructMetadata('orders_history')
    return metadata
}

function Page() {
  return (
    <OrdersPage />
  )
}

export default Page