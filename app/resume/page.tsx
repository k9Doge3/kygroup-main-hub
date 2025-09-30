'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Award,
  BookOpen,
  Code2,
  GraduationCap,
  Briefcase,
  User,
  Star,
  ChevronRight,
  Languages,
  Trophy,
  Heart
} from 'lucide-react'
import { MainNavigation } from "@/components/main-navigation"
import { StarField } from "@/components/star-field"
import { PortfolioHeader } from "@/components/portfolio-header"
import { ExperienceCard } from "@/components/experience-card"

const personalInfo = {
  name: "Karim Youssef",
  title: "BCom Accounting Student & CPA Candidate",
  email: "kyoussef6994@gmail.com",
  phone: "(587) 501-6994",
  location: "Edmonton, Canada",
  website: "https://karimyoussef.dev",
  github: "https://github.com/karimkawambwa",
  linkedin: "https://linkedin.com/in/karimyoussef",
  summary: "Currently a student graduating in August from Grant MacEwan University pursuing a BCom in Accounting with a Human Resource Minor. Completing all required courses for CPA designation. Proficient in corporate tax software including Intuit QuickBooks and skilled in data analytics tools such as Microsoft Excel. Looking for diverse opportunities to apply accounting skills and gain valuable experience across various industries."
}

const experience = [
  {
    id: 1,
    company: "ProCredit Auto & Go Auto Outlet Leduc",
    position: "Car Salesperson",
    duration: "November 2024 - March 2025",
    location: "Leduc, Canada",
    description: "Generated leads and managed customer relationships in automotive sales environment.",
    achievements: [
      "Cold called customers for credit applications for vehicle financing",
      "Generated own leads through online marketing on Facebook",
      "Ensured quality customer service when customers were in-house",
      "Worked as a team to help other salespeople and coordinate appointment schedules",
      "Learned urgency creation skills and followed the sales process to close deals"
    ],
    technologies: ["Customer Relationship Management", "Sales Process", "Social Media Marketing", "Team Coordination"]
  },
  {
    id: 2,
    company: "Multilinguabilities",
    position: "Administrator Assistant (Internship)",
    duration: "July 2024",
    location: "Edmonton, Canada",
    description: "Provided administrative support with focus on financial record management and project coordination.",
    achievements: [
      "Processed and verified invoices for accuracy, ensuring timely payments",
      "Maintained comprehensive financial records and documentation",
      "Tracked deadlines and supported development of project timelines",
      "Assisted in implementation of project management processes"
    ],
    technologies: ["Invoice Processing", "Financial Records", "Project Management", "Timeline Development"]
  },
  {
    id: 3,
    company: "FedEx Express, UberEATS and various apps",
    position: "Delivery Driver/Courier",
    duration: "2019 - 2020",
    location: "Edmonton, Canada",
    description: "Managed timely delivery services across the city with focus on organization and accuracy.",
    achievements: [
      "Ensured timely and proper delivery of packages across the city",
      "Developed strong organizational and time-tracking skills",
      "Maintained attention to detail and accurate record-keeping",
      "Built reputation for reliability and customer service excellence"
    ],
    technologies: ["Route Optimization", "Time Management", "Customer Service", "Record Keeping"]
  },
  {
    id: 4,
    company: "Wildrose Painters, Student-Works painters",
    position: "Residential Painter/Contractor",
    duration: "2017 - 2019",
    location: "Edmonton, Canada",
    description: "Provided professional painting services with focus on quality and project management.",
    achievements: [
      "Prepared surfaces by cleaning, sanding, and repairing imperfections",
      "Selected appropriate tools for each job to ensure quality results",
      "Maintained safe and organized working spaces that boosted efficiency",
      "Handled budgeting, expense tracking, and invoice preparation for projects"
    ],
    technologies: ["Project Management", "Budget Management", "Quality Control", "Safety Management"]
  }
]

const education = [
  {
    id: 1,
    institution: "Grant MacEwan University",
    degree: "Bachelor of Commerce in Accounting",
    duration: "2020 - 2025 (Graduating August)",
    location: "Edmonton, Canada",
    details: "Major in Accounting with Human Resource Minor. Completing CPA required courses.",
    achievements: [
      "Pursuing CPA designation alongside degree completion",
      "Completed comprehensive accounting curriculum",
      "Gained expertise in corporate tax and financial analysis"
    ]
  },
  {
    id: 2,
    institution: "Professional Development",
    degree: "CPA Canada Course Requirements",
    duration: "2022 - 2025",
    location: "Online/Edmonton",
    details: "Completing all required courses for CPA designation",
    achievements: [
      "Advanced Taxation and Corporate Tax courses",
      "Financial Reporting and Analysis certification",
      "Professional Ethics and Business Communication"
    ]
  }
]

const skills = {
  "Accounting & Finance": {
    level: 95,
    technologies: ["Corporate Tax", "Financial Analysis", "Budgeting", "Invoice Processing", "Financial Records", "CPA Requirements"]
  },
  "Software & Tools": {
    level: 90,
    technologies: ["Intuit QuickBooks", "Microsoft Excel", "Power BI", "Microsoft Office Suite", "Data Analytics"]
  },
  "Languages": {
    level: 100,
    technologies: ["English (Fluent)", "Russian (Native)", "Arabic (Native)", "Multilingual Communication"]
  },
  "Sales & Marketing": {
    level: 85,
    technologies: ["Customer Relationship Management", "Social Media Marketing", "Lead Generation", "Sales Process"]
  },
  "Project Management": {
    level: 80,
    technologies: ["Timeline Development", "Budget Management", "Team Coordination", "Quality Control"]
  },
  "Soft Skills": {
    level: 95,
    technologies: ["Communication", "Teamwork", "Problem-Solving", "Time Management", "Work Ethic", "Attention to Detail"]
  }
}

const projects = [
  {
    name: "Corporate Tax Analysis Project",
    description: "Comprehensive tax analysis using QuickBooks and Excel",
    technologies: ["QuickBooks", "Excel", "Tax Software"],
    impact: "Streamlined tax preparation process"
  },
  {
    name: "Financial Dashboard",
    description: "Power BI dashboard for financial reporting and analysis",
    technologies: ["Power BI", "Excel", "Data Analytics"],
    impact: "Improved financial reporting efficiency"
  },
  {
    name: "Multilingual Customer Service",
    description: "Customer service excellence across three languages",
    technologies: ["CRM", "Communication", "Problem Solving"],
    impact: "Enhanced customer satisfaction"
  }
]

const certifications = [
  {
    name: "CPA Canada Course Requirements",
    issuer: "CPA Canada",
    date: "In Progress - 2025",
    credentialId: "CPA-CANADA-2025"
  },
  {
    name: "QuickBooks ProAdvisor",
    issuer: "Intuit",
    date: "2024",
    credentialId: "QB-PROADVISOR-2024"
  },
  {
    name: "Microsoft Excel Advanced",
    issuer: "Microsoft",
    date: "2023",
    credentialId: "MS-EXCEL-ADV-2023"
  }
]

const references = [
  {
    name: "Elias (Manager)",
    company: "GoAuto Outlet Leduc",
    phone: "587-778-4670",
    role: "Direct Supervisor"
  },
  {
    name: "Michelle Malin (MPAcc; CPA; CA)",
    company: "Grant MacEwan University",
    phone: "780-633-3328",
    role: "Associate Professor, Accounting & Finance"
  },
  {
    name: "Anoura Ramli",
    company: "Multilinguabilities - Newcomer Center",
    phone: "437-254-6599",
    role: "Admin Coordinator"
  },
  {
    name: "Matthew Durnie",
    company: "Student-Works-West / Brushed-Up Painters",
    phone: "780-995-1157",
    email: "matthewdd09@gmail.com",
    role: "Professional Painter & Business Owner"
  }
]

const volunteerExperience = [
  {
    name: "Stollery Children Hospital Hockey Tournament",
    year: "2016",
    description: "Tracked scores for fundraiser event supporting Stollery Children's Hospital",
    impact: "Contributed to successful charity fundraising"
  },
  {
    name: "Edmonton & Area Land Trust: Golden Ranches",
    year: "2020", 
    description: "Removed invasive plants and maintained perimeter with landscaping and trail maintenance",
    impact: "Environmental conservation and community service"
  }
]

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const SkillBar = ({ skill, level }: { skill: string, level: number }) => {
    // Create dynamic class for width
    const widthClass = `w-[${level}%]`
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-300">{skill}</span>
          <span className="text-xs text-slate-400">{level}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className={`bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out ${widthClass}`}
          ></div>
        </div>
      </div>
    )
  }

  const ExperienceCard = ({ job }: { job: typeof experience[0] }) => (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-xl">{job.position}</CardTitle>
            <p className="text-purple-400 font-semibold">{job.company}</p>
            <p className="text-slate-400 text-sm">{job.location}</p>
          </div>
          <Badge variant="outline" className="border-slate-600 text-slate-300">
            {job.duration}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-300">{job.description}</p>
        <div>
          <h4 className="font-semibold text-white mb-2">Key Achievements:</h4>
          <ul className="space-y-1">
            {job.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start space-x-2 text-slate-300 text-sm">
                <ChevronRight className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-1">
          {job.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen relative">
      <StarField />
      <MainNavigation />

      <main className="container mx-auto py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <PortfolioHeader {...personalInfo} />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">5+</div>
                <div className="text-sm text-slate-300">Years Experience</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">BCom</div>
                <div className="text-sm text-slate-300">Accounting Degree</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Languages className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">3</div>
                <div className="text-sm text-slate-300">Languages</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">CPA</div>
                <div className="text-sm text-slate-300">In Progress</div>
              </CardContent>
            </Card>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="h-6 w-6 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Professional Experience</h2>
            </div>
            
            <div className="relative space-y-8">
              {/* Timeline line */}
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500" />
              
              {experience.map((job, index) => (
                <ExperienceCard
                  key={index}
                  company={job.company}
                  position={job.position}
                  duration={job.duration}
                  location={job.location}
                  description={job.description}
                  achievements={job.achievements}
                  technologies={job.technologies}
                  isLatest={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}