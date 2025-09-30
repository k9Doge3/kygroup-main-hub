import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    // Validate URL format (basic check for Yandex domains)
    const urlObj = new URL(url)
    const isYandexDomain =
      urlObj.hostname.includes("yandex") || urlObj.hostname.includes("ya.ru") || urlObj.hostname.includes("yadi.sk")

    if (!isYandexDomain) {
      return NextResponse.json(
        {
          error: "Only Yandex URLs are supported",
        },
        { status: 400 },
      )
    }

    // Fetch the file from Yandex
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; YandexBlobUploader/1.0)",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`)
    }

    // Get file info from headers
    const contentType = response.headers.get("content-type") || "application/octet-stream"
    const contentLength = response.headers.get("content-length")

    // Extract filename from URL or use a default
    const pathname = urlObj.pathname
    const filename = pathname.split("/").pop() || `yandex-file-${Date.now()}`

    // Convert response to blob
    const fileBlob = await response.blob()

    // Upload to Vercel Blob
    const blob = await put(filename, fileBlob, {
      access: "public",
      contentType,
    })

    return NextResponse.json({
      url: blob.url,
      filename,
      size: contentLength ? Number.parseInt(contentLength) : fileBlob.size,
      type: contentType,
      sourceUrl: url,
    })
  } catch (error) {
    console.error("Upload from URL error:", error)
    return NextResponse.json(
      {
        error: "Failed to upload from URL",
      },
      { status: 500 },
    )
  }
}
