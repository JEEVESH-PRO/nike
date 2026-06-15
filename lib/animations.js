import { gsap } from 'gsap'

export function splitChars(el) {
  if (!el) return []
  const text = el.textContent
  el.textContent = ''
  el.setAttribute('aria-label', text)
  const chars = []
  text.split('').forEach((char) => {
    const span = document.createElement('span')
    span.className = 'inline-block overflow-hidden'
    span.setAttribute('aria-hidden', 'true')
    const inner = document.createElement('span')
    inner.className = 'char-inner inline-block'
    inner.textContent = char === ' ' ? '\u00A0' : char
    span.appendChild(inner)
    el.appendChild(span)
    chars.push(inner)
  })
  return chars
}

export function splitWords(el) {
  if (!el) return []
  const text = el.textContent.trim()
  el.textContent = ''
  el.setAttribute('aria-label', text)
  const words = []
  text.split(/\s+/).forEach((word, i) => {
    const span = document.createElement('span')
    span.className = 'inline-block overflow-hidden mr-[0.25em]'
    span.setAttribute('aria-hidden', 'true')
    const inner = document.createElement('span')
    inner.className = 'word-inner inline-block'
    inner.textContent = word
    span.appendChild(inner)
    el.appendChild(span)
    words.push(inner)
    if (i < text.split(/\s+/).length - 1) {
      el.appendChild(document.createTextNode(' '))
    }
  })
  return words
}

export function revealChars(chars, options = {}) {
  const { delay = 0, stagger = 0.03, duration = 0.8, y = 80 } = options
  return gsap.fromTo(
    chars,
    { y, opacity: 0, rotateX: -40, filter: 'blur(8px)' },
    { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration, stagger, delay, ease: 'power3.out' }
  )
}

export function blurReveal(el, options = {}) {
  const { delay = 0, duration = 1.2, y = 40 } = options
  return gsap.fromTo(
    el,
    { y, opacity: 0, filter: 'blur(12px)' },
    { y: 0, opacity: 1, filter: 'blur(0px)', duration, delay, ease: 'power3.out' }
  )
}

export function magneticElement(el, strength = 0.3) {
  if (!el) return () => {}
  const onMove = (e) => {
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' })
  }
  const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}
