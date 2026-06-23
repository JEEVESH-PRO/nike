'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '@/lib/products'
import { isTouchDevice } from '@/lib/device'
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
      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=100%',
              pin: pinRef.current,
              scrub: 0.6,
              anticipatePin: 1,
            },
          })

          tl.fromTo(productRef.current, { y: 80, scale: 0.85, opacity: 0.5 }, { y: -40, scale: 1.05, opacity: 1, ease: 'none' }, 0)
            .fromTo(shadowRef.current, { scale: 0.5, opacity: 0 }, { scale: 1.2, opacity: 0.5, ease: 'none' }, 0)
            .fromTo(titleRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.2)
            .fromTo(detailsRef.current?.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, ease: 'none' }, 0.3)
        },
        '(max-width: 767px)': () => {
          gsap.fromTo([productRef.current, titleRef.current, detailsRef.current?.children], { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          })
        },
      })
    }, sectionRef)

    const product = productRef.current
    let onMove
    let onLeave

    if (!isTouchDevice() && product) {
      onMove = (e) => {
        const rect = product.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        gsap.to(product, { rotateY: x * 16, rotateX: y * -12, duration: 0.5, ease: 'power2.out' })
      }
      onLeave = () => gsap.to(product, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' })
      product.addEventListener('mousemove', onMove)
      product.addEventListener('mouseleave', onLeave)
    }

    return () => {
      ctx.revert()
      if (product && onMove && onLeave) {
        product.removeEventListener('mousemove', onMove)
        product.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} data-section="showcase" className="relative md:h-[200vh] bg-charcoal">
      <div ref={pinRef} className="relative w-full min-h-0 md:min-h-screen md:h-screen overflow-hidden flex items-center py-16 sm:py-20 md:py-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(230,0,0,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 noise-overlay hidden md:block" />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative z-10 order-2 lg:order-1">
            <span className="label-caps text-accent">Hero Product</span>
            <h2 ref={titleRef} className="headline-lg text-white mt-3 sm:mt-4 mb-2">{hero.name}</h2>
            <p className="text-white/40 font-body text-sm max-w-sm mb-6 sm:mb-8">{hero.description}</p>

            <div ref={detailsRef} className="space-y-4">
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="text-3xl sm:text-4xl font-display text-white">${hero.price}</span>
                <span className="label-caps text-white/30">{hero.category}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <TransitionLink href={`/shop/${hero.slug}`} className="btn-campaign btn-campaign-primary text-center" data-cursor="shop">
                  Shop Now
                </TransitionLink>
                <TransitionLink href="/shop" className="btn-campaign btn-campaign-outline text-center" data-cursor="view">
                  Explore
                </TransitionLink>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center order-1 lg:order-2">
            <div
              ref={shadowRef}
              className="absolute w-[60%] h-[20%] bottom-[10%] rounded-full opacity-0 hidden md:block"
              style={{ background: 'radial-gradient(ellipse, rgba(230,0,0,0.3) 0%, transparent 70%)' }}
            />
            <div
              ref={productRef}
              className="relative w-full max-w-xs sm:max-w-md md:max-w-lg will-change-transform md:animate-float"
              style={{ transformStyle: 'preserve-3d' }}
              data-cursor="product"
            >
              <img
                src={hero.image}
                alt={hero.name}
                className="w-full h-auto object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
