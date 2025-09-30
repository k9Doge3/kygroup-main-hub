import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    // Test the token by making a request to Yandex Disk API
    const response = await fetch("https://cloud-api.yandex.net/v1/disk", {
      headers: {
        Authorization: `OAuth ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const diskInfo = await response.json()

    // Store token in session/cookie for subsequent requests
    const responseObj = NextResponse.json({
      success: true,
      diskInfo: {
        total_space: diskInfo.total_space,
        used_space: diskInfo.used_space,
        system_folders: diskInfo.system_folders,
      },
    })

    // Set httpOnly cookie for security
    responseObj.cookies.set("yandex_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return responseObj
  } catch (error) {
    console.error("Yandex connection error:", error)
    return NextResponse.json({ error: "Connection failed" }, { status: 500 })
  }
}
