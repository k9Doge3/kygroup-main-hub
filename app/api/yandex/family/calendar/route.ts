import { type NextRequest, NextResponse } from "next/server"

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

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const familyToken = request.headers.get("x-family-token")

    if (!authHeader || !familyToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")

    // Get family member info
    const memberResponse = await fetch("https://cloud-api.yandex.net/v1/disk/resources?path=/family/members.json", {
      headers: { Authorization: `OAuth ${token}` },
    })

    let currentMember = null
    if (memberResponse.ok) {
      const downloadResponse = await fetch(
        "https://cloud-api.yandex.net/v1/disk/resources/download?path=/family/members.json",
        {
          headers: { Authorization: `OAuth ${token}` },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        const membersResponse = await fetch(downloadData.href)
        const members = await membersResponse.json()

        // Verify family token
        currentMember = members.find((m: any) => m.token === familyToken)
        if (!currentMember) {
          return NextResponse.json({ error: "Invalid family token" }, { status: 401 })
        }
      }
    }

    // Get calendar events - only personal events now
    const calendarPath = `/family/${currentMember.name}/calendar/events.json`
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(calendarPath)}`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

    let events: CalendarEvent[] = []

    if (response.ok) {
      const downloadResponse = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources/download?path=${encodeURIComponent(calendarPath)}`,
        {
          headers: { Authorization: `OAuth ${token}` },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        const eventsResponse = await fetch(downloadData.href)
        events = await eventsResponse.json()
      }
    }

    return NextResponse.json({ events })
  } catch (error) {
    console.error("Calendar fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch calendar events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const familyToken = request.headers.get("x-family-token")

    if (!authHeader || !familyToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const eventData = await request.json()

    // Get family member info
    const memberResponse = await fetch("https://cloud-api.yandex.net/v1/disk/resources?path=/family/members.json", {
      headers: { Authorization: `OAuth ${token}` },
    })

    let currentMember = null
    if (memberResponse.ok) {
      const downloadResponse = await fetch(
        "https://cloud-api.yandex.net/v1/disk/resources/download?path=/family/members.json",
        {
          headers: { Authorization: `OAuth ${token}` },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        const membersResponse = await fetch(downloadData.href)
        const members = await membersResponse.json()

        currentMember = members.find((m: any) => m.token === familyToken)
        if (!currentMember) {
          return NextResponse.json({ error: "Invalid family token" }, { status: 401 })
        }
      }
    }

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      ...eventData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const storagePath = `/family/${currentMember.name}/calendar/events.json`

    // Get existing events
    let events: CalendarEvent[] = []
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(storagePath)}`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

    if (response.ok) {
      const downloadResponse = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources/download?path=${encodeURIComponent(storagePath)}`,
        {
          headers: { Authorization: `OAuth ${token}` },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        const eventsResponse = await fetch(downloadData.href)
        events = await eventsResponse.json()
      }
    } else {
      // Create directory structure if it doesn't exist
      const dirPath = `/family/${currentMember.name}/calendar`
      await fetch(`https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(dirPath)}`, {
        method: "PUT",
        headers: { Authorization: `OAuth ${token}` },
      })
    }

    events.push(newEvent)

    // Upload updated events
    const uploadResponse = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(storagePath)}&overwrite=true`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

    if (uploadResponse.ok) {
      const uploadData = await uploadResponse.json()
      await fetch(uploadData.href, {
        method: "PUT",
        body: JSON.stringify(events),
        headers: { "Content-Type": "application/json" },
      })
    }

    return NextResponse.json({ event: newEvent })
  } catch (error) {
    console.error("Calendar create error:", error)
    return NextResponse.json({ error: "Failed to create calendar event" }, { status: 500 })
  }
}
