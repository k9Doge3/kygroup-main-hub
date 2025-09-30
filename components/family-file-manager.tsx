"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Folder,
  File,
  Upload,
  Download,
  Trash2,
  FolderPlus,
  ImageIcon,
  Video,
  Music,
  Archive,
  RefreshCw,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { getUserColorClasses, getUserColorVars } from "@/lib/user-colors"

interface FamilySession {
  memberId: string
  memberName: string
  username: string
  role: "admin" | "member"
  folderPath?: string // Made folderPath optional to handle undefined cases
}

interface FileItem {
  name: string
  path: string
  type: "file" | "dir"
  size?: number
  modified?: string
  mimeType?: string
}

interface UploadProgress {
  file: File
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
  error?: string
}

interface FamilyFileManagerProps {
  session: FamilySession
}

const getFileIcon = (fileName: string, mimeType?: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()

  if (mimeType?.startsWith("image/") || ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || "")) {
    return <ImageIcon className="h-4 w-4 text-blue-500" />
  }
  if (mimeType?.startsWith("video/") || ["mp4", "avi", "mov", "wmv", "flv"].includes(extension || "")) {
    return <Video className="h-4 w-4 text-purple-500" />
  }
  if (mimeType?.startsWith("audio/") || ["mp3", "wav", "flac", "aac"].includes(extension || "")) {
    return <Music className="h-4 w-4 text-green-500" />
  }
  if (["zip", "rar", "7z", "tar", "gz"].includes(extension || "")) {
    return <Archive className="h-4 w-4 text-orange-500" />
  }
  return <File className="h-4 w-4 text-gray-500" />
}

const formatFileSize = (bytes?: number) => {
  if (!bytes) return "Unknown"
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
}

export function FamilyFileManager({ session }: FamilyFileManagerProps) {
  const defaultFolderPath = session?.folderPath || `/family/${session?.memberName || "user"}`
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentPath, setCurrentPath] = useState(defaultFolderPath)
  const [loading, setLoading] = useState(true)
  const [uploadQueue, setUploadQueue] = useState<UploadProgress[]>([])
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const userColors = getUserColorClasses(session?.memberName || "Anonymous")
  const userColorVars = getUserColorVars(session?.memberName || "Anonymous")

  useEffect(() => {
    loadFiles()
  }, [currentPath])

  // Drag and drop handlers
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      setIsDragOver(true)
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
        setIsDragOver(false)
      }
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer?.files || [])
      if (files.length > 0) {
        handleFileSelection(files)
      }
    }

    const dropZone = dropZoneRef.current
    if (dropZone) {
      dropZone.addEventListener("dragover", handleDragOver)
      dropZone.addEventListener("dragleave", handleDragLeave)
      dropZone.addEventListener("drop", handleDrop)
    }

    return () => {
      if (dropZone) {
        dropZone.removeEventListener("dragover", handleDragOver)
        dropZone.removeEventListener("dragleave", handleDragLeave)
        dropZone.removeEventListener("drop", handleDrop)
      }
    }
  }, [])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("yandex_token")
    if (!token) {
      toast.error("Please connect to Yandex Disk first")
      return null
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  const loadFiles = async () => {
    try {
      setLoading(true)
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch(`/api/yandex/family/files?path=${encodeURIComponent(currentPath)}`, {
        headers,
      })

      if (response.ok) {
        const data = await response.json()
        setFiles(data.items || [])
      } else {
        const error = await response.text()
        toast.error(`Failed to load files: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to load files")
      console.error("Load files error:", error)
    } finally {
      setLoading(false)
    }
  }

  const createFolder = async () => {
    if (!newFolderName.trim()) return

    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const folderPath = `${currentPath}/${newFolderName.trim()}`
      const response = await fetch("/api/yandex/family/folders", {
        method: "POST",
        headers,
        body: JSON.stringify({ path: folderPath }),
      })

      if (response.ok) {
        toast.success("Folder created successfully!")
        setIsCreateFolderOpen(false)
        setNewFolderName("")
        loadFiles()
      } else {
        const error = await response.text()
        toast.error(`Failed to create folder: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to create folder")
      console.error("Create folder error:", error)
    }
  }

  const handleFileSelection = (fileList: File[] | FileList) => {
    const files = Array.from(fileList)
    const newUploads: UploadProgress[] = files.map((file) => ({
      file,
      progress: 0,
      status: "pending",
    }))

    setUploadQueue((prev) => [...prev, ...newUploads])

    // Start uploading immediately
    uploadFiles(newUploads)
  }

  const uploadFiles = async (uploads: UploadProgress[]) => {
    const headers = getAuthHeaders()
    if (!headers) return

    for (const upload of uploads) {
      try {
        // Update status to uploading
        setUploadQueue((prev) =>
          prev.map((u) => (u.file === upload.file ? { ...u, status: "uploading", progress: 0 } : u)),
        )

        const formData = new FormData()
        formData.append("file", upload.file)
        formData.append("path", `${currentPath}/${upload.file.name}`)

        const response = await fetch("/api/yandex/family/upload", {
          method: "POST",
          headers: {
            Authorization: headers.Authorization,
          },
          body: formData,
        })

        if (response.ok) {
          // Update to completed
          setUploadQueue((prev) =>
            prev.map((u) => (u.file === upload.file ? { ...u, status: "completed", progress: 100 } : u)),
          )
        } else {
          const error = await response.text()
          setUploadQueue((prev) => prev.map((u) => (u.file === upload.file ? { ...u, status: "error", error } : u)))
        }
      } catch (error) {
        setUploadQueue((prev) =>
          prev.map((u) => (u.file === upload.file ? { ...u, status: "error", error: "Upload failed" } : u)),
        )
      }
    }

    // Refresh file list after all uploads complete
    setTimeout(() => {
      loadFiles()
      // Clear completed uploads after a delay
      setUploadQueue((prev) => prev.filter((u) => u.status !== "completed"))
    }, 1000)
  }

  const removeFromQueue = (file: File) => {
    setUploadQueue((prev) => prev.filter((u) => u.file !== file))
  }

  const clearCompletedUploads = () => {
    setUploadQueue((prev) => prev.filter((u) => u.status !== "completed"))
  }

  const deleteItem = async (item: FileItem) => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return

    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch("/api/yandex/family/files", {
        method: "DELETE",
        headers,
        body: JSON.stringify({ path: item.path }),
      })

      if (response.ok) {
        toast.success(`${item.type === "dir" ? "Folder" : "File"} deleted successfully!`)
        loadFiles()
      } else {
        const error = await response.text()
        toast.error(`Failed to delete: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to delete item")
      console.error("Delete error:", error)
    }
  }

  const downloadFile = async (item: FileItem) => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const response = await fetch(`/api/yandex/family/download?path=${encodeURIComponent(item.path)}`, {
        headers,
      })

      if (response.ok) {
        const data = await response.json()
        // Open download URL in new tab
        window.open(data.downloadUrl, "_blank")
      } else {
        const error = await response.text()
        toast.error(`Failed to download: ${error}`)
      }
    } catch (error) {
      toast.error("Failed to download file")
      console.error("Download error:", error)
    }
  }

  const navigateToFolder = (folderPath: string) => {
    setCurrentPath(folderPath)
  }

  const navigateUp = () => {
    const parentPath = currentPath.split("/").slice(0, -1).join("/")
    const baseFolderPath = session?.folderPath || defaultFolderPath
    if (
      parentPath &&
      parentPath !== "/family" &&
      parentPath.startsWith(baseFolderPath.split("/").slice(0, -1).join("/"))
    ) {
      setCurrentPath(parentPath)
    }
  }

  const isInUserFolder = currentPath.startsWith(session?.folderPath || defaultFolderPath)
  const canNavigateUp = currentPath !== (session?.folderPath || defaultFolderPath)

  const pathParts = currentPath.split("/").filter(Boolean)
  const breadcrumbs = pathParts.map((part, index) => {
    const path = "/" + pathParts.slice(0, index + 1).join("/")
    return { name: part, path }
  })

  const completedUploads = uploadQueue.filter((u) => u.status === "completed").length
  const failedUploads = uploadQueue.filter((u) => u.status === "error").length
  const activeUploads = uploadQueue.filter((u) => u.status === "uploading").length

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Folder className="h-5 w-5" />
            <CardTitle>Your Files</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 animate-pulse">
                <div className="w-8 h-8 bg-muted rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-1/3 mb-1"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6" ref={dropZoneRef}>
      {/* Upload Queue */}
      {uploadQueue.length > 0 && (
        <Card className={`border-2 ${userColors.border}`} style={userColorVars}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-full ${userColors.background}`} style={userColorVars}>
                  <Upload className={`h-5 w-5 ${userColors.text}`} />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span className={userColors.primary} style={userColorVars}>
                      {session?.memberName || "Anonymous"}
                    </span>
                    <span>is uploading</span>
                  </CardTitle>
                  <Badge variant="outline" className={`${userColors.border}`} style={userColorVars}>
                    {uploadQueue.length} file{uploadQueue.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
              </div>
              {completedUploads > 0 && (
                <Button variant="outline" size="sm" onClick={clearCompletedUploads}>
                  Clear Completed
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {uploadQueue.map((upload, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {upload.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {upload.status === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                      {upload.status === "uploading" && (
                        <Upload className={`h-4 w-4 animate-pulse ${userColors.primary}`} style={userColorVars} />
                      )}
                      {upload.status === "pending" && getFileIcon(upload.file.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium truncate">{upload.file.name}</span>
                        <Badge
                          variant={
                            upload.status === "completed"
                              ? "default"
                              : upload.status === "error"
                                ? "destructive"
                                : upload.status === "uploading"
                                  ? "secondary"
                                  : "outline"
                          }
                          className={
                            upload.status === "uploading" ? `${userColors.background} ${userColors.text}` : "text-xs"
                          }
                          style={upload.status === "uploading" ? userColorVars : {}}
                        >
                          {upload.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatFileSize(upload.file.size)}
                        {upload.error && ` • ${upload.error}`}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromQueue(upload.file)}
                    disabled={upload.status === "uploading"}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {upload.status === "uploading" && (
                  <Progress
                    value={upload.progress}
                    className={`h-2 [&>div]:${userColors.background}`}
                    style={userColorVars}
                  />
                )}
              </div>
            ))}

            {(completedUploads > 0 || failedUploads > 0) && (
              <div className="text-sm text-muted-foreground pt-2 border-t">
                {completedUploads > 0 && <span className="text-green-600">{completedUploads} completed</span>}
                {completedUploads > 0 && failedUploads > 0 && <span> • </span>}
                {failedUploads > 0 && <span className="text-red-600">{failedUploads} failed</span>}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* File Management Header */}
      <Card
        className={isDragOver ? `border-2 border-dashed ${userColors.border} ${userColors.secondary}/10` : ""}
        style={isDragOver ? userColorVars : {}}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-full ${userColors.background}`} style={userColorVars}>
                <Folder className={`h-5 w-5 ${userColors.text}`} />
              </div>
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span className={userColors.primary} style={userColorVars}>
                    {session?.memberName || "Anonymous"}'s
                  </span>
                  <span>Personal Files</span>
                </CardTitle>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={loadFiles} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>

              <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FolderPlus className="h-4 w-4 mr-2" />
                    New Folder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                    <DialogDescription>Create a new folder in your personal directory</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="folderName">Folder Name</Label>
                      <Input
                        id="folderName"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="Enter folder name"
                        onKeyDown={(e) => e.key === "Enter" && createFolder()}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateFolderOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={createFolder} disabled={!newFolderName.trim()}>
                        Create
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={(e) => e.target.files && handleFileSelection(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              </div>
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Location:</span>
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center space-x-2">
                {index > 0 && <span>/</span>}
                <button
                  onClick={() => navigateToFolder(crumb.path)}
                  className="hover:text-foreground transition-colors"
                  disabled={crumb.path === currentPath}
                >
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>

          {isDragOver && (
            <div
              className={`text-center py-8 border-2 border-dashed rounded-lg ${userColors.border} ${userColors.secondary}/5`}
              style={userColorVars}
            >
              <Upload className={`h-12 w-12 mx-auto mb-4 ${userColors.primary}`} />
              <p className={`text-lg font-medium ${userColors.primary}`}>
                Drop files here for {session?.memberName || "Anonymous"}
              </p>
              <p className="text-sm text-muted-foreground">Files will be uploaded to {currentPath}</p>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* File List */}
      <Card>
        <CardContent className="p-0">
          {files.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <Folder className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Folder is Empty</h3>
                <p className="text-muted-foreground">Upload files or create folders to get started</p>
              </div>
              <div className="mt-4">
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your First File
                </Button>
              </div>
            </div>
          ) : (
            <div className="divide-y">
              {/* Navigate Up Button */}
              {canNavigateUp && (
                <div className="p-4">
                  <button
                    onClick={navigateUp}
                    className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Folder className="h-4 w-4" />
                    <span>.. (Go up)</span>
                  </button>
                </div>
              )}

              {/* Files and Folders */}
              {files.map((item) => (
                <div key={item.path} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        {item.type === "dir" ? (
                          <Folder className="h-5 w-5 text-blue-500" />
                        ) : (
                          getFileIcon(item.name, item.mimeType)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => (item.type === "dir" ? navigateToFolder(item.path) : downloadFile(item))}
                            className="font-medium text-foreground hover:text-primary transition-colors truncate"
                          >
                            {item.name}
                          </button>
                          {item.type === "dir" && (
                            <Badge variant="outline" className="text-xs">
                              Folder
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.type === "file" && (
                            <>
                              {formatFileSize(item.size)}
                              {item.modified && <> • Modified {new Date(item.modified).toLocaleDateString()}</>}
                            </>
                          )}
                          {item.type === "dir" && "Folder"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 flex-shrink-0">
                      {item.type === "file" && (
                        <Button variant="ghost" size="sm" onClick={() => downloadFile(item)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => deleteItem(item)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Storage Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Personal folder: {session?.folderPath || defaultFolderPath}</span>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                {files.filter((f) => f.type === "file").length} files, {files.filter((f) => f.type === "dir").length}{" "}
                folders
              </Badge>
              {activeUploads > 0 && <Badge variant="outline">{activeUploads} uploading</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
