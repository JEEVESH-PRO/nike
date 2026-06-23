'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function TransitionProvider({ children }) {
  const pathname = usePathname()
  const swooshRef = useRef(null)
  const swooshInnerRef = useRef(null)
  const contentRef = useRef(null)
  const isFirst = useRef(true)

  useEffect(() => {
    const swoosh = swooshRef.current
    const swooshInner = swooshInnerRef.current
    const content = contentRef.current
    if (!swoosh || !content) return

    if (isFirst.current) {
      isFirst.current = false
      gsap.fromTo(content, { opacity: 0, y: 30, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 })
      return
    }

    const tl = gsap.timeline({
      onComplete: () => gsap.set(swoosh, { visibility: 'hidden' }),
    })

    tl.set(swoosh, { visibility: 'visible', x: '-101%' })
      .set(swooshInner, { scaleX: 0, transformOrigin: 'left center' })
      .set(content, { opacity: 0, scale: 0.98 })

      .to(swoosh, { x: '0%', duration: 0.5, ease: 'power3.inOut' })
      .to(swooshInner, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, '-=0.3')

      .to(swoosh, { x: '101%', duration: 0.6, ease: 'power3.inOut' }, '-=0.2')

      .to(content, {
        opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out',
      }, '-=0.3')

    return () => {
      tl.kill()
      gsap.set(swoosh, { visibility: 'hidden' })
    }
  }, [pathname])

  return (
    <>
      <div
        ref={swooshRef}
        className="fixed inset-0 z-[99990] pointer-events-none"
        style={{ transform: 'translateX(-101%)' }}
      >
        <div className="absolute inset-0 bg-dark" />
        <div
          ref={swooshInnerRef}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #CC0000 0%, #E60000 25%, #FF3333 50%, #E60000 75%, #CC0000 100%)',
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
            transformOrigin: 'left center',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.02) 55%, transparent 65%)',
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
          }}
        />
      </div>
      <main ref={contentRef} className="flex-1" style={{ transform: 'translateZ(0)' }}>
        {children}
      </main>
    </>
  )
}
