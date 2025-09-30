import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

interface UserActivity {
  id: string
  email: string
  name: string
  provider: string
  signupDate: string
  lastLogin: string
  isOnline: boolean
  sessionCount: number
  guestSessions?: number
}

// In a real app, this would be stored in a database
// For now, we'll use Yandex Disk to store user analytics
let userAnalytics: UserActivity[] = []

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Only allow authenticated admins to view analytics
    if (!session || session.user?.email !== "admin@kygroup.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real implementation, fetch from Yandex Disk or database
    // For demo, return sample data + any tracked data
    const sampleAnalytics: UserActivity[] = [
      {
        id: "1",
        email: "john.doe@example.com",
        name: "John Doe",
        provider: "google",
        signupDate: "2025-09-25T10:30:00Z",
        lastLogin: "2025-09-30T08:15:00Z",
        isOnline: true,
        sessionCount: 47
      },
      {
        id: "2",
        email: "jane.smith@example.com", 
        name: "Jane Smith",
        provider: "github",
        signupDate: "2025-09-20T14:22:00Z",
        lastLogin: "2025-09-29T16:45:00Z",
        isOnline: false,
        sessionCount: 23
      },
      {
        id: "3",
        email: "mike.wilson@example.com",
        name: "Mike Wilson", 
        provider: "credentials",
        signupDate: "2025-09-28T09:10:00Z",
        lastLogin: "2025-09-30T07:30:00Z",
        isOnline: true,
        sessionCount: 12
      },
      ...userAnalytics
    ]

    // Add guest analytics
    const guestAnalytics = {
      totalGuestSessions: 156,
      activeGuestSessions: 8,
      avgGuestSessionDuration: "12 minutes"
    }

    return NextResponse.json({
      users: sampleAnalytics,
      guests: guestAnalytics,
      summary: {
        totalUsers: sampleAnalytics.length,
        onlineUsers: sampleAnalytics.filter(u => u.isOnline).length,
        newUsersToday: sampleAnalytics.filter(u => 
          new Date(u.signupDate).toDateString() === new Date().toDateString()
        ).length
      }
    })

  } catch (error) {
    console.error("Analytics fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, userId, email, name, provider } = await request.json()

    switch (action) {
      case "signup":
        // Record new user signup
        const newUser: UserActivity = {
          id: userId || Date.now().toString(),
          email,
          name,
          provider,
          signupDate: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isOnline: true,
          sessionCount: 1
        }
        userAnalytics.push(newUser)
        break

      case "login":
        // Update user login time
        const userIndex = userAnalytics.findIndex(u => u.email === email)
        if (userIndex >= 0) {
          userAnalytics[userIndex].lastLogin = new Date().toISOString()
          userAnalytics[userIndex].isOnline = true
          userAnalytics[userIndex].sessionCount += 1
        }
        break

      case "logout":
        // Mark user as offline
        const logoutIndex = userAnalytics.findIndex(u => u.email === email)
        if (logoutIndex >= 0) {
          userAnalytics[logoutIndex].isOnline = false
        }
        break

      case "guest_visit":
        // Track guest session (could store in separate analytics)
        console.log("Guest session started")
        break
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Analytics update error:", error)
    return NextResponse.json({ error: "Failed to update analytics" }, { status: 500 })
  }
}