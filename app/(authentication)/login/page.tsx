import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import React from 'react'
import LoginPage from './view'

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await constructMetadata('login')
    return metadata
}

function Page() {
  return (
    <LoginPage/>
  )
}

export default Page