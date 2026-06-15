'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TextReveal({ children, className = '', as: Tag = 'span', delay = 0, stagger = 0.04, trigger = true }) {
  const ref = useRef(null)
  const splitDone = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || splitDone.current) return

    const text = el.textContent
    el.textContent = ''
    el.setAttribute('aria-label', text)

    const chars = []
    text.split('').forEach((char) => {
      const wrap = document.createElement('span')
      wrap.className = 'inline-block overflow-hidden'
      wrap.setAttribute('aria-hidden', 'true')
      const inner = document.createElement('span')
      inner.className = 'inline-block will-change-transform'
      inner.textContent = char === ' ' ? '\u00A0' : char
      if (char === ' ') inner.style.width = '0.35em'
      wrap.appendChild(inner)
      el.appendChild(wrap)
      chars.push(inner)
    })
    splitDone.current = true

    const anim = { y: 100, opacity: 0, rotateX: -50, filter: 'blur(10px)' }
    const to = { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 0.9, stagger, delay, ease: 'power3.out' }

    if (trigger) {
      gsap.fromTo(chars, anim, {
        ...to,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      })
    } else {
      gsap.fromTo(chars, anim, to)
    }

    return () => ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === el) st.kill()
    })
  }, [delay, stagger, trigger])

  return <Tag ref={ref} className={className}>{children}</Tag>
}
