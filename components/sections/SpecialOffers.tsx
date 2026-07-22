'use client'

import { motion } from 'framer-motion'
import { Tag, Clock, ArrowRight } from 'lucide-react'

const OFFERS = [
  {
    id: 'honeymoon',
    badge: 'Romance',
    name: 'Honeymoon Escape',
    tagline: 'Begin forever here',
    desc: 'A 7-night Ocean Pavilion stay with daily breakfast, private beach dinner, couples spa treatment, and complimentary floral suite decoration.',
    saving: 'Save 20%',
    price: 'From $10,080',
    expires: 'Valid year-round',
    highlight: true,
  },
  {
    id: 'extended',
    badge: 'Value',
    name: 'Stay Longer, Live Deeper',
    tagline: '5 nights or more',
    desc: 'Book five nights and receive the sixth complimentary. Enjoy a curated island tour, sunset cruise for two, and a personalised gift from our sommelier.',
    saving: '1 Night Free',
    price: 'From $6,000',
    expires: 'Limited availability',
    highlight: false,
  },
  {
    id: 'wellness',
    badge: 'Wellbeing',
    name: 'Total Renewal Retreat',
    tagline: 'Restore mind, body & spirit',
    desc: 'A 4-night immersive wellness programme: daily sunrise yoga, three spa treatments, nutritional consultations, and guided meditation sessions.',
    saving: 'Save 15%',
    price: 'From $5,440',
    expires: 'Seasonal offer',
    highlight: false,
  },
]

export default function SpecialOffers() {
  return (
    <section id="offers" className="py-28 bg-midnight-3 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      {/* Decorative corner */}
      <div
        className="absolute top-0 right-0 w-80 h-80 opacity-[0.03]"
        style={{ background: 'radial-gradient(circle at top right, #b87333, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="label-luxury mb-4 flex items-center justify-center gap-2">
            <Tag size={10} className="text-copper" />
            Special Packages
          </p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-4">
            Exclusive Offers
          </h2>
          <p className="text-ivory/50 font-sans text-sm max-w-sm mx-auto">
            Thoughtfully assembled packages that transform a stay into an unforgettable chapter.
          </p>
          <div className="divider-copper w-16 mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Offers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.65 }}
              className={`relative flex flex-col p-7 border transition-all duration-300 overflow-hidden group
                ${offer.highlight
                  ? 'border-copper/40 bg-midnight-2 glow-copper-sm'
                  : 'border-copper/10 bg-midnight hover:border-copper/25'}`}
              style={{ borderRadius: '4px' }}
            >
              {/* Highlight glow */}
              {offer.highlight && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(184,115,51,0.06) 0%, transparent 60%)' }}
                />
              )}

              <div className="flex items-start justify-between mb-4">
                <span className="label-luxury text-[0.55rem] text-copper border border-copper/30 px-2.5 py-1">
                  {offer.badge}
                </span>
                <span className="label-luxury text-[0.55rem] text-ivory/30 border border-ivory/10 px-2.5 py-1">
                  {offer.saving}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-light text-ivory mb-1">{offer.name}</h3>
              <p className="text-copper font-sans text-xs italic mb-4">{offer.tagline}</p>
              <p className="text-ivory/45 font-sans text-sm leading-relaxed mb-5 flex-1">{offer.desc}</p>

              <div className="flex items-center gap-1.5 text-ivory/25 mb-5">
                <Clock size={11} />
                <span className="font-sans text-xs">{offer.expires}</span>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-copper/10">
                <p className="font-serif text-lg text-ivory">{offer.price}</p>
                <button
                  onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`group/btn flex items-center gap-1.5 font-sans text-[0.65rem] tracking-widest uppercase
                    transition-all duration-300 hover:gap-2.5 ${offer.highlight ? 'text-copper' : 'text-ivory/50 hover:text-copper'}`}
                >
                  Book Package
                  <ArrowRight size={11} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
