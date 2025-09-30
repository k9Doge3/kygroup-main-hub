import { FamilyTodoLists } from "@/components/family-todo-lists"
import { MainNavigation } from "@/components/main-navigation"

export default function FamilyTodosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-3/4 left-1/2 w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse delay-1200"></div>
      </div>

      <MainNavigation showFamilyNav />

      <main className="container mx-auto py-8 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Project Objectives
              </h1>
              <p className="text-xl text-slate-300 text-pretty max-w-2xl mx-auto">
                Organize your projects, track objectives, and achieve your goals with cosmic precision
              </p>
            </div>

            <FamilyTodoLists />
          </div>
        </div>
      </main>
    </div>
  )
}
