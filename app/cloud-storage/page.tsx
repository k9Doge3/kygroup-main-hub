"use client"

import { YandexDiskManager } from "@/components/yandex-disk-manager"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Shield, Zap, Globe } from "lucide-react"

export default function CloudStoragePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Cloud className="h-10 w-10 text-blue-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Personal Cloud Storage
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect your Yandex Disk for secure, reliable cloud storage. Access your files anywhere, anytime.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="text-center">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <CardTitle>Secure Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Your files are encrypted and stored securely in Yandex Disk with enterprise-grade security.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <CardTitle>Fast Access</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lightning-fast file uploads, downloads, and seamless synchronization across all devices.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Globe className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <CardTitle>Global Access</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Access your files from anywhere in the world with reliable cloud infrastructure.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Yandex Disk Manager */}
      <div className="max-w-4xl mx-auto">
        <YandexDiskManager />
      </div>
    </div>
  )
}