import { type NextRequest, NextResponse } from "next/server"

interface Project {
  id: string
  name: string
  description: string
  status: "planning" | "active" | "completed" | "on-hold"
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
  tags: string[]
  files: string[]
  notes: string
}

interface ProjectsData {
  projects: Project[]
  lastUpdated: string
}

const PROJECTS_FILE_PATH = "/projects/projects.json"

async function getYandexToken(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get("authorization")
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  // Try to get from cookies
  const cookies = request.headers.get("cookie")
  if (cookies) {
    const tokenMatch = cookies.match(/yandex_token=([^;]+)/)
    if (tokenMatch) {
      return decodeURIComponent(tokenMatch[1])
    }
  }

  return null
}

async function fetchFromYandexDisk(token: string, path: string, method = "GET", body?: any) {
  const url = `https://cloud-api.yandex.net/v1/disk/resources${path}`

  const options: RequestInit = {
    method,
    headers: {
      Authorization: `OAuth ${token}`,
      "Content-Type": "application/json",
    },
  }

  if (body && method !== "GET") {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(url, options)
  return response
}

async function getProjectsData(token: string): Promise<ProjectsData> {
  try {
    // First, try to get the projects file
    const response = await fetchFromYandexDisk(token, `/download?path=${encodeURIComponent(PROJECTS_FILE_PATH)}`)

    if (response.ok) {
      const downloadData = await response.json()
      const fileResponse = await fetch(downloadData.href)

      if (fileResponse.ok) {
        const projectsData = await fileResponse.json()
        return projectsData
      }
    }

    // If file doesn't exist, return empty structure
    return {
      projects: [],
      lastUpdated: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error fetching projects data:", error)
    return {
      projects: [],
      lastUpdated: new Date().toISOString(),
    }
  }
}

async function saveProjectsData(token: string, data: ProjectsData): Promise<boolean> {
  try {
    // First, ensure the projects directory exists
    await fetchFromYandexDisk(token, `?path=${encodeURIComponent("/projects")}`, "PUT")

    // Get upload URL
    const uploadResponse = await fetchFromYandexDisk(
      token,
      `/upload?path=${encodeURIComponent(PROJECTS_FILE_PATH)}&overwrite=true`,
    )

    if (!uploadResponse.ok) {
      throw new Error("Failed to get upload URL")
    }

    const uploadData = await uploadResponse.json()

    // Upload the file
    const fileResponse = await fetch(uploadData.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    return fileResponse.ok
  } catch (error) {
    console.error("Error saving projects data:", error)
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token found" }, { status: 401 })
    }

    const projectsData = await getProjectsData(token)
    return NextResponse.json(projectsData)
  } catch (error) {
    console.error("Error in GET /api/yandex/projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token found" }, { status: 401 })
    }

    const projectData = await request.json()
    const projectsData = await getProjectsData(token)

    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      files: [],
    }

    projectsData.projects.push(newProject)
    projectsData.lastUpdated = new Date().toISOString()

    const saved = await saveProjectsData(token, projectsData)
    if (!saved) {
      return NextResponse.json({ error: "Failed to save project" }, { status: 500 })
    }

    return NextResponse.json({ project: newProject })
  } catch (error) {
    console.error("Error in POST /api/yandex/projects:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
