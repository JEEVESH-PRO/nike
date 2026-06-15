'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from './TextReveal'

gsap.registerPlugin(ScrollTrigger)

const innovations = [
  { title: 'Flyknit', desc: 'Revolutionary yarn technology creating lightweight, form-fitting uppers with zero waste.', num: '01' },
  { title: 'Dri-FIT', desc: 'Moisture-wicking fabric keeping athletes dry, comfortable, and performing at peak.', num: '02' },
  { title: 'Air Max', desc: 'Visible Air cushioning that changed sneaker culture forever. Maximum comfort, maximum style.', num: '03' },
]

export default function InnovationSplit() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          gsap.set(imageRef.current, { y: self.progress * -60, scale: 1 + self.progress * 0.08 })
        },
      })

      gsap.fromTo(cardsRef.current?.children, { y: 80, opacity: 0, filter: 'blur(8px)' }, {
        y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-section="innovation" className="relative py-32 md:py-40 px-6 md:px-12 bg-carbon overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(230,0,0,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <div>
            <span className="label-caps text-accent">Heritage</span>
            <TextReveal as="h2" className="headline-lg text-white mt-4 mb-8 block">
              From Handshake to Movement
            </TextReveal>
            <p className="text-sm md:text-base text-white/45 font-body leading-relaxed max-w-lg">
              In 1964, Bill Bowerman and Phil Knight shook hands on a partnership that would change sport forever. What started as Blue Ribbon Sports became Nike — built on innovation, passion, and the relentless pursuit of better.
            </p>
            <div className="w-24 h-px bg-accent mt-10" />
          </div>

          <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden will-change-transform" data-cursor="image">
            <img src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&q=80" alt="Nike heritage" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent" />
            <div className="absolute inset-0 border border-white/5" />
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {innovations.map((item) => (
            <div key={item.title} className="group relative p-8 md:p-10 glass hover:border-accent/20 transition-all duration-700 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="text-5xl font-display text-white/[0.06] group-hover:text-accent/20 transition-colors duration-500">{item.num}</span>
              <h3 className="text-2xl md:text-3xl font-display text-white mt-6 mb-4 group-hover:text-accent transition-colors duration-500 uppercase">{item.title}</h3>
              <p className="text-sm text-white/45 font-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
