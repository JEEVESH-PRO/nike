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
    let lenis
    let rafId

    const init = async () => {
      const Lenis = (await import('lenis')).default
      lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.7,
        touchMultiplier: 1.2,
      })
      setLenisInstance(lenis)

      lenis.on('scroll', () => ScrollTrigger.update())

      const raf = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
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
