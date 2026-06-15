'use client'

import { useEffect, useRef } from 'react'

function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const stateRef = useRef('default')
  const rafId = useRef(null)

  useEffect(() => {
    if (isTouchDevice()) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const getState = (target) => {
      const tag = target.tagName?.toLowerCase()
      const type = target.getAttribute?.('data-cursor')
      if (target.closest?.('[data-cursor="product"]') || type === 'product') return 'shop'
      if (target.closest?.('[data-cursor="shop"]') || type === 'shop') return 'shop'
      if (target.closest?.('[data-cursor="image"]') || type === 'image') return 'explore'
      if (target.closest?.('[data-cursor="video"]') || type === 'video') return 'play'
      if (tag === 'a' || target.closest?.('a')) return 'view'
      if (tag === 'button' || target.closest?.('button')) return 'view'
      return 'default'
    }

    const onMouseOver = (e) => {
      const s = getState(e.target)
      stateRef.current = s
      ring.style.transition = 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.4s, border-color 0.3s, background 0.3s, box-shadow 0.3s'

      const cfg = {
        shop: { w: 72, border: 'rgba(204,0,0,0.6)', bg: 'rgba(204,0,0,0.1)', glow: '0 0 30px rgba(204,0,0,0.2)', label: 'Shop', color: '#CC0000' },
        explore: { w: 72, border: 'rgba(255,255,255,0.5)', bg: 'rgba(255,255,255,0.06)', glow: '0 0 30px rgba(255,255,255,0.08)', label: 'Explore', color: '#fff' },
        play: { w: 72, border: 'rgba(204,0,0,0.6)', bg: 'rgba(204,0,0,0.1)', glow: '0 0 30px rgba(204,0,0,0.2)', label: 'Play', color: '#CC0000' },
        view: { w: 48, border: 'rgba(204,0,0,0.5)', bg: 'rgba(204,0,0,0.06)', glow: '0 0 20px rgba(204,0,0,0.1)', label: 'View', color: '#CC0000' },
        default: { w: 28, border: 'rgba(255,255,255,0.25)', bg: 'transparent', glow: 'none', label: '', color: '' },
      }
      const c = cfg[s] || cfg.default
      ringRef.current._w = c.w
      ring.style.width = `${c.w}px`
      ring.style.height = `${c.w}px`
      ring.style.borderColor = c.border
      ring.style.background = c.bg
      ring.style.boxShadow = c.glow
      dot.style.opacity = s === 'default' ? '1' : '0'
      ring.innerHTML = c.label
        ? `<span style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:${c.color};font-family:Inter,sans-serif;font-weight:600">${c.label}</span>`
        : ''
    }

    const onMouseOut = () => {
      stateRef.current = 'default'
      ringRef.current._w = 28
      ring.style.transition = 'width 0.4s, height 0.4s, border-color 0.4s, background 0.4s, box-shadow 0.4s'
      ring.style.width = '28px'
      ring.style.height = '28px'
      ring.style.borderColor = 'rgba(255,255,255,0.25)'
      ring.style.background = 'transparent'
      ring.style.boxShadow = 'none'
      ring.innerHTML = ''
      dot.style.opacity = '1'
    }

    document.body.addEventListener('mouseover', onMouseOver)
    document.body.addEventListener('mouseout', onMouseOut)

    let morphTime = 0
    const raf = (t) => {
      const spring = 0.15
      const ringSpring = 0.08
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * spring
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * spring
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ringSpring
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ringSpring

      dot.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`
      const rw = ringRef.current._w || 28
      ring.style.transform = `translate(${ringPos.current.x - rw / 2}px, ${ringPos.current.y - rw / 2}px)`

      if (stateRef.current === 'default') {
        morphTime += 0.016
        const m = 50 + Math.sin(morphTime * 1.5) * 6
        ring.style.borderRadius = `${m}% ${100 - m}% ${50 + Math.cos(morphTime) * 6}% ${50 - Math.cos(morphTime) * 6}%`
      } else {
        ring.style.borderRadius = '50%'
      }

      rafId.current = requestAnimationFrame(raf)
    }
    raf()

    window.addEventListener('mousemove', onMouse)

    return () => {
      window.removeEventListener('mousemove', onMouse)
      document.body.removeEventListener('mouseover', onMouseOver)
      document.body.removeEventListener('mouseout', onMouseOut)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  if (isTouchDevice()) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#CC0000',
          boxShadow: '0 0 10px rgba(204,0,0,0.5), 0 0 20px rgba(204,0,0,0.2)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none flex items-center justify-center"
        style={{
          width: 28, height: 28, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.25)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
    </>
  )
}
