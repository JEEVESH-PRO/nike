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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 80, opacity: 0, filter: 'blur(10px)' }, {
        y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      })

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
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-section="collection" className="relative bg-dark">
      <div ref={pinRef} className="relative min-h-screen py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div ref={titleRef} className="px-6 md:px-12 mb-16 md:mb-20">
          <span className="label-caps text-accent">Curated Selection</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4">
            <h2 className="headline-lg text-white">Featured<br />Collection</h2>
            <TransitionLink href="/shop" className="btn-campaign btn-campaign-outline self-start" data-cursor="shop">
              View All
            </TransitionLink>
          </div>
        </div>

        <div ref={trackRef} className="horizontal-scroll-track px-6 md:px-12 pb-8">
          {featured.map((product, i) => (
            <div key={product.slug} className="flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw]" data-cursor="product">
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
