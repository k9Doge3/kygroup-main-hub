'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Camera, Calendar, MapPin, Aperture, Timer, Search, Download, Heart, Share2, Star, Settings } from 'lucide-react'
import { MainNavigation } from "@/components/main-navigation"
import Image from 'next/image'

const samplePhotos = [
  {
    id: 1,
    title: "Golden Hour Cityscape",
    src: "/placeholder.jpg",
    alt: "Beautiful cityscape during golden hour",
    date: "2024-09-15",
    location: "Toronto, Canada",
    camera: "Canon EOS R5",
    lens: "RF 24-70mm f/2.8L IS USM",
    settings: {
      aperture: "f/8.0",
      shutter: "1/250s",
      iso: "ISO 100",
      focal: "35mm"
    },
    tags: ["landscape", "city", "golden hour"],
    likes: 42,
    featured: true
  },
  {
    id: 2,
    title: "Mountain Reflection",
    src: "/placeholder.jpg",
    alt: "Mountain reflected in calm lake water",
    date: "2024-09-10",
    location: "Banff, Canada",
    camera: "Canon EOS R5",
    lens: "RF 16-35mm f/2.8L IS USM",
    settings: {
      aperture: "f/11.0",
      shutter: "1/125s",
      iso: "ISO 64",
      focal: "24mm"
    },
    tags: ["landscape", "nature", "reflection"],
    likes: 38,
    featured: true
  },
  {
    id: 3,
    title: "Street Photography",
    src: "/placeholder.jpg",
    alt: "Candid street scene with interesting lighting",
    date: "2024-09-05",
    location: "Montreal, Canada",
    camera: "Canon EOS R6",
    lens: "RF 50mm f/1.2L USM",
    settings: {
      aperture: "f/2.8",
      shutter: "1/500s",
      iso: "ISO 400",
      focal: "50mm"
    },
    tags: ["street", "people", "urban"],
    likes: 27,
    featured: false
  },
  {
    id: 4,
    title: "Macro Wildlife",
    src: "/placeholder.jpg",
    alt: "Close-up macro shot of a butterfly",
    date: "2024-08-28",
    location: "Vancouver, Canada",
    camera: "Canon EOS R5",
    lens: "RF 100mm f/2.8L Macro IS USM",
    settings: {
      aperture: "f/5.6",
      shutter: "1/1000s",
      iso: "ISO 320",
      focal: "100mm"
    },
    tags: ["macro", "wildlife", "nature"],
    likes: 51,
    featured: false
  },
  {
    id: 5,
    title: "Night Sky",
    src: "/placeholder.jpg",
    alt: "Milky way over mountain landscape",
    date: "2024-08-20",
    location: "Jasper, Canada",
    camera: "Canon EOS R6",
    lens: "RF 15-35mm f/2.8L IS USM",
    settings: {
      aperture: "f/2.8",
      shutter: "25s",
      iso: "ISO 3200",
      focal: "20mm"
    },
    tags: ["astrophotography", "night", "milky way"],
    likes: 89,
    featured: true
  },
  {
    id: 6,
    title: "Architecture Detail",
    src: "/placeholder.jpg",
    alt: "Modern building architecture with geometric patterns",
    date: "2024-08-15",
    location: "Calgary, Canada",
    camera: "Canon EOS R5",
    lens: "RF 24-70mm f/2.8L IS USM",
    settings: {
      aperture: "f/8.0",
      shutter: "1/320s",
      iso: "ISO 100",
      focal: "50mm"
    },
    tags: ["architecture", "modern", "geometric"],
    likes: 33,
    featured: false
  }
]

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<typeof samplePhotos[0] | null>(null)

  const allTags = Array.from(new Set(samplePhotos.flatMap(photo => photo.tags)))
  
  const filteredPhotos = samplePhotos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTag = !selectedTag || photo.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const PhotoCard = ({ photo }: { photo: typeof samplePhotos[0] }) => (
    <Card 
      className="group cursor-pointer overflow-hidden bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-purple-500/50 transition-all duration-300"
      onClick={() => setSelectedPhoto(photo)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>{photo.likes}</span>
            </div>
            {photo.featured && (
              <Badge variant="secondary" className="bg-purple-500/80 text-white">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {photo.title}
        </h3>
        <div className="space-y-2 text-sm text-slate-400">
          <div className="flex items-center space-x-2">
            <Calendar className="h-3 w-3" />
            <span>{new Date(photo.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3" />
            <span>{photo.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Camera className="h-3 w-3" />
            <span>{photo.camera}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {photo.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs border-slate-600 text-slate-300 cursor-pointer hover:border-purple-500 hover:text-purple-300"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedTag(tag === selectedTag ? null : tag)
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const PhotoModal = ({ photo, onClose }: { photo: typeof samplePhotos[0], onClose: () => void }) => (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="max-w-4xl w-full bg-slate-900 rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-white">{photo.title}</h2>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-white">
                  ×
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-slate-400 text-sm">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{photo.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(photo.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                <div className="flex items-center space-x-2 text-slate-300">
                  <MapPin className="h-4 w-4" />
                  <span>{photo.location}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Equipment</h3>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>{photo.camera}</span>
                  </div>
                  <div className="text-sm">{photo.lens}</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Camera Settings</h3>
                <div className="grid grid-cols-2 gap-4 text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Aperture className="h-4 w-4" />
                    <span>{photo.settings.aperture}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Timer className="h-4 w-4" />
                    <span>{photo.settings.shutter}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>{photo.settings.iso}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>{photo.settings.focal}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {photo.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="border-slate-600 hover:bg-slate-800">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-slate-600 hover:bg-slate-800">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

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

      <MainNavigation />

      <main className="container mx-auto py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Camera className="h-6 w-6 text-purple-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Photo Gallery
              </h1>
              <Camera className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Exploring the world through photography with detailed EXIF data and stories behind each shot
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search photos by title, location, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className={selectedTag === null ? "bg-purple-600 hover:bg-purple-700" : "border-slate-600 hover:bg-slate-800"}
              >
                All
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={selectedTag === tag ? "bg-purple-600 hover:bg-purple-700" : "border-slate-600 hover:bg-slate-800"}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{samplePhotos.length}</div>
                <div className="text-sm text-slate-300">Total Photos</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{samplePhotos.filter(p => p.featured).length}</div>
                <div className="text-sm text-slate-300">Featured</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{samplePhotos.reduce((acc, p) => acc + p.likes, 0)}</div>
                <div className="text-sm text-slate-300">Total Likes</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{allTags.length}</div>
                <div className="text-sm text-slate-300">Categories</div>
              </CardContent>
            </Card>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">No photos found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>

      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </div>
  )
}