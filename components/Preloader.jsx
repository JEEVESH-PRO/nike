'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MIN_DURATION = 1800

export default function Preloader() {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [progressVal, setProgressVal] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    setMounted(true)
    const seen = sessionStorage.getItem('nike-campaign-seen')
    if (seen) return

    setShow(true)
    document.body.classList.add('preloader-active')

    const start = performance.now()
    let rafId
    let done = false

    const finish = () => {
      if (done) return
      done = true
      setProgressVal(1)
      setExiting(true)
      window.setTimeout(() => {
        setShow(false)
        document.body.classList.remove('preloader-active')
        sessionStorage.setItem('nike-campaign-seen', 'true')
      }, 500)
    }

    const tick = (now) => {
      const elapsed = now - start
      const timeProgress = Math.min(elapsed / MIN_DURATION, 0.92)
      setProgressVal(timeProgress)
      if (elapsed < MIN_DURATION) {
        rafId = requestAnimationFrame(tick)
      }
    }
    rafId = requestAnimationFrame(tick)

    const onLoad = () => {
      cancelAnimationFrame(rafId)
      const elapsed = performance.now() - start
      const remaining = Math.max(0, MIN_DURATION - elapsed)
      window.setTimeout(finish, remaining)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('load', onLoad)
      document.body.classList.remove('preloader-active')
    }
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.02 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[99999] bg-dark flex flex-col items-center justify-center overflow-hidden touch-none"
          aria-hidden={!show}
          aria-busy={!exiting}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,0,0,0.12)_0%,transparent_60%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex flex-col items-center gap-8 px-6"
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32">
              <motion.div
                className="absolute inset-0 rounded-full border border-white/10"
                animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <img
                src="/images/nike-logo.svg"
                alt=""
                className="absolute inset-0 m-auto w-16 sm:w-20 h-auto brightness-0 invert"
              />
            </div>

            <div className="flex flex-col items-center gap-3 w-full max-w-[200px]">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-body text-center">
                Forged in Movement
              </p>
              <div className="relative w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-accent rounded-full origin-left"
                  style={{ width: `${progressVal * 100}%`, boxShadow: '0 0 12px rgba(230,0,0,0.5)' }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/25 font-body tabular-nums">
                {Math.round(progressVal * 100).toString().padStart(3, '0')}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
