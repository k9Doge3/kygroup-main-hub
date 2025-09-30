"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Users, LogOut, User } from "lucide-react"
import { FamilyFileManager } from "./family-file-manager"
import { getUserColorClasses, getUserColorVars } from "@/lib/user-colors"

interface SimpleUser {
  name: string
  joinedAt: string
  lastActive: string
}

interface UserSession {
  userName: string
  joinedAt: string
}

export function SimpleNameManager() {
  const [users, setUsers] = useState<SimpleUser[]>([])
  const [currentSession, setCurrentSession] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    loadUsers()
    loadCurrentSession()
  }, [])

  useEffect(() => {
    if (!loading && !currentSession) {
      setIsJoinDialogOpen(true)
    }
  }, [loading, currentSession])

  const loadUsers = async () => {
    try {
      const storedUsers = localStorage.getItem("simple_users")
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers))
      }
    } catch (error) {
      console.error("Failed to load users:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadCurrentSession = () => {
    const sessionData = localStorage.getItem("user_session")
    if (sessionData) {
      try {
        setCurrentSession(JSON.parse(sessionData))
      } catch (error) {
        localStorage.removeItem("user_session")
      }
    }
  }

  const saveSession = (session: UserSession) => {
    localStorage.setItem("user_session", JSON.stringify(session))
    setCurrentSession(session)
  }

  const clearSession = () => {
    localStorage.removeItem("user_session")
    setCurrentSession(null)
    setIsJoinDialogOpen(true)
  }

  const handleJoin = async () => {
    if (!userName.trim()) {
      toast.error("Please enter your name")
      return
    }

    try {
      const now = new Date().toISOString()
      const existingUsers = JSON.parse(localStorage.getItem("simple_users") || "[]")

      const existingUserIndex = existingUsers.findIndex(
        (u: SimpleUser) => u.name.toLowerCase() === userName.toLowerCase(),
      )

      if (existingUserIndex >= 0) {
        existingUsers[existingUserIndex].lastActive = now
        toast.success(`Welcome back, ${userName}!`)
      } else {
        const newUser: SimpleUser = {
          name: userName,
          joinedAt: now,
          lastActive: now,
        }
        existingUsers.push(newUser)
        toast.success(`Welcome, ${userName}! You've joined the community.`)
      }

      localStorage.setItem("simple_users", JSON.stringify(existingUsers))
      setUsers(existingUsers)

      const session: UserSession = {
        userName: userName,
        joinedAt: now,
      }

      saveSession(session)
      setIsJoinDialogOpen(false)
      setUserName("")
    } catch (error) {
      toast.error("Failed to join")
      console.error("Join error:", error)
    }
  }

  const handleLogout = () => {
    clearSession()
    toast.success("See you later!")
  }

  const handleDialogClose = (open: boolean) => {
    if (!open && !currentSession) {
      return
    }
    setIsJoinDialogOpen(open)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentSession) {
    const userColors = getUserColorClasses(currentSession.userName)
    const userColorVars = getUserColorVars(currentSession.userName)

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${userColors.background}`}
                  style={userColorVars}
                >
                  <User className={`h-5 w-5 ${userColors.text}`} />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>Welcome, </span>
                    <span className={userColors.primary} style={userColorVars}>
                      {currentSession.userName}
                    </span>
                  </CardTitle>
                  <CardDescription>Joined on {new Date(currentSession.joinedAt).toLocaleDateString()}</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="secondary"
                  className={`${userColors.background} ${userColors.text}`}
                  style={userColorVars}
                >
                  Active User
                </Badge>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Leave
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <FamilyFileManager
          session={{
            memberId: currentSession.userName,
            memberName: currentSession.userName,
            username: currentSession.userName,
            role: "member" as const,
            folderPath: `/users/${currentSession.userName}`,
          }}
        />

        <Dialog open={isJoinDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle className="text-center">What's your name?</DialogTitle>
              <DialogDescription className="text-center">
                Just enter your name to access your personal space
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                  autoFocus
                />
              </div>
              <div className="flex justify-center pt-4">
                <Button onClick={handleJoin} className="w-full">
                  Join Community
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Dialog open={isJoinDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-center">What's your name?</DialogTitle>
            <DialogDescription className="text-center">
              Just enter your name to access your personal space
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                autoFocus
              />
            </div>
            <div className="flex justify-center pt-4">
              <Button onClick={handleJoin} className="w-full">
                Join Community
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="text-center opacity-50">
        <CardHeader>
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to the Community</CardTitle>
          <CardDescription className="text-lg">
            Just enter your name to get started - no signup required!
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
