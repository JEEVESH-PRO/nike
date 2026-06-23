'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TransitionLink from './TransitionLink'
import { navLinks, supportLinks, socialLinks } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(footerRef.current, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: footerRef.current, start: 'top 92%', toggleActions: 'play none none none' },
    })
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-dark text-white py-24 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(230,0,0,0.04),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/nike-logo.svg" alt="Nike" className="h-8 w-auto brightness-0 invert" />
              <span className="text-lg font-condensed font-bold tracking-[0.15em] uppercase">Nike</span>
            </div>
            <p className="headline-lg text-white/10 uppercase leading-none">Just Do It</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16">
            <div>
              <h4 className="label-caps text-white/30 mb-6">Navigate</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <TransitionLink href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-300 font-body" data-cursor="view">
                      {link.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="label-caps text-white/30 mb-6">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-300 font-body">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="label-caps text-white/30 mb-6">Follow</h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="px-3 py-2 border border-white/10 text-[10px] uppercase tracking-[0.15em] text-white/40 hover:text-white hover:border-accent/50 transition-all duration-300">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20 font-body tracking-wider">&copy; {new Date().getFullYear()} Nike, Inc. All rights reserved.</p>
          <p className="label-caps text-white/15">Forged in Movement</p>
        </div>
      </div>
    </footer>
  )
}
