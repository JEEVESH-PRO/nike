'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '1964', title: 'The Beginning', desc: 'Blue Ribbon Sports is founded by Bill Bowerman and Phil Knight.' },
  { year: '1971', title: 'Born of Nike', desc: 'The Nike name and iconic Swoosh logo are introduced.' },
  { year: '1988', title: 'Just Do It', desc: 'The legendary slogan is born, becoming a global movement.' },
  { year: '2000', title: 'Global Leader', desc: 'Nike becomes the world leader in athletic footwear and apparel.' },
  { year: '2024', title: 'The Future', desc: 'Innovation continues with sustainable materials and cutting-edge tech.' },
]

export default function AboutPage() {
  const quoteRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: quoteRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    )
  }, [])

  return (
    <div className="pt-28 pb-24">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-dark">
        <img src="https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1920&q=80" alt="Stadium" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/50 to-dark/80" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 text-center px-6">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }} className="text-5xl md:text-7xl font-display text-white">
            Our Story
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }} className="mt-4 text-white/40 font-body text-sm max-w-md mx-auto">
            From a handshake in 1964 to a global movement.
          </motion.p>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[1px] bg-white/10" />
          {timeline.map((item, i) => (
            <motion.div key={item.year} initial={{ opacity: 0, filter: 'blur(6px)', x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }} className="relative flex items-start gap-6 mb-16 pl-12 md:pl-0 md:even:flex-row-reverse">
              <div className="hidden md:flex flex-1 justify-end pr-12 text-right">
                <div>
                  <span className="text-2xl font-display text-accent glow-red-text">{item.year}</span>
                  <h3 className="text-lg font-display mt-1 text-white">{item.title}</h3>
                  <p className="text-sm text-white/50 font-body mt-1 max-w-xs ml-auto">{item.desc}</p>
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1 w-3 h-3 rounded-full bg-accent z-10 shadow-[0_0_10px_rgba(204,0,0,0.5)]" />
              <div className="md:hidden flex-1">
                <span className="text-lg font-display text-accent">{item.year}</span>
                <h3 className="text-base font-display mt-0.5 text-white">{item.title}</h3>
                <p className="text-xs text-white/50 font-body mt-1">{item.desc}</p>
              </div>
              <div className="hidden md:flex flex-1 pl-12">
                <div>
                  <span className="text-2xl font-display text-accent">{item.year}</span>
                  <h3 className="text-lg font-display mt-1 text-white">{item.title}</h3>
                  <p className="text-sm text-white/50 font-body mt-1 max-w-xs">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section ref={quoteRef} className="py-32 px-6 md:px-12 bg-carbon border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <blockquote>
            <p className="text-3xl md:text-5xl font-display text-white leading-tight">
              &ldquo;If you have a body, you are an athlete.&rdquo;
            </p>
            <footer className="mt-6 text-xs uppercase tracking-[0.2em] text-accent font-body">— Bill Bowerman</footer>
          </blockquote>
        </div>
      </section>
    </div>
  )
}
