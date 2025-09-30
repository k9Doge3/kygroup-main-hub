import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("yandex_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const path = (formData.get("path") as string) || "/"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const uploadPath = `${path}/${file.name}`.replace("//", "/")

    // Get upload URL from Yandex
    const uploadUrlResponse = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(uploadPath)}&overwrite=true`,
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

    // Upload file to Yandex
    const fileBuffer = await file.arrayBuffer()
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      body: fileBuffer,
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
    })

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file")
    }

    return NextResponse.json({ success: true, path: uploadPath })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
