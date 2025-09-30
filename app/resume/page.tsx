'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Github,
  Linkedin,
  Globe,
  Award,
  ChevronRight,
  GraduationCap,
  Briefcase,
  User,
  Star,
  Languages,
  Trophy,
  Heart
} from 'lucide-react'
import { MainNavigation } from "@/components/main-navigation"
import { StarField } from "@/components/star-field"
import { EnhancedProfile } from "@/components/enhanced-profile"
import { SocialLinks } from "@/components/social-links"
import { ContactForm } from "@/components/contact-form"
import { ChatbotModal } from "@/components/chatbot-modal"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden">
      <StarField />
      <MainNavigation />
      
      <main className="relative z-10 container mx-auto px-4 py-16 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-1">
              <div className="bg-slate-900 rounded-full p-8">
                <User className="h-16 w-16 text-purple-400 mx-auto" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Karim Youssef
            </h1>
            <p className="text-xl md:text-2xl text-slate-300">BCom Accounting Student & CPA Candidate</p>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>kyoussef6994@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(587) 501-6994</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Edmonton, Canada</span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" size="sm" className="border-slate-600 hover:border-purple-500">
              <Globe className="h-4 w-4 mr-2" />
              Website
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 hover:border-purple-500">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 hover:border-purple-500">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Summary */}
        <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <User className="h-6 w-6 text-purple-400" />
              Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 leading-relaxed">
              Currently a student graduating in August from Grant MacEwan University pursuing a BCom in Accounting with a Human Resource Minor. 
              Completing all required courses for CPA designation. Proficient in corporate tax software including Intuit QuickBooks and skilled 
              in data analytics tools such as Microsoft Excel. Looking for diverse opportunities to apply accounting skills and gain valuable 
              experience across various industries.
            </p>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-purple-400" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Job 1 */}
            <div className="border-l-4 border-purple-500 pl-6 pb-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Car Salesperson</h3>
                  <p className="text-lg font-semibold text-purple-400">ProCredit Auto & Go Auto Outlet Leduc</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>November 2024 - March 2025</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>Leduc, Canada</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 mb-4">Generated leads and managed customer relationships in automotive sales environment.</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-slate-300 text-sm">
                  <ChevronRight className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Cold called customers for credit applications for vehicle financing</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300 text-sm">
                  <ChevronRight className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Generated own leads through online marketing on Facebook</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300 text-sm">
                  <ChevronRight className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Ensured quality customer service when customers were in-house</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {['Customer Relationship Management', 'Sales Process', 'Social Media Marketing'].map((tech) => (
                  <Badge key={tech} variant="outline" className="border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-300 transition-colors text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Job 2 */}
            <div className="border-l-4 border-blue-500 pl-6 pb-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Administrator Assistant (Internship)</h3>
                  <p className="text-lg font-semibold text-blue-400">Multilinguabilities</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>July 2024</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>Edmonton, Canada</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 mb-4">Provided administrative support with focus on financial record management and project coordination.</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-slate-300 text-sm">
                  <ChevronRight className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Processed and verified invoices for accuracy, ensuring timely payments</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300 text-sm">
                  <ChevronRight className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Maintained comprehensive financial records and documentation</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {['Invoice Processing', 'Financial Records', 'Project Management'].map((tech) => (
                  <Badge key={tech} variant="outline" className="border-slate-600 text-slate-300 hover:border-blue-500 hover:text-blue-300 transition-colors text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-purple-400" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-bold text-white">Bachelor of Commerce in Accounting</h3>
              <p className="text-lg font-semibold text-purple-400">Grant MacEwan University</p>
              <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>2020 - 2025 (Graduating August)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>Edmonton, Canada</span>
                </div>
              </div>
              <p className="text-slate-300 mt-3">Major in Accounting with Human Resource Minor. Completing CPA required courses.</p>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Award className="h-6 w-6 text-purple-400" />
              Skills & Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-purple-400" />
                  Accounting & Finance
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Corporate Tax', 'Financial Analysis', 'Budgeting', 'CPA Requirements'].map((skill) => (
                    <Badge key={skill} className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Languages className="h-4 w-4 text-blue-400" />
                  Software & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['QuickBooks', 'Microsoft Excel', 'Power BI', 'Microsoft Office'].map((skill) => (
                    <Badge key={skill} className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Let's Connect</h2>
              <p className="text-xl text-slate-300 text-pretty max-w-3xl mx-auto">
                Interested in my background and experience? Let's discuss potential opportunities.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <SocialLinks layout="vertical" showStats />
              <ContactForm embedded compactMode />
            </div>
          </div>
        </section>

        {/* Chatbot Modal */}
        <ChatbotModal />

      </main>
    </div>
  )
}