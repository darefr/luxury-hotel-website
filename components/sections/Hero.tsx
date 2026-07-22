'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play, Pause } from 'lucide-react'
import Image from 'next/image'

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=85',
    caption: 'The Grand Suite',
    tagline: 'Where Opulence Meets Stillness',
  },
  {
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=85',
    caption: 'Infinity Horizons',
    tagline: 'A Pool Without End',
  },
  {
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=85',
    caption: 'The Sanctuary',
    tagline: 'Curated for the Discerning Few',
  },
  {
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=85',
    caption: 'Garden Pavilion',
    tagline: 'Nature as Your Private Canvas',
  },
]

export default function Hero() {
  const containerRef     = useRef<HTMLDivElement>(null)
  const videoRef         = useRef<HTMLVideoElement>(null)
  const [slide, setSlide]         = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
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

  const toggleVideo = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) { videoRef.current.play(); setIsPlaying(true) }
    else { videoRef.current.pause(); setIsPlaying(false) }
  }

  const scrollToRooms = () => {
    document.querySelector('#rooms')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      aria-label="Welcome to Velour & Co."
    >
      {/* Background layers */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {/* Video (hidden on mobile, requires JS) */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          poster={SLIDES[0].image}
          aria-hidden="true"
        >
          {/* Pexels free hotel/resort video */}
          <source
            src="https://www.pexels.com/video/12064929/download/?fps=25.0&h=1080&w=1920"
            type="video/mp4"
          />
        </video>

        {/* Image fallback / mobile */}
        <AnimatePresence initial={false}>
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: videoLoaded ? 0 : 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className={`absolute inset-0 md:${videoLoaded ? 'hidden' : 'block'}`}
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
          Est. 2010 &nbsp;·&nbsp; Maldives &nbsp;·&nbsp; Awards 2024
        </motion.p>

        {/* Main headline */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 2.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-[6.5rem] font-light text-ivory leading-none tracking-tight"
          >
            Velour <em className="text-gradient-copper not-italic">&amp;</em> Co.
          </motion.h1>
        </div>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="max-w-lg font-sans text-sm md:text-base text-ivory/70 leading-relaxed mb-10 tracking-wide"
        >
          Where every detail is a whisper of perfection. A singular escape
          conceived for those who seek more than luxury — they seek meaning.
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
            Reserve Your Stay
          </button>
          <button
            onClick={() => document.querySelector('#rooms')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-ivory/30 text-ivory font-sans text-xs font-medium tracking-[0.2em] uppercase
                       hover:border-copper hover:text-copper transition-all duration-300 min-w-[180px] glass"
          >
            Explore Rooms
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

      {/* Video play/pause control */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-20 right-8 z-20 hidden md:flex items-center gap-2 text-ivory/40 hover:text-copper transition-colors"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        <span className="label-luxury text-[0.55rem]">{isPlaying ? 'Pause' : 'Play'}</span>
      </button>

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

      {/* Award badge */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 4, duration: 0.7 }}
        className="absolute top-28 left-8 z-20 hidden lg:flex flex-col items-center glass px-4 py-3 gap-1"
        style={{ borderRadius: '2px' }}
      >
        <span className="label-luxury text-copper text-[0.55rem]">Condé Nast</span>
        <span className="font-serif text-2xl font-light text-ivory leading-none">#1</span>
        <span className="label-luxury text-ivory/50 text-[0.5rem] text-center leading-tight">
          Best<br />Boutique Hotel
        </span>
      </motion.div>
    </section>
  )
}
