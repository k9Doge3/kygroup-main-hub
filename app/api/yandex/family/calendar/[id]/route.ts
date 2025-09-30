import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    const familyToken = request.headers.get("x-family-token")

    if (!authHeader || !familyToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const eventData = await request.json()
    const eventId = params.id

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

    const personalPath = `/family/${currentMember.name}/calendar/events.json`

    let events: any[] = []
    let found = false

    // Check personal calendar
    const personalResponse = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(personalPath)}`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

    if (personalResponse.ok) {
      const downloadResponse = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources/download?path=${encodeURIComponent(personalPath)}`,
        {
          headers: { Authorization: `OAuth ${token}` },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        const eventsResponse = await fetch(downloadData.href)
        events = await eventsResponse.json()
        found = events.some((e: any) => e.id === eventId)
      }
    }

    if (!found) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Update the event
    const eventIndex = events.findIndex((e: any) => e.id === eventId)
    if (eventIndex !== -1) {
      events[eventIndex] = {
        ...events[eventIndex],
        ...eventData,
        updatedAt: new Date().toISOString(),
      }

      // Upload updated events
      const uploadResponse = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(personalPath)}&overwrite=true`,
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

      return NextResponse.json({ event: events[eventIndex] })
    }

    return NextResponse.json({ error: "Event not found" }, { status: 404 })
  } catch (error) {
    console.error("Calendar update error:", error)
    return NextResponse.json({ error: "Failed to update calendar event" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    const familyToken = request.headers.get("x-family-token")

    if (!authHeader || !familyToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const eventId = params.id

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

    const personalPath = `/family/${currentMember.name}/calendar/events.json`

    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(personalPath)}`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

    if (response.ok) {
      const downloadResponse = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources/download?path=${encodeURIComponent(personalPath)}`,
        {
          headers: { Authorization: `OAuth ${token}` },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        const eventsResponse = await fetch(downloadData.href)
        const events = await eventsResponse.json()

        const eventIndex = events.findIndex((e: any) => e.id === eventId)
        if (eventIndex !== -1) {
          events.splice(eventIndex, 1)

          // Upload updated events
          const uploadResponse = await fetch(
            `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(personalPath)}&overwrite=true`,
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

          return NextResponse.json({ success: true })
        }
      }
    }

    return NextResponse.json({ error: "Event not found" }, { status: 404 })
  } catch (error) {
    console.error("Calendar delete error:", error)
    return NextResponse.json({ error: "Failed to delete calendar event" }, { status: 500 })
  }
}
