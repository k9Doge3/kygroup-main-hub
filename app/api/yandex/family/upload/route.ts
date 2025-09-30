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

    const formData = await request.formData()
    const file = formData.get("file") as File
    const path = formData.get("path") as string

    if (!file || !path) {
      return NextResponse.json({ error: "File and path are required" }, { status: 400 })
    }

    if (!path.startsWith("/family")) {
      return NextResponse.json({ error: "Access denied: Path outside family directory" }, { status: 403 })
    }

    // Get upload URL from Yandex
    const uploadResponse = await fetchFromYandex(`/upload?path=${encodeURIComponent(path)}&overwrite=true`, token)

    if (!uploadResponse.ok) {
      throw new Error(`Failed to get upload URL: ${uploadResponse.status}`)
    }

    const uploadData = await uploadResponse.json()

    // Upload file to Yandex
    const fileBuffer = await file.arrayBuffer()
    const putResponse = await fetch(uploadData.href, {
      method: "PUT",
      body: fileBuffer,
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
    })

    if (!putResponse.ok) {
      throw new Error(`Failed to upload file: ${putResponse.status}`)
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      path: path,
      size: file.size,
    })
  } catch (error) {
    console.error("File upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
