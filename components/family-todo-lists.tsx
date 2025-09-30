"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Plus, Edit, Trash2, CheckCircle2, Circle, Calendar, Flag, Search, Target, Rocket } from "lucide-react"

interface TodoItem {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high"
  category: string
  dueDate?: string
  tags: string[]
  createdBy: string
  createdAt: string
  updatedAt: string
  completedAt?: string
}

interface TodoList {
  id: string
  name: string
  description?: string
  color: string
  items: TodoItem[]
  createdAt: string
  updatedAt: string
}

const todoCategories = ["Development", "Design", "Research", "Marketing", "Business", "Learning", "Personal", "Other"]

const priorityColors = {
  low: "bg-green-500/20 text-green-300 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  high: "bg-red-500/20 text-red-300 border-red-500/30",
}

const listColors = [
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#06b6d4", // cyan
  "#10b981", // green
  "#f59e0b", // yellow
  "#ef4444", // red
  "#f97316", // orange
  "#84cc16", // lime
]

export function FamilyTodoLists() {
  const [todoLists, setTodoLists] = useState<TodoList[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedList, setSelectedList] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [showCompleted, setShowCompleted] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isListDialogOpen, setIsListDialogOpen] = useState(false)
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)
  const [editingList, setEditingList] = useState<TodoList | null>(null)
  const [editingItem, setEditingItem] = useState<TodoItem | null>(null)
  const [currentUser, setCurrentUser] = useState<string>("")

  const [listFormData, setListFormData] = useState({
    name: "",
    description: "",
    color: listColors[0],
  })

  const [itemFormData, setItemFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    category: "Development",
    dueDate: "",
    tags: "",
  })

  useEffect(() => {
    loadTodoLists()
    setCurrentUser(localStorage.getItem("family_member_name") || "")
  }, [])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("yandex_token")
    const familyToken = localStorage.getItem("family_auth_token")
    if (!token || !familyToken) {
      toast.error("Please authenticate first")
      return null
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Family-Token": familyToken,
    }
  }

  const loadTodoLists = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch("/api/yandex/family/todos", { headers })
      if (response.ok) {
        const data = await response.json()
        setTodoLists(data.lists || [])
        if (data.lists?.length > 0 && !selectedList) {
          setSelectedList(data.lists[0].id)
        }
      }
    } catch (error) {
      console.error("Failed to load todo lists:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveList = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const listData: Omit<TodoList, "id" | "items" | "createdAt" | "updatedAt"> = {
        name: listFormData.name,
        description: listFormData.description,
        color: listFormData.color,
      }

      const url = editingList ? `/api/yandex/family/todos/lists/${editingList.id}` : "/api/yandex/family/todos/lists"
      const method = editingList ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(listData),
      })

      if (response.ok) {
        toast.success(editingList ? "Project updated!" : "Project created!")
        setIsListDialogOpen(false)
        resetListForm()
        loadTodoLists()
      } else {
        const error = await response.text()
        toast.error(`Failed to save project: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to save project")
      console.error("Save error:", error)
    }
  }

  const saveItem = async () => {
    if (!selectedList) return

    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const itemData: Omit<TodoItem, "id" | "createdAt" | "updatedAt" | "completedAt"> = {
        title: itemFormData.title,
        description: itemFormData.description,
        completed: false,
        priority: itemFormData.priority,
        category: itemFormData.category,
        dueDate: itemFormData.dueDate,
        tags: itemFormData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        createdBy: currentUser,
      }

      const url = editingItem
        ? `/api/yandex/family/todos/lists/${selectedList}/items/${editingItem.id}`
        : `/api/yandex/family/todos/lists/${selectedList}/items`
      const method = editingItem ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(itemData),
      })

      if (response.ok) {
        toast.success(editingItem ? "Objective updated!" : "Objective created!")
        setIsItemDialogOpen(false)
        resetItemForm()
        loadTodoLists()
      } else {
        const error = await response.text()
        toast.error(`Failed to save objective: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to save objective")
      console.error("Save error:", error)
    }
  }

  const toggleItemComplete = async (listId: string, itemId: string, completed: boolean) => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch(`/api/yandex/family/todos/lists/${listId}/items/${itemId}/toggle`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ completed }),
      })

      if (response.ok) {
        loadTodoLists()
        toast.success(completed ? "Objective completed!" : "Objective reopened!")
      } else {
        toast.error("Failed to update objective")
      }
    } catch (error) {
      toast.error("Failed to update objective")
      console.error("Toggle error:", error)
    }
  }

  const deleteList = async (id: string) => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch(`/api/yandex/family/todos/lists/${id}`, {
        method: "DELETE",
        headers,
      })

      if (response.ok) {
        toast.success("Project deleted!")
        if (selectedList === id) {
          setSelectedList(null)
        }
        loadTodoLists()
      } else {
        toast.error("Failed to delete project")
      }
    } catch (error) {
      toast.error("Failed to delete project")
      console.error("Delete error:", error)
    }
  }

  const deleteItem = async (listId: string, itemId: string) => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch(`/api/yandex/family/todos/lists/${listId}/items/${itemId}`, {
        method: "DELETE",
        headers,
      })

      if (response.ok) {
        toast.success("Objective deleted!")
        loadTodoLists()
      } else {
        toast.error("Failed to delete objective")
      }
    } catch (error) {
      toast.error("Failed to delete objective")
      console.error("Delete error:", error)
    }
  }

  const resetListForm = () => {
    setListFormData({
      name: "",
      description: "",
      color: listColors[0],
    })
    setEditingList(null)
  }

  const resetItemForm = () => {
    setItemFormData({
      title: "",
      description: "",
      priority: "medium",
      category: "Development",
      dueDate: "",
      tags: "",
    })
    setEditingItem(null)
  }

  const openEditListDialog = (list: TodoList) => {
    setEditingList(list)
    setListFormData({
      name: list.name,
      description: list.description || "",
      color: list.color,
    })
    setIsListDialogOpen(true)
  }

  const openEditItemDialog = (item: TodoItem) => {
    setEditingItem(item)
    setItemFormData({
      title: item.title,
      description: item.description || "",
      priority: item.priority,
      category: item.category,
      dueDate: item.dueDate || "",
      tags: item.tags.join(", "),
    })
    setIsItemDialogOpen(true)
  }

  const currentList = todoLists.find((list) => list.id === selectedList)

  const filteredItems =
    currentList?.items.filter((item) => {
      if (!showCompleted && item.completed) return false
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false
      if (selectedPriority !== "all" && item.priority !== selectedPriority) return false
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    }) || []

  const completedCount = currentList?.items.filter((item) => item.completed).length || 0
  const totalCount = currentList?.items.length || 0
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-700/50 rounded w-1/3 mb-4"></div>
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-700/50 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
            <Target className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">My Projects</h1>
            <p className="text-slate-300">Organize your objectives and achieve your goals</p>
          </div>
        </div>

        <Dialog open={isListDialogOpen} onOpenChange={setIsListDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetListForm}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">{editingList ? "Edit Project" : "Create New Project"}</DialogTitle>
              <DialogDescription className="text-slate-300">
                Create a new project to organize your objectives
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="listName" className="text-white">
                  Project Name
                </Label>
                <Input
                  id="listName"
                  value={listFormData.name}
                  onChange={(e) => setListFormData({ ...listFormData, name: e.target.value })}
                  placeholder="My awesome project"
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="listDescription" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="listDescription"
                  value={listFormData.description}
                  onChange={(e) => setListFormData({ ...listFormData, description: e.target.value })}
                  placeholder="What is this project about?"
                  rows={3}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Project Color</Label>
                <div className="flex gap-2">
                  {listColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 ${
                        listFormData.color === color ? "border-white" : "border-slate-600"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setListFormData({ ...listFormData, color })}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsListDialogOpen(false)}
                  className="border-slate-600 text-slate-300"
                >
                  Cancel
                </Button>
                <Button onClick={saveList} className="bg-gradient-to-r from-purple-600 to-blue-600">
                  {editingList ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Projects Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Rocket className="h-5 w-5 text-purple-400" />
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {todoLists.map((list) => (
                <div
                  key={list.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedList === list.id ? "bg-purple-500/20 border border-purple-500/30" : "hover:bg-slate-800/50"
                  }`}
                  onClick={() => setSelectedList(list.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: list.color }} />
                    <div>
                      <div className="font-medium text-sm text-white">{list.name}</div>
                      <div className="text-xs text-slate-400">{list.items.length} objectives</div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        openEditListDialog(list)
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteList(list.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {todoLists.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">No projects yet. Create your first one!</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {currentList ? (
            <div className="space-y-6">
              {/* Project Header */}
              <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: currentList.color }} />
                      <div>
                        <CardTitle className="text-2xl text-white">{currentList.name}</CardTitle>
                        {currentList.description && (
                          <CardDescription className="text-slate-300">{currentList.description}</CardDescription>
                        )}
                      </div>
                    </div>
                    <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={resetItemForm}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Objective
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-slate-700 text-white">
                        <DialogHeader>
                          <DialogTitle className="text-white">
                            {editingItem ? "Edit Objective" : "Add New Objective"}
                          </DialogTitle>
                          <DialogDescription className="text-slate-300">
                            Create a new objective in {currentList.name}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="taskTitle" className="text-white">
                              Objective Title
                            </Label>
                            <Input
                              id="taskTitle"
                              value={itemFormData.title}
                              onChange={(e) => setItemFormData({ ...itemFormData, title: e.target.value })}
                              placeholder="What needs to be accomplished?"
                              className="bg-slate-800 border-slate-600 text-white"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="taskDescription" className="text-white">
                              Description
                            </Label>
                            <Textarea
                              id="taskDescription"
                              value={itemFormData.description}
                              onChange={(e) => setItemFormData({ ...itemFormData, description: e.target.value })}
                              placeholder="Additional details..."
                              rows={3}
                              className="bg-slate-800 border-slate-600 text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="taskCategory" className="text-white">
                                Category
                              </Label>
                              <Select
                                value={itemFormData.category}
                                onValueChange={(value) => setItemFormData({ ...itemFormData, category: value })}
                              >
                                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-600">
                                  {todoCategories.map((category) => (
                                    <SelectItem key={category} value={category} className="text-white">
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="taskPriority" className="text-white">
                                Priority
                              </Label>
                              <Select
                                value={itemFormData.priority}
                                onValueChange={(value: any) => setItemFormData({ ...itemFormData, priority: value })}
                              >
                                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-600">
                                  <SelectItem value="low" className="text-white">
                                    Low
                                  </SelectItem>
                                  <SelectItem value="medium" className="text-white">
                                    Medium
                                  </SelectItem>
                                  <SelectItem value="high" className="text-white">
                                    High
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="taskDueDate" className="text-white">
                              Target Date
                            </Label>
                            <Input
                              id="taskDueDate"
                              type="date"
                              value={itemFormData.dueDate}
                              onChange={(e) => setItemFormData({ ...itemFormData, dueDate: e.target.value })}
                              className="bg-slate-800 border-slate-600 text-white"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="taskTags" className="text-white">
                              Tags
                            </Label>
                            <Input
                              id="taskTags"
                              value={itemFormData.tags}
                              onChange={(e) => setItemFormData({ ...itemFormData, tags: e.target.value })}
                              placeholder="urgent, milestone, feature (comma separated)"
                              className="bg-slate-800 border-slate-600 text-white"
                            />
                          </div>

                          <div className="flex justify-end space-x-2 pt-4">
                            <Button
                              variant="outline"
                              onClick={() => setIsItemDialogOpen(false)}
                              className="border-slate-600 text-slate-300"
                            >
                              Cancel
                            </Button>
                            <Button onClick={saveItem} className="bg-gradient-to-r from-green-600 to-emerald-600">
                              {editingItem ? "Update" : "Create"}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-300">
                      {completedCount} of {totalCount} objectives completed
                    </div>
                    <div className="text-sm font-medium text-white">{completionPercentage}%</div>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 mt-2">
                    <div
                      className="h-3 rounded-full transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{
                        width: `${completionPercentage}%`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Filters */}
              <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search objectives..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-48 bg-slate-800 border-slate-600 text-white"
                      />
                    </div>

                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[140px] bg-slate-800 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="all" className="text-white">
                          All Categories
                        </SelectItem>
                        {todoCategories.map((category) => (
                          <SelectItem key={category} value={category} className="text-white">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger className="w-[120px] bg-slate-800 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="all" className="text-white">
                          All Priorities
                        </SelectItem>
                        <SelectItem value="high" className="text-white">
                          High
                        </SelectItem>
                        <SelectItem value="medium" className="text-white">
                          Medium
                        </SelectItem>
                        <SelectItem value="low" className="text-white">
                          Low
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant={showCompleted ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowCompleted(!showCompleted)}
                      className={
                        showCompleted
                          ? "bg-gradient-to-r from-purple-600 to-blue-600"
                          : "border-slate-600 text-slate-300"
                      }
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Show Completed
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Objectives */}
              <div className="space-y-3">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`transition-all duration-200 border-slate-700/50 bg-slate-900/50 backdrop-blur-sm ${
                      item.completed ? "opacity-60" : ""
                    }`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleItemComplete(currentList.id, item.id, !item.completed)}
                          className="mt-1"
                        >
                          {item.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                          ) : (
                            <Circle className="h-5 w-5 text-slate-400 hover:text-green-400" />
                          )}
                        </button>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3
                              className={`font-medium ${item.completed ? "line-through text-slate-400" : "text-white"}`}
                            >
                              {item.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={priorityColors[item.priority]}>
                                <Flag className="h-3 w-3 mr-1" />
                                {item.priority}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditItemDialog(item)}
                                className="text-slate-400 hover:text-white"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteItem(currentList.id, item.id)}
                                className="text-slate-400 hover:text-red-400"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {item.description && (
                            <p className={`text-sm ${item.completed ? "text-slate-500" : "text-slate-300"}`}>
                              {item.description}
                            </p>
                          )}

                          <div className="flex items-center space-x-4 text-xs text-slate-400">
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                              {item.category}
                            </Badge>
                            {item.dueDate && (
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(item.dueDate).toLocaleDateString()}
                              </span>
                            )}
                            {item.tags.length > 0 && (
                              <div className="flex gap-1">
                                {item.tags.map((tag) => (
                                  <Badge key={tag} className="text-xs bg-slate-700/50 text-slate-300 border-slate-600">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredItems.length === 0 && (
                  <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
                    <CardContent className="text-center py-12">
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-slate-700/50 rounded-full flex items-center justify-center">
                          <Target className="h-8 w-8 text-slate-400" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-white">No objectives found</h3>
                          <p className="text-slate-400">
                            {searchQuery || selectedCategory !== "all" || selectedPriority !== "all"
                              ? "Try adjusting your filters"
                              : "Add your first objective to get started"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-slate-700/50 rounded-full flex items-center justify-center">
                    <Rocket className="h-8 w-8 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">No project selected</h3>
                    <p className="text-slate-400">
                      Select a project from the sidebar or create a new one to get started
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
