'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const AWARDS = [
  { year: '4.9★', name: 'Rated by Guests', award: 'On Google Reviews' },
  { year: 'Lake', name: 'Great Location', award: '6 min walk to Phewa Lake' },
  { year: 'Food', name: 'On-site Restaurant', award: 'Nepali & continental' },
  { year: 'Free', name: 'Free Parking', award: 'On the property' },
  { year: 'Air', name: 'Airport Shuttle', award: 'Available on request' },
  { year: 'Rooms', name: 'Balcony Rooms', award: 'Air-conditioned & non-smoking' },
  { year: 'Calm', name: 'Peaceful Setting', award: 'Quiet Simalchaur area' },
  { year: 'View', name: 'Rooftop Terrace', award: 'Himalayan views' },
]

// Duplicated for seamless infinite scroll
const ALL = [...AWARDS, ...AWARDS]

export default function Awards() {
  return (
    <section id="awards" className="py-20 bg-midnight-3 relative overflow-hidden" aria-label="Awards and recognition">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="label-luxury flex items-center justify-center gap-2">
          <Award size={10} className="text-copper" aria-hidden="true" />
          Why Guests Choose Us
        </p>
      </motion.div>

      {/* Marquee */}
      <div className="relative overflow-hidden" aria-hidden="true">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-midnight-3 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-midnight-3 to-transparent pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {ALL.map((award, i) => (
            <div
              key={i}
              className="flex items-center gap-6 px-10 py-3 border-r border-copper/10 flex-shrink-0"
            >
              <span className="label-luxury text-[0.55rem] text-copper/50">{award.year}</span>
              <div className="w-1 h-1 rounded-full bg-copper/30 flex-shrink-0" />
              <span className="font-serif text-sm text-ivory/60 italic">{award.name}</span>
              <div className="w-1 h-1 rounded-full bg-copper/30 flex-shrink-0" />
              <span className="font-sans text-xs text-ivory/40">{award.award}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
