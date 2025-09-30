import { type NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"

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

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex")
}

function sanitizeUsername(username: string): string {
  return username.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export async function POST(request: NextRequest) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token provided" }, { status: 401 })
    }

    const { name, username, password, role } = await request.json()

    if (!name || !username || !password) {
      return NextResponse.json({ error: "Name, username, and password are required" }, { status: 400 })
    }

    const familyData = await getFamilyData(token)
    const sanitizedUsername = sanitizeUsername(username)

    // Check if username already exists
    if (familyData.members.some((m) => m.username === sanitizedUsername)) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }

    // Create new member
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name,
      username: sanitizedUsername,
      passwordHash: hashPassword(password),
      role: role || "member",
      folderPath: `/family/${sanitizedUsername}`,
      createdAt: new Date().toISOString(),
      isActive: true,
    }

    // Add to family data
    familyData.members.push(newMember)
    await saveFamilyData(token, familyData)

    // Create member's folder
    try {
      await fetchFromYandex(`?path=${newMember.folderPath}`, token, { method: "PUT" })
    } catch (error) {
      console.error("Failed to create member folder:", error)
    }

    // Return member data without password hash
    const { passwordHash, ...safeMember } = newMember
    return NextResponse.json(safeMember)
  } catch (error) {
    console.error("Add member error:", error)
    return NextResponse.json({ error: "Failed to add family member" }, { status: 500 })
  }
}
