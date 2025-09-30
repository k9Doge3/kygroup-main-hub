import { type NextRequest, NextResponse } from "next/server"

interface FamilyMember {
  id: string
  name: string
  username: string
  passwordHash: string
  role: "admin" | "member"
  folderPath: string
  createdAt: string
  lastLogin?: string
  isActive: boolean
}

interface FamilyData {
  members: FamilyMember[]
  settings: {
    allowSelfRegistration: boolean
    defaultRole: "admin" | "member"
  }
}

async function getYandexToken(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }
  return null
}

async function fetchFromYandex(path: string, token: string, options: RequestInit = {}) {
  const response = await fetch(`https://cloud-api.yandex.net/v1/disk/resources${path}`, {
    ...options,
    headers: {
      Authorization: `OAuth ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
  return response
}

async function getFamilyData(token: string): Promise<FamilyData> {
  try {
    const response = await fetchFromYandex("/download?path=/family/family.json", token)
    if (!response.ok) {
      return {
        members: [],
        settings: {
          allowSelfRegistration: false,
          defaultRole: "member",
        },
      }
    }

    const downloadData = await response.json()
    const fileResponse = await fetch(downloadData.href)

    if (!fileResponse.ok) {
      return {
        members: [],
        settings: {
          allowSelfRegistration: false,
          defaultRole: "member",
        },
      }
    }

    return await fileResponse.json()
  } catch (error) {
    return {
      members: [],
      settings: {
        allowSelfRegistration: false,
        defaultRole: "member",
      },
    }
  }
}

async function saveFamilyData(token: string, data: FamilyData) {
  // Ensure family directory exists
  await fetchFromYandex("?path=/family", token, { method: "PUT" })

  // Get upload URL
  const uploadResponse = await fetchFromYandex("/upload?path=/family/family.json&overwrite=true", token)
  if (!uploadResponse.ok) {
    throw new Error("Failed to get upload URL")
  }

  const uploadData = await uploadResponse.json()

  // Upload the data
  const putResponse = await fetch(uploadData.href, {
    method: "PUT",
    body: JSON.stringify(data, null, 2),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!putResponse.ok) {
    throw new Error("Failed to upload family data")
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token provided" }, { status: 401 })
    }

    const familyData = await getFamilyData(token)
    const member = familyData.members.find((m) => m.id === params.id)

    if (!member) {
      return NextResponse.json({ error: "Family member not found" }, { status: 404 })
    }

    // Remove member from family data
    familyData.members = familyData.members.filter((m) => m.id !== params.id)
    await saveFamilyData(token, familyData)

    // Try to delete member's folder (optional, may fail if folder has content)
    try {
      await fetchFromYandex(`?path=${encodeURIComponent(member.folderPath)}&permanently=true`, token, {
        method: "DELETE",
      })
    } catch (error) {
      console.warn("Could not delete member folder:", error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete member error:", error)
    return NextResponse.json({ error: "Failed to delete family member" }, { status: 500 })
  }
}
