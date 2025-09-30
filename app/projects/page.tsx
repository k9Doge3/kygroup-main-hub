'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Github, 
  ExternalLink, 
  Star, 
  GitFork, 
  Calendar, 
  Code, 
  Globe, 
  Search,
  Filter,
  Rocket,
  Database,
  Smartphone,
  Camera,
  Palette,
  BookOpen,
  Settings,
  Cloud
} from 'lucide-react'
import { MainNavigation } from "@/components/main-navigation"

const projectCategories = {
  all: "All Projects",
  portfolio: "Portfolio & Personal",
  tools: "Development Tools",
  web: "Web Applications",
  storage: "Storage & Cloud",
  media: "Media & Photography"
}

const projectData = [
  {
    id: 1,
    name: "v0-portfolio-website",
    description: "Professional portfolio website built with modern web technologies",
    category: "portfolio",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    githubUrl: "https://github.com/karimkawambwa/v0-portfolio-website",
    liveUrl: "https://v0-portfolio-website-mauve-sigma.vercel.app/",
    stars: 1,
    forks: 0,
    language: "TypeScript",
    lastUpdated: "2024-09-29",
    status: "live",
    icon: <Globe className="h-5 w-5" />,
    featured: true
  },
  {
    id: 2,
    name: "v0-space-theme-landing-page",
    description: "Stunning space-themed landing page with cosmic animations and modern design",
    category: "portfolio",
    technologies: ["HTML", "CSS", "JavaScript", "Animations"],
    githubUrl: "https://github.com/karimkawambwa/v0-space-theme-landing-pag",
    liveUrl: "https://landingforkarim.vercel.app/",
    stars: 1,
    forks: 0,
    language: "CSS",
    lastUpdated: "2024-09-29",
    status: "live",
    icon: <Rocket className="h-5 w-5" />,
    featured: true
  },
  {
    id: 3,
    name: "yandex-blob-uploader",
    description: "Comprehensive file management system with cloud storage integration",
    category: "storage",
    technologies: ["Next.js", "TypeScript", "Yandex Disk API", "File Management"],
    githubUrl: "https://github.com/karimkawambwa/yandex-blob-uploader",
    liveUrl: null,
    stars: 1,
    forks: 0,
    language: "TypeScript",
    lastUpdated: "2024-09-30",
    status: "development",
    icon: <Cloud className="h-5 w-5" />,
    featured: true
  },
  {
    id: 4,
    name: "exif-photo-blog",
    description: "Photography blog with detailed EXIF data display and gallery features",
    category: "media",
    technologies: ["Next.js", "EXIF", "Image Processing", "Photography"],
    githubUrl: "https://github.com/karimkawambwa/exif-photo-blog",
    liveUrl: "https://exif-photo-blog-mu.vercel.app/",
    stars: 1,
    forks: 0,
    language: "TypeScript",
    lastUpdated: "2024-09-29",
    status: "live",
    icon: <Camera className="h-5 w-5" />,
    featured: true
  },
  {
    id: 5,
    name: "v0-storage",
    description: "Modern storage management application with intuitive interface",
    category: "storage",
    technologies: ["Storage", "File Management", "Web"],
    githubUrl: "https://github.com/karimkawambwa/v0-storage",
    liveUrl: "https://v0-storage-seven.vercel.app/",
    stars: 1,
    forks: 0,
    language: "JavaScript",
    lastUpdated: "2024-09-29",
    status: "live",
    icon: <Database className="h-5 w-5" />,
    featured: false
  },
  {
    id: 6,
    name: "onelink",
    description: "Centralized link management and sharing platform",
    category: "tools",
    technologies: ["Link Management", "Web", "Sharing"],
    githubUrl: "https://github.com/karimkawambwa/onelink",
    liveUrl: "https://onelink-nine-zeta.vercel.app/",
    stars: 1,
    forks: 0,
    language: "TypeScript",
    lastUpdated: "2024-09-29",
    status: "live",
    icon: <BookOpen className="h-5 w-5" />,
    featured: false
  },
  {
    id: 7,
    name: "myrepos",
    description: "Repository management and organization tool",
    category: "tools",
    technologies: ["Git", "Repository Management", "Development"],
    githubUrl: "https://github.com/karimkawambwa/myrepos",
    liveUrl: "https://myrepos-nine.vercel.app/",
    stars: 1,
    forks: 0,
    language: "TypeScript",
    lastUpdated: "2024-09-29",
    status: "live",
    icon: <Github className="h-5 w-5" />,
    featured: false
  },
  {
    id: 8,
    name: "file-organizer-2000",
    description: "Intelligent file organization system with automated sorting",
    category: "tools",
    technologies: ["File Management", "Automation", "Organization"],
    githubUrl: "https://github.com/karimkawambwa/file-organizer-2000",
    liveUrl: null,
    stars: 1,
    forks: 0,
    language: "Python",
    lastUpdated: "2024-09-29",
    status: "development",
    icon: <Settings className="h-5 w-5" />,
    featured: false
  },
  {
    id: 9,
    name: "phone",
    description: "Mobile application development project",
    category: "web",
    technologies: ["Mobile", "App Development"],
    githubUrl: "https://github.com/karimkawambwa/phone",
    liveUrl: null,
    stars: 1,
    forks: 0,
    language: "JavaScript",
    lastUpdated: "2024-09-29",
    status: "development",
    icon: <Smartphone className="h-5 w-5" />,
    featured: false
  },
  {
    id: 10,
    name: "theme",
    description: "Custom theme and design system implementation",
    category: "tools",
    technologies: ["CSS", "Design System", "Theming"],
    githubUrl: "https://github.com/karimkawambwa/theme",
    liveUrl: null,
    stars: 1,
    forks: 0,
    language: "CSS",
    lastUpdated: "2024-09-29",
    status: "development",
    icon: <Palette className="h-5 w-5" />,
    featured: false
  }
]

const getLanguageColor = (language: string): string => {
  const colors: Record<string, string> = {
    'TypeScript': 'bg-blue-500',
    'JavaScript': 'bg-yellow-500',
    'Python': 'bg-green-500',
    'CSS': 'bg-purple-500',
    'HTML': 'bg-orange-500',
    'Java': 'bg-red-500'
  }
  return colors[language] || 'bg-gray-500'
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  const filteredProjects = projectData
    .filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      }
      if (sortBy === "updated") {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      }
      if (sortBy === "stars") {
        return b.stars - a.stars
      }
      return a.name.localeCompare(b.name)
    })

  const ProjectCard = ({ project }: { project: typeof projectData[0] }) => (
    <Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 group-hover:bg-purple-500/30 transition-colors">
              {project.icon}
            </div>
            <div>
              <CardTitle className="text-white group-hover:text-purple-300 transition-colors text-lg">
                {project.name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`}></div>
                <span className="text-sm text-slate-400">{project.language}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {project.featured && (
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            <Badge 
              variant="outline" 
              className={`text-xs ${
                project.status === 'live' 
                  ? 'border-green-500 text-green-400' 
                  : 'border-orange-500 text-orange-400'
              }`}
            >
              {project.status === 'live' ? 'Live' : 'In Development'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-slate-300 text-sm line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-300"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="h-3 w-3" />
              <span>{project.forks}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(project.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-slate-600 hover:border-purple-500 hover:bg-purple-500/10"
            onClick={() => window.open(project.githubUrl, '_blank')}
          >
            <Github className="h-4 w-4 mr-2" />
            Code
          </Button>
          {project.liveUrl && (
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => window.open(project.liveUrl!, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const stats = {
    total: projectData.length,
    live: projectData.filter(p => p.status === 'live').length,
    totalStars: projectData.reduce((acc, p) => acc + p.stars, 0),
    languages: Array.from(new Set(projectData.map(p => p.language))).length
  }

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
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Code className="h-6 w-6 text-purple-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                My Projects
              </h1>
              <Rocket className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              A collection of my development projects, from web applications to tools and utilities
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.total}</div>
                <div className="text-sm text-slate-300">Total Projects</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{stats.live}</div>
                <div className="text-sm text-slate-300">Live Projects</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.totalStars}</div>
                <div className="text-sm text-slate-300">GitHub Stars</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.languages}</div>
                <div className="text-sm text-slate-300">Languages</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search projects by name, description, or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-slate-800/50 border border-slate-700 text-white rounded-md"
                aria-label="Filter by category"
              >
                {Object.entries(projectCategories).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-slate-800/50 border border-slate-700 text-white rounded-md"
                aria-label="Sort projects by"
              >
                <option value="featured">Featured First</option>
                <option value="updated">Recently Updated</option>
                <option value="stars">Most Stars</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Code className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">No projects found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}