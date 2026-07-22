'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, BedDouble, Search } from 'lucide-react'

const ROOM_TYPES = ['Any Room', 'Garden Suite', 'Ocean Pavilion', 'Signature Villa', 'The Grand Penthouse']

export default function BookingBar() {
  const [checkIn, setCheckIn]   = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests]     = useState('2')
  const [roomType, setRoomType] = useState(ROOM_TYPES[0])
  const [loading, setLoading]   = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkIn || !checkOut) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      document.querySelector('#rooms')?.scrollIntoView({ behavior: 'smooth' })
    }, 1200)
  }

  return (
    <section id="booking" aria-label="Quick room booking">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto -mt-10 relative z-20 mx-4 md:mx-8 xl:mx-auto"
      >
        <form
          onSubmit={handleSearch}
          className="glass border border-copper/15 shadow-2xl"
          style={{ borderRadius: '4px' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-copper/10">
            {/* Check-in */}
            <div className="bg-midnight-2 px-5 py-4 flex flex-col gap-1 group">
              <label className="label-luxury text-[0.55rem] text-ivory/40 flex items-center gap-1.5">
                <Calendar size={11} className="text-copper" />
                Check In
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-transparent font-sans text-sm text-ivory w-full appearance-none
                           focus:outline-none placeholder:text-ivory/20 cursor-pointer"
                style={{ colorScheme: 'dark' }}
                required
                aria-label="Check-in date"
              />
            </div>

            {/* Check-out */}
            <div className="bg-midnight-2 px-5 py-4 flex flex-col gap-1">
              <label className="label-luxury text-[0.55rem] text-ivory/40 flex items-center gap-1.5">
                <Calendar size={11} className="text-copper" />
                Check Out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="bg-transparent font-sans text-sm text-ivory w-full appearance-none
                           focus:outline-none placeholder:text-ivory/20 cursor-pointer"
                style={{ colorScheme: 'dark' }}
                required
                aria-label="Check-out date"
              />
            </div>

            {/* Guests */}
            <div className="bg-midnight-2 px-5 py-4 flex flex-col gap-1">
              <label className="label-luxury text-[0.55rem] text-ivory/40 flex items-center gap-1.5">
                <Users size={11} className="text-copper" />
                Guests
              </label>
              <select
                value={guests}
                onChange={e => setGuests(e.target.value)}
                className="bg-transparent font-sans text-sm text-ivory focus:outline-none cursor-pointer"
                style={{ colorScheme: 'dark' }}
                aria-label="Number of guests"
              >
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n} className="bg-midnight-3">
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Room type */}
            <div className="bg-midnight-2 px-5 py-4 flex flex-col gap-1">
              <label className="label-luxury text-[0.55rem] text-ivory/40 flex items-center gap-1.5">
                <BedDouble size={11} className="text-copper" />
                Room Type
              </label>
              <select
                value={roomType}
                onChange={e => setRoomType(e.target.value)}
                className="bg-transparent font-sans text-sm text-ivory focus:outline-none cursor-pointer truncate"
                style={{ colorScheme: 'dark' }}
                aria-label="Room type"
              >
                {ROOM_TYPES.map(r => (
                  <option key={r} value={r} className="bg-midnight-3">{r}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-full flex items-center justify-center gap-2.5 px-6 py-5
                           bg-copper hover:bg-copper-light text-midnight font-sans text-xs font-medium
                           tracking-[0.18em] uppercase transition-all duration-300
                           disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-midnight/40 border-t-midnight rounded-full animate-spin" />
                ) : (
                  <Search size={14} />
                )}
                {loading ? 'Searching…' : 'Check Availability'}
              </button>
            </div>
          </div>

          {/* Rate note */}
          <div className="bg-midnight-3/50 px-5 py-2.5 flex items-center gap-6 border-t border-copper/10">
            <p className="label-luxury text-[0.55rem] text-ivory/30">
              Best Rate Guaranteed &nbsp;·&nbsp; Free Cancellation (48h) &nbsp;·&nbsp; Complimentary Airport Transfer
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  )
}
