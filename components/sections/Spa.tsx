'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Trees, Mountain, Sun, Moon } from 'lucide-react'

const FEATURES = [
  {
    name: 'Garden Area',
    tag: 'Ground level',
    desc: 'A quiet green space to sit with a book or a cup of tea away from the busy street.',
    icon: Trees,
  },
  {
    name: 'Rooftop Terrace',
    tag: 'Top floor',
    desc: 'Open-air terrace with views of the hills, a golden monastery and the mountains beyond.',
    icon: Mountain,
  },
  {
    name: 'Private Balconies',
    tag: 'Every room',
    desc: 'Step out onto your own balcony for fresh air and a relaxed start or end to the day.',
    icon: Sun,
  },
  {
    name: 'Peaceful Setting',
    tag: 'Simalchaur',
    desc: 'A calm residential neighbourhood, yet only a short walk from Phewa Lake and Lakeside.',
    icon: Moon,
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
                src="/images/garden-terrace.png"
                alt="Hotel Sonam garden and rooftop terrace"
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
              <p className="font-serif text-3xl text-ivory mb-1">4.9</p>
              <p className="label-luxury text-[0.55rem] text-ivory/50">Guest Rating</p>
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
            <p className="label-luxury mb-4">Comfort & Relaxation</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-6 leading-tight">
              Space to<br />
              <em className="text-gradient-copper not-italic">Slow Down</em>
            </h2>
            <p className="text-ivory/50 font-sans text-sm leading-relaxed mb-6">
              Hotel Sonam is a simple, comfortable place to rest between adventures in Pokhara. Spend a quiet moment in the garden, watch the light change from the rooftop terrace, or simply enjoy the fresh mountain air from your balcony.
            </p>
            <p className="text-ivory/40 font-sans text-sm leading-relaxed mb-8">
              For anything you need to make your stay more comfortable, our front desk is always happy to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 bg-copper text-midnight font-sans text-xs tracking-widest uppercase
                           hover:bg-copper-light transition-all duration-300"
              >
                Check Availability
              </button>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 border border-copper/30 text-copper font-sans text-xs tracking-widest uppercase
                           hover:border-copper transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((t, i) => (
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
                <span className="label-luxury text-[0.55rem] text-copper/70">{t.tag}</span>
              </div>
              <p className="font-sans text-xs text-ivory/40 leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
