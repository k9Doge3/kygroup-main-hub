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
    const response = await fetchFromYandexDisk(token, `/download?path=${encodeURIComponent(PROJECTS_FILE_PATH)}`)

    if (response.ok) {
      const downloadData = await response.json()
      const fileResponse = await fetch(downloadData.href)

      if (fileResponse.ok) {
        const projectsData = await fileResponse.json()
        return projectsData
      }
    }

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
    await fetchFromYandexDisk(token, `?path=${encodeURIComponent("/projects")}`, "PUT")

    const uploadResponse = await fetchFromYandexDisk(
      token,
      `/upload?path=${encodeURIComponent(PROJECTS_FILE_PATH)}&overwrite=true`,
    )

    if (!uploadResponse.ok) {
      throw new Error("Failed to get upload URL")
    }

    const uploadData = await uploadResponse.json()

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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token found" }, { status: 401 })
    }

    const projectId = params.id
    const updatedProjectData = await request.json()
    const projectsData = await getProjectsData(token)

    const projectIndex = projectsData.projects.findIndex((p) => p.id === projectId)
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    projectsData.projects[projectIndex] = {
      ...projectsData.projects[projectIndex],
      ...updatedProjectData,
      updatedAt: new Date().toISOString(),
    }

    projectsData.lastUpdated = new Date().toISOString()

    const saved = await saveProjectsData(token, projectsData)
    if (!saved) {
      return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
    }

    return NextResponse.json({ project: projectsData.projects[projectIndex] })
  } catch (error) {
    console.error("Error in PUT /api/yandex/projects/[id]:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getYandexToken(request)
    if (!token) {
      return NextResponse.json({ error: "No Yandex token found" }, { status: 401 })
    }

    const projectId = params.id
    const projectsData = await getProjectsData(token)

    const projectIndex = projectsData.projects.findIndex((p) => p.id === projectId)
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    projectsData.projects.splice(projectIndex, 1)
    projectsData.lastUpdated = new Date().toISOString()

    const saved = await saveProjectsData(token, projectsData)
    if (!saved) {
      return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in DELETE /api/yandex/projects/[id]:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
