'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ProductCard from './ProductCard'
import { products } from '@/lib/products'
import TransitionLink from './TransitionLink'

const featured = products.slice(0, 4)

export default function FeaturedProducts() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl
        .fromTo(titleRef.current, { y: 50, opacity: 0, perspective: 800, rotateY: -5 }, { y: 0, opacity: 1, rotateY: 0, duration: 0.8, delay: 0.1 })
        .fromTo(gridRef.current?.children, { y: 70, opacity: 0, scale: 0.92, filter: 'blur(6px)' }, {
          y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)',
        }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-section="collection" className="relative h-screen bg-dark overflow-hidden flex flex-col justify-center px-4 sm:px-6 md:px-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,0,0,0.03),transparent_50%)]" />

      <div ref={titleRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-14 max-w-7xl mx-auto w-full" style={{ perspective: '800px' }}>
        <div>
          <span className="label-caps text-accent">Curated Selection</span>
          <h2 className="headline-lg text-white mt-2">Featured<br />Collection</h2>
          <p className="text-sm text-white/30 font-body mt-2 max-w-md">
            Hand-picked performance gear for those who demand more.
          </p>
        </div>
        <TransitionLink href="/shop" className="btn-campaign btn-campaign-outline self-start flex-shrink-0 btn-ripple" data-cursor="shop">
          View All
        </TransitionLink>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto w-full" style={{ perspective: '1200px' }}>
        {featured.map((product, i) => (
          <div key={product.slug} className="relative" data-cursor="product">
            <span className="absolute -top-4 left-2 text-6xl font-display text-white/[0.03] z-0 pointer-events-none select-none">
              {String(i + 1).padStart(2, '0')}
            </span>
            <ProductCard product={product} variant="showcase" />
          </div>
        ))}
      </div>
    </section>
  )
}
