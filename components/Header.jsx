'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from './CartProvider'
import { useWishlist } from './WishlistProvider'
import Magnetic from './Magnetic'
import TransitionLink from './TransitionLink'
import { navLinks } from '@/lib/constants'
import { useLenis } from './LenisContext'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'story', label: 'Story' },
  { id: 'innovation', label: 'Innovation' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'featured', label: 'Collection' },
]

export default function Header() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isHome = mounted && pathname === '/'
  const [atTop, setAtTop] = useState(true)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const lastScroll = useRef(0)
  const mountedRef = useRef(true)
  const navRef = useRef(null)
  const indicatorRef = useRef(null)
  const { totalItems } = useCart()
  const { items: wishlisted } = useWishlist()
  const { lenis } = useLenis()

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    const sectionEls = document.querySelectorAll('[data-section]')
    let ticking = false

    const getScrollY = () => (lenis ? lenis.scroll : window.scrollY)

    const onScroll = () => {
      if (!mountedRef.current) return
      const y = getScrollY()
      const dh = document.documentElement.scrollHeight - window.innerHeight
      const down = y > lastScroll.current
      lastScroll.current = y

      setAtTop(y < 30)
      setProgress(dh > 0 ? Math.min(y / dh, 1) : 0)

      if (y < 100) setHidden(false)
      else if (down && y > 200) setHidden(true)
      else if (!down) setHidden(false)

      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          if (!mountedRef.current) return
          sectionEls.forEach((el) => {
            const rect = el.getBoundingClientRect()
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.3) {
              setActiveSection(el.getAttribute('data-section'))
            }
          })
          ticking = false
        })
      }
    }

    if (lenis) lenis.on('scroll', onScroll)
    else window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      if (lenis) lenis.off('scroll', onScroll)
      else window.removeEventListener('scroll', onScroll)
    }
  }, [lenis])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!isHome) return
    const activeLink = navRef.current?.querySelector(`[data-nav="${activeSection}"]`)
    const indicator = indicatorRef.current
    if (activeLink && indicator) {
      const rect = activeLink.getBoundingClientRect()
      const navRect = navRef.current.getBoundingClientRect()
      indicator.style.width = `${rect.width}px`
      indicator.style.transform = `translateX(${rect.left - navRect.left}px)`
      indicator.style.opacity = '1'
    }
  }, [activeSection])

  const onNavMove = (e) => {
    navRef.current?.querySelectorAll('.nav-link').forEach((link) => {
      const rect = link.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const dist = Math.sqrt(x * x + y * y)
      if (dist < 100) {
        const s = ((100 - dist) / 100) * 6
        link.style.transform = `translate(${x / rect.width * s}px, ${y / rect.height * s}px)`
      } else {
        link.style.transform = ''
      }
    })
  }

  const onNavLeave = () => {
    navRef.current?.querySelectorAll('.nav-link').forEach((l) => { l.style.transform = '' })
  }

  const scrollToSection = (id) => {
    const el = document.querySelector(`[data-section="${id}"]`)
    if (el) {
      if (lenis) lenis.scrollTo(el, { offset: -80, duration: 0.9, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-3 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-6xl rounded-xl sm:rounded-2xl transition-all duration-700 safe-top ${
          atTop ? 'glass-float' : 'glass-premium glow-white'
        }`}
      >
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/[0.02] to-transparent" />
        </div>

        <div className="flex items-center justify-between px-4 sm:px-5 md:px-8 py-3 sm:py-3.5 md:py-4">
          <TransitionLink href="/" className="flex items-center gap-2.5 group z-10" data-cursor="view">
            <img src="/images/nike-logo.svg" alt="Nike" className="h-7 w-auto brightness-0 invert transition-all duration-300 group-hover:opacity-60 group-hover:scale-95" />
            <span className="hidden sm:inline text-sm font-condensed font-bold tracking-[0.15em] text-white uppercase">Nike</span>
          </TransitionLink>

          <nav ref={navRef} onMouseMove={onNavMove} onMouseLeave={onNavLeave} className={`${isHome ? 'hidden lg:flex' : 'hidden lg:flex'} items-center gap-8 relative`}>
            {(isHome ? sections : [
              { id: 'shop', label: 'Shop', href: '/shop' },
              { id: 'about', label: 'About', href: '/about' },
              { id: 'contact', label: 'Contact', href: '/contact' },
            ]).map((item) =>
              'href' in item ? (
                <Magnetic key={item.id} radius={80} strength={0.3}>
                  <TransitionLink
                    href={item.href}
                    className={`nav-link relative text-[10px] uppercase tracking-[0.2em] font-body transition-colors duration-300 ${
                      pathname === item.href ? 'text-white' : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {item.label}
                  </TransitionLink>
                </Magnetic>
              ) : (
                <Magnetic key={item.id} radius={80} strength={0.3}>
                  <button
                    data-nav={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link relative text-[10px] uppercase tracking-[0.2em] font-body transition-colors duration-300 ${
                      activeSection === item.id ? 'text-white' : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {item.label}
                  </button>
                </Magnetic>
              )
            )}
            <div
              ref={indicatorRef}
              className="absolute -bottom-1 h-[2px] bg-accent rounded-full transition-all duration-500 ease-out opacity-0 shadow-[0_0_8px_rgba(230,0,0,0.4)]"
              style={{ width: 0, transform: 'translateX(0)' }}
            />
          </nav>

          <div className="flex items-center gap-3 z-10">
            <TransitionLink href="/shop" className="hidden md:flex label-caps text-white/40 hover:text-white transition-colors btn-ripple py-2 px-3" data-cursor="shop">
              Shop
            </TransitionLink>

            <TransitionLink href="/wishlist" className="relative p-2 text-white/40 hover:text-white transition-colors hover:scale-110 active:scale-90 transition-all duration-300" data-cursor="view">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              {wishlisted.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-[0_0_8px_rgba(230,0,0,0.5)]">{wishlisted.length}</span>
              )}
            </TransitionLink>

            <TransitionLink href="/cart" className="relative p-2 text-white/40 hover:text-white transition-colors hover:scale-110 active:scale-90 transition-all duration-300" data-cursor="view">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-[0_0_8px_rgba(230,0,0,0.5)]">{totalItems}</span>
              )}
            </TransitionLink>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden flex flex-col items-center justify-center w-10 h-10 -mr-1 group" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
              <span className={`block w-5 h-[1.5px] bg-white/60 group-hover:bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-white/60 group-hover:bg-white mt-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-white/60 group-hover:bg-white mt-1.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-4 right-4 h-px bg-white/5 overflow-hidden rounded-full">
          <div className="h-full bg-accent transition-all duration-150 rounded-full shadow-[0_0_6px_rgba(230,0,0,0.5)]" style={{ width: `${progress * 100}%` }} />
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 3rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
          >
            <div className="absolute inset-0 bg-dark/98 backdrop-blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,0,0,0.12),transparent_50%)]" />
            <div className="absolute inset-0 noise-overlay" />

            <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16">
              <nav className="space-y-2">
                {(isHome
                  ? [...sections, ...navLinks.filter((l) => !sections.find((s) => s.label === l.label))]
                  : navLinks
                ).map((item, i) => (
                  <motion.div
                    key={item.label || item.id}
                    initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {'href' in item ? (
                      <TransitionLink href={item.href} onClick={() => setMenuOpen(false)} className="block py-3 group" data-cursor="view">
                        <span className="text-5xl md:text-7xl font-display text-white/20 group-hover:text-white transition-colors duration-500 uppercase">{item.label}</span>
                      </TransitionLink>
                    ) : (
                      <button onClick={() => scrollToSection(item.id)} className="block py-3 group text-left w-full" data-cursor="view">
                        <span className="text-5xl md:text-7xl font-display text-white/20 group-hover:text-white transition-colors duration-500 uppercase">{item.label}</span>
                      </button>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4 mt-12"
              >
                <TransitionLink href="/shop" onClick={() => setMenuOpen(false)} className="btn-campaign btn-campaign-primary btn-ripple" data-cursor="shop">Shop Now</TransitionLink>
                <TransitionLink href="/login" onClick={() => setMenuOpen(false)} className="btn-campaign btn-campaign-outline" data-cursor="view">Sign In</TransitionLink>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="absolute bottom-10 label-caps text-white/15">
                Just Do It.&trade;
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
