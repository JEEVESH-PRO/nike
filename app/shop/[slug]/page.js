'use client'

import { useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { products } from '@/lib/products'
import { useCart } from '@/components/CartProvider'
import { useWishlist } from '@/components/WishlistProvider'
import ProductCard from '@/components/ProductCard'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const { addItem } = useCart()
  const { isWishlisted, toggleItem } = useWishlist()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(0)
  const [added, setAdded] = useState(false)
  const mainImgRef = useRef(null)
  const btnRef = useRef(null)

  if (!product) {
    return (
      <div className="pt-28 pb-24 px-6 text-center min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="w-16 h-px bg-accent mx-auto mb-8" />
          <p className="text-2xl font-display text-white/30">Product not found</p>
        </motion.div>
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4)
  const wishlisted = isWishlisted(product.slug)

  const handleAdd = () => {
    addItem(product, product.sizes[selectedSize || 0], product.colors[selectedColor])
    setAdded(true)
    if (btnRef.current) {
      gsap.fromTo(btnRef.current, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' })
    }
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-4"
          >
            <div
              ref={mainImgRef}
              className="aspect-square bg-charcoal overflow-hidden group relative cursor-crosshair"
            >
              <img
                src={product.gallery[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex gap-3">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 overflow-hidden border transition-all duration-300 ${
                    selectedImage === i ? 'border-accent scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-body">
                {product.category}
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-3xl md:text-4xl font-display mt-1 text-white">
                {product.name}
              </motion.h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1" className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-accent' : 'text-white/20'}`}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-white/40 font-body">({product.reviews} reviews)</span>
              </motion.div>
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="text-2xl font-body font-medium text-white">
              ${product.price.toFixed(2)}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-sm text-white/60 font-body leading-relaxed">
              {product.description}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <p className="text-xs uppercase tracking-[0.15em] text-white/50 font-body mb-3">Color</p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button key={c} onClick={() => setSelectedColor(i)} className={`w-7 h-7 rounded-full border-2 transition-all duration-300 ${selectedColor === i ? 'border-accent scale-110' : 'border-white/20 hover:border-white/40'}`} style={{ background: c }} />
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <p className="text-xs uppercase tracking-[0.15em] text-white/50 font-body mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)} className={`w-12 h-10 text-xs font-body border transition-all duration-300 ${selectedSize === s ? 'bg-accent text-white border-accent scale-105' : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="flex gap-3 pt-2">
              <button ref={btnRef} onClick={handleAdd} className="flex-1 py-3.5 bg-accent text-white text-sm font-body font-medium hover:bg-accent/80 transition-all duration-300 active:scale-[0.97]">
                {added ? 'Added ✓' : 'Add to Cart'}
              </button>
              <button onClick={() => toggleItem(product)} className="px-4 border border-white/10 hover:border-accent/50 transition-all duration-300 hover:bg-accent/10">
                <svg viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className={`w-5 h-5 ${wishlisted ? 'text-accent' : 'text-white/60'}`}>
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <h2 className="text-2xl md:text-3xl font-display text-white">You May Also Like</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((rel, i) => (
                <motion.div key={rel.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}>
                  <ProductCard product={rel} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
