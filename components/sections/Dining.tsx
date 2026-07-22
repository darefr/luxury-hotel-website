'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Clock, ArrowRight } from 'lucide-react'

const VENUES = [
  {
    name: 'Maré',
    type: 'Over-Water Fine Dining',
    description:
      'Helmed by Chef Alain Noir, Maré offers a seven-course tasting menu inspired by the living reef below. Reserve a table at sunset for an experience that transcends the palate.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    hours: '7:00 PM – 11:00 PM',
    rating: 5,
    badge: 'Michelin Star',
    cuisine: 'Contemporary French · Seafood',
  },
  {
    name: 'The Terrace',
    type: 'Casual All-Day Dining',
    description:
      'A breezy open-air sanctuary serving fresh tropical breakfasts, light Mediterranean lunches, and informal evening gatherings around the fire pit.',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&q=80',
    hours: '7:00 AM – 10:00 PM',
    rating: 5,
    badge: 'All-Day',
    cuisine: 'Mediterranean · Tropical',
  },
  {
    name: 'Noir Bar',
    type: 'Signature Cocktail Lounge',
    description:
      "The heartbeat of Velour & Co. after dark. Noir Bar's master mixologist crafts bespoke cocktails using rare botanicals, smoked spirits, and edible florals.",
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=80',
    hours: '5:00 PM – 2:00 AM',
    rating: 5,
    badge: 'Award-Winning Bar',
    cuisine: 'Cocktails · Wines · Light Bites',
  },
]

export default function Dining() {
  return (
    <section id="dining" className="py-28 bg-midnight relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="label-luxury mb-4">Culinary Arts</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory leading-tight">
              Dining at<br />
              <em className="text-gradient-copper not-italic">Velour &amp; Co.</em>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-ivory/50 font-sans text-sm leading-relaxed max-w-md"
          >
            Three distinct culinary destinations, one extraordinary vision: to make every meal a memory. From Michelin-starred fine dining to barefoot coastal lunches, the table is always set for wonder.
          </motion.p>
        </div>

        {/* Venues */}
        <div className="space-y-8">
          {VENUES.map((venue, i) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`group grid md:grid-cols-2 gap-0 overflow-hidden bg-midnight-3 border border-copper/10 hover:border-copper/25 transition-all duration-500 ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
              style={{ borderRadius: '4px' }}
            >
              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-midnight-3/40 to-transparent" />
                {/* Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1 glass border border-copper/20 text-copper label-luxury text-[0.55rem]">
                  {venue.badge}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="label-luxury text-copper/70 mb-2">{venue.type}</p>
                <h3 className="font-serif text-3xl md:text-4xl font-light text-ivory mb-3">{venue.name}</h3>

                {/* Stars */}
                <div className="flex gap-1 mb-4" aria-label={`${venue.rating} stars`}>
                  {Array.from({ length: venue.rating }).map((_, j) => (
                    <Star key={j} size={11} className="text-copper" fill="currentColor" />
                  ))}
                </div>

                <p className="text-ivory/50 font-sans text-sm leading-relaxed mb-4">{venue.description}</p>

                <div className="flex items-center gap-2 text-ivory/40 mb-6">
                  <Clock size={12} className="text-copper" />
                  <span className="font-sans text-xs">{venue.hours}</span>
                  <span className="text-copper/40 mx-2">·</span>
                  <span className="font-sans text-xs text-ivory/30">{venue.cuisine}</span>
                </div>

                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group/btn self-start flex items-center gap-2 text-copper font-sans text-xs tracking-widest uppercase
                             hover:gap-3 transition-all duration-300"
                  aria-label={`Reserve at ${venue.name}`}
                >
                  Reserve a Table
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
