'use client'

import { motion } from 'framer-motion'
import { useCart } from '@/components/CartProvider'
import TransitionLink from '@/components/TransitionLink'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-24 px-6 md:px-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-body">Cart</span>
          <h1 className="text-3xl md:text-4xl font-display mt-3 mb-4 text-white">Your cart is empty</h1>
          <p className="text-sm text-white/50 font-body mb-8">Add some sneakers to get started.</p>
          <TransitionLink href="/shop" className="inline-block px-8 py-3 bg-accent text-white text-sm font-body font-medium hover:bg-accent/80 transition-all duration-300 tracking-wider uppercase">
            Shop Now
          </TransitionLink>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} className="flex items-center justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-body">Cart</span>
            <h1 className="text-3xl md:text-4xl font-display mt-2 text-white">{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</h1>
          </div>
          <button onClick={clearCart} className="text-xs uppercase tracking-[0.15em] text-white/40 hover:text-accent font-body transition-colors">
            Clear All
          </button>
        </motion.div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div key={item.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} className="flex gap-4 p-4 bg-carbon border border-white/5">
              <div className="w-20 h-20 bg-charcoal overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-body font-medium text-white">{item.name}</h3>
                <p className="text-xs text-white/40 font-body mt-0.5">Size {item.size}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="w-7 h-7 border border-white/10 text-xs text-white/50 hover:text-white hover:border-white/30 transition-colors">−</button>
                  <span className="text-sm font-body text-white">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="w-7 h-7 border border-white/10 text-xs text-white/50 hover:text-white hover:border-white/30 transition-colors">+</button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-body font-medium text-white">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeItem(item.key)} className="text-[10px] uppercase tracking-[0.1em] text-white/30 hover:text-accent mt-2 font-body transition-colors">
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }} className="mt-8 p-8 bg-carbon border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body text-white/60">Subtotal</span>
            <span className="text-2xl font-display text-white">${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-white/30 font-body mb-6">Shipping calculated at checkout</p>
          <button className="w-full py-3.5 bg-accent text-white text-sm font-body font-medium hover:bg-accent/80 transition-all duration-300 tracking-wider uppercase">
            Checkout
          </button>
        </motion.div>
      </div>
    </div>
  )
}
