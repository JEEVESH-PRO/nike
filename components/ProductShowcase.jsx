'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { products } from '@/lib/products'
import TransitionLink from './TransitionLink'

const hero = products[0]

export default function ProductShowcase() {
  const sectionRef = useRef(null)
  const productRef = useRef(null)
  const shadowRef = useRef(null)
  const titleRef = useRef(null)
  const detailsRef = useRef(null)
  const bgGlowRef = useRef(null)
  const sideGlowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl
        .fromTo(bgGlowRef.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' })
        .fromTo(productRef.current, { y: 120, scale: 0.7, rotateY: -25, opacity: 0.3, filter: 'blur(4px)' }, { y: 0, scale: 1, rotateY: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' }, '-=1')
        .fromTo(shadowRef.current, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 0.8, duration: 0.9 }, '-=0.7')
        .fromTo(titleRef.current, { x: -80, opacity: 0, filter: 'blur(10px)' }, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9 }, '-=0.5')
        .fromTo(detailsRef.current?.children, { y: 50, opacity: 0, filter: 'blur(4px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.08, duration: 0.6 }, '-=0.3')
        .fromTo(sideGlowRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8, transformOrigin: 'left center' }, '-=0.4')
    }, sectionRef)

    const product = productRef.current
    const onMove = (e) => {
      const rect = product.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(product, { rotateY: x * 25, rotateX: y * -18, duration: 0.5, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(product, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1.2, 0.4)' })

    product?.addEventListener('mousemove', onMove)
    product?.addEventListener('mouseleave', onLeave)

    return () => {
      ctx.revert()
      product?.removeEventListener('mousemove', onMove)
      product?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section ref={sectionRef} data-section="showcase" className="relative h-screen bg-charcoal overflow-hidden">
      <div ref={bgGlowRef} className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(230,0,0,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(230,0,0,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 noise-overlay" />

      <div ref={sideGlowRef} className="absolute left-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

      <div className="h-full max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10">
          <span className="label-caps text-accent tracking-[0.4em]">Hero Product</span>
          <div className="w-12 h-px bg-accent/50 mt-4 mb-6" />
          <h2 ref={titleRef} className="headline-lg text-white mb-4">{hero.name}</h2>
          <p className="text-white/40 font-body text-sm max-w-sm mb-8 leading-relaxed">{hero.description}</p>

          <div ref={detailsRef} className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-display text-white glow-red-text">${hero.price}</span>
              <span className="label-caps text-white/30">{hero.category}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/30">
              <span className="flex text-accent">
                {'\u2605'.repeat(Math.floor(hero.rating))}{'\u2606'.repeat(5 - Math.floor(hero.rating))}
              </span>
              <span>({hero.reviews} reviews)</span>
            </div>
            <div className="flex gap-4 pt-6">
              <TransitionLink href={`/shop/${hero.slug}`} className="btn-campaign btn-campaign-primary btn-ripple" data-cursor="shop">
                Shop Now
              </TransitionLink>
              <TransitionLink href="/shop" className="btn-campaign btn-campaign-outline" data-cursor="view">
                Full Collection
              </TransitionLink>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
          <div
            ref={shadowRef}
            className="absolute w-[70%] h-[25%] bottom-[8%] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(230,0,0,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }}
          />
          <div
            ref={productRef}
            className="relative w-full max-w-lg will-change-transform animate-float"
            style={{ transformStyle: 'preserve-3d' }}
            data-cursor="product"
          >
            <div className="absolute -inset-12 bg-gradient-to-b from-accent/10 to-transparent rounded-full blur-[80px] -z-10" />
            <img
              src={hero.image}
              alt={hero.name}
              className="w-full h-auto object-contain drop-shadow-[0_40px_60px_rgba(230,0,0,0.25)]"
            />
            <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
