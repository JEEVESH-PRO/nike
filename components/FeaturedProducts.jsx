'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from './ProductCard'
import { products } from '@/lib/products'
import TransitionLink from './TransitionLink'

gsap.registerPlugin(ScrollTrigger)

const featured = products.slice(0, 4)

export default function FeaturedProducts() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const titleRef = useRef(null)
  const mobileGridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      })

      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          const track = trackRef.current
          const getScroll = () => track.scrollWidth - window.innerWidth + 100

          gsap.to(track, {
            x: () => -getScroll(),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${getScroll()}`,
              pin: pinRef.current,
              scrub: 0.6,
              anticipatePin: 1,
            },
          })
        },
        '(max-width: 767px)': () => {
          gsap.fromTo(mobileGridRef.current?.children, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: mobileGridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-section="collection" className="relative bg-dark">
      <div ref={pinRef} className="relative min-h-0 md:min-h-screen py-16 sm:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div ref={titleRef} className="px-4 sm:px-6 md:px-12 mb-10 sm:mb-16 md:mb-20">
          <span className="label-caps text-accent">Curated Selection</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mt-3 sm:mt-4">
            <h2 className="headline-lg text-white">Featured<br />Collection</h2>
            <TransitionLink href="/shop" className="btn-campaign btn-campaign-outline self-start" data-cursor="shop">
              View All
            </TransitionLink>
          </div>
        </div>

        <div ref={mobileGridRef} className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-6 pb-8">
          {featured.map((product, i) => (
            <div key={product.slug} data-cursor="product">
              <div className="relative">
                <span className="absolute -top-6 left-0 text-5xl font-display text-white/[0.04] z-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ProductCard product={product} variant="showcase" />
              </div>
            </div>
          ))}
        </div>

        <div ref={trackRef} className="hidden md:flex horizontal-scroll-track px-6 md:px-12 pb-8">
          {featured.map((product, i) => (
            <div key={product.slug} className="flex-shrink-0 w-[45vw] lg:w-[28vw]" data-cursor="product">
              <div className="relative">
                <span className="absolute -top-8 left-0 text-7xl font-display text-white/[0.04] z-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ProductCard product={product} variant="showcase" />
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-[10vw]" />
        </div>
      </div>
    </section>
  )
}
