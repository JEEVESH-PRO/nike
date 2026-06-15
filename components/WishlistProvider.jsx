'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const WishlistContext = createContext()

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}

export default function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = localStorage.getItem('nike-wishlist')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('nike-wishlist', JSON.stringify(items))
  }, [items])

  const toggleItem = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.slug === product.slug)
      if (exists) return prev.filter((i) => i.slug !== product.slug)
      return [...prev, { slug: product.slug, name: product.name, price: product.price, image: product.image }]
    })
  }, [])

  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }, [])

  const isWishlisted = useCallback((slug) => items.some((i) => i.slug === slug), [items])

  return (
    <WishlistContext.Provider value={{ items, toggleItem, removeItem, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}
