'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const quotes = [
  { text: 'The most comfortable sneakers I have ever worn. My performance has never been better.', name: 'Marcus Johnson', role: 'Pro Athlete' },
  { text: 'Incredible design and quality. My new favorite brand for both training and lifestyle.', name: 'Sarah Chen', role: 'Fitness Coach' },
  { text: 'The cushioning is unreal — my knees have never felt better after a marathon.', name: 'Alex Rivera', role: 'Marathon Runner' },
  { text: 'Light, responsive, and incredibly stylish. Nike never disappoints.', name: 'Emily Watson', role: 'Yoga Instructor' },
]

export default function TestimonialFade() {
  const [index, setIndex] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })
  }, [])

  return (
    <section ref={sectionRef} data-section="voices" className="relative pt-16 pb-24 md:py-32 px-4 sm:px-6 md:px-12 bg-dark overflow-hidden -mt-px">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,0,0,0.04),transparent_60%)]" />

      <div className="max-w-4xl mx-auto text-center">
        <span className="label-caps text-accent">Voices</span>
        <h2 className="text-3xl md:text-5xl font-display text-white/20 mt-4 mb-16 uppercase">What Athletes Say</h2>

        <div className="relative h-56 md:h-44">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="text-2xl md:text-4xl font-display text-white leading-snug max-w-3xl">&ldquo;{quotes[index].text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-10">
                <div className="w-8 h-px bg-accent" />
                <p className="text-sm font-body text-white/70">{quotes[index].name}</p>
                <span className="text-white/20">·</span>
                <p className="text-sm text-white/40 font-body">{quotes[index].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-[2px] transition-all duration-500 ${i === index ? 'w-16 bg-accent glow-red' : 'w-8 bg-white/15 hover:bg-white/30'}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
