"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Users, UserPlus, LogIn, LogOut, Trash2, Edit } from "lucide-react"
import { FamilyFileManager } from "./family-file-manager"

interface FamilyMember {
  id: string
  name: string
  username: string
  role: "admin" | "member"
  folderPath: string
  createdAt: string
  lastLogin?: string
  isActive: boolean
}

interface FamilySession {
  memberId: string
  memberName: string
  username: string
  role: "admin" | "member"
  folderPath: string
}

export function FamilyAuthManager() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [currentSession, setCurrentSession] = useState<FamilySession | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [addMemberForm, setAddMemberForm] = useState({
    name: "",
    username: "",
    password: "",
    role: "member" as const,
  })

  useEffect(() => {
    loadFamilyData()
    loadCurrentSession()
  }, [])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("yandex_token")
    if (!token) {
      toast.error("Please connect to Yandex Disk first")
      return null
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  const loadFamilyData = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch("/api/yandex/family", { headers })
      if (response.ok) {
        const data = await response.json()
        setFamilyMembers(data.members || [])
      }
    } catch (error) {
      console.error("Failed to load family data:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadCurrentSession = () => {
    const sessionData = localStorage.getItem("family_session")
    if (sessionData) {
      try {
        setCurrentSession(JSON.parse(sessionData))
      } catch (error) {
        localStorage.removeItem("family_session")
      }
    }
  }

  const saveSession = (session: FamilySession) => {
    localStorage.setItem("family_session", JSON.stringify(session))
    setCurrentSession(session)
  }

  const clearSession = () => {
    localStorage.removeItem("family_session")
    setCurrentSession(null)
  }

  const handleLogin = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch("/api/yandex/family/login", {
        method: "POST",
        headers,
        body: JSON.stringify(loginForm),
      })

      if (response.ok) {
        const sessionData = await response.json()
        saveSession(sessionData)
        setIsLoginDialogOpen(false)
        setLoginForm({ username: "", password: "" })
        toast.success(`Welcome back, ${sessionData.memberName}!`)

        // Update last login
        loadFamilyData()
      } else {
        const error = await response.text()
        toast.error(`Login failed: ${error}`)
      }
    } catch (error) {
      toast.error("Login failed")
      console.error("Login error:", error)
    }
  }

  const handleAddMember = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch("/api/yandex/family/members", {
        method: "POST",
        headers,
        body: JSON.stringify(addMemberForm),
      })

      if (response.ok) {
        const newMember = await response.json()
        toast.success(`Family member ${newMember.name} added successfully!`)
        setIsAddMemberDialogOpen(false)
        setAddMemberForm({ name: "", username: "", password: "", role: "member" })
        loadFamilyData()
      } else {
        const error = await response.text()
        toast.error(`Failed to add member: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to add family member")
      console.error("Add member error:", error)
    }
  }

  const handleDeleteMember = async (memberId: string) => {
    if (
      !confirm("Are you sure you want to remove this family member? This will also delete their folder and all files.")
    ) {
      return
    }

    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch(`/api/yandex/family/members/${memberId}`, {
        method: "DELETE",
        headers,
      })

      if (response.ok) {
        toast.success("Family member removed successfully")
        loadFamilyData()
      } else {
        const error = await response.text()
        toast.error(`Failed to remove member: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to remove family member")
      console.error("Delete member error:", error)
    }
  }

  const handleLogout = () => {
    clearSession()
    toast.success("Logged out successfully")
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

  // If logged in, show the file manager
  if (currentSession) {
    return (
      <div className="space-y-6">
        {/* Session Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Welcome, {currentSession.memberName}</CardTitle>
                  <CardDescription>
                    Logged in as {currentSession.username} • {currentSession.role}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={currentSession.role === "admin" ? "default" : "secondary"}>{currentSession.role}</Badge>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* File Manager */}
        <FamilyFileManager session={currentSession} />
      </div>
    )
  }

  // Login/Registration Interface
  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card className="text-center">
        <CardHeader>
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Family Access Portal</CardTitle>
          <CardDescription className="text-lg">Secure file management for family members</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Family Member Login</DialogTitle>
                  <DialogDescription>Enter your credentials to access your personal folder</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsLoginDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleLogin}>Login</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Add Family Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Family Member</DialogTitle>
                  <DialogDescription>Create a new family member account with their own folder</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={addMemberForm.name}
                      onChange={(e) => setAddMemberForm({ ...addMemberForm, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-username">Username</Label>
                    <Input
                      id="new-username"
                      value={addMemberForm.username}
                      onChange={(e) => setAddMemberForm({ ...addMemberForm, username: e.target.value })}
                      placeholder="Choose a username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={addMemberForm.password}
                      onChange={(e) => setAddMemberForm({ ...addMemberForm, password: e.target.value })}
                      placeholder="Create a password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={addMemberForm.role}
                      onValueChange={(value: any) => setAddMemberForm({ ...addMemberForm, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddMember}>Add Member</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Family Members List */}
      {familyMembers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Family Members ({familyMembers.length})</span>
            </CardTitle>
            <CardDescription>Registered family members and their access levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{member.name}</span>
                        <Badge variant={member.role === "admin" ? "default" : "secondary"}>{member.role}</Badge>
                        {!member.isActive && <Badge variant="destructive">Inactive</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        @{member.username} • Folder: {member.folderPath}
                      </div>
                      {member.lastLogin && (
                        <div className="text-xs text-muted-foreground">
                          Last login: {new Date(member.lastLogin).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteMember(member.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {familyMembers.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <UserPlus className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No Family Members Yet</h3>
                <p className="text-muted-foreground">
                  Add your first family member to get started with secure file sharing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
