import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import React from 'react'
import RegisterPage from './view'

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await constructMetadata('register')
    return metadata
}

function Page() {
  return (
    <RegisterPage />
  )
}

export default Page