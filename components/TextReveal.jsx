'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function splitToHtml(text) {
  return text.split('').map((char) => {
    const c = char === ' ' ? '\u00A0' : char
    const w = char === ' ' ? ' style="width:0.35em"' : ''
    return `<span class="inline-block overflow-hidden" aria-hidden="true"><span class="inline-block will-change-transform"${w}>${c}</span></span>`
  }).join('')
}

export default function TextReveal({ children, className = '', as: Tag = 'span', delay = 0, stagger = 0.04, trigger = true }) {
  const ref = useRef(null)
  const html = useRef(null)

  if (!html.current && typeof children === 'string') {
    html.current = splitToHtml(children)
  }

  useEffect(() => {
    const el = ref.current
    if (!el || !html.current) return

    const chars = el.querySelectorAll('.will-change-transform')
    if (!chars.length) return

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

  if (html.current) {
    return <Tag ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html.current }} aria-label={children} />
  }

  return <Tag ref={ref} className={className}>{children}</Tag>
}
