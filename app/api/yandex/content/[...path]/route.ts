import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const token = request.cookies.get("yandex_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const filePath = "/" + params.path.join("/")

    // Get download URL from Yandex
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/download?path=${encodeURIComponent(filePath)}`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to get download URL")
    }

    const { href: downloadUrl } = await response.json()

    // Download file content
    const fileResponse = await fetch(downloadUrl)

    if (!fileResponse.ok) {
      throw new Error("Failed to download file")
    }

    const contentType = fileResponse.headers.get("content-type") || ""

    if (contentType.startsWith("image/")) {
      // For images, return the download URL
      return NextResponse.json({ url: downloadUrl, type: "image" })
    } else {
      // For text files, return the content
      const content = await fileResponse.text()
      return NextResponse.json({ content, type: "text" })
    }
  } catch (error) {
    console.error("Content download error:", error)
    return NextResponse.json({ error: "Failed to download content" }, { status: 500 })
  }
}
