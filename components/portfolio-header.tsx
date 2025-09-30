'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin,
  Github,
  Globe,
  Download,
  ExternalLink,
  User
} from 'lucide-react'

interface PortfolioHeaderProps {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website?: string
  github?: string
  linkedin?: string
  summary: string
}

export function PortfolioHeader({ 
  name, 
  title, 
  email, 
  phone, 
  location, 
  website, 
  github, 
  linkedin, 
  summary 
}: PortfolioHeaderProps) {
  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-2xl" />
      
      <Card className="relative bg-slate-800/40 backdrop-blur-xl border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10" />
        
        <CardContent className="relative p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Profile Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <User className="h-16 w-16 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full animate-pulse" />
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  {name}
                </h1>
                <p className="text-xl lg:text-2xl font-semibold text-purple-400 mb-4">
                  {title}
                </p>
                <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
                  {summary}
                </p>
              </div>
              
              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-slate-300 p-3 bg-slate-700/30 rounded-lg backdrop-blur-sm">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">{email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 p-3 bg-slate-700/30 rounded-lg backdrop-blur-sm">
                  <Phone className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">{phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 p-3 bg-slate-700/30 rounded-lg backdrop-blur-sm">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">{location}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                  onClick={() => window.print()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
                
                {linkedin && (
                  <Button 
                    variant="outline" 
                    className="border-slate-600 hover:border-purple-500 hover:bg-purple-500/10"
                    onClick={() => window.open(linkedin, '_blank')}
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                )}
                
                {github && (
                  <Button 
                    variant="outline" 
                    className="border-slate-600 hover:border-purple-500 hover:bg-purple-500/10"
                    onClick={() => window.open(github, '_blank')}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                )}
                
                {website && (
                  <Button 
                    variant="outline" 
                    className="border-slate-600 hover:border-purple-500 hover:bg-purple-500/10"
                    onClick={() => window.open(website, '_blank')}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Portfolio
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}