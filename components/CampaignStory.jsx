'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const scenes = [
  {
    num: '01',
    title: 'THE HANDSHAKE',
    subtitle: '1964 · Oregon',
    body: 'Bill Bowerman and Phil Knight shook hands on a partnership that would redefine sport forever. Two visionaries. One relentless belief.',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80',
  },
  {
    num: '02',
    title: 'THE SWOOSH',
    subtitle: '1971 · Innovation',
    body: 'A logo worth $35 became the most recognizable symbol in athletics. Simple. Bold. Unmistakably Nike.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
  },
  {
    num: '03',
    title: 'JUST DO IT',
    subtitle: '1988 · Movement',
    body: 'Three words that transcended advertising to become a global philosophy. Not a slogan — a way of life.',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa0?w=1200&q=80',
  },
]

export default function CampaignStory() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const mobileStackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          const track = trackRef.current
          if (!track) return
          const totalWidth = track.scrollWidth - window.innerWidth

          // #region agent log
          fetch('http://127.0.0.1:7558/ingest/3173c7c3-79db-4c24-80a1-6a04e646ce45',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6afc59'},body:JSON.stringify({sessionId:'6afc59',location:'CampaignStory.jsx:desktop',message:'Desktop horizontal story scroll',data:{totalWidth},timestamp:Date.now(),runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
          // #endregion

          const scrollTween = gsap.to(track, {
            x: -totalWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${totalWidth}`,
              pin: pinRef.current,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          track.querySelectorAll('.story-panel').forEach((panel) => {
            const text = panel.querySelector('.story-text')
            const img = panel.querySelector('.story-image')
            const num = panel.querySelector('.story-num')

            gsap.fromTo(text, { opacity: 0, x: 40 }, {
              opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: 'left 80%', toggleActions: 'play none none none' },
            })

            gsap.fromTo(img, { scale: 1.08, opacity: 0.85 }, {
              scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: 'left 85%', toggleActions: 'play none none none' },
            })

            gsap.fromTo(num, { opacity: 0, y: 24 }, {
              opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
              scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: 'left 80%', toggleActions: 'play none none none' },
            })
          })
        },
        '(max-width: 767px)': () => {
          // #region agent log
          fetch('http://127.0.0.1:7558/ingest/3173c7c3-79db-4c24-80a1-6a04e646ce45',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6afc59'},body:JSON.stringify({sessionId:'6afc59',location:'CampaignStory.jsx:mobile',message:'Mobile vertical story (no pin)',data:{panelCount:mobileStackRef.current?.children?.length||0},timestamp:Date.now(),runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
          // #endregion

          gsap.fromTo(mobileStackRef.current?.children, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: mobileStackRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} data-section="story" className="relative bg-carbon overflow-hidden">
      <div className="px-4 sm:px-6 md:px-12 pt-16 pb-4 md:hidden">
        <span className="label-caps text-accent">Brand Story</span>
        <h2 className="headline-lg text-white mt-2">The Movement</h2>
      </div>

      <div ref={mobileStackRef} className="md:hidden px-4 sm:px-6 pb-16 space-y-12">
        {scenes.map((scene) => (
          <article key={scene.num} className="story-panel-mobile">
            <div className="relative aspect-[4/5] overflow-hidden mb-6">
              <img src={scene.image} alt={scene.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent" />
            </div>
            <span className="block text-5xl font-display text-white/10 mb-3">{scene.num}</span>
            <p className="label-caps text-accent mb-2">{scene.subtitle}</p>
            <h3 className="text-3xl font-display text-white leading-none mb-4">{scene.title}</h3>
            <p className="text-sm text-white/50 font-body leading-relaxed">{scene.body}</p>
            <div className="w-16 h-px bg-accent mt-6" />
          </article>
        ))}
      </div>

      <div ref={pinRef} className="relative hidden md:block h-screen overflow-hidden">
        <div className="absolute top-12 left-6 md:left-12 z-20">
          <span className="label-caps text-accent">Brand Story</span>
          <h2 className="headline-lg text-white mt-2">The Movement</h2>
        </div>

        <div ref={trackRef} className="horizontal-scroll-track absolute top-0 left-0 h-full items-center pl-6 md:pl-12 pt-32 pb-12">
          {scenes.map((scene) => (
            <div
              key={scene.num}
              className="story-panel relative flex-shrink-0 w-[80vw] lg:w-[70vw] h-[70vh] flex flex-row gap-16 items-center px-8"
            >
              <div className="story-text flex-1">
                <span className="story-num block text-6xl md:text-8xl font-display text-white/10 mb-4">{scene.num}</span>
                <p className="label-caps text-accent mb-3">{scene.subtitle}</p>
                <h3 className="text-4xl md:text-6xl font-display text-white leading-none mb-6">{scene.title}</h3>
                <p className="text-sm md:text-base text-white/50 font-body leading-relaxed max-w-md">{scene.body}</p>
                <div className="w-20 h-px bg-accent mt-8" />
              </div>
              <div className="story-image relative flex-1 aspect-[3/4] overflow-hidden w-full max-w-lg">
                <img src={scene.image} alt={scene.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 via-transparent to-transparent" />
                <div className="absolute inset-0 border border-white/5" />
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-[20vw]" />
        </div>
      </div>
    </section>
  )
}
