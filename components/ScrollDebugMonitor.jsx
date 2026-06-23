'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { shouldUseSmoothScroll } from '@/lib/device'

const ENDPOINT = 'http://127.0.0.1:7558/ingest/3173c7c3-79db-4c24-80a1-6a04e646ce45'
const SESSION = '6afc59'

function sendLog(location, message, data, hypothesisId) {
  // #region agent log
  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': SESSION },
    body: JSON.stringify({ sessionId: SESSION, location, message, data, hypothesisId, timestamp: Date.now(), runId: 'pre-fix' }),
  }).catch(() => {})
  // #endregion
}

export default function ScrollDebugMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    sendLog('ScrollDebugMonitor.jsx:init', 'Monitor mounted', {
      useSmoothScroll: shouldUseSmoothScroll(),
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollHeight: document.documentElement.scrollHeight,
    }, 'C')

    let rafId
    let lastScrollY = -1
    let sampleCounter = 0

    const sample = () => {
      const scrollY = window.scrollY
      const scrolling = Math.abs(scrollY - lastScrollY) > 1
      lastScrollY = scrollY
      sampleCounter++

      if (!scrolling && sampleCounter % 120 !== 0) {
        rafId = requestAnimationFrame(sample)
        return
      }

      const sections = Array.from(document.querySelectorAll('[data-section]'))
      const sectionRects = sections.map((el) => {
        const r = el.getBoundingClientRect()
        return {
          id: el.getAttribute('data-section'),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          height: Math.round(r.height),
        }
      })

      const gaps = []
      for (let i = 1; i < sectionRects.length; i++) {
        const gap = sectionRects[i].top - sectionRects[i - 1].bottom
        if (gap > 8) {
          gaps.push({
            from: sectionRects[i - 1].id,
            to: sectionRects[i].id,
            gapPx: Math.round(gap),
          })
        }
      }

      const pinSpacers = Array.from(document.querySelectorAll('.pin-spacer')).map((el, i) => {
        const r = el.getBoundingClientRect()
        return { index: i, height: Math.round(r.height), top: Math.round(r.top), bottom: Math.round(r.bottom) }
      })

      const activePins = ScrollTrigger.getAll()
        .filter((st) => st.pin && st.isActive)
        .map((st) => ({
          trigger: st.trigger?.getAttribute?.('data-section') || st.trigger?.className?.slice?.(0, 40) || 'unknown',
          progress: Number(st.progress.toFixed(3)),
          start: st.start,
          end: st.end,
        }))

      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const centerEl = document.elementFromPoint(cx, cy)
      const centerBg = centerEl ? getComputedStyle(centerEl).backgroundColor : 'none'
      const mainOpacity = document.querySelector('main') ? getComputedStyle(document.querySelector('main')).opacity : 'n/a'

      const viewportMostlyEmpty = centerEl && (centerEl.tagName === 'HTML' || centerEl.tagName === 'BODY' || centerEl.classList?.contains('bg-dark'))

      if (gaps.length > 0 || pinSpacers.some((p) => p.height > window.innerHeight * 1.5) || viewportMostlyEmpty) {
        sendLog('ScrollDebugMonitor.jsx:sample', 'Scroll anomaly detected', {
          scrollY: Math.round(scrollY),
          gaps,
          pinSpacers,
          activePins,
          centerTag: centerEl?.tagName,
          centerClass: centerEl?.className?.slice?.(0, 60),
          centerBg,
          mainOpacity,
          viewportMostlyEmpty,
          sectionRects,
        }, gaps.length > 0 ? 'B' : pinSpacers.length > 0 ? 'A' : 'E')
      }

      rafId = requestAnimationFrame(sample)
    }

    rafId = requestAnimationFrame(sample)

    const onRefresh = () => {
      sendLog('ScrollDebugMonitor.jsx:refresh', 'ScrollTrigger refreshed', {
        triggerCount: ScrollTrigger.getAll().length,
        scrollHeight: document.documentElement.scrollHeight,
        pins: ScrollTrigger.getAll().filter((st) => st.vars?.pin).map((st) => ({
          trigger: st.trigger?.getAttribute?.('data-section') || 'unknown',
          end: st.end,
        })),
      }, 'A')
    }

    ScrollTrigger.addEventListener('refresh', onRefresh)
    window.setTimeout(onRefresh, 1500)

    return () => {
      cancelAnimationFrame(rafId)
      ScrollTrigger.removeEventListener('refresh', onRefresh)
    }
  }, [])

  return null
}
