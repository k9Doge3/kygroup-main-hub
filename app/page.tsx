import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  Briefcase,
  Users,
  Github,
  Linkedin,
  Mail,
  Calendar,
  CheckSquare,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Star,
  Rocket,
  Zap,
  Camera,
  Code2,
  User,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import { ProfilePhotoManager } from "@/components/profile-photo-manager"
import { MainNavigation } from "@/components/main-navigation"

export default function HomePage() {
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

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <Badge
                  variant="outline"
                  className="px-6 py-3 text-sm border-purple-500/50 bg-purple-950/30 text-purple-200"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Karim's Digital Universe - Powered by Innovation
                </Badge>

                <h1 className="text-6xl md:text-8xl font-bold text-balance bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                  Welcome to
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Karim's World
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-300 text-pretty max-w-4xl mx-auto leading-relaxed">
                  Discover my professional portfolio, personal projects, and interactive space where visitors can upload
                  photos and engage with my calendar. A comprehensive digital hub showcasing my work, business ventures,
                  and personal journey.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25"
                  asChild
                >
                  <Link href="/portfolio">
                    <Briefcase className="mr-2 h-5 w-5" />
                    View My Portfolio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-600 bg-slate-900/50 text-slate-200 hover:bg-slate-800/70 hover:text-white"
                  asChild
                >
                  <Link href="/family">
                    <Users className="mr-2 h-5 w-5" />
                    Interactive Hub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center space-y-6 mb-16">
              <div className="flex justify-center items-center gap-3 mb-4">
                <Star className="h-6 w-6 text-purple-400" />
                <h2 className="text-4xl md:text-5xl font-bold text-white">About Karim</h2>
                <Star className="h-6 w-6 text-blue-400" />
              </div>
              <p className="text-xl text-slate-300 text-pretty max-w-2xl mx-auto">
                Passionate entrepreneur and developer building innovative solutions and exploring new frontiers
              </p>
            </div>

            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm shadow-2xl shadow-purple-500/10">
              <CardHeader className="text-center pb-8">
                <div className="relative">
                  <ProfilePhotoManager />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl -z-10"></div>
                </div>
                <CardTitle className="text-3xl text-white mt-6">Karim</CardTitle>
                <CardDescription className="text-xl text-slate-300">
                  <Zap className="inline h-5 w-5 mr-2 text-yellow-400" />
                  Entrepreneur • Developer • Digital Innovator
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="prose prose-invert max-w-none">
                  <p className="text-center text-slate-300 leading-relaxed text-lg">
                    Welcome to my digital universe! I'm Karim, an entrepreneur and developer passionate about creating
                    innovative solutions that make a difference. This website serves as my comprehensive portfolio and
                    business hub, showcasing my professional work, personal projects, and resume. What makes this space
                    unique is its interactive nature - visitors can upload photos, engage with my calendar, and explore
                    my journey through technology and business. Built with cutting-edge cloud storage integration, this
                    platform demonstrates my commitment to modern, scalable solutions.
                  </p>
                </div>

                <Separator className="bg-slate-700/50" />

                <div className="space-y-6">
                  <h3 className="text-center text-xl font-semibold text-white">Connect With Karim</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      variant="ghost"
                      className="h-16 flex-col gap-2 border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                      asChild
                    >
                      <Link href="mailto:karim@example.com">
                        <Mail className="h-6 w-6" />
                        <span className="text-sm">Email</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-16 flex-col gap-2 border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                      asChild
                    >
                      <Link href="https://github.com/karim" target="_blank">
                        <Github className="h-6 w-6" />
                        <span className="text-sm">GitHub</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-16 flex-col gap-2 border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                      asChild
                    >
                      <Link href="https://linkedin.com/in/karim" target="_blank">
                        <Linkedin className="h-6 w-6" />
                        <span className="text-sm">LinkedIn</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-16 flex-col gap-2 border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                      asChild
                    >
                      <Link href="https://twitter.com/karim" target="_blank">
                        <Twitter className="h-6 w-6" />
                        <span className="text-sm">Twitter</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-16 flex-col gap-2 border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                      asChild
                    >
                      <Link href="https://instagram.com/karim" target="_blank">
                        <Instagram className="h-6 w-6" />
                        <span className="text-sm">Instagram</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-16 flex-col gap-2 border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                      asChild
                    >
                      <Link href="https://youtube.com/@karim" target="_blank">
                        <Youtube className="h-6 w-6" />
                        <span className="text-sm">YouTube</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-16 flex-col gap-2 border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                      asChild
                    >
                      <Link href="https://karim.com" target="_blank">
                        <Globe className="h-6 w-6" />
                        <span className="text-sm">Website</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-16 flex-col gap-2 border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                      asChild
                    >
                      <Link href="https://discord.gg/karim" target="_blank">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                        <span className="text-sm">Discord</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">
                Explore Karim's Digital Ecosystem
              </h2>
              <p className="text-xl text-slate-300 text-pretty max-w-3xl mx-auto">
                Navigate through my professional work, personal projects, and interactive features
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <Briefcase className="h-7 w-7 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Portfolio & Business</CardTitle>
                  <CardDescription className="text-slate-300">
                    Professional projects, business ventures, resume, and comprehensive work showcase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-slate-300 hover:text-white hover:bg-slate-700/50"
                    asChild
                  >
                    <Link href="/portfolio">
                      Explore Portfolio
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                    <Calendar className="h-7 w-7 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Interactive Calendar</CardTitle>
                  <CardDescription className="text-slate-300">
                    Engage with my schedule, book meetings, and see my availability in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-slate-300 hover:text-white hover:bg-slate-700/50"
                    asChild
                  >
                    <Link href="/family/calendar">
                      View Calendar
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                    <CheckSquare className="h-7 w-7 text-green-400" />
                  </div>
                  <CardTitle className="text-white">Project Goals</CardTitle>
                  <CardDescription className="text-slate-300">
                    Current projects, objectives, and milestones in my professional journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-slate-300 hover:text-white hover:bg-slate-700/50"
                    asChild
                  >
                    <Link href="/family/todos">
                      View Projects
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <Users className="h-7 w-7 text-cyan-400" />
                  </div>
                  <CardTitle className="text-white">Community Hub</CardTitle>
                  <CardDescription className="text-slate-300">
                    Join with just your name - upload photos, leave messages, and interact with the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-slate-300 hover:text-white hover:bg-slate-700/50"
                    asChild
                  >
                    <Link href="/family">
                      Join Community
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Added File Manager card */}
              <Card className="group hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300">
                    <svg className="h-7 w-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm0 0V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2M7 13h10M7 17h6"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-white">File Manager</CardTitle>
                  <CardDescription className="text-slate-300">
                    Upload, organize, and manage photos and files with cloud storage integration
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

              <Card className="group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    <svg className="h-7 w-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-white">Financial Dashboard</CardTitle>
                  <CardDescription className="text-slate-300">
                    Track expenses, budgets, and financial goals with comprehensive analytics
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

              <Card className="group hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-yellow-500/30 group-hover:to-orange-500/30 transition-all duration-300">
                    <svg className="h-7 w-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-white">Resume & CV</CardTitle>
                  <CardDescription className="text-slate-300">
                    Professional experience, skills, education, and downloadable resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-slate-300 hover:text-white hover:bg-slate-700/50"
                    asChild
                  >
                    <Link href="/portfolio#resume">
                      View Resume
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-slate-700/50 bg-slate-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center gap-2 text-slate-300">
                <Star className="h-4 w-4 text-purple-400" />
                <p className="text-sm">Built by Karim with Next.js and powered by cloud innovation</p>
                <Star className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-xs text-slate-400">© 2025 Karim • Innovating the digital future</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
