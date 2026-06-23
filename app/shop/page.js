'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
import Filters from '@/components/Filters'

gsap.registerPlugin(ScrollTrigger)

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('default')
  const heroRef = useRef(null)
  const gridRef = useRef(null)

  const filtered = useMemo(() => {
    let result = [...products]
    if (category !== 'All') result = result.filter((p) => p.category === category)
    if (search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [search, category, sort])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current?.children, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    gsap.fromTo(gridRef.current.children, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out',
    })
  }, [filtered])

  return (
    <div className="relative min-h-screen">
      <section className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1460353581641-37baddab0fa0?w=1920&q=80"
          alt="Nike collection"
          className="absolute inset-0 w-full h-full object-cover"
          data-cursor="image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/30" />
        <div className="absolute inset-0 noise-overlay" />

        <div ref={heroRef} className="relative z-10 px-6 md:px-12 pb-16 md:pb-20 max-w-7xl mx-auto w-full">
          <span className="label-caps text-accent">Catalog</span>
          <h1 className="headline-lg text-white mt-3">All Sneakers</h1>
          <p className="text-sm text-white/40 font-body mt-4">{filtered.length} styles · Engineered for movement</p>
        </div>
      </section>

      <div className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 space-y-4">
            <SearchBar value={search} onChange={setSearch} />
            <Filters activeCategory={category} onCategoryChange={setCategory} sort={sort} onSortChange={setSort} />
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-white/30 font-body py-32 label-caps">No sneakers found</p>
          ) : (
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
              {filtered.map((product) => (
                <div key={product.slug} data-cursor="product">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
