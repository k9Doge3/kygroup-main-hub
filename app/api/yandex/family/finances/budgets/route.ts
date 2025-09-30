import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const familyToken = request.headers.get("x-family-token")

    if (!authHeader || !familyToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")

    // Get family member info
    const memberResponse = await fetch("https://cloud-api.yandex.net/v1/disk/resources?path=/family/members.json", {
      headers: { Authorization: `OAuth ${token}` },
    })

    let currentMember = null
    if (memberResponse.ok) {
      const downloadResponse = await fetch(
        "https://cloud-api.yandex.net/v1/disk/resources/download?path=/family/members.json",
        {
          headers: { Authorization: `OAuth ${token}` },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        const membersResponse = await fetch(downloadData.href)
        const members = await membersResponse.json()

        currentMember = members.find((m: any) => m.token === familyToken)
        if (!currentMember) {
          return NextResponse.json({ error: "Invalid family token" }, { status: 401 })
        }
      }
    }

    // Get budgets
    const budgetsPath = `/family/${currentMember.name}/finances/budgets.json`
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(budgetsPath)}`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

    let budgets: any[] = []

    if (response.ok) {
      const downloadResponse = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources/download?path=${encodeURIComponent(budgetsPath)}`,
        {
          headers: { Authorization: `OAuth ${token}` },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        const budgetsResponse = await fetch(downloadData.href)
        budgets = await budgetsResponse.json()
      }
    }

    return NextResponse.json({ budgets })
  } catch (error) {
    console.error("Budgets fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 })
  }
}
