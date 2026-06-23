'use client'

import { useState, useRef } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    if (formRef.current) {
      formRef.current.style.transform = 'scale(1.03)'
      setTimeout(() => { if (formRef.current) formRef.current.style.transform = 'scale(1)' }, 250)
    }
    setTimeout(() => { setSent(false); setEmail('') }, 3000)
  }

  return (
    <section data-section="drop" className="relative h-screen bg-carbon overflow-hidden flex items-center justify-center px-4 sm:px-6 md:px-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(230,0,0,0.07),transparent_50%)]" />
      <div className="absolute bottom-[20%] left-[10%] w-40 h-40 border border-white/5 rounded-full animate-float-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[25%] right-[15%] w-16 h-16 border border-accent/10 animate-kinetic" />

      <div className="max-w-3xl mx-auto text-center relative z-[2]">
        <span className="label-caps text-accent tracking-[0.4em]">Stay Connected</span>
        <div className="w-12 h-px bg-accent/50 mx-auto mt-4 mb-8" />
        <h2 className="headline-lg text-white mb-6">The Drop</h2>
        <p className="text-sm md:text-base text-white/40 font-body mb-12 max-w-md mx-auto leading-relaxed">
          First access to new releases, exclusive collaborations, and early product drops.
          Be first. Never miss a moment.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto transition-transform duration-300 focus-glow" data-cursor="default">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-all duration-300 rounded-none"
              aria-label="Email address"
            />
            <div className="absolute bottom-0 left-0 h-[1px] bg-accent/40 w-0 focus-within:w-full transition-all duration-500" />
          </div>
          <button type="submit" className="btn-campaign btn-campaign-primary whitespace-nowrap btn-ripple" data-cursor="view">
            {sent ? (
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 7l3 3 7-7" />
                </svg>
                Welcome
              </span>
            ) : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  )
}
