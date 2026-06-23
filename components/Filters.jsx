'use client'

import { motion } from 'framer-motion'
import { categories } from '@/lib/products'

export default function Filters({ activeCategory, onCategoryChange, sort, onSortChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-body transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-accent text-white'
                : 'bg-white/5 text-white/50 hover:text-white border border-white/10 hover:border-white/30'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 bg-white/5 border border-white/10 text-xs uppercase tracking-[0.15em] font-body text-white/50 focus:outline-none focus:border-accent/50 focus:bg-white/[0.08] transition-all duration-300"
      >
        <option value="default">Sort by</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="name">Name</option>
      </select>
    </div>
  )
}
