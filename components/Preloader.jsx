'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lottie from 'lottie-react'
import animationData from '@/lib/nike-logo-animation.json'

export default function Preloader() {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [progressVal, setProgressVal] = useState(0)

  useEffect(() => {
    setMounted(true)
    const seen = sessionStorage.getItem('nike-campaign-seen')
    if (!seen) {
      setShow(true)
      const duration = 2600
      const start = Date.now()
      const tick = () => {
        const elapsed = Date.now() - start
        const p = Math.min(elapsed / duration, 1)
        setProgressVal(p)
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      setTimeout(() => {
        setShow(false)
        sessionStorage.setItem('nike-campaign-seen', 'true')
      }, duration + 400)
    }
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[99999] bg-dark flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,0,0,0.1)_0%,transparent_55%)]" />

          <div className="relative w-60 h-60 md:w-72 md:h-72 animate-breathe">
            <Lottie animationData={animationData} loop={false} autoplay />
          </div>

          <div className="relative mt-8 flex flex-col items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-body">Forged in Movement</p>
            <div className="relative w-40 h-[2px] bg-white/10 overflow-hidden rounded-full">
              <div
                className="h-full bg-accent rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progressVal * 100}%`, boxShadow: '0 0 10px rgba(204,0,0,0.4)' }}
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-body">
              {Math.round(progressVal * 100).toString().padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
