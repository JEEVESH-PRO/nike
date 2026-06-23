'use client'

import { useEffect, useState } from 'react'
import { isMobileViewport } from '@/lib/device'

export default function BackgroundEffects() {
  const [showEffects, setShowEffects] = useState(false)

  useEffect(() => {
    setShowEffects(!isMobileViewport())
  }, [])

  if (!showEffects) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute rounded-full opacity-60"
        style={{
          left: '10%', top: '20%', width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(204,0,0,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full opacity-40 hidden md:block"
        style={{
          right: '10%', bottom: '15%', width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.015)_0%,transparent_50%)]" />
    </div>
  )
}
