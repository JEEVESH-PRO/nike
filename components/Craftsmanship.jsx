'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from './TextReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Craftsmanship() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            onUpdate: (self) => {
              gsap.set(imageRef.current, { scale: 1 + self.progress * 0.12, y: self.progress * -30 })
            },
          })
        },
      })

      gsap.fromTo(textRef.current?.children, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-section="craft" className="relative min-h-[70vh] md:min-h-screen overflow-hidden">
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1920&q=80"
        alt="Craftsmanship detail"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        data-cursor="image"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/40 to-dark/90" />
      <div className="absolute inset-0 noise-overlay" />

      <div ref={textRef} className="absolute inset-0 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <TextReveal as="p" className="headline-lg text-white block" trigger={false}>
            Every Stitch, Considered
          </TextReveal>
          <div className="w-20 h-px bg-accent mx-auto mt-10 mb-10" />
          <p className="label-caps text-white/35 max-w-md mx-auto">
            Engineered for those who refuse to stand still
          </p>
        </div>
      </div>
    </section>
  )
}
