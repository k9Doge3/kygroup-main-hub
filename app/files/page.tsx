import { YandexDiskManager } from "@/components/yandex-disk-manager"
import { ContentViewer } from "@/components/content-viewer"
import { ProjectManager } from "@/components/project-manager"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FolderOpen, Star } from "lucide-react"
import Link from "next/link"

export default function FilesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-3/4 left-1/2 w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse delay-1200"></div>
      </div>

      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white hover:bg-slate-800/50">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                <FolderOpen className="h-5 w-5 text-orange-400" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-white">File Management</h1>
                <p className="text-slate-300">Manage your Yandex Disk files and projects</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-400" />
                  Disk Management
                </h2>
                <YandexDiskManager />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-400" />
                  Project Management
                </h2>
                <ProjectManager />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-cyan-400" />
                Website Content
              </h2>
              <ContentViewer />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
