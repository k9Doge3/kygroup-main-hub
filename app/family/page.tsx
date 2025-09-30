import { SimpleNameManager } from "@/components/simple-name-manager"
import { MainNavigation } from "@/components/main-navigation"
import { FamilyCalendar } from "@/components/family-calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckSquare, DollarSign, FolderOpen, Users, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-3/4 left-1/2 w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse delay-1200"></div>
      </div>

      <MainNavigation />

      <main className="container mx-auto py-8 px-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Star className="h-6 w-6 text-purple-400" />
              <h1 className="text-5xl font-bold text-white">Community Hub</h1>
              <Star className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-xl text-slate-300 text-pretty max-w-3xl mx-auto">
              Your personal community space with integrated calendar, project objectives, finances, and file storage -
              just enter your name to get started!
            </p>
          </div>

          <SimpleNameManager />

          <div className="space-y-8">
            {/* Main Calendar Section */}
            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm shadow-2xl shadow-purple-500/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-2xl">Community Calendar</CardTitle>
                    <CardDescription className="text-slate-300">
                      Manage community events and personal scheduling in one place
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <FamilyCalendar />
              </CardContent>
            </Card>

            {/* Quick Access Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="group hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                    <CheckSquare className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle className="text-white">Project Objectives</CardTitle>
                  <CardDescription className="text-slate-300">
                    Individual project management with priorities and objective tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-slate-300 hover:text-white hover:bg-slate-700/50"
                    asChild
                  >
                    <Link href="/family/todos">
                      Manage Objectives
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    <DollarSign className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Financial Dashboard</CardTitle>
                  <CardDescription className="text-slate-300">
                    Track expenses, budgets, and financial goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-slate-300 hover:text-white hover:bg-slate-700/50"
                    asChild
                  >
                    <Link href="/family/finances">
                      View Finances
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300">
                    <FolderOpen className="h-6 w-6 text-orange-400" />
                  </div>
                  <CardTitle className="text-white">File Manager</CardTitle>
                  <CardDescription className="text-slate-300">
                    Upload, organize, and manage your personal files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-slate-300 hover:text-white hover:bg-slate-700/50"
                    asChild
                  >
                    <Link href="/family/files">
                      Manage Files
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-slate-700/50 bg-slate-900/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-cyan-400" />
                  Community Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-400">0</div>
                    <div className="text-sm text-slate-400">Upcoming Events</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-green-400">0</div>
                    <div className="text-sm text-slate-400">Active Objectives</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-purple-400">$0</div>
                    <div className="text-sm text-slate-400">Monthly Budget</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-orange-400">0</div>
                    <div className="text-sm text-slate-400">Personal Files</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
