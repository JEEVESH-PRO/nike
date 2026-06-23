'use client'

import { useEffect } from 'react'
import { useLenis } from '@/components/LenisContext'
import Hero from '@/components/Hero'
import CampaignStory from '@/components/CampaignStory'
import InnovationSplit from '@/components/InnovationSplit'
import Craftsmanship from '@/components/Craftsmanship'
import ProductShowcase from '@/components/ProductShowcase'
import FeaturedProducts from '@/components/FeaturedProducts'
import TestimonialFade from '@/components/TestimonialFade'
import Newsletter from '@/components/Newsletter'

export default function HomePage() {
  const { lenis } = useLenis()

  useEffect(() => {
    if (!lenis) return
    lenis.options.wheelMultiplier = 1.0
    lenis.options.touchMultiplier = 1.2
    lenis.options.keyboardMultiplier = 1.0
  }, [lenis])

  return (
    <>
      <Hero />
      <CampaignStory />
      <InnovationSplit />
      <Craftsmanship />
      <ProductShowcase />
      <FeaturedProducts />
      <TestimonialFade />
      <Newsletter />
    </>
  )
}
