"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  MapPin,
  Briefcase,
  Calendar,
  Download,
  ExternalLink,
  Zap,
  Star,
  Code2,
  Rocket,
  Heart
} from "lucide-react"
import Link from "next/link"
import { ProfilePhotoManager } from "./profile-photo-manager"

interface EnhancedProfileProps {
  showFullBio?: boolean
  showSocialLinks?: boolean
  showContactInfo?: boolean
  showActions?: boolean
  compact?: boolean
}

export function EnhancedProfile({ 
  showFullBio = true, 
  showSocialLinks = true, 
  showContactInfo = true,
  showActions = true,
  compact = false 
}: EnhancedProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:karim@kygroup.com", color: "text-red-400" },
    { icon: Github, label: "GitHub", href: "https://github.com/k9Doge3", color: "text-gray-400" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/karim", color: "text-blue-400" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/karim", color: "text-sky-400" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/karim", color: "text-pink-400" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@karim", color: "text-red-500" },
    { icon: Globe, label: "Website", href: "https://kygroup.com", color: "text-green-400" },
  ]

  const skills = [
    "Full-Stack Development", "Cloud Architecture", "UI/UX Design", 
    "DevOps", "Mobile Development", "AI/ML Integration"
  ]

  const achievements = [
    { icon: Rocket, label: "10+ Projects Launched", color: "text-purple-400" },
    { icon: Code2, label: "5+ Years Experience", color: "text-blue-400" },
    { icon: Star, label: "50+ Happy Clients", color: "text-yellow-400" },
    { icon: Heart, label: "Open Source Contributor", color: "text-red-400" }
  ]

  if (compact) {
    return (
      <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
        <CardHeader className="text-center pb-4">
          <div className="relative mx-auto w-24 h-24">
            <ProfilePhotoManager />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl -z-10"></div>
          </div>
          <CardTitle className="text-xl text-white">Karim</CardTitle>
          <CardDescription className="text-sm text-slate-400">
            <Zap className="inline h-4 w-4 mr-1 text-yellow-400" />
            Entrepreneur • Developer
          </CardDescription>
        </CardHeader>
        {showSocialLinks && (
          <CardContent className="pt-0">
            <div className="flex justify-center gap-2">
              {socialLinks.slice(0, 4).map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-slate-700/50"
                  asChild
                >
                  <Link href={link.href} target="_blank">
                    <link.icon className={`h-4 w-4 ${link.color}`} />
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-2xl shadow-purple-500/10">
      <CardHeader className="text-center pb-8">
        <div className="relative mx-auto">
          <ProfilePhotoManager />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl -z-10"></div>
        </div>
        
        <div className="space-y-2 mt-6">
          <CardTitle className="text-3xl text-white">Karim</CardTitle>
          <CardDescription className="text-xl text-slate-300">
            <Zap className="inline h-5 w-5 mr-2 text-yellow-400" />
            Entrepreneur • Developer • Digital Innovator
          </CardDescription>
          
          {showContactInfo && (
            <div className="flex items-center justify-center gap-4 text-slate-400 text-sm mt-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>United States</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>Available for Projects</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {showFullBio && (
          <div className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-center text-slate-300 leading-relaxed text-lg">
                Welcome to my digital universe! I'm Karim, an entrepreneur and developer passionate about creating
                innovative solutions that make a difference. This platform showcases my professional work, personal 
                projects, and serves as an interactive hub where visitors can engage with my content and connect with me.
              </p>
              
              {isExpanded && (
                <div className="mt-6 space-y-4">
                  <p className="text-slate-300 leading-relaxed">
                    With over 5 years of experience in full-stack development, I specialize in building modern web 
                    applications, cloud-native solutions, and user-centric digital experiences. My work spans across 
                    various industries, from fintech to e-commerce, always focusing on scalable and maintainable solutions.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-purple-400" />
                        Core Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-slate-700/50 text-slate-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        Achievements
                      </h4>
                      <div className="space-y-2">
                        {achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                            <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
                            <span>{achievement.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-purple-400 hover:text-purple-300 hover:bg-slate-700/50"
              >
                {isExpanded ? "Show Less" : "Learn More About Me"}
              </Button>
            </div>
          </div>
        )}

        <Separator className="bg-slate-700/50" />

        {showSocialLinks && (
          <div className="space-y-6">
            <h3 className="text-center text-xl font-semibold text-white">Connect With Me</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-16 flex-col gap-2 border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all duration-300"
                  asChild
                >
                  <Link href={link.href} target="_blank">
                    <link.icon className={`h-6 w-6 ${link.color}`} />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}

        {showActions && (
          <>
            <Separator className="bg-slate-700/50" />
            
            <div className="space-y-4">
              <h3 className="text-center text-lg font-semibold text-white">Let's Work Together</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  asChild
                >
                  <Link href="/portfolio">
                    <Briefcase className="mr-2 h-4 w-4" />
                    View Portfolio
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  className="border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 hover:text-white"
                  asChild
                >
                  <Link href="/resume">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 hover:text-white"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Schedule a Meeting</DialogTitle>
                      <DialogDescription className="text-slate-300">
                        Ready to discuss your project? Let's connect and explore how I can help bring your ideas to life.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                        <Link href="/family/calendar">
                          <Calendar className="mr-2 h-4 w-4" />
                          View My Calendar
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full border-slate-600" asChild>
                        <Link href="mailto:karim@kygroup.com">
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email Instead
                        </Link>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}