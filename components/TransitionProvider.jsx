'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function TransitionProvider({ children }) {
  const pathname = usePathname()
  const curtainRef = useRef(null)
  const contentRef = useRef(null)
  const labelRef = useRef(null)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      // #region agent log
      fetch('http://127.0.0.1:7558/ingest/3173c7c3-79db-4c24-80a1-6a04e646ce45',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6afc59'},body:JSON.stringify({sessionId:'6afc59',location:'TransitionProvider.jsx:firstLoad',message:'First load content fade starting',data:{pathname},timestamp:Date.now(),runId:'post-fix',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 })
      return
    }

    const curtain = curtainRef.current
    const content = contentRef.current
    const label = labelRef.current
    if (!curtain || !content) return

    const tl = gsap.timeline()
    tl.set(curtain, { y: '100%', opacity: 1 })
      .set(label, { opacity: 1, y: 0 })
      .to(curtain, { y: '0%', duration: 0.5, ease: 'power3.inOut' })
      .to(label, { opacity: 0, y: -20, duration: 0.3 }, '-=0.1')
      .set(content, { opacity: 0, y: 40, filter: 'blur(12px)' })
      .to(curtain, { y: '-100%', duration: 0.6, ease: 'power3.inOut' })
      .to(content, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .set(curtain, { y: '100%' })

    return () => tl.kill()
  }, [pathname])

  return (
    <>
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[99990] bg-dark pointer-events-none flex items-center justify-center overflow-hidden"
        style={{ transform: 'translateY(100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,0,0,0.15)_0%,transparent_60%)]" />
        <p
          ref={labelRef}
          className="label-caps text-accent glow-red-text opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          Just Do It
        </p>
      </div>
      <main ref={contentRef} className="flex-1">
        {children}
      </main>
    </>
  )
}
