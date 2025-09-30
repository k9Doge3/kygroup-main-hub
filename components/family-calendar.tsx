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
import { Calendar, Plus, Edit, Trash2, Clock, MapPin, ChevronLeft, ChevronRight, User } from "lucide-react"
import { getUserColorClasses, getUserColorVars } from "@/lib/user-colors"

interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  startTime?: string
  endTime?: string
  location?: string
  category: string
  priority: "low" | "medium" | "high"
  isAllDay: boolean
  isRecurring: boolean
  recurringPattern?: string
  attendees: string[]
  createdBy: string
  color: string
  createdAt: string
  updatedAt: string
}

const eventCategories = ["Personal", "Work", "Family", "Health", "Education", "Social", "Travel", "Other"]

const eventColors = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#10b981", // green
  "#f59e0b", // yellow
  "#8b5cf6", // purple
  "#06b6d4", // cyan
  "#f97316", // orange
  "#84cc16", // lime
]

const priorityColors = {
  low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function FamilyCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [familyMembers, setFamilyMembers] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<string>("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "Personal",
    priority: "medium" as const,
    isAllDay: false,
    isRecurring: false,
    recurringPattern: "",
    attendees: [] as string[],
    color: eventColors[0],
  })

  useEffect(() => {
    loadEvents()
    loadFamilyMembers()
    const sessionData = localStorage.getItem("user_session")
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData)
        setCurrentUser(session.userName || "")
      } catch (error) {
        console.error("Failed to load user session:", error)
        setCurrentUser(localStorage.getItem("family_member_name") || "")
      }
    } else {
      setCurrentUser(localStorage.getItem("family_member_name") || "")
    }
  }, [])

  const userColors = getUserColorClasses(currentUser)
  const userColorVars = getUserColorVars(currentUser)

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

  const loadEvents = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch("/api/yandex/family/calendar", { headers })
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error("Failed to load events:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadFamilyMembers = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch("/api/yandex/family/members", { headers })
      if (response.ok) {
        const data = await response.json()
        setFamilyMembers(data.members?.map((m: any) => m.name) || [])
      }
    } catch (error) {
      console.error("Failed to load family members:", error)
    }
  }

  const saveEvent = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const eventData: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt"> = {
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate || formData.startDate,
        startTime: formData.isAllDay ? undefined : formData.startTime,
        endTime: formData.isAllDay ? undefined : formData.endTime,
        location: formData.location,
        category: formData.category,
        priority: formData.priority,
        isAllDay: formData.isAllDay,
        isRecurring: formData.isRecurring,
        recurringPattern: formData.recurringPattern,
        attendees: formData.attendees,
        createdBy: currentUser,
        color: formData.color,
      }

      const url = editingEvent ? `/api/yandex/family/calendar/${editingEvent.id}` : "/api/yandex/family/calendar"
      const method = editingEvent ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(eventData),
      })

      if (response.ok) {
        toast.success(editingEvent ? "Event updated!" : "Event created!")
        setIsDialogOpen(false)
        resetForm()
        loadEvents()
      } else {
        const error = await response.text()
        toast.error(`Failed to save event: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to save event")
      console.error("Save error:", error)
    }
  }

  const deleteEvent = async (id: string) => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch(`/api/yandex/family/calendar/${id}`, {
        method: "DELETE",
        headers,
      })

      if (response.ok) {
        toast.success("Event deleted!")
        loadEvents()
      } else {
        toast.error("Failed to delete event")
      }
    } catch (error) {
      toast.error("Failed to delete event")
      console.error("Delete error:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      location: "",
      category: "Personal",
      priority: "medium",
      isAllDay: false,
      isRecurring: false,
      recurringPattern: "",
      attendees: [],
      color: eventColors[0],
    })
    setEditingEvent(null)
  }

  const openEditDialog = (event: CalendarEvent) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description || "",
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime || "",
      endTime: event.endTime || "",
      location: event.location || "",
      category: event.category,
      priority: event.priority,
      isAllDay: event.isAllDay,
      isRecurring: event.isRecurring,
      recurringPattern: event.recurringPattern || "",
      attendees: event.attendees,
      color: event.color,
    })
    setIsDialogOpen(true)
  }

  const filteredEvents = events.filter((event) => {
    if (selectedCategory !== "all" && event.category !== selectedCategory) return false
    return true
  })

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return filteredEvents.filter((event) => event.startDate <= dateStr && event.endDate >= dateStr)
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-semibold min-w-[200px] text-center">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {eventCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingEvent ? "Edit Event" : "Add Event"}</DialogTitle>
                <DialogDescription>Create or edit a calendar event</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {currentUser && (
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 ${userColors.border} ${userColors.secondary}/10`}
                    style={userColorVars}
                  >
                    <div className={`p-2 rounded-full ${userColors.background}`} style={userColorVars}>
                      <User className={`h-4 w-4 ${userColors.text}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${userColors.primary}`} style={userColorVars}>
                          {currentUser}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          is {editingEvent ? "editing" : "creating"} an event
                        </span>
                      </div>
                      {editingEvent && (
                        <Badge variant="outline" className={`text-xs ${userColors.border}`} style={userColorVars}>
                          {editingEvent.title}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Event title"
                    className={currentUser ? `border-2 ${userColors.border}` : ""}
                    style={currentUser ? userColorVars : {}}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Event description"
                    rows={3}
                    className={currentUser ? `border-2 ${userColors.border}` : ""}
                    style={currentUser ? userColorVars : {}}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {eventCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isAllDay"
                    checked={formData.isAllDay}
                    onChange={(e) => setFormData({ ...formData, isAllDay: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="isAllDay">All Day Event</Label>
                </div>

                {!formData.isAllDay && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Event location"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Event Color</Label>
                  <div className="flex gap-2">
                    {eventColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-8 h-8 rounded-full border-2 ${
                          formData.color === color ? "border-gray-800 dark:border-gray-200" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData({ ...formData, color })}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveEvent}>{editingEvent ? "Update" : "Create"}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <div className="grid grid-cols-7 gap-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-semibold text-sm text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth().map((date, index) => (
              <div
                key={index}
                className={`min-h-[120px] p-2 border rounded-lg ${
                  date ? "bg-background hover:bg-muted/50" : "bg-muted/20"
                } ${date && date.toDateString() === new Date().toDateString() ? "ring-2 ring-primary" : ""}`}
              >
                {date && (
                  <>
                    <div className="font-semibold text-sm mb-1">{date.getDate()}</div>
                    <div className="space-y-1">
                      {getEventsForDate(date)
                        .slice(0, 3)
                        .map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded cursor-pointer hover:opacity-80 text-white"
                            style={{ backgroundColor: event.color }}
                            onClick={() => openEditDialog(event)}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            {!event.isAllDay && event.startTime && <div className="opacity-90">{event.startTime}</div>}
                          </div>
                        ))}
                      {getEventsForDate(date).length > 3 && (
                        <div className="text-xs text-muted-foreground">+{getEventsForDate(date).length - 3} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your next events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredEvents
              .filter((event) => new Date(event.startDate) >= new Date())
              .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: event.color }} />
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(event.startDate).toLocaleDateString()}
                        </span>
                        {!event.isAllDay && event.startTime && (
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.startTime}
                          </span>
                        )}
                        {event.location && (
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={priorityColors[event.priority]}>{event.priority}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(event)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteEvent(event.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            {filteredEvents.filter((event) => new Date(event.startDate) >= new Date()).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No upcoming events</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
