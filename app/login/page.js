'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import TransitionLink from '@/components/TransitionLink'

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-12">
          <img src="/images/nike-logo.svg" alt="Nike" className="h-10 w-auto mx-auto mb-6 brightness-0 invert" />
          <h1 className="text-2xl font-display text-white">Welcome back</h1>
          <p className="text-sm text-white/50 font-body mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-white/40 font-body mb-2">Email</label>
            <input type="email" required className="w-full px-4 py-3 bg-white/5 border border-white/10 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-white/40 font-body mb-2">Password</label>
            <input type="password" required className="w-full px-4 py-3 bg-white/5 border border-white/10 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full py-3 bg-accent text-white text-sm font-body font-medium hover:bg-accent/80 transition-all duration-300 tracking-wider uppercase">
            {submitted ? 'Signed In' : 'Sign In'}
          </button>
          <div className="text-center">
            <a href="#" className="text-xs text-white/40 hover:text-accent font-body transition-colors">Forgot password?</a>
          </div>
        </form>

        <p className="text-center text-xs text-white/40 font-body mt-10">
          No account?{' '}
          <a href="#" className="text-accent underline hover:no-underline">Create one</a>
        </p>
      </motion.div>
    </div>
  )
}
