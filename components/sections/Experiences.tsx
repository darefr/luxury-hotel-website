'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Waves, Sunrise, Wind, Landmark, MapPin, Compass, ArrowRight, X } from 'lucide-react'

const EXPERIENCES = [
  {
    id: 'boating',
    icon: Waves,
    category: 'Lake',
    name: 'Phewa Lake Boating',
    tagline: 'Row out to the Tal Barahi temple',
    description:
      'Phewa Lake is about a 6-minute walk from the hotel. Hire a colourful wooden boat, paddle across the calm water, and visit the small island temple of Tal Barahi in the middle of the lake.',
    distance: '~6 min walk',
    image: '/images/phewa-lake.png',
    tags: ['Boating', 'Lake', 'Temple'],
  },
  {
    id: 'sunrise',
    icon: Sunrise,
    category: 'Viewpoint',
    name: 'Sarangkot Sunrise',
    tagline: 'Sunrise over the Annapurnas',
    description:
      'Head up to the Sarangkot viewpoint early in the morning to watch the sun rise over the Annapurna range and the Machapuchare (Fishtail) peak — one of Pokhara\u2019s most famous views.',
    distance: 'Short drive',
    image: '/images/sarangkot-sunrise.png',
    tags: ['Sunrise', 'Mountains', 'Viewpoint'],
  },
  {
    id: 'paragliding',
    icon: Wind,
    category: 'Adventure',
    name: 'Paragliding',
    tagline: 'Fly above the lake and valley',
    description:
      'Pokhara is one of the world\u2019s top paragliding destinations. Tandem flights launch from Sarangkot and glide over Phewa Lake and the valley, with the Himalayas on the horizon.',
    distance: 'From Sarangkot',
    image: '/images/paragliding.png',
    tags: ['Adventure', 'Aerial', 'Tandem'],
  },
  {
    id: 'pagoda',
    icon: Landmark,
    category: 'Landmark',
    name: 'World Peace Pagoda',
    tagline: 'Panoramic views over Pokhara',
    description:
      'The white World Peace Pagoda (Shanti Stupa) sits on a hilltop across the lake. It can be reached by boat and a short hike, and rewards you with sweeping views of the lake and mountains.',
    distance: 'Across the lake',
    image: '/images/peace-pagoda.png',
    tags: ['Views', 'Hike', 'Buddhist'],
  },
  {
    id: 'lakeside',
    icon: MapPin,
    category: 'Town',
    name: 'Lakeside Pokhara',
    tagline: 'Cafes, shops & evening buzz',
    description:
      'Pokhara\u2019s lively Lakeside district is roughly an 18-minute walk from the hotel, packed with restaurants, cafes, craft shops and gear stores for trekkers.',
    distance: '~18 min walk',
    image: '/images/pokhara-valley.png',
    tags: ['Cafes', 'Shopping', 'Nightlife'],
  },
  {
    id: 'temple',
    icon: Compass,
    category: 'Culture',
    name: 'Bindhyabasini Temple',
    tagline: 'A revered hilltop temple',
    description:
      'The historic Shree Bindhyabasini Temple, one of Pokhara\u2019s oldest religious sites, is about 3.4 km away near the old bazaar \u2014 a peaceful spot with views over the town.',
    distance: '~3.4 km',
    image: '/images/hotel-exterior.png',
    tags: ['Temple', 'Culture', 'Old Town'],
  },
]

const categoryColors: Record<string, string> = {
  Lake: '#9ab0c0',
  Viewpoint: '#d4935a',
  Adventure: '#b87333',
  Landmark: '#c4b99a',
  Town: '#a8c09a',
  Culture: '#d4935a',
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
          <p className="label-luxury mb-4">Around the Hotel</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
            Explore Pokhara
          </h2>
          <p className="text-ivory/50 font-sans text-sm max-w-md mx-auto leading-relaxed">
            Hotel Sonam is a great base for discovering Pokhara. Here are some of the lakes, viewpoints and experiences within easy reach — our front desk is glad to help you plan.
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
                  <div className="flex items-center gap-1.5 text-copper">
                    <MapPin size={12} />
                    <span className="font-sans text-xs">{exp.distance}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-copper font-sans text-[0.65rem] tracking-widest uppercase group-hover:gap-2.5 transition-all duration-300">
                    Details
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
                  <div className="flex items-center gap-2 text-ivory/70">
                    <MapPin size={16} className="text-copper" />
                    <span className="font-sans text-sm">{active.distance} from the hotel</span>
                  </div>
                  <button
                    onClick={() => { setActive(null); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="px-7 py-3 bg-copper text-midnight font-sans text-xs tracking-widest uppercase hover:bg-copper-light transition-all duration-300"
                  >
                    Ask Front Desk
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
