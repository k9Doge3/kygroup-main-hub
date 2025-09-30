"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Home, 
  Briefcase, 
  Users, 
  FolderOpen, 
  Calendar, 
  CheckSquare, 
  DollarSign, 
  Menu, 
  ArrowLeft, 
  Code2,
  User,
  LogIn,
  LogOut,
  Settings,
  Shield,
  Cloud
} from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: Code2 },
  { name: "Resume", href: "/resume", icon: User },
  { name: "Hub", href: "/family", icon: Users },
  { name: "Files", href: "/files", icon: FolderOpen },
  { name: "Auth", href: "/auth/supabase", icon: Shield },
]

const familyNavigation = [
  { name: "Calendar", href: "/family/calendar", icon: Calendar },
  { name: "Todo Lists", href: "/family/todos", icon: CheckSquare },
  { name: "Finances", href: "/family/finances", icon: DollarSign },
  { name: "Files", href: "/family/files", icon: FolderOpen },
]

interface MainNavigationProps {
  showFamilyNav?: boolean
}

export function MainNavigation({ showFamilyNav = false }: MainNavigationProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = showFamilyNav ? familyNavigation : navigation

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/70 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            {showFamilyNav && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all duration-200 smooth-hover" 
                asChild
              >
                <Link href="/family">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hub
                </Link>
              </Button>
            )}
            <Link 
              href="/" 
              className="font-bold text-xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              Digital Space
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Button 
                  key={item.href} 
                  variant={isActive ? "default" : "ghost"} 
                  size="sm" 
                  className={`
                    relative overflow-hidden transition-all duration-300 smooth-hover
                    ${isActive 
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25" 
                      : "text-slate-300 hover:text-white hover:bg-slate-800/70 hover:shadow-md"
                    }
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-600/20 before:to-blue-600/20 
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                  `}
                  asChild
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4 mr-2 relative z-10" />
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </Button>
              )
            })}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all duration-200"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-slate-950/95 border-slate-800/50 backdrop-blur-xl">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="font-semibold text-lg mb-4 text-white">
                  {showFamilyNav ? "Hub Navigation" : "Main Navigation"}
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={`
                        justify-start transition-all duration-300 smooth-hover
                        ${isActive 
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg" 
                          : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                        }
                      `}
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={item.href}>
                        <Icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
