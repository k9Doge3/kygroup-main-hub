import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("yandex_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get all files from root directory and subdirectories
    const response = await fetch("https://cloud-api.yandex.net/v1/disk/resources?path=/&limit=100", {
      headers: {
        Authorization: `OAuth ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch content")
    }

    const data = await response.json()

    // Filter for content files (text, html, json, etc.)
    const contentTypes = ["text/", "application/json", "application/javascript", "text/html", "text/css", "image/"]
    const items =
      data._embedded?.items
        ?.filter((item: any) => item.type === "file" && contentTypes.some((type) => item.mime_type?.startsWith(type)))
        .map((item: any) => ({
          name: item.name,
          path: item.path,
          type: item.mime_type,
          size: item.size,
          modified: item.modified,
        })) || []

    return NextResponse.json({ items })
  } catch (error) {
    console.error("Content fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
