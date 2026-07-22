'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const AWARDS = [
  { year: '2024', name: 'Condé Nast Traveller', award: '#1 Boutique Hotel — Maldives' },
  { year: '2024', name: 'Travel + Leisure', award: 'World\'s Best Hotel' },
  { year: '2023', name: 'Forbes Travel Guide', award: '5-Star Rating' },
  { year: '2023', name: 'Tatler Spa Guide', award: 'Gold Award — Best Spa' },
  { year: '2023', name: 'Michelin Guide', award: 'One Star — Restaurant Maré' },
  { year: '2022', name: 'Leading Hotels of the World', award: 'Best in Category' },
  { year: '2022', name: 'Wallpaper* Design Award', award: 'Best New Hotel' },
  { year: '2022', name: 'GLOBAL 100', award: 'World\'s Most Sustainable Resort' },
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
          Recognition &amp; Awards
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
