'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'

const VENUES = [
  {
    name: 'Hotel Sonam Restaurant',
    type: 'On-site Dining',
    description:
      'Our in-house restaurant serves freshly prepared Nepali favourites alongside familiar continental dishes. Start the day with breakfast and unwind over dinner without leaving the hotel.',
    image: '/images/restaurant.png',
    hours: 'Breakfast · Lunch · Dinner',
    badge: 'On-site',
    cuisine: 'Nepali · Continental',
  },
  {
    name: 'Rooftop Terrace',
    type: 'Tea, Coffee & Views',
    description:
      'Relax on our rooftop terrace with a cup of tea or coffee and take in views of the surrounding hills, a golden monastery and, on clear mornings, the Himalayan peaks beyond.',
    image: '/images/hotel-sonam-rooftop.jpg',
    hours: 'Open through the day',
    badge: 'Mountain Views',
    cuisine: 'Tea · Coffee · Light bites',
  },
  {
    name: 'Lakeside, A Short Walk Away',
    type: 'Explore Nearby',
    description:
      "Phewa Lake is about a 6-minute walk and Pokhara's lively Lakeside is roughly 18 minutes on foot, with dozens of cafes and restaurants. Natural Mystic, serving French cuisine, is around 150 metres away.",
    image: '/images/phewa-lake.png',
    hours: 'Varies by venue',
    badge: 'Nearby',
    cuisine: 'Many options',
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
            <p className="label-luxury mb-4">Food & Drink</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory leading-tight">
              Dining at<br />
              <em className="text-gradient-copper not-italic">Hotel Sonam</em>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-ivory/50 font-sans text-sm leading-relaxed max-w-md"
          >
            Enjoy home-style cooking at our on-site restaurant, a quiet cup of tea on the rooftop terrace, or wander down to Lakeside for even more choice.
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
                <h3 className="font-serif text-3xl md:text-4xl font-light text-ivory mb-4">{venue.name}</h3>

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
                  aria-label={`Ask about ${venue.name}`}
                >
                  Ask Us More
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
