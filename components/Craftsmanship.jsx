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
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(imageRef.current, { scale: 1 + self.progress * 0.15, y: self.progress * -40 })
        },
      })

      gsap.fromTo(textRef.current?.children, { y: 60, opacity: 0, filter: 'blur(10px)' }, {
        y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-section="craft" className="relative h-[90vh] md:h-screen overflow-hidden">
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
