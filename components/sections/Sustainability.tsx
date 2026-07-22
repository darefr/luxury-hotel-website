'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Leaf, Droplets, Sun, Recycle } from 'lucide-react'

const PILLARS = [
  { icon: Leaf,     title: 'Carbon Neutral',        desc: 'All resort operations certified carbon neutral since 2021. We offset 120% of our annual footprint.' },
  { icon: Sun,      title: 'Solar-Powered',          desc: '85% of our energy comes from the 2,400 solar panels installed across the resort campus.' },
  { icon: Droplets, title: 'Marine Conservation',   desc: 'Our resident marine biologist leads active reef restoration programmes open to guests.' },
  { icon: Recycle,  title: 'Zero Single-Use Plastic', desc: 'Eliminated across the entire property since 2020. All amenities use biodegradable materials.' },
]

export default function Sustainability() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section id="sustainability" ref={ref} className="py-28 bg-midnight relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with parallax */}
          <div className="relative h-[480px] overflow-hidden" style={{ borderRadius: '4px' }}>
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80"
                alt="Pristine ocean at Velour & Co. — our commitment to sustainability"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-midnight/30" />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 left-6 glass border border-copper/20 px-5 py-3"
              style={{ borderRadius: '3px' }}
            >
              <p className="label-luxury text-[0.55rem] text-copper mb-1">Certified</p>
              <p className="font-serif text-base text-ivory">Carbon Neutral</p>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="label-luxury mb-4">Our Commitment</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-6 leading-tight">
              Luxury That<br />
              <em className="text-gradient-copper not-italic">Protects the World</em>
            </h2>
            <p className="text-ivory/50 font-sans text-sm leading-relaxed mb-10">
              True luxury cannot exist in isolation from the world that creates it. At Velour & Co., our sustainability commitments are not an afterthought — they are foundational to everything we do.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  className="group p-4 border border-copper/10 hover:border-copper/25 hover:bg-midnight-3 transition-all duration-300"
                  style={{ borderRadius: '3px' }}
                >
                  <div className="flex items-start gap-3">
                    <p.icon size={15} className="text-copper mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="font-sans text-sm font-medium text-ivory mb-1">{p.title}</h4>
                      <p className="font-sans text-xs text-ivory/40 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 flex items-center gap-2 text-copper font-sans text-xs tracking-widest uppercase hover:gap-3 transition-all duration-300"
            >
              Our Sustainability Report
              <span className="text-copper/50">→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
