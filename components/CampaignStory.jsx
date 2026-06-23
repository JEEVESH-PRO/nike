'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const scenes = [
  {
    num: '01',
    title: 'THE HANDSHAKE',
    subtitle: '1964 \u00B7 Oregon',
    body: 'Bill Bowerman and Phil Knight shook hands on a partnership that would redefine sport forever. Two visionaries. One relentless belief.',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80',
  },
  {
    num: '02',
    title: 'THE SWOOSH',
    subtitle: '1971 \u00B7 Innovation',
    body: 'A logo worth $35 became the most recognizable symbol in athletics. Simple. Bold. Unmistakably Nike.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
  },
  {
    num: '03',
    title: 'JUST DO IT',
    subtitle: '1988 \u00B7 Movement',
    body: 'Three words that transcended advertising to become a global philosophy. Not a slogan \u2014 a way of life.',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa0?w=1200&q=80',
  },
]

export default function CampaignStory() {
  const sectionRef = useRef(null)
  const panelsRef = useRef(null)
  const titleRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl
        .fromTo(titleRef.current, { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.1 })
        .fromTo(panelsRef.current?.children, { y: 80, opacity: 0, rotateY: 15, filter: 'blur(8px)' }, {
          y: 0, opacity: 1, rotateY: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.18, ease: 'power3.out',
        }, '-=0.3')

      gsap.fromTo(glowRef.current, { scale: 0.8, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 2, ease: 'power1.out', scrollTrigger: {
          trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-section="story" className="relative h-screen bg-carbon overflow-hidden flex flex-col justify-center px-4 sm:px-6 md:px-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div ref={glowRef} className="absolute top-1/2 right-0 w-[400px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(230,0,0,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div ref={titleRef} className="mb-8 md:mb-14 max-w-7xl mx-auto w-full">
        <span className="label-caps text-accent">Brand Story</span>
        <h2 className="headline-lg text-white mt-2">The Movement</h2>
        <p className="text-sm text-white/30 font-body max-w-md mt-4">
          Three moments that defined a culture. Three decades of relentless innovation.
        </p>
      </div>

      <div ref={panelsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto w-full" style={{ perspective: '1200px' }}>
        {scenes.map((scene) => (
          <article key={scene.num} className="group relative bg-dark/50 border border-white/5 hover:border-accent/30 transition-all duration-700 overflow-visible morph-card hover:shadow-[0_20px_60px_-15px_rgba(230,0,0,0.2)]" style={{ transformStyle: 'preserve-3d' }}>
            <div className="relative aspect-[16/10] md:aspect-[4/3] overflow-hidden">
              <img src={scene.image} alt={scene.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute top-4 left-4 text-5xl md:text-6xl font-display text-white/10 group-hover:text-accent/30 transition-all duration-500 group-hover:scale-110">{scene.num}</span>

              <div className="absolute top-4 right-4 w-6 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-accent transition-all duration-500" />
            </div>
            <div className="p-5 md:p-6 lg:p-8">
              <p className="label-caps text-accent mb-1">{scene.subtitle}</p>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-display text-white leading-none mb-3 group-hover:tracking-wider transition-all duration-500">{scene.title}</h3>
              <div className="w-8 h-px bg-accent/50 mb-4 group-hover:w-16 transition-all duration-500" />
              <p className="text-xs md:text-sm text-white/50 font-body leading-relaxed">{scene.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
