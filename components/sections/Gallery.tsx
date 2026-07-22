'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

const PHOTOS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85', alt: 'Overwater bungalow at dusk', category: 'Suites',   span: 'col-span-2 row-span-2' },
  { id: 2, src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',   alt: 'Infinity pool overlooking ocean', category: 'Pool',    span: '' },
  { id: 3, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',alt: 'Candlelit fine dining',           category: 'Dining',  span: '' },
  { id: 4, src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',alt: 'Spa treatment room',              category: 'Spa',     span: '' },
  { id: 5, src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',   alt: 'Crystal-clear reef diving',       category: 'Experiences', span: '' },
  { id: 6, src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',alt: 'Luxury villa with pool',         category: 'Suites',  span: 'col-span-2' },
  { id: 7, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',alt: 'Sunset sailing at dusk',          category: 'Experiences', span: '' },
  { id: 8, src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',alt: 'Private beach sunset',            category: 'Resort', span: '' },
  { id: 9, src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',alt: 'Garden suite terrace',            category: 'Suites',  span: '' },
]

const CATEGORIES = ['All', 'Suites', 'Pool', 'Dining', 'Spa', 'Experiences', 'Resort']

export default function Gallery() {
  const [filter, setFilter]           = useState('All')
  const [lightbox, setLightbox]       = useState<number | null>(null)
  const [direction, setDirection]     = useState(0)

  const filtered = filter === 'All' ? PHOTOS : PHOTOS.filter(p => p.category === filter)

  const openPhoto = (id: number) => setLightbox(id)

  const navigate = useCallback((dir: number) => {
    if (lightbox === null) return
    const idx = filtered.findIndex(p => p.id === lightbox)
    const next = (idx + dir + filtered.length) % filtered.length
    setDirection(dir)
    setLightbox(filtered[next].id)
  }, [lightbox, filtered])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft')  navigate(-1)
      if (e.key === 'Escape')     setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, navigate])

  const currentPhoto = lightbox !== null ? PHOTOS.find(p => p.id === lightbox) : null
  const currentIdx   = lightbox !== null ? filtered.findIndex(p => p.id === lightbox) : -1

  return (
    <section id="gallery" className="py-28 bg-midnight relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="label-luxury mb-4">Visual Stories</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
            The Gallery
          </h2>
          <p className="text-ivory/50 font-sans text-sm max-w-md mx-auto leading-relaxed">
            A curated look into life at Velour & Co. — through light, texture, and the quiet grandeur of every moment.
          </p>
          <div className="divider-copper w-16 mx-auto mt-6 mb-10 opacity-60" />

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3" role="tablist" aria-label="Gallery filter">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat)}
                className={`label-luxury text-[0.6rem] px-4 py-2 border transition-all duration-300 ${
                  filter === cat
                    ? 'bg-copper text-midnight border-copper'
                    : 'border-copper/20 text-ivory/50 hover:border-copper/50 hover:text-ivory'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[220px]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`relative overflow-hidden cursor-pointer group ${photo.span}`}
                style={{ borderRadius: '3px' }}
                onClick={() => openPhoto(photo.id)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/40 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={22} className="text-ivory" />
                </div>
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="label-luxury text-[0.5rem] text-ivory/80 glass px-2 py-1">{photo.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && currentPhoto && (
          <>
            <motion.div
              key="lightbox-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-midnight/96 backdrop-blur-md"
              onClick={() => setLightbox(null)}
            />
            <motion.div
              key={`lightbox-${lightbox}`}
              initial={{ opacity: 0, scale: 0.88, x: direction * 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.88, x: -direction * 60 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="fixed inset-8 md:inset-16 z-[51] flex items-center justify-center"
            >
              <div className="relative w-full h-full max-w-5xl mx-auto" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            </motion.div>

            {/* Controls */}
            <button
              className="fixed top-6 right-6 z-[52] w-10 h-10 flex items-center justify-center glass border border-ivory/20 text-ivory hover:text-copper transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <X size={16} />
            </button>
            <button
              className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-[52] w-10 h-10 flex items-center justify-center glass border border-ivory/20 text-ivory hover:text-copper transition-colors"
              onClick={() => navigate(-1)}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[52] w-10 h-10 flex items-center justify-center glass border border-ivory/20 text-ivory hover:text-copper transition-colors"
              onClick={() => navigate(1)}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            {/* Counter + caption */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[52] flex flex-col items-center gap-1">
              <p className="font-sans text-xs text-ivory/40 text-center">{currentPhoto.alt}</p>
              <p className="label-luxury text-[0.55rem] text-ivory/20">{currentIdx + 1} / {filtered.length}</p>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
