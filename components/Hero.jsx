'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Magnetic from './Magnetic'
import TransitionLink from './TransitionLink'

export default function Hero() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const overlayRef = useRef(null)
  const glowRef = useRef(null)
  const headlineRef = useRef(null)
  const sublineRef = useRef(null)
  const tagRef = useRef(null)
  const ctasRef = useRef(null)
  const canvasRef = useRef(null)
  const shapesRef = useRef(null)
  const scanRef = useRef(null)
  const midParallaxRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = headlineRef.current
      const chars = []
      if (headline) {
        const text = headline.textContent
        headline.textContent = ''
        headline.setAttribute('aria-label', text)
        text.split('').forEach((char) => {
          const wrap = document.createElement('span')
          wrap.className = 'inline-block overflow-hidden'
          const inner = document.createElement('span')
          inner.className = 'inline-block'
          inner.textContent = char === ' ' ? '\u00A0' : char
          if (char === ' ') inner.style.width = '0.3em'
          wrap.appendChild(inner)
          headline.appendChild(wrap)
          chars.push(inner)
        })
      }

      const shapes = shapesRef.current?.children || []
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl
        .fromTo(bgRef.current, { scale: 1.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' })
        .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, '-=1.4')
        .fromTo(glowRef.current, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }, '-=1.2')
        .fromTo(tagRef.current, { y: 30, opacity: 0, letterSpacing: '0.6em' }, { y: 0, opacity: 1, letterSpacing: '0.35em', duration: 0.8 }, '-=1')
        .fromTo(chars, { y: 100, opacity: 0, rotateX: 30 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.03, ease: 'back.out(1.4)' }, '-=0.7')
        .fromTo(sublineRef.current, { y: 40, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7 }, '-=0.4')
        .fromTo(ctasRef.current?.children, { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }, '-=0.3')
        .fromTo(shapes, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: 'back.out(2)' }, '-=0.5')
    }, sectionRef)

    return () => ctx.revert()
  }, [])



  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2d = canvas.getContext('2d')
    let animId
    let w, h

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 3 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      life: Math.random(),
      drift: Math.random() * 0.3,
      pulse: Math.random() * Math.PI * 2,
    }))

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx2d.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        p.x += p.speedX * 0.008
        p.y += p.speedY * 0.008
        p.life += 0.002
        p.pulse += 0.02
        if (p.life > 1) p.life = 0
        if (p.x < 0 || p.x > 1) p.speedX *= -1
        if (p.y < 0 || p.y > 1) p.speedY *= -1

        const alpha = Math.sin(p.life * Math.PI) * 0.6
        const pulseSize = p.size + Math.sin(p.pulse) * 0.5

        ctx2d.beginPath()
        ctx2d.arc(p.x * w, p.y * h, pulseSize, 0, Math.PI * 2)
        ctx2d.fillStyle = `rgba(230, 0, 0, ${alpha})`
        ctx2d.fill()

        const tailX = p.x * w - p.speedX * 40
        const tailY = p.y * h - p.speedY * 40
        ctx2d.beginPath()
        ctx2d.moveTo(p.x * w, p.y * h)
        ctx2d.lineTo(tailX, tailY)
        ctx2d.strokeStyle = `rgba(230, 0, 0, ${alpha * 0.25})`
        ctx2d.lineWidth = pulseSize * 0.4
        ctx2d.stroke()

        if (Math.random() > 0.99) {
          ctx2d.beginPath()
          ctx2d.arc(p.x * w, p.y * h, pulseSize * 3, 0, Math.PI * 2)
          ctx2d.fillStyle = `rgba(230, 0, 0, ${alpha * 0.05})`
          ctx2d.fill()
        }
      })
      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section ref={sectionRef} data-section="hero" className="relative h-screen bg-dark overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div ref={scanRef} className="scan-line-overlay absolute inset-0 z-[2] pointer-events-none" />

      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </div>

      <div ref={midParallaxRef} className="absolute inset-0 will-change-transform opacity-20 parallax-layer-3">
        <img
          src="https://images.unsplash.com/photo-1511556532299-8f7a0f9e1c8e?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 30%' }}
        />
      </div>

      <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-transparent to-dark/60" />
      <div className="absolute inset-0 noise-overlay hidden md:block" />

      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none animate-kinetic" style={{ background: 'radial-gradient(circle, rgba(230,0,0,0.1) 0%, transparent 60%)' }} />

      <div ref={shapesRef} className="absolute inset-0 pointer-events-none z-[1]">
        <div className="geo-shape w-16 h-16 top-[15%] right-[20%] rounded-full animate-warp" style={{ animationDelay: '0s' }} />
        <div className="geo-shape w-24 h-24 bottom-[25%] left-[10%] rounded-full animate-float-slow" style={{ animationDelay: '1s', borderColor: 'rgba(230,0,0,0.1)' }} />
        <div className="geo-shape w-12 h-12 top-[40%] right-[8%]" style={{ transform: 'rotate(45deg)', animationDelay: '2s' }} />
        <div className="geo-shape w-20 h-20 bottom-[30%] right-[25%] rounded-full animate-kinetic" style={{ animationDelay: '3s', borderColor: 'rgba(255,255,255,0.08)' }} />
        <div className="geo-shape w-8 h-8 top-[60%] left-[15%] rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s', border: 'none', background: 'rgba(230,0,0,0.15)' }} />
        <div className="geo-shape w-14 h-14 top-[20%] left-[35%]" style={{ transform: 'rotate(30deg)', animationDelay: '1.5s', borderColor: 'rgba(230,0,0,0.08)' }} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center h-full px-4 sm:px-6 md:px-12">
        <div className="flex flex-col items-center justify-center text-center z-[3] relative max-w-4xl mx-auto">
          <p ref={tagRef} className="label-caps text-accent mb-4 sm:mb-6 md:mb-10 opacity-0">
            Just Do It
          </p>

          <h1 ref={headlineRef} className="headline-xl text-white" style={{ perspective: '800px' }}>
            FORGED IN MOVEMENT
          </h1>

          <p ref={sublineRef} className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-2xl font-display text-accent glow-red-text tracking-wider uppercase">
            Never Settle
          </p>

          <div ref={ctasRef} className="mt-8 sm:mt-12 md:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
            <Magnetic radius={100} strength={0.35}>
              <TransitionLink href="/shop" className="btn-campaign btn-campaign-primary group text-center btn-ripple" data-cursor="shop">
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </TransitionLink>
            </Magnetic>
            <Magnetic radius={100} strength={0.35}>
              <TransitionLink href="/about" className="btn-campaign btn-campaign-outline text-center" data-cursor="view">
                Our Story
              </TransitionLink>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
