"use client"

import { ReactNode } from "react"
import { useRouter } from "next/router"
import { useAppSelector } from "@/src/redux/hook"

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const router = useRouter()

  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  return <>{children}</>
}
