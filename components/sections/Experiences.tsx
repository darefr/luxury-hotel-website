'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Compass, Fish, Sunset, ChefHat, Waves, Camera, ArrowRight, X } from 'lucide-react'

const EXPERIENCES = [
  {
    id: 'dive',
    icon: Fish,
    category: 'Adventure',
    name: 'Private Reef Diving',
    tagline: 'Explore an untouched underwater world',
    description:
      'Guided by our resident marine biologist, descend into a kaleidoscopic reef accessible only to Velour guests. Morning and sunset dives available, with full equipment and underwater photography included.',
    duration: 'Half-day',
    price: 480,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80',
    tags: ['Marine Life', 'Photography', 'Guided'],
  },
  {
    id: 'sailing',
    icon: Compass,
    category: 'Exploration',
    name: 'Sunset Sailing Charter',
    tagline: 'Your own horizon, your own pace',
    description:
      'Board a hand-built traditional dhoni equipped with champagne, seasonal canapés, and a sunset to make time stop. Navigate to remote sandbars — your private island for the evening.',
    duration: '3 hours',
    price: 620,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    tags: ['Private Charter', 'Champagne', 'Sunset'],
  },
  {
    id: 'chef',
    icon: ChefHat,
    category: 'Gastronomy',
    name: 'Private Chef's Table',
    tagline: 'A dinner conceived entirely for you',
    description:
      'Dine one-on-one with our Executive Chef in the private kitchen. A custom eight-course tasting menu designed around your preferences, served with paired wines from our 3,000-bottle cellar.',
    duration: 'Evening',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    tags: ['8 Courses', 'Wine Pairing', 'Exclusive'],
  },
  {
    id: 'sunrise',
    icon: Sunset,
    category: 'Wellness',
    name: 'Sunrise Yoga Retreat',
    tagline: 'Begin your day in perfect alignment',
    description:
      'A guided 90-minute yoga and pranayama session on our floating sunrise platform as the Indian Ocean comes alive. Followed by a nourishing botanical breakfast on the water.',
    duration: '2.5 hours',
    price: 180,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80',
    tags: ['Yoga', 'Meditation', 'Breakfast'],
  },
  {
    id: 'surf',
    icon: Waves,
    category: 'Adventure',
    name: 'Surf & Ocean Academy',
    tagline: 'Ride the finest breaks in the atoll',
    description:
      'From beginner sessions to advanced surfing at world-class reef breaks — guided by ISA-certified instructors via private motorboat to the best swells in the region.',
    duration: 'Half-day',
    price: 360,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=80',
    tags: ['Surfing', 'Instruction', 'Private Boat'],
  },
  {
    id: 'photo',
    icon: Camera,
    category: 'Memory',
    name: 'Bespoke Photography Session',
    tagline: 'Your story, beautifully captured',
    description:
      'A dedicated photographer accompanies you for half a day — capturing portraits, couple moments, and the landscape of your stay. Delivered as a gallery of curated high-resolution images.',
    duration: 'Half-day',
    price: 540,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80',
    tags: ['Portraits', 'High-Res', 'Gallery'],
  },
]

const categoryColors: Record<string, string> = {
  Adventure: '#b87333',
  Exploration: '#c4b99a',
  Gastronomy: '#d4935a',
  Wellness: '#a8c09a',
  Memory: '#9ab0c0',
}

export default function Experiences() {
  const [active, setActive] = useState<(typeof EXPERIENCES)[0] | null>(null)

  return (
    <section id="experiences" className="py-28 bg-midnight relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="label-luxury mb-4">Beyond the Ordinary</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
            Curated Experiences
          </h2>
          <p className="text-ivory/50 font-sans text-sm max-w-md mx-auto leading-relaxed">
            Each experience at Velour & Co. is designed to dissolve the boundary between guest and destination — leaving you with stories you will tell for decades.
          </p>
          <div className="divider-copper w-16 mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.65 }}
              className="group cursor-pointer bg-midnight-3 border border-copper/10 hover:border-copper/25
                         transition-all duration-300 overflow-hidden"
              style={{ borderRadius: '4px' }}
              onClick={() => setActive(exp)}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-3 via-transparent to-transparent" />
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 text-[0.55rem] font-sans font-medium tracking-wider uppercase"
                  style={{ color: categoryColors[exp.category] || '#b87333', background: 'rgba(10,15,30,0.7)' }}
                >
                  {exp.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center border border-copper/20 flex-shrink-0 mt-0.5">
                    <exp.icon size={14} className="text-copper" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-light text-ivory leading-snug">{exp.name}</h3>
                    <p className="font-sans text-xs text-ivory/40 mt-0.5">{exp.tagline}</p>
                  </div>
                </div>
                <p className="font-sans text-xs text-ivory/45 leading-relaxed mb-4 line-clamp-2">{exp.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif text-xl text-copper">${exp.price}</span>
                    <span className="font-sans text-[0.6rem] text-ivory/30 ml-1">/ {exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-copper font-sans text-[0.65rem] tracking-widest uppercase group-hover:gap-2.5 transition-all duration-300">
                    Enquire
                    <ArrowRight size={11} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="exp-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-midnight/90 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />
            <motion.div
              key="exp-modal"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="fixed inset-4 md:inset-16 lg:inset-24 z-[51] bg-midnight-2 border border-copper/15 overflow-y-auto"
              style={{ borderRadius: '4px' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="exp-modal-title"
            >
              <div className="relative h-56 md:h-80">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-2 to-transparent" />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center glass border border-ivory/20 text-ivory hover:text-copper transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-8 md:p-12">
                <p className="label-luxury mb-2" style={{ color: categoryColors[active.category] }}>{active.category}</p>
                <h2 id="exp-modal-title" className="font-serif text-4xl font-light text-ivory mb-2">{active.name}</h2>
                <p className="text-ivory/40 font-sans text-sm italic mb-6">{active.tagline}</p>
                <p className="text-ivory/60 font-sans text-sm leading-relaxed mb-8">{active.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {active.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 border border-copper/20 text-ivory/50 font-sans text-[0.65rem] tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif text-3xl text-ivory">${active.price}</span>
                    <span className="text-ivory/30 text-sm ml-2">/ {active.duration}</span>
                  </div>
                  <button
                    onClick={() => { setActive(null); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="px-7 py-3 bg-copper text-midnight font-sans text-xs tracking-widest uppercase hover:bg-copper-light transition-all duration-300"
                  >
                    Enquire Now
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
