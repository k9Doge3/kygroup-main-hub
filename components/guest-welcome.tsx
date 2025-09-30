"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserX, LogIn, UserPlus, Eye } from "lucide-react"
import Link from "next/link"

export function GuestWelcome() {
  const searchParams = useSearchParams()
  const isGuest = searchParams.get('guest') === 'true'

  useEffect(() => {
    if (isGuest) {
      // Track guest visit
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'guest_visit' })
      }).catch(console.error)
    }
  }, [isGuest])

  if (!isGuest) return null

  return (
    <Card className="mb-6 border-orange-200 bg-orange-50">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <UserX className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="font-medium text-orange-900">Welcome, Guest! 👋</p>
              <p className="text-sm text-orange-700">
                You're browsing as a guest. Some features are limited.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              <Eye className="h-3 w-3 mr-1" />
              Guest Mode
            </Badge>
            <Link href="/auth/signin">
              <Button size="sm" variant="outline">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}