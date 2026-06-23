'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function useMagnetic(radius = 120, strength = 0.5) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const dist = Math.sqrt(x * x + y * y)
      if (dist < radius) {
        const falloff = (radius - dist) / radius
        gsap.to(el, {
          x: x * strength * falloff,
          y: y * strength * falloff,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
      }
    }

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [radius, strength])

  return ref
}
