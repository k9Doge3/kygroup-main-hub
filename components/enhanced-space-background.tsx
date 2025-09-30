'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
}

export function EnhancedSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      const stars: Star[] = []
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 8000)
      
      const colors = ['#ffffff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1']
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      
      starsRef.current = stars
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      starsRef.current.forEach(star => {
        ctx.save()
        ctx.globalAlpha = star.opacity
        ctx.fillStyle = star.color
        ctx.shadowBlur = star.size * 2
        ctx.shadowColor = star.color
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add twinkling effect
        if (Math.random() < 0.005) {
          star.opacity = Math.random() * 0.8 + 0.2
        }
        
        ctx.restore()
      })
    }

    const animateStars = () => {
      starsRef.current.forEach(star => {
        star.y += star.speed
        
        if (star.y > canvas.height) {
          star.y = -star.size
          star.x = Math.random() * canvas.width
        }
      })
      
      drawStars()
      animationRef.current = requestAnimationFrame(animateStars)
    }

    const handleResize = () => {
      resizeCanvas()
      createStars()
    }

    resizeCanvas()
    createStars()
    animateStars()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900" />
      
      {/* Radial Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent" />
      
      {/* Animated Stars Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full bg-transparent"
      />
      
      {/* Nebula Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      {/* Shooting Stars */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-1 h-1 bg-white rounded-full animate-ping opacity-75 [animation-delay:0s] [animation-duration:4s]" />
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping opacity-75 [animation-delay:2s] [animation-duration:3s]" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-75 [animation-delay:1s] [animation-duration:5s]" />
      </div>
    </div>
  )
}