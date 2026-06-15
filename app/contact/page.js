'use client'

import { motion } from 'framer-motion'

const locations = [
  { city: 'Beaverton, OR', address: 'One Bowerman Drive, Beaverton, OR 97005', phone: '+1 503-671-6453' },
  { city: 'New York, NY', address: '650 Fifth Avenue, New York, NY 10019', phone: '+1 212-688-6453' },
  { city: 'London, UK', address: 'Nike Town London, 236-238 Oxford St, W1C 1DH', phone: '+44 20 7612 0800' },
]

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-body">Connect</span>
          <h1 className="text-3xl md:text-5xl font-display mt-2 text-white">Get in Touch</h1>
          <div className="w-12 h-[1px] bg-accent mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-white/40 font-body mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors" placeholder="First" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-white/40 font-body mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors" placeholder="Last" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-white/40 font-body mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-white/40 font-body mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 bg-white/5 border border-white/10 text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors resize-none" placeholder="Your message..." />
              </div>
              <button type="submit" className="w-full py-3.5 bg-accent text-white text-sm font-body font-medium hover:bg-accent/80 transition-all duration-300 tracking-wider uppercase">
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }} className="space-y-8">
            <h3 className="text-sm uppercase tracking-[0.15em] text-white/40 font-body">Our Stores</h3>
            {locations.map((loc) => (
              <div key={loc.city} className="p-6 bg-carbon border border-white/5 hover:border-accent/30 transition-all duration-500">
                <h4 className="text-sm font-medium font-body text-white">{loc.city}</h4>
                <p className="text-xs text-white/40 font-body mt-2">{loc.address}</p>
                <p className="text-xs text-white/40 font-body mt-1">{loc.phone}</p>
              </div>
            ))}
            <div className="pt-4">
              <h3 className="text-sm uppercase tracking-[0.15em] text-white/40 font-body mb-4">Support</h3>
              <p className="text-sm text-white/50 font-body">support@nike.com</p>
              <p className="text-sm text-white/50 font-body mt-1">+1 800-806-NIKE</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
