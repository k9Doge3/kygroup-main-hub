"use client"

import { useEffect } from "react"
import { Loader2, Star } from "lucide-react"

export default function YandexCallbackPage() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token.js"
    script.onload = () => {
      if (window.YaSendSuggestToken) {
        window.YaSendSuggestToken(window.location.origin, { flag: true })
      }
    }
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-3/4 left-1/2 w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse delay-1200"></div>
      </div>

      <div className="text-center relative z-10 p-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
        <div className="flex justify-center items-center gap-3 mb-6">
          <Star className="h-8 w-8 text-purple-400 animate-pulse" />
          <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Connecting to Yandex
          </h1>
          <Star className="h-8 w-8 text-blue-400 animate-pulse" />
        </div>
        <div className="flex justify-center items-center gap-3 mb-4">
          <Loader2 className="h-6 w-6 text-purple-400 animate-spin" />
          <p className="text-lg text-slate-300">
            Please wait while we complete the authentication across the digital cosmos...
          </p>
        </div>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    YaSendSuggestToken: (origin: string, data: any) => void
  }
}
