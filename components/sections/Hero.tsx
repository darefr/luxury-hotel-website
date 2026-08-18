'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

const SLIDES = [
  {
    image: '/images/pokhara-valley.png',
    caption: 'Pokhara Valley',
    tagline: 'Framed by the Annapurna Himalayas',
  },
  {
    image: '/images/hotel-sonam-rooftop.jpg',
    caption: 'Our Rooftop Terrace',
    tagline: 'Mountain and monastery views',
  },
  {
    image: '/images/phewa-lake.png',
    caption: 'Phewa Lake',
    tagline: 'A short walk from your room',
  },
  {
    image: '/images/double-room.png',
    caption: 'Rooms with a Balcony',
    tagline: 'Comfortable, quiet & clean',
  },
]

export default function Hero() {
  const containerRef     = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { scrollY } = useScroll()
  const y        = useTransform(scrollY, [0, 600], [0, 180])
  const opacity  = useTransform(scrollY, [0, 500], [1, 0])
  const textY    = useTransform(scrollY, [0, 400], [0, -80])

  const startSlideshow = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setSlide(s => (s + 1) % SLIDES.length)
    }, 5500)
  }, [])

  useEffect(() => {
    startSlideshow()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startSlideshow])

  const goTo = (i: number) => {
    setSlide(i)
    startSlideshow()
  }

  const scrollToRooms = () => {
    document.querySelector('#rooms')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      aria-label="Welcome to Hotel Sonam"
    >
      {/* Background layers */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {/* Image slideshow */}
        <AnimatePresence initial={false}>
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[slide].image}
              alt={SLIDES[slide].caption}
              fill
              priority={slide === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,15,30,0.55) 0%, rgba(10,15,30,0.15) 40%, rgba(10,15,30,0.6) 75%, rgba(10,15,30,0.9) 100%)',
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(10,15,30,0.6) 100%)',
          }}
        />
      </motion.div>

      {/* Hero content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.7 }}
          className="label-luxury mb-6 text-copper"
        >
          Simalchaur &nbsp;·&nbsp; Pokhara &nbsp;·&nbsp; Nepal
        </motion.p>

        {/* Main headline */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 2.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-[6.5rem] font-light text-ivory leading-none tracking-tight"
          >
            Hotel <em className="text-gradient-copper not-italic">Sonam</em>
          </motion.h1>
        </div>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="max-w-lg font-sans text-sm md:text-base text-ivory/70 leading-relaxed mb-10 tracking-wide"
        >
          A warm, comfortable stay in the heart of Pokhara — just a short walk from
          Phewa Lake, with balcony rooms, an on-site restaurant, and honest Nepali hospitality.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-copper text-midnight font-sans text-xs font-medium tracking-[0.2em] uppercase
                       hover:bg-copper-light transition-all duration-300 glow-copper hover:scale-105 active:scale-95 min-w-[180px]"
          >
            Check Availability
          </button>
          <button
            onClick={() => document.querySelector('#rooms')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-ivory/30 text-ivory font-sans text-xs font-medium tracking-[0.2em] uppercase
                       hover:border-copper hover:text-copper transition-all duration-300 min-w-[180px] glass"
          >
            View Rooms
          </button>
        </motion.div>

        {/* Slide caption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={slide}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-24 right-8 label-luxury text-ivory/50 hidden md:block"
          >
            {SLIDES[slide].caption}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Slide dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3" aria-label="Slide navigation">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-500 ${
              i === slide ? 'w-8 h-1 bg-copper' : 'w-1 h-1 bg-ivory/30 hover:bg-ivory/60 rounded-full'
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToRooms}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-ivory/40 hover:text-copper transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <span className="label-luxury text-[0.55rem] tracking-[0.3em]">Scroll</span>
        <ChevronDown size={14} />
      </motion.button>

      {/* Rating badge */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 4, duration: 0.7 }}
        className="absolute top-28 left-8 z-20 hidden lg:flex flex-col items-center glass px-4 py-3 gap-1"
        style={{ borderRadius: '2px' }}
      >
        <span className="label-luxury text-copper text-[0.55rem]">Google Reviews</span>
        <span className="font-serif text-2xl font-light text-ivory leading-none">4.9</span>
        <span className="label-luxury text-ivory/50 text-[0.5rem] text-center leading-tight">
          Guest<br />Rating
        </span>
      </motion.div>
    </section>
  )
}
