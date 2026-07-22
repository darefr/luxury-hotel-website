'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Leaf, Droplets, Wind, Sparkles, ArrowRight } from 'lucide-react'

const TREATMENTS = [
  {
    name: 'Copper & Cocoa Wrap',
    duration: '90 min',
    price: 320,
    desc: 'A restorative full-body ritual using raw cacao butter, copper-infused oils, and warm stone massage.',
    icon: Leaf,
  },
  {
    name: 'Deep Ocean Hydrotherapy',
    duration: '75 min',
    price: 280,
    desc: 'Immersive aquatic therapy in our mineral-rich thermal pools, blending thalassotherapy and pressure jets.',
    icon: Droplets,
  },
  {
    name: 'Velour Signature Facial',
    duration: '60 min',
    price: 240,
    desc: 'Our flagship facial using rare sea kelp extracts, gold micro-needling, and LED light therapy.',
    icon: Sparkles,
  },
  {
    name: 'Pranayama & Aromatherapy',
    duration: '60 min',
    price: 200,
    desc: 'A guided breathwork session paired with a bespoke essential-oil application by our wellness masters.',
    icon: Wind,
  },
]

export default function Spa() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section id="spa" ref={ref} className="py-28 bg-midnight-2 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      {/* Ambient */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(circle, #b87333, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Parallax image */}
          <div className="relative h-[500px] overflow-hidden order-2 lg:order-1" style={{ borderRadius: '4px' }}>
            <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
              <Image
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=900&q=80"
                alt="Velour Spa sanctuary"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-2/40 to-transparent" />

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-6 left-6 glass border border-copper/20 px-5 py-4"
              style={{ borderRadius: '3px' }}
            >
              <p className="font-serif text-3xl text-ivory mb-1">14</p>
              <p className="label-luxury text-[0.55rem] text-ivory/50">Treatment Rooms</p>
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <p className="label-luxury mb-4">Wellness & Restoration</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-6 leading-tight">
              The Velour<br />
              <em className="text-gradient-copper not-italic">Spa Sanctuary</em>
            </h2>
            <p className="text-ivory/50 font-sans text-sm leading-relaxed mb-6">
              Spanning 2,400 m² of pure tranquillity, our spa draws from ancient healing traditions and cutting-edge wellness science. Every treatment is a journey — a surrender to stillness.
            </p>
            <p className="text-ivory/40 font-sans text-sm leading-relaxed mb-8">
              Fourteen private treatment rooms, a hammam, thermal circuit, flotation pool, and open-air yoga pavilion combine to create a sanctuary unlike any other.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 bg-copper text-midnight font-sans text-xs tracking-widest uppercase
                           hover:bg-copper-light transition-all duration-300"
              >
                Book a Treatment
              </button>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 border border-copper/30 text-copper font-sans text-xs tracking-widest uppercase
                           hover:border-copper transition-all duration-300"
              >
                Spa Menu
              </button>
            </div>
          </motion.div>
        </div>

        {/* Treatments grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TREATMENTS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-6 bg-midnight border border-copper/10 hover:border-copper/30
                         hover:bg-midnight-3 transition-all duration-300 cursor-default"
              style={{ borderRadius: '4px' }}
            >
              <div className="w-10 h-10 flex items-center justify-center border border-copper/20 group-hover:bg-copper/10 mb-4 transition-all duration-300">
                <t.icon size={16} className="text-copper/60 group-hover:text-copper transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-lg font-light text-ivory mb-1">{t.name}</h3>
              <div className="flex items-center gap-3 mb-3">
                <span className="label-luxury text-[0.55rem] text-ivory/30">{t.duration}</span>
                <span className="label-luxury text-[0.55rem] text-copper/70">${t.price}</span>
              </div>
              <p className="font-sans text-xs text-ivory/40 leading-relaxed mb-4">{t.desc}</p>
              <button
                onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="group/btn flex items-center gap-1.5 text-copper font-sans text-[0.65rem] tracking-widest uppercase hover:gap-2.5 transition-all duration-300"
              >
                Book
                <ArrowRight size={11} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
