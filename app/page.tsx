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
import { GuestWelcome } from "@/components/guest-welcome"
import { StarField } from "@/components/star-field"
import { EnhancedProfile } from "@/components/enhanced-profile"
import { SocialLinks } from "@/components/social-links"
import { ContactForm } from "@/components/contact-form"
import { ChatbotModal } from "@/components/chatbot-modal"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden">
      <StarField />
      <MainNavigation />

      <main className="relative z-10">
        {/* Guest Welcome Banner */}
        <div className="container mx-auto max-w-6xl px-4 pt-4">
          <GuestWelcome />
        </div>

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

        {/* Enhanced Profile Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center space-y-6 mb-16">
              <div className="flex justify-center items-center gap-3 mb-4">
                <Star className="h-6 w-6 text-purple-400" />
                <h2 className="text-4xl md:text-5xl font-bold text-white">Meet Karim</h2>
                <Star className="h-6 w-6 text-blue-400" />
              </div>
              <p className="text-xl text-slate-300 text-pretty max-w-2xl mx-auto">
                Passionate entrepreneur and developer building innovative solutions and exploring new frontiers
              </p>
            </div>

            <EnhancedProfile showFullBio showSocialLinks showContactInfo showActions />
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
              <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-2xl shadow-purple-500/10 group hover:shadow-2xl hover:shadow-purple-500/20">
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

              <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-2xl shadow-blue-500/10 group hover:shadow-2xl hover:shadow-blue-500/20">
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

              <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-green-500/50 transition-all duration-300 shadow-2xl shadow-green-500/10 group hover:shadow-2xl hover:shadow-green-500/20">
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

              <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl shadow-cyan-500/10 group hover:shadow-2xl hover:shadow-cyan-500/20">
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
              <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 shadow-2xl shadow-orange-500/10 group hover:shadow-2xl hover:shadow-orange-500/20">
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

              <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-2xl shadow-purple-500/10 group hover:shadow-2xl hover:shadow-purple-500/20">
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

              <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 shadow-2xl shadow-yellow-500/10 group hover:shadow-2xl hover:shadow-yellow-500/20">
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

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Work Together?</h2>
              <p className="text-xl text-slate-300 text-pretty max-w-3xl mx-auto">
                Have a project in mind? Let's discuss how I can help bring your ideas to life with modern, scalable solutions.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <ContactForm embedded showProjectDetails />
              <SocialLinks showStats />
            </div>
          </div>
        </section>

        {/* Chatbot Modal */}
        <ChatbotModal />

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
