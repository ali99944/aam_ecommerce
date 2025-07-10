import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import React from 'react'
import TrackOrderPage from './view'

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await constructMetadata('track_order')
    return metadata
}

function Page() {
  return (
    <TrackOrderPage />
  )
}

export default Page