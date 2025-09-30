"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Activity,
  Clock,
  Globe,
  Shield,
  Eye,
  TrendingUp
} from "lucide-react"
import Link from "next/link"

interface UserActivity {
  id: string
  email: string
  name: string
  provider: string
  signupDate: string
  lastLogin: string
  isOnline: boolean
  sessionCount: number
}

interface AnalyticsData {
  users: UserActivity[]
  guests: {
    totalGuestSessions: number
    activeGuestSessions: number
    avgGuestSessionDuration: string
  }
  summary: {
    totalUsers: number
    onlineUsers: number
    newUsersToday: number
  }
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchAnalytics()
    // Refresh data every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      } else {
        setError("Failed to load analytics")
      }
    } catch (err) {
      setError("Failed to connect to analytics")
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Access Required</h2>
            <p className="text-gray-600 mb-4">You need to be signed in as an admin to access this page.</p>
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'google': return 'bg-red-100 text-red-800'
      case 'github': return 'bg-gray-100 text-gray-800'
      case 'credentials': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">User analytics and system monitoring</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={fetchAnalytics}>
              <Activity className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                User View
              </Button>
            </Link>
          </div>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="py-4">
              <p className="text-red-800">{error}</p>
            </CardContent>
          </Card>
        )}

        {analytics && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{analytics.summary.totalUsers}</div>
                  <p className="text-xs text-gray-500 mt-1">Registered accounts</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Online Now</CardTitle>
                  <UserCheck className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{analytics.summary.onlineUsers}</div>
                  <p className="text-xs text-green-600 mt-1">+ {analytics.guests.activeGuestSessions} guests</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">New Today</CardTitle>
                  <UserPlus className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{analytics.summary.newUsersToday}</div>
                  <p className="text-xs text-gray-500 mt-1">Signups today</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Guest Sessions</CardTitle>
                  <Globe className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{analytics.guests.totalGuestSessions}</div>
                  <p className="text-xs text-orange-600 mt-1">Avg: {analytics.guests.avgGuestSessionDuration}</p>
                </CardContent>
              </Card>
            </div>

            {/* User List */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Activity
                </CardTitle>
                <CardDescription>
                  Real-time user status and activity tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className={getProviderColor(user.provider)}>
                          {user.provider}
                        </Badge>
                        
                        <div className="text-right text-sm">
                          <p className="text-gray-600">Sessions: {user.sessionCount}</p>
                          <p className="text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(user.lastLogin)}
                          </p>
                        </div>
                        
                        <Badge variant={user.isOnline ? "default" : "secondary"}>
                          {user.isOnline ? "Online" : "Offline"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Export Analytics
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  System Status
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}