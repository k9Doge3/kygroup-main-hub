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

export async function GET(request: NextRequest) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token provided" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const path = searchParams.get("path") || "/family"

    // Validate that the path is within the family directory
    if (!path.startsWith("/family")) {
      return NextResponse.json({ error: "Access denied: Path outside family directory" }, { status: 403 })
    }

    const response = await fetchFromYandex(`?path=${encodeURIComponent(path)}&limit=1000`, token)

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ items: [] })
      }
      throw new Error(`Yandex API error: ${response.status}`)
    }

    const data = await response.json()
    const items = data._embedded?.items || []

    // Format items for frontend
    const formattedItems = items.map((item: any) => ({
      name: item.name,
      path: item.path,
      type: item.type,
      size: item.size,
      modified: item.modified,
      mimeType: item.mime_type,
    }))

    return NextResponse.json({ items: formattedItems })
  } catch (error) {
    console.error("Family files fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token provided" }, { status: 401 })
    }

    const { path } = await request.json()

    if (!path || !path.startsWith("/family")) {
      return NextResponse.json({ error: "Invalid path or access denied" }, { status: 400 })
    }

    const response = await fetchFromYandex(`?path=${encodeURIComponent(path)}`, token, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Family file deletion error:", error)
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
  }
}
