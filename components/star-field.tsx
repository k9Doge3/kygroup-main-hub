'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  size: number
  speed: number
  opacity: number
  color: string
  pulse: number
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

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
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 4000)
      
      const colors = [
        '#ffffff', '#e0e7ff', '#c7d2fe', '#a5b4fc', 
        '#818cf8', '#6366f1', '#4f46e5', '#3730a3'
      ]
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: Math.random() * 3 + 0.5,
          speed: Math.random() * 0.8 + 0.2,
          opacity: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2
        })
      }
      
      starsRef.current = stars
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create constellation connections
      const nearbyStars: Star[] = []
      
      starsRef.current.forEach((star, index) => {
        const factor = Math.min(1000 / (star.z + 1), 1)
        const x = (star.x - canvas.width / 2) * factor + canvas.width / 2
        const y = (star.y - canvas.height / 2) * factor + canvas.height / 2
        const size = star.size * factor
        
        // Skip stars that are too far or too close
        if (size < 0.1 || size > 10) return
        
        // Update pulse for twinkling
        star.pulse += 0.05
        const twinkle = Math.sin(star.pulse) * 0.3 + 0.7
        
        // Mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(x - mouseRef.current.x, 2) + Math.pow(y - mouseRef.current.y, 2)
        )
        const mouseEffect = Math.max(0, 1 - mouseDistance / 200)
        
        ctx.save()
        ctx.globalAlpha = star.opacity * twinkle * (0.5 + mouseEffect * 0.5)
        ctx.fillStyle = star.color
        ctx.shadowBlur = size * (2 + mouseEffect * 3)
        ctx.shadowColor = star.color
        
        // Draw star
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add to nearby stars for constellation lines
        if (nearbyStars.length < 50 && size > 1) {
          nearbyStars.push({ ...star, x, y })
        }
        
        ctx.restore()
      })
      
      // Draw constellation lines
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.1)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < nearbyStars.length; i++) {
        for (let j = i + 1; j < nearbyStars.length; j++) {
          const distance = Math.sqrt(
            Math.pow(nearbyStars[i].x - nearbyStars[j].x, 2) +
            Math.pow(nearbyStars[i].y - nearbyStars[j].y, 2)
          )
          
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(nearbyStars[i].x, nearbyStars[i].y)
            ctx.lineTo(nearbyStars[j].x, nearbyStars[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animateStars = () => {
      starsRef.current.forEach(star => {
        star.z -= star.speed
        
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width
          star.y = Math.random() * canvas.height
          star.z = 1000
        }
      })
      
      drawStars()
      animationRef.current = requestAnimationFrame(animateStars)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleResize = () => {
      resizeCanvas()
      createStars()
    }

    resizeCanvas()
    createStars()
    animateStars()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900" />
      
      {/* Radial overlays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-800/10 via-transparent to-transparent" />
      </div>
      
      {/* Animated stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full bg-transparent mix-blend-normal"
      />
      
      {/* Nebula effects */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/6 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>
      
      {/* Shooting stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-shooting-star opacity-70" />
        <div className="absolute top-3/5 -right-10 w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-shooting-star-delayed opacity-60" />
        <div className="absolute bottom-1/3 -left-10 w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent animate-shooting-star-slow opacity-50" />
      </div>
    </div>
  )
}