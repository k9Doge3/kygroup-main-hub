import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("yandex_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { path, content } = await request.json()

    if (!path || content === undefined) {
      return NextResponse.json({ error: "Path and content are required" }, { status: 400 })
    }

    // Get upload URL from Yandex
    const uploadUrlResponse = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(path)}&overwrite=true`,
      {
        method: "GET",
        headers: {
          Authorization: `OAuth ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!uploadUrlResponse.ok) {
      throw new Error("Failed to get upload URL")
    }

    const { href: uploadUrl } = await uploadUrlResponse.json()

    // Upload content to Yandex
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      body: content,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    })

    if (!uploadResponse.ok) {
      throw new Error("Failed to save content")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Save error:", error)
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 })
  }
}
