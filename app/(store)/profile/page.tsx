import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import React from 'react'
import ProfilePage from './view'

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await constructMetadata('profile')
    return metadata
}

function Page() {
  return (
    <ProfilePage />
  )
}

export default Page