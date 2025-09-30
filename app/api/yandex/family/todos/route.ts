import { type NextRequest, NextResponse } from "next/server"

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

        currentMember = members.find((m: any) => m.token === familyToken)
        if (!currentMember) {
          return NextResponse.json({ error: "Invalid family token" }, { status: 401 })
        }
      }
    }

    // Get todo lists
    const todosPath = `/family/${currentMember.name}/todos/lists.json`
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(todosPath)}`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

    let lists: TodoList[] = []

    if (response.ok) {
      const downloadResponse = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources/download?path=${encodeURIComponent(todosPath)}`,
        {
          headers: { Authorization: `OAuth ${token}` },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        const listsResponse = await fetch(downloadData.href)
        lists = await listsResponse.json()
      }
    }

    return NextResponse.json({ lists })
  } catch (error) {
    console.error("Todos fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch todo lists" }, { status: 500 })
  }
}
