'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import TextReveal from './TextReveal'

const innovations = [
  { title: 'Flyknit', desc: 'Revolutionary yarn technology creating lightweight, form-fitting uppers with zero waste. Every thread engineered for purpose.', num: '01' },
  { title: 'Dri-FIT', desc: 'Moisture-wicking fabric keeping athletes dry, comfortable, and performing at peak. Science worn by champions.', num: '02' },
  { title: 'Air Max', desc: 'Visible Air cushioning that changed sneaker culture forever. Maximum comfort meets maximum style.', num: '03' },
]

export default function InnovationSplit() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl
        .fromTo(contentRef.current, { y: 50, opacity: 0, perspective: 800, rotateX: 5 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, delay: 0.1 })
        .fromTo(cardsRef.current?.children, { y: 70, opacity: 0, scale: 0.9, filter: 'blur(6px)' }, {
          y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.15, ease: 'back.out(1.3)',
        }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-section="innovation" className="relative h-screen bg-carbon overflow-hidden flex flex-col justify-center px-4 sm:px-6 md:px-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(230,0,0,0.06),transparent_50%)]" />
      <div className="absolute top-[20%] right-[10%] w-32 h-32 border border-white/5 rounded-full animate-float-slow" />
      <div className="absolute bottom-[15%] left-[5%] w-20 h-20 border border-accent/10 rounded-full animate-kinetic" />

      <div ref={contentRef} className="max-w-7xl mx-auto w-full mb-10 md:mb-16" style={{ perspective: '800px' }}>
        <span className="label-caps text-accent">Heritage</span>
        <TextReveal as="h2" className="headline-lg text-white mt-4 block">
          From Handshake to Movement
        </TextReveal>
        <p className="text-sm md:text-base text-white/45 font-body leading-relaxed max-w-lg mt-6">
          In 1964, Bill Bowerman and Phil Knight shook hands on a partnership that would change sport forever. What started as Blue Ribbon Sports became Nike\u2014built on innovation, passion, and the relentless pursuit of better.
        </p>
        <div className="w-24 h-px bg-accent mt-8" />
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto w-full" style={{ perspective: '1200px' }}>
        {innovations.map((item, i) => (
          <div key={item.title} className="group relative p-6 md:p-8 lg:p-10 glass hover:border-accent/30 transition-all duration-700 overflow-hidden morph-card" data-cursor="view">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="flex items-center justify-between mb-6">
              <span className="text-6xl font-display text-white/[0.04] group-hover:text-accent/15 transition-all duration-500 group-hover:scale-110">{item.num}</span>
              <div className="w-8 h-px bg-white/10 group-hover:w-16 group-hover:bg-accent/40 transition-all duration-500" />
            </div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-display text-white mb-3 group-hover:text-accent transition-all duration-500 uppercase group-hover:tracking-wider">{item.title}</h3>
            <p className="text-sm text-white/45 font-body leading-relaxed">{item.desc}</p>

            <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/10 group-hover:text-accent/40 transition-all duration-500">
              <span>Explore</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M1 6h10M7 2l4 4-4 4" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
