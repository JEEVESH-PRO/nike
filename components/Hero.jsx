'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TransitionLink from './TransitionLink'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const imageRef = useRef(null)
  const overlayRef = useRef(null)
  const headlineRef = useRef(null)
  const sublineRef = useRef(null)
  const tagRef = useRef(null)
  const ctasRef = useRef(null)
  const scrollRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = headlineRef.current
      const chars = []
      if (headline) {
        const text = headline.textContent
        headline.textContent = ''
        headline.setAttribute('aria-label', text)
        text.split('').forEach((char) => {
          const wrap = document.createElement('span')
          wrap.className = 'inline-block overflow-hidden'
          const inner = document.createElement('span')
          inner.className = 'inline-block'
          inner.textContent = char === ' ' ? '\u00A0' : char
          if (char === ' ') inner.style.width = '0.3em'
          wrap.appendChild(inner)
          headline.appendChild(wrap)
          chars.push(inner)
        })
      }

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .fromTo(imageRef.current, { scale: 1.5, filter: 'blur(20px)', opacity: 0 }, { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 2, ease: 'power2.out' })
        .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 }, '-=1.5')
        .fromTo(glowRef.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }, '-=1.2')
        .fromTo(tagRef.current, { y: 30, opacity: 0, letterSpacing: '0.6em' }, { y: 0, opacity: 1, letterSpacing: '0.35em', duration: 1 }, '-=1')
        .fromTo(chars, { y: 120, opacity: 0, rotateX: -60, filter: 'blur(12px)' }, { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 1, stagger: 0.035, ease: 'back.out(1.2)' }, '-=0.8')
        .fromTo(sublineRef.current, { y: 40, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 }, '-=0.5')
        .fromTo(ctasRef.current?.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 }, '-=0.4')
        .fromTo(scrollRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: pinRef.current,
          scrub: 1,
        },
      })

      scrollTl
        .to(imageRef.current, { scale: 1.2, y: -80, ease: 'none' }, 0)
        .to(overlayRef.current, { opacity: 0.9, ease: 'none' }, 0)
        .to(headlineRef.current, { y: -60, opacity: 0.3, scale: 0.95, ease: 'none' }, 0)
        .to(sublineRef.current, { y: -40, opacity: 0, ease: 'none' }, 0)
        .to(ctasRef.current, { y: -30, opacity: 0, ease: 'none' }, 0)
        .to(glowRef.current, { scale: 1.5, opacity: 0.6, ease: 'none' }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-section="hero" className="relative h-[250vh] bg-dark">
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <img
            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&q=80"
            alt="Nike athlete in motion"
            className="w-full h-full object-cover"
            data-cursor="image"
          />
        </div>

        <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-transparent to-dark/70" />
        <div className="absolute inset-0 noise-overlay" />

        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(230,0,0,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-20">
          <p ref={tagRef} className="label-caps text-accent mb-6 md:mb-10 opacity-0">
            Just Do It
          </p>

          <h1 ref={headlineRef} className="headline-xl text-white text-center max-w-[14ch]">
            FORGED IN MOVEMENT
          </h1>

          <p ref={sublineRef} className="mt-6 md:mt-8 text-lg md:text-2xl font-display text-accent glow-red-text tracking-wider uppercase">
            Never Settle
          </p>

          <div ref={ctasRef} className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <TransitionLink href="/shop" className="btn-campaign btn-campaign-primary group" data-cursor="shop">
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </TransitionLink>
            <TransitionLink href="/about" className="btn-campaign btn-campaign-outline" data-cursor="view">
              Our Story
            </TransitionLink>
          </div>
        </div>

        <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="label-caps text-white/25">Scroll to explore</span>
          <div className="relative w-px h-20 bg-gradient-to-b from-accent/60 to-transparent overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-accent animate-pulse-glow rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
