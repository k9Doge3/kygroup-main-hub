import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No authorization token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const formData = await request.formData()
    const file = formData.get("file") as File
    const path = formData.get("path") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!path) {
      return NextResponse.json({ error: "No path provided" }, { status: 400 })
    }

    // Ensure profile directory exists
    const profileDirPath = "/profile"
    await fetch(`https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(profileDirPath)}`, {
      method: "PUT",
      headers: {
        Authorization: `OAuth ${token}`,
      },
    })

    // Get upload URL from Yandex
    const uploadUrlResponse = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(path)}&overwrite=true`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
        },
      },
    )

    if (!uploadUrlResponse.ok) {
      throw new Error("Failed to get upload URL")
    }

    const uploadData = await uploadUrlResponse.json()
    const uploadUrl = uploadData.href

    // Upload file to Yandex
    const fileBuffer = await file.arrayBuffer()
    const putResponse = await fetch(uploadUrl, {
      method: "PUT",
      body: fileBuffer,
      headers: {
        "Content-Type": file.type,
      },
    })

    if (!putResponse.ok) {
      throw new Error("Failed to upload file")
    }

    // Get download URL for immediate display
    const downloadResponse = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/download?path=${encodeURIComponent(path)}`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
        },
      },
    )

    let photoUrl = null
    if (downloadResponse.ok) {
      const downloadData = await downloadResponse.json()
      photoUrl = downloadData.href
    }

    return NextResponse.json({
      success: true,
      message: "Profile photo uploaded successfully",
      photoUrl,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload profile photo" }, { status: 500 })
  }
}
