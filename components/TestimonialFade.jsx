'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const quotes = [
  { text: 'The most comfortable sneakers I have ever worn. My performance has never been better.', name: 'Marcus Johnson', role: 'Pro Athlete' },
  { text: 'Incredible design and quality. My new favorite brand for both training and lifestyle.', name: 'Sarah Chen', role: 'Fitness Coach' },
  { text: 'The cushioning is unreal \u2014 my knees have never felt better after a marathon.', name: 'Alex Rivera', role: 'Marathon Runner' },
  { text: 'Light, responsive, and incredibly stylish. Nike never disappoints.', name: 'Emily Watson', role: 'Yoga Instructor' },
]

export default function TestimonialFade() {
  const [index, setIndex] = useState(0)
  const dockRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section data-section="voices" className="relative h-screen bg-dark overflow-hidden flex items-center justify-center px-4 sm:px-6 md:px-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,0,0,0.05),transparent_60%)]" />
      <div className="absolute top-[15%] left-[8%] w-24 h-24 border border-white/5 rounded-full animate-float-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-16 h-16 border border-accent/10 animate-kinetic" />

      <div className="max-w-4xl mx-auto text-center relative z-[2]">
        <span className="label-caps text-accent">Voices</span>
        <h2 className="text-3xl md:text-5xl font-display text-white/20 mt-4 mb-16 uppercase tracking-[0.1em]">What Athletes Say</h2>

        <div className="relative h-48 md:h-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, filter: 'blur(12px)', scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -50, filter: 'blur(12px)', scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <span className="text-6xl text-accent/20 font-display leading-none mb-4">&ldquo;</span>
              <p className="text-xl md:text-3xl lg:text-4xl font-display text-white leading-snug max-w-3xl">&ldquo;{quotes[index].text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-8">
                <div className="w-8 h-px bg-accent" />
                <p className="text-sm font-body text-white/70">{quotes[index].name}</p>
                <span className="text-white/20">\u00B7</span>
                <p className="text-sm text-white/40 font-body">{quotes[index].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div ref={dockRef} className="flex justify-center gap-3 mt-12">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`transition-all duration-700 rounded-full ${
                i === index
                  ? 'w-16 h-[3px] bg-accent shadow-[0_0_12px_rgba(230,0,0,0.4)]'
                  : 'w-3 h-[3px] bg-white/15 hover:bg-white/30'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
