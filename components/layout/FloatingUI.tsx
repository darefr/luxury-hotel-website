'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'

/* ─── Scroll Progress Bar ─── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-copper"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}

/* ─── Back To Top ─── */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-28 right-6 z-50 w-11 h-11 flex items-center justify-center
                     bg-midnight-3 border border-copper/30 text-copper hover:bg-copper
                     hover:text-midnight transition-all duration-300 shadow-lg"
          aria-label="Back to top"
          style={{ borderRadius: '2px' }}
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ─── WhatsApp FAB ─── */
export function WhatsAppFAB() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="whatsapp"
          href="https://wa.me/9779851019065?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20reservation%20at%20Hotel%20Sonam."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-10 right-6 z-50 w-13 h-13 flex items-center justify-center
                     rounded-full bg-[#25D366] text-white shadow-2xl animate-pulse-copper"
          style={{ width: 52, height: 52 }}
          aria-label="Chat on WhatsApp"
        >
          {/* WhatsApp SVG icon */}
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width={24}
            height={24}
          >
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.452.646 4.753 1.773 6.752L2 30l7.444-1.749A13.953 13.953 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.4a11.36 11.36 0 0 1-5.79-1.59l-.414-.247-4.418 1.038 1.07-4.3-.272-.44A11.36 11.36 0 0 1 4.6 16c0-6.286 5.114-11.4 11.4-11.4S27.4 9.714 27.4 16 22.286 27.4 16 27.4zm6.248-8.535c-.342-.172-2.026-1-.234-.172-2.34-.994l-.45-.126c-.156-.044-.34.044-.432.2-.166.276-.638.8-.784.97-.145.17-.29.192-.533.064-2.408-1.204-3.987-2.148-5.572-4.876-.421-.722.421-.672 1.204-2.23.133-.272.067-.508-.036-.714-.102-.206-.912-2.196-1.248-3.008-.328-.79-.664-.682-.912-.694l-.776-.014c-.242 0-.634.09-.966.456-.332.366-1.266 1.238-1.266 3.016 0 1.778 1.296 3.496 1.476 3.738.18.242 2.548 3.888 6.172 5.456.862.372 1.534.594 2.058.762.864.276 1.652.237 2.274.144.694-.103 2.138-.874 2.44-1.718.3-.844.3-1.568.21-1.718-.088-.15-.33-.242-.672-.414z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
