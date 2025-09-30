import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("yandex_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { name, content } = await request.json()

    if (!name || content === undefined) {
      return NextResponse.json({ error: "Name and content are required" }, { status: 400 })
    }

    const filePath = `/${name}`

    // Get upload URL from Yandex
    const uploadUrlResponse = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(filePath)}&overwrite=false`,
      {
        method: "GET",
        headers: {
          Authorization: `OAuth ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!uploadUrlResponse.ok) {
      const error = await uploadUrlResponse.json()
      if (error.error === "DiskPathPointsToExistentDirectoryError") {
        return NextResponse.json({ error: "File already exists" }, { status: 409 })
      }
      throw new Error("Failed to get upload URL")
    }

    const { href: uploadUrl } = await uploadUrlResponse.json()

    // Determine content type based on file extension
    const extension = name.split(".").pop()?.toLowerCase()
    let contentType = "text/plain"

    if (extension === "html") contentType = "text/html"
    else if (extension === "css") contentType = "text/css"
    else if (extension === "js") contentType = "application/javascript"
    else if (extension === "json") contentType = "application/json"

    // Upload content to Yandex
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      body: content,
      headers: {
        "Content-Type": `${contentType}; charset=utf-8`,
      },
    })

    if (!uploadResponse.ok) {
      throw new Error("Failed to create file")
    }

    return NextResponse.json({ success: true, path: filePath })
  } catch (error) {
    console.error("Create error:", error)
    return NextResponse.json({ error: "Failed to create file" }, { status: 500 })
  }
}
