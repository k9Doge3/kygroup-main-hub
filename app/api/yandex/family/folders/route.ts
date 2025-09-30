import { type NextRequest, NextResponse } from "next/server"

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

export async function POST(request: NextRequest) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token provided" }, { status: 401 })
    }

    const { path } = await request.json()

    if (!path || !path.startsWith("/family")) {
      return NextResponse.json({ error: "Invalid path or access denied" }, { status: 400 })
    }

    // Validate folder name
    const folderName = path.split("/").pop()
    if (!folderName || folderName.includes("..") || folderName.includes("\\")) {
      return NextResponse.json({ error: "Invalid folder name" }, { status: 400 })
    }

    const response = await fetchFromYandex(`?path=${encodeURIComponent(path)}`, token, {
      method: "PUT",
    })

    if (!response.ok) {
      if (response.status === 409) {
        return NextResponse.json({ error: "Folder already exists" }, { status: 409 })
      }
      throw new Error(`Failed to create folder: ${response.status}`)
    }

    return NextResponse.json({ success: true, path })
  } catch (error) {
    console.error("Folder creation error:", error)
    return NextResponse.json({ error: "Failed to create folder" }, { status: 500 })
  }
}
