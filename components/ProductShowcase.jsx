'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '@/lib/products'
import TransitionLink from './TransitionLink'

gsap.registerPlugin(ScrollTrigger)

const hero = products[0]

export default function ProductShowcase() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const productRef = useRef(null)
  const shadowRef = useRef(null)
  const titleRef = useRef(null)
  const detailsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: pinRef.current,
          scrub: 1,
        },
      })

      tl.fromTo(productRef.current, { y: 100, scale: 0.8, rotateY: -15, opacity: 0.5 }, { y: -50, scale: 1.1, rotateY: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(shadowRef.current, { scale: 0.5, opacity: 0 }, { scale: 1.2, opacity: 0.6, ease: 'none' }, 0)
        .fromTo(titleRef.current, { x: -60, opacity: 0, filter: 'blur(8px)' }, { x: 0, opacity: 1, filter: 'blur(0px)', ease: 'none' }, 0.2)
        .fromTo(detailsRef.current?.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, ease: 'none' }, 0.3)
    }, sectionRef)

    const product = productRef.current
    const onMove = (e) => {
      const rect = product.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(product, { rotateY: x * 20, rotateX: y * -15, duration: 0.6, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(product, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })

    product?.addEventListener('mousemove', onMove)
    product?.addEventListener('mouseleave', onLeave)

    return () => {
      ctx.revert()
      product?.removeEventListener('mousemove', onMove)
      product?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section ref={sectionRef} data-section="showcase" className="relative h-[220vh] bg-charcoal">
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(230,0,0,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <span className="label-caps text-accent">Hero Product</span>
            <h2 ref={titleRef} className="headline-lg text-white mt-4 mb-2">{hero.name}</h2>
            <p className="text-white/40 font-body text-sm max-w-sm mb-8">{hero.description}</p>

            <div ref={detailsRef} className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-display text-white">${hero.price}</span>
                <span className="label-caps text-white/30">{hero.category}</span>
              </div>
              <div className="flex gap-4 pt-4">
                <TransitionLink href={`/shop/${hero.slug}`} className="btn-campaign btn-campaign-primary" data-cursor="shop">
                  Shop Now
                </TransitionLink>
                <TransitionLink href="/shop" className="btn-campaign btn-campaign-outline" data-cursor="view">
                  Explore
                </TransitionLink>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center perspective-[1200px]">
            <div
              ref={shadowRef}
              className="absolute w-[60%] h-[20%] bottom-[10%] rounded-full opacity-0"
              style={{ background: 'radial-gradient(ellipse, rgba(230,0,0,0.3) 0%, transparent 70%)', filter: 'blur(30px)' }}
            />
            <div
              ref={productRef}
              className="relative w-full max-w-lg will-change-transform animate-float"
              style={{ transformStyle: 'preserve-3d' }}
              data-cursor="product"
            >
              <img
                src={hero.image}
                alt={hero.name}
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
              <div className="absolute -inset-8 bg-gradient-to-b from-accent/5 to-transparent rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
