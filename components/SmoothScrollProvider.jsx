'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { shouldUseSmoothScroll } from '@/lib/device'
import LenisContext from './LenisContext'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollProvider({ children }) {
  const pathname = usePathname()
  const [lenisInstance, setLenisInstance] = useState(null)

  useEffect(() => {
    let lenis
    let rafId
    let onNativeScroll

    const useSmooth = shouldUseSmoothScroll()
    document.documentElement.classList.toggle('native-scroll', !useSmooth)

    // #region agent log
    fetch('http://127.0.0.1:7558/ingest/3173c7c3-79db-4c24-80a1-6a04e646ce45',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6afc59'},body:JSON.stringify({sessionId:'6afc59',location:'SmoothScrollProvider.jsx:init',message:'Scroll provider init',data:{useSmooth,pathname},timestamp:Date.now(),runId:'pre-fix',hypothesisId:'C'})}).catch(()=>{});
    // #endregion

    const init = async () => {
      if (useSmooth) {
        const Lenis = (await import('lenis')).default
        lenis = new Lenis({
          duration: 1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.85,
          touchMultiplier: 1,
        })
        setLenisInstance(lenis)

        lenis.on('scroll', ScrollTrigger.update)

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
      } else {
        onNativeScroll = () => ScrollTrigger.update()
        window.addEventListener('scroll', onNativeScroll, { passive: true })
      }

      ScrollTrigger.config({ limitCallbacks: true })
      ScrollTrigger.refresh()
    }

    init()

    return () => {
      if (lenis) lenis.destroy()
      if (rafId) cancelAnimationFrame(rafId)
      if (onNativeScroll) window.removeEventListener('scroll', onNativeScroll)
      document.documentElement.classList.remove('native-scroll')
      setLenisInstance(null)
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
