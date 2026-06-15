'use client'

import { motion } from 'framer-motion'
import { useWishlist } from '@/components/WishlistProvider'
import { useCart } from '@/components/CartProvider'
import TransitionLink from '@/components/TransitionLink'
import { products } from '@/lib/products'

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()

  const wishlistProducts = items.map((wi) => {
    const p = products.find((prod) => prod.slug === wi.slug)
    return { ...wi, product: p }
  }).filter((wi) => wi.product)

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-24 px-6 md:px-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-body">Wishlist</span>
          <h1 className="text-3xl md:text-4xl font-display mt-3 mb-4 text-white">Nothing saved yet</h1>
          <p className="text-sm text-white/50 font-body mb-8">Save items you love to your wishlist.</p>
          <TransitionLink href="/shop" className="inline-block px-8 py-3 bg-accent text-white text-sm font-body font-medium hover:bg-accent/80 transition-all duration-300 tracking-wider uppercase">
            Browse Sneakers
          </TransitionLink>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-body">Wishlist</span>
          <h1 className="text-3xl md:text-4xl font-display mt-2 text-white">{items.length} Saved</h1>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((wi, i) => (
            <motion.div key={wi.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="bg-carbon border border-white/5">
              <div className="aspect-square bg-charcoal overflow-hidden relative">
                <img src={wi.product.image} alt={wi.name} className="w-full h-full object-cover" />
                <button onClick={() => removeItem(wi.slug)} className="absolute top-3 right-3 p-1.5 bg-dark/60 text-white/70 hover:text-accent text-xs transition-colors">
                  ✕
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-body font-medium text-white">{wi.name}</h3>
                <p className="text-sm text-white/50 font-body mt-1">${wi.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => { addItem(wi.product, wi.product.sizes[0], wi.product.colors[0]); removeItem(wi.slug) }} className="flex-1 py-2.5 bg-accent text-white text-xs font-body font-medium hover:bg-accent/80 transition-all duration-300 tracking-wider uppercase">
                    Add to Cart
                  </button>
                  <TransitionLink href={`/shop/${wi.slug}`} className="px-4 py-2.5 border border-white/10 text-xs text-white/50 hover:text-white font-body transition-colors">
                    View
                  </TransitionLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
