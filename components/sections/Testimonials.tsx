'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const REVIEWS = [
  {
    id: 1,
    name: 'Isabelle & Marc Laurent',
    origin: 'Paris, France',
    date: 'October 2024',
    rating: 5,
    text: 'Velour & Co. is the most extraordinary place we have ever stayed. The Ocean Pavilion was a dream — glass floors revealing the living reef beneath us, butler service that anticipated every need, and a silence that felt almost sacred. We have stayed at Aman, Four Seasons, and Six Senses. Velour surpasses them all.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    stay: 'Ocean Pavilion',
    platform: 'TripAdvisor',
  },
  {
    id: 2,
    name: 'James Whitmore',
    origin: 'London, UK',
    date: 'September 2024',
    rating: 5,
    text: 'I have visited over forty countries and stayed in some of the finest hotels in the world. The service at Velour & Co. is in a category of its own — warm, intuitive, never intrusive. My butler remembered my coffee order on day two without being asked. That is luxury.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    stay: 'Signature Villa',
    platform: 'Google',
  },
  {
    id: 3,
    name: 'Priya Nair-Mehta',
    origin: 'Mumbai, India',
    date: 'August 2024',
    rating: 5,
    text: 'The Velour Spa is the finest I have encountered anywhere in the world. The Copper & Cocoa wrap left my skin luminous and my mind entirely still. I returned for three consecutive evenings. The Maré restaurant\'s seven-course tasting menu reduced me to tears — in the best possible way.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    stay: 'Garden Suite',
    platform: 'TripAdvisor',
  },
  {
    id: 4,
    name: 'David & Celine Okonkwo',
    origin: 'New York, USA',
    date: 'July 2024',
    rating: 5,
    text: 'We celebrated our tenth anniversary at Velour & Co. and it exceeded every expectation. The private sunset sailing charter was the most romantic evening of our lives. The team arranged rose petals, champagne, and a playlist curated entirely from our first dance song. We leave different people.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    stay: 'Ocean Pavilion',
    platform: 'Booking.com',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [auto, setAuto]       = useState(true)
  const [direction, setDir]   = useState(1)

  const next = useCallback(() => {
    setDir(1)
    setCurrent(c => (c + 1) % REVIEWS.length)
  }, [])

  const prev = useCallback(() => {
    setDir(-1)
    setCurrent(c => (c - 1 + REVIEWS.length) % REVIEWS.length)
  }, [])

  useEffect(() => {
    if (!auto) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [auto, next])

  const review = REVIEWS[current]

  return (
    <section id="testimonials" className="py-28 bg-midnight-2 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      {/* Large quote decoration */}
      <div
        className="absolute top-12 left-8 font-serif text-[20rem] leading-none text-copper/[0.04] pointer-events-none select-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="label-luxury mb-4">Guest Voices</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-4">
            What Our Guests Say
          </h2>
          <div className="divider-copper w-16 mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setAuto(false)}
          onMouseLeave={() => setAuto(true)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={review.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="bg-midnight-3 border border-copper/10 p-8 md:p-12"
              style={{ borderRadius: '4px' }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-copper" fill="currentColor" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote size={28} className="text-copper/30 mb-4" aria-hidden="true" />

              {/* Text */}
              <blockquote className="font-serif text-xl md:text-2xl font-light text-ivory leading-relaxed mb-8 italic">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={review.avatar}
                    alt={`${review.name} photo`}
                    width={52}
                    height={52}
                    className="rounded-full object-cover border-2 border-copper/20"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-sans text-sm font-medium text-ivory">{review.name}</p>
                    <p className="font-sans text-xs text-ivory/40">{review.origin} &nbsp;·&nbsp; {review.date}</p>
                    <p className="label-luxury text-[0.55rem] text-copper/60 mt-0.5">{review.stay} &nbsp;·&nbsp; {review.platform}</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    className="w-9 h-9 flex items-center justify-center border border-copper/20 text-ivory/50 hover:border-copper hover:text-copper transition-all duration-300"
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="label-luxury text-[0.55rem] text-ivory/25">{current + 1} / {REVIEWS.length}</span>
                  <button
                    onClick={next}
                    className="w-9 h-9 flex items-center justify-center border border-copper/20 text-ivory/50 hover:border-copper hover:text-copper transition-all duration-300"
                    aria-label="Next review"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6" aria-label="Review navigation">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i) }}
                aria-label={`Go to review ${i + 1}`}
                className={`transition-all duration-300 ${
                  i === current ? 'w-6 h-1 bg-copper' : 'w-1 h-1 rounded-full bg-ivory/20 hover:bg-ivory/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
