import Hero from '@/components/Hero'
import CampaignStory from '@/components/CampaignStory'
import FeaturedProducts from '@/components/FeaturedProducts'
import ProductShowcase from '@/components/ProductShowcase'
import InnovationSplit from '@/components/InnovationSplit'
import Craftsmanship from '@/components/Craftsmanship'
import TestimonialFade from '@/components/TestimonialFade'
import Newsletter from '@/components/Newsletter'
import ScrollDebugMonitor from '@/components/ScrollDebugMonitor'

export default function Home() {
  return (
    <>
      <ScrollDebugMonitor />
      <Hero />
      <CampaignStory />
      <FeaturedProducts />
      <ProductShowcase />
      <InnovationSplit />
      <Craftsmanship />
      <TestimonialFade />
      <Newsletter />
    </>
  )
}
