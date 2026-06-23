'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LenisContext from './LenisContext'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollProvider({ children }) {
  const pathname = usePathname()
  const [lenisInstance, setLenisInstance] = useState(null)

  useEffect(() => {
    let cancelled = false
    let lenis
    let rafId

    const init = async () => {
      const Lenis = (await import('lenis')).default
      if (cancelled) return
      lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.0,
      })
      setLenisInstance(lenis)

      lenis.on('scroll', () => ScrollTrigger.update())

      const raf = (time) => {
        lenis.raf(time)
        if (!cancelled) rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true })
          }
          return lenis.scroll
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
        },
        pinType: 'fixed',
      })

      ScrollTrigger.refresh()
    }

    init()

    return () => {
      cancelled = true
      if (lenis) lenis.destroy()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [pathname])

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      <div className="bg-dark text-white">{children}</div>
    </LenisContext.Provider>
  )
}
