import { type NextRequest, NextResponse } from "next/server"

interface Transaction {
  id: string
  title: string
  description?: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  recurring: boolean
  recurringPeriod?: "weekly" | "monthly" | "yearly"
  tags: string[]
  createdAt: string
  updatedAt: string
}

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

    // Get transactions
    const transactionsPath = `/family/${currentMember.name}/finances/transactions.json`
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(transactionsPath)}`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

    let transactions: Transaction[] = []

    if (response.ok) {
      const downloadResponse = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources/download?path=${encodeURIComponent(transactionsPath)}`,
        {
          headers: { Authorization: `OAuth ${token}` },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        const transactionsResponse = await fetch(downloadData.href)
        transactions = await transactionsResponse.json()
      }
    }

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error("Transactions fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const familyToken = request.headers.get("x-family-token")

    if (!authHeader || !familyToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const transactionData = await request.json()

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

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      ...transactionData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Get existing transactions
    const transactionsPath = `/family/${currentMember.name}/finances/transactions.json`
    let transactions: Transaction[] = []

    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(transactionsPath)}`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

    if (response.ok) {
      const downloadResponse = await fetch(
        `https://cloud-api.yandex.net/v1/disk/resources/download?path=${encodeURIComponent(transactionsPath)}`,
        {
          headers: { Authorization: `OAuth ${token}` },
        },
      )

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json()
        const transactionsResponse = await fetch(downloadData.href)
        transactions = await transactionsResponse.json()
      }
    } else {
      // Create directory structure if it doesn't exist
      const dirPath = `/family/${currentMember.name}/finances`
      await fetch(`https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(dirPath)}`, {
        method: "PUT",
        headers: { Authorization: `OAuth ${token}` },
      })
    }

    transactions.push(newTransaction)

    // Upload updated transactions
    const uploadResponse = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(transactionsPath)}&overwrite=true`,
      {
        headers: { Authorization: `OAuth ${token}` },
      },
    )

    if (uploadResponse.ok) {
      const uploadData = await uploadResponse.json()
      await fetch(uploadData.href, {
        method: "PUT",
        body: JSON.stringify(transactions),
        headers: { "Content-Type": "application/json" },
      })
    }

    return NextResponse.json({ transaction: newTransaction })
  } catch (error) {
    console.error("Transaction create error:", error)
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
