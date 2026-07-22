'use client'

import { motion } from 'framer-motion'
import {
  Waves, Dumbbell, Wifi, Car, ShieldCheck, Utensils,
  Wind, Coffee, Sparkles, Sunset, Globe, Clock
} from 'lucide-react'

const AMENITIES = [
  { icon: Waves,      label: 'Infinity Pool',          desc: 'Two overwater pools merging with the horizon' },
  { icon: Sparkles,   label: 'Velour Spa',             desc: 'Award-winning treatments & hydrotherapy' },
  { icon: Utensils,   label: 'Fine Dining',            desc: 'Three restaurants by Michelin-starred chefs' },
  { icon: Dumbbell,   label: 'Fitness Studio',         desc: 'State-of-the-art equipment & personal trainers' },
  { icon: Wind,       label: 'Yoga & Meditation',      desc: 'Open-air pavilions & guided sunrise sessions' },
  { icon: Car,        label: 'Private Transfers',       desc: 'Seaplane, speedboat & limousine on request' },
  { icon: Coffee,     label: 'In-Suite Dining',        desc: '24-hour butler & custom menu service' },
  { icon: Globe,      label: 'Concierge',              desc: 'Bespoke local experiences & island excursions' },
  { icon: Wifi,       label: 'High-Speed Wi-Fi',       desc: 'Fibre connectivity across every property' },
  { icon: ShieldCheck, label: 'Private Security',      desc: 'Discreet around-the-clock personal security' },
  { icon: Sunset,     label: 'Sunset Cruise',          desc: 'Private dhoni boat with champagne & canapés' },
  { icon: Clock,      label: 'Late Check-Out',         desc: 'Flexible departure on request for all suites' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
}

export default function Amenities() {
  return (
    <section id="amenities" className="py-28 bg-midnight-2 relative overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,115,51,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="label-luxury mb-4">What Awaits You</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
            World-Class Amenities
          </h2>
          <p className="text-ivory/50 font-sans text-sm max-w-md mx-auto leading-relaxed">
            At Velour & Co., every service has been thoughtfully composed to exceed your expectations — not merely meet them.
          </p>
          <div className="divider-copper w-16 mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-copper/8"
        >
          {AMENITIES.map((amenity, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group bg-midnight-2 p-6 md:p-8 flex flex-col gap-4 hover:bg-midnight-3
                         transition-colors duration-300 cursor-default"
            >
              <div
                className="w-11 h-11 flex items-center justify-center border border-copper/25
                           group-hover:border-copper group-hover:bg-copper/10 transition-all duration-300"
                style={{ borderRadius: '2px' }}
              >
                <amenity.icon
                  size={18}
                  className="text-copper/60 group-hover:text-copper transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="font-sans text-sm font-medium text-ivory mb-1.5 group-hover:text-copper transition-colors duration-300">
                  {amenity.label}
                </h3>
                <p className="font-sans text-xs text-ivory/40 leading-relaxed">{amenity.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border border-copper/40 text-copper font-sans text-xs tracking-widest uppercase
                       hover:bg-copper hover:text-midnight transition-all duration-300"
          >
            Plan Your Stay
          </button>
        </motion.div>
      </div>
    </section>
  )
}
