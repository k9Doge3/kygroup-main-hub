import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("yandex_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const path = searchParams.get("path") || "/"

    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(path)}&limit=100`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch files")
    }

    const data = await response.json()

    const files =
      data._embedded?.items?.map((item: any) => ({
        name: item.name,
        path: item.path,
        type: item.type,
        size: item.size,
        modified: item.modified,
        mime_type: item.mime_type,
      })) || []

    return NextResponse.json({ files })
  } catch (error) {
    console.error("Files fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 })
  }
}
