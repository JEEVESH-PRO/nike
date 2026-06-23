'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import TextReveal from './TextReveal'

export default function Craftsmanship() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const textInnerRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl
        .fromTo(imageRef.current, { scale: 1.15, opacity: 0.4, filter: 'brightness(0.6)' }, { scale: 1, opacity: 1, filter: 'brightness(1)', duration: 1.4, ease: 'power2.out' })
        .fromTo(overlayRef.current, { opacity: 0.2 }, { opacity: 1, duration: 1 }, '-=1')
        .fromTo(textInnerRef.current?.children, { y: 60, opacity: 0, rotateX: 15 }, {
          y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        }, '-=0.6')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-section="craft" className="relative h-screen overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1920&q=80"
          alt="Craftsmanship detail"
          className="w-full h-full object-cover"
          data-cursor="image"
        />
      </div>
      <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-b from-dark/95 via-dark/40 to-dark/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-transparent to-dark/60" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="scan-line-overlay absolute inset-0 z-[2] pointer-events-none" />

      <div ref={textRef} className="absolute inset-0 flex items-center justify-center px-6">
        <div ref={textInnerRef} className="text-center max-w-4xl" style={{ perspective: '1000px' }}>
          <TextReveal as="p" className="headline-lg text-white block" trigger={false}>
            Every Stitch, Considered
          </TextReveal>
          <div className="w-16 h-px bg-accent mx-auto my-8 sm:my-10" />
          <p className="label-caps text-white/35 max-w-md mx-auto tracking-[0.4em]">
            Engineered for those who refuse to stand still
          </p>
          <div className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-5xl font-display text-white">50+</p>
              <p className="label-caps text-white/20 mt-2">Years of Innovation</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-3xl md:text-5xl font-display text-white">75K</p>
              <p className="label-caps text-white/20 mt-2">Patent Designs</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-3xl md:text-5xl font-display text-white">190+</p>
              <p className="label-caps text-white/20 mt-2">Countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
