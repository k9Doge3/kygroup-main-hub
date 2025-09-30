"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Plus, TrendingUp, Target, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

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

interface Budget {
  id: string
  name: string
  category: string
  amount: number
  spent: number
  period: "weekly" | "monthly" | "yearly"
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
}

interface Goal {
  id: string
  name: string
  description?: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  category: string
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

const transactionCategories = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Other Income"],
  expense: [
    "Food",
    "Transportation",
    "Housing",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Shopping",
    "Education",
    "Other Expense",
  ],
}

const budgetCategories = [
  "Food",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Education",
  "Other",
]

const goalCategories = ["Emergency Fund", "Vacation", "Car", "House", "Education", "Investment", "Other"]

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#f97316", "#84cc16"]

export function FamilyFinancialDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("month")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false)
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false)
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [currentUser, setCurrentUser] = useState<string>("")

  const [transactionFormData, setTransactionFormData] = useState({
    title: "",
    description: "",
    amount: "",
    type: "expense" as const,
    category: "",
    date: new Date().toISOString().split("T")[0],
    recurring: false,
    recurringPeriod: "monthly" as const,
    tags: "",
  })

  const [budgetFormData, setBudgetFormData] = useState({
    name: "",
    category: "",
    amount: "",
    period: "monthly" as const,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
  })

  const [goalFormData, setGoalFormData] = useState({
    name: "",
    description: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    category: "",
    priority: "medium" as const,
  })

  useEffect(() => {
    loadFinancialData()
    setCurrentUser(localStorage.getItem("family_member_name") || "")
  }, [])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("yandex_token")
    const familyToken = localStorage.getItem("family_auth_token")
    if (!token || !familyToken) {
      toast.error("Please authenticate first")
      return null
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Family-Token": familyToken,
    }
  }

  const loadFinancialData = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const [transactionsRes, budgetsRes, goalsRes] = await Promise.all([
        fetch("/api/yandex/family/finances/transactions", { headers }),
        fetch("/api/yandex/family/finances/budgets", { headers }),
        fetch("/api/yandex/family/finances/goals", { headers }),
      ])

      if (transactionsRes.ok) {
        const data = await transactionsRes.json()
        setTransactions(data.transactions || [])
      }

      if (budgetsRes.ok) {
        const data = await budgetsRes.json()
        setBudgets(data.budgets || [])
      }

      if (goalsRes.ok) {
        const data = await goalsRes.json()
        setGoals(data.goals || [])
      }
    } catch (error) {
      console.error("Failed to load financial data:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveTransaction = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const transactionData: Omit<Transaction, "id" | "createdAt" | "updatedAt"> = {
        title: transactionFormData.title,
        description: transactionFormData.description,
        amount: Number.parseFloat(transactionFormData.amount),
        type: transactionFormData.type,
        category: transactionFormData.category,
        date: transactionFormData.date,
        recurring: transactionFormData.recurring,
        recurringPeriod: transactionFormData.recurringPeriod,
        tags: transactionFormData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }

      const url = editingTransaction
        ? `/api/yandex/family/finances/transactions/${editingTransaction.id}`
        : "/api/yandex/family/finances/transactions"
      const method = editingTransaction ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(transactionData),
      })

      if (response.ok) {
        toast.success(editingTransaction ? "Transaction updated!" : "Transaction created!")
        setIsTransactionDialogOpen(false)
        resetTransactionForm()
        loadFinancialData()
      } else {
        const error = await response.text()
        toast.error(`Failed to save transaction: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to save transaction")
      console.error("Save error:", error)
    }
  }

  const saveBudget = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const budgetData: Omit<Budget, "id" | "spent" | "createdAt" | "updatedAt"> = {
        name: budgetFormData.name,
        category: budgetFormData.category,
        amount: Number.parseFloat(budgetFormData.amount),
        period: budgetFormData.period,
        startDate: budgetFormData.startDate,
        endDate: budgetFormData.endDate,
      }

      const url = editingBudget
        ? `/api/yandex/family/finances/budgets/${editingBudget.id}`
        : "/api/yandex/family/finances/budgets"
      const method = editingBudget ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(budgetData),
      })

      if (response.ok) {
        toast.success(editingBudget ? "Budget updated!" : "Budget created!")
        setIsBudgetDialogOpen(false)
        resetBudgetForm()
        loadFinancialData()
      } else {
        const error = await response.text()
        toast.error(`Failed to save budget: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to save budget")
      console.error("Save error:", error)
    }
  }

  const saveGoal = async () => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const goalData: Omit<Goal, "id" | "createdAt" | "updatedAt"> = {
        name: goalFormData.name,
        description: goalFormData.description,
        targetAmount: Number.parseFloat(goalFormData.targetAmount),
        currentAmount: Number.parseFloat(goalFormData.currentAmount || "0"),
        targetDate: goalFormData.targetDate,
        category: goalFormData.category,
        priority: goalFormData.priority,
      }

      const url = editingGoal
        ? `/api/yandex/family/finances/goals/${editingGoal.id}`
        : "/api/yandex/family/finances/goals"
      const method = editingGoal ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(goalData),
      })

      if (response.ok) {
        toast.success(editingGoal ? "Goal updated!" : "Goal created!")
        setIsGoalDialogOpen(false)
        resetGoalForm()
        loadFinancialData()
      } else {
        const error = await response.text()
        toast.error(`Failed to save goal: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to save goal")
      console.error("Save error:", error)
    }
  }

  const resetTransactionForm = () => {
    setTransactionFormData({
      title: "",
      description: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
      recurring: false,
      recurringPeriod: "monthly",
      tags: "",
    })
    setEditingTransaction(null)
  }

  const resetBudgetForm = () => {
    setBudgetFormData({
      name: "",
      category: "",
      amount: "",
      period: "monthly",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
    })
    setEditingBudget(null)
  }

  const resetGoalForm = () => {
    setGoalFormData({
      name: "",
      description: "",
      targetAmount: "",
      currentAmount: "",
      targetDate: "",
      category: "",
      priority: "medium",
    })
    setEditingGoal(null)
  }

  // Calculate financial metrics
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const netIncome = totalIncome - totalExpenses

  // Prepare chart data
  const expensesByCategory = budgetCategories
    .map((category) => {
      const amount = transactions
        .filter((t) => t.type === "expense" && t.category === category)
        .reduce((sum, t) => sum + t.amount, 0)
      return { name: category, value: amount }
    })
    .filter((item) => item.value > 0)

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2024, i, 1).toLocaleDateString("en-US", { month: "short" })
    const monthTransactions = transactions.filter((t) => {
      const transactionMonth = new Date(t.date).getMonth()
      return transactionMonth === i
    })

    const income = monthTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const expenses = monthTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    return { month, income, expenses, net: income - expenses }
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <p className="text-muted-foreground">Track your income, expenses, and financial goals</p>
        </div>

        <div className="flex gap-2">
          <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetTransactionForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTransaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
                <DialogDescription>Record a new income or expense</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transactionTitle">Title</Label>
                  <Input
                    id="transactionTitle"
                    value={transactionFormData.title}
                    onChange={(e) => setTransactionFormData({ ...transactionFormData, title: e.target.value })}
                    placeholder="Transaction title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transactionType">Type</Label>
                    <Select
                      value={transactionFormData.type}
                      onValueChange={(value: any) =>
                        setTransactionFormData({ ...transactionFormData, type: value, category: "" })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transactionAmount">Amount</Label>
                    <Input
                      id="transactionAmount"
                      type="number"
                      step="0.01"
                      value={transactionFormData.amount}
                      onChange={(e) => setTransactionFormData({ ...transactionFormData, amount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transactionCategory">Category</Label>
                    <Select
                      value={transactionFormData.category}
                      onValueChange={(value) => setTransactionFormData({ ...transactionFormData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {transactionCategories[transactionFormData.type].map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transactionDate">Date</Label>
                    <Input
                      id="transactionDate"
                      type="date"
                      value={transactionFormData.date}
                      onChange={(e) => setTransactionFormData({ ...transactionFormData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transactionDescription">Description</Label>
                  <Textarea
                    id="transactionDescription"
                    value={transactionFormData.description}
                    onChange={(e) => setTransactionFormData({ ...transactionFormData, description: e.target.value })}
                    placeholder="Additional details..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={transactionFormData.recurring}
                    onChange={(e) => setTransactionFormData({ ...transactionFormData, recurring: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="recurring">Recurring transaction</Label>
                </div>

                {transactionFormData.recurring && (
                  <div className="space-y-2">
                    <Label htmlFor="recurringPeriod">Recurring Period</Label>
                    <Select
                      value={transactionFormData.recurringPeriod}
                      onValueChange={(value: any) =>
                        setTransactionFormData({ ...transactionFormData, recurringPeriod: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="transactionTags">Tags</Label>
                  <Input
                    id="transactionTags"
                    value={transactionFormData.tags}
                    onChange={(e) => setTransactionFormData({ ...transactionFormData, tags: e.target.value })}
                    placeholder="work, personal, urgent (comma separated)"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsTransactionDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveTransaction}>{editingTransaction ? "Update" : "Create"}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={() => setIsBudgetDialogOpen(true)}>
            <Target className="h-4 w-4 mr-2" />
            Budget
          </Button>

          <Button variant="outline" onClick={() => setIsGoalDialogOpen(true)}>
            <PiggyBank className="h-4 w-4 mr-2" />
            Goal
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <TrendingUp className={`h-4 w-4 ${netIncome >= 0 ? "text-green-600" : "text-red-600"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netIncome >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${netIncome.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">{netIncome >= 0 ? "Positive" : "Negative"} cash flow</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-xs text-muted-foreground">
              {goals.filter((g) => g.currentAmount / g.targetAmount >= 1).length} completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
            <CardDescription>Income vs Expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`$${value}`, ""]} />
                <Legend />
                <Area type="monotone" dataKey="income" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="2"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Where your money goes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`$${value}`, "Amount"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budgets and Goals */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Progress</CardTitle>
            <CardDescription>Track your spending limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgets.slice(0, 5).map((budget) => {
              const percentage = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0
              const isOverBudget = percentage > 100

              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{budget.name}</span>
                    <span className={`text-sm ${isOverBudget ? "text-red-600" : "text-muted-foreground"}`}>
                      ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isOverBudget ? "bg-red-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}% used</div>
                </div>
              )
            })}
            {budgets.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No budgets set. Create your first budget to track spending.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Goals</CardTitle>
            <CardDescription>Progress towards your targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.slice(0, 5).map((goal) => {
              const percentage = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0
              const isCompleted = percentage >= 100

              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{goal.name}</span>
                    <span className={`text-sm ${isCompleted ? "text-green-600" : "text-muted-foreground"}`}>
                      ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isCompleted ? "bg-green-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage.toFixed(1)}% complete</span>
                    <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                  </div>
                </div>
              )
            })}
            {goals.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No goals set. Create your first financial goal to start saving.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 10)
              .map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-2">
                        <span>{transaction.category}</span>
                        <span>•</span>
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            {transactions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No transactions yet. Add your first transaction to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Budget Dialog */}
      <Dialog open={isBudgetDialogOpen} onOpenChange={setIsBudgetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingBudget ? "Edit Budget" : "Create Budget"}</DialogTitle>
            <DialogDescription>Set spending limits for different categories</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budgetName">Budget Name</Label>
              <Input
                id="budgetName"
                value={budgetFormData.name}
                onChange={(e) => setBudgetFormData({ ...budgetFormData, name: e.target.value })}
                placeholder="Monthly Food Budget"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budgetCategory">Category</Label>
                <Select
                  value={budgetFormData.category}
                  onValueChange={(value) => setBudgetFormData({ ...budgetFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budgetAmount">Amount</Label>
                <Input
                  id="budgetAmount"
                  type="number"
                  step="0.01"
                  value={budgetFormData.amount}
                  onChange={(e) => setBudgetFormData({ ...budgetFormData, amount: e.target.value })}
                  placeholder="500.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budgetPeriod">Period</Label>
                <Select
                  value={budgetFormData.period}
                  onValueChange={(value: any) => setBudgetFormData({ ...budgetFormData, period: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budgetStartDate">Start Date</Label>
                <Input
                  id="budgetStartDate"
                  type="date"
                  value={budgetFormData.startDate}
                  onChange={(e) => setBudgetFormData({ ...budgetFormData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budgetEndDate">End Date</Label>
                <Input
                  id="budgetEndDate"
                  type="date"
                  value={budgetFormData.endDate}
                  onChange={(e) => setBudgetFormData({ ...budgetFormData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsBudgetDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveBudget}>{editingBudget ? "Update" : "Create"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Goal Dialog */}
      <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingGoal ? "Edit Goal" : "Create Goal"}</DialogTitle>
            <DialogDescription>Set financial targets to work towards</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goalName">Goal Name</Label>
              <Input
                id="goalName"
                value={goalFormData.name}
                onChange={(e) => setGoalFormData({ ...goalFormData, name: e.target.value })}
                placeholder="Emergency Fund"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalDescription">Description</Label>
              <Textarea
                id="goalDescription"
                value={goalFormData.description}
                onChange={(e) => setGoalFormData({ ...goalFormData, description: e.target.value })}
                placeholder="Save for unexpected expenses"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goalTargetAmount">Target Amount</Label>
                <Input
                  id="goalTargetAmount"
                  type="number"
                  step="0.01"
                  value={goalFormData.targetAmount}
                  onChange={(e) => setGoalFormData({ ...goalFormData, targetAmount: e.target.value })}
                  placeholder="10000.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goalCurrentAmount">Current Amount</Label>
                <Input
                  id="goalCurrentAmount"
                  type="number"
                  step="0.01"
                  value={goalFormData.currentAmount}
                  onChange={(e) => setGoalFormData({ ...goalFormData, currentAmount: e.target.value })}
                  placeholder="2500.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goalCategory">Category</Label>
                <Select
                  value={goalFormData.category}
                  onValueChange={(value) => setGoalFormData({ ...goalFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goalPriority">Priority</Label>
                <Select
                  value={goalFormData.priority}
                  onValueChange={(value: any) => setGoalFormData({ ...goalFormData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalTargetDate">Target Date</Label>
              <Input
                id="goalTargetDate"
                type="date"
                value={goalFormData.targetDate}
                onChange={(e) => setGoalFormData({ ...goalFormData, targetDate: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsGoalDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveGoal}>{editingGoal ? "Update" : "Create"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
