import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const familyToken = request.headers.get("x-family-token")

    if (!authHeader || !familyToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const listData = await request.json()

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

    const newList = {
      id: Date.now().toString(),
      ...listData,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Get existing lists
    const todosPath = `/family/${currentMember.name}/todos/lists.json`
    let lists: any[] = []

    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(todosPath)}`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

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
    } else {
      // Create directory structure if it doesn't exist
      const dirPath = `/family/${currentMember.name}/todos`
      await fetch(`https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(dirPath)}`, {
        method: "PUT",
        headers: { Authorization: `OAuth ${token}` },
      })
    }

    lists.push(newList)

    // Upload updated lists
    const uploadResponse = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(todosPath)}&overwrite=true`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

    if (uploadResponse.ok) {
      const uploadData = await uploadResponse.json()
      await fetch(uploadData.href, {
        method: "PUT",
        body: JSON.stringify(lists),
        headers: { "Content-Type": "application/json" },
      })
    }

    return NextResponse.json({ list: newList })
  } catch (error) {
    console.error("Todo list create error:", error)
    return NextResponse.json({ error: "Failed to create todo list" }, { status: 500 })
  }
}
