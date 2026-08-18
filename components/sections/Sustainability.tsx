'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Leaf, Droplets, Sun, Recycle } from 'lucide-react'

const PILLARS = [
  { icon: Leaf,     title: 'Local & Fresh',      desc: 'Nepali dishes prepared at our on-site restaurant, so you can eat well without going far.' },
  { icon: Droplets, title: 'Simple & Clean',     desc: 'Tidy, non-smoking rooms and a well-kept garden — our guests rate us 4.9 out of 5.' },
  { icon: Sun,      title: 'Enjoy Pokhara',      desc: 'We help guests explore the lake, hills and viewpoints, and love to share local tips.' },
  { icon: Recycle,  title: 'Community Minded',   desc: '[Editable placeholder] Add your hotel\u2019s own community or environmental initiatives here.' },
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
                src="/images/phewa-lake.png"
                alt="Phewa Lake, Pokhara, near Hotel Sonam"
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
              <p className="label-luxury text-[0.55rem] text-copper mb-1">Guest Rating</p>
              <p className="font-serif text-base text-ivory">4.9 / 5</p>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="label-luxury mb-4">Our Approach</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-6 leading-tight">
              Warm, Honest<br />
              <em className="text-gradient-copper not-italic">Hospitality</em>
            </h2>
            <p className="text-ivory/50 font-sans text-sm leading-relaxed mb-10">
              Hotel Sonam keeps things simple and genuine: clean, comfortable rooms, good home-style food, and friendly help exploring everything Pokhara has to offer.
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
              Get in Touch
              <span className="text-copper/50">→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
