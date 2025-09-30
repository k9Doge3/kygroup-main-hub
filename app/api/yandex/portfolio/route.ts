import { type NextRequest, NextResponse } from "next/server"

interface PortfolioItem {
  id: string
  title: string
  description: string
  longDescription?: string
  category: string
  tags: string[]
  images: string[]
  demoUrl?: string
  githubUrl?: string
  technologies: string[]
  status: "completed" | "in-progress" | "planned"
  featured: boolean
  createdAt: string
  updatedAt: string
}

async function getYandexToken(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }
  return null
}

async function fetchFromYandex(path: string, token: string, options: RequestInit = {}) {
  const response = await fetch(`https://cloud-api.yandex.net/v1/disk/resources${path}`, {
    ...options,
    headers: {
      Authorization: `OAuth ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
  return response
}

export async function GET(request: NextRequest) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token provided" }, { status: 401 })
    }

    // Try to get the portfolio data file
    const response = await fetchFromYandex("/download?path=/portfolio/portfolio.json", token)

    if (response.status === 404) {
      // File doesn't exist, return empty portfolio
      return NextResponse.json({ items: [] })
    }

    if (!response.ok) {
      throw new Error(`Yandex API error: ${response.status}`)
    }

    const downloadData = await response.json()
    const fileResponse = await fetch(downloadData.href)

    if (!fileResponse.ok) {
      throw new Error("Failed to download portfolio file")
    }

    const portfolioData = await fileResponse.json()
    return NextResponse.json(portfolioData)
  } catch (error) {
    console.error("Portfolio fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token provided" }, { status: 401 })
    }

    const itemData = await request.json()

    // Generate ID and timestamps
    const newItem: PortfolioItem = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Get existing portfolio data
    let portfolioData = { items: [] as PortfolioItem[] }
    try {
      const response = await fetchFromYandex("/download?path=/portfolio/portfolio.json", token)
      if (response.ok) {
        const downloadData = await response.json()
        const fileResponse = await fetch(downloadData.href)
        if (fileResponse.ok) {
          portfolioData = await fileResponse.json()
        }
      }
    } catch (error) {
      // File doesn't exist, use empty data
    }

    // Add new item
    portfolioData.items.push(newItem)

    // Ensure portfolio directory exists
    await fetchFromYandex("?path=/portfolio", token, { method: "PUT" })

    // Get upload URL
    const uploadResponse = await fetchFromYandex("/upload?path=/portfolio/portfolio.json&overwrite=true", token)
    if (!uploadResponse.ok) {
      throw new Error("Failed to get upload URL")
    }

    const uploadData = await uploadResponse.json()

    // Upload the updated portfolio data
    const putResponse = await fetch(uploadData.href, {
      method: "PUT",
      body: JSON.stringify(portfolioData, null, 2),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!putResponse.ok) {
      throw new Error("Failed to upload portfolio data")
    }

    return NextResponse.json(newItem)
  } catch (error) {
    console.error("Portfolio creation error:", error)
    return NextResponse.json({ error: "Failed to create portfolio item" }, { status: 500 })
  }
}
