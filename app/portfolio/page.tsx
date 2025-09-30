'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, ExternalLink, Mail, Phone, MapPin, Calendar, Star, GitFork, Briefcase } from 'lucide-react'
import { MainNavigation } from "@/components/main-navigation"
import { StarField } from "@/components/star-field"
import { EnhancedProfile } from "@/components/enhanced-profile"
import { SocialLinks } from "@/components/social-links"
import { ContactForm } from "@/components/contact-form"
import { ChatbotModal } from "@/components/chatbot-modal"

const portfolioData = {
  personal: {
    name: "Karim",
    title: "Full Stack Developer & Digital Creator",
    bio: "Passionate developer creating innovative digital solutions with modern technologies.",
    avatar: "/placeholder-user.jpg",
    location: "Canada",
    email: "contact@kygroup.ca",
    phone: "+1 (XXX) XXX-XXXX",
    github: "https://github.com/k9Doge3",
    website: "https://kygroup.ca"
  },
  projects: [
    {
      id: 1,
      name: "Space Theme Landing Page",
      description: "Beautiful space-themed landing page with interactive animations and modern design",
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/k9Doge3/v0-space-theme-landing-pag",
      live: "https://landingforkarim.vercel.app",
      image: "/placeholder.jpg",
      featured: true,
      stars: 1,
      forks: 0
    },
    {
      id: 2,
      name: "Portfolio Website",
      description: "Professional portfolio showcasing projects and skills with responsive design",
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/k9Doge3/v0-portfolio-website",
      live: "https://v0-portfolio-website-mauve-sigma.vercel.app",
      image: "/placeholder.jpg",
      featured: true,
      stars: 1,
      forks: 0
    },
    {
      id: 3,
      name: "Cloud Storage Manager",
      description: "Advanced file storage system with cloud integration and modern UI",
      tech: ["React", "Next.js", "TypeScript", "Vercel Blob"],
      github: "https://github.com/k9Doge3/v0-storage",
      live: "https://v0-storage-iota.vercel.app",
      image: "/placeholder.jpg",
      featured: true,
      stars: 1,
      forks: 0
    },
    {
      id: 4,
      name: "EXIF Photo Blog",
      description: "Photography blog with EXIF data display and gallery features",
      tech: ["React", "Next.js", "TypeScript", "Image Processing"],
      github: "https://github.com/k9Doge3/exif-photo-blog",
      live: "https://exif-photo-blog-liard-seven.vercel.app",
      image: "/placeholder.jpg",
      featured: false,
      stars: 1,
      forks: 0
    },
    {
      id: 5,
      name: "Repository Manager",
      description: "GitHub repository management and visualization tool",
      tech: ["React", "Next.js", "GitHub API", "TypeScript"],
      github: "https://github.com/k9Doge3/myrepos",
      live: "https://myrepos-one.vercel.app",
      image: "/placeholder.jpg",
      featured: false,
      stars: 1,
      forks: 0
    },
    {
      id: 6,
      name: "OneLink Manager",
      description: "Link management system built with Vue.js",
      tech: ["Vue.js", "JavaScript", "CSS"],
      github: "https://github.com/k9Doge3/onelink",
      live: "#",
      image: "/placeholder.jpg",
      featured: false,
      stars: 0,
      forks: 0
    }
  ],
  skills: {
    "Frontend": ["React", "Next.js", "Vue.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    "Backend": ["Node.js", "Python", "MongoDB", "PostgreSQL", "API Development"],
    "Tools": ["Git", "GitHub", "Vercel", "VS Code", "Docker", "Figma"],
    "Cloud": ["Vercel", "Yandex Disk", "Cloud Storage", "Serverless Functions"]
  },
  experience: [
    {
      company: "Freelance Developer",
      position: "Full Stack Developer",
      duration: "2023 - Present",
      description: "Developing modern web applications and digital solutions for various clients"
    },
    {
      company: "Personal Projects",
      position: "Creator & Maintainer",
      duration: "2022 - Present", 
      description: "Building and maintaining multiple open-source projects and web applications"
    }
  ]
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const ProjectCard = ({ project }: { project: typeof portfolioData.projects[0] }) => (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-purple-400 transition-colors text-white">
              {project.name}
            </CardTitle>
            <p className="text-sm text-slate-300 mt-2">{project.description}</p>
          </div>
          {project.featured && (
            <Badge variant="secondary" className="ml-2 bg-purple-500/20 text-purple-300 border-slate-600">Featured</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {project.tech.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                {tech}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>{project.stars}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitFork className="h-4 w-4" />
                <span>{project.forks}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild className="border-slate-600 hover:bg-slate-700">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-1" />
                  Code
                </a>
              </Button>
              {project.live !== "#" && (
                <Button size="sm" asChild className="bg-purple-600 hover:bg-purple-700">
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden">
      <StarField />
      <MainNavigation />
      
      <main className="relative z-10 container mx-auto px-4 py-16 space-y-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Star className="h-6 w-6 text-purple-400" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Portfolio
              </h1>
              <Star className="h-6 w-6 text-blue-400" />
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-1">
                  <Avatar className="h-32 w-32 bg-slate-900">
                    <AvatarImage src={portfolioData.personal.avatar} alt={portfolioData.personal.name} />
                    <AvatarFallback className="text-2xl bg-purple-600">{portfolioData.personal.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-white">{portfolioData.personal.name}</h2>
            <p className="text-xl text-purple-300 mb-4">{portfolioData.personal.title}</p>
            <p className="text-lg max-w-2xl mx-auto mb-6 text-slate-300">{portfolioData.personal.bio}</p>
            
            <div className="flex justify-center items-center space-x-6 text-sm text-slate-400 mb-6">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{portfolioData.personal.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>{portfolioData.personal.email}</span>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" asChild className="border-slate-600 hover:bg-slate-800">
                <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <a href={`mailto:${portfolioData.personal.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Me
                </a>
              </Button>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-purple-600">Projects</TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-purple-600">Skills</TabsTrigger>
              <TabsTrigger value="experience" className="data-[state=active]:bg-purple-600">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Star className="h-5 w-5 text-purple-400" />
                      <span>Featured Projects</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {portfolioData.projects.filter(p => p.featured).slice(0, 3).map(project => (
                        <div key={project.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/30 transition-all duration-200">
                          <div>
                            <h4 className="font-medium text-white">{project.name}</h4>
                            <p className="text-sm text-slate-400">{project.tech.slice(0, 2).join(", ")}</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild className="hover:bg-slate-600/50 text-slate-300 hover:text-white">
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg bg-slate-700/50">
                        <div className="text-2xl font-bold text-purple-400">{portfolioData.projects.length}</div>
                        <div className="text-sm text-slate-300">Projects</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-slate-700/50">
                        <div className="text-2xl font-bold text-purple-400">{Object.keys(portfolioData.skills).length}</div>
                        <div className="text-sm text-slate-300">Skill Areas</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-slate-700/50">
                        <div className="text-2xl font-bold text-purple-400">{portfolioData.projects.reduce((acc, p) => acc + p.stars, 0)}</div>
                        <div className="text-sm text-slate-300">GitHub Stars</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-slate-700/50">
                        <div className="text-2xl font-bold text-purple-400">2+</div>
                        <div className="text-sm text-slate-300">Years Experience</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-white">My Projects</h2>
                <p className="text-slate-300">A collection of projects I've built using modern web technologies.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-white">Skills & Technologies</h2>
                <p className="text-slate-300">Technologies and tools I use to bring ideas to life.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(portfolioData.skills).map(([category, skills]) => (
                  <Card key={category} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-white">Experience</h2>
                <p className="text-slate-300">My professional journey and key experiences.</p>
              </div>
              <div className="space-y-6">
                {portfolioData.experience.map((exp, index) => (
                  <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white">{exp.position}</CardTitle>
                          <p className="text-purple-300">{exp.company}</p>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-slate-400">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300">{exp.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Let's Work Together</h2>
              <p className="text-xl text-slate-300 text-pretty max-w-3xl mx-auto">
                Interested in collaborating? Let's discuss your project and create something amazing together.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <SocialLinks layout="compact" showStats />
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
