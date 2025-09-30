"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  ExternalLink,
  MessageCircle,
  Phone,
  MapPin
} from "lucide-react"
import Link from "next/link"

interface SocialLink {
  icon: any
  label: string
  href: string
  color: string
  description?: string
  username?: string
  verified?: boolean
}

interface SocialLinksProps {
  layout?: "grid" | "horizontal" | "vertical" | "compact"
  showLabels?: boolean
  showTooltips?: boolean
  showStats?: boolean
  animated?: boolean
  size?: "sm" | "md" | "lg"
}

export function SocialLinks({ 
  layout = "grid", 
  showLabels = true, 
  showTooltips = true,
  showStats = false,
  animated = true,
  size = "md"
}: SocialLinksProps) {
  
  const socialLinks: SocialLink[] = [
    { 
      icon: Mail, 
      label: "Email", 
      href: "mailto:karim@kygroup.com", 
      color: "text-red-400 hover:text-red-300",
      description: "Send me a direct email",
      username: "karim@kygroup.com"
    },
    { 
      icon: Github, 
      label: "GitHub", 
      href: "https://github.com/k9Doge3", 
      color: "text-gray-400 hover:text-gray-300",
      description: "Check out my code repositories",
      username: "@k9Doge3",
      verified: true
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn", 
      href: "https://linkedin.com/in/karim", 
      color: "text-blue-400 hover:text-blue-300",
      description: "Connect professionally",
      username: "@karim",
      verified: true
    },
    { 
      icon: Twitter, 
      label: "Twitter", 
      href: "https://twitter.com/karim", 
      color: "text-sky-400 hover:text-sky-300",
      description: "Follow my latest updates",
      username: "@karim"
    },
    { 
      icon: Instagram, 
      label: "Instagram", 
      href: "https://instagram.com/karim", 
      color: "text-pink-400 hover:text-pink-300",
      description: "See behind the scenes",
      username: "@karim"
    },
    { 
      icon: Youtube, 
      label: "YouTube", 
      href: "https://youtube.com/@karim", 
      color: "text-red-500 hover:text-red-400",
      description: "Watch my tech tutorials",
      username: "@karim"
    },
    { 
      icon: Globe, 
      label: "Website", 
      href: "https://kygroup.com", 
      color: "text-green-400 hover:text-green-300",
      description: "Visit my main website",
      username: "kygroup.com"
    },
    { 
      icon: MessageCircle, 
      label: "Discord", 
      href: "https://discord.gg/karim", 
      color: "text-indigo-400 hover:text-indigo-300",
      description: "Join our community",
      username: "Karim#1234"
    }
  ]

  const getButtonSize = () => {
    switch (size) {
      case "sm": return showLabels ? "h-12" : "h-10 w-10"
      case "lg": return showLabels ? "h-20" : "h-16 w-16"
      default: return showLabels ? "h-16" : "h-12 w-12"
    }
  }

  const getIconSize = () => {
    switch (size) {
      case "sm": return "h-4 w-4"
      case "lg": return "h-8 w-8"
      default: return "h-6 w-6"
    }
  }

  const getGridCols = () => {
    switch (layout) {
      case "horizontal": return "flex flex-wrap justify-center gap-4"
      case "vertical": return "flex flex-col gap-4"
      case "compact": return "flex gap-2"
      default: return "grid grid-cols-2 md:grid-cols-4 gap-4"
    }
  }

  const renderSocialButton = (link: SocialLink, index: number) => {
    const ButtonContent = (
      <Button
        variant="ghost"
        className={`${getButtonSize()} ${showLabels ? 'flex-col gap-2' : 'p-0'} border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all duration-300 ${animated ? 'hover:scale-105' : ''} group relative overflow-hidden`}
        asChild
      >
        <Link href={link.href} target="_blank" rel="noopener noreferrer">
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          )}
          <link.icon className={`${getIconSize()} ${link.color} transition-colors duration-300`} />
          {showLabels && (
            <div className="flex flex-col items-center gap-1">
              <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} font-medium`}>
                {link.label}
              </span>
              {link.verified && (
                <Badge variant="secondary" className="text-xs px-1 py-0 bg-blue-500/20 text-blue-300">
                  ✓
                </Badge>
              )}
            </div>
          )}
          {!showLabels && link.verified && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-slate-800" />
          )}
        </Link>
      </Button>
    )

    if (showTooltips) {
      return (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              {ButtonContent}
            </TooltipTrigger>
            <TooltipContent 
              side="bottom" 
              className="bg-slate-800 border-slate-700 text-slate-100"
            >
              <div className="text-center">
                <p className="font-medium">{link.label}</p>
                {link.username && (
                  <p className="text-xs text-slate-400">{link.username}</p>
                )}
                {link.description && (
                  <p className="text-xs text-slate-300 mt-1">{link.description}</p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return <div key={index}>{ButtonContent}</div>
  }

  if (layout === "compact") {
    return (
      <div className="flex justify-center gap-2 flex-wrap">
        {socialLinks.slice(0, 6).map((link, index) => renderSocialButton(link, index))}
      </div>
    )
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
      <CardHeader className="text-center">
        <CardTitle className="text-white flex items-center justify-center gap-2">
          <MessageCircle className="h-5 w-5 text-purple-400" />
          Let's Connect
        </CardTitle>
        <CardDescription className="text-slate-300">
          Find me across different platforms and let's start a conversation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={getGridCols()}>
          {socialLinks.map((link, index) => renderSocialButton(link, index))}
        </div>
        
        {showStats && (
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-xs text-slate-400">Connections</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1.2K</p>
                <p className="text-xs text-slate-400">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">30+</p>
                <p className="text-xs text-slate-400">Projects</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}