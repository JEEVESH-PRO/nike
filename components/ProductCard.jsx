'use client'

import { useEffect, useRef } from 'react'
import { useWishlist } from './WishlistProvider'
import TransitionLink from './TransitionLink'

export default function ProductCard({ product, variant = 'default' }) {
  const { isWishlisted, toggleItem } = useWishlist()
  const wishlisted = isWishlisted(product.slug)
  const cardRef = useRef(null)
  const shadowRef = useRef(null)
  const imgRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const shadow = shadowRef.current
    const img = imgRef.current
    const glow = glowRef.current
    if (!card) return

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      card.style.transform = `perspective(1200px) rotateY(${x * 18}deg) rotateX(${y * -12}deg) translateZ(10px)`
      if (shadow) {
        shadow.style.transform = `translate(${x * 30}px, ${y * 30}px) scale(${1 + Math.abs(x) * 0.2})`
        shadow.style.opacity = 0.4 + Math.abs(x) * 0.3 + Math.abs(y) * 0.3
      }
      if (img) img.style.transform = `scale(1.12) translate(${x * -15}px, ${y * -15}px)`
      if (glow) {
        glow.style.opacity = 0.6 + Math.abs(x) * 0.4
        glow.style.transform = `translate(${x * 20}px, ${y * 20}px)`
      }
    }

    const onLeave = () => {
      card.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateZ(0)'
      if (shadow) { shadow.style.transform = 'translate(0,0)'; shadow.style.opacity = 0 }
      if (img) img.style.transform = 'scale(1) translate(0,0)'
      if (glow) { glow.style.opacity = 0; glow.style.transform = 'translate(0,0)' }
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const isShowcase = variant === 'showcase'

  return (
    <TransitionLink href={`/shop/${product.slug}`}>
      <div
        ref={cardRef}
        className={`group relative overflow-visible transition-all duration-700 ${
          isShowcase ? 'bg-transparent' : 'bg-carbon border border-white/5 hover:border-accent/20'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
        data-cursor="product"
      >
        <div
          ref={shadowRef}
          className="absolute -inset-6 z-[-1] rounded-2xl opacity-0 transition-opacity duration-500"
          style={{ background: 'radial-gradient(ellipse at center, rgba(230,0,0,0.2) 0%, transparent 70%)', filter: 'blur(24px)' }}
        />
        <div
          ref={glowRef}
          className="absolute -inset-2 z-[-1] rounded-xl opacity-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(230,0,0,0.1) 0%, transparent 60%)', filter: 'blur(16px)' }}
        />

        <div className={`relative overflow-hidden ${isShowcase ? 'aspect-[3/4]' : 'aspect-square'} bg-charcoal`}>
          <img
            ref={imgRef}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleItem(product) }}
            className="absolute top-4 right-4 p-2.5 rounded-full glass hover:bg-accent/80 transition-all duration-300 z-10"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className={`w-4 h-4 ${wishlisted ? 'text-accent' : 'text-white/70'}`}>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>

          {isShowcase && (
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="label-caps text-accent mb-2">{product.category}</p>
              <h3 className="text-2xl md:text-3xl font-display text-white uppercase">{product.name}</h3>
              <p className="text-lg font-display text-white/60 mt-1">${product.price.toFixed(2)}</p>
            </div>
          )}
        </div>

        {!isShowcase && (
          <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-body font-medium text-white group-hover:text-accent transition-colors">{product.name}</h3>
              <span className="text-sm font-display text-white/60">${product.price.toFixed(2)}</span>
            </div>
            <p className="label-caps text-white/25 mt-2">{product.category}</p>
          </div>
        )}
      </div>
    </TransitionLink>
  )
}
