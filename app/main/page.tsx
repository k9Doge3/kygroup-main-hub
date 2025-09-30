'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { 
  User,
  Briefcase,
  Users,
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Code2,
  Building2,
  MessageCircle,
  ExternalLink
} from 'lucide-react'

export default function MainLandingPage() {
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/karimyoussef', color: 'hover:text-gray-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/karimyoussef', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/karimyoussef', color: 'hover:text-pink-400' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/karimyoussef', color: 'hover:text-blue-300' },
  ]

  const mainSections = [
    {
      title: 'Portfolio',
      description: 'Explore my professional journey, projects, and technical expertise',
      icon: User,
      href: '/portfolio',
      color: 'from-purple-500 to-blue-500',
      features: ['Resume & Experience', 'Project Gallery', 'Skills & Certifications', 'Photo Portfolio']
    },
    {
      title: 'Business Hub',
      description: 'Discover my business ventures and professional services',
      icon: Building2,
      href: '/businesses',
      color: 'from-green-500 to-emerald-500',
      features: ['Service Offerings', 'Client Projects', 'Business Portfolio', 'Consulting Services'],
      external: true
    },
    {
      title: 'User Portal',
      description: 'Connect with the community and access exclusive content',
      icon: Users,
      href: '/portal',
      color: 'from-orange-500 to-red-500',
      features: ['Community Forum', 'User Dashboard', 'Social Links', 'Resources']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-emerald-500/10" />
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">
              <User className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Karim Youssef
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl mx-auto">
              Full Stack Developer • Business Professional • Community Builder
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 px-4 py-2">
                BCom Accounting
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 px-4 py-2">
                CPA Candidate
              </Badge>
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 px-4 py-2">
                Edmonton, AB
              </Badge>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-slate-300 mb-8">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-400" />
              <span>kyoussef@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-purple-400" />
              <span>(780) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-400" />
              <span>Edmonton, Alberta</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Button
                  key={social.name}
                  variant="outline"
                  size="sm"
                  className={`border-slate-600 bg-slate-800/50 backdrop-blur-sm ${social.color} transition-all duration-300 hover:scale-110`}
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4 mr-2" />
                    {social.name}
                  </a>
                </Button>
              )
            })}
          </div>
        </header>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {mainSections.map((section) => {
            const Icon = section.icon
            return (
              <Card key={section.title} className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl">
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${section.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white text-center flex items-center justify-center gap-2">
                    {section.title}
                    {section.external && <ExternalLink className="h-4 w-4 text-slate-400" />}
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-center">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {section.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-slate-300 text-sm">
                        <Sparkles className="h-3 w-3 text-purple-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full bg-gradient-to-r ${section.color} hover:scale-105 transition-all duration-300 group-hover:shadow-lg`}
                    asChild
                  >
                    <Link href={section.href}>
                      Explore {section.title}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">5+</div>
              <div className="text-sm text-slate-300">Years Experience</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">20+</div>
              <div className="text-sm text-slate-300">Projects Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-emerald-400 mb-2">3</div>
              <div className="text-sm text-slate-300">Business Ventures</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2">100+</div>
              <div className="text-sm text-slate-300">Community Members</div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-400 border-t border-slate-700/50 pt-8">
          <p>&copy; 2025 Karim Youssef. Building innovative solutions and fostering community connections.</p>
        </footer>
      </div>
    </div>
  )
}