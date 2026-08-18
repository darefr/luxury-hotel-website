'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

/*
 * NOTE: Hotel Sonam is rated 4.9 / 5 by guests on Google.
 * The entries below are editable placeholders — paste real, verifiable guest
 * reviews (with permission) in place of the placeholder text before publishing.
 */
const REVIEWS = [
  {
    id: 1,
    name: 'Verified Guest',
    origin: 'Google Reviews',
    date: '',
    rating: 5,
    text: '[Editable placeholder] Add a real guest review here. Hotel Sonam holds a 4.9 out of 5 rating from guests on Google.',
    stay: 'Double Room',
    platform: 'Google',
  },
  {
    id: 2,
    name: 'Verified Guest',
    origin: 'Google Reviews',
    date: '',
    rating: 5,
    text: '[Editable placeholder] Replace this with a genuine review from one of your guests — for example about the location, the rooms, or the staff.',
    stay: 'Family Room',
    platform: 'Google',
  },
  {
    id: 3,
    name: 'Verified Guest',
    origin: 'Google Reviews',
    date: '',
    rating: 5,
    text: '[Editable placeholder] Paste another real guest comment here. Keep reviews truthful and, where possible, credit the source.',
    stay: 'Double Room',
    platform: 'Google',
  },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

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
            Rated 4.9 / 5 by Our Guests
          </h2>
          <p className="text-ivory/50 font-sans text-sm max-w-md mx-auto leading-relaxed">
            Based on guest reviews on Google. Real reviews can be added below.
          </p>
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
                  <div
                    className="w-13 h-13 rounded-full border-2 border-copper/20 flex items-center justify-center bg-midnight text-copper font-serif text-lg"
                    style={{ width: 52, height: 52 }}
                    aria-hidden="true"
                  >
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-ivory">{review.name}</p>
                    <p className="font-sans text-xs text-ivory/40">{review.origin}</p>
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
