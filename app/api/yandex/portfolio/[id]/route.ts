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

async function getPortfolioData(token: string) {
  try {
    const response = await fetchFromYandex("/download?path=/portfolio/portfolio.json", token)
    if (!response.ok) {
      return { items: [] }
    }

    const downloadData = await response.json()
    const fileResponse = await fetch(downloadData.href)

    if (!fileResponse.ok) {
      return { items: [] }
    }

    return await fileResponse.json()
  } catch (error) {
    return { items: [] }
  }
}

async function savePortfolioData(token: string, data: any) {
  // Ensure portfolio directory exists
  await fetchFromYandex("?path=/portfolio", token, { method: "PUT" })

  // Get upload URL
  const uploadResponse = await fetchFromYandex("/upload?path=/portfolio/portfolio.json&overwrite=true", token)
  if (!uploadResponse.ok) {
    throw new Error("Failed to get upload URL")
  }

  const uploadData = await uploadResponse.json()

  // Upload the data
  const putResponse = await fetch(uploadData.href, {
    method: "PUT",
    body: JSON.stringify(data, null, 2),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!putResponse.ok) {
    throw new Error("Failed to upload portfolio data")
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token provided" }, { status: 401 })
    }

    const itemData = await request.json()
    const portfolioData = await getPortfolioData(token)

    // Find and update the item
    const itemIndex = portfolioData.items.findIndex((item: PortfolioItem) => item.id === params.id)
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 })
    }

    const updatedItem: PortfolioItem = {
      ...portfolioData.items[itemIndex],
      ...itemData,
      updatedAt: new Date().toISOString(),
    }

    portfolioData.items[itemIndex] = updatedItem
    await savePortfolioData(token, portfolioData)

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error("Portfolio update error:", error)
    return NextResponse.json({ error: "Failed to update portfolio item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token provided" }, { status: 401 })
    }

    const portfolioData = await getPortfolioData(token)

    // Filter out the item to delete
    const originalLength = portfolioData.items.length
    portfolioData.items = portfolioData.items.filter((item: PortfolioItem) => item.id !== params.id)

    if (portfolioData.items.length === originalLength) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 })
    }

    await savePortfolioData(token, portfolioData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Portfolio deletion error:", error)
    return NextResponse.json({ error: "Failed to delete portfolio item" }, { status: 500 })
  }
}
