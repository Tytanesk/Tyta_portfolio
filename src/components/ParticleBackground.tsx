import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  color: string
  glow: boolean
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.body.scrollHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#a78bfa', '#f97316', '#3b82f6', '#ec4899', '#ffffff', '#60a5fa']

    // Mix of tiny stars + larger glowing orbs
    const particles: Particle[] = Array.from({ length: 220 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: i < 40 ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.3,
      alpha: i < 40 ? Math.random() * 0.8 + 0.4 : Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      glow: i < 40,
    }))

    // Nebula blobs
    const blobs = [
      { x: canvas.width * 0.15, y: canvas.height * 0.08, r: 320, color: '#7c3aed' },
      { x: canvas.width * 0.85, y: canvas.height * 0.12, r: 280, color: '#ea580c' },
      { x: canvas.width * 0.5,  y: canvas.height * 0.35, r: 260, color: '#1d4ed8' },
      { x: canvas.width * 0.1,  y: canvas.height * 0.55, r: 200, color: '#9333ea' },
      { x: canvas.width * 0.9,  y: canvas.height * 0.65, r: 220, color: '#c2410c' },
      { x: canvas.width * 0.5,  y: canvas.height * 0.8,  r: 240, color: '#6d28d9' },
    ]

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw nebula blobs
      blobs.forEach(b => {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        grad.addColorStop(0, b.color + '55')
        grad.addColorStop(0.5, b.color + '22')
        grad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.globalAlpha = p.alpha

        if (p.glow) {
          // Large glowing orb with shadow
          ctx.shadowBlur = 20
          ctx.shadowColor = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  )
}
