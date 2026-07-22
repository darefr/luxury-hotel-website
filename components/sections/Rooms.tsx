'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { BedDouble, Maximize, Waves, Wind, Wifi, Coffee, ArrowRight, Star } from 'lucide-react'

const ROOMS = [
  {
    id: 'garden',
    name: 'Garden Suite',
    tagline: 'Serenity Amongst the Palms',
    price: 1200,
    size: 95,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80',
    ],
    features: ['Private garden terrace', 'Rain shower & deep-soak tub', 'Butler service', 'King or twin beds'],
    amenities: [Wifi, Coffee, Wind, BedDouble],
    badge: 'Most Popular',
  },
  {
    id: 'ocean',
    name: 'Ocean Pavilion',
    tagline: 'Over-Water Living Redefined',
    price: 1800,
    size: 130,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=80',
      'https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=900&q=80',
    ],
    features: ['Over-water deck with ladder to lagoon', 'Glass floor panels', 'Private plunge pool', 'Sunset views'],
    amenities: [Wifi, Waves, Wind, Coffee],
    badge: 'Signature',
  },
  {
    id: 'villa',
    name: 'Signature Villa',
    tagline: 'An Estate of One\'s Own',
    price: 2400,
    size: 220,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80',
    ],
    features: ['2 bedrooms + living pavilion', 'Infinity pool', 'Personal chef on request', 'Buggy & boat transfers'],
    amenities: [Wifi, Waves, Wind, Coffee],
    badge: 'Exclusive',
  },
  {
    id: 'penthouse',
    name: 'The Grand Penthouse',
    tagline: 'The Pinnacle of Indulgence',
    price: 3000,
    size: 380,
    guests: 6,
    image: 'https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=900&q=80',
      'https://images.unsplash.com/photo-1463621788602-f4d7b0eb2f0c?w=900&q=80',
    ],
    features: ['Full private floor', 'Rooftop infinity pool', 'In-suite cinema & bar', '24/7 dedicated concierge'],
    amenities: [Wifi, Waves, Wind, Coffee],
    badge: 'Ultra-Luxury',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
}

export default function Rooms() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<(typeof ROOMS)[0] | null>(null)

  return (
    <section id="rooms" className="py-28 bg-midnight relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-px divider-copper opacity-40"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 right-0 w-96 h-96 rounded-full pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(circle, #b87333 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="label-luxury mb-4">Accommodations</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
            Rooms &amp; Suites
          </h2>
          <p className="text-ivory/50 font-sans text-sm max-w-md mx-auto leading-relaxed">
            Each accommodation is a self-contained world — crafted to inspire, restore, and delight with meticulous attention to every detail.
          </p>
          <div className="divider-copper w-16 mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Rooms grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {ROOMS.map(room => (
            <motion.div
              key={room.id}
              variants={cardVariants}
              className="group relative overflow-hidden cursor-pointer bg-midnight-3"
              style={{ borderRadius: '4px' }}
              onHoverStart={() => setHovered(room.id)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setSelected(room)}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-copper/90 text-midnight text-[0.6rem] font-sans font-medium tracking-wider uppercase">
                  {room.badge}
                </div>

                {/* Price overlay */}
                <div className="absolute top-4 right-4 text-right">
                  <p className="font-serif text-2xl text-ivory font-light">${room.price.toLocaleString()}</p>
                  <p className="label-luxury text-[0.5rem] text-ivory/50">per night</p>
                </div>

                {/* Hover view prompt */}
                <motion.div
                  animate={{ opacity: hovered === room.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center bg-midnight/30"
                >
                  <span className="label-luxury text-ivory border border-ivory/30 px-4 py-2 glass text-xs">
                    View Details
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-ivory mb-1">{room.name}</h3>
                    <p className="font-sans text-xs text-copper italic">{room.tagline}</p>
                  </div>
                  <div className="flex items-center gap-1 text-copper mt-1">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-5 py-4 border-y border-copper/10 mb-4">
                  <div className="flex items-center gap-1.5 text-ivory/50">
                    <Maximize size={12} className="text-copper" />
                    <span className="font-sans text-xs">{room.size} m²</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-ivory/50">
                    <BedDouble size={12} className="text-copper" />
                    <span className="font-sans text-xs">Up to {room.guests} guests</span>
                  </div>
                  {room.amenities.map((Icon, i) => (
                    <Icon key={i} size={13} className="text-ivory/30" aria-hidden="true" />
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-1.5 mb-5">
                  {room.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-ivory/60 font-sans text-xs">
                      <span className="w-1 h-1 rounded-full bg-copper flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={e => { e.stopPropagation(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="group/btn flex items-center gap-2 text-copper font-sans text-xs tracking-widest uppercase
                             hover:gap-3 transition-all duration-300"
                  aria-label={`Reserve ${room.name}`}
                >
                  Reserve Room
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Room detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="room-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-midnight/90 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              key="room-modal"
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="fixed inset-4 md:inset-12 lg:inset-20 z-[51] bg-midnight-2 border border-copper/15 overflow-y-auto"
              style={{ borderRadius: '4px' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="room-modal-title"
            >
              <div className="relative h-64 md:h-96">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-2 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center glass border border-ivory/20 text-ivory hover:text-copper transition-colors"
                  aria-label="Close room details"
                >
                  ✕
                </button>
              </div>
              <div className="p-8 md:p-12">
                <p className="label-luxury text-copper mb-2">{selected.badge}</p>
                <h2 id="room-modal-title" className="font-serif text-4xl md:text-5xl font-light text-ivory mb-2">
                  {selected.name}
                </h2>
                <p className="text-copper italic font-sans text-sm mb-6">{selected.tagline}</p>
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2 text-ivory/60">
                    <Maximize size={14} className="text-copper" />
                    <span className="font-sans text-sm">{selected.size} m²</span>
                  </div>
                  <div className="flex items-center gap-2 text-ivory/60">
                    <BedDouble size={14} className="text-copper" />
                    <span className="font-sans text-sm">Up to {selected.guests} guests</span>
                  </div>
                </div>
                <h4 className="label-luxury text-ivory/50 mb-4">Room Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                  {selected.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-ivory/70 font-sans text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif text-3xl text-ivory">${selected.price.toLocaleString()}</span>
                    <span className="text-ivory/40 font-sans text-xs ml-2">/ night</span>
                  </div>
                  <button
                    onClick={() => { setSelected(null); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="px-8 py-3 bg-copper text-midnight font-sans text-xs tracking-widest uppercase
                               hover:bg-copper-light transition-all duration-300"
                  >
                    Reserve This Room
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
