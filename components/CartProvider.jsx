'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext()

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = localStorage.getItem('nike-cart')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('nike-cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product, size, color) => {
    setItems((prev) => {
      const key = `${product.slug}-${size}-${color}`
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { key, slug: product.slug, name: product.name, price: product.price, image: product.image, size, color, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }, [])

  const updateQuantity = useCallback((key, quantity) => {
    if (quantity < 1) return
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, quantity } : i)))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}
