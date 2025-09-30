import { type NextRequest, NextResponse } from "next/server"

const PROFILE_PHOTO_PATH = "/profile/profile-photo.jpg"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No authorization token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    // Check if profile photo exists
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(PROFILE_PHOTO_PATH)}`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
        },
      },
    )

    if (response.ok) {
      const data = await response.json()
      // Get download URL for the photo
      const downloadResponse = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources/download?path=${encodeURIComponent(PROFILE_PHOTO_PATH)}`,
        {
          headers: {
            Authorization: `OAuth ${token}`,
          },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        return NextResponse.json({ photoUrl: downloadData.href })
      }
    }

    return NextResponse.json({ photoUrl: null })
  } catch (error) {
    console.error("Error fetching profile photo:", error)
    return NextResponse.json({ error: "Failed to fetch profile photo" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No authorization token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    // Delete the profile photo
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(PROFILE_PHOTO_PATH)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `OAuth ${token}`,
        },
      },
    )

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      throw new Error("Failed to delete profile photo")
    }
  } catch (error) {
    console.error("Error deleting profile photo:", error)
    return NextResponse.json({ error: "Failed to delete profile photo" }, { status: 500 })
  }
}
