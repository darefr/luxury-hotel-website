'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from '@/lib/auth-client'

const NAV_LINKS = [
  { label: 'Rooms',       href: '/rooms' },
  { label: 'Dining',      href: '/dining' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Gallery',     href: '/gallery' },
  { label: 'Offers',      href: '/offers' },
  { label: 'Reviews',     href: '/reviews' },
  { label: 'Contact',     href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname                  = usePathname()
  const { data: session }         = useSession()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close the mobile menu whenever the route changes
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [pathname],
  )

  const accountHref = session?.user ? '/account' : '/sign-in'
  const accountLabel = session?.user ? 'Account' : 'Sign In'

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[rgba(10,15,30,0.95)] backdrop-blur-xl border-b border-copper/10 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col items-start group"
            aria-label="Hotel Sonam — Home"
          >
            <span
              className="text-xl md:text-2xl font-light tracking-[0.18em] text-ivory group-hover:text-copper transition-colors duration-300"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              HOTEL SONAM
            </span>
            <span className="label-luxury text-[0.55rem] tracking-[0.3em] opacity-70 mt-0.5">
              Simalchaur · Pokhara
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative label-luxury text-[0.6rem] tracking-[0.2em] pb-1 transition-colors duration-300 ${
                  isActive(link.href) ? 'text-copper' : 'text-ivory/70 hover:text-ivory'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-copper"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+9779851019065"
              className="flex items-center gap-2 text-ivory/60 hover:text-copper transition-colors duration-300"
              aria-label="Call us"
            >
              <Phone size={14} />
              <span className="label-luxury text-[0.6rem]">+977 985-1019065</span>
            </a>
            <Link
              href={accountHref}
              className="flex items-center gap-1.5 text-ivory/70 hover:text-copper transition-colors duration-300 label-luxury text-[0.6rem] tracking-[0.2em]"
            >
              <User size={13} />
              {accountLabel}
            </Link>
            <Link
              href="/#booking"
              className="px-5 py-2.5 bg-copper text-midnight font-sans text-xs font-medium tracking-widest uppercase
                         hover:bg-copper-light transition-all duration-300 glow-copper-sm hover:scale-105 active:scale-95"
            >
              Reserve
            </Link>
          </div>

          {/* Mobile: Sign In / Account + hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            <Link
              href={accountHref}
              className="flex items-center gap-1.5 px-3 py-2 text-ivory/80 hover:text-copper transition-colors label-luxury text-[0.6rem] tracking-[0.15em]"
              aria-label={accountLabel}
            >
              <User size={16} />
              <span>{accountLabel}</span>
            </Link>
            <button
              className="p-2 text-ivory hover:text-copper transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-midnight/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              id="mobile-menu"
              key="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 38 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-midnight-2 border-l border-copper/10 flex flex-col px-8 pt-24 pb-12 lg:hidden"
              aria-label="Mobile navigation"
            >
              <button
                className="absolute top-6 right-6 text-ivory/60 hover:text-copper transition-colors"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>

              <div className="flex flex-col gap-6 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block text-left font-serif text-2xl font-light tracking-wide transition-colors duration-300 ${
                        isActive(link.href) ? 'text-copper' : 'text-ivory hover:text-copper'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-copper/10">
                <Link
                  href={accountHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 mb-3 border border-copper/30 text-ivory
                             font-sans text-xs font-medium tracking-widest uppercase hover:text-copper hover:border-copper/60 transition-all duration-300"
                >
                  <User size={14} />
                  {accountLabel}
                </Link>
                <Link
                  href="/#booking"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center w-full py-3 bg-copper text-midnight font-sans text-xs font-medium tracking-widest uppercase
                             hover:bg-copper-light transition-all duration-300"
                >
                  Reserve Now
                </Link>
                <a
                  href="tel:+9779851019065"
                  className="flex items-center justify-center gap-2 mt-4 text-ivory/50 hover:text-copper transition-colors"
                >
                  <Phone size={13} />
                  <span className="label-luxury text-[0.6rem]">+977 985-1019065</span>
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
