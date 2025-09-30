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
  Calendar,
  Award,
  ChevronRight,
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  User
} from 'lucide-react'

interface ExperienceCardProps {
  company: string
  position: string
  duration: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
  isLatest?: boolean
}

export function ExperienceCard({ 
  company, 
  position, 
  duration, 
  location, 
  description, 
  achievements, 
  technologies,
  isLatest = false
}: ExperienceCardProps) {
  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-slate-900 z-10" />
      {isLatest && (
        <div className="absolute left-2 top-8 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-purple-400" />
      )}
      
      {/* Experience card */}
      <Card className="ml-8 bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="h-4 w-4 text-purple-400" />
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {position}
                </h3>
                {isLatest && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">
                    Current
                  </Badge>
                )}
              </div>
              <p className="text-lg font-semibold text-purple-400 mb-1">{company}</p>
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-slate-300 mb-4 leading-relaxed">{description}</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-400" />
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                    <ChevronRight className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-300 transition-colors text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}