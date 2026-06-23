'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    gsap.fromTo(formRef.current, { scale: 1 }, { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1 })
    setTimeout(() => { setSent(false); setEmail('') }, 3000)
  }

  return (
    <section ref={sectionRef} data-section="drop" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-carbon overflow-hidden -mt-px">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(230,0,0,0.06),transparent_50%)]" />

      <div className="max-w-3xl mx-auto text-center">
        <span className="label-caps text-accent">Stay Connected</span>
        <h2 className="headline-lg text-white mt-4 mb-6">The Drop</h2>
        <p className="text-sm md:text-base text-white/45 font-body mb-12 max-w-md mx-auto leading-relaxed">
          First access to new releases, exclusive collaborations, and early product drops. Be first. Never miss a moment.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-5 py-4 bg-white/[0.03] border border-white/10 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all duration-300 rounded-none"
            aria-label="Email address"
          />
          <button type="submit" className="btn-campaign btn-campaign-primary whitespace-nowrap" data-cursor="view">
            {sent ? 'Welcome' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  )
}
