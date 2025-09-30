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
    const path = searchParams.get("path")

    if (!path || !path.startsWith("/family")) {
      return NextResponse.json({ error: "Invalid path or access denied" }, { status: 400 })
    }

    const response = await fetchFromYandex(`/download?path=${encodeURIComponent(path)}`, token)

    if (!response.ok) {
      throw new Error(`Failed to get download URL: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      downloadUrl: data.href,
      fileName: path.split("/").pop(),
    })
  } catch (error) {
    console.error("File download error:", error)
    return NextResponse.json({ error: "Failed to get download URL" }, { status: 500 })
  }
}
