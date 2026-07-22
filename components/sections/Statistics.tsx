'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 14,    suffix: '',    label: 'Years of Excellence',      desc: 'Opening in 2010' },
  { value: 32,    suffix: '',    label: 'Private Suites & Villas',  desc: 'Each uniquely designed' },
  { value: 98,    suffix: '%',   label: 'Guest Satisfaction',       desc: 'Verified reviews' },
  { value: 47,    suffix: '+',   label: 'Industry Awards',          desc: 'Global recognition' },
  { value: 2400,  suffix: ' m²', label: 'Spa & Wellness',           desc: 'Dedicated sanctuary' },
  { value: 3,     suffix: '',    label: 'Michelin-Starred Chefs',   desc: 'Culinary excellence' },
]

function useCountUp(target: number, duration = 2200, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = Math.ceil(duration / target)
    const increment = Math.max(1, Math.floor(target / (duration / 16)))
    const timer = setInterval(() => {
      start = Math.min(start + increment, target)
      setCount(start)
      if (start >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])
  return count
}

function StatCard({ stat, i }: { stat: typeof STATS[0]; i: number }) {
  const ref   = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const count  = useCountUp(stat.value, 1800, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, duration: 0.6 }}
      className="text-center p-8 group"
    >
      <div className="mb-3">
        <span className="font-serif text-5xl md:text-6xl font-light text-gradient-copper">
          {count.toLocaleString()}{stat.suffix}
        </span>
      </div>
      <p className="font-sans text-sm font-medium text-ivory mb-1">{stat.label}</p>
      <p className="font-sans text-xs text-ivory/35">{stat.desc}</p>
    </motion.div>
  )
}

export default function Statistics() {
  return (
    <section id="statistics" className="py-24 bg-midnight relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      {/* Full-width copper tint band */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ background: 'linear-gradient(90deg, transparent, #b87333 30%, #b87333 70%, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y divide-copper/10">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
