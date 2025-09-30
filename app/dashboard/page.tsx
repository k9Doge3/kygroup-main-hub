import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  FileText, 
  FolderOpen, 
  Activity,
  Settings,
  BarChart3,
  Shield,
  Bell,
  Calendar,
  DollarSign
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">KY Group Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your sites.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <p className="text-xs text-green-600 mt-1">↗ +12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Files Managed</CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">15,429</div>
              <p className="text-xs text-green-600 mt-1">↗ +8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Storage Used</CardTitle>
              <FolderOpen className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">89.2 GB</div>
              <p className="text-xs text-yellow-600 mt-1">⚠ 78% of quota</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Sessions</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">47</div>
              <p className="text-xs text-blue-600 mt-1">→ Same as yesterday</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/files" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-3" />
                  Upload New Files
                </Button>
              </Link>
              <Link href="/family" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-3" />
                  Manage Family
                </Button>
              </Link>
              <Link href="/portfolio" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Update Portfolio
                </Button>
              </Link>
              <Link href="/family/finances" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-3" />
                  Financial Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              <CardDescription>Latest updates across your sites</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New file uploaded</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Family member added</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Portfolio updated</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Budget goal completed</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">System Status</CardTitle>
              <CardDescription>Current health and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Website Status</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Health</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Healthy
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Yandex Integration</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  File-based
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Grid */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Site Navigation</CardTitle>
            <CardDescription>Access all sections of your KY Group hub</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link href="/" className="group">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group-hover:scale-105">
                  <Activity className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-medium text-sm">Main Hub</h3>
                  <p className="text-xs text-gray-500">Homepage</p>
                </div>
              </Link>
              
              <Link href="/portfolio" className="group">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group-hover:scale-105">
                  <BarChart3 className="h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-medium text-sm">Portfolio</h3>
                  <p className="text-xs text-gray-500">Projects & work</p>
                </div>
              </Link>
              
              <Link href="/resume" className="group">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group-hover:scale-105">
                  <FileText className="h-6 w-6 text-purple-600 mb-2" />
                  <h3 className="font-medium text-sm">Resume</h3>
                  <p className="text-xs text-gray-500">Professional profile</p>
                </div>
              </Link>
              
              <Link href="/family" className="group">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all group-hover:scale-105">
                  <Users className="h-6 w-6 text-orange-600 mb-2" />
                  <h3 className="font-medium text-sm">Family</h3>
                  <p className="text-xs text-gray-500">Family tools</p>
                </div>
              </Link>
              
              <Link href="/family/calendar" className="group">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all group-hover:scale-105">
                  <Calendar className="h-6 w-6 text-red-600 mb-2" />
                  <h3 className="font-medium text-sm">Calendar</h3>
                  <p className="text-xs text-gray-500">Events & scheduling</p>
                </div>
              </Link>
              
              <Link href="/family/finances" className="group">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group-hover:scale-105">
                  <DollarSign className="h-6 w-6 text-indigo-600 mb-2" />
                  <h3 className="font-medium text-sm">Finances</h3>
                  <p className="text-xs text-gray-500">Budget & tracking</p>
                </div>
              </Link>
              
              <Link href="/files" className="group">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all group-hover:scale-105">
                  <FolderOpen className="h-6 w-6 text-teal-600 mb-2" />
                  <h3 className="font-medium text-sm">Files</h3>
                  <p className="text-xs text-gray-500">File management</p>
                </div>
              </Link>
              
              <Link href="/dashboard" className="group">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all group-hover:scale-105">
                  <Shield className="h-6 w-6 text-gray-600 mb-2" />
                  <h3 className="font-medium text-sm">Admin</h3>
                  <p className="text-xs text-gray-500">Settings & config</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}