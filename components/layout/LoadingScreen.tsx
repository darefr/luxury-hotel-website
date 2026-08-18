'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = 'HOTEL SONAM'.split('')

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Prevent body scroll while loading
    document.body.style.overflow = 'hidden'

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 18
      })
    }, 120)

    const timer = setTimeout(() => {
      document.body.style.overflow = ''
      setVisible(false)
    }, 2200)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-midnight"
          aria-label="Loading Hotel Sonam"
          role="status"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-96 h-96 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #b87333 0%, transparent 70%)' }}
            />
          </div>

          {/* Logo letters stagger */}
          <div className="flex items-center gap-[0.06em] mb-8 relative z-10">
            {LETTERS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.055, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-3xl md:text-5xl font-light tracking-[0.2em] text-ivory"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="label-luxury mb-10"
          >
            Pokhara · Nepal
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative w-48 h-px bg-midnight-3"
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-copper"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.15 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
